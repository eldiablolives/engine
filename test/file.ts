import { Engine } from '../src/index';

let engine: Engine;

const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const time = Date.now();

let fileId;

describe('File', () => {
  beforeEach(async () => {
    engine = await require('./engine')();
  });

  it('should create file', async () =>
    console.log(
      'Created file id -> ' +
        (fileId = (
          await engine.files.create(
            'content',
            'test.jpg',
            fs.createReadStream(`${process.env.ENGINE_ROOT}/test/test.jpg`)
          )
        ).id)
    ));

  it('should return', async () =>
    expect(await engine.files.get('content', fileId))
      .to.have.property('name')
      .which.equals('test.jpg'));
});
