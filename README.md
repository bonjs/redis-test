# redis-test

在redis中维护一个集合 pendingList，存放等待列表，所有节点共享
	{
		userList: [],
		goodsList: []
	}
在js中维护一个集合 pendingInitiatList, 存放由本节点node发生的等待请求，只在本节点共享
	{
		userList: ''
	}

发起请求，去redis查询是否存在key
如果在redis中存在key，返回对应数据
否则查询key是否已在等待列表中存在
	如果存在
		1, 如果key在pendingInitiatList中存在，说明接口请求是在本服务器发生的，阻塞，阻塞后面是取redis并返回
		2, 否则轮询redis，直到redis有值
	如果不存在，请求接口，同时把key存在等待列表，请求返回后，把结果存进redis, m同时把key从等待列表中删除，同时将已阻塞的请求变成非阻塞
	
	
	