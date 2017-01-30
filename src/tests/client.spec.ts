import {Client} from '..';
import {MetadataMap} from "../interfaces/metadata.interface";

describe('GetIndexMetadata', () => {
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
  it('should update index', (done: any) => {
    client
      .createOrUpdateIndex('test')
      .then(() => {
        done();
      });
  });
});
