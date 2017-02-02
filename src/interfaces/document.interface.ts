export interface DocumentIdentifier {
  /**
   * Your document identifier.
   * A non-empty String no longer than 1024 bytes.
   */
  docid: string;
}

/**
 * Each indexed document is an object defined by this interface.
 */
export interface Document extends DocumentIdentifier {
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
