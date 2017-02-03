[![Build Status](https://travis-ci.org/Sn0wFox/indexden-client.svg?branch=master)](https://travis-ci.org/Sn0wFox/indexden-client)

# indexden-client
Node.js promisified client for [indexden.com](http://www.indexden.com/).
Powered by [Bluebird](https://github.com/petkaantonov/bluebird)
and [Request-Promise](https://github.com/request/request-promise).

## Install it
`npm install indexden-client`

## Use it

### Javascript

```js
let Indexden = require('indexden-client');

// Create client
let client = new Indexden.Client(
  "http://my-indexden-server.com"
);

// Get metadata about all registered indexes
client
  .getIndexesMetadata()
  .then(data => console.log(data));
```

### Typescript

Since typings for typescript are bundled with this package,
you can use it directly with Typescript:

```ts
import * as Indexden from 'indexden-client';

// Create client
let client: Indexden.Client = new Indexden.Client(
  "http://my-indexden-server.com"
);

// Get metadata about all registered indexes
client
  .getIndexesMetadata()
  .then(data: Indexden.Indexes.MetadataMap => console.log(data));
```

## Methods

Please refer to the [offcial API](http://www.indexden.com/documentation/api)
for all return types and parameters, unless their shape is
made explicit here.

When not precised, all methods will return `Promise<void>`.

### getIndexesMetadata(**indexName**?: string)
`GET /v1/indexes`, `GET /v1/indexes/name`

This will return metadata for all known indexes, or to the one specified
by **indexName**.

If **indexName** is not precised, the result will be a **MetadataMap**,
which is simply a metadata's map having the index's name as key.

### createOrUpdateIndex(**indexName**: string, **enablePublicSearch**: boolean = false)
`PUT /v1/indexes`

This will create or update the index **indexName**.

To enable public search, you must set the second parameter to _true_.
_false_ by default.

### removeIndex(**indexName**: string)
`DELETE /v1/indexes`

This will delete the index **indexName**.

### indexDocs(**indexName**: string, **docs**: Document.Doc | Document.Doc[])
`PUT /v1/indexes/docs`

This will index or update an indexed document to the given index **indexName**.
Parameter **docs** can be a single doc or an array of docs,
with the following shape:

```ts
interface Doc {
  /**
   * The document's ID.
   */
  docid: string;
  
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
```

### removeDocsFromIndex(**indexName**: string, **docIds**: Document.Identifier | Document.Identifier[])
`DELETE /v1/indexes/docs`

This will delete documents specified by **docIds**
in the index **indexName**.

### search(**indexName**: string, **options**: Search.Option)
`GET /v1/indexes/name/search`

This will perform a search in the index **indexName**.
The **options** parameter must have the following shape:

```ts
interface Option {
  /**
   * The query to be performed.
   */
  q: string;

  /**
   * For paging, the first position to return.
   */
  start?: number;

  /**
   * How many results to return (default: 10).
   */
  len?: number;

  /**
   * The number of the scoring function to use (default: 0).
   */
  "function"?: number;

  /**
   * Comma-separated list of fields to fetch.
   * '*' returns all present fields for each document.
   */
  fetch?: string;

  /**
   * 'true' returns all variables for each document as variable_<N> (unset vars return 0).
   */
  fetch_variables?: boolean;

  /**
   * 'true' returns all categories for each document as category_<NAME>.
   */
  fetch_categories?: boolean;

  /**
   * Comma-separated list of fields to snippet.
   */
  snippet?: string;

  /**
   * Value of the query variable <N>.
   */
  "var"?: { [key: number]: string; };

  /**
   *A json map from category name to a list of the admitted values for those categories.
   */
  category_filters?: {
    [key: string]: string[];
  }[];

  /**
   * Comma-separated list of ranges to filter the values of variable <N>.
   * Each range is expressed as BOTTOM:TOP,
   * where any of both limits can be replaced by an * symbol to indicate it should be ignored.
   */
  filter_docvar?: { [key: number]: string; };

  /**
   * Comma-separated list of ranges to filter the values of function <N>.
   * Each range is expressed as BOTTOM:TOP,
   * where any of both limits can be replaced by an * symbol to indicate it should be ignored.
   */
  filter_function?: { [key: number]: string; };

  /**
   * 'true' - global search inside whole index (default false).
   */
  match_any_field?: boolean;
}
```

The result will have the following shape:

```ts
interface Result {
  /**
   * The total number of matches for the query.
   */
  matches: number | string;

  /**
   * A map from category name to a values count map.
   */
  facets: { [key: string]: string; };

  /**
   * A list of objects with the "docid" field.
   */
  results: Match[];

  /**
   * The time it took to search in seconds.
   */
  search_time: number;
}

/**
 * A match from a query.
 * << Search results will contain the document identifiers provided at indexing time.
 * If fetch and snippet fields were specified,
 * the field's content or a snippet of the content can be returned along with the identifiers. >>
 */
interface Match {
  /**
   * The ID under which the doc is registered.
   */
  docid: string;

  /**
   * Query specific document relevance score.
   */
  query_relevance_score?: number;

  /**
   * "variable_<N>": variable value, from 0 to N.
   */
  variables?: {[key: string]: any};

  /**
   * "category_<NAME>": category value for the NAME document category / facet.
   */
  category?: {[key: string]: any};
}
```

### deleteSearch(**indexName**: string, **options**: Search.Option)
`DELETE /v1/indexes/name/search`

Same as the previous version but will remove documents.

### createOrUpdateVariables(**indexName**: string, **options**: Scoring.Variables)
`PUT /v1/indexes/name/docs/variables`

This will create or updates variables for the given document,
for the index **indexName**.

The **options** parameter must have this shape:

```ts
interface Variables {
  /**
  * The document's ID.
  */
  docid: string;
  
  /**
   * A map from the var number to float.
   */
  variables: {
    [key: number]: number;
  };
}
```

### createOrUpdateCategories(**indexName**: string, **options**: Document.Categories)
`PUT /v1/indexes/name/docs/categories`

This will create or updates categories for the given document,
for the index **indexName**.

The **options** parameter must have this shape:

```ts
interface Categories {
  /**
  * The document's ID.
  */
  docid: string;
  
  /**
   * A map from the categories' names to the values for this document.
   */
  categories: {
    [key: string]: string;
  };
}
```

### getAllScoringFunctions(**indexName**: string)
`GET /v1/indexes/name/functions`

This will gather all known scoring functions for the index **indexName**.

The result will have the following shape:

```ts
interface FunctionMap {
  /**
   * A map to the function formula
   * from the number identifying the function.
   */
  [key: number]: string;
}
```

### defineScoringFunction(**indexName**: string, **functionId**: number, **f**: Scoring.Function)
`PUT /v1/indexes/name/functions/num`

This will create or update the scoring functions
identified by the number **functionId** and defined by the formula
**f** for the index **indexName**.

### removeScoringFunction(**indexName**: string, **functionId**: number)
`DELETE /v1/indexes/name/functions/num`

This will remove the scoring functions
identified by the number **functionId** from the index **indexName**.

### promoteResult(**indexName**: string, **options**: Document.Promoted)
`PUT /v1/indexes/name/promote`

This will promote the document provided by **options**
in the index **indexName** for a specific query.

The **options** parameter must have the following shape:

```ts
interface Promoted {
  /**
   * The document's ID.
   */
   docid: string;
   
  /**
   * The query to in which to promote it.
   */
  query: string;
}
```

### autocomplete(**indexName**: string, **options**: Search.Autocomplete)
`GET /v1/indexes/name/autocomplete`

This will suggest search for the provided query
for the index **indexName**.

BEWARE, JSONP is NOT supported by this client.

The **options** parameter must have the following shape:

```ts
interface Autocomplete {
  /**
   * The query to be performed.
   */
  query: string;

  /**
   * The field to take suggestions from.
   * By default, 'text' field will be chosen.
   */
  field?: string;
}
```

The result will have the following shape:

```ts
interface Suggestions {
  /**
   * JSON array with query matches.
   */
  suggestions: string[];

  /**
   * Requested query parameter (may be normalized).
   */
  query: string;
}
```