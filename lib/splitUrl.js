let reg = /^\/+|\/+$/g;

export default function splitUrl(url){
	url = (url && url.replace(reg,'').split('/').filter(Boolean)) || [];
	return url;
}