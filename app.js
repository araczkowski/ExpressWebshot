var express = require('express');
var app = express();
var webshot = require('webshot');

//var thief = require('color-thief');
var gm = require('gm');

var fs = require('fs');
var fileName, timeStart, timeStop, ServHost, ServPort;
var imgOptions = {
    screenSize: {
        width: 1000,
        height: 480
    },
    shotSize: {
        width: 1000,
        height: 'all'
    },
    defaultWhiteBackground: true
}

// a middleware with no mount path; gets executed for every request to the app
/*
app.use(function (req, res, next) {
    // log each request
    console.log(req);

});*/


function logStart() {
    timeStart = Date.now();
    fileName = timeStart + '.jpeg';
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


app.get('/blocks', function (req, res) {
    //log start
    logStart();

    // render
    webshot('http://' + ServHost + ':' + ServPort + '/index.html', imgOptions, function (err, renderStream) {
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


            var stream = fs.createReadStream('temp/' + fileName);
            stream.pipe(res);

            // log end
            logEnd();
        });
    });
});


app.get('/blocksbw', function (req, res) {

    //log start
    logStart();

    // render
    webshot('http://' + ServHost + ':' + ServPort + '/index.html', imgOptions, function (err, renderStream) {
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


            gm('temp/' + fileName)
                .type('Grayscale')
                //.monochrome()
                //.colors(2)
                .stream(function streamOut(err, stdout, stderr) {
                    stdout.pipe(res); //pipe to response
                });
            // log end
            logEnd();


        });


    });

});




app.use(express.static(__dirname + '/app'));

var server = app.listen(3000, function () {

    ServHost = server.address().address
    ServPort = server.address().port

    console.log('ExpressWebshot app listening at http://%s:%s', ServHost, ServPort)

})
