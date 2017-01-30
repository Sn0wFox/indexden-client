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
