const assert = require('assert');
const app = require('../../src/app');

describe('\'social\' service', () => {
  it('registered the service', () => {
    const service = app.service('social');

    assert.ok(service, 'Registered the service');
  });
});
