// Initializes the `erwin` service on path `/erwin`
const createService = require('./sentiment.class.js');
const hooks = require('./sentiment.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sentiment', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('sentiment');

  service.hooks(hooks);
};
