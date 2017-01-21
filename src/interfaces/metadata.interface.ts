/**
 * Some methods will return metadata for an index.
 * This metadata will have the same fields than this interface.
 */
export interface Metadata {
  /**
   * A boolean value representing whether the given index has started.
   * False usually means that the index has been recently created and isn't available yet.
   */
  started: boolean;

  /**
   *A string with an alphanumeric code that uniquely identifies the index under the given name.
   * If an index is deleted and a new one is created with the same name, it will have a different code.
   */
  code: string;

  /**
   * A string with the time when this index was created formatted according to the ISO 8601 format.
   * For example: 2010-01-01T12:00:00
   */
  creation_time: Date;

  /**
   * A string with the time when this index was modified last time - formatted according to the ISO 8601 format.
   * For example: 2010-01-01T12:00:00
   */
  update_time: Date;

  /**
   * An integer with the size in documents of this index.
   * The size is not updated in real-time so the value may be up to a minute old.
   */
  size: number;

  /**
   * A boolean value indicating whether public search API is enabled.
   */
  public_search: boolean;
}