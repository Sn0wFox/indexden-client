/**
 * Scoring functions can be defined through the API.
 * These functions can later be used when searching the index
 * to provide specific orderings for the results.
 * They can use the variables defined in the document
 * as well as some special variables such as the document's age
 * and the textual relevance of the match.
 */
export interface Function {
  /**
   * The formula that defines the function.
   */
  definition: string;
}