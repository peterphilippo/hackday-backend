const AWS = require('aws-sdk');

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
      secretAccessKey: 'cqh7SHSCO1/xZNtQFdyIlnm8+Zd8zMQx+UD/XiWb',
      accessKeyId    : 'AKIAIQWIIJ2MU6C7WSWA',
      region         : 'eu-west-1'
    });

    let comprehendParams = {
      LanguageCode: 'en',
      Text        : text
    };

    let proba = await new Promise((resolve) => {
      comprehend.detectEntities(comprehendParams, function (err, data) {
        resolve(data);
      });
    });

    return JSON.stringify(proba);
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
