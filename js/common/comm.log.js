/**
 * Created by ALLIN on 2017/1/3.
 */
var commLog = {};
// 01:启动页;02:分类-课程（9大系列课);03:分类-题库（题库入口);04:登录注册-登录页;05:登录注册-找回密码页;06:登录注册-验证接收页;07:登录注册-重置密码页;08:登录注册-手机快捷登录页;09:登录注册-注册页;10:登录注册-唯医账号登录页;11:微信登录-账号绑定;12:登录注册-唯医登录-账号绑定;13:登录注册-账号授权页;14:医师认证-认证基本信息页（认证第一步);15:医师认证-认证类型页（认证第二步);16:医师认证-职称选择页;17:医师认证-专业选择页;18:医师认证-选择页-省;19:医师认证-选择页-市; 20:医师认证-选择页-医院;21:医师认证-选择页-基地;22:医师认证-医院添加页;23:医师认证-认证拒绝页;24:首页-首页;25:首页-精品课程列表页;26:搜索-(输入、结果页);27:消息-消息列表页（消息主页）;28:消息-通知详情页;29:消息-讨论列表页;30:消息-赞了我的列表页;31:习题-专项练习列表页;32:习题-顺序练习列表页;33:习题-错题本列表页;34:习题-习题资源页;35:习题-答题结果页;36:系列课-系列课简介页;37:系列课-系列课目录页;38:课程终端页-课程页;39:课程终端页-讨论输入页;40:课程终端页-讨论对话页;41:课程终端页-课件浏览页;42:我的-用户主页;43:我的-我的讨论;\n44:我的-下载-已下载;45:我的-已下载列表页;46:我的-下载-正在下载;47:我的-收藏-课程;48:我的-课程-习题;49:我的-学习历史;50:我的-编辑简介;51:我的-个人简介编辑页;52:我的-设置页;53:我的-账号安全;54:我的-账号绑定-微信;55:我的:账号绑定-唯医;56:我的-账号绑定-手机;57:我的-账号绑定-邮箱;58:我的-修改密码;59:我的-消息设置;60:我的-字号设置;61:我的-意见反馈;62:我的-关于我们;63:我的-添加头像提示;64:我的-个人头像-大图;65:他人主页-他人主页'
var commLogPageId = [
    {id:1, desc: "启动页"},
    {id:2, desc: "分类-课程（9大系列课)"},
    {id:3, desc: "分类-题库（题库入口)"},
    {id:4, desc: "登录注册-登录页"},
    {id:5, desc: "登录注册-找回密码页"},
    {id:6, desc: "登录注册-验证接收页"},
    {id:7, desc: "登录注册-重置密码页"},
    {id:8, desc: "登录注册-手机快捷登录页"},
    {id:9, desc: "登录注册-注册页"},
    {id:10, desc: "登录注册-唯医账号登录页"},
    {id:11, desc: "微信登录-账号绑定"},
    {id:12,desc:"登录注册-唯医登录-账号绑定"},
    {id:13,desc:"登录注册-账号授权页"},
    {id:14, desc: "医师认证-认证基本信息页（认证第一步)"},
    {id:15, desc: "医师认证-认证类型页（认证第二步)"},
    {id:16, desc: "医师认证-职称选择页"},
    {id:17, desc: "医师认证-专业选择页"},
    {id:18, desc: "医师认证-选择页-省"},
    {id:19, desc: "医师认证-选择页-市"},
    {id:20, desc: "医师认证-选择页-医院"},
    {id:21, desc: "医师认证-选择页-基地"},
    {id:22, desc: "医师认证-医院添加页"},
    {id:23, desc: "医师认证-认证拒绝页"},
    {id:24, desc: "首页-首页"},
    {id:25, desc: "首页-精品课程列表页"},
    {id:26, desc: "搜索-(输入、结果页)"},
    {id:27, desc: "消息-消息列表页（消息主页）"},
    {id:28, desc: "消息-通知详情页"},
    {id:29, desc: "消息-讨论列表页"},
    {id:30, desc: "消息-赞了我的列表页"},
    {id:31, desc: "习题-专项练习列表页"},
    {id:32, desc: "习题-顺序练习列表页"},
    {id:33, desc: "习题-错题本列表页"},
    {id:34, desc: "习题-习题资源页"},
    {id:35, desc: "习题-答题结果页"},
    {id:36, desc: "系列课-系列课简介页"},
    {id:37, desc: "系列课-系列课目录页"},
    {id:38, desc: "课程终端页-课程页"},
    {id:39, desc: "课程终端页-讨论输入页"},
    {id:40, desc: "课程终端页-讨论对话页"},
    {id:41, desc: "课程终端页-课件浏览页"},
    {id:42, desc: "我的-用户主页"},
    {id:43, desc: "我的-我的讨论"},
    {id:44, desc: "我的-下载-已下载"},
    {id:45, desc: "我的-已下载列表页"},
    {id:46, desc: "我的-下载-正在下载"},
    {id:47, desc: "我的-收藏-课程"},
    {id:48, desc: "我的-课程-习题"},
    {id:49, desc: "我的-学习历史"},
    {id:50, desc: "我的-编辑简介"},
    {id:51, desc: "我的-个人简介编辑页"},
    {id:52, desc: "我的-设置页"},
    {id:53, desc: "我的-账号安全"},
    {id:54, desc: "我的-账号绑定-微信"},
    {id:55, desc: "我的:账号绑定-唯医"},
    {id:56, desc: "我的-账号绑定-手机"},
    {id:57, desc: "我的-账号绑定-邮箱"},
    {id:58, desc: "我的-修改密码"},
    {id:59, desc: "我的-消息设置"},
    {id:60, desc: "我的-字号设置"},
    {id:61, desc: "我的-意见反馈"},
    {id:62, desc: "我的-关于我们"},
    {id:63, desc: "我的-添加头像提示"},
    {id:64, desc: "我的-个人头像-大图"},
    {id:65, desc: "他人主页-他人主页"},
];
commLog.pc = function(){
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};
commLog.changeUrl = function(str){
    // console.log(str)
    var newStr = "";
    var reg = "";
    if(commLog.pc()){
        reg = /\/\/www.yi-ding.net.cn\/call\//g;
        if(reg.test(str)){
            newStr = str.replace(/\/\/www.yi-ding.net.cn\/call\//,"//www.yi-ding.net.cn/call/");
        }else{
            newStr = str.replace(/\/\/m.yi-ding.net.cn\/mcall\//,"//www.yi-ding.net.cn/call/");
        }

    }else{
        reg = /\/\/m.yi-ding.net.cn\/mcall\//g;
        // console.log(reg.test(str))
        if(reg.test(str)){
            newStr = str.replace(/\/\/m.yi-ding.net.cn\/mcall\//,"//m.yi-ding.net.cn/mcall/");
        }else{
            newStr = str.replace(/\/\/www.yi-ding.net.cn\/call\//,"//m.yi-ding.net.cn/mcall/");
        }

    }
    // console.log(newStr)
    return newStr;
};
// window.onload=Log.createBrowse(1,"首页"); //	浏览日志
commLog.urlList = {
    createBrowse: commLog.changeUrl("//www.yi-ding.net.cn/call/log/yiding/customer/browse/create/"),	// 创建浏览记录
    updateLeave: "//www.yi-ding.net.cn/call/log/yiding/customer/browse/update/"	// 更新浏览记录－离开页面时间
};
commLog.logId = "";
commLog.isClose = false;
commLog.baiduPCLog = function(){
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?6f821f9b68f7d9af379b68d75dd5262f";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
};
commLog.baiduH5Log = function(){
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?42f17d9256d954c97b08666bff0b296b";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

};
if(commLog.pc()){
    commLog.baiduPCLog();
}else{
    commLog.baiduH5Log();
}
commLog.execute = function (funcName, paramJson) {
    var t = commLog;
    var url = t.urlList[funcName];
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
        async: true,//(paramJson.async == true) ? true : false,
        success: function callback(rep) {
            if (rep && rep.responseObject) {
                responseData = rep.responseObject;
            } else {
                responseData = rep;
            }
            if (responseData)
                commLog.logId = responseData.responsePk
        },
        error: function () {
        }
    });

    return responseData;
};
commLog.getCookie = function (Name) {
    var cookieName = encodeURIComponent(Name) + "=",  //注cookie的名和值都是经过URL编码的,所有这里要用函数编码
        returnvalue = "",
        cookieStart = document.cookie.indexOf(cookieName),
        cookieEnd = null;
    if (cookieStart > -1) {
        cookieEnd = document.cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        returnvalue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));  //对应的解码
    }
    return returnvalue;
}
commLog.getPage = function (id) {
    var len = commLogPageId.length;
    var page = null;
    for (var i = 0; i < len; i++) {
        var pageObj = commLogPageId[i];
        if (pageObj != null && pageObj.id != null && pageObj.id == id) {
            page = pageObj;
        }
    }
    return page;
}
commLog.getBrowserInfo=function () {
    var agent = navigator.userAgent.toLowerCase();

    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    //IE
    if(agent.indexOf("msie") > 0) {
        return agent.match(regStr_ie);
    }

    //firefox
    if(agent.indexOf("firefox") > 0) {
        return agent.match(regStr_ff);
    }

    //Chrome
    if(agent.indexOf("chrome") > 0) {
        return agent.match(regStr_chrome);
    }

    //Safari
    if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        return agent.match(regStr_saf);
    }

};
commLog.checkUrl = function(type,pra){
    var urlInfoContainer = [
        {"regx":/curriculum/g,"type":"2","name":"分类-课程（9大系列课)","urlLink":"https://www.yi-ding.net.cn/pages/curriculum/curriculum.html"},
        {"regx":/question/g,"type":"3","name":"分类-题库","urlLink":"https://www.yi-ding.net.cn/pages/category/question.html"},
        {"regx":/one_exercise/g,"type":"34","name":"习题-习题资源页","urlLink":"https://www.yi-ding.net.cn/"},
        {"regx":/niceClass/g,"type":"25","name":"首页-精品课程列表页","urlLink":"https://www.yi-ding.net.cn/pages/index/niceClass.html"},
        {"regx":/search/g,"type":"26","name":"搜索-(输入、结果页)","urlLink":"https://www.yi-ding.net.cn/pages/search/search.html"},
        {"regx":/message_discuss/g,"type":"29","name":"消息-讨论列表页（消息主页）","urlLink":"https://www.yi-ding.net.cn/pages/message/message_discuss.html"},
        {"regx":/message_like/g,"type":"30","name":"消息-赞了我的列表页","urlLink":"https://www.yi-ding.net.cn/pages/message/message_like.html"},
        {"regx":/message_information/g,"type":"","name":"","urlLink":"https://www.yi-ding.net.cn/pages/message/message_information.html"},
        {"regx":/message_index/g,"type":"27","name":"消息-消息列表页（消息主页）","urlLink":"https://www.yi-ding.net.cn/pages/message/message_index.html"},
        {"regx":/help_feedback/g,"type":"","name":"","urlLink":"https://www.yi-ding.net.cn/pages/help_feedback/help_feedback.html"},
        {"regx":/www.yi-ding.net.cn\/course/g,"type":"38","name":"课程终端页-课程页","urlLink":"https://www.yi-ding.net.cn/"},
        {"regx":/www.yi-ding.net.cn\/message/g,"type":"","name":"","urlLink":"https://www.yi-ding.net.cn/"},
        {"regx":/www.yi-ding.net.cn\/series/g,"type":"36","name":"系列课-系列课简介页","urlLink":"https://www.yi-ding.net.cn/"},
        {"regx":/exercise_order_begin/g,"type":"32","name":"习题-顺序练习列表页","urlLink":"https://www.yi-ding.net.cn/pages/exercises/exercise_order_begin.html"},
        {"regx":/exercise_order.html/g,"type":"34","name":"习题-习题资源页","urlLink":"https://www.yi-ding.net.cn/pages/exercises/exercise_order.html"},
        {"regx":/exercise_order_result/g,"type":"35","name":"习题-答题结果页","urlLink":"https://www.yi-ding.net.cn/pages/exercises/exercise_order_result.html"},
        {"regx":/exercise_project_begin/g,"type":"31","name":"习题-专项练习列表页","urlLink":"https://www.yi-ding.net.cn/pages/exercises/exercise_project_begin.html"},
        {"regx":/exercise_project.html/g,"type":"34","name":"习题-习题资源页","urlLink":"https://www.yi-ding.net.cn/pages/exercises/exercise_project.html"},
        {"regx":/exercise_project_result/g,"type":"35","name":"习题-答题结果页","urlLink":"https://www.yi-ding.net.cn/pages/exercises/exercise_project_result.html"},
        {"regx":/personal_wrongList/g,"type":"33","name":"习题-错题本列表页","urlLink":"https://www.yi-ding.net.cn/pages/personal/personal_wrongList.html"},
        {"regx":/exercise_error_status/g,"type":"73","name":"错题本习题页","urlLink":"https://www.yi-ding.net.cn/pages/exercises/exercise_error_status.html"},
        {"regx":/personal_index/g,"type":"42","name":"我的-用户主页","urlLink":"https://www.yi-ding.net.cn/"},
        {"regx":/others_index/g,"type":"65","name":"他的-用户主页","urlLink":"https://www.yi-ding.net.cn/pages/personal/others_index.html"},
        {"regx":/personal_myDiscuss/g,"type":"43","name":"我的-我的讨论","urlLink":"https://www.yi-ding.net.cn/pages/personal/personal_index.html"},
        {"regx":/personal_collection/g,"type":"47","name":"我的-收藏-课程","urlLink":"https://www.yi-ding.net.cn/pages/personal/personal_collection.html"},
        {"regx":/personal_learnHistory/g,"type":"49","name":"我的-学习历史","urlLink":"https://www.yi-ding.net.cn/pages/personal/personal_learnHistory.html"},
        {"regx":/personal_setting/g,"type":"52","name":"我的-设置页","urlLink":"https://www.yi-ding.net.cn/pages/personal/personal_setting.html"},
        {"regx":/personal_introConfig/g,"type":"51","name":"我的-个人简介编辑页","urlLink":"https://www.yi-ding.net.cn/pages/personal/personal_introConfig.html"},
        {"regx":/personal_qualification/g,"type":"","name":"","urlLink":"https://www.yi-ding.net.cn/pages/personal/personal_qualification.html"},
        {"regx":/allinAuthority/g,"type":"12","name":"登录注册-唯医登录-账号绑定","urlLink":"https://www.yi-ding.net.cn/pages/authority/allinAuthority.html"},
        {"regx":/changePhone/g,"type":"12","name":"登录注册-唯医登录-账号绑定","urlLink":"https://www.yi-ding.net.cn/pages/authority/changePhone.html"},
        {"regx":/weixinBindLogin/g,"type":"11","name":"微信登录-账号绑定","urlLink":"https://www.yi-ding.net.cn/pages/authority/weixinBindLogin.html"}

    ];
    var urlOnOff = true;
    var regx = /^(https|http):\/\/www.yi-ding.net.cn\/$/;
    if (type == "type") {
        for (var uNum = 0; uNum < urlInfoContainer.length; uNum++) {
            if (urlInfoContainer[uNum].regx.test(pra)) {
                urlOnOff = false;
                return urlInfoContainer[uNum].type;
            }
        }
        if (urlOnOff) {
            if (regx.test(pra)) {

                return "24";
            }
        }
    } else {
        for (var uNumT = 0; uNumT < urlInfoContainer.length; uNumT++) {
            if (urlInfoContainer[uNumT].type == pra) {
                return urlInfoContainer[uNumT].urlLink;
            }
        }
        if (pra == "24") {
            if (regx.test(pra)) {
                return "https://www.yi-ding.net.cn";
            }
        }
    }
};
commLog.creatEvent = function(option){
    var t = commLog;
    var broseUrl;
    if (option.url) {
        broseUrl = option.url;
    } else {
        broseUrl = window.location.href.substr(0, 250);
    }
    var browser=commLog.getBrowserInfo();
    var verinfoNum='';
    var verinfo='';
    if (browser) {
        verinfoNum = (browser + "").replace(/[^0-9.]/ig, "");
        verinfo = (browser + "").replace(/[^a-zA-Z]/ig, "") + ',' + verinfoNum;
    }

    var trackLocation = option.trackLocation ? option.trackLocation : "";
    var type = (comm.getURrlName("sourceType")) ? comm.getURrlName("sourceType") : commLog.checkUrl("type",document.referrer);
    var browseTypeSourceUrl = document.referrer ? document.referrer : commLog.checkUrl("url",type);
    var nowType = option.browseType?option.browseType:commLog.checkUrl("type",window.location.href);
    var param = {
        customerId: localStorage.getItem('userId') || 0,
        trackLocation:trackLocation,
        browseTypeUrl: broseUrl,
        trackId:option.id,
        keyWord:option.keyword,
        browseTypeSourceUrl:browseTypeSourceUrl,
        opIp:returnCitySN["cip"],
        browseTypeSource:type,
        opSource:"网站",
        opAddress:returnCitySN["cname"],
        opNetwork:"",
        browseType: nowType,
        opAdvice:verinfo
    };
    var postData = {};
    postData.paramJson = $.toJSON(param);
    $.ajax({
        type: 'POST',
        url: "//www.yi-ding.net.cn/call/log/yiding/track/create/",
        data: postData,
        dataType: "json",
        async: true,//(paramJson.async == true) ? true : false,
        success: function (rep) {
            /*if (rep && rep.responseObject) {
                responseData = rep.responseObject;
            } else {
                responseData = rep;
            }
            if (responseData)
                commLog.logId = responseData.responsePk*/
        },
        error: function () {
        }
    });


};
commLog.createBrowse = function (browseType, opDesc, url) {
    var t = commLog;
    var broseUrl;
    if (url != undefined) {
        broseUrl = url;
    } else {
        broseUrl = window.location.href.substr(0, 250);
    }
    var browser=commLog.getBrowserInfo();
    var verinfoNum='';
    var verinfo='';
    if(browser){
        verinfoNum = (browser + "").replace(/[^0-9.]/ig, "");
        verinfo = (browser + "").replace(/[^a-zA-Z]/ig, "")+','+verinfoNum;
    }
    var timer=new Date();
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var openTime = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
    var param = {
        customerId:localStorage.getItem('userId')||0,
        browseUrl: broseUrl,
        browseType: browseType,
        opDesc: opDesc,
        openTime:openTime,
        opIp:returnCitySN["cip"],
        opAddress:returnCitySN["cname"],
        opAdvice:verinfo
    };
    // var openPage = t.getCookie("openPage");
    // if (openPage == null || openPage == "") {

        t.execute("createBrowse", param);
    //     var exp = new Date();
    //     exp.setTime(exp.getTime() + 20 * 1000);
    //     document.cookie = "openPage=on;expires=" + exp.toGMTString();
    // }

}
/**
 * 离开页面记录
 */
commLog.updateLeave = function () {
    if (commLog.logId && commLog.logId != "") {
        var param = {
            id: commLog.logId,
        };
        commLog.execute("updateLeave", param);
        commLog.logId = "";
    }
};

// window.onbeforeunload = function (evt) {
//     commLog.updateLeave();
// };
