const assert = require('assert');
const app = require('../../src/app');

describe('\'youtube\' service', () => {
  it('registered the service', () => {
    const service = app.service('youtube');

    assert.ok(service, 'Registered the service');
  });
});
