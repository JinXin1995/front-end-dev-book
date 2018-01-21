var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server')

var server = http.createServer(function (req, res) {
    console.log("Responding to a request.");

    var handleError = function (err, res) {
        res.writeHead(404);
        res.end();
    };

    var filepath = extract(req.url);
    fs.readFile(filepath, function (err, data) {
        if (err) {
            handleError(err, res);
            return;
        } else {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(data);
        }
    })
});

server.listen(3000);