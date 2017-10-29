//微信强制授权认证
function isWXBrowse(){
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf("iphone") > 0) {
		return "iphoneWX";
	}else if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf("android") > 0) {
		return "androidWX";
	}
	return "other";
}

if(isWXBrowse() === "androidWX"){ //
	if(localStorage.getItem("wxBrowseAccessLockOn") === null){
		localStorage.setItem("wxBrowseAccessLockOn", "on");
	}

	if(localStorage.getItem("wxBrowseAccessLockOn") == "on"){
		localStorage.setItem("wxBrowseAccessLockOn", "off");
		var appId = "wx8d4a2df6fdc13658";
		var toUrl = "http://m.allinmd.cn/mcall/wx/allin/interact/view/?url="+location.href;
		window.location.href= "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeURIComponent(toUrl)+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
	}
}else if( isWXBrowse() === "iphoneWX" ){
	if(localStorage.getItem("wxBrowseAccessLockOn") === null){
		localStorage.setItem("wxBrowseAccessLockOn", "on");
	}

	if(localStorage.getItem("wxBrowseAccessLockOn") == "on"){
		localStorage.setItem("wxBrowseAccessLockOn", "off");
		var appId = "wx8d4a2df6fdc13658";
		var toUrl = "http://m.allinmd.cn/mcall/wx/allin/interact/view/?url="+encodeURIComponent(location.href);
		window.location.href= "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+encodeURIComponent(toUrl)+"&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
	}
}

var domain = {
	js_url : "",   //http://js.allinmd.cn/ 默认服务器js地址
	css_url : "", //http://css.allinmd.cn/ 默认服务器css地址
	plugins_url : "", //plugins 默认服务器plugins地址
	charset : "utf-8",
	get : function() {
		var version = "0.8";
		for (var a = 0; a < arguments.length; a++) {
			var b = arguments[a].substring(arguments[a].lastIndexOf(".") + 1);
			var plugins = arguments[a].substr(0,7);
			if (b == "css") {
				if(plugins == "plugins"){
					var c = this.plugins_url.replace(/\$/, b) + arguments[a];
					document.write(unescape("%3Clink href='" + c.replace('plugins/', '') + "' rel='stylesheet' type='text/css'/%3E"))
				}else if(plugins != "plugins"){
					var c = this.css_url.replace(/\$/, b) + arguments[a];
					document.write(unescape("%3Clink href='" + c + "?t_="+ new Date().getTime() +"' rel='stylesheet' type='text/css'/%3E"))
				}
			} else if (b == "js") {
				if(plugins == "plugins"){
					var c = this.plugins_url.replace(/\$/, b) + arguments[a];
					document.write(unescape("%3Cscript src='" + c.replace('plugins/', '') + "' type='text/javascript' charset='" + this.charset + "'%3E%3C/script%3E"))
				}else if(plugins != "plugins"){
					var c = this.js_url.replace(/\$/, b) + arguments[a];
					document.write(unescape("%3Cscript src='" + c+"?_=" + version + "' type='text/javascript' charset='" + this.charset + "'%3E%3C/script%3E"))
				}
			}
		}
	}
};
call_url='';
default_logoUrl = "";
var pageId="";   //页面主键

// debug
//var debugMode = true;
//if(debugMode){
//    document.write("<script src='http://192.168.10.19:8085/target/target-script-min.js#anonymous'></script>");
//}


function IsPC() {
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

function toggleToPC() {
	var PC = IsPC();
	if (PC && !/conference\/live-wrap.html/g.test(location.href) ) {
		var currentUrl = location.href;
		if (currentUrl.indexOf("m.allinmd.cn") > -1) {
			location.href = currentUrl.replace("m.allinmd.cn", "www.allinmd.cn").replace("/m/", "/");
		}
	}
}

function subLoading(){
	var sah2= screen.availHeight/2+16;
	var saw2= screen.availWidth/2+16;
	var centerStyle= "position:absolute;left:"+saw2+"px;top:"+sah2+"px;";
	var loading= document.createElement("img");
	loading.setAttribute("id","loading");
	loading.setAttribute("src", "//m.allinmd.cn/images/img50/case/loading.gif");
	loading.setAttribute("style", centerStyle);
	document.documentElement.appendChild(loading);
}

subLoading();
toggleToPC();
document.documentElement.removeChild(document.getElementById("loading"));


domain
	.get(
		'/js/lib/jquery.mobile-1.4.2/jquery.mobile-1.4.2.min.css',
		'/css/common/base.css',
		'/css/common/main.css',
		'/css/common/login.css',
		'/js/third-party/photoswipe/photoswipe-master/dist/photoswipe.css',
		'/js/third-party/photoswipe/photoswipe-master/dist/default-skin/default-skin-new.css',
		'/js/lib/jquery/jquery-1.8.0.min.js',
		'/js/lib/jquery.mobile-1.4.2/jquery.mobile-1.4.2.js',
		'/js/comm/main.js',
		'/js/comm/comm.ajax.js',
		'/js/comm/comm.func.js',
		'/js/comm/comm_service.js',
		'/js/json/operator_auth.js',
		'/js/comm/comm-page-url.js',
		'/js/comm/comm-data.js',
		'/js/comm/date.js',
		'/js/comm/comm-customer.js',
		'/js/lib/jquery/jquery.json-2.4.js',
		'/js/third-party/jquery-validate/jquery.validate.js',
		'/js/third-party/jquery-validate/jquery.validate.rules.collection.js',
		'/js/comm/common.js',
		'/js/modules/module.user.js',
		'/js/comm/jweixin-1.0.0.js',
		'/js/comm/WeixinJSApi.js',
		'/js/third-party/jquery.plugin.picshow-comment.js',
		'/js/comm/log.js',
		'/js/modules/dialog.js',
		'/js/third-party/photoswipe/photoswipe-master/dist/photoswipe.js',
		'/js/third-party/photoswipe/photoswipe-master/dist/photoswipe-ui-default.js'
	);


