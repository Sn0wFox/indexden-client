/**
 * When indexing several documents at once,
 * the response will contains a list of the
 * following interface.
 */
export interface IndexedResult {
  /**
   * A boolean indicating whether the document
   * in this position was successfully indexed.
   */
  added: boolean;

  /**
   * A message detailing the reasons why a document
   * was not successfully indexed.
   */
  error?: string;
}