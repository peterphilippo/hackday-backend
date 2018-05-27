const AWS = require('aws-sdk');
const _   = require('lodash');
const rp  = require('request-promise');

/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return {params};
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    // get text parameter from request
    let text = data.text.join(' ');

    let apiResponse = await rp({
      method : 'POST',
      uri    : 'https://content-language.googleapis.com/v1/documents:analyzeEntities',
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
          content : text,
          language: 'en',
          type    : 'PLAIN_TEXT'
        }
      },
      json   : true
    });

    // extract only important entities from text
    // and entities that have a salience higher than 0.01
    // i.e. PERSON, LOCATION, ORGANIZATION, COMMERCIAL_ITEM, EVENT, TITLE
    let importantEntities = new Set(['PERSON', 'LOCATION', 'ORGANIZATION', 'EVENT', 'WORK_OF_ART', 'CONSUMER_GOOD']);
    let filteredEntities  = _.filter(apiResponse.entities, (entity) => {
      return importantEntities.has(entity.type) && entity.salience > 0.01;
    });

    // return the filtered response
    return filteredEntities.map((entity) => {
      return entity.name;
    });
  }

  async GoogleSentiment(data, params) {
    let testString = 'Boban is a nice guy and he is really good looking. And he is pretty good at playing music with his yellow guitar. Boban is really bad at singing although he thinks he is good. He also likes helping girls in trouble.';

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
          content : testString,
          language: 'en',
          type    : 'PLAIN_TEXT'
        }
      },
      json   : true
    });

    return testResponse;
  }

  async AWSComprehendEntities(data, params) {
    // get text parameter from request
    let text = data.text;

    let comprehend = new AWS.Comprehend({
      apiVersion     : '2017-11-27',
      endpoint       : 'https://comprehend.eu-west-1.amazonaws.com',
      secretAccessKey: 'vKmay2kOEwwyOidt23BoHXKMFugNJRMTQYj3pbdJ',
      accessKeyId    : 'AKIAJYYSXBHOIFME33WQ',
      region         : 'eu-west-1'
    });

    let comprehendParams = {
      LanguageCode: 'en',
      Text        : text
    };

    try {
      let response = await new Promise((resolve, reject) => {
        // fetch entities from text
        comprehend.detectEntities(comprehendParams, function (err, data) {
          if(err) reject(err);
          resolve(data);
        });
      });

      // extract only important entities from text
      // and entities that have a score higher than 0.8
      // i.e. PERSON, LOCATION, ORGANIZATION, COMMERCIAL_ITEM, EVENT, TITLE
      let importantEntities = new Set(['PERSON', 'LOCATION', 'ORGANIZATION', 'COMMERCIAL_ITEM', 'EVENT', 'TITLE']);
      let filteredEntities  = _.filter(response.Entities, (entity) => {
        return importantEntities.has(entity.Type) && entity.Score > 0.8;
      });

      // return the filtered response
      return filteredEntities.map((entity) => {
        return entity.Text;
      });
    } catch (error) {
      return error;
    }
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return {id};
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
