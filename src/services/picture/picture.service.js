// Initializes the `picture` service on path `/picture`
const createService = require('./picture.class.js');
const hooks = require('./picture.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/picture', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('picture');

  service.hooks(hooks);
};
