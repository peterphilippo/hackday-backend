/* eslint-disable no-unused-vars */
const Ipool = require('../../lib/ipool/Ipool');

class Service {
  constructor (options) {
    this.options = options || {};
    this.ipool = new Ipool();
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return []
  }

  async create (data, params) {
    let result = await new Promise((resolve, reject) => {
      this.ipool.articleSearch({
        q: data.keywords,
        types: 'article',
        languages: data.languages ? data.languages : 'EN',
        limit: data.limit ? data.limit : 10
      }, resolve, reject);
    });
    return result.documents;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
