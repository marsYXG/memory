var request = require('request');

var log = require('../lib/log');

var curl = function (data, callback, err) {
    var encoding = 'utf8';
    if (data.isGB2312) {
        encoding = 'GB2312';
    }
    if (data.isGET) {
        request.get(
            {
                url: data.url,
                form: data.data,
                encoding: encoding
            },
            function (error, response, body) {
                try {
                    if (response.statusCode == 200) {
                        callback(body);
                    } else {
                        log('|' + JSON.stringify(data) + '|' + response);
                        err(response);
                    }
                } catch (e) {
                    e = JSON.stringify(e);
                    log('|' + JSON.stringify(data) + '|' + e);
                    err(e);
                }
            }
        );
    } else {
        
        request.post(
            {
                url: data.url,
                form: data.data,
                encoding: encoding
            },
            function (error, response, body) {
                try {
                    if (response.statusCode == 200) {
                        callback(body);
                    } else {
                        log('|' + JSON.stringify(data) + '|' + response);
                        err(response);
                    }
                } catch (e) {
                    e = JSON.stringify(e);
                    console.log(e);
                    log('|' + JSON.stringify(data) + '|' + e);
                    err(e);
                }
            }
        );
    }

};
module.exports = curl;