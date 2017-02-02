import * as url from 'url';
import * as Promise from 'bluebird';
import * as Request from 'request-promise';

import * as Search from './interfaces/search';
import * as Scoring from './interfaces/scoring';
import * as Document from './interfaces/document';
import * as Indexes from './interfaces/indexes';

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
  public getIndexesMetadata(indexName?: string): Promise<Indexes.Metadata | Indexes.MetadataMap> {
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
    let uri = url.format(url.parse(url.format(this.endpoint) + "/" + indexName));
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
    let uri = url.format(url.parse(url.format(this.endpoint) + "/" + indexName));
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
  public indexDocs(indexName: string, docs: Document.Doc | Document.Doc[]): Promise<Indexes.IndexedResult[] | void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + "/" + indexName + "/docs"));
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
  public removeDocsFromIndex(indexName: string, docIds: Document.Identifier | Document.Identifier[]): Promise<Indexes.DeindexedResult[] | void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + "/" + indexName + "/docs"));
    return Promise.resolve(Request({
      method: 'DELETE',
      uri: uri,
      body: docIds,
      json: true
    }));
  }

  /**
   * Performs a search on the index name.
   * @param indexName The name of the index in which perform the search.
   * @param options The search options.
   * @returns {Promise<Search.Result>}
   */
  public search(indexName: string, options: Search.Option): Promise<Search.Result> {
    let uri = this.buildSearchUri(indexName, options);
    return Promise.resolve(Request({
      method: 'GET',
      uri: uri,
      json: true
    }));
  }

  /**
   * Performs a delete search on the index name.
   * @param indexName The name of the index in which perform the search.
   * @param options The search options.
   * @returns {Promise<void>}
   */
  public deleteSearch(indexName: string, options: Search.Option): Promise<void> {
    let uri = this.buildSearchUri(indexName, options);
    return Promise.resolve(Request({
      method: 'DELETE',
      uri: uri,
      json: true
    }));
  }

  /**
   * Updates the variables of a document in index name.
   * @param indexName The name of the index.
   * @param options The variables of a specific document to update.
   * @returns {Promise<void>}
   */
  public createOrUpdateVariables(indexName: string, options: Scoring.Variables): Promise<void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + "/" + indexName + "/docs/variables"));
    return Promise.resolve(Request({
      method: 'PUT',
      uri: uri,
      body: options,
      json: true
    }));
  }

  /**
   * Updates the categories of a document in index name.
   * @param indexName The name of the index.
   * @param options The categories of a specific document to update.
   * @returns {Promise<void>}
   */
  public createOrUpdateCategories(indexName: string, options: Document.Categories): Promise<void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + "/" + indexName + "/docs/categories"));
    return Promise.resolve(Request({
      method: 'PUT',
      uri: uri,
      body: options,
      json: true
    }));
  }

  /**
   * Retrieves all the functions defined for the index name.
   * @param indexName The name of the index.
   * @returns {Promise<Scoring.FunctionMap>}
   */
  public getAllScoringFunctions(indexName: string): Promise<Scoring.FunctionMap> {
    let uri = url.format(url.parse(url.format(this.endpoint) + "/" + indexName + "/functions"));
    return Promise.resolve(Request({
      method: 'GET',
      uri: uri,
      json: true
    }));
  }

  /**
   * Defines the given function for the index name.
   * @param indexName The name of the index.
   * @param functionId The function's ID to define.
   * @param f The function formula.
   * @returns {Promise<void>}
   */
  public defineScoringFunction(indexName: string, functionId: number, f: Scoring.Function): Promise<void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + "/" + indexName + "/functions/" + functionId));
    return Promise.resolve(Request({
      method: 'PUT',
      uri: uri,
      body: f,
      json: true
    }));
  }

  /**
   * Defines the given function for the index name.
   * @param indexName The name of the index.
   * @param functionId The function's ID to define.
   * @returns {Promise<void>}
   */
  public removeScoringFunction(indexName: string, functionId: number): Promise<void> {
    let uri = url.format(url.parse(url.format(this.endpoint) + "/" + indexName + "/functions/" + functionId));
    return Promise.resolve(Request({
      method: 'DELETE',
      uri: uri,
      json: true
    }));
  }

  protected buildSearchUri(indexName: string, options: Search.Option): string {
    let base: string = url.format(this.endpoint) + "/" + indexName + "/search?q=" + options.q;
    for(let key in options) {
      if (!options.hasOwnProperty(key)) {
        continue;
      }
      switch(key) {
        case 'start':
          base += '&start=' + options[key];
          break;
        case 'len':
          base += '&len=' + options[key];
          break;
        case 'function':
          base += '&function=' + options[key];
          break;
        case 'fetch':
          base += '&fetch=' + options[key];
          break;
        case 'fetch_variables':
          base += '&fetch_variables=' + options[key];
          break;
        case 'fetch_categories':
          base += '&fetch_categories=' + options[key];
          break;
        case 'snippet':
          base += '&snippet=' + options[key];
          break;
        case 'match_any_field':
          base += '&match_any_field=' + options[key];
          break;
        case 'filter_function':
          base += Client.mapToIndexdenString('filter_function', options[key]);
          break;
        case 'filter_docvar':
          base += Client.mapToIndexdenString('filter_docvar', options[key]);
          break;
        case 'category_filters':
          // TODO: I'm not sure about this one
          base += '&category_filters=' + options[key];
          break;
      }
    }
    return url.format(url.parse(base));
  }

  protected static mapToIndexdenString(base: string, map: {[key: string] : any}): string {
    let opt: string = "";
    for(let key in map) {
      if (!map.hasOwnProperty(key)) {
        continue;
      }
      opt += '&' + base + key + '=' + map[key];
    }
    return opt;
  }
}