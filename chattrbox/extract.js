var path = require('path');

var extractFilePath = function (url) {
    var filepath;
    var filename = 'index.html';

    if (url.length > 1) {
        filename = url.substring(1);
    }
    console.log('The filename is: ' + filename);

    filepath = path.resolve(__dirname, 'app', filename);
    return filepath;
};

module.exports = extractFilePath;