// Initializes the `youtube` service on path `/youtube`
const createService = require('./youtube.class.js');
const hooks = require('./youtube.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/youtube', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('youtube');

  service.hooks(hooks);
};
