//HRApp from tutorial
var http = require('http');
var employeeService = require('./lib/employees');
var responder = require('./calledlib/responseGenerator');
var staticFile = responder.staticFile('./public');
http.createServer(function(req, res){
    //parsed url to work with in case there are parameters
    var _url;
    //in case the client uses lower case for methods/
    req.method = req.method.toUpperCase();
    console.log(req.method + ' ' + req.url);
    //make sure users are submitting only GET requests
    if (req.method !== 'GET'){
        res.writeHead(501, {'Content-Type': 'text/plain'});
        return res.end(req.method + ' is not implemented by this server');
    }
    //REGEX, that i at the end means case-insensitive matching.
    if (_url = /^\/employees$/i.exec(req.url)){
        //localhost:1337/employees and return a list of employees
        employeeService.getEmployees(function(error, data){
            if (error) {
                return responder.send500(error, res);
            }
            return responder.sendJson(data, res);
        });
    } else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)){ //d+ is digits, localhost:1337/employees/#
        //find the employee by the id in the route
        employeeService.getEmployee(_url[1], function(error, data){
            if (error){
                return responder.send500(error, res);
            }
            if (!data){
                return responder.send404(res);
            }
            return responder.sendJson(data, res);
        });
    } else {
        //try to send the static file
        res.writeHead(200);
        res.end('cannot send the static file?');
    }

}).listen(1337, '127.0.0.1');

console.log('Server running at 127.0.0.1:1337');
