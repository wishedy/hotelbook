/**
 * 功能描述：ajax调用
 * 使用方法: comm.ajax.sync(url,params) 同步获取数据
				 comm.ajax.async(url,params,callback) 异步获取数据
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by QiaoLiang on 2015-3-20.
 */

comm.ajax = {
	sync : function(url,params){ //同步获取数据
		var dataJson = {};
		$.ajax({
			url : url,
			type : "POST",
			data : params,
			async : false,
			time : 5000,
			success : function(data){
				dataJson = data;
			},
			error : function(){}
		})
		return dataJson;
	},
	async : function(url,params,callback){ // 异步获取数据
		$.ajax({
			url : url,
			type : "POST",
			dataType : "json",
			data : params,
			success : function(data){
				callback(data);
			},
			error : function(){},
			mode : "abort"
		});
	},
	only:function(url,params){//只需上传数据，无需返回
		$.ajax({
		    url:url,
		    type:"post",
		    data:params,
		    dataType:'json'
		})
	}
};