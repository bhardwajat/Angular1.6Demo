var http = require("http");
var fs = require("fs");

var doGet = function (req, res) {
    console.log(req.url);
    //request for js files
    var jsRe = /\w*.js/;
    var jsmatch = jsRe.exec(req.url);

    //request for /pages/*.html
    var pgRe = /pages\/\w*.html/;
    var pgmatch = pgRe.exec(req.url);
    
    if (req.url == '/') {
        fs.readFile('index.html', function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(400, { "Content-Type": 'text/html' });
                res.end("<h1>An error has occured during your request</h1>");
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });
    } else if (jsmatch) {
        jsmatch = jsmatch[0];
        //requesting .js file
        fs.readFile(jsmatch.toString(), function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(400, { "Content-Type": 'text/html' });
                res.end("<h1>An error has occured during your request</h1>");
            }
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.write(data);
            res.end();
        });
    } else if(pgmatch){
        pgmatch = pgmatch[0];
        console.log(pgmatch, req.url);
        fs.readFile(pgmatch.toString(), function (err, data) {
            if (err) {
                console.error(err);
                res.writeHead(400, { "Content-Type": 'text/html' });
                res.end("<h1>An error has occured during your request</h1>");
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });

    }else {
        fs.readFile('index.html', function(err, data){
            res.write(data);
            res.end();
        })
    }

}

http.createServer((req, res) => {
    var method = req.method;

    if (method == "GET") {
        doGet(req, res);
    }
    else {
        res.writeHead(400, { "Content-Type": 'text/html' });
        res.end("<h1>Your request could not be processed</h1>");
    }
})
    .listen(3001, function () {
        console.log("Listening on port", 3001);
    });
