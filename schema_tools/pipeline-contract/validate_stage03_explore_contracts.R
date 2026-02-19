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
stage03_explore_contract <- contract$pilotsContracts$stage03ExploreTasks

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

message("Stage 03 explore contract validation passed.")
