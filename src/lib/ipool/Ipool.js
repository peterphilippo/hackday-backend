const rp = require('request-promise');
const request = require('request');
const http = require('http');

class Ipool {

    constructor() {
        this.user = 'hackathon';
        this.pass = 'mediahack';
        this.auth = "Basic " + new Buffer(this.user + ":" + this.pass).toString("base64");
        this.baseUrl = 'https://sandbox-api.ipool.asideas.de/sandbox';
    }

    search (options, resolve, reject) {
        let url = this.baseUrl + '/api/search'
        let optionsObj = {
            method: 'GET',
            url : url,
            headers : {
                "Authorization" : this.auth,
                "Accept": 'application/json'
            },
            qs: options
        }
        return rp(optionsObj)
        .then(
            (data) => {
                resolve(JSON.parse(data));
            }
        ).catch(
            (err) => {
                reject(err);
            }
        )
    }

    socialSearch (options, resolve, reject) {
        let url = this.baseUrl + '/api/social/search'

        let optionsObj = {
            method: 'GET',
            url : url,
            headers : {
                "Authorization" : this.auth,
                "Accept": 'application/json'
            },
            qs: options
        }
        return rp(optionsObj)
        .then(
            (data) => {
                resolve(JSON.parse(data));
            }
        ).catch(
            (err) => {
                reject(err);
            }
        )
    }
}

module.exports = function (user, pass) {
    return new Ipool(user, pass);
};

module.exports.Ipool = Ipool;