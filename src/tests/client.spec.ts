import {Client} from '..';
import {MetadataMap} from '../interfaces/metadata.interface';
import {IndexResult, DeindexResult} from '../interfaces/index-result.interface';

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
        .then((data: MetadataMap) => {
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
        .then((results: IndexResult[]) => {
          for(let res of results) {
            expect(res.added).toBe(true);
          }
          done();
        });
    });
  });

  describe('.search()', () => {
    it('should find something', (done: any) => {
      client
        .search('test', {
          q: 'test',

        })
        .then((res: any) => {
          console.log(res);
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
        .then((results: DeindexResult[]) => {
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