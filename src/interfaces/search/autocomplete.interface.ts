/**
 * JSON data source to work with Indextank-jQuery Autocomplete.
 * Additional support for JSONP is NOT provided by this client,
 * even if it is by the indexden API.
 */
export interface Autocomplete {
  /**
   * The query to be performed.
   */
  query: string;

  /**
   * The field to take suggestions from.
   * By default, 'text' field will be chosen.
   */
  field?: string;
}