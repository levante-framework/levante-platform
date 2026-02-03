# Schema ↔ Validator Mapping

<!-- schema:validator:meta:start -->
Schema source: `apps/server/levante-firebase-functions/functions/levante-admin/firestore-schema.ts`
Schema sha256: `ce0d6ca6debab06106807d77703340b9e7931e666b28e1820808fb4da76d415d`
Last synced: `2026-02-03T19:41:12.690Z`
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
- Validator expects: `class_id`, `school_id`, `district_id`, `class_name`
- Firestore: `classes/{id}` has `schoolId`, `districtId`, `name`
- Mapping: `class_name` from `name`
- Risk: `entity_controller.set_classes` validates with `SchoolBase` instead of `ClassBase`,
  so class records are validated against the wrong model.

### Tasks
- Validator expects: `task_id`, `task_name`, **required** `last_updated`
- Firestore: `tasks/{taskId}` has `name`, `description`, optional `lastUpdated`
- Mapping: `task_name` from `name`
- Risk: `last_updated` required by validator but optional in schema/data

### Variants
- Validator expects: `variant_id`, `task_id`, optional `variant_name`, optional `last_updated`
- Firestore: `tasks/{taskId}/variants/{variantId}` has `name`, optional `lastUpdated`
- Mapping: `variant_name` from `name` (explicitly mapped in validator)
- Risk: none (last_updated optional)

### Users
- Validator expects: `user_id`, **required** `user_type`, optional `birth_year`, `birth_month`,
  `groups|classes|schools|districts` org maps, `parent1_id`, `parent2_id`, `teacher_id`
- Firestore: `users/{uid}` has `userType`, org maps, `parentIds`, `teacherIds`
- Mapping: `user_id` from doc id, `user_type` from `userType`,
  `parent1_id/parent2_id` from `parentIds`, `teacher_id` from `teacherIds[0]`
- Risk: validator date filtering uses `lastUpdated` on users; schema docs do not define it

### Administrations
- Validator expects: `administration_id`, `administration_name`, `sequential`, `created_by`,
  `date_created`, `date_opened`, `date_closed`
- Firestore: `administrations/{id}` has `createdBy`, `dateCreated`, `dateOpened`, `dateClosed`
- Mapping: `administration_name` from `name`
- Risk: relies on date fields being present

### User administrations (derived)
- Validator derives user administrations from user doc maps:
  `assignmentsAssigned`, `assignmentsStarted`, `assignmentsCompleted`
- Firestore: `users/{uid}.assignments.*` maps (with timestamps)
- Mapping: `administration_id` from map key, dates from map values

### Runs
- Validator expects: `run_id`, `user_id`, `task_id`, **required** `variant_id`
- Firestore: `users/{uid}/runs/{runId}` has `taskId`, optional `userData.variantId`
- Risk: validator expects `variant_id` at root; may be missing if stored under `userData`

### Trials
- Validator expects: `trial_id`, `user_id`, `run_id`, `task_id`, **required** `assessment_stage`
- Firestore: trials have `assessment_stage` task-dependent
- Risk: validator requires `assessment_stage` which is optional in Firestore

### Surveys and survey responses (derived)
- Validator reads `users/{uid}/surveyResponses` and supports multiple shapes:
  legacy `data.surveyResponses`, `general/specific`, or root-level `responses`.
- Firestore: schema not defined; validator depends on `createdAt`, `updatedAt`,
  `administrationId`, `isComplete`
- Output tables: `surveys` and `survey_responses` are derived from those docs.
- Risk: survey response schema drift can break validator

### Cross-project assumption
- Validator uses **admin-only** Firestore in `levante_main`
- Risk: none related to assessment DB (removed)

## Integrity risks (summary)

1. Required vs optional mismatch: tasks/trials/runs require fields that are optional in Firestore.
2. Date filter dependencies: `lastUpdated`, `dateCreated`, `createdAt` must exist and be indexed.
3. Class validation bug: classes validated with the School schema.

## Change impact checklist

- Any rename or removal of required validator fields?
- Any change to date fields used in queries?
- Any move of runs/trials/tasks between admin/assessment DBs?
- Any change to surveyResponses structure?
