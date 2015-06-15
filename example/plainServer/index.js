import Route from '../route';

var http = require('http');
http.createServer(Route.http(
	function(req,res,result){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end(result);
	}
,	function(req,res,error){
		res.writeHead(500,{'Content-Type': 'text/plain'});
		res.end(error);
	}
)).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');