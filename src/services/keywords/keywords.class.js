const AWS = require('aws-sdk');
const _   = require('lodash');

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
