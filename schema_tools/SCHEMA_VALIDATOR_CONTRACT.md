# Validator Contract (Firestore → Pydantic)

<!-- schema:validator:meta:start -->
Schema source: `apps/server/levante-firebase-functions/functions/levante-admin/firestore-schema.ts`
Schema sha256: `ce0d6ca6debab06106807d77703340b9e7931e666b28e1820808fb4da76d415d`
Last synced: `2026-02-03T19:41:12.690Z`
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

### sites (derived)
**Source:** `districts/{districtId}` via `get_org_by_org_id_list(org_name="site")`

Required:
- `site_id` (derived from doc id)
- `site_name` (source: `name`)

Optional:
- `site_abbreviation` (source: `abbreviation`)
- `created_at` (source: `createdAt`)
- `updated_at` (source: `updatedAt`)

### cohorts (derived)
**Source:** `groups/{groupId}` via `get_org_by_org_id_list(org_name="cohort")`

Required:
- `cohort_id` (derived from doc id)
- `cohort_name` (source: `name`)

Optional:
- `cohort_abbreviation` (source: `abbreviation`)
- `tags` (source: `tags`)
- `created_at` (source: `createdAt`)
- `last_updated` (source: `updatedAt`)

### schools
**Source:** `schools/{schoolId}`

Required:
- `school_id` (derived from doc id)
- `district_id` (source: `districtId`)
- `school_name` (source: `name`)

Optional:
- `school_abbreviation` (source: `abbreviation`)
- `created` (source: `createdAt`)
- `last_modified` (source: `updatedAt`)
- `school_number`, `state_id`, `phone`, `principal`, `location`, `high_grade`, `low_grade`

### classes
**Source:** `classes/{classId}`

Required:
- `class_id` (derived from doc id)
- `school_id` (source: `schoolId`)
- `district_id` (source: `districtId`)
- `class_name` (source: `name`)

Optional:
- `class_abbreviation` (source: `abbreviation`)
- `grade`, `created`, `last_modified`

### tasks
**Source:** `tasks/{taskId}`

Required:
- `task_id` (derived from doc id)
- `task_name` (source: `name`)
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

Optional:
- `variant_name` (source: `name`)
- `language`, `corpus`, `max_time`, `max_incorrect`, `number_of_trials`, `num_of_practice_trials`,
  `sequential_practice`, `sequential_stimulus`, `button_layout`, `skip_instructions`, `stimulus_blocks`
- `key_helpers`, `store_item_id`, `last_updated`
- `adaptive` (validator-derived from variant_name)

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
- `parent1_id` / `parent2_id` (source: `parentIds`)
- `teacher_id` (source: `teacherIds`)
- Note: new link maps live under `parentLinks.current` / `teacherLinks.current` and may need validator fallback logic.
- `sex` (source: `sex`)
- `grade` (source: `grade`)
- `valid_user`, `validation_msg_user` (validator-derived)

### administrations
**Source:** `administrations/{administrationId}`

Required:
- `administration_id` (derived from doc id)
- `administration_name` (source: `name`)
- `sequential` (source: `sequential`)
- `created_by` (source: `createdBy`)
- `date_created` (source: `dateCreated`)
- `date_opened` (source: `dateOpened`)
- `date_closed` (source: `dateClosed`)

Optional:
- `public_name` (source: `publicName`)
- `districts`, `schools`, `classes`, `families`
- `assessments` (array used for assignment_tasks)

### user_administrations (derived)
**Source:** `users/{userId}.assignmentsAssigned|Started|Completed`

Required:
- `user_id` (from doc id)
- `administration_id` (map key)

Optional:
- `date_assigned` (value from `assignmentsAssigned`)
- `date_started` (value from `assignmentsStarted`)
- `is_completed` (in `assignmentsCompleted`)

### user_sites (derived)
**Source:** `users/{userId}.districts` org map

Required:
- `user_id`
- `site_id`
- `is_active` (derived from `current` membership)

### user_cohorts (derived)
**Source:** `users/{userId}.groups` org map

Required:
- `user_id`
- `cohort_id`
- `is_active` (derived from `current` membership)

### user_schools (derived)
**Source:** `users/{userId}.schools` org map

Required:
- `user_id`
- `school_id`
- `is_active` (derived from `current` membership)

### user_classes (derived)
**Source:** `users/{userId}.classes` org map

Required:
- `user_id`
- `class_id`
- `is_active` (derived from `current` membership)

### runs
**Source:** `users/{userId}/runs/{runId}`

Required:
- `run_id` (derived from doc id)
- `user_id` (derived from parent path)
- `task_id` (source: `taskId`)
- `variant_id` (source: `variantId` or `userData.variantId`)

Optional:
- `assignment_id` (source: `assignmentId`)
- `administration_id` (source: `assignmentId`)
- `age` (validator-derived from user birthdate + time_started)
- `reliable`, `completed`
- `best_run`, `task_version`
- `time_started` (source: `timeStarted`)
- `time_finished` (source: `timeFinished`)
- `scores` (source: `scores`)
- `valid_run`, `validation_msg_run`, `warning_msg_run`, `bc_p_below` (validator-derived)

### trials
**Source:** `users/{userId}/runs/{runId}/trials/{trialId}`

Required:
- `trial_id` (derived from doc id)
- `user_id` (derived from parent path)
- `run_id` (derived from parent path)
- `task_id` (derived from parent path)
- `assessment_stage` (source: `assessment_stage`)

Optional:
- `trial_index`, `item`, `answer`, `response`, `correct`, `response_source`,
  `time_elapsed`, `rt`, `rt_numeric`, `corpus_trial_type`, `response_type`, `distractors`
- `item_id`, `item_uid`, `difficulty`
- `response_location`, `trial_mode`, `corpus_id`
- `valid_trial`, `validation_msg_trial`, `warning_msg_trial` (validator-derived)

### surveys (derived)
**Source:** `users/{userId}/surveyResponses/{surveyId}`

Required:
- `survey_id` (derived from doc id + scope)
- `administration_id` (source: `administrationId`)
- `user_id` (derived from parent path)
- `survey_type` (derived from user type)
- `created_at` (source: `createdAt`)

Optional:
- `survey_part` (derived from response scope)
- `child_id` (source: `childId`)
- `is_complete` (source: `isComplete`)
- `updated_at` (source: `updatedAt`)

### survey_responses (derived)
**Source:** `users/{userId}/surveyResponses/{surveyId}`

Required:
- `survey_id` (derived from doc id + scope)
- `question` (derived from response keys)
- `timestamp` (response time or `createdAt`)

Optional:
- `boolean_response`, `string_response`, `numeric_response`
 
## Validator output tables

The validator emits these tables (see `utils.schema_registry()`):

- `sites`, `cohorts`, `schools`, `classes`
- `tasks`, `variants`
- `administrations`, `user_administrations`
- `users`, `user_sites`, `user_cohorts`, `user_schools`, `user_classes`
- `runs`, `trials`
- `surveys`, `survey_responses`

## Field origin maps

Each map shows the validator field and its Firestore source.

### sites
| Validator field | Firestore source |
| --- | --- |
| `site_id` | `districts/{id}` doc id |
| `site_name` | `districts.name` |
| `site_abbreviation` | `districts.abbreviation` |
| `created_at` | `districts.createdAt` |
| `updated_at` | `districts.updatedAt` |

### cohorts
| Validator field | Firestore source |
| --- | --- |
| `cohort_id` | `groups/{id}` doc id |
| `cohort_name` | `groups.name` |
| `cohort_abbreviation` | `groups.abbreviation` |
| `tags` | `groups.tags` |
| `created_at` | `groups.createdAt` |
| `last_updated` | `groups.updatedAt` |

### schools
| Validator field | Firestore source |
| --- | --- |
| `school_id` | `schools/{id}` doc id |
| `district_id` | `schools.districtId` |
| `school_name` | `schools.name` |
| `school_abbreviation` | `schools.abbreviation` |
| `created` | `schools.createdAt` |
| `last_modified` | `schools.updatedAt` |

### classes
| Validator field | Firestore source |
| --- | --- |
| `class_id` | `classes/{id}` doc id |
| `school_id` | `classes.schoolId` |
| `district_id` | `classes.districtId` |
| `class_name` | `classes.name` |
| `class_abbreviation` | `classes.abbreviation` |
| `grade` | `classes.grade` |
| `created` | `classes.createdAt` |
| `last_modified` | `classes.updatedAt` |

### tasks
| Validator field | Firestore source |
| --- | --- |
| `task_id` | `tasks/{id}` doc id |
| `task_name` | `tasks.name` |
| `description` | `tasks.description` |
| `image_url` | `tasks.image` |
| `last_updated` | `tasks.lastUpdated` |
| `registered` | `tasks.registered` |

### variants
| Validator field | Firestore source |
| --- | --- |
| `variant_id` | `tasks/{taskId}/variants/{id}` doc id |
| `task_id` | parent `taskId` |
| `variant_name` | `variants.name` |
| `last_updated` | `variants.lastUpdated` |
| `language` | `variants.params.language` (flattened) |
| `corpus` | `variants.params.corpus` (flattened) |
| `max_time` | `variants.params.maxTime` (flattened) |
| `max_incorrect` | `variants.params.maxIncorrect` (flattened) |
| `number_of_trials` | `variants.params.numberOfTrials` (flattened) |
| `num_of_practice_trials` | `variants.params.numOfPracticeTrials` (flattened) |
| `sequential_practice` | `variants.params.sequentialPractice` (flattened) |
| `sequential_stimulus` | `variants.params.sequentialStimulus` (flattened) |
| `button_layout` | `variants.params.buttonLayout` (flattened) |
| `skip_instructions` | `variants.params.skipInstructions` (flattened) |
| `stimulus_blocks` | `variants.params.stimulusBlocks` (flattened) |
| `key_helpers` | `variants.params.keyHelpers` (flattened) |
| `store_item_id` | `variants.params.storeItemId` (flattened) |

### users
| Validator field | Firestore source |
| --- | --- |
| `user_id` | `users/{id}` doc id |
| `user_type` | `users.userType` |
| `assessment_pid` | `users.assessmentPid` |
| `assessment_uid` | `users.assessmentUid` |
| `email` | `users.email` |
| `email_verified` | `users.emailVerified` |
| `created_at` | `users.createdAt` |
| `last_updated` | `users.lastUpdated` |
| `birth_year` | `users.birthYear` |
| `birth_month` | `users.birthMonth` |
| `student_data` | `users.studentData` |
| `groups` | `users.groups` |
| `classes` | `users.classes` |
| `schools` | `users.schools` |
| `districts` | `users.districts` |
| `teacher_id` | `users.teacherIds[0]` |
| `parent1_id` | `users.parentIds[0]` |
| `parent2_id` | `users.parentIds[1]` |
| `sex` | `users.sex` |
| `grade` | `users.grade` |

### administrations
| Validator field | Firestore source |
| --- | --- |
| `administration_id` | `administrations/{id}` doc id |
| `administration_name` | `administrations.name` |
| `public_name` | `administrations.publicName` |
| `sequential` | `administrations.sequential` |
| `created_by` | `administrations.createdBy` |
| `date_created` | `administrations.dateCreated` |
| `date_opened` | `administrations.dateOpened` |
| `date_closed` | `administrations.dateClosed` |
| `districts` | `administrations.districts` |
| `schools` | `administrations.schools` |
| `classes` | `administrations.classes` |
| `families` | `administrations.families` |
| `assessments` | `administrations.assessments` |

### user_administrations
| Validator field | Firestore source |
| --- | --- |
| `user_id` | `users/{id}` doc id |
| `administration_id` | key from `users.assignmentsAssigned` |
| `date_assigned` | value from `users.assignmentsAssigned[administration_id]` |
| `date_started` | value from `users.assignmentsStarted[administration_id]` |
| `is_completed` | presence in `users.assignmentsCompleted` |

### user_sites
| Validator field | Firestore source |
| --- | --- |
| `user_id` | `users/{id}` doc id |
| `site_id` | `users.districts.all/current` |
| `is_active` | `site_id` in `users.districts.current` |

### user_cohorts
| Validator field | Firestore source |
| --- | --- |
| `user_id` | `users/{id}` doc id |
| `cohort_id` | `users.groups.all/current` |
| `is_active` | `cohort_id` in `users.groups.current` |

### user_schools
| Validator field | Firestore source |
| --- | --- |
| `user_id` | `users/{id}` doc id |
| `school_id` | `users.schools.all/current` |
| `is_active` | `school_id` in `users.schools.current` |

### user_classes
| Validator field | Firestore source |
| --- | --- |
| `user_id` | `users/{id}` doc id |
| `class_id` | `users.classes.all/current` |
| `is_active` | `class_id` in `users.classes.current` |

### runs
| Validator field | Firestore source |
| --- | --- |
| `run_id` | `users/{id}/runs/{runId}` doc id |
| `user_id` | parent doc id |
| `task_id` | `runs.taskId` |
| `variant_id` | `runs.variantId` or `runs.userData.variantId` |
| `administration_id` | `runs.assignmentId` |
| `reliable` | `runs.reliable` |
| `completed` | `runs.completed` |
| `best_run` | `runs.bestRun` |
| `task_version` | `runs.taskVersion` |
| `time_started` | `runs.timeStarted` |
| `time_finished` | `runs.timeFinished` |
| `scores` | `runs.scores` |

### trials
| Validator field | Firestore source |
| --- | --- |
| `trial_id` | `runs/{runId}/trials/{trialId}` doc id |
| `user_id` | parent user id |
| `run_id` | parent run id |
| `task_id` | parent run `taskId` |
| `assessment_stage` | `trials.assessment_stage` |
| `trial_index` | `trials.trial_index` |
| `item` | `trials.item` |
| `answer` | `trials.answer` |
| `response` | `trials.response` |
| `correct` | `trials.correct` |
| `response_source` | `trials.responseSource` |
| `time_elapsed` | `trials.time_elapsed` |
| `rt` | `trials.rt` |
| `corpus_trial_type` | `trials.corpus_trial_type` |
| `response_type` | `trials.responseType` |
| `distractors` | `trials.distractors` |
| `response_location` | `trials.responseLocation` |

### surveys
| Validator field | Firestore source |
| --- | --- |
| `survey_id` | `surveyResponses/{id}` doc id + scope |
| `administration_id` | `surveyResponses.administrationId` |
| `user_id` | parent user id |
| `child_id` | `surveyResponses.specific[].childId` |
| `survey_type` | derived from user type |
| `survey_part` | derived from response scope |
| `is_complete` | `surveyResponses.isComplete` or `surveyResponses.*.isComplete` |
| `created_at` | `surveyResponses.createdAt` |
| `updated_at` | `surveyResponses.updatedAt` |

### survey_responses
| Validator field | Firestore source |
| --- | --- |
| `survey_id` | `surveyResponses/{id}` doc id + scope |
| `question` | response key |
| `boolean_response` | `responses.*` coerced to bool |
| `string_response` | `responses.*` coerced to string |
| `numeric_response` | `responses.*` coerced to int |
| `timestamp` | `responses.*.responseTime` or `surveyResponses.createdAt` |

## ROAR task Firekit writes (PA/SWR/SRE)

This is a quick summary of Firekit write targets for the three ROAR tasks.
Full mapping with field-level deltas lives in `schema_tools/ROAR_FIREKIT_SCHEMA_MAPPING.md`.

| Collection | Firekit writes (summary) | Notes |
| --- | --- | --- |
| `tasks/{taskId}` | task metadata + `lastUpdated` | Writes extra fields not in schema (`gameConfig`, `external`, `testData`, `demoData`). |
| `tasks/{taskId}/variants/{variantId}` | variant params + `lastUpdated` | Writes `external`, `testData`, `demoData`; schema has `variantURL`. |
| `users/{roarUid}` / `guests/{assessmentUid}` | user metadata + `tasks`/`variants` arrays | User schema doesn’t model these fields. |
| `users/{roarUid}/runs/{runId}` | run status, scores, engagement | Writes `taskVersion`, `reliableByBlock`, `engagementFlags`, `interactions.*`. |
| `users/{roarUid}/runs/{runId}/trials/{trialId}` | trial payload + interaction arrays | `TrialDoc` is permissive; no strict mismatch. |

## Validator query dependencies

The validator **filters by date** on these fields. If any are renamed or removed,
validation may return empty results:
- `groups.createdAt`
- `districts.createdAt`
- `administrations.dateCreated`
- `users.lastUpdated` (or `users.created` for guests)
- `users/{uid}/surveyResponses.createdAt`

## Known divergences (must be resolved or accepted)

- Tasks require `last_updated` in validator; schema marks `lastUpdated` optional.
- Runs require `variant_id` but Firestore may store it under `userData.variantId`.
- Trials require `assessment_stage` but this is task-dependent.
- Classes are validated using `SchoolBase` in `entity_controller.set_classes`.
- User links are moving from `teacherIds`/`parentIds` to `teacherLinks`/`parentLinks` with `current` lists.
- `users.assignments.excluded` exists for per-user exclusions; validator does not consume it yet.
