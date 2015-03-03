#!/bin/env node

var servHost = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var servPort = process.env.OPENSHIFT_NODEJS_PORT || '3000';
var express = require('express');
var app = express();
var webshot = require('webshot');
var timeStart, timeStop;

var internalOptions = {
    screenSize: {
        width: 'all',
        height: 'all'
    },
    shotSize: {
        width: 'all',
        height: 'all'
    },
    defaultWhiteBackground: true,
    shotUrl: ''
}


function logStart() {
    timeStart = Date.now();
};

function logEnd() {
    timeStop = Date.now();
    var differenceMs = timeStop - timeStart;

    console.log('Req:', timeStart, 'execution time [ms]:', differenceMs);
};

function mergeOptions(userOptions) {

    // reset default
    internalOptions.screenSize.width = 'all';
    internalOptions.screenSize.height = 'all';
    internalOptions.shotSize.width = 'all';
    internalOptions.shotSize.height = 'all';
    defaultWhiteBackground = true;
    internalOptions.shotUrl = '//' + ServHost + ':' + ServPort;

    if (!userOptions) {
        return internalOptions;
    }
    for (var optionKey in internalOptions) {
        if (optionKey in userOptions) {
            switch (typeof internalOptions[optionKey]) {
            case 'boolean':
                internalOptions[optionKey] = !!userOptions[optionKey];
                break;
            case 'number':
                internalOptions[optionKey] = Math.abs(userOptions[optionKey]);
                break;
            case 'string':
                internalOptions[optionKey] = '' + userOptions[optionKey];
                break;
            default:
                internalOptions[optionKey] = userOptions[optionKey];
            }
        }
    }
    return internalOptions;
};


app.get('/shot', function (req, res) {
    logStart();

    var params, internalParams, externalParams;
    try {
        params = JSON.parse(req.query.params);
        if (typeof (params.external) !== 'undefined') {
            externalParams = JSON.stringify(params.external);
        }

        if (typeof (params.internal) !== 'undefined') {
            internalParams = params.internal;
        };

    } catch (err) {
        console.log('NO JSON in params! ' + err.message);

    }

    mergeOptions(internalParams);
    internalOptions.shotUrl = internalOptions.shotUrl + '/?params=' + externalParams;

    webshot(internalOptions.shotUrl, internalOptions, function (err, renderStream) {
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
