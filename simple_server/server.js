// Require modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// JSON of mime types
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
};

//Create server
http.createServer(function(req, res){
    var uri = url.parse(req.url).pathname;
    var fileName = path.join(process.cwd(), unescape(uri));
    console.log('loading ' + uri);
    var stats;
    
    try {
        stats = fs.lstatSync(fileName);
    } catch(e) {
        res.writeHead(404, {'Content-type': 'text/plain'})    
        res.write('404 Not Found\n');
        res.end();
        return;
    }
    
    // Check if file/directory
    if (stats.isFile()){
        var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
        res.writeHead(200, {'Content-type': mimeType});
        
        var fileStream = fs.createReadStream(fileName);
        fileStream.pipe(res);
    } else if (stats.isDirectory()){
        res.writeHead(302, {
            'Location': 'index.html'
        });
        res.end();
    } else {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.write('500 Internal Error\n');
        res.end();
    }
}).listen(3000);

/*
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/