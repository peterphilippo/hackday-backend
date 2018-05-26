const keywords = require('./keywords/keywords.service.js');
const social = require('./social/social.service.js');
const article = require('./article/article.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(keywords);
  app.configure(social);
  app.configure(article);
};
