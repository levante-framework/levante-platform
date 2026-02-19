required_packages <- c("jsonlite", "readr")
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

library(jsonlite)
library(readr)

read_contract <- function() {
  contract_path <- "schema_tools/PIPELINE_DATA_CONTRACT.json"
  if (!file.exists(contract_path)) stop("Missing contract file: ", contract_path, call. = FALSE)
  jsonlite::read_json(contract_path, simplifyVector = FALSE)
}

has_path <- function(obj, dotted_path) {
  segments <- strsplit(dotted_path, "\\.", fixed = FALSE)[[1]]
  node <- obj
  for (segment in segments) {
    if (is.null(node) || is.null(node[[segment]])) return(FALSE)
    node <- node[[segment]]
  }
  TRUE
}

assert_json_required_paths <- function(boundary_name, boundary_cfg) {
  fixture_path <- boundary_cfg$fixture
  if (!file.exists(fixture_path)) stop("[", boundary_name, "] Missing fixture: ", fixture_path, call. = FALSE)

  payload <- jsonlite::read_json(fixture_path, simplifyVector = FALSE)
  required_paths <- unlist(boundary_cfg$requiredPaths)
  missing_paths <- required_paths[!vapply(required_paths, function(path) has_path(payload, path), logical(1))]

  if (length(missing_paths) > 0) {
    stop(
      "[",
      boundary_name,
      "] Missing required path(s): ",
      paste(missing_paths, collapse = ", "),
      call. = FALSE
    )
  }
}

assert_csv_required_columns <- function(boundary_name, boundary_cfg) {
  fixture_path <- boundary_cfg$fixture
  if (!file.exists(fixture_path)) stop("[", boundary_name, "] Missing fixture: ", fixture_path, call. = FALSE)

  df <- readr::read_csv(fixture_path, show_col_types = FALSE)
  required_columns <- unlist(boundary_cfg$requiredColumns)
  missing_columns <- setdiff(required_columns, names(df))

  if (length(missing_columns) > 0) {
    stop(
      "[",
      boundary_name,
      "] Missing required column(s): ",
      paste(missing_columns, collapse = ", "),
      call. = FALSE
    )
  }
}

contract <- read_contract()
boundaries <- contract$pipelineBoundaries

assert_json_required_paths("dashboardToDatabaseClient", boundaries$dashboardToDatabaseClient)
assert_json_required_paths("databaseClientToFunctions", boundaries$databaseClientToFunctions)
assert_json_required_paths("functionsToDataValidator", boundaries$functionsToDataValidator)
assert_csv_required_columns("dataValidatorToPilots", boundaries$dataValidatorToPilots)

message("Pipeline boundary validation passed.")
