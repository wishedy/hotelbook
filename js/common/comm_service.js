/**
 * param: requestUrl－请求url paramJson- 参数
 * function：
 * asyncExecute ：异步执行
 * getResponseData ：获取数据
 * execute :同步执行，执行后获取返回数据
 */
var CommService={
		getResponseData:function(requestUrl,paramJson){
			var responseData=null;
			var param = {};
			if(paramJson && paramJson!=""){
				param.paramJson= $.toJSON(paramJson);
			}
			if(requestUrl){
				$.ajax({
					type : 'POST',
					url : requestUrl,
					data : param,
					async:false,
					dataType:"json",
					timeout:10000,
					success : function callback(rep) {
						if(rep && rep.responseObject){
							responseData=rep.responseObject.responseData;
						}else{
							responseData=rep;
						}
							
					},
					error:function (){}
				});	
			}
			return responseData;
		},
		getResponseMessage:function(requestUrl,paramJson){
			var responseData=null;
			var param = {};
			if(paramJson && paramJson!=""){
				param.paramJson= $.toJSON(paramJson);
			}
			if(requestUrl){
				$.ajax({
					type : 'POST',
					url : requestUrl,
					data : param,
					async:false,
					dataType:"json",
					timeout:10000,
					success : function callback(rep) {
						if(rep.responseObject){
							responseData=rep.responseObject.responseMessage;
						}else{
							responseData=rep;
						}
							
					},
					error:function (){}
				});	
			}
			return responseData;
		},
		execute:function(requestUrl,paramJson){
			var responseData=null;
			var param = {};
			if(paramJson && paramJson!=""){
				param.paramJson= $.toJSON(paramJson);
			}
			if(requestUrl){
				$.ajax({
					type : 'POST',
					url : requestUrl,
					data : param,
					async:false,
					dataType:"json",
					timeout:10000,
					success : function callback(rep) {
						if(rep && rep.responseObject){
							responseData=rep.responseObject;
						}else{
							responseData=rep;
						}
						
					},
					error:function (){}
				});
			}
			return responseData;
		},
	    asyncExecute: function (requestUrl, paramJson,callback) {
	        var param = {};
	        if (paramJson && paramJson != "") {
	            param.paramJson = $.toJSON(paramJson);
	        } 
	        if(requestUrl){
	        	$.ajax({
		            type: 'POST',
		            url: requestUrl,
		            data: param,
		            dataType: "json",
		            timeout: 10000,
		            success: function(rep) {
		                if (rep && rep.responseObject) {
		                	callback&&callback(rep.responseObject);
		                }

		            }
		        });
	        }
	    }
};