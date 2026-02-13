# Postgres Prototype Schema for Levante

This document proposes a PROTOTYPE Postgres schema that can back our Firebase-based workflows while replacing the current Firestore data model.

The goal is pragmatic parity, not a perfect 1:1 translation of every Firestore
document shape.

## Scope

Included:
- Tasks and task variants
- Users and roles/claims
- Organizations (district/school/class/group/family)
- Administrations (assignments), assessments, and org visibility
- Runs and trials
- System permissions

Deferred:
- Full legal document versioning workflow
- Analytics warehouse tables
- Every legacy optional field

## Design choices

- Use UUID primary keys where practical, but keep string IDs compatible with
  existing Firestore IDs when needed.
- Keep high-variance payloads in `jsonb` (`params`, `scores`, trial payloads).
- Normalize high-value relationships (org memberships, assigned/read orgs).
- Use explicit `created_at` / `updated_at` timestamps in UTC.

## SQL DDL (prototype)

```sql
-- Optional, for UUID generation
create extension if not exists pgcrypto;

-- ----------------------------
-- Enums
-- ----------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'org_type') then
    create type org_type as enum ('district', 'school', 'class', 'group', 'family');
  end if;
  if not exists (select 1 from pg_type where typname = 'user_type') then
    create type user_type as enum ('admin', 'teacher', 'student', 'parent', 'guest');
  end if;
end $$;

-- ----------------------------
-- Core organizations
-- ----------------------------
create table if not exists organizations (
  id                text primary key,                 -- keep compatibility with Firestore IDs
  org_type          org_type not null,
  name              text not null,
  normalized_name   text generated always as (lower(name)) stored,
  archived          boolean not null default false,
  parent_org_id     text null references organizations(id) on delete set null,
  created_by_uid    text null,
  tags              text[] not null default '{}',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists idx_org_type_name on organizations(org_type, normalized_name);
create index if not exists idx_org_parent on organizations(parent_org_id);

-- ----------------------------
-- Tasks and variants
-- ----------------------------
create table if not exists tasks (
  id                text primary key,                 -- taskId
  name              text,
  description       text,
  image             text,
  task_url          text,
  game_config       jsonb,
  external          boolean not null default false,
  registered        boolean not null default true,
  test_data         boolean not null default false,
  demo_data         boolean not null default false,
  last_updated      timestamptz not null default now()
);

create table if not exists task_variants (
  id                text primary key,                 -- variantId
  task_id           text not null references tasks(id) on delete cascade,
  name              text,
  description       text,
  task_url          text,
  variant_url       text,
  external          boolean not null default false,
  params            jsonb not null default '{}'::jsonb,
  registered        boolean not null default true,
  test_data         boolean not null default false,
  demo_data         boolean not null default false,
  last_updated      timestamptz not null default now(),
  unique(task_id, id)
);

create index if not exists idx_task_variants_task on task_variants(task_id);
create index if not exists idx_task_variants_task_registered on task_variants(task_id, registered);

-- ----------------------------
-- Users, roles, and claims
-- ----------------------------
create table if not exists users (
  uid               text primary key,                 -- Firebase auth UID
  email             text unique,
  display_name      text,
  user_type         user_type not null,
  assessment_uid    text,
  assessment_pid    text,
  archived          boolean not null default false,
  legal             jsonb not null default '{}'::jsonb,
  profile           jsonb not null default '{}'::jsonb,  -- grade, birthMonth, birthYear, etc.
  test_data         boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table if not exists user_roles (
  id                uuid primary key default gen_random_uuid(),
  uid               text not null references users(uid) on delete cascade,
  role              text not null,                   -- super_admin, admin, site_admin, research_assistant, participant
  site_id           text null references organizations(id) on delete set null,
  site_name         text,
  unique(uid, role, site_id)
);

create index if not exists idx_user_roles_uid on user_roles(uid);
create index if not exists idx_user_roles_site on user_roles(site_id, role);

create table if not exists user_org_membership (
  id                uuid primary key default gen_random_uuid(),
  uid               text not null references users(uid) on delete cascade,
  org_id            text not null references organizations(id) on delete cascade,
  is_current        boolean not null default true,
  active_from       timestamptz,
  active_to         timestamptz,
  unique(uid, org_id, is_current)
);

create index if not exists idx_user_org_membership_uid on user_org_membership(uid);
create index if not exists idx_user_org_membership_org on user_org_membership(org_id);

create table if not exists user_claims (
  uid               text primary key references users(uid) on delete cascade,
  claims            jsonb not null,                  -- mirrors custom claims payload
  last_updated_ms   bigint not null,
  test_data         boolean not null default false
);

-- ----------------------------
-- Administrations (assignments)
-- ----------------------------
create table if not exists administrations (
  id                text primary key,
  name              text not null,
  normalized_name   text generated always as (lower(name)) stored,
  public_name       text not null,
  created_by_uid    text not null references users(uid) on delete restrict,
  creator_name      text,
  site_id           text references organizations(id) on delete restrict,
  legal             jsonb not null default '{}'::jsonb,
  sequential        boolean not null default false,
  tags              text[] not null default '{}',
  test_data         boolean not null default false,
  date_opened       timestamptz not null,
  date_closed       timestamptz not null,
  date_created      timestamptz not null default now()
);

create index if not exists idx_admin_site_dates on administrations(site_id, date_opened, date_closed);
create index if not exists idx_admin_name on administrations(normalized_name);

create table if not exists administration_assessments (
  id                uuid primary key default gen_random_uuid(),
  administration_id text not null references administrations(id) on delete cascade,
  ordinal           int not null,
  task_id           text not null references tasks(id) on delete restrict,
  task_name         text,
  variant_id        text not null references task_variants(id) on delete restrict,
  variant_name      text,
  params            jsonb not null default '{}'::jsonb,
  conditions        jsonb not null default '{}'::jsonb,
  unique(administration_id, ordinal)
);

create index if not exists idx_admin_assessments_admin on administration_assessments(administration_id);

create table if not exists administration_org_access (
  id                uuid primary key default gen_random_uuid(),
  administration_id text not null references administrations(id) on delete cascade,
  access_kind       text not null check (access_kind in ('assigned', 'read', 'minimal')),
  org_id            text not null references organizations(id) on delete cascade,
  unique(administration_id, access_kind, org_id)
);

create index if not exists idx_admin_org_access_admin on administration_org_access(administration_id, access_kind);
create index if not exists idx_admin_org_access_org on administration_org_access(org_id, access_kind);

-- ----------------------------
-- User assignment state
-- ----------------------------
create table if not exists user_administrations (
  id                uuid primary key default gen_random_uuid(),
  uid               text not null references users(uid) on delete cascade,
  administration_id text not null references administrations(id) on delete cascade,
  status            text not null default 'assigned' check (status in ('assigned', 'started', 'completed')),
  progress          jsonb not null default '{}'::jsonb,
  payload           jsonb not null default '{}'::jsonb,
  date_assigned     timestamptz not null default now(),
  date_opened       timestamptz,
  date_closed       timestamptz,
  unique(uid, administration_id)
);

create index if not exists idx_user_admin_uid_status on user_administrations(uid, status);
create index if not exists idx_user_admin_admin on user_administrations(administration_id);

-- ----------------------------
-- Runs and trials
-- ----------------------------
create table if not exists runs (
  id                text primary key,                 -- existing run IDs are string-like
  uid               text not null references users(uid) on delete cascade,
  assignment_id     text references administrations(id) on delete set null,
  task_id           text not null references tasks(id) on delete restrict,
  variant_id        text references task_variants(id) on delete set null,
  task_version      text,
  completed         boolean not null default false,
  reliable          boolean,
  reliable_by_block jsonb,
  engagement_flags  jsonb,
  assigning_orgs    jsonb,                            -- org lists keyed by org type
  read_orgs         jsonb,                            -- org lists keyed by org type
  user_data         jsonb not null default '{}'::jsonb,
  scores            jsonb not null default '{}'::jsonb,
  interactions      jsonb not null default '{}'::jsonb,
  test_data         boolean not null default false,
  demo_data         boolean not null default false,
  time_started      timestamptz,
  time_finished     timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists idx_runs_uid_started on runs(uid, time_started desc);
create index if not exists idx_runs_assignment on runs(assignment_id);
create index if not exists idx_runs_task_variant on runs(task_id, variant_id);

create table if not exists trials (
  id                text primary key,
  run_id            text not null references runs(id) on delete cascade,
  assessment_stage  text,
  correct           boolean,
  payload           jsonb not null default '{}'::jsonb,  -- task-specific trial data
  server_timestamp  timestamptz not null default now()
);

create index if not exists idx_trials_run on trials(run_id);
create index if not exists idx_trials_run_stage on trials(run_id, assessment_stage);

-- ----------------------------
-- System permissions
-- ----------------------------
create table if not exists system_permissions (
  id                text primary key default 'permissions',
  version           text not null,
  permissions       jsonb not null,                  -- role permission matrix
  updated_at        timestamptz not null default now()
);
```

## Functional changes needed in Firebase Functions

Replacing Firestore with Postgres (while still using Firebase Auth and callable
functions) requires more than query rewrites.

### 1) Data access layer abstraction

- Introduce a repository/data-service layer for all functions:
  - `OrganizationsRepo`, `UsersRepo`, `AdministrationsRepo`, `RunsRepo`, etc.
- Remove direct `admin.firestore()` usage from business logic.
- Keep callable handlers thin and delegate to repositories.

### 2) Query and pagination rewrites

- Convert Firestore-style filters and cursor pagination to SQL:
  - Firestore `startAfter`/`limit` -> keyset pagination (`WHERE (k1, id) > (...) ORDER BY ... LIMIT ...`).
- Re-implement existing list endpoints (`getOrgsBySite`, `getAdministrationsPage`,
  `getRunsPage`, `getUsersByOrg`, etc.) with equivalent SQL semantics.

### 3) Transactions and consistency

- Replace batch writes/transactions with SQL transactions (`BEGIN/COMMIT/ROLLBACK`).
- Enforce invariants with FK constraints + unique indexes.
- Use idempotency keys for retried callable operations where needed.

### 4) Timestamp and server-time behavior

- Firestore `serverTimestamp()` -> `now()` (UTC `timestamptz`).
- Normalize all date comparisons to UTC and define conversion helpers in one place.

### 5) Claims and authorization path

- Keep Firebase Auth custom claims for token-based auth.
- Move source-of-truth role/org checks to Postgres (`user_roles`, `user_org_membership`).
- Add function middleware to resolve caller context from UID + SQL role mappings.

### 6) Eventing model changes

- Firestore triggers (`onCreate`, `onUpdate`) must be replaced by:
  - explicit callable orchestration,
  - Cloud Scheduler jobs,
  - or database-native mechanisms (CDC/outbox, logical replication consumers).

### 7) JSON payload compatibility

- Preserve flexible structures in `jsonb` for:
  - trial payloads,
  - run scores/interactions,
  - assessment conditions/params.
- Add JSON schema validation in functions for writes to these fields.

### 8) Migration strategy

- Dual-write period (optional but safer): write Firestore + Postgres for selected domains.
- Backfill scripts to migrate existing Firestore collections to SQL tables.
- Parity tests for read endpoints before flipping domain flags.

### 9) Operational and platform changes

- Add Postgres connection pooling (Cloud SQL connector + pgBouncer or managed pool).
- Add retry/backoff for transient DB errors.
- Add SQL migrations pipeline (e.g., Flyway, Prisma Migrate, or dbmate).
- Add query performance monitoring (slow query logging, p95/p99 callable latency).

## Suggested rollout order

1. **Tasks + variants** (lowest relational complexity)
2. **Organizations + user memberships**
3. **Administrations + assessments + org access**
4. **Runs + trials**
5. **User assignment progress and stats views**

This order minimizes blast radius and unlocks early parity testing for
high-value read APIs.

## Endpoint migration checklist (with SQL stubs)

Below are high-priority endpoints to migrate first, with implementation notes
and SQL skeletons you can adapt in repository methods.

### 1) `getOrgsBySite(siteId)`

Checklist:
- [ ] Validate caller has access to `siteId` (role + membership).
- [ ] Return districts/schools/classes/groups for the site.
- [ ] Keep Firestore-compatible response shape.

SQL stub:
```sql
select o.*
from organizations o
where
  (
    (o.org_type = 'district' and o.id = $1)
    or
    (o.org_type in ('school', 'class', 'group', 'family') and (
      o.parent_org_id = $1
      or exists (
        select 1
        from organizations p
        where p.id = o.parent_org_id and p.parent_org_id = $1
      )
    ))
  )
  and o.archived = false
order by o.org_type, o.normalized_name;
```

### 2) `getUsersByOrg(orgType, orgId, page, limit)`

Checklist:
- [ ] Enforce org-level read permission.
- [ ] Support active-only filters.
- [ ] Implement keyset pagination (avoid offset for large sets).

SQL stub:
```sql
select u.uid, u.email, u.display_name, u.user_type, u.profile, u.updated_at
from users u
join user_org_membership m on m.uid = u.uid
join organizations o on o.id = m.org_id
where
  o.id = $1
  and o.org_type = $2::org_type
  and m.is_current = true
  and u.archived = false
  and ($3::boolean is false or u.user_type in ('student','teacher','parent'))
  and ($4::timestamptz is null or u.updated_at < $4) -- keyset cursor
order by u.updated_at desc, u.uid
limit $5;
```

### 3) `countUsersByOrg(orgType, orgId)`

Checklist:
- [ ] Reuse same filters as `getUsersByOrg`.
- [ ] Keep counts consistent with paged list endpoint.

SQL stub:
```sql
select count(*)
from users u
join user_org_membership m on m.uid = u.uid
join organizations o on o.id = m.org_id
where
  o.id = $1
  and o.org_type = $2::org_type
  and m.is_current = true
  and u.archived = false;
```

### 4) `getAdministrationsPage(siteId, filters, page, limit)`

Checklist:
- [ ] Enforce site-level permission.
- [ ] Apply date window and test-data filters.
- [ ] Preserve sort behavior used by current UI.

SQL stub:
```sql
select a.*
from administrations a
where
  a.site_id = $1
  and ($2::boolean is null or a.test_data = $2)
  and ($3::timestamptz is null or a.date_opened >= $3)
  and ($4::timestamptz is null or a.date_closed <= $4)
  and ($5::text is null or a.normalized_name like ('%' || lower($5) || '%'))
  and ($6::timestamptz is null or a.date_created < $6) -- keyset cursor
order by a.date_created desc, a.id
limit $7;
```

### 5) `getAssignmentsPage(administrationId, orgId/orgType, page, limit)`

Checklist:
- [ ] Use `user_administrations` as the source of participant assignment state.
- [ ] Filter by read/assigned org constraints.
- [ ] Return progress fields expected by dashboard cards/tables.

SQL stub:
```sql
select ua.uid, ua.status, ua.progress, ua.payload, ua.date_assigned
from user_administrations ua
where
  ua.administration_id = $1
  and exists (
    select 1
    from administration_org_access aoa
    where aoa.administration_id = ua.administration_id
      and aoa.org_id = $2
      and aoa.access_kind in ('assigned', 'read')
  )
  and ($3::timestamptz is null or ua.date_assigned < $3)
order by ua.date_assigned desc, ua.id
limit $4;
```

### 6) `getRunsPage(administrationId, org scope, page, limit)`

Checklist:
- [ ] Enforce org visibility and assignment scope.
- [ ] Preserve current filtering on task/variant/status where needed.
- [ ] Include joined user and assignment context for UI.

SQL stub:
```sql
select r.id, r.uid, r.assignment_id, r.task_id, r.variant_id, r.completed,
       r.time_started, r.time_finished, r.scores, r.reliable
from runs r
join user_administrations ua
  on ua.uid = r.uid and ua.administration_id = r.assignment_id
where
  r.assignment_id = $1
  and exists (
    select 1
    from administration_org_access aoa
    where aoa.administration_id = r.assignment_id
      and aoa.org_id = $2
      and aoa.access_kind in ('assigned', 'read')
  )
  and ($3::boolean is null or r.completed = $3)
  and ($4::timestamptz is null or coalesce(r.time_started, r.created_at) < $4)
order by coalesce(r.time_started, r.created_at) desc, r.id
limit $5;
```

### 7) `countRuns(administrationId, org scope)`

Checklist:
- [ ] Match run-page filter semantics exactly.
- [ ] Validate org access before counting.

SQL stub:
```sql
select count(*)
from runs r
where
  r.assignment_id = $1
  and exists (
    select 1
    from administration_org_access aoa
    where aoa.administration_id = r.assignment_id
      and aoa.org_id = $2
      and aoa.access_kind in ('assigned', 'read')
  );
```

### 8) `upsertAdministration(...)`

Checklist:
- [ ] Wrap full write set in one SQL transaction.
- [ ] Upsert `administrations`, replace `administration_assessments` ordinals.
- [ ] Replace `administration_org_access` rows for assigned/read/minimal.
- [ ] Keep output shape compatible with existing frontend expectations.

SQL stub (transaction outline):
```sql
begin;

-- upsert administration row
insert into administrations (id, name, public_name, created_by_uid, site_id, legal, sequential, tags, test_data, date_opened, date_closed, date_created)
values ($1, $2, $3, $4, $5, $6::jsonb, $7, $8::text[], $9, $10, $11, coalesce($12, now()))
on conflict (id) do update
set name = excluded.name,
    public_name = excluded.public_name,
    legal = excluded.legal,
    sequential = excluded.sequential,
    tags = excluded.tags,
    test_data = excluded.test_data,
    date_opened = excluded.date_opened,
    date_closed = excluded.date_closed;

-- delete/replace assessment rows and access rows here
-- insert assessment rows by ordinal
-- insert assigned/read/minimal org access rows

commit;
```

### 9) `upsertOrg(...)`

Checklist:
- [ ] Enforce role permission by target org type.
- [ ] Handle create + update with normalized names.
- [ ] Keep parent relationships valid for org hierarchy.

SQL stub:
```sql
insert into organizations (id, org_type, name, parent_org_id, archived, created_by_uid, tags)
values ($1, $2::org_type, $3, $4, false, $5, coalesce($6::text[], '{}'))
on conflict (id) do update
set name = excluded.name,
    parent_org_id = excluded.parent_org_id,
    archived = excluded.archived,
    tags = excluded.tags,
    updated_at = now()
returning *;
```

### 10) `saveSurveyResponses(...)` and run/trial writers

Checklist:
- [ ] Keep trial writes append-only.
- [ ] Use `jsonb` payload for task-specific keys.
- [ ] Update run completion atomically with final trial write when needed.

SQL stub:
```sql
insert into trials (id, run_id, assessment_stage, correct, payload)
values ($1, $2, $3, $4, $5::jsonb);

update runs
set scores = $6::jsonb,
    interactions = $7::jsonb,
    completed = coalesce($8, completed),
    time_finished = case when $8 then now() else time_finished end
where id = $2;
```

## Endpoint rollout gates

Before enabling a migrated endpoint in production:
- [ ] Parity test suite passes (Firestore vs Postgres response equivalence).
- [ ] Access-control matrix passes for all roles.
- [ ] p95 latency within target budget.
- [ ] Error rate and rollback toggles verified in staging.
