import url from 'url';
import splitUrl from './splitUrl';

function fromUrl(u,obj){
	u.hash = obj.hash;
	u.hostname = obj.hostname;
	u.port = obj.port;
	u.query = obj.query;
	u.path = obj.pathname;
}

function fromNativeRequest(u,obj){
	fromUrl(u,url.parse(obj.url,true));
	u.method = obj.method;
}

function fromExpressRequest(u,obj){
	u.hash = obj.hash;
	u.hostname = obj.hostname;
	u.query = obj.query;
	u.params = obj.params;
	u.path = obj.path;
	u.method = obj.method;
}

class Url{
	constructor(obj){
		if(obj){		
			if(typeof obj == 'string'){
				fromUrl(this,url.parse(obj,true));
			}else{
				if(obj.originalUrl){
					fromExpressRequest(this,obj)
				}
				else if(obj.href){
					fromUrl(this,obj)
				}
				else{
					fromNativeRequest(this,obj);
				}
			}
		}
		this.chunks = splitUrl(this.path);
		this.left = [];
	}
	shift(){
		this.left.unshift(this.chunks.shift());
	}
	chunk(){
		return this.chunks[0];
	}
	length(){
		return this.chunks.length;
	}
	toString(){
		let passed = this.left.join('/');
		if(passed){passed+='/'}
		return '/'+passed+this.chunks.join('/')
	}
	passed(){
		return '/'+this.left.join('/')
	}
}

export default function makeUrl(url){
	if(!(url instanceof Url)){url = new Url(url);}
	return url;
}