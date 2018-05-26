const rp = require('request-promise');

/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if(! data.keywords) return [];

    let joinedKeywords  = data.keywords.join(encodeURI('|'));
    let youtubeResponse = await rp({
      method            : 'GET',
      uri               : 'https://www.googleapis.com/youtube/v3/search',
      qs                : {
        key       : 'AIzaSyBmMrMcOqKLzQKWmN6vyd7rZy0dJsFJMVk',
        part      : 'snippet',
        maxResults: 50,
        regionCode: 'US',
        type      : 'video',
        order     : 'viewCount',
        q         : joinedKeywords
      },
      qsStringifyOptions: {
        encode: false,
        encodeValuesOnly: true
      }
    });

    let parsedYoutubeResponse = JSON.parse(youtubeResponse);

    return parsedYoutubeResponse;
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
