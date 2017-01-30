import * as url from 'url';
import * as Promise from 'bluebird';
import * as Request from 'request-promise';

import {Metadata, MetadataMap} from './interfaces/metadata.interface';
import {DocumentIdentifier, Document} from './interfaces/document.interface';
import {IndexResult, DeindexResult} from './interfaces/index-result.interface';

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
    this.endpoint = url.parse(url.resolve(serverUrl, "/v1/indexes"));
  }

  /**
   * Retrieves the metadata of every index in this account,
   * or of the index named after indexName.
   * If indexName is specified, result will be a MetadataMap.
   * @param indexName The specific index to which retrieve metadata. Optional.
   * @returns {Promise<Metadata | MetadataMap>}
   */
  public getIndexesMetadata(indexName?: string): Promise<Metadata | MetadataMap> {
    let uri = url.format(url.parse(url.format(this.endpoint) + (indexName ? "/" + indexName : "")));
    return Promise.resolve(Request({
      method: 'GET',
      uri: uri,
      json: true
    }));
  }

  /**
   * Creates or updates an index with the given name.
   * It cannot contain forward slashes "/".
   * @param indexName The name of the index to create or update.
   * @param enablePublicSearch Whether or not the public search must be enabled. False by default.
   * @returns {Promise<void>}
   */
  public createOrUpdateIndex(indexName: string, enablePublicSearch: boolean = false): Promise<void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + indexName));
    return Promise.resolve(Request({
      method: 'PUT',
      uri: uri,
      json: true,
      body: {
        public_search: enablePublicSearch
      }
    }));
  }

  /**
   * Removes the index name from the account.
   * @param indexName The name of the index to remove.
   * @returns {Promise<void>}
   */
  public deleteIndex(indexName: string): Promise<void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + indexName));
    return Promise.resolve(Request({
      method: 'DELETE',
      uri: uri
    }));
  }

  /**
   * Adds the given documents to the index name.
   * If there are more than one document,
   * this will return an array of IndexResult.
   * @param indexName The name of the index to which add the document(s).
   * @param docs The document or array of documents to index.
   * @returns {Promise<IndexResult[] | void>}
   */
  public indexDocs(indexName: string, docs: Document | Document[]): Promise<IndexResult[] | void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + indexName + "/docs"));
    return Promise.resolve(Request({
      method: 'PUT',
      uri: uri,
      body: docs,
      json: true
    }));
  }

  /**
   * Removes a given documents
   * or bulk of documents from the index name.
   * @param indexName The name of the index from which remove the document(s).
   * @param docIds The ID(s) of the document or array of documents to index.
   * @returns {Bluebird<DeindexResult[] | void>}
   */
  public removeDocsFromIndex(indexName: string, docIds: DocumentIdentifier | DocumentIdentifier[]): Promise<DeindexResult[] | void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + indexName + "/docs"));
    return Promise.resolve(Request({
      method: 'DELETE',
      uri: uri,
      body: docIds,
      json: true
    }));
  }
}