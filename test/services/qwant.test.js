const assert = require('assert');
const app = require('../../src/app');

describe('\'qwant\' service', () => {
  it('registered the service', () => {
    const service = app.service('qwant');

    assert.ok(service, 'Registered the service');
  });
});
