read_pipeline_contract <- function(contract_path = Sys.getenv("PIPELINE_CONTRACT_PATH", unset = "")) {
  if (identical(contract_path, "")) {
    contract_path <- "schema_tools/PIPELINE_DATA_CONTRACT.json"
  }

  if (!file.exists(contract_path)) {
    stop(
      paste0(
        "Pipeline contract file not found at: ",
        contract_path,
        ". Set PIPELINE_CONTRACT_PATH to a valid contract artifact."
      ),
      call. = FALSE
    )
  }

  jsonlite::read_json(contract_path, simplifyVector = TRUE)
}

assert_required_columns <- function(df, required_columns, dataset_name) {
  missing_columns <- setdiff(required_columns, names(df))
  if (length(missing_columns) > 0) {
    stop(
      paste0(
        "[", dataset_name, "] Missing required columns: ",
        paste(missing_columns, collapse = ", ")
      ),
      call. = FALSE
    )
  }
}

assert_parseable_timestamp <- function(df, column_name, dataset_name) {
  if (!column_name %in% names(df)) return(invisible(NULL))

  parsed <- suppressWarnings(as.POSIXct(df[[column_name]], tz = "UTC"))
  failed <- sum(!is.na(df[[column_name]]) & is.na(parsed))
  if (failed > 0) {
    stop(
      paste0(
        "[", dataset_name, "] Column '", column_name, "' has ",
        failed,
        " unparsable timestamp value(s)."
      ),
      call. = FALSE
    )
  }
}

assert_unique_keys <- function(df, key_columns, dataset_name) {
  missing_for_key <- setdiff(key_columns, names(df))
  if (length(missing_for_key) > 0) {
    stop(
      paste0(
        "[", dataset_name, "] Cannot check key uniqueness; missing key column(s): ",
        paste(missing_for_key, collapse = ", ")
      ),
      call. = FALSE
    )
  }

  duplicate_rows <- df |>
    dplyr::count(dplyr::across(dplyr::all_of(key_columns)), name = "n") |>
    dplyr::filter(.data$n > 1)

  if (nrow(duplicate_rows) > 0) {
    stop(
      paste0(
        "[", dataset_name, "] Key uniqueness violation for columns [",
        paste(key_columns, collapse = ", "),
        "]. Duplicate key count: ",
        nrow(duplicate_rows)
      ),
      call. = FALSE
    )
  }
}

assert_non_missing <- function(df, column_name, dataset_name) {
  if (!column_name %in% names(df)) {
    stop(
      paste0("[", dataset_name, "] Missing required column for non-missing check: ", column_name),
      call. = FALSE
    )
  }

  missing_count <- sum(is.na(df[[column_name]]) | trimws(as.character(df[[column_name]])) == "")
  if (missing_count > 0) {
    stop(
      paste0(
        "[", dataset_name, "] Column '", column_name, "' has ",
        missing_count,
        " missing/blank value(s)."
      ),
      call. = FALSE
    )
  }
}

assert_numeric_columns <- function(df, columns, dataset_name) {
  missing_columns <- setdiff(columns, names(df))
  if (length(missing_columns) > 0) {
    stop(
      paste0(
        "[", dataset_name, "] Missing numeric-check column(s): ",
        paste(missing_columns, collapse = ", ")
      ),
      call. = FALSE
    )
  }

  non_numeric <- columns[!vapply(df[columns], is.numeric, logical(1))]
  if (length(non_numeric) > 0) {
    stop(
      paste0(
        "[", dataset_name, "] Expected numeric column(s): ",
        paste(non_numeric, collapse = ", ")
      ),
      call. = FALSE
    )
  }
}

assert_non_negative <- function(df, columns, dataset_name) {
  missing_columns <- setdiff(columns, names(df))
  if (length(missing_columns) > 0) {
    stop(
      paste0(
        "[", dataset_name, "] Missing non-negative-check column(s): ",
        paste(missing_columns, collapse = ", ")
      ),
      call. = FALSE
    )
  }

  for (column_name in columns) {
    negatives <- sum(df[[column_name]] < 0, na.rm = TRUE)
    if (negatives > 0) {
      stop(
        paste0(
          "[", dataset_name, "] Column '", column_name, "' has ",
          negatives,
          " negative value(s)."
        ),
        call. = FALSE
      )
    }
  }
}

assert_bounded_columns <- function(df, bounds, dataset_name) {
  if (is.data.frame(bounds)) {
    bounds_df <- bounds
  } else {
    bounds_df <- as.data.frame(bounds, stringsAsFactors = FALSE)
  }

  for (i in seq_len(nrow(bounds_df))) {
    column_name <- bounds_df$column[[i]]
    min_value <- as.numeric(bounds_df$min[[i]])
    max_value <- as.numeric(bounds_df$max[[i]])

    if (!column_name %in% names(df)) {
      stop(
        paste0("[", dataset_name, "] Missing bounded-check column: ", column_name),
        call. = FALSE
      )
    }

    out_of_bounds <- sum(df[[column_name]] < min_value | df[[column_name]] > max_value, na.rm = TRUE)
    if (out_of_bounds > 0) {
      stop(
        paste0(
          "[", dataset_name, "] Column '", column_name, "' has ",
          out_of_bounds,
          " value(s) outside [", min_value, ", ", max_value, "]."
        ),
        call. = FALSE
      )
    }
  }
}

write_schema_snapshot <- function(df, dataset_name, key_columns, output_path) {
  output_dir <- dirname(output_path)
  if (!dir.exists(output_dir)) dir.create(output_dir, recursive = TRUE)

  schema <- tibble::tibble(
    column = names(df),
    class = vapply(df, function(col) paste(class(col), collapse = "|"), character(1))
  )
  key_info <- if (all(key_columns %in% names(df))) {
    nrow(
      df |>
        dplyr::distinct(dplyr::across(dplyr::all_of(key_columns)))
    )
  } else {
    NA_integer_
  }

  summary_lines <- c(
    paste0("dataset=", dataset_name),
    paste0("rows=", nrow(df)),
    paste0("cols=", ncol(df)),
    paste0("keys=", paste(key_columns, collapse = ",")),
    paste0("distinct_keys=", key_info),
    "columns:"
  )

  schema_lines <- apply(schema, 1, function(row) paste0("- ", row[["column"]], " (", row[["class"]], ")"))
  readr::write_lines(c(summary_lines, schema_lines), output_path)
}
