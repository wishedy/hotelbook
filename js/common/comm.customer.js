var PC_CALL="//www.yi-ding.net.cn/";
comm.customer = {
    urlList: {
        getBaseinfoList: {
            url: PC_CALL+"customer/baseinfo/getList/",
            desc: "获取会员基本信息列表 参数 ：{pageIndex:1,pageSize:5,[refIdList:'139758114,13975865']......}"
        },
        getBaseInfo: {
            url: PC_CALL+"customer/baseinfo/getBaseInfo/",
            desc: "获取会员基本信息"
        },
        updateCustomerBaseinfo: {
            url: PC_CALL+"customer/baseinfo/updateCustomerBaseinfo/",
            desc: "更新会员基本信息 参数 ：{......}"
        },
        getCustomerUniteList: {
            url: PC_CALL+"customer/unite/getList/",
            desc: "获取会员列表 参数 ：{pageIndex:1,pageSize:5......}"
        },
        getCustomerUnite: {
            url: PC_CALL+"customer/unite/getCustomerUnite/",
            desc: "获取会员信息 参数 ［email、mobile］"
        },
        getCustomerUnites: {
            url: PC_CALL+"customer/unite/getCustomerUnites/",
            desc: "返回绑定扫码结果"
        },
        getCustomerUniteAuth:{
        	 url: PC_CALL+"customer/unite/getCustomerUniteAuth/",
             desc: "返回认证扫码结果"
        },
        updateCustomerUnite: {
            url: PC_CALL+"customer/unite/updateCustomerUnite/",
            desc: "更新会员基本信息 参数 ：{......}"
        },
        updateMobile: {
            url: PC_CALL+"customer/unite/updateMobile/",
            desc: "更新会员基本信息 参数 ：{mobile:,siteId:,validCode:}"
        },
        createUserCaosBind: {
            url: PC_CALL+"customer/unite/createUserCaosBind/",
            desc: "唯医与caos用户绑定 参数 ：{caosCustoemrId:}"
        },
        validPasspord: {
            url: PC_CALL+"customer/unite/validPasspord/",
            desc: "验证用户密码 参数 ：{password:}"
        },
        validateAccount: {
            url: PC_CALL+"customer/unite/isValidateAccount/",
            desc: "验证账号是否存在 参数 ：{account: type:'email/mobile'}"
        },
        validateCustomerAccount: {
            url: PC_CALL+"customer/unite/validateCustomerAccount/",
            desc: "判断除登录人之外是否存在该账号 参数 ：{account: type:'email/mobile'}"
        },
        getCustomerAuth: {
            url: PC_CALL+"customer/auth/getCustomerAuth/",
            desc: "查询用户认证信息，如果为空，表示未认证过"
        },
        createAuth: {
            url: PC_CALL+"customer/auth/createAuth/",
            desc: "创建认证 参数 ：{firstame:''，lastName:''，attType:''，attCode:'',attPath:''......}"
        },
        getAuthAttachments: {
        	url: PC_CALL+"customer/auth_attachment/getAuthAttachments/",
            desc: "获取证件信息 参数 ：{attType:''}"
        },
        updateAuthAttachment: {
        	url: PC_CALL+"customer/auth_attachment/updateAuthAttachment/",
            desc: "获取证件信息 参数 ：{attType:'',attCode:'',attPath:''}"
        },
        getCollectionList: {
            url: PC_CALL+"customer/collection/getCollectionList/",
            desc: "获取本人收藏列表  参数 ：{pageIndex:1,pageSize:5,collectionType:''}"
        },
        getCollection: {
            url: PC_CALL+"customer/collection/getCollection/",
            desc: "获取一条收藏信息 参数 ：{collectionType:'',refId:''}"
        },
        isAlsoCollection: {
            url: PC_CALL+"customer/collection/isAlsoCollection/",
            desc: "是否已经收藏 参数 ：{collectionType:'',refId:''}"
        },
        createCollection: {
            url: PC_CALL+"customer/collection/createCollection/",
            desc: "会员添加收藏 参数 ：{collectionType:'',refId:''} 表：customer_collection (*collection_type,*ref_id,+ref_customer_id,+ref_name,*ref_url)"
        },
        cancelCollection: {
            url: PC_CALL+"customer/collection/cancelCollection/",
            desc: "会员取消收藏 参数 ：{collectionType:'',refId:''}"
        },
        getReviewList: {
            url: PC_CALL+"customer/review/getList/",
            desc: "获取评论列表 参数 ：{pageIndex:1,pageSize:5,reviewType:'',refId:'',+sortType:'(0/1)'}"
        },
        createReview: {
            url: PC_CALL+"customer/review/createReview/",
            desc: "添加评论 参数 ：{reviewType:'',refId:''......}  表：customer_review (*review_type,*review_status,*ref_id,*ref_url,+ref_customer_id,*review_content,*if_anonymous)"
        },
        getPrefer: {
            url: PC_CALL+"customer/prefer/getPrefer/",
            desc: "获取一条关注信息 参数 ：{usefulType:'',upDownType:'',refId:''}"
        },
        createPrefer: {
            url: PC_CALL+"customer/prefer/createPrefer/",
            desc: "添加关注 参数 ：{usefulType:'',upDownType:'',refId:''}"
        },
        cancelPrefer: {
            url: PC_CALL+"customer/prefer/cancelPrefer/",
            desc: "取消关注 参数 ：{usefulType:'',upDownType:'',refId:''}"
        },
        validCaosUserLogin: {
            url: PC_CALL+"customer/infocaos/validCaosUserLogin/",
            desc: "验证caos用户登录 参数 ：{email:'',password:''}"
        },
        getCaosUserById: {
            url: PC_CALL+"customer/infocaos/getCaosUserById/",
            desc: "获取caos用户信息 参数 ：{customerId:''}"
        },
        cancelPrefer: {
            url: PC_CALL+"customer/prefer/cancelPrefer/",
            desc: "取消关注 参数 ：{usefulType:'',upDownType:'',refId:''}"
        },
        getCustomerVerification: {
            url: PC_CALL+"customer/verification/getCustomerVerification/",
            desc: "获取发送信息 参数 ：{siteId:'',typeId:'',*customerId:''}"
        },
        sendSms: {
            url: PC_CALL+"customer/verification/sendSms/",
            desc: "短信发送 参数 ：{siteId:'',account:'',*customerId:''}"
        },
        validSms: {
            url: PC_CALL+"customer/verification/validSms/",
            desc: "验证短信 参数 ：{validCode:'',mobile:'',type:'customer_reset_password/customer_verification'}"
        },
        sendPasswordEmail: {
            url: PC_CALL+"customer/reset/password/sendPasswordEmail/",
            desc: "发送密码邮件 参数 ：{resetSite:'2',email:''}"
        },
        sendPasswordMobile: {
            url: PC_CALL+"customer/reset/password/sendPasswordMobile/",
            desc: "发送密码短信验证码 参数 ：{resetSite:'2',siteId:'',account:''}"
        },
        updatePassword: {
            url: PC_CALL+"customer/reset/password/updatePassword/",
            desc: "更改密码 参数 ：{resetSite:'',password:''}"
        },
        createFollowResource: {
            url: PC_CALL+"customer/follow_resource/createFollowResource/",
            desc: "添加关注 参数 ：{refId:'1,2,3...',followType:'1-视频 2-文库 3-会议 4-话题 5-笔记 6-tag'......}"
        },
        createDFollowResource: {
            url: PC_CALL+"customer/follow_resource/createDFollowResource/",
            desc: "添加关注，先删除后增加 参数 ：{refId:'1,2,3...',followType:'1-视频 2-文库 3-会议 4-话题 5-笔记 6-tag'......}"
        },
        cancelFollowResource: {
            url: PC_CALL+"customer/follow_resource/cancelFollowResource/",
            desc: "添加关注 参数 ：{refIds:'1,2,3...',followType:'1-视频 2-文库 3-会议 4-话题 5-笔记 6-tag'......}"
        },
        getFollowResourceCount: {
            url: PC_CALL+"customer/follow_resource/getFollowCount/",
            desc: "添加关注人 参数 ：{＊customerId:，＋followType：}"
        },
        getFollowResources: {
            url: PC_CALL+"customer/follow_resource/getFollowResources/",
            desc: "获取已经关注的资源 参数 ：{customerId:,*followType：,pageIndex:,pageSize:}"
        },
        createListFollow: {
            url: PC_CALL+"follow/createListFollow/",
            desc: "添加关注人 参数 ：{refId:'1,2,3...'}"
        },
        cancelListFollow: {
            url: PC_CALL+"follow/cancelListFollow/",
            desc: "批量取消关注人 参数 ：{ids:'1,2,3...'}"
        },
        getWebUser: {
            url: PC_CALL+"web/user/getWebUser/",
            desc: "获取登录用户信息"
        },
        userValidAndBind: {
            url: PC_CALL+"web/user/userValidAndBind/",
            desc: "验证用户信息并绑定caos账号 参数 ：{email:'',passwd:'',caosCustomerId:''}"
        },
        checkSession: {
            url: PC_CALL+"web/user/checkSession/",
            desc: "判断用户是否在线"
        },
        userRegist: {
            url: PC_CALL+"web/user/userRegist/",
            desc: "用户注册 参数：{account:,type:'email/mobile',passwd:''}"
        },
        logout: {
            url: PC_CALL+"web/user/logout/",
            desc: "退出系统"
        },
        userLogin: {
            url: PC_CALL+"passport/securitycheck",
            desc: "用户登录"
        },
        socCreate:{
        	url:PC_CALL+"customer/social/create/",
        	desc:"社会任职添加信息服务"
        },
        socInfo:{
        	url:PC_CALL+"customer/social/info/",
        	desc:"社会任职查询信息服务"
        },
        socUpdate:{
        	url:PC_CALL+"customer/social/update/",
        	desc:"社会任职修改信息服务"
        },
        socDelete:{
        	url:PC_CALL+"customer/social/delete/",
        	desc:"社会任职删除信息服务"
        },
        opusCreate:{
        	url:PC_CALL+"customer/opus/create/",
        	desc:"学术专著添加信息服务"
        },
        opusInfo:{
        	url:PC_CALL+"customer/opus/info/",
        	desc:"学术专著查询信息服务"
        },
        opusUpdate:{
        	url:PC_CALL+"customer/opus/update/",
        	desc:"学术专著修改信息服务"
        },
        opusDelete:{
        	url:PC_CALL+"customer/opus/delete/",
        	desc:"学术专著删除信息服务"
        },
        patentCreate:{
        	url:PC_CALL+"customer/patent/create/",
        	desc:"发明专利添加信息服务"
        },
        patentInfo:{
        	url:PC_CALL+"customer/patent/info/",
        	desc:"发明专利查询信息服务"
        },
        patentUpdate:{
        	url:PC_CALL+"customer/patent/update/",
        	desc:"发明专利修改信息服务"
        },
        patentDelete:{
        	url:PC_CALL+"customer/patent/delete/",
        	desc:"发明专利删除信息服务"
        },
        fundCreate:{
        	url:PC_CALL+"customer/fund/create/",
        	desc:"科研基金添加信息服务"
        },
        fundInfo:{
        	url:PC_CALL+"customer/fund/info/",
        	desc:"科研基金查询信息服务"
        },
        fundUpdate:{
        	url:PC_CALL+"customer/fund/update/",
        	desc:"科研基金修改信息服务"
        },
        fundDelete:{
        	url:PC_CALL+"customer/fund/delete/",
        	desc:"科研基金删除信息服务"
        },
		topicInfo:{
			url:PC_CALL+"topic/baseinfo/info/",
        	desc:"话题信息"	
		},
		topicCreate:{
			url:PC_CALL+"topic/baseinfo/create/",
        	desc:"话题创建"	
		},
		topicUpdate:{
			url:PC_CALL+"topic/baseinfo/update/",
        	desc:"话题更新"	
		},
		topicDelete:{
			url:PC_CALL+"topic/baseinfo/delete/",
        	desc:"话题删除"	
		},
		topicRecover:{
			url:PC_CALL+"topic/baseinfo/recover/",
        	desc:"话题恢复"	
		},
		topicSetFirst:{
			url:PC_CALL+"topic/baseinfo/setFirst/",
        	desc:"话题置顶"	
		},
		topicRemFirst:{
			url:PC_CALL+"topic/baseinfo/removeFirst/",
        	desc:"话题取消置顶"	
		},
		topicList:{
			url:PC_CALL+"topic/baseinfo/json_list/",
        	desc:"话题列表"	
		},
		topicAttCreate:{
			url:PC_CALL+"topic/attachment/create/",
			desc:"上传话题图片"	
		},
		topicAttDelete:{
			url:PC_CALL+"topic/attachment/delete/",
			desc:"删除话题图片"	
		},
		topicAttList:{
			url:PC_CALL+"topic/attachment/json_list/",
			desc:"话题图片列表"		
		},
		caseInfo:{
			url:PC_CALL+"case_baseinfo/info/",
        	desc:"病例信息"	
		},
		caseCreate:{
			url:PC_CALL+"case_baseinfo/create/",
        	desc:"病例创建"	
		},
		caseUpdate:{
			url:PC_CALL+"case_baseinfo/update/",
        	desc:"病例更新"	
		},
		caseDelete:{
			url:PC_CALL+"case_baseinfo/delete/",
        	desc:"病例删除"	
		},
		caseRecover:{
			url:PC_CALL+"case_baseinfo/recover/",
        	desc:"病例恢复"	
		},
		caseSetFirst:{
			url:PC_CALL+"case_baseinfo/setFirst/",
        	desc:"病例置顶"	
		},
		caseRemFirst:{
			url:PC_CALL+"case_baseinfo/removeFirst/",
        	desc:"病例取消置顶"	
		},
		caseSupInfo:{
			url:PC_CALL+"case_supplement/info/",
        	desc:"完善病例信息"	
		},
		caseSupSave:{
			url:PC_CALL+"case_supplement/save/",
        	desc:"完善病例信息保存"	
		},
		caseList:{
			url:PC_CALL+"case_baseinfo/json_list/",
        	desc:"病例列表"	
		},
		voteCreate:{
			url:PC_CALL+"customer_vote/create/",
        	desc:"增加投票"
		},
		voteUpdate:{
			url:PC_CALL+"customer_vote/update/",
        	desc:"更新投票"
		},
		voteDelete:{
			url:PC_CALL+"customer_vote/delete/",
        	desc:"删除投票"
		},
		voteInfo:{
			url:PC_CALL+"customer_vote/info/",
        	desc:"投票信息"
		},
		voteRecover:{
			url:PC_CALL+"customer_vote/recover/",
			desc:"投票恢复"	
		},
		caseAttCreate:{
			url:PC_CALL+"case_attachment/upload/",
			desc:"上传话题图片"	
		},
		caseAttDelete:{
			url:PC_CALL+"case_attachment/delete/",
			desc:"删除话题图片"	
		},
		caseAttList:{
			url:PC_CALL+"case_attachment/list/",
			desc:"话题图片列表"		
		},
		generateTicket:{
        	url:PC_CALL+"wx/allin/interact/generateTicket/",
        	desc:"生成绑定二维码"
        },
        generateAuthTicket:{
        	url:PC_CALL+"wx/allin/interact/generateAuthTicket/",
        	desc:"生成认证二维码"
        },
        checkIfTipsBind:{
        	url:PC_CALL+"wx/allin/interact/checkIfTipsBind/",
        	desc:"校验是否需要加载提示绑定信息"
        },
        close:{
        	url:PC_CALL+"wx/allin/interact/close/",
        	desc:"关闭绑定提示信息时执行的方法"
        },
        cancleBind:{
        	url:PC_CALL+"wx/allin/interact/cancleBind",
        	desc:"解绑功能的实现"
        },
        updateWeixinUniteBind:{
        	url: PC_CALL+"wx/customer/updateWeixinUniteBind/",
            desc: "绑定微信账号（已登录） 参数 ：{}"
        },
        updateWeixinFlag:{
        	url: PC_CALL+"wx/customer/updateWeixinFlag/",
            desc: "绑定微信账号（已登录） 参数 ：{}"
        },
        checkIfBind:{
        	url:PC_CALL+"wx/allin/interact/checkIfBind/",
        	desc:"判断用户是否绑定过"
        },
        loginBind:{
        	url:PC_CALL+"wx/allin/interact/loginBind/",
        	desc:"判断用户是否绑定过"
        },
        registBind:{
        	url:PC_CALL+"wx/allin/interact/registBind/",
        	desc:"判断微信是否绑定过"
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
            timeout: 15000,
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
        /*if(callback!=null){
        	t.cback=callback;
        }*/
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
            //timeout: 10000,
            success: function(rep) {
                if (rep && rep.responseObject) {
                	//t.cback();
					callback&&callback(rep.responseObject);
                }

            }
        });
    },
    cback:function(){}
};