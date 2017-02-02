import {Identifier} from '../document/identifier.interface';

/**
 * Documents can have numeric variables attached to them.
 * These variables can be used in scoring functions for sorting search results.
 * Variables can be updated rapidly; these updates don't count towards your indexing limits.
 */
export interface Variables extends Identifier {
  /**
   * A map from the var number to float.
   */
  variables: {
    [key: number]: number;
  };
}
