import * as Indexes from '../interfaces/indexes';
import * as Scoring from '../interfaces/scoring';
import {Client} from '..';

describe('Client', () => {
  let client = new Client(process.env.INDEXDEN_ENDPOINT);

  describe('.createOrUpdateIndex()', () => {
    let originalTimeout: number = 0;

    beforeEach(() => {
      // This call is quite long, so we have to increase default timeout delay
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 12000;
    });

    it('should create a test index', (done: any) => {
      client
        .createOrUpdateIndex('test')
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
            "text": "a bit of text"
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

  describe('.search()', () => {
    it('should find something', (done: any) => {
      client
        .search('test', {
          q: 'test'
        })
        .then((res: any) => {
          done();
        });
    });

    it('should fetch variables', (done: any) => {
      client
        .search('test', {
          q: 'bit',
          fetch_variables: true
        })
        .then((res: any) => {
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
        .deleteIndex('test')
        .then(() => {
          done();
        });
    });
  });
});