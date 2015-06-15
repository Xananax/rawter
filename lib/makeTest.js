import pathToRegExp from 'path-to-regexp';
import verbs from './verbs';
let verbsRegExStr = verbs.map(function(v){return v.toUpperCase()+'';}).join('|')
let verbsRegex = new RegExp('^('+verbsRegExStr+'):([\\s\\S]+?)$');

function makeRegExpTest(test){
	return function testingRegExp(url){
		if(!url.length()){return false;}
		let chunk = url.chunk();
		if(test.test(chunk)){
			return true;
		}
		return false;
	}
}

function makeStringTest(test){
	return function testingString(url){
		if(!url.length()){return false;}
		let chunk = url.chunk();
		if(test == chunk){
			url.shift();
			return true;
		}
		return false;
	}
}

function makeParamTest(test){
	let keys = [];
	test = pathToRegExp(test,keys);
	return function testingParam(url){
		if(!url.length()){return false;}
		let _route = url+'';
		let match = test.exec(_route);
		if(match){
			let params = {};
			match.shift();
			for(let n in keys){
				params[keys[n].name] = match[n];
			}
			url.params = params;
			url.shift();
			return true;
		}
		return false;
	}
}

function makeNoUrlTest(test){
	return function testingString(url){
		if(!url.length()){return true;}
		return false;
	}
}

function makeMethodTest(method,chunk){
	let additional = makeTest(chunk);
	return function testingMethod(url){
		if(method === 'ALL'){return additional(url);}
		if(!url.method){return additional(url);}
		if(url.method.toUpperCase() === method){return additional(url);}
		return false;
	}
}

export default function makeTest(chunk){
	if(typeof chunk === 'string'){
		if(verbsRegex.test(chunk)){
			let match = verbsRegex.exec(chunk);
			if(match){
				match.shift();
				let verb = match.shift();
				return makeMethodTest(verb,match.shift());
			}
		}
		if(chunk.length===1 && (chunk[0] === '.' || chunk[0] === '/')){
			return makeNoUrlTest(chunk)
		}
		if(chunk[0]===':'){
			return makeParamTest(chunk);
		}
		return makeStringTest(chunk);
	}
	else if(chunk instanceof RegExp){
		return makeRegExpTest(chunk);
	}
	throw new Error('could not make a test out of '+chunk);
}