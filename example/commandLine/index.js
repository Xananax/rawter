import Route from '../route';
let route = Route.route;

let argv = process.argv.slice();

let path = argv[2];
console.log(Route.endPoints);
route(path,function(err,results){
	if(err){
		console.error(err);
		return;
	}
	console.log(results);
})