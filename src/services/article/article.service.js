// Initializes the `article` service on path `/article`
const createService = require('./article.class.js');
const hooks = require('./article.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/article', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('article');

  service.hooks(hooks);
};
