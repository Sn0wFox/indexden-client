[![Build Status](https://travis-ci.org/Sn0wFox/indexden-client.svg?branch=master)](https://travis-ci.org/Sn0wFox/indexden-client)

# indexden-client
Node.js promisified client for http://www.indexden.com/.
Powered by [Bluebird](https://github.com/petkaantonov/bluebird)
and [Request-Promise](https://github.com/request/request-promise).

This is the very beginning of the client, stay tuned!

## Install it
`npm install indexden-client`

## Use it
```js
let Indexden = require('indexden-client');

// Create client
let client = new Indexden.Client("http://my-indexden-server.com");

// Get metadata about all registered indexes
client
  .getIndexesMetadata()
  .then(data => console.log(data));
```

## Supported API endpoints

* `GET /v1/indexes`
* `GET /v1/indexes/name`
* `PUT /v1/indexes/name`
* `DELETE /v1/indexes/name`
* `PUT /v1/indexes/name/docs` (list and single document)
* `DELETE /v1/indexes/name/docs` (list and single document)
* `GET /v1/indexes/name/search`
* `DELETE /v1/indexes/name/search`
* `PUT /v1/indexes/name/docs/variables`
* `PUT /v1/indexes/name/docs/categories`
* `GET /v1/indexes/name/functions`
* `PUT /v1/indexes/name/functions/num`
* `DELETE /v1/indexes/name/functions/num`
* `PUT /v1/indexes/name/promote`