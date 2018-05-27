// Initializes the `qwant` service on path `/qwant`
const createService = require('./qwant.class.js');
const hooks = require('./qwant.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/qwant', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('qwant');

  service.hooks(hooks);
};
