import makeTest from './makeTest';
import makeRoute from './makeRoute';
import splitUrl from './splitUrl';

var hasOwnProperty = Object.prototype.hasOwnProperty;
function isEmpty(obj) {
	if (obj == null) return true;
	if (obj.length > 0)    return false;
	if (obj.length === 0)  return true;
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)){return false};
	}
	return true;
}


function Router(){
	let path = [];
	let endPoints = [];
	let nesting = 0;
	function ParseRoute(...routes){
		let chunk,test;
		if(typeof routes[0] === 'string' || routes[0] instanceof RegExp){
			chunk = routes.shift();
			test = makeTest(chunk);
		}
		let l = routes.length;
		let i = 0;
		let oldPath = path.slice();
		let isEndPoint = false;
		let temp;
		if(chunk){
			path.push(chunk);
			temp = path.slice();
		}
		nesting++;
		for(i;i<l;i++){
			let route = routes[i];
			if(Array.isArray(route)){
				routes[i] = Route(...route);
			}else{
				isEndPoint = true;
			}
		}
		if(isEndPoint && temp){
			endPoints.push(temp);
		}
		path = oldPath;
		nesting--;
		if(nesting == 0){
			Route.endPoints = endPoints;
		}
		return makeRoute(routes,test,l);
	}
	function Route(...routes){
		let route = ParseRoute(...routes);
		Route.route = route;
		return route;
	}
	Route.enodPoints = function(){
		let ends = Route._endPoints;
		return function(url,cb){
			let path = url.left.slice();
			let ret = [];
			if(!path.length){return ends.slice();}

		}
	}
	Route.redirect = function redirect(newPath){
		return function redir(url,cb){
			Route.route(newPath,cb);
		}
	}
	Route.connect = function(key){
		key = key || 'routeResults';
		return function routeConnect(req,res,next){
			Route.route(req,function(err,results){
				if(err){return next(new Error(err));}
				req[key] = results;
				next();
			});
		}
	}
	Route.http = function(success,error){
		return function routeHttp(req,res){		
			Route.route(req,function(err,result){	
				if(err){
					error(req,res,err);
				}else{		
					success(req,res,result);
				}
			})
		}
	}
	return Route;
}

export default Router;