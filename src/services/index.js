const social = require('./social/social.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(social);
};
