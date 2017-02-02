export interface Option {
  /**
   * The query to be performed.
   */
  q: string;

  /**
   * For paging, the first position to return.
   */
  start?: number;

  /**
   * How many results to return (default: 10).
   */
  len?: number;

  /**
   * The number of the scoring function to use (default: 0).
   */
  "function"?: number;

  /**
   * Comma-separated list of fields to fetch.
   * '*' returns all present fields for each document.
   */
  fetch?: string;

  /**
   * 'true' returns all variables for each document as variable_<N> (unset vars return 0).
   */
  fetch_variables?: boolean;

  /**
   * 'true' returns all categories for each document as category_<NAME>.
   */
  fetch_categories?: boolean;

  /**
   * Comma-separated list of fields to snippet.
   */
  snippet?: string;

  /**
   * Value of the query variable <N>.
   */
  "var"?: { [key: number]: string; };

  /**
   *A json map from category name to a list of the admitted values for those categories.
   */
  category_filters?: {
    [key: string]: string[];
  }[];

  /**
   * Comma-separated list of ranges to filter the values of variable <N>.
   * Each range is expressed as BOTTOM:TOP,
   * where any of both limits can be replaced by an * symbol to indicate it should be ignored.
   */
  filter_docvar?: { [key: number]: string; };

  /**
   * Comma-separated list of ranges to filter the values of function <N>.
   * Each range is expressed as BOTTOM:TOP,
   * where any of both limits can be replaced by an * symbol to indicate it should be ignored.
   */
  filter_function?: { [key: number]: string; };

  /**
   * 'true' - global search inside whole index (default false).
   */
  match_any_field?: boolean;
}