/**
 * When removing for index several documents at once,
 * the response will contains a list of the
 * following interface.
 */
export interface DeindexedResult {
  /**
   * A boolean indicating whether the document
   * in this position was successfully deleted.
   */
  deleted: boolean;

  /**
   * A message detailing the reasons why a document
   * was not successfully deleted.
   */
  error?: string;
}