# Validator Contract (Firestore → Pydantic)

<!-- schema:validator:meta:start -->
Schema source: `apps/server/levante-firebase-functions/functions/levante-admin/firestore-schema.ts`
Schema sha256: `ce0d6ca6debab06106807d77703340b9e7931e666b28e1820808fb4da76d415d`
Last synced: `2026-02-03T18:38:36.746Z`
<!-- schema:validator:meta:end -->

This contract captures the **minimum expected fields** the `data-validator`
relies on. It is derived from:
- `/home/david/levante/data-validator/core_models.py`
- `/home/david/levante/data-validator/firestore_services.py`
- `/home/david/levante/data-validator/entity_controller.py`

The validator converts Firestore doc keys from camelCase to snake_case
(`process_doc_dict`) and adds IDs from document paths.

## Conventions

- `required` means the validator model requires the field to exist.
- `optional` means the validator can accept missing values.
- `derived` means the validator constructs the field from Firestore metadata.
- `source` refers to the Firestore field name before snake_case conversion.

## Collections

### groups
**Source:** `groups/{groupId}`

Required:
- `group_id` (derived from doc id)
- `name` (source: `name`)

Optional:
- `abbreviation` (source: `abbreviation`)
- `tags` (source: `tags`)
- `created_at` (source: `createdAt`)

### districts
**Source:** `districts/{districtId}`

Required:
- `district_id` (derived from doc id)
- `name` (source: `name`)

Optional:
- `district_contact` (source: `districtContact`)
- `last_sync` (source: `lastSync`)
- `launch_date` (source: `launchDate`)
- `created_at` (source: `createdAt`)
- `last_updated` (source: `lastUpdated`)
- `tags` (source: `tags`)

### schools
**Source:** `schools/{schoolId}`

Required:
- `school_id` (derived from doc id)
- `district_id` (source: `districtId`)
- `name` (source: `name`)

Optional:
- `created` (source: `createdAt`)
- `last_modified` (source: `updatedAt`)
- `school_number`, `state_id`, `phone`, `principal`, `location`, `high_grade`, `low_grade`

### classes
**Source:** `classes/{classId}`

Required:
- `class_id` (derived from doc id)
- `school_id` (source: `schoolId`)
- `district_id` (source: `districtId`)
- `name` (source: `name`)

Optional:
- `subject`, `grade`, `created`, `last_modified`

### tasks
**Source:** `tasks/{taskId}`

Required:
- `task_id` (derived from doc id)
- `name` (source: `name`)
- `last_updated` (source: `lastUpdated`)

Optional:
- `description`
- `image_url` (source: `image`)
- `registered`

### variants
**Source:** `tasks/{taskId}/variants/{variantId}`

Required:
- `variant_id` (derived from doc id)
- `task_id` (derived from parent path)
- `last_updated` (source: `lastUpdated`)

Optional:
- `variant_name` (source: `name`)
- `language`, `corpus`, `max_time`, `max_incorrect`, `number_of_trials`, `num_of_practice_trials`,
  `sequential_practice`, `sequential_stimulus`, `button_layout`, `skip_instructions`, `stimulus_blocks`

### users
**Source:** `users/{userId}` (or `guests/{guestId}` in guest mode)

Required:
- `user_id` (derived from doc id)
- `user_type` (source: `userType`)

Optional:
- `assessment_pid` (source: `assessmentPid`)
- `assessment_uid` (source: `assessmentUid`)
- `email`, `email_verified`, `created_at` (source: `createdAt`)
- `last_updated` (source: `lastUpdated`)
- `birth_year` (source: `birthYear`)
- `birth_month` (source: `birthMonth`)
- `student_data` (source: `studentData`)
- `groups`, `classes`, `schools`, `districts` (org maps)

### administrations (assignments)
**Source:** `administrations/{administrationId}`

Required:
- `assignment_id` (derived from doc id)
- `name` (source: `name`)
- `sequential` (source: `sequential`)
- `created_by` (source: `createdBy`)
- `date_created` (source: `dateCreated`)
- `date_opened` (source: `dateOpened`)
- `date_closed` (source: `dateClosed`)

Optional:
- `public_name` (source: `publicName`)
- `districts`, `schools`, `classes`, `families`
- `assessments` (array used for assignment_tasks)

### runs
**Source:** `users/{userId}/runs/{runId}`

Required:
- `run_id` (derived from doc id)
- `user_id` (derived from parent path)
- `task_id` (source: `taskId`)
- `variant_id` (source: `variantId` or `userData.variantId`)

Optional:
- `assignment_id` (source: `assignmentId`)
- `reliable`, `completed`
- `time_started` (source: `timeStarted`)
- `time_finished` (source: `timeFinished`)
- `scores` (source: `scores`)

### trials
**Source:** `users/{userId}/runs/{runId}/trials/{trialId}`

Required:
- `trial_id` (derived from doc id)
- `user_id` (derived from parent path)
- `run_id` (derived from parent path)
- `task_id` (derived from parent path)
- `assessment_stage` (source: `assessment_stage`)
- `server_timestamp` (source: `serverTimestamp`)

Optional:
- `trial_index`, `item`, `answer`, `response`, `correct`, `response_source`,
  `time_elapsed`, `rt`, `corpus_trial_type`, `response_type`, `distractors`

### surveyResponses
**Source:** `users/{userId}/surveyResponses/{surveyId}`

Required:
- `survey_response_id` (derived from doc id)
- `user_id` (derived from parent path)
- `created_at` (source: `createdAt`)

Optional:
- survey response keys extracted from `data.surveyResponses.*`

## Validator query dependencies

The validator **filters by date** on these fields. If any are renamed or removed,
validation may return empty results:
- `groups.createdAt`
- `districts.createdAt`
- `administrations.dateCreated`
- `users.lastUpdated` (or `users.created` for guests)
- `users/{uid}/surveyResponses.createdAt`

## Known divergences (must be resolved or accepted)

- Tasks/variants require `last_updated` in validator; schema marks `lastUpdated` optional.
- Runs require `variant_id` but Firestore may store it under `userData.variantId`.
- Trials require `assessment_stage` and `server_timestamp` but these are task-dependent.
- Classes are validated using `SchoolBase` in `entity_controller.set_classes`.
