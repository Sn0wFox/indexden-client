import * as Indexes from '../interfaces/indexes';
import * as Scoring from '../interfaces/scoring';
import * as Search from '../interfaces/search';
import {Client} from '..';

describe('Client', () => {
  let client = new Client(process.env.INDEXDEN_ENDPOINT);

  describe('.createOrUpdateIndex()', () => {
    let originalTimeout: number = 0;

    beforeEach(() => {
      // This call is quite long, so we have to increase default timeout delay
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
    });

    it('should create a test index', (done: any) => {
      client
        .createOrUpdateIndex('test')
        .delay(5000)
        .then(() => {
          done();
        });
    });

    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });

  describe('.getIndexMetadata()', () => {
    it('should retrieve metadata', (done: any) => {
      client
        .getIndexesMetadata('test')
        .then((data: Indexes.MetadataMap) => {
          expect(data).toBeTruthy();
          done();
        });
    });
  });

  describe('.indexDocs()', () => {
    it('should index a single doc', (done: any) => {
      client
        .indexDocs('test', {
          docid: 'mysingledoc',
          fields: {
            "text": "a bit of text - single"
          },
          categories: {
            "type": "a certain type"
          }
        })
        .then(() => {
          done();
        });
    });

    it('should index several docs', (done: any) => {
      client
        .indexDocs('test', [{
          docid: 'atestdoc',
          fields: {
            "text": "a bit of text for the test"
          }
        },
        {
          docid: 'anothertestdoc',
          fields: {
            "text": "a bit of text for the second test"
          }
          }])
        .then((results: Indexes.IndexedResult[]) => {
          for(let res of results) {
            expect(res.added).toBe(true);
          }
          done();
        });
    });
  });

  describe('.createOrUpdateVariables()', () => {
    it('should create a variable', (done: any) => {
      client
        .createOrUpdateVariables('test', {
          docid: 'mysingledoc',
          variables: {
            0: 0
          }
        })
        .then(() => {
          done();
        });
    });

    it('should update a variable', (done: any) => {
      client
        .createOrUpdateVariables('test', {
          docid: 'mysingledoc',
          variables: {
            0: 1
          }
        })
        .then(() => {
          done();
        });
    });
  });

  describe('.createOrUpdateCategories()', () => {
    it('should create a category', (done: any) => {
      client
        .createOrUpdateCategories('test', {
          docid: 'mysingledoc',
          categories: {
            cat: "some new text in the new category"
          }
        })
        .then(() => {
          done();
        });
    });

    it('should update a category', (done: any) => {
      client
        .createOrUpdateCategories('test', {
          docid: 'mysingledoc',
          categories: {
            cat: "some updated text in the category"
          }
        })
        .then(() => {
          done();
        });
    });
  });

  describe('.defineScoringFunction()', () => {
    it('should define a function', (done: any) => {
      client
        .defineScoringFunction('test', 1, {
          definition: "age"
        })
        .then(() => {
          done();
        });
    });
  });

  describe('.removeScoringFunction()', () => {
    it('should remove a function', (done: any) => {
      client
        .removeScoringFunction('test', 1)
        .then(() => {
          done();
        });
    });
  });

  describe('.getAllScoringFunctions()', () => {
    it('should gather all defined functions', (done: any) => {
      client
        .getAllScoringFunctions('test')
        .then((res: Scoring.FunctionMap) => {
          expect(res).toBeTruthy();
          done();
        });
    });
  });

  describe('.promoteResult()', () => {
    it('should promote a result', (done: any) => {
      client
        .promoteResult('test', {
          docid: 'mysingledoc',
          query: 'promoted'
        })
        .then(() => {
          done();
        });
    });
  });

  describe('.autocomplete()', () => {
    it('should autocomplete a query', (done: any) => {
      client
        .autocomplete('test', {
          query: 'bi'
        })
        .then((res: Search.Suggestions) => {
          expect(res).toBeTruthy();
          done();
        });
    });
  });

  describe('.search()', () => {
    it('should find something', (done: any) => {
      client
        .search('test', {
          q: 'single'
        })
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.results).toBeDefined();
          expect(res.results[0]).toBeDefined();
          done();
        });
    });

    it('should fetch categories', (done: any) => {
      client
        .search('test', {
          q: 'single',
          fetch_categories: true
        })
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.results).toBeDefined();
          expect(res.results[0]).toBeDefined();
          expect(res.results[0].categories).toBeDefined();
          expect(res.results[0].categories['type']).toBe('a certain type');
          done();
        });
    });

    it('should fetch variables', (done: any) => {
      client
        .search('test', {
          q: 'single',
          fetch_variables: true
        })
        .then((res: any) => {
          expect(res).toBeDefined();
          expect(res.results).toBeDefined();
          expect(res.results[0]).toBeDefined();
          expect(res.results[0].variables).toBeDefined();
          expect(res.results[0].variables['0']).toBe('1');
          done();
        });
    });
  });

  describe('.removeDocsFromIndex()', () => {
    it('should remove a single doc', (done: any) => {
      client
        .removeDocsFromIndex('test', {
          docid: 'mysingledoc'
        })
        .then(() => {
          done();
        });
    });

    it('should remove several docs', (done: any) => {
      client
        .removeDocsFromIndex('test', [{
          docid: 'atestdoc'
        },
        {
          docid: 'anothertestdoc'
        }])
        .then((results: Indexes.DeindexedResult[]) => {
          for(let res of results) {
            expect(res.deleted).toBe(true);
          }
          done();
        });
    });
  });

  describe('.deleteIndex()', () => {
    it('should delete the given index', (done: any) => {
      client
        .removeIndex('test')
        .then(() => {
          done();
        });
    });
  });
});