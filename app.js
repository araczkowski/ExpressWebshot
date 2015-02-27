#!/bin/env node

var servHost = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var servPort = process.env.OPENSHIFT_NODEJS_PORT || '3000';
var express = require('express');
var app = express();
var webshot = require('webshot');
var timeStart, timeStop;

var imgOptions = {
    screenSize: {
        width: 'all',
        height: 'all'
    },
    shotSize: {
        width: 'all',
        height: 'all'
    },
    defaultWhiteBackground: true
}


function logStart() {
    timeStart = Date.now();
};

function logEnd() {
    timeStop = Date.now();
    var differenceMs = timeStop - timeStart;

    console.log('Req:', timeStart, 'execution time [ms]:', differenceMs);
};


app.get('/shot', function (req, res) {
    logStart();

    var shotUrl = '//' + ServHost + ':' + ServPort + '/?params=' + req.query.params;
    //console.log(shotUrl);

    var params;
    try {
        params = JSON.parse(req.query.params);
        if (typeof (params.image) !== 'undefined') {
            imgOptions.shotSize.height = params.image.height || 'all';
        };
    } catch (err) {
        console.log('NO JSON in params! ' + err.message);
    }



    webshot(shotUrl, imgOptions, function (err, renderStream) {
        renderStream.pipe(res);

        renderStream.on('end', function () {
            logEnd();
        });

    });
});

app.use(express.static(__dirname + '/app'));

var server = app.listen(servPort, servHost, function () {

    ServHost = server.address().address;
    ServPort = server.address().port;

    console.log('node-express-webshot-app listening at http://%s:%s', ServHost, ServPort);

})
