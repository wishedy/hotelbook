/**
 * Created by ALLIN on 2016/12/13.
 */

var domain = {
    getRootPath: function () {
        //获取当前网址，如： http://localhost:8080/ems/Pages/Basic/Person.jsp
        var curWwwPath = window.document.location.href;
        //获取主机地址之后的目录，如： /ems/Pages/Basic/Person.jsp
        var pathName = window.document.location.pathname;
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        if(pathName.indexOf("/")!= -1){
           return window.location.origin  || curWwwPath;
        }
        var pos = curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8080
        var localhostPath = curWwwPath.substring(0, pos);
        //获取带"/"的项目名，如：/ems
        var projectName = pathName.substring(0, pathName.substr(0).indexOf('/') );
        if (projectName == "/yiding_static") {
            return localhostPath;
        } else {
            return (localhostPath + projectName);
        }
    },
    charset: "utf-8",
    get: function () {
        //                var version = "0.2";
        for (var i = 0; i < arguments.length; i++) {
            var b = arguments[i].substring(arguments[i].lastIndexOf(".") + 1);
            var rootPath = this.getRootPath();
            if (b == "css") {
                document.write(unescape("%3Clink href='" + rootPath + arguments[i] + "' rel='stylesheet' type='text/css'/%3E"))
            } else if (b == "js") {
                // console.log("js");
                document.write(unescape("%3Cscript src='" + rootPath + arguments[i] + "' type='text/javascript' charset='" + this.charset + "'%3E%3C/script%3E"));

            }
        }
    }
};
var pcOrH5 = {
    "pc":function(){
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
    }
}
domain.changeUrl = function(str){
    // console.log(str)
    var newStr = "";
    var reg = "";
    if(pcOrH5.pc()){
        reg = /\/\/www.yi-ding.net.cn\/call\//g;
        if(reg.test(str)){
            newStr = str.replace(/\/www.yi-ding.net.cn\/call\//,"//www.yi-ding.net.cn/call/");
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
    //console.log(newStr)
    return newStr;
};
