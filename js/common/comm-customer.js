var customer = {
    urlList: {
        getBaseinfoList: {
            url: "/mcall/customer/baseinfo/getList/",
            desc: "获取会员基本信息列表 参数 ：{pageIndex:1,pageSize:5,[refIdList:'139758114,13975865']......}"
        },
        getBaseInfo: {
            url: "/mcall/customer/baseinfo/getBaseInfo/",
            desc: "获取会员基本信息"
        },
        updateCustomerBaseinfo: {
            url: "/mcall/customer/baseinfo/updateCustomerBaseinfo/",
            desc: "更新会员基本信息 参数 ：{......}"
        },
        baseinfoUploadImg: {
            url: "/mcall/customer/baseinfo/uploadImg/",
            desc: "上传头像 参数 ：{file......}"
        },
        getCustomerUniteList: {
            url: "/mcall/customer/unite/getList/",
            desc: "获取会员列表 参数 ：{pageIndex:1,pageSize:5......}"
        },
        uniteJsonList:{
			url:"/mcall/customer/unite/json_list/",
			desc:"用户列表 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,sortType:,,}"
		},
		getUniteCount:{
			url:"/mcall/customer/unite/getCount/",
			desc:"用户统计数 参数 ：{pageIndex:1,pageSize:10, searchParam:,tagId:,sortType:,,}"
		},
        getCustomerUnite: {
            url: "/mcall/customer/unite/getCustomerUnite/",
            desc: "获取会员信息 参数 ［email、mobile］"
        },
        updateCustomerUnite: {
            url: "/mcall/customer/unite/updateCustomerUnite/",
            desc: "更新会员基本信息 参数 ：{......}"
        },
        updateMobile: {
            url: "/mcall/customer/unite/updateMobile/",
            desc: "更新会员基本信息 参数 ：{mobile:,siteId:,validCode:}"
        },
        createUserCaosBind: {
            url: "/mcall/customer/unite/createUserCaosBind/",
            desc: "唯医与caos用户绑定 参数 ：{caosCustoemrId:}"
        },
        validPasspord: {
            url: "/mcall/customer/unite/validPasspord/",
            desc: "验证用户密码 参数 ：{password:}"
        },
        updatePasspord: {
            url: "/mcall/customer/unite/updatePasspord/",
            desc: "修改用户密码 参数 ：{password:,passwd:}"
        },
        validateAccount: {
            url: "/mcall/customer/unite/validateAccount/",
            desc: "验证账号是否存在 参数 ：{account: type:'email/mobile'}"
        },
        validateCustomerAccount: {
            url: "/mcall/customer/unite/validateCustomerAccount/",
            desc: "判断除登录人之外是否存在该账号 参数 ：{account: type:'email/mobile'}"
        },
        getCustomerAuth: {
            url: "/mcall/customer/auth/getCustomerAuth/",
            desc: "查询用户认证信息，如果为空，表示未认证过"
        },
        getAuthAttachments: {
            url: "/mcall/customer/auth/getAuthAttachments/",
            desc: "GET 获取认证信息附件 参数：{dataFlag:2}"
        },
        createAuth: {
            url: "/mcall/customer/auth/createAuth/",
            desc: "创建认证 参数 ：{firstame:''，lastName:''，attType:''，attCode:'',attPath:''......}"
        },
        getCollectionList: {
            url: "/mcall/customer/collection/getCollectionList/",
            desc: "获取本人收藏列表  参数 ：{pageIndex:1,pageSize:5,collectionType:''}"
        },
        getCollection: {
            url: "/mcall/customer/collection/getCollection/",
            desc: "获取一条收藏信息 参数 ：{collectionType:'',refId:''}"
        },
        isAlsoCollection: {
            url: "/mcall/customer/collection/isAlsoCollection/",
            desc: "是否已经收藏 参数 ：{collectionType:'',refId:''}"
        },
        createCollection: {
            url: "/mcall/customer/collection/createCollection/",
            desc: "会员添加收藏 参数 ：{collectionType:'',refId:''} 表：customer_collection (*collection_type,*ref_id,+ref_customer_id,+ref_name,*ref_url)"
        },
        cancelCollection: {
            url: "/mcall/customer/collection/cancelCollection/",
            desc: "会员取消收藏 参数 ：{collectionType:'',refId:''}"
        },
        getReviewList: {
            url: "/mcall/customer/review/getList/",
            desc: "获取评论列表 参数 ：{pageIndex:1,pageSize:5,reviewType:'',refId:'',+sortType:'(0/1)'}"
        },
        createReview: {
            url: "/mcall/customer/review/createReview/",
            desc: "添加评论 参数 ：{reviewType:'',refId:''......}  表：customer_review (*review_type,*review_status,*ref_id,*ref_url,+ref_customer_id,*review_content,*if_anonymous)"
        },
        createReviewAttachment: {
            url: "/mcall/customer/reviewattachment/createReviewAttachment/",
            desc: "添加评论 参数 ：{reviewId:'',reviewAttUrl:''......}  表：customer_review_attachment "
        },
        getPrefer: {
            url: "/mcall/customer/prefer/getPrefer/",
            desc: "获取一条关注信息 参数 ：{usefulType:'',upDownType:'',refId:''}"
        },
        createPrefer: {
            url: "/mcall/customer/prefer/createPrefer/",
            desc: "添加关注 参数 ：{usefulType:'',upDownType:'',refId:''}"
        },
        cancelPrefer: {
            url: "/mcall/customer/prefer/cancelPrefer/",
            desc: "取消关注 参数 ：{usefulType:'',upDownType:'',refId:''}"
        },
        validCaosUserLogin: {
            url: "/mcall/customer/infocaos/validCaosUserLogin/",
            desc: "验证caos用户登录 参数 ：{email:'',password:''}"
        },
        getCaosUserById: {
            url: "/mcall/customer/infocaos/getCaosUserById/",
            desc: "获取caos用户信息 参数 ：{customerId:''}"
        },
        getCustomerVerification: {
            url: "/mcall/customer/verification/getCustomerVerification/",
            desc: "获取发送信息 参数 ：{siteId:'',typeId:'',*customerId:''}"
        },
        sendSms: {
            url: "/mcall/customer/verification/sendSms/",
            desc: "短信发送 参数 ：{siteId:'',account:'',*customerId:''}"
        },
        validSms: {
            url: "/mcall/customer/verification/validSms/",
            desc: "验证短信 参数 ：{validCode:'',type:'customer_reset_password/customer_verification'}"
        },
        sendPasswordEmail: {
            url: "/mcall/customer/reset/password/sendPasswordEmail/",
            desc: "发送密码邮件 参数 ：{resetSite:'2',email:''}"
        },
        sendPasswordMobile: {
            url: "/mcall/customer/reset/password/sendPasswordMobile/",
            desc: "发送密码短信验证码 参数 ：{resetSite:'2',siteId:'',account:''}"
        },
        updatePassword: {
            url: "/mcall/customer/reset/password/updatePassword/",
            desc: "更改密码 参数 ：{resetSite:'',password:''}"
        },
        createFollowResource: {
            url: "/mcall/customer/follow/resource/create/",
            desc: "添加关注 参数 ：{refId:'1,2,3...',followType:'1-视频 2-文库 3-会议 4-话题 5-笔记 6-tag'......}"
        },
        cancelFollowResource: {
            url: "/mcall/customer/follow/resource/delete/",
            desc: "取消关注 参数 ：{id:'1,2,3...',......}"
        },
        followResourceJsonList:{
			url:"/mcall/customer/follow/resource/json_list/",
			desc:"关注列表 参数 ：{pageIndex:1,pageSize:10, }"
		},
		followResourceCount:{
			url:"/mcall/customer/follow/resource/getCount/",
			desc:"关注数 参数 ：{pageIndex:1,pageSize:10, }"
		},
		customerMessageJsonList:{
			url:"/mcall/customer/message/json_list/",
			desc:"消息列表 参数 ：{pageIndex:1,pageSize:10, messageType:}"
		},
        createWeixinUniteBind:{
        	url: "/mcall/wx/customer/createWeixinUniteBind/",
            desc: "绑定微信账号 参数 ：{signature:'',uniteNameWeixin:''......}"
        },
       checkWeixinUniteBind:{
    	   url: "/mcall/wx/customer/checkWeixinUniteBind/",
    	   desc:"校验是否绑定过微信账号,参数:{email:''}"
       },
        getEncUrl:{
        	url: "/mcall/wx/customer/getEncUrl/",
            desc: "获取跳转链接 参数 ：{ref:'',}"
        },
        updateWeixinUniteBind:{
        	url: "/mcall/wx/customer/updateWeixinUniteBind/",
            desc: "绑定微信账号（已登录） 参数 ：{}"
        },
        checkIfBind:{
        	url:"/mcall/wx/customer/checkIfBind/",
        	desc:"校验此账号是否绑定过了"
        },
        testOpenId:{
        	url: "/mcall/wx/customer/testOpenId/",
            desc: ""
        },
        getWebUser: {
            url: "/mcall/web/user/getWebUser/",
            desc: "获取登录用户登录信息"
        },
        getWebCustomer: {
            url: "/mcall/web/user/getWebCustomer/",
            desc: "获取登录用户信息"
        },
        userValidAndBind: {
            url: "/mcall/web/user/userValidAndBind/",
            desc: "验证用户信息并绑定caos账号 参数 ：{email:'',passwd:'',caosCustomerId:''}"
        },
        checkSession: {
            url: "/mcall/web/user/checkSession/",
            desc: "判断用户是否在线"
        },
        userRegist: {
            url: "/mcall/web/user/userRegist/",
            desc: "用户注册 参数：{account:,type:'email/mobile',passwd:''}"
        },
        logout: {
            url: "/mcall/web/user/logout/",
            desc: "退出系统"
        },
        userLogin: {
            url: "/mcall/passport/securitycheck",
            desc: "用户登录"
        },
        uploadCase: {
        	url: "/mcall/case/baseinfo/create/",
        	desc: "发布病例"
        },
        updataCase: {
        	url: "/mcall/case/baseinfo/update/",
        	desc: "发布病例"
        },
        getImg:{
        	url: "/mcall/case/attachment/info/",
        	desc: "获取图片信息"
        },
        saveImgInfo:{
        	url: "/mcall/case/attachment/update/",
        	desc: "获取图片信息"
        },
        deleteImg:{
        	url: "/mcall/case/attachment/delete/",
        	desc: "删除图片"
        },
        updateBaseInfo:{
        	url:"/mcall/customer/unite/update/",
        	desc:"更新用户的基本信息"
        },
        occCreate:{
        	url:"/mcall/customer/occupation/create/",
        	desc:"工作经历添加信息服务"
        },
        occInfo:{
        	url:"/mcall/customer/occupation/info/",
        	desc:"工作经历查询信息服务"
        },
        occUpdate:{
        	url:"/mcall/customer/occupation/update/",
        	desc:"工作经历修改信息服务"
        },
        cEduCreate:{
        	url:"/mcall/customer/continue/education/create/",
        	desc:"继续教育添加信息服务"
        },
        cEduInfo:{
        	url:"/mcall/customer/continue/education/info/",
        	desc:"继续教育查询信息服务"
        },
        cEduUpdate:{
        	url:"/mcall/customer/continue/education/update/",
        	desc:"继续教育修改信息服务"
        },
        honorCreate:{
        	url:"/mcall/customer/honor/create/",
        	desc:"获得荣誉添加信息服务"
        },
        honorInfo:{
        	url:"/mcall/customer/honor/info/",
        	desc:"获得荣誉查询信息服务"
        },
        honorUpdate:{
        	url:"/mcall/customer/honor/update/",
        	desc:"获得荣誉修改信息服务"
        },
        eduCreate:{
        	url:"/mcall/customer/education/create/",
        	desc:"教育背景添加信息服务"
        },
        eduInfo:{
        	url:"/mcall/customer/education/info/",
        	desc:"教育背景查询信息服务"
        },
        eduUpdate:{
        	url:"/mcall/customer/education/update/",
        	desc:"教育背景修改信息服务"
        },
        fundCreate:{
            url:"/mcall/customer/fund/create/",
            desc:"科研基金添加信息服务"
        },
        fundInfo:{
            url:"/mcall/customer/fund/info/",
            desc:"科研基金查询信息服务"
        },
        fundUpdate:{
            url:"/mcall/customer/fund/update/",
            desc:"科研基金修改信息服务"
        },
        socCreate:{
            url:"/mcall/customer/social/create/",
            desc:"社会任职添加信息服务"
        },
        socInfo:{
            url:"/mcall/customer/social/info/",
            desc:"社会任职查询信息服务"
        },
        socUpdate:{
            url:"/mcall/customer/social/update/",
            desc:"学术专著修改信息服务"
        },
        opusCreate:{
            url:"/mcall/customer/opus/create/",
            desc:"学术专著添加信息服务"
        },
        opusInfo:{
            url:"/mcall/customer/opus/info/",
            desc:"学术专著查询信息服务"
        },
        opusUpdate:{
            url:"/mcall/customer/opus/update/",
            desc:"学术专著修改信息服务"
        },
        patCreate:{
            url:"/mcall/customer/patent/create/",
            desc:"发明专利添加信息服务"
        },
        patInfo:{
            url:"/mcall/customer/patent/info/",
            desc:"发明专利查询信息服务"
        },
        patUpdate:{
            url:"/mcall/customer/patent/update/",
            desc:"发明专利修改信息服务"
        }
    },
    //获取数据
    getData: function (funcName, paramJson) {
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
            async: false,
            dataType: "json",
            cache:false,
            timeout: 10000,
            success: function callback(rep) {
                if (rep.responseObject) {
                    responseData = rep.responseObject.responseMessage;
                } else {
                    responseData = rep;
                }

            },
            error: function () {
            }
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
    execute: function (funcName, paramJson) {
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
            async: false,
            dataType: "json",
            timeout: 10000,
            success: function callback(rep) {
                if (rep && rep.responseObject) {
                    responseData = rep.responseObject;
                } else {
                    responseData = rep;
                }

            },
            error: function () {
            }
        });
        return responseData;
    },
    asyncExecute: function (funcName, paramJson,callback) {
        var t = this;
        var url = t.urlList[funcName].url;
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
            success: function (rep) {
                if (rep && rep.responseObject ) {
                	callback&&callback(rep.responseObject);
                }

            }
        });
    },
    cback:function(){}
};