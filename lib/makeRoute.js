import makeUrl from './makeUrl';
import makeNext from './makeNext';

export default function makeRoute(routes,test,l){
	return function router(url,cb){
		url = makeUrl(url);
		let next = makeNext(routes,url,cb,l);
		if(test){
			if(test(url)){
				return next();
			}
			return cb();
		}
		next();
	}
}