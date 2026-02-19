required_packages <- c("dplyr", "jsonlite", "readr", "tibble")
missing_packages <- required_packages[!vapply(required_packages, requireNamespace, FUN.VALUE = logical(1), quietly = TRUE)]
if (length(missing_packages) > 0) {
  user_lib <- Sys.getenv("R_LIBS_USER")
  if (identical(user_lib, "")) {
    user_lib <- path.expand("~/R/library")
  } else {
    user_lib <- path.expand(user_lib)
  }
  if (!dir.exists(user_lib)) dir.create(user_lib, recursive = TRUE, showWarnings = FALSE)
  .libPaths(c(user_lib, .libPaths()))
  install.packages(missing_packages, repos = "https://cloud.r-project.org", lib = user_lib)
}

library(dplyr)
library(jsonlite)
library(readr)
library(tibble)

source("schema_tools/pipeline-contract/contract_validators.R")

contract <- read_pipeline_contract()
task_contract <- contract$pilotsContracts$taskData
survey_contract <- contract$pilotsContracts$surveyData
stage02_contract <- contract$pilotsContracts$stage02Scores
stage03_contract <- contract$pilotsContracts$stage03Summaries
stage03_explore_contract <- contract$pilotsContracts$stage03ExploreTasks
stage04_contract <- contract$pilotsContracts$stage04Papers

task_fixture <- readr::read_csv(
  "schema_tools/pipeline-contract/fixtures/task_trials_prelim_fixture.csv",
  show_col_types = FALSE
)
assert_required_columns(task_fixture, task_contract$requiredColumns, dataset_name = "task_fixture")
assert_parseable_timestamp(task_fixture, "server_timestamp", dataset_name = "task_fixture")
assert_unique_keys(
  task_fixture,
  c("dataset", "task_id", "user_id", "run_id", "trial_id"),
  dataset_name = "task_fixture"
)
write_schema_snapshot(
  task_fixture,
  dataset_name = "task_fixture",
  key_columns = c("dataset", "task_id", "user_id", "run_id", "trial_id"),
  output_path = "schema_tools/pipeline-contract/out/task_fixture.schema.txt"
)

survey_fixture <- readr::read_csv(
  "schema_tools/pipeline-contract/fixtures/survey_data_fixture.csv",
  show_col_types = FALSE
)
assert_required_columns(survey_fixture, survey_contract$requiredColumns, dataset_name = "survey_fixture")
assert_non_missing(survey_fixture, "survey_type", dataset_name = "survey_fixture")
write_schema_snapshot(
  survey_fixture,
  dataset_name = "survey_fixture",
  key_columns = c("survey_type"),
  output_path = "schema_tools/pipeline-contract/out/survey_fixture.schema.txt"
)

stage02_fixture <- readr::read_csv(
  "schema_tools/pipeline-contract/fixtures/stage02_scores_fixture.csv",
  show_col_types = FALSE
)
assert_required_columns(stage02_fixture, stage02_contract$requiredColumns, dataset_name = "stage02_scores_fixture")
assert_non_missing(stage02_fixture, "run_id", dataset_name = "stage02_scores_fixture")
assert_numeric_columns(stage02_fixture, stage02_contract$numericColumns, dataset_name = "stage02_scores_fixture")
assert_non_negative(stage02_fixture, stage02_contract$nonNegativeColumns, dataset_name = "stage02_scores_fixture")
assert_unique_keys(stage02_fixture, stage02_contract$keyColumns, dataset_name = "stage02_scores_fixture")
write_schema_snapshot(
  stage02_fixture,
  dataset_name = "stage02_scores_fixture",
  key_columns = stage02_contract$keyColumns,
  output_path = "schema_tools/pipeline-contract/out/stage02_scores_fixture.schema.txt"
)

stage03_fixture <- readr::read_csv(
  "schema_tools/pipeline-contract/fixtures/stage03_scores_counts_fixture.csv",
  show_col_types = FALSE
)
assert_required_columns(stage03_fixture, stage03_contract$requiredColumns, dataset_name = "stage03_summaries_fixture")
assert_non_missing(stage03_fixture, "site", dataset_name = "stage03_summaries_fixture")
assert_numeric_columns(stage03_fixture, stage03_contract$numericColumns, dataset_name = "stage03_summaries_fixture")
assert_non_negative(stage03_fixture, stage03_contract$nonNegativeColumns, dataset_name = "stage03_summaries_fixture")
assert_unique_keys(stage03_fixture, c("site"), dataset_name = "stage03_summaries_fixture")
write_schema_snapshot(
  stage03_fixture,
  dataset_name = "stage03_summaries_fixture",
  key_columns = c("site"),
  output_path = "schema_tools/pipeline-contract/out/stage03_summaries_fixture.schema.txt"
)

stage03_explore_fixture <- readr::read_csv(
  "schema_tools/pipeline-contract/fixtures/stage03_explore_fixture.csv",
  show_col_types = FALSE
)
assert_required_columns(
  stage03_explore_fixture,
  stage03_explore_contract$requiredInputColumns,
  dataset_name = "stage03_explore_fixture"
)
assert_non_missing(stage03_explore_fixture, "run_id", dataset_name = "stage03_explore_fixture")
assert_numeric_columns(
  stage03_explore_fixture,
  stage03_explore_contract$numericColumns,
  dataset_name = "stage03_explore_fixture"
)
assert_non_negative(
  stage03_explore_fixture,
  stage03_explore_contract$nonNegativeColumns,
  dataset_name = "stage03_explore_fixture"
)
assert_unique_keys(
  stage03_explore_fixture,
  stage03_explore_contract$keyColumns,
  dataset_name = "stage03_explore_fixture"
)
write_schema_snapshot(
  stage03_explore_fixture,
  dataset_name = "stage03_explore_fixture",
  key_columns = stage03_explore_contract$keyColumns,
  output_path = "schema_tools/pipeline-contract/out/stage03_explore_fixture.schema.txt"
)

papers_scores_fixture <- readr::read_csv(
  "schema_tools/pipeline-contract/fixtures/stage04_papers_scores_fixture.csv",
  show_col_types = FALSE
)
assert_required_columns(
  papers_scores_fixture,
  stage04_contract$requiredInputColumns,
  dataset_name = "stage04_papers_scores_fixture"
)
assert_non_missing(papers_scores_fixture, "run_id", dataset_name = "stage04_papers_scores_fixture")
assert_numeric_columns(papers_scores_fixture, c("metric_value"), dataset_name = "stage04_papers_scores_fixture")
assert_non_negative(papers_scores_fixture, c("metric_value"), dataset_name = "stage04_papers_scores_fixture")
assert_unique_keys(
  papers_scores_fixture,
  c("site", "item_task", "run_id", "metric_type"),
  dataset_name = "stage04_papers_scores_fixture"
)
write_schema_snapshot(
  papers_scores_fixture,
  dataset_name = "stage04_papers_scores_fixture",
  key_columns = c("site", "item_task", "run_id", "metric_type"),
  output_path = "schema_tools/pipeline-contract/out/stage04_papers_scores_fixture.schema.txt"
)

papers_reliability_fixture <- readr::read_csv(
  "schema_tools/pipeline-contract/fixtures/stage04_papers_reliability_fixture.csv",
  show_col_types = FALSE
)
assert_required_columns(
  papers_reliability_fixture,
  stage04_contract$requiredReliabilityColumns,
  dataset_name = "stage04_papers_reliability_fixture"
)
assert_numeric_columns(papers_reliability_fixture, c("rxx"), dataset_name = "stage04_papers_reliability_fixture")
assert_non_negative(papers_reliability_fixture, c("rxx"), dataset_name = "stage04_papers_reliability_fixture")
assert_bounded_columns(
  papers_reliability_fixture,
  stage04_contract$boundedColumns,
  dataset_name = "stage04_papers_reliability_fixture"
)
assert_unique_keys(papers_reliability_fixture, c("item_task"), dataset_name = "stage04_papers_reliability_fixture")
write_schema_snapshot(
  papers_reliability_fixture,
  dataset_name = "stage04_papers_reliability_fixture",
  key_columns = c("item_task"),
  output_path = "schema_tools/pipeline-contract/out/stage04_papers_reliability_fixture.schema.txt"
)

message("Fixture contract validation passed.")
