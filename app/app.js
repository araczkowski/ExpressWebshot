var express = require('express');
var app = express();
var webshot = require('webshot');
var fs = require('fs');
var fileName, timeStart, timeStop, ServHost, ServPort;



// a middleware with no mount path; gets executed for every request to the app
/*
app.use(function (req, res, next) {
    // log each request
    console.log(req);

});*/




app.get('/blocks', function (req, res) {

    // log start
    timeStart = Date.now();
    fileName = timeStart + '.png';
    console.log('File Name:', fileName);
    console.log('Time Start:', timeStart);

    // render
    webshot('http://' + ServHost + ':' + ServPort + '/index.html', function (err, renderStream) {
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
            timeStop = Date.now();
            console.log('Time Stop:', timeStop);
            var differenceMs = timeStop - timeStart;
            console.log('Execution time [s]:', differenceMs / 1000);
            console.log('OK');


        });


    });

});




app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {

    ServHost = server.address().address
    ServPort = server.address().port

    console.log('ExpressWebshot app listening at http://%s:%s', ServHost, ServPort)

})
