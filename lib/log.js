var fs = require('fs');
var path = require('path');
var date = require('../lib/date');

var log = function (data) {
    fs.appendFile(path.join(__dirname, 'error.txt'), date() + '|' + data + '\r\n--------------------------------------------------------------------------------------------------------------\r\n', function (err) {
        if (err) throw err;
    });
};

module.exports = log;