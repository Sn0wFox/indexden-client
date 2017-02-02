import {Identifier} from './identifier.interface';

/**
 * The API also allows you to promote a document
 * to the top of a query's result page.
 */
export interface Promoted extends Identifier {
  /**
   * The query to in which to promote it.
   */
  query: string;
}