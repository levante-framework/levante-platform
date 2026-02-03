# Schema ↔ Validator Mapping

<!-- schema:validator:meta:start -->
Schema source: `apps/server/levante-firebase-functions/functions/levante-admin/firestore-schema.ts`
Schema sha256: `ce0d6ca6debab06106807d77703340b9e7931e666b28e1820808fb4da76d415d`
Last synced: `2026-02-03T18:38:36.746Z`
<!-- schema:validator:meta:end -->

This document maps `data-validator` expectations to Levante Firestore schema
and highlights integrity risks that can break validation.

Sources:
- Validator models: `/home/david/levante/data-validator/core_models.py`
- Validator Firestore extraction: `/home/david/levante/data-validator/firestore_services.py`
- Validator orchestration: `/home/david/levante/data-validator/entity_controller.py`
- Levante schema: `/home/david/levante/levante-platform/apps/server/levante-firebase-functions/functions/levante-admin/firestore-schema.ts`

## Compatibility map (validator ↔ Firestore)

### Groups
- Validator expects: `group_id`, `name`, optional `abbreviation`, `tags`, `created_at`
- Firestore: `groups/{id}` has `name`, `tags`, `createdAt`
- Mapping: `group_id` from doc id, `created_at` from `createdAt` (camel→snake)
- Risk: none (optional fields optional)

### Districts
- Validator expects: `district_id`, `name`, optional `district_contact`, `last_sync`, `launch_date`, etc.
- Firestore: `districts/{id}` has `name`, `tags`, `createdAt`, `updatedAt`, `schools`
- Mapping: `district_id` from doc id, `created_at` from `createdAt`
- Risk: validator optional fields may be absent

### Schools
- Validator expects: `school_id`, `district_id`, `name`, `created`, `last_modified`, etc.
- Firestore: `schools/{id}` has `districtId`, `name`, `createdAt`, `updatedAt`
- Mapping: `school_id` from doc id, `district_id` from `districtId`
- Risk: none (optional fields optional)

### Classes
- Validator expects: `class_id`, `school_id`, `district_id`, `name`
- Firestore: `classes/{id}` has `schoolId`, `districtId`, `name`
- Risk: `entity_controller.set_classes` validates with `SchoolBase` instead of `ClassBase`,
  so class records are validated against the wrong model.

### Tasks
- Validator expects: `task_id`, `name`, **required** `last_updated`
- Firestore: `tasks/{taskId}` has `name`, `description`, optional `lastUpdated`
- Risk: `last_updated` required by validator but optional in schema/data

### Variants
- Validator expects: `variant_id`, `task_id`, **required** `last_updated`, optional `variant_name`
- Firestore: `tasks/{taskId}/variants/{variantId}` has `name`, optional `lastUpdated`
- Risk: `last_updated` required by validator but optional in schema/data; `variant_name`
  is not automatically mapped from Firestore `name`

### Users
- Validator expects: `user_id`, **required** `user_type`, optional `birth_year`, `birth_month`,
  `student_data`, org maps
- Firestore: `users/{uid}` has `userType`, org maps, `createdAt`, `legal`, etc.
- Mapping: `user_id` from doc id, `user_type` from `userType`
- Risk: validator date filtering uses `lastUpdated` on users; schema docs do not define it

### Assignments (Administrations)
- Validator expects: `assignment_id`, `name`, `sequential`, `created_by`,
  `date_created`, `date_opened`, `date_closed`
- Firestore: `administrations/{id}` has `createdBy`, `dateCreated`, `dateOpened`, `dateClosed`
- Mapping: camel→snake handles names
- Risk: relies on date fields being present

### Runs
- Validator expects: `run_id`, `user_id`, `task_id`, **required** `variant_id`
- Firestore: `users/{uid}/runs/{runId}` has `taskId`, optional `userData.variantId`
- Risk: validator expects `variant_id` at root; may be missing

### Trials
- Validator expects: `trial_id`, `user_id`, `run_id`, `task_id`,
  **required** `assessment_stage`, **required** `server_timestamp`
- Firestore: trials have these fields optional or task-specific
- Risk: validator requires fields optional in Firestore

### Survey responses
- Validator expects: `users/{uid}/surveyResponses` with `data.surveyResponses` shape
- Firestore: shape not defined in schema; validator assumes `createdAt` and nested keys
- Risk: survey response schema drift can break validator

### Cross-project assumption
- Validator uses separate Firestore apps (`assessment_site` vs `admin_site`)
- Levante is migrating to a single admin DB
- Risk: task/run/trial data location mismatch

## Integrity risks (summary)

1. Required vs optional mismatch: tasks/variants/trials/runs require fields that are optional in Firestore.
2. Date filter dependencies: `lastUpdated`, `dateCreated`, `createdAt` must exist and be indexed.
3. Class validation bug: classes validated with the School schema.
4. Dual‑DB assumption: validator expects separate assessment DB.

## Change impact checklist

- Any rename or removal of required validator fields?
- Any change to date fields used in queries?
- Any move of runs/trials/tasks between admin/assessment DBs?
- Any change to surveyResponses structure?
