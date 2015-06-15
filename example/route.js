import Router from '../lib/Route';
let Route = Router();

Route(
	['.',function(url,cb){cb(null,'home');}]
,	['home',Route.redirect('/')]
,	['hello',
		['world',function(url,cb){cb(null,'world')}]
	,	['POST:anyone',function(url,cb){cb(null,'anyone')}]
	,	function(url,cb){cb(null,'anonymous')}
	]
,	['switch',
		function(url,cb){if(url=='a'){cb()}else{cb('not a');}}
	,	function(url,cb){cb('switch:a');}
	]
,	['a',
		['b',
			['c',function(url,cb){cb(null,'abc')}]
		,	['d',function(url,cb){cb(null,'abd')}]
		,	function(url,cb){cb(null,'url!'+url)}
		]
	]
,	['nobackup',
		['d',function(url,cb){cb(null,'nobackupd')}]
	]
,	['params',
		[':df',function(url,cb){cb(null,'params '+JSON.stringify(url.params))}]
	,	function(url,cb){cb(null,'parametered')}
	]
,	function(url,cb){cb('url '+url+' was not found');}
);

export default Route;