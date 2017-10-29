/**
 * 功能描述： 跟踪用户操作记录 埋点
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by LiuYuTao on 2016/8/3.
 */

/*
 *
 *  `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `customer_id` bigint(20) DEFAULT NULL COMMENT '会员id',
 `session` varchar(100) DEFAULT NULL COMMENT '用户session',
 `location_id` bigint(20) DEFAULT NULL COMMENT '区块id',
 `channel_id` bigint(20) DEFAULT NULL COMMENT '频道id',
 `column_id` bigint(20) DEFAULT NULL COMMENT '栏目id',
 `recommend_id` bigint(20) DEFAULT NULL COMMENT '推荐资源位id',
 `ad_id` bigint(20) DEFAULT NULL COMMENT '广告位id',
 `ad_position` varchar(100) DEFAULT NULL COMMENT '广告图片位置（宽高坐标，以字符分割）',
 `trigger_type` int(2) DEFAULT '0' COMMENT '触发方式（1-左键点击、2-右键点击、3-上滑、4-下滑、5-左滑、6-右滑、7-列表上拉、8-列表下拉、9-页面打开、10-页面关闭、11-双击、12-双指外滑、13-双指内滑、14-拖动、15-跳转页面、16-大图缩放）',
 `trigger_name` varchar(2000) DEFAULT NULL COMMENT '触发对象的名称or内容（按钮文字、图片地址、文字内容...）',
 `action_id` varchar(200) DEFAULT NULL COMMENT '动作：action   （prefer、search、reprint、review）',
 `param` varchar(2000) DEFAULT '' COMMENT '携带的参数字符串',
 `ref_id` bigint(20) DEFAULT NULL COMMENT '关联id',
 `ref_type` bigint(20) DEFAULT '0' COMMENT '关联类型（1-视频，2-文库，3-会议，4-话题 ,6-标签，7-病例，8-评论）',
 `src_location` varchar(200) DEFAULT NULL COMMENT '外部来源url｜落地url    ：  来源的H5页面链接',
 `to_location` varchar(200) DEFAULT NULL COMMENT '跳转链接',
 `op_ip` varchar(50) DEFAULT NULL COMMENT '操作来源（ip）',
 `ip_org` varchar(100) DEFAULT NULL,
 `area_code` varchar(100) DEFAULT NULL,
 `city` varchar(200) DEFAULT NULL COMMENT '城市',
 `country_code` varchar(50) DEFAULT NULL COMMENT '国家编码',
 `country_name` varchar(100) DEFAULT NULL COMMENT '国家',
 `latitude` varchar(50) DEFAULT NULL COMMENT '纬度',
 `longitude` varchar(50) DEFAULT NULL COMMENT '经度',
 `postal_code` varchar(20) DEFAULT NULL COMMENT '邮编',
 `region` varchar(30) DEFAULT NULL,
 `time_zone` varchar(100) DEFAULT NULL COMMENT '时区',
 `pro_version` varchar(20) DEFAULT NULL COMMENT 'app、项目版本号',
 `os_version` varchar(50) DEFAULT NULL COMMENT '操作系统版本',
 `t_version` varchar(50) DEFAULT NULL COMMENT '浏览器型号',
 `net_version` int(2) DEFAULT '0' COMMENT '网络状态1-wifi   2-2G  3-3G、4-4G',
 `telecom` int(2) DEFAULT '0' COMMENT '运营商（1-移动、2-联通、3-电信）',
 `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 `site_id` int(6) DEFAULT '0' COMMENT '发送渠道',
 *
 *
 * */
;(function () {
	var config = {
		path: "/mcall/log/track/create/"
	};


	// TODO: 精细化组合事件 ,以免绑定事件过多
	var eventRules = {
		pages: {
			personalIndex: [],
			searchPage: [],
			list: []
		},
		modules: {
			users: [],
			comment: [],
			socail: [],
			menu: [],
			picShow: []
		}
	};

	//

	var AllEventRule = [
		/*公共模块*/
		{
			name: "v2-导航头部链接点击-click",
			selector: ".al-indexNavbar .al-indexNavbarItem a",
			event: "vclick touch click",
			param: "href|text"
		},
		{
			name: "v2-底部导航菜单链接点击",
			selector: ".al-footerBar a",
			event: "vclick touch click",
			param: "href|text"
		}, {
			name: "导航菜单搜索按钮点击",
			selector: "#headerSearchInput",
			event: "vclick"
		}, {
			name: "导航菜单搜索表单提交",
			selector: "#search_Form",
			event: "submit",
			param: "form"
		}, {
			name: "v2-瀑布流单元项-点击-click",
			selector: ".al-contentPartModule a",
			event: "vclick touch click",
			param: "href|text"
		},{
			name: "v2-瀑布流标签推荐单元项-点击-click",
			selector: ".al-tagsRecommend  li a",
			event: "vclick touch click",
			param: "href|text"
		}, {
			name: "v2-瀑布流推荐医师单元项-点击-click",
			selector: ".al-doctorRecommendItem  li",
			event: "vclick touch click",
			param: "text"
		},

		/* 个人中心 */
		{
			name: "个人中心-为你推荐-Tab-Click",
			selector: ".personal_recommend .Ev-vclickRecommend",
			event: "vclick",
			param: "text"
		},
		{
			name: "个人中心-好友动态-Tab-Click",
			selector: ".personal_recommend .Ev-vclickFriendTrend",
			event: "vclick",
			param: "text"
		},
		{
			name: "个人中心-发布病例-Btn-Click",
			selector: ".personal_index_channel_fl #case_upload",
			event: "vclick",
			param: "text"
		},
		{
			name: "个人中心-聊话题-Btn-Click",
			selector: ".personal_index_channel_fl #topic_upload",
			event: "vclick",
			param: "text"
		},
		{
			name: "个人中心-写文章-Btn-Click",
			selector: ".personal_index_channel_fl #doc_upload",
			event: "vclick",
			param: "text"
		},
		{
			name: "个人中心-传视频-Btn-Click",
			selector: ".personal_index_channel_fl #video_upload",
			event: "vclick",
			param: "text"
		},
		{
			name: "个人中心-更多-Btn-Click",
			selector: ".personal_index_channel_fl .toBeContinue",
			event: "vclick",
			param: "text"
		},

		/*频道页 ------*/
		{
			name: "频道页-标签-Links-Click",
			selector: ".index_tab a",
			event: "vclick",
			param: "href|text"
		},
		{
			name: "频道页-幻灯片-Links-Click",
			selector: "#slideshow a,.meetingBannerWrap a",
			event: "vclick",
			param: "href|title"
		},	{
			name: "v2-发现页-入口类型-click",
			selector: ".al-discoverEntry .al-discoverEntryItem",
			event: "vclick touch click",
			param: "href|text"
		},
		{
			name: "v2-首页-推荐入口-click",
			selector: ".al-indexRecommend .al-indexRecommendItem",
			event: "vclick touch click",
			param: "text"
		},
		/* 个人主页*/

		/*列表页*/
		{
			name: "列表页-排序Box-Click", //
			selector: ".bottom-ctrl-box .order-box",
			event: "vclick",
			param: "text"
		}, {
			name: "列表页-排序项-options-Click", //
			selector: ".bottom-ctrl-box .order-select-box li",
			event: "vclick",
			param: "text"
		}, {
			name: "列表页-筛选菜单头-selectType-Click", //
			selector: ".menu2-box ul li",
			event: "vclick",
			param: "text"
		}, {
			name: "列表页-筛选条目-selectItems-Click", //
			selector: ".select-list li",
			event: "vclick",
			param: "text"
		}, {
			name: "列表页-page-scroll", //
			selector: ".case_list_cont",
			event: "touchmove scroll",
			param: "text|href"
		}, {
			name: "列表页-资源条目-item-click", //
			selector: ".case_list_cont li a",
			event: "touchmove",
			param: "text|href"
		},
		/*搜索页*/
		{
			name: "搜索页头部-输入框-input", //
			selector: ".v3-search-box input#keyword",
			event: "focus",
			param: "text"
		},
		{
			name: "搜索页头部-输入框表单提交-keyword-submit", //
			selector: "#searchForm",
			event: "submit"
		}, {
			name: "搜索页提示关键词-关键词-click", //
			selector: "#keywordsHintCon li",
			event: "vclick"
		}, {
			name: "搜索页搜索结果-标签-click", //
			selector: "#v3-searchPage .search-tags ul li",
			event: "vclick",
			param: "text"
		},
		/* 交互模块*/
		{
			name: "交互模块-功能-Click", //
			selector: ".plugin-relation li div",
			event: "vclick",
			param: "text"
		},
		{
			name: "交互模块-底部分享-Click", //
			selector: ".module-floatRelation ul li,.module-floatRelation .fx_b_jh div",
			event: "vclick",
			param: "text"
		},
		{
			name: "v2-交互模块-底部分享-Click", //
			selector: ".user-interact-box li",
			event: "vclick",
			param: "identity|id"
		},
		/*登录注册、认证、弹层*/
		{
			name: "权限模块-登录注册-Tabs-Click", //
			selector: ".m-UserPop-v2 .login_title .login_allin,.m-UserPop-v2 .login_title .login_caos",
			event: "vclick",
			param: "text"
		},
		{
			name: "权限模块-登录注册-Btn-Click", //
			selector: "#allinSubmitBtn,#registBtn,#indexCantLogin,.m-UserPop-v2 .third-party a",
			event: "vclick",
			param: "text"
		}, {
			name: "权限模块-登录注册-close-Click", //
			selector: ".m-UserPop-v2 .close",
			event: "vclick"
		},
		/*组织页*/
		{
			name: "组织页面-links-Click", //
			selector: ".organization_list li a",
			event: "vclick",
			param: "text"
		},
		/*会议页*/
		{
			name: "会议页面-模板导航-links-Click", //
			selector: ".evNaviTab li a",
			event: "vclick",
			param: "text|href"
		},
		{
			name: "会议页面-模板内容区-links-Click", //
			selector: "#meeting_content a",
			event: "vclick",
			param: "text|href"
		},
		{
			name: "会议页面-模板内容区-links-Click", //
			selector: ".meeting_detail_content li a",
			event: "vclick",
			param: "text|href"
		},
		{
			name: "页面底部-Links-Click", //
			selector: ".footer_center a",
			event: "vclick",
			param: "text|href"
		}
	];

	//（1-左键点击、2-右键点击、3-上滑、4-下滑、5-左滑、6-右滑、7-列表上拉、8-列表下拉、9-页面打开、10-页面关闭、11-双击、12-双指外滑、13-双指内滑、14-拖动、15-跳转页面、16-大图缩放）
	var triggerTypes = {
		"left_click": 1,
		"right_click": 2,
		"up_scroll": 3,
		"down_scroll": 4,
		"left_scroll": 5,
		"right_scroll": 6,
		"list_swipe_up": 7,
		"list_swipe_down": 8,
		"page_open": 9,
		"page_close": 10,
		"double_click": 11,
		"pinch_out": 12,
		"pinch_in": 13,
		"drag": 14,
		"page_jump": 15,
		"load": 16
	};

	var baseParams = {};

	function locationError(error) {
		/*	switch(error.code) {
		 case error.TIMEOUT:
		 console.log("A timeout occured! Please try again!");
		 break;
		 case error.POSITION_UNAVAILABLE:
		 showError('We can\'t detect your location. Sorry!');
		 break;
		 case error.PERMISSION_DENIED:
		 showError('Please allow geolocation access for this to work.');
		 break;
		 case error.UNKNOWN_ERROR:
		 showError('An unknown error occured!');
		 break;
		 }*/
		baseParams.latitude = "";
		baseParams.longitude = "";
	}

	function locationSuccess(position) {
		var coords = position.coords;
		baseParams.latitude = coords.latitude;
		baseParams.longitude = coords.longitude;
		localStorage.setItem("latitude", coords.latitude);
		localStorage.setItem("longitude", coords.longitude);
	}

	if (navigator.geolocation) {
		if (window.localStorage && !window.localStorage.getItem("latitude")) {
			navigator.geolocation.getCurrentPosition(locationSuccess, locationError, {
				// 指示浏览器获取高精度的位置，默认为false
				enableHighAccuracy: true,
				// 指定获取地理位置的超时时间，默认不限时，单位为毫秒
				timeout: 5000,
				// 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
				maximumAge: 3000
			});
		} else {
			baseParams.latitude = localStorage.getItem("latitude");
			baseParams.longitude = localStorage.getItem("longitude");
		}
	} else {
		//alert("Your browser does not support Geolocation!");
	}



	function getOS() {
//获取用户代理
		var ua = navigator.userAgent;
		if (ua.indexOf("Windows NT 5.1") != -1) return "Windows XP";
		if (ua.indexOf("Windows NT 6.0") != -1) return "Windows Vista";
		if (ua.indexOf("Windows NT 6.1") != -1) return "Windows 7";
		if (ua.indexOf("Windows NT 6.3") != -1) return "Windows 8";
		if (ua.indexOf("Windows NT 6.4") != -1) return "Windows 10";
		if (ua.indexOf("Windows NT 10.0") != -1) return "Windows 10";
		if (ua.indexOf("(Macintosh;") != -1) return "Macbook";
		if (ua.indexOf("iPhone") != -1) return "iPhone";
		if (ua.indexOf("iPad") != -1) return "iPad";
		if (ua.indexOf("Linux") != -1) {
			var index = ua.indexOf("Android");
			if (index != -1) {
//os以及版本
				var os = ua.slice(index, index + 13);

//手机型号
				var index2 = ua.indexOf("Build");
				var type = ua.slice(index + 1, index2);
				return type + os;
			} else {
				return "Linux";
			}
		}
		return "未知操作系统";
	}

	function getTimeZone() {
		var d = new Date();
		return d.getTimezoneOffset() / 60
	}

	baseParams.osVersion = getOS();//getSystem().system; // 系统版本
	baseParams.timeZone = "GMT " + getTimeZone();
	baseParams.siteId = '2';        //唯医网 手机版
	baseParams.tVersion = navigator.appCodeName + " " + navigator.appVersion;   // 浏览器版本


	/*var actionId = {
	 pages:{
	 "open_page":1000,
	 "close_page":1001,
	 "unfolded":1002,
	 "folded":1003,
	 "clear":1004
	 },
	 social:{

	 },
	 publish:{

	 },
	 users:{

	 },
	 systems:{

	 },
	 slides:{

	 },
	 others:{

	 }
	 }; // 暂不用*/


	function track(trigger_type, trigger_name, trigger_param) {
		var src_location = document.referrer || window.location.href;
		var to_location = window.location.href;
		var tp = trigger_param ? trigger_param : "";

		var params = $.extend(baseParams, {
			"triggerType": trigger_type,
			"triggerName": trigger_name,
			"srcLocation": src_location,
			"toLocation": to_location,
			"param": tp
		});

		var asyncType = true;
		if (trigger_type == triggerTypes.page_close) {
			asyncType = false;
		}

		var paramJson = {
			paramJson: $.toJSON(params)
		};
		sendTrack(paramJson);
	}

	/*发送*/
	function sendTrack(params, asyncType) {
		$.ajax({
			url: config.path,
			data: params,
			type: "post",
			async: asyncType,
			success: function (data) {
			}
		});
	}


	function getTriggerType(event) {
		switch (event) {
			case "vclick":
				return triggerTypes.left_click;
			case "submit":                      // 因无提交事件，用左键点击代替
				return triggerTypes.left_click;
			default :
				return triggerTypes.left_click;
		}
	}


	function bindBodyEvent() {
		for (var i = 0; i < AllEventRule.length; i++) {
			var obj = AllEventRule[i];
			(function (obj) {
				switch (obj.event) {
					case "vclick touch click":
					case "vclick":
						$("body").on(obj.event, obj.selector, function (e) {
							var trigger_type = getTriggerType(obj.event);
							var param = "";
							if (obj.param) {
								var arr = obj.param.split("|");
								for (var j = 0; j < arr.length; j++) {
									var obj1 = arr[j];
									switch (obj1) {
										case 'text':
											param += "|innerText=" + $(this).text().trim();
											break;
										case 'href':
											param += "|href=" + $(this).attr("href");
											break;
										default:
											if($(this).attr(obj1)){
												param += "|" + obj1 + "=" + $(this).attr("obj1");
											}
											break;
									}
								}
							}
							track(trigger_type, obj.name, param);

							if(this.tagName.toLowerCase()!="a"){
							//	return false;        //放开的话，页面点击都跳转不了了。
							}
						});
						break;
					case "submit":
						$(obj.selector).on(obj.event, function (e) {
							var param = "";
							var trigger_type = getTriggerType(obj.event);
							var inputs = $(obj.selector).find("input");
							$.each(inputs, function (index, item) {
								param += $(item).attr("name") + "=" + $(item).val();
							});
							track(obj.event, obj.name, param);
						});
						break;
				}

			})(obj);
		}
	}

	function bindPageLeave() {
		$(window).on("unload", function () {
			track(triggerTypes.page_close, "v2-页面关闭或者跳转了");
		});
	}

	$(function () {
		track(triggerTypes.page_open, "v2-页面打开");
		bindPageLeave();
		bindBodyEvent();
	});


})();