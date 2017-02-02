import {Identifier} from './identifier.interface';

/**
 * Documents already added can be categorized.
 * Categories are a way to partition your index for different dimensions.
 */
export interface Categories extends Identifier {
  /**
   * A map from the categories' names to the values for this document.
   */
  categories: {
    [key: string]: string;
  };
}