
/*
��������ȥredis��ѯ�Ƿ����key
	���������redis����key�����ض�Ӧ����
	�����ѯkey�Ƿ����ڵȴ��б�
		����ڣ�������������������ȡredis
		������ڣ�����ӿڣ�ͬʱ��key���ڵȴ��б����󷵻غ󣬰�key�ӵȴ��б���ɾ����ͬʱ���������������ɷ�����
	
	
(��ѯredis��ʱ���Ƿ���Ժ���)

*/

var database = {	// ģ�����ݿ�
	
};	

var redisData = {};	// ģ��redis
var pendingList = {	// �ȴ����б�, �����redis�У���ڵ㹲��
	/**
		sun: [
			
		]
	*/
};

async function reqClick() {
	
	var v = input.value;
	var resultData;
	if(redisData[v] !== undefined) {
		console.log('ȡredis');
		resultData = redisData[v];
	} else {
		if(pendingList.hasOwnProperty(v)) {
			// ������������ȡredis
			console.log('����');
			var c = new Chock();
			
			setTimeout(function() {
				c.stop();
			}, 3000);
			
			await c.action();	// 
			resultData = redisData[v];
			console.log('haha');
		} else {
			console.log('����ӿ�begin');
			pendingList[v] = 'aa';
			var result = await getResponseData(v);
			console.log('����ӿ�end');
			console.log(result);
			delete pendingList[v];
			redisData[v] = result;
		}
	}
}

function getResponseData(v) {
	console.log('��ѯ���ݿ�ing')
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			console.log('��ѯ���ݿ�, �鵽')
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


