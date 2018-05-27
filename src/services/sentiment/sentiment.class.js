/* eslint-disable no-unused-vars */
const rp  = require('request-promise');

class Service {
  

  constructor (options) {
    this.options = options || {};
  }

  async find (params) {


    return 'ghdghdghdghdg';
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {

    let textString = data.text;


    let testResponse = await rp({
      method : 'POST',
      uri    : 'https://content-language.googleapis.com/v1/documents:analyzeSentiment',
      headers: {
        'referer'  : 'https://content-language.googleapis.com/static/proxy.html?usegapi=1&jsh=m%3B%2F_%2Fscs%2Fapps-static%2F_%2Fjs%2Fk%3Doz.gapi.en.oKdW7bnNCkA.O%2Fm%3D__features__%2Fam%3DQQE%2Frt%3Dj%2Fd%3D1%2Frs%3DAGLTcCN21chCqe-J_uS07QYyqnqbGguhpg',
        'x-referer': 'https://developers.google.com'
      },
      qs     : {
        key: 'AIzaSyD-a9IF8KKYgoC3cpgS-Al7hLQDbugrDcw',
        alt: 'json'
      },
      body   : {
        document: {
          content : textString,
          language: 'en',
          type    : 'PLAIN_TEXT'
        }
      },
      json   : true
    });

    return testResponse;
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
