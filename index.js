
/*
发起请求，去redis查询是否存在key
	如果存在在redis存在key，返回对应数据
	否则查询key是否已在等待列表
		如果在，阻塞，　阻塞后面是取redis
		如果不在，请求接口，同时把key存在等待列表，请求返回后，把key从等待列表中删除，同时将已阻塞的请求变成非阻塞
	
	
(查询redis的时间是否可以忽略)

*/

var database = {	// 模拟数据库
	
};	

var redisData = {};	// 模拟redis
var pendingList = {	// 等待中列表, 存放在redis中，多节点共享
	/**
		sun: [
			
		]
	*/
};

async function reqClick() {
	
	var v = input.value;
	var resultData;
	if(redisData[v] !== undefined) {
		console.log('取redis');
		resultData = redisData[v];
	} else {
		if(pendingList.hasOwnProperty(v)) {
			// 阻塞，　后面取redis
			console.log('阻塞');
			var c = new Chock();
			
			setTimeout(function() {
				c.stop();
			}, 3000);
			
			await c.action();	// 
			resultData = redisData[v];
			console.log('haha');
		} else {
			console.log('请求接口begin');
			pendingList[v] = 'aa';
			var result = await getResponseData(v);
			console.log('请求接口end');
			console.log(result);
			delete pendingList[v];
			redisData[v] = result;
		}
	}
}

function getResponseData(v) {
	console.log('查询数据库ing')
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			console.log('查询数据库, 查到')
			resolve('fdsafds');
		}, 11000);
	});
}



var Chock = function() {
	var f = function() {};
	var _resolve;
	f.prototype = {
		constructor: f,
		action: function () {
			return new Promise(function(resolve, reject) {
				console.log('ok');
				_resolve = resolve;
				setTimeout(function() {
					resolve();
				}, 100000000000000);
			});
		},
		stop: function() {
			_resolve();
		}
	};
	return f;
}();




function choke() {}

function stopChoke() {

}

req.addEventListener('click', reqClick);
chokeButton.addEventListener('click', choke);
stopChokeButton.addEventListener('click', stopChoke);


