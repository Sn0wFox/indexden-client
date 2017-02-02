import {Identifier} from './identifier.interface';

/**
 * Each indexed document is an object defined by this interface.
 */
export interface Doc extends Identifier {
  /**
   * A map from field name to field value.
   * The sum of the length of each field value MUST not be greater than 100kbytes.
   */
  fields: {
    [key: string]: string;
  };

  /**
   * A map from the var number to float.
   */
  variables?: {
    [key: number]: number;
  };

  /**
   * A map from the category name to its value.
   * By default, the document is indexed under the key 'text'.
   */
  categories?: {
    [key: string]: string;
  };
}
