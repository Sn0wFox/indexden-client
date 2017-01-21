/**
 * A search with Indexden will return an array of the following object.
 */
export interface Result {
  /**
   * The total number of matches for the query.
   */
  matches: number | string;

  /**
   * A map from category name to a values count map.
   */
  facets: { [key: string]: string; };

  /**
   * A list of objects with the "docid" field.
   */
  results: Match[];

  /**
   * The time it took to search in seconds.
   */
  search_time: number;
}

/**
 * A match from a query.
 * << Search results will contain the document identifiers provided at indexing time.
 * If fetch and snippet fields were specified,
 * the field's content or a snippet of the content can be returned along with the identifiers. >>
 */
export interface Match {
  /**
   * The ID under which the doc is registered.
   */
  docid: string;

  /**
   * Query specific document relevance score.
   */
  query_relevance_score?: number;

  /**
   * "variable_<N>": variable value, from 0 to N.
   */
  variables?: {[key: string]: any};

  /**
   * "category_<NAME>": category value for the NAME document category / facet.
   */
  category?: {[key: string]: any};
}