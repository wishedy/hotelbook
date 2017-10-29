var commdata={
		urlList:{
			getDataTags:{
				url:"/mcall/comm/data/tag/getDataTags/",				
				desc:"获取标签列表 参数 ：{treeLevel:'',tagName:'......}"
			},
			tagJsonList:{
				url:"/mcall/comm/data/tag/json_list/",
				desc:"获取标签列表 参数 ：{treeLevel:'',tagName:'......}  多级查询treeLevel:'2_3'"
			},
			getDataTagsText:{
				url:"/mcall/comm/data/tag/getDataTagsText/",
				desc:"获取标签列表（标签名称） 参数 ：{treeLevel:'',tagName:''......}"
			},
			getDataLogoUrl:{
				url:"/mcall/comm/data/logourl/getDataLogoUrl/",
				desc:"获取图片列表 参数 ：{refId:'1397586888114',logoSpec:'',logoType:''}"
			},
			getDataLogoUrlList:{
				url:"/mcall/comm/data/logourl/getDataLogoUrlList/",
				desc:"获取单张图片 参数 ：{refIdList:'1397586888114,1397586888435',logoSpec:'',logoType:''}"
			},
			getDataRoleConfigs:{
				url:"/mcall/comm/data/roleconfig/getDataRoleConfigs/",
				desc:"获取会员证件类型 参数 ：{siteId:'',roleId:'',typeId:''}"
			},
			uploadLogo:{
				url:"/mcall/comm/upload/uploadLogo/",
				desc:"上传图片 参数 ：{file:文件,imageType:'',preSign:''}  imageType（1:头像 2认证图片）"
			},
			sendMobileValidateCode:{
				url:"/mcall/comm/sms/sendMobileValidateCode/",
				desc:"发送短信验证码 参数 ：{mobile：''}"
			},
			getVideoByVideoId:{
				url:"/mcall/cms/video/info/",
				desc:"获取视频信息 参数 ：{videoId：''}"
			},
			getSearchVideo:{
				url:"/mcall/cms/video/getSearchVideo/",
				desc:"视频搜索列表 参数 ：{pageIndex:1,pageSize:5,keyword:'脊柱'}"
			},
			getVideoList:{
				url:"/mcall/cms/video/getVideoList/",
				desc:"视频搜索列表 参数 ：{pageIndex:1,pageSize:5,videoIds:'',videoName:''......}"
			},
			getlistVideoInTag:{
				url:"/mcall/cms/video/listInTag/",
				desc:"视频搜索列表 参数 ：{pageIndex:1,pageSize:5,refId:''}"
			},
			updateVideoNum:{
				url:"/mcall/cms/video/updateVideoNum/",
				desc:"更新视频统计数 参数 ：{propertyKey:'属性名',type:'(plus/minus)',videoId:'视频ID'}"
			},
			updateDocNum:{
				url:"/mcall/cms/doc/updateDocNum/",
				desc:"更新文库统计数 参数 ：{propertyKey:'属性名',type:'(plus/minus)',docId:'ID'}"
			},
			updateTopicNum:{
				url:"/mcall/cms/topic/base/updateTopicNum/",
				desc:"更新话题统计数 参数 ：{propertyKey:'属性名',type:'(plus/minus)',topicId:'ID'}"
			},
			updateCaseNum:{
				url:"/mcall/case/baseinfo/updateCaseNum/",
				desc:"更新病例统计数 参数 ：{propertyKey:'属性名',type:'(plus/minus)',caseId:'ID'}"
			},
			getVideoAttachment:{
				url:"/mcall/cms/video_/attachment/getVideoAttachment/",
				desc:"获取视频附件 参数 ：{videoId:1,videoAttType:5,videoAttFormat:'',videoAttSpec:'',videoAttHeight:'',videoAttWidth:''......}"
			},
			getConferenceList:{
				url:"/mcall/conference/index/getConferenceList/",
				desc:"年会列表 参数 ：{pageIndex:1,pageSize:5}"
			},
			getConferenceSubList:{
				url:"/mcall/conference/index/getConferenceSubList/",
				desc:"年会－分会列表 参数 ：{pageIndex:1,pageSize:5,conId:}"
			},
			getAgendaVideoList:{
				url:"/mcall/conference/index/getAgendaVideoList/",
				desc:"获取年会－日程、视频列表 参数 ：{pageIndex:1,pageSize:5,conSubId:,conId:}"
			},
			getRecommendVideoList:{
				url:"/mcall/recommend/resource/video/getRecommendVideoList/",
				desc:"获取推荐视频列表 参数 ：{pageIndex:1,pageSize:10,＊videoId:}"
			},
			caseJsonList:{
				url:"/mcall/case/baseinfo/json_list/",
				desc:"病例列表 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,sortType:,,}"
			},
			getCaseCount:{
				url:"/mcall/case/baseinfo/getCount/",
				desc:"病例记录数 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,,,}"
			},
			topicJsonList:{
				url:"/mcall/cms/topic/base/json_list/",
				desc:"话题列表 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,sortType:,,}"
			},
			getTopicCount:{
				url:"/mcall/cms/topic/base/getCount/",
				desc:"话题记录数 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,,,}"
			},
			videoJsonList:{
				url:"/mcall/cms/video/json_list/",
				desc:"视频列表 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,sortType:,,}"
			},
			getVideoCount:{
				url:"/mcall/cms/video/getCount/",
				desc:"视频记录数 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,,,}"
			},
			docJsonList:{
				url:"/mcall/cms/doc/json_list/",
				desc:"文档列表 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,sortType:,,}"
			},
			getDocCount:{
				url:"/mcall/cms/doc/getCount/",
				desc:"文库记录数 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,,,}"
			},
			logBrowseJsonList:{
				url:"/mcall/log/customer/browse/json_list/",
				desc:"浏览记录数 参数 ：{pageIndex:1,pageSize:10,dataFlag:, groupType:,,,}"
			},
			logCreateKeyword:{
				url:"/mcall/log/customer/keyword/createKeyword/",
				desc:"搜索记录数 参数 ：{keyword:,searchUrl:,,,}"
			},
			jaRequestSerial:{
				url:"/mcall/ja/statistics/jaRequestSerial/",
				desc:"百度统计 参数 ：{domain:}"
			},
			getWxAccessToken:{
				url:"/mcall/wx/api/getAccessToken/",
				desc:"微信授权 参数 ：{}"
			},
			getJSTicket:{
				url:"/mcall/wx/api/getJSTicket/",
				desc:"微信授权 参数 ：{}"
			},
			getJSConfig:{
				url:"/mcall/wx/api/getJSConfig/",
				desc:"微信授权 参数 ：{}"
			}
			
			
		},
		getData:function(funcName,paramJson){
			var t=this;
			var url=t.urlList[funcName].url;
			var responseData=null;
			var param = {};
			if(paramJson && paramJson!=""){
				param.paramJson= $.toJSON(paramJson);
			}else{
				//param.paramJson= "{}";
			}
			$.ajax({
				type : 'POST',
				url : url,
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
			return responseData;
		},
		getResponseData:function(funcName,paramJson){
			var t=this;
			var url=t.urlList[funcName].url;
			var responseData=null;
			var param = {};
			if(paramJson && paramJson!=""){
				param.paramJson= $.toJSON(paramJson);
			}else{
				//param.paramJson= "{}";
			}
			$.ajax({
				type : 'POST',
				url : url,
				data : param,
				async:false,
				dataType:"json",
				timeout:10000,
				success : function callback(rep) {
					if(rep.responseObject){
						responseData=rep.responseObject.responseData;
					}else{
						responseData=rep;
					}
						
				},
				error:function (){}
			});
			return responseData;
		},
		execute:function(funcName,paramJson){
			var t=this;
			var url=t.urlList[funcName].url;
			var responseData=null;
			var param = {};
			if(paramJson && paramJson!=""){
				param.paramJson= $.toJSON(paramJson);
			}else{
				//param.paramJson= "{}";
			}
			$.ajax({
				type : 'POST',
				url : url,
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
			return responseData;
		},
	    asyncExecute: function (funcName, paramJson,callback) {
	        var t = this;
	        var url = t.urlList[funcName].url;
	        var responseData = null;
	        var param = {};
	        if (paramJson && paramJson != "") {
	            param.paramJson = $.toJSON(paramJson);
	        } else {
	            //param.paramJson= "{}";
	        }
	        $.ajax({
	            type: 'POST',
	            url: url,
	            data: param,
	            dataType: "json",
	            timeout: 10000,
	            success: function(rep) {
	                if (rep && rep.responseObject) {
	                	callback&&callback(rep.responseObject);
	                }

	            }
	        });
	    },
	    cback:function(){}
};