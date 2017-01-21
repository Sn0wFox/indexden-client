import * as url from 'url';
import * as Promise from 'bluebird';
import * as Request from 'request-promise';

import {Metadata} from './';

/**
 * The class representing an Indexden client.
 */
export class Client {
  /**
   * The Url to which connect.
   */
  protected endpoint: url.Url;

  /**
   * Construct a new Client,
   * connected to the given URL.
   * @param serverUrl the URL to connect.
   */
  public constructor(serverUrl: string) {
    this.endpoint = url.parse(url.resolve(serverUrl, "/v1"));
  }

  /**
   * Retrieves the metadata of every index in this account,
   * or of the index named after indexName.
   * @param indexName The specific index to which retrieve metadata. Optional.
   * @returns {Promise<Metadata | Metadata[]>}
   */
  public getIndexesMetadata(indexName?: string): Promise<Metadata | Metadata[]> {
    let uri = url.format(url.parse(url.format(this.endpoint) + "/indexes" + (indexName ? "/" + indexName : "")));
    return Request({
      method: 'GET',
      uri: uri
    })
    .then((metadata: string) => {
      return JSON.parse(metadata);
    })
    .catch((err: Error) => {
      return Promise.reject(err);
    });
  }
}