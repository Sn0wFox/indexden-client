export {Metadata} from './metadata.interface';
export {IndexedResult} from './indexed-result.interface';
export {DeindexedResult} from './deindexed-result.interface';

import {Metadata} from './metadata.interface';
/**
 * When not asking for a particular index,
 * results will be a map of metadata,
 * with keys being indexes' names.
 */
export type MetadataMap = {
  [key: string]: Metadata;
};