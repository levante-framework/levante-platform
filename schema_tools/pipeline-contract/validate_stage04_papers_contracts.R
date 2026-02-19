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
stage04_contract <- contract$pilotsContracts$stage04Papers

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

message("Stage 04 papers contract validation passed.")
