let rp = require('request-promise');

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
    // get text parameter from request
    let text = data.keywords.join(' ');

    var options = {
      method : 'GET',
      url    : 'https://api.qwant.com/api/search/all',
      qs     :
        {
          count     : '10',
          q         : text,
          t         : 'all',
          device    : 'smartphone',
          safesearch: '1',
          locale    : 'en_GB'
        },
      headers:
        {
          'Cache-Control'  : 'no-cache',
          Connection       : 'keep-alive',
          Referer          : 'https://www.qwant.com/',
          Accept           : '*/*',
          'Content-type'   : 'application/x-www-form-urlencoded',
          'User-Agent'     : 'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.117 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
          Origin           : 'https://www.qwant.com'
        }
    };

    let response       = await rp(options);
    let parsedResponse = JSON.parse(response);

    let items        = parsedResponse.data.result.items;
    let groupedItems = [];

    for (let item of items) {
      switch (item._type) {
        case 'web':
          groupedItems.push({
            title: item.title.replace(/<\/?[^>]+(>|$)/g, ''),
            url  : item.url,
            desc : item.desc.replace(/<\/?[^>]+(>|$)/g, '')
          });
          break;
      }
    }

    return groupedItems;
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
