#!/bin/env node

var servHost = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var servPort = process.env.OPENSHIFT_NODEJS_PORT || '3000';


var express = require('express');
var app = express();
var webshot = require('webshot');

//var thief = require('color-thief');
//var gm = require('gm');

var fs = require('fs');
var fileName, timeStart, timeStop;

var imgOptions = {
    screenSize: {
        width: 'all',
        height: 40
    },
    shotSize: {
        width: 'all',
        height: 40
    },
    defaultWhiteBackground: true
}


function logStart() {
    timeStart = Date.now();
    fileName = timeStart + '.png';
    console.log('File Name:', fileName);
    console.log('Time Start:', timeStart);
};

function logEnd() {
    timeStop = Date.now();
    console.log('Time Stop:', timeStop);
    var differenceMs = timeStop - timeStart;
    console.log('Execution time [s]:', differenceMs / 1000);
    console.log('OK');
};


app.get('/shot', function (req, res) {
    //log start
    logStart();

    // render
    var shotUrl = '//' + ServHost + ':' + ServPort + '/?params=' + req.query.params;
    console.log(shotUrl);

    var params;
    try {
        params = JSON.parse(req.query.params);
    } catch (err) {
        console.log('NO JSON in params! ' + err.message);
    }

    webshot(shotUrl, imgOptions, function (err, renderStream) {
        var file = fs.createWriteStream('temp/' + fileName, {
            encoding: 'binary'
        });
        renderStream.on('data', function (data) {
            file.write(data.toString('binary'), 'binary');

        });

        renderStream.on('end', function () {

            res.writeHead(200, {
                'Content-Type': 'image/png'
            });


            /*if (req.query.bw === true) {
                gm('temp/' + fileName).type('Grayscale').stream(function streamOut(err, stdout, stderr) {
                    stdout.pipe(res); //pipe grayscale to response
                });
            } else {*/
            var stream = fs.createReadStream('temp/' + fileName);
            stream.pipe(res); //pipe color to response
            //}

            // delete temp file
            fs.unlinkSync('temp/' + fileName);

            // log end
            logEnd();

            // TODO
        });
    });
});

app.use(express.static(__dirname + '/app'));

var server = app.listen(servPort, servHost, function () {

    ServHost = server.address().address
    ServPort = server.address().port

    console.log('ExpressWebshot app listening at http://%s:%s', ServHost, ServPort)

})
