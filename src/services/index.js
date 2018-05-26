const keywords = require('./keywords/keywords.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(keywords);
};
