// Initializes the `social` service on path `/social`
const createService = require('./social.class.js');
const hooks = require('./social.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/social', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('social');

  service.hooks(hooks);
};
