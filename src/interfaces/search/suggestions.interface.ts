/**
 * When the autocomplete API endpoint is called,
 * the result will have the shape described by this interface.
 */
export interface Suggestions {
  /**
   * JSON array with query matches.
   */
  suggestions: string[];

  /**
   * Requested query parameter (may be normalized).
   */
  query: string;
}