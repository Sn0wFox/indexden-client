import {Client} from '..';
import {MetadataMap} from '../interfaces/metadata.interface';
import {IndexResult, DeindexResult} from '../interfaces/index-result.interface';

describe('client', () => {
  describe('getIndexMetadata', () => {
    let client = new Client(process.env.INDEXDEN_ENDPOINT);
    it('should retrieve metadata', (done: any) => {
      client
        .getIndexesMetadata()
        .then((data: MetadataMap) => {
          expect(data).toBeTruthy();
          done();
        });
    });
  });

  describe('createOrUpdateIndex', () => {
    let client = new Client(process.env.INDEXDEN_ENDPOINT);
    let originalTimeout: number = 0;

    beforeEach(() => {
      // This call is quite long, so we have to increase default timeout delay
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
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

  describe('indexDocs', () => {
    let client = new Client(process.env.INDEXDEN_ENDPOINT);
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

  describe('removeDocsFromIndex', () => {
    let client = new Client(process.env.INDEXDEN_ENDPOINT);
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

  describe('deleteIndex', () => {
    let client = new Client(process.env.INDEXDEN_ENDPOINT);
    it('should delete the given index', (done: any) => {
      client
        .deleteIndex('test')
        .then(() => {
          done();
        });
    });
  });
});