export default function makeNext(routes,url,cb,length){
	let i = 0;
	function next(err,results){
		if(err){return cb(err);}
		if(results){return cb(null,results);}
		if(i>=length){return cb();}
		let route = routes[i++];
		route(url,next);
	};
	return next;	
}