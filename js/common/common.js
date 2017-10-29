//loading的显示与隐藏
var comm = {}; //公共方法字典创建
comm.loading = {
    show: function () {
        if ($(".ev-loading").length == 0) {
            $("body").append('<section class="al-middleTipsBox ev-loadingBox" style="z-index: -10"><section class="al-middleTipsModal ev-loading"><figure class="al-middleTipsModalText al-loading"><img src="/image/personal/loading_big@2x.png" alt=""></figure></section></section>');
            $('.al-middleTipsBox').css({
                'zIndex':10
            })
        } else {
            $(".ev-loading").show();
            $('.al-middleTipsBox').css({
                'zIndex':10
            })
        }
    },
    hide: function () {
        $(".ev-loading").hide();
        $('.ev-loadingBox').css({
            'zIndex':-10
        })
    }
};
comm.htmlToString = function (str) {
    var rstStr = (str + '').replace(/[<>&]/g, function (c) {
        return {'<': '&lt;', '>': '&gt;', '&': '&amp;'}[c];
    });
    var tempArr = rstStr.split("\&lt\;\/a\&gt\;&lt\;a");

    if (tempArr.length >= 2) {
        rstStr = tempArr.map(function (d, index) {
            var s = d.replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)/gi, "<a href=\"$1\">$2");
            s = s.replace(/[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)&lt\;\/a\&gt\;/gi, " href=\"$1\">$2</a>");
            return s;
        }).join("</a><a");
    } else {
        rstStr = (rstStr + '').replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)\&lt\;\/a\&gt\;/gi, "<a href=\"$1\">$2</a>");
        /* 恢复文本中的提醒谁看的A链接*/
    }
    rstStr = rstStr.replace(/@@/g, "@");
    return rstStr;
}
comm.redirect = function (href, paramTime, isLoading, loadingTxt) {
    //是否显示loading，默认显示
    var isL = true;
    if (isLoading == false) {
        isL = isLoading;
    }
    if (isL) {
        /*if (loadingTxt && loadingTxt != "") {
         $.mobile.loading("show", {text: loadingTxt, textVisible: true});
         } else {
         $.mobile.loading("show");
         }*/
    }
    var time = 500,
        hash, temp;
    if (paramTime != null && typeof paramTime != "undefined") {
        time = paramTime;
    }
    if (href.indexOf("#") > 0) {
        temp = href.split("#");
        href = temp[0];
        hash = temp[1];
    }

    /*  if(href.indexOf("?")>0){
     href += "&_=" + Math.random();
     }else{
     href += "?_=" + Math.random();
     }
     if(hash!="" && hash!=undefined){
     href = href+"#"+hash;
     }*/
    if (time > 0) {
        setTimeout(function () {
            //$.mobile.loading("hide");
            window.location.href = href;
        }, time);
    } else {
        window.location = href
    }

};
comm.setCenter = function (obj) {
    var positionFromTop = ($(window).height() - obj.height()) / 2;
    var positionFromLeft = ($(window).width() - obj.width()) / 2;
    var top = $(window).scrollTop() + positionFromTop;
    var left = $(window).scrollLeft() + positionFromLeft;
    obj.css({
        top: top + 'px',
        left: left + 'px'
    });
};

comm.browser = {
    mozilla: /firefox/.test(navigator.userAgent.toLowerCase()),
    webkit: /webkit/.test(navigator.userAgent.toLowerCase()),
    opera: /opera/.test(navigator.userAgent.toLowerCase()),
    msie: /msie/.test(navigator.userAgent.toLowerCase()),
    versions: function () {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return { //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

comm.setImgSize = function (maxHeight, maxWidth, objImg) {
    var img = new Image();
    img.src = objImg.src;
    var hRatio;
    var wRatio;
    var Ratio = 1;
    var w = img.width;
    var h = img.height;
    wRatio = maxWidth / w;
    hRatio = maxHeight / h;
    if (maxWidth === 0 && maxHeight === 0) {
        Ratio = 1;
    } else if (maxWidth === 0) { //
        if (hRatio < 1) Ratio = hRatio;
    } else if (maxHeight === 0) {
        if (wRatio < 1) Ratio = wRatio;
    } else if (wRatio < 1 || hRatio < 1) {
        Ratio = (wRatio <= hRatio ? wRatio : hRatio);
    }
    if (Ratio < 1) {
        w = w * Ratio;
        h = h * Ratio;
    }
    objImg.height = h;
    objImg.width = w;
};
/**
 * 将超出长度的字符串加。。。
 * @param str
 * @param len
 * @returns {string}
 */
comm.getStrLen = function (str, len) {
    var strlen = 0,
        s = "";
    for (var i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
                return s.substring(0, s.length - 1) + "...";
            }
        } else {
            strlen = strlen + 1;
            if (strlen >= len) {
                return s.substring(0, s.length - 2) + "...";
            }
        }
    }
    return s;
};
/*
 * 截取字符长度
 * */
comm.getStrByteLen = function (str, len) {
    var newStr = '',
        newLength = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
            newLength += 2;
        } else {
            newLength++;
        }
        if (newLength <= len) {
            newStr = newStr.concat(str[i]);
        } else {
            break;
        }
    }
    if (newLength > len) {
        newStr = newStr + "..."
    }
    return newStr;
};

/*
 *获取字符串长度
 */
comm.getByteLen = function (val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) !== null) // 全角
            len += 2;
        else
            len += 1;
    }
    return len;
};

// 取消冒泡
comm.stopBubble = function (event) {
    event && event.stopPropagation ? event.stopPropagation() : window.event.cancelBubble = !0
};

/**
 * 用户类型
 * @param account
 * @returns {string}
 */
comm.checkAccountType = function (account) {
    var type = "";
    if (/^(127|13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(account)) {
        type = "mobile";
    }
    if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(account)) {
        type = "email";
    }
    return type;
};


/**
 *
 * @returns {{}}
 */
comm.getpara = function (symbol) //获取参数的函数
{
    var url = document.URL;
    var param = {};
    var str, item;
    if (url.lastIndexOf(symbol ? symbol : "?") > 0) {
        str = url.substring(url.lastIndexOf(symbol ? symbol : "?") + 1, url.length);
        var arr = str.split("&");
        for (var i = 0; i < arr.length; i++) {
            item = arr[i].split("=");
            param[item[0]] = decodeURIComponent(item[1]);
        }
    }
    return param;
};

//判断空对象
comm.isEmptyObject = function (obj) {
    for (var n in obj) {
        return false
    }
    return true;
};

comm.forceHttp = function () {
    if (location.protocol === "https:")
        location.href = "http://" + location.hostname + location.pathname + location.search;
};

comm.getparaNew = function () //获取参数的函数
{
    var url = document.URL;
    var param = {};
    var str, item;
    str = url;
    if (url.lastIndexOf("?") > 0) {
        str = url.substring(url.lastIndexOf("?") + 1, url.length);
    }
    if (url.lastIndexOf("#") > 0) {
        str = str.split("#")[1];
    }
    if (url.indexOf("=") == "-1") {
        return false;
    }
    if (str.length > 0) {
        var arr = str.split("&");
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                item = arr[i].split("=");
                param[item[0]] = decodeURIComponent(item[1]);
            }
            return param;
        }
        return false;
    }
    return false;
};

/**
 * 将参数 生成锚点链接 添加到链接后面
 * @param obj   参数对象
 */
comm.buildAnchor = function (obj) {
    if (obj && obj != null && !$.isEmptyObject(obj)) {
        var a = window.location.pathname + location.search;
        if (a.indexOf("#") < 0) {
            a += "#";
        }
        for (var key in obj) {
            a += "&" + key + "=" + obj[key];
        }
        if (a.indexOf("share=app" > 0)) {
            a += "&share=app";
        }
        if (a.indexOf("visitSiteId") > 0) {
            var visitSiteId = comm.getparaNew().visitSiteId;
            a += "&visitSiteId=" + visitSiteId;
        }
        window.location.href = a;
    } else {
        return;
    }
};
/**
 * 获取分类下的标签数据
 * @param type {String} 专业
 * @returns {*}
 */
comm.getData = function (type) {

    var opts = CommonJsonData.videoListOptionArr[1],
        arr = [];
    if (type >= 0) {
        for (var i = 0, l = opts.length; i < l; i++) {
            if (opts[i].parentId == type) {
                arr.push(opts[i]);
            }
        }
        return arr;
    } else {
        return CommonJsonData.videoListOptionArr[1];
    }
}

/**
 *
 * @param {String} str
 * @returns {number}
 */
comm.getLength = function (str) {
    var realLength = 0,
        len = str ? str.length : 0,
        charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}

/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
comm.cutstr = function (str, len, symbol) {
    var str_length = 0;
    var str_len = 0;
    str_cut = new String();
    str_len = str.length;
    for (var i = 0; i < str_len; i++) {
        a = str.charAt(i);
        str_length++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            if (symbol) {
                str_cut = str_cut.concat("...");
            }
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；
    if (str_length < len) {
        return str;
    }
}

comm.revCutstr = function (str, len, symbol) {
    function newCut(str, len) {
        var str_length = 0;
        var str_len = 0;
        str_cut = new String();
        str_len = str.length - 1;
        for (var i = str_len; i >= 0; i--) {
            a = str.charAt(i);
            str_length++;
            if (escape(a).length > 4) {
                //中文字符的长度经编码之后大于4
                str_length++;
            }
            str_cut = str_cut.concat(a);
            if (str_length >= len) {
                if (symbol) {
                    str_cut = str_cut.concat("...");
                }
                return str_cut;
            }
        }
        //如果给定字符串小于指定长度，则返回源字符串；
        if (str_length < len) {
            return str;
        }
    }

    var str = newCut(str, len);
    str_cut1 = new String();
    for (var i = str.length; i >= 0; i--) {
        a = str.charAt(i);
        str_cut1 = str_cut1.concat(a);
    }
    return str_cut1;

}

/* 将手机号中间四位替换成星号 */
comm.phoneMask = function (account) {
    return account.substr(0, 3) + "****" + account.substr(7, 11);
};


/* 为链接添加延迟响应，以避免迅速跳转后触发下一页同位置的按钮的bug */
comm.renderLinks = function () {
    $("a").on("click", function (e) {
        var str = $(this).attr("href");
        if (str && str.indexOf("javascript") < 0 && str != "") {
            e.stopPropagation();
            e.preventDefault();
            setTimeout(function () {
                comm.redirect(str);
            }, 500);
        }
    });
};

/* 为链接添加延迟响应，以避免迅速跳转后触发下一页同位置的按钮的bug */
comm.autoLogin = function () {
    var param = comm.getpara();
    var loginType = param && param.loginType;
    var signature = param && param.signature;
    var account_ = param && param.account;
    var password = param && param.password;
    var type = "";
    if (loginType && loginType == "weixin" && account_ && account_ != "") {
        var ses = customer.execute("checkSession");
        if (ses.responseStatus && !ses.responseMessage.status) { // 未登录
            type = "weixin";
            param = {
                j_username: "weixin;" + account_ + ";allin;" + signature,
                j_password: "allin"
            };
            param.rememberMe = 1;
            var url = customer.urlList.userLogin.url;
            $.ajax({
                url: url,
                cache: false,
                async: false,
                data: param,
                dataType: 'json',
                type: "POST"
            });
        }
    }
};
//获取文件大小
comm.getFileSize = function (target) {
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var fileSize = 0;
    if (isIE && !target.files) {
        //          var filePath = target.value;
        //          var fileSystem = new ActiveXObject("Scripting.FileSystemObject");   ／／IE需要安全配置
        //
        //          if(!fileSystem.FileExists(filePath)){
        //             alert("附件不存在，请重新输入！");
        //             return;
        //          }
        //          var file = fileSystem.GetFile (filePath);
        //          fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }

    return fileSize;
};

/* 初始化输入框获取光标事件 */
comm.initInputFocusEvent = function () {
    $("input").on("focus", function () {
        $(this).parents(".v3-input-wrap").addClass("active");
        $(this).parents(".v3-input-wrap").addClass("active-border");
    });
    $("input").on("blur", function () {
        if ($.trim($(this).val()) == "") {
            $(this).parents(".v3-input-wrap").removeClass("active");
        }
        $(this).parents(".v3-input-wrap").removeClass("active-border");
    });
};


/***
 *  绑定返回按钮
 * @param pageName  某个子页面
 * @param href      返回到哪个页面
 */
comm.bindReturnBtn = function (pageName, href) {
    var pageBox = "";
    if (pageName != "" && typeof pageName != "undefined") {
        pageBox = "#" + pageName;
    }

    $(pageBox + " .v3-login-return," + pageBox + " .v3-return-btn").on("click", function () {
        if (href != "" && typeof href != "undefined") {
            comm.redirect(href);
        } else {
            $.mobile.loading("show");
            setTimeout(function () {
                $.mobile.loading("hide");
                history.go(-1);
            }, 600);
        }
    });
};
comm.getResponseResult = function (data) {
    if (!$.isEmptyObject(data) && data.responseObject && data.responseObject.responseStatus && !$.isEmptyObject(data.responseObject.responseData)) {
        return data.responseObject.responseData;
    } else {
        return false;
    }
}
comm.showPageError = function (param1, param2) {
    var page;
    if (param2 == undefined) {
        page = $(".content-page");
    } else {
        page = $("#" + param2);
    }
    if (page.find(".errorInfo").size() == 0) {
        page.prepend("<div class='errorInfo'></div>");
    }
    page.find(".errorInfo").show().empty().append('<div class="top_warning"><span><label>' + param1 + '<div class="close"></div></label></span></div>');

    page.find(".close").on("click", function () {
        page.find(".errorInfo").hide();
    });
};

/**
 * 绑定微信账号
 */
comm.bindWeixin = function () {
    customer.execute("updateWeixinUniteBind", null, null);
};


comm.setOpenCenter = function (el) {

    el.css("top", $(window).scrollTop() + ($(window).height() / 2 - el.height() / 2));
    document.body.style.overflow = 'hidden';
};

comm.setCenter = function (obj) {
    var positionFromTop = ($(window).height() - obj.height()) / 2;
    var positionFromLeft = ($(window).width() - obj.width()) / 2;
    var top = $(window).scrollTop() + positionFromTop;
    var left = $(window).scrollLeft() + positionFromLeft;
    obj.css({
        top: top + 'px',
        left: left + 'px'
    });
};

/**
 * 处理未知是否合法的对象 比如 {} null undefined;
 * @param obj
 * @param defaultStr     默认替换字符串
 * @returns {*}
 */
comm.hdlEptObj = function (obj, defaultStr) {
    if ($.isEmptyObject(obj) || obj == "") {
        return defaultStr != undefined ? defaultStr : "";
    } else {
        return obj;
    }
};

comm.isWeiXin = function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
};

comm.getBrowseType = function () {
    var u = navigator.userAgent;
    var bbT = { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        mac: u.indexOf('Mac') > -1,
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    }
    return bbT;
}

/**
 * 处理 6_脊柱,2_关节 的用户职称数据，去掉前面的数字
 * @param str
 * @returns {*}
 */
comm.removeMedicalTitleNum = function (str) {

    return str ? str.replace(/\d*_/g, "") : "";
};
/**
 * 截剪医师
 * @param arr
 * @returns {string}
 */
comm.cutDoctorTitle = function (arr) {
    var title = "";
    if (arr.length > 0) {
        var arrList = arr.split(",");
        var regExp = /(医师)/g;
        for (var i = 0; i < arrList.length; i++) {
            if (regExp.test(arrList[i])) {
                title = arrList[i];
                break;
            }
        }
    }
    return title;
};
/**
 * 裁剪非医师
 * @param arr
 * @returns {string}
 */
comm.cutNotDoctorTitle = function (arr) {
    var title = "";
    if (arr.length > 0) {
        var arrList = arr.split(",");
        var regExp = /(医师)/g;
        for (var i = 0; i < arrList.length; i++) {
            if (!regExp.test(arrList[i])) {
                title += arrList[i] + ",";
            }
        }
    }
    return title;
};
//
/**
 * @example
 * var param={"struts.token":};
 * CommService.getResponseData("/mcall/web/user/getWebUser/",param);
 * @returns {String}
 */
comm.getToken = function () {
    var data = CommService.getResponseData("/mcall/token/getToken/", null);
    if (data && data.token)
        return data.token;
    return "";
};

/**
 * 历史记录 设置 与返回
 * @type {{setFrom: setFrom, back: back, getHistory: getHistory}}
 */
comm.history = {
    /**
     * 记录来源
     */
    setFrom: function (paramLocation) {
        var t = this;
        var arr = t.getHistory();
        var exist = false;
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item[0] == window.location.href) {
                exist = true;
            }
        }
        var lastPage;

        //if(!exist){
        if (paramLocation != undefined) {
            lastPage = paramLocation;
        } else if (TempCache.getItem("location") != null) {
            lastPage = TempCache.getItem("location");
            TempCache.setItem("location", window.location.href);
        } else {
            lastPage = document.referrer;
        }
        if (TempCache.getItem("location") != null && TempCache.getItem("location") != "" && TempCache.getItem("location").indexOf("app/#") > 0) {
            lastPage = TempCache.getItem("location");
            TempCache.setItem("location", "");
        }

        /*if(window.location.href!=lastPage){
         console.log("lastPage:" + document.referrer);
         arr.push([window.location.href,lastPage]);
         TempCache.setItem("history", $.toJSON(arr));
         }*/
        //}
        // console.log(arr);
        //if(location){
        TempCache.setItem("location", window.location.href);
        //}
    },
    setLocation: function () {
        TempCache.setItem("location", window.location.href);
    },
    /**
     * 返回时获取本页来源页
     */
    back: function () {
        var t = this;
        var arr = t.getHistory();
        var exist = false;
        var returnHref;

        if (arr.length) {
            for (var i = arr.length; i > 0; i++) {
                var item = arr[i];
                if (item[0] == window.location.href) {
                    var href = item[1];
                    arr.remove(i);
                    returnHref = href;
                    exist = true;
                    break;
                }
            }
            TempCache.setItem("history", $.toJSON(arr));
        }

        if (!exist) {
            returnHref = "/";
        }
        window.location.href = returnHref;
    },
    getHistory: function () {
        var str = TempCache.getItem("history");
        var arr = [];
        if (str != undefined) {
            arr = $.parseJSON(str);
        }
        return arr;
    }
};

comm.showPage = function (id) {
    $("[data-role=page]").hide();
    $(id).show();
};
//病例提示弹层
comm.attention = function (str, obj, confirmText, ensureCallback) {
    if (confirmText == undefined) {
        confirmText = "确定"
    }
    var html = '<div id="atten"><div class="jxl_mask"></div>' +
        '<div class="jsx_parent">' +
        '<div class="jxl_want" style="top:40%">' +
        '<div class="atten_title">提示</div>' +
        '<div class="atten_con">' + str + '</div>' +
        '<div class="jxl_want_bottom">' +
        '<div class="ms_sure">' + confirmText + '</div>' +
        '</div>' +
        '</div>' +
        '</div></div>';
    obj.append(html);
    setTimeout(function () {
        comm.setCenter($("#atten .jxl_want"));
    }, 50);

    $(".ms_sure").on("click", function () {
        ensureCallback && ensureCallback();
        setTimeout(function () {
            $("#atten").remove();
        }, 500);

    });
};
//草稿箱保存提示
comm.draftAttention = function (obj, str) {
    var html = '<div id="attention"><div class="jxl_mask"></div>' +
        '<div class="jsx_parent">' +
        '<div class="jxl_want">' +
        '<div class="atten_title">提示</div>' +
        '<div class="atten_con">' + str + '</div>' +
        '<div class="jxl_want_bottom" style="border-top: solid #969696 1px;">' +
        '<div class="jix_l" id="no_save_dra">不保存</div>' +
        '<div class="jix_r" id="save_dra">保存</div>' +
        '<div class="clear"></div>' +
        '</div>' +
        '</div>' +
        '</div></div>';
    obj.append(html);
    setTimeout(function () {
        comm.setCenter($("#attention .jxl_want"));
    }, 50);
};

comm.equipment = {
    IsPC: function () {
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
};

comm.shareLog = function (options) {
    var customerId = TempCache.getItem("userId");
    var conId = comm.getpara().conId;
    var defaultOptions = {
        customerId: customerId,
        shareType: 3,
        resourceId: conId,
        resourceType: 3,
        refId: conId,
        isValid: 1,
        refUrl: window.location.href
    };
    //  shareType"));//1-视频，2-文库，3-会议 4-话题，7-病例，8－评论
    //  shareSence"));//分享场景24-会议直播页面-多会场 25-直播列表页面 26-会议回放页面
    //  shareChannel);//分享渠道（1-QQ空间，2-QQ好友，3-新浪微博，4-微信好友，5-微信朋友圈 ，6短信
    defaultOptions = $.extend(defaultOptions, options);

    $.ajax({
        url: "/mcall/customer/share/createShareLog/",
        type: "POST",
        data: {
            paramJson: $.toJSON(defaultOptions)
        },
        success: function () {

        }
    });
}

/**
 * 绑定点击列表事件，使其可以点li 跳转到内部的链接上
 * @param {jQuery} el - 要绑定的li元素
 * @example comm.bindLinks($(".case_list_cont").find("li"))
 */
comm.bindLinks = function (el) {

    $(el).on("click", function (e) {
        window.location.href = $(this).find("a").attr("href");
    });
};


/**
 * 显示发布弹框
 *
 * @Author qiangkailiang
 */

comm.releaseBox = function () {
    $(".al-release").on("click", function (e) {
        e.stopPropagation();
        if ($(".al-releasePageMask").hasClass('show')) {
            return;
        }
        $(".al-releasePageMask").addClass('show');
        if (comm.browser.versions.android) {

            $(".al-releasePageMask").addClass('al-fullBlurAndroid');
        } else {
            $(".al-mainInner").addClass('al-fullBlur');
        }

    });

    $(".al-releaseCancel").on("click", function (e) {
        e.stopPropagation();
        if (!($(".al-releasePageMask").hasClass('show'))) {
            return;
        }
        $(".al-releasePageMask").removeClass('show');
        if (comm.browser.versions.android) {
            $(".al-releasePageMask").removeClass('al-fullBlurAndroid')
        } else {
            $(".al-mainInner").removeClass('al-fullBlur');
        }
    });
};
comm.getURrlName = function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
/**
 * 发现————二级筛选列表控制
 *
 * @Author qiangkailiang
 */
comm.twoFilterController = function () {
    var myscroll_first, myscroll_second;

    // $(".yd-typeFilterNavbarItem").eq(0).addClass('active');
    // $(".yd-typeFilterMainMask").eq(0).addClass('active');
    // $(".yd-discoverMask").addClass('show');

    $('.yd-typeFilterNavbarItem').on("click", function (e) {
        var role = $(this).data("role");
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(".yd-typeFilterMainMask[data-role=" + role + "]").removeClass("active");
            $(".yd-discoverMask").removeClass('show');
        } else {
            $(this).addClass('active').siblings().removeClass('active');
            $(".yd-typeFilterMainMask").removeClass('active');
            $(".yd-typeFilterMainMask[data-role=" + role + "]").addClass('active');
            $(".yd-discoverMask").addClass('show');
        }
    });
    //EV-sortFilter
    $(".EV-sortFilter").on("click", ".yd-oneFloorFilterItem[data-role='sort']", function (e) {
        $(this).addClass('active').siblings().removeClass('active');
        $(".yd-typeFilterNavbarItem").removeClass('active');
        $(".yd-typeFilterMainMask").removeClass('active');
        $(".yd-typeFilterNavbarItem[data-role='sort'] span").text($(this).text());
        $(".yd-discoverMask").removeClass('show');
    });
    $(".EV-sortFilter").on("click", ".yd-oneFloorFilterItem[data-role='filter']", function (e) {
        $(this).addClass('active').siblings().removeClass('active');
        $(".yd-typeFilterNavbarItem").removeClass('active');
        $(".yd-typeFilterMainMask").removeClass('active');
        $(".yd-typeFilterNavbarItem[data-role='filter'] span").text($(this).text());
        $(".yd-discoverMask").removeClass('show');
    });


};


/**
 * Confirm模态框弹层
 *      @param options {obj}
 *          - title 标题文本 {string}
 *          - content 正文文本 {string}
 *          - cancel 取消按钮文本 {string}
 *          - ensure 确认按钮文本 {string}
 *          - ensureCallback 确认执行回调 {Function}
 *          - cancelCallback 取消执行回调 {Function}
 *          - callBack   确认执行回调 {Function}（点击事件在callBack函数里）
 * @Author qiangkailiang
 */

/*comm.confirmBox = function (options) {
    if ($('.yd-confirmModalMask').length === 0) {
        var template = '<section class="yd-confirmModalMask" style="background-color:rgba(0,0,0,0.3); ">' +
            '<section class="yd-confirmModal">' +
            '<article class="yd-confirmModalContent">' +
            '<article>' +
            (options.title ? ('<h2>' + options.title + '</h2>') : '') +
            (options.content ? ('<p>' + options.content + '</p>') : '') +
            '</article>' +
            '</article>' +
            '<footer class="yd-confirmModalBtns">' +
            '<button class="yd-confirmModalCancelBtn">' + options.cancel + '</button>' +
            '<button class="yd-confirmModalEnsureBtn">' + options.ensure + '</button>' +
            '</footer>' +
            '</section>' +
            '</section>';
        $("body").append(template);

        setTimeout(function (e) {
            $(".yd-confirmModalMask").addClass('show');
        }, 100);

        $("body").off('click').on("click", ".yd-confirmModalEnsureBtn", function () {
            options.ensureCallback && options.ensureCallback();
            $(".yd-confirmModalMask").removeClass('show').remove();
            return false;
        }).on("click", ".yd-confirmModalCancelBtn", function () {
            options.cancelCallback && options.cancelCallback();
            $(".yd-confirmModalMask").removeClass('show').remove();
            return false;
        });
        options.callBack && options.callBack();
    } else {
        $(".yd-confirmModalMask").addClass('show');
    }
};*/






/**
 * 新版弹层
 *      @param options {obj}
 *          - title 标题文本 {string}
 *          - content 正文文本 {string}
 *          - cancel 取消按钮文本 {string}
 *          - ensure 确认按钮文本 {string}
 *          - ensureCallback 确认执行回调 {Function}
 *          - cancelCallback 取消执行回调 {Function}
 *          - callBack   确认执行回调 {Function}（点击事件在callBack函数里）
 * @Author yangmiaomiao
 */

comm.confirmBox = function (options) {
    if ($('.yd_popup').length === 0) {
        var template =  '<section class="yd_popup">' +
                            '<section class="popupCont">' +
                                '<figure class="closePopup"><img src="/image/Close@2x.png"></figure>' +
                                (options.title ? ('<aside class="title">' + options.title + '</aside>') : '') +
                                (options.content ? ('<aside class="content">' + options.content + '</aside>') : '') +
                                '<section class="button">' +
                                    '<button class="btnCancel">' + options.cancel + '</button>' +
                                    '<button class="btnEnter">' + options.ensure + '</button>' +
                                '</section>' +
                            '</section>' +
                        '</section>';
        $("body").append(template);

        setTimeout(function (e) {
            $(".yd_popup").addClass('show');
        }, 100);

        $('.closePopup').on('click',function(){
            $('.yd_popup').remove();
        })

        $("body").off('click').on("click", ".btnEnter", function () {
            options.ensureCallback && options.ensureCallback();
            $(".yd_popup").removeClass('show').remove();
            return false;
        }).on("click", ".btnCancel", function () {
            options.cancelCallback && options.cancelCallback();
            $(".yd_popup").removeClass('show').remove();
            return false;
        });
        options.callBack && options.callBack();
    } else {
        $(".yd_popup").addClass('show');
    }
};


/**
 * alert模态框弹层
 *      @param options {obj}
 *          - mTitle 大标题文本
 *          - title 正文文本 {string}
 *          - ensure 确认按钮文本 {string}
 *          - ensureCallback 确认执行回调 {Function}
 *
 * @Author qiangkailiang
 */

comm.alertBox = function (options) {
    if ($('.yd-alertModalMask').length === 0) {
        var template = '<section class="yd-confirmModalMask yd-alertModalMask" style="background-color:rgba(0,0,0,0.3); ">' +
            '<section class="yd-confirmModal">' +
            '<article class="yd-confirmModalContent">' +
            '<article>' +
            (options.mTitle ? '<h2>' + (options.mTitle || '') + '</h2>' : '') +
            '<p>' + (options.title || '') + '</p>' +
            '</article>' +
            '</article>' +
            '<footer class="yd-confirmModalBtns">' +
            '<button class="yd-confirmModalEnsureBtn" style="width:100%">' + (options.ensure || '') + '</button>' +
            '</footer>' +
            '</section>' +
            '</section>';
        $("body").append(template);

        setTimeout(function (e) {
            $(".yd-alertModalMask").addClass('show');
        }, 50);

        $("body").on("click", ".yd-confirmModalEnsureBtn", function () {
            options.ensureCallback && options.ensureCallback();
            $(".yd-alertModalMask").removeClass('show');
            return false;
        });
    } else {
        $(".yd-alertModalMask").addClass('show');
    }
};

/**
 * alert模态框弹层(带有关闭按钮)
 *      @param options {obj}
 *          - mTitle 大标题文本
 *          - title 正文文本 {string}
 *          - ensure 确认按钮文本 {string}
 *          - ensureCallback 确认执行回调 {Function}
 *
 * @Author zhanghongda
 */

comm.alertBoxClo = function (options) {
    if ($('.yd-alertModalMask').length === 0) {
        var template = '<section class="yd-confirmModalMask yd-alertModalMask" style="background-color:rgba(0,0,0,0.5); ">' +
            '<section class="yd-confirmModal">' +
            '<article class="yd-confirmModalContent">' +
            '<article style="position:relative">' +
            '<h2>' + (options.mTitle || '') + '</h2>' +
            '<p>' + (options.title || '') + '</p>' +
            '<span><img class="yd-closeBtn" style=" position:absolute; top:-30px; right:-55px; " src="/image/classes/department/login_close.png"/></span>' +
            '</article>' +
            '</article>' +
            '<footer class="yd-confirmModalBtns">' +
            '<button class="yd-confirmModalEnsureBtn" style="width:100%">' + (options.ensure || '') + '</button>' +
            '</footer>' +
            '</section>' +
            '</section>';
        $("body").append(template);

        setTimeout(function (e) {
            $(".yd-alertModalMask").addClass('show');
        }, 50);

        $("body").on("click", ".yd-confirmModalEnsureBtn", function () {
            options.ensureCallback && options.ensureCallback();
            $(".yd-alertModalMask").removeClass('show');
            return false;
        });
        $("body").on("click", ".yd-closeBtn", function () {
            options.cancelCallback && options.cancelCallback();
            $(".yd-alertModalMask").removeClass('show');
            return false;
        });
    } else {
        $(".yd-alertModalMask").addClass('show');
    }
};


/**
 * 输入框动态样式
 *      @param options {obj}
 *          - inputCallback 开始输入时执行回调 {function}
 *          - emptyCallback 输入框内容删空执行回调 {function}
 *          - focusCallback 点击输入框执行回调 {function}
 *          - clearCallback 输入框内容手动点击清空执行回调
 *          - cancelCallback 取消按钮点击执行回调 {function}
 * @Author qiangkailiang
 *
 */
comm.inputFocus = function (cObj) {
    cObj = cObj || {};
    $(".yd-searchInputBar input").on("keyup", function (e) {
        if ($(this).val().length !== 0) {
            $(this).parent().find(".icon-searchCancel").show();
            cObj.inputCallback && cObj.inputCallback($(this));
        } else {
            $(this).parent().find(".icon-searchCancel").hide();
            cObj.emptyCallback && cObj.emptyCallback();
        }
    });
    $(".yd-searchInputBar input").on("click", function () {
        $(".yd-searchHead").addClass('yd-searchHeadShow');
        $(this).addClass('focus');
        $(".yd-searchHead .yd-searchCancel").addClass('show');
        cObj.focusCallback && cObj.focusCallback();
    });


    $(".yd-searchCancel").on("click", function (e) {
        if (e.target.className === "icon-searchCancel") {
            $(".yd-searchInputBar").find("input").val("");
            $(".icon-searchCancel").hide();
            cObj.clearCallback && cObj.clearCallback();
            return;
        } else {
            $(".yd-searchInputBar").removeClass('yd-searchHeadShow');
            $(".yd-searchInputBar input").removeClass('focus');
            $(".yd-searchInputBar .yd-searchCancel").removeClass('show');
            cObj.cancelCallback && cObj.cancelCallback();
        }

    });

    $(".yd-searchFocusMask").on("click", function () {
        $(".yd-searchHead").removeClass('al-searchHeadShow');
        $(".yd-searchHead input").removeClass('focus');
        $(".yd-searchHead .yd-searchCancel").removeClass('show');
    });


};
//发布按钮
comm.uploadBtn = function (obj) {
    var uploadHtml = '<!-- 发布 -->' +
        '<section class="al-releasePageMask">' +
        '<figure class="al-releaseTitle">' +
        '<img src="/images/img50/pages/index/release_title.png" alt="">' +
        '</figure>' +
        '<section class="al-releaseBtn">' +
        '<a href="javascript:;" _href="//m.allinmd.cn/pages/case/case_upload.html"><figure class="al-releaseItem">' +
        '<img src="/images/img50/pages/index/release_case.png" alt="">' +
        '<figcaption>病例</figcaption>' +
        '</figure></a>' +
        '<figure class="al-releaseItem">' +
        '<a href="javascript:;" _href="//m.allinmd.cn/pages/topic/topic_upload.html"><img src="/images/img50/pages/index/release_topic.png" alt="">' +
        '<figcaption>话题</figcaption>' +
        '</figure></a>' +
        '<a href="javascript:;" _href="//m.allinmd.cn/pages/personal/personal_draft.html"><figure class="al-releaseItem">' +
        '<img src="/images/img50/pages/index/release_draft.png" alt="">' +
        '<figcaption>草稿</figcaption>' +
        '</figure></a>' +
        '</section>' +
        '<figure class="al-releaseCancel">' +
        '<img src="/images/img50/pages/index/release_cancel.png" alt="">' +
        '</figure>' +
        '</section>';
    if (!$(".al-releasePageMask").length > 0) {
        $("body").append(uploadHtml);
    }
    obj.on("click", function (e) {
        if (comm.browser.versions.ios) {
            $("body").css("overflow", "hidden");
            $(".al-releasePageMask").addClass('show');
            $(".al-mainInner").addClass('al-fullBlur');
            return false;
        } else {
            $("body").css("overflow", "hidden");
            $(".al-mainInner").addClass('al-fullBlurAndroid');
            $(".al-releasePageMask").addClass('al-fullBlurAndroid');
            return false;
        }

    });
    $(".al-releaseBtn a").on("click", function () {
        var href = $(this).attr("_href");
        user.privExecute({
            operateType: 'auth', //'login','auth','conference'
            callback: function () {
                window.location.href = href;
            }
        });
    });
    $(".al-releaseCancel").on("click", function (e) {
        if (comm.browser.versions.ios) {
            $("body").css("overflow", "auto");
            $(".al-releasePageMask").removeClass('show');
            $(".al-mainInner").removeClass('al-fullBlur');
        } else {
            $("body").css("overflow", "auto");
            $(".al-mainInner").removeClass('al-fullBlurAndroid');
            $(".al-releasePageMask").removeClass('al-fullBlurAndroid');
            return false;
        }
    });
};
/*页面底部主导航功能*/
comm.footerNav = function () {
    comm.uploadBtn($(".al-release"));
    if (TempCache.getItem("userId")) {
        getSpecialCount();
    }

    function getSpecialCount() {
        var data = {};
        var localTime = comm.date.local_time();
        if (TempCache.getItem("userId")) {
            if (!TempCache.getItem("readCollectionTime")) {
                TempCache.setItem("readCollectionTime", localTime); //第一次登陆后进入网站记下时间
            }
            if (!TempCache.getItem("readDraftTime")) {
                TempCache.setItem("readDraftTime", localTime); //第一次登陆后进入网站记下时间
            }
            if (!TempCache.getItem("readTrendTime")) {
                TempCache.setItem("readTrendTime", localTime); //第一次登陆后进入网站记下时间
            }
            if (!TempCache.getItem("readFansTime")) {
                TempCache.setItem("readFansTime", localTime); //第一次登陆后进入网站记下时间
            }
            if (!TempCache.getItem("readPreferTime")) {
                TempCache.setItem("readPreferTime", localTime); //第一次登陆后进入网站记下时间
            }
        }

        data.readCollectionTime = TempCache.getItem("readCollectionTime"); //上次进入我的收藏的时间
        data.readDraftTime = TempCache.getItem("readDraftTime"); //上次进入草稿的时间
        data.readTrendTime = TempCache.getItem("readTrendTime"); //上次进入朋友圈的时间
        data.readFansTime = TempCache.getItem("readFansTime"); //上次进入粉丝列表的时间
        data.readPreferTime = TempCache.getItem("readPreferTime"); //上次进入赞列表的时间
        var param = {};
        param.paramJson = $.toJSON(data);

        $.ajax({
            type: "post",
            url: M_CALL + "customer/message/getSpecialCount/",
            data: param,
            dataType: "json",
            success: function (rep) {
                if (rep && rep.responseObject.responseData) {
                    if (rep.responseObject.responseData.data_list && rep.responseObject.responseData.data_list.length > 0) {
                        var list = rep.responseObject.responseData.data_list[0];
                        specialCount = {
                            collectionNum: list.collectionNum, ////新的收藏数
                            draftNum: list.draftNum, //新的草稿数
                            fansNum: list.fansNum, //新的粉丝数
                            messageNum: list.messageNum, //新的消息数
                            preferNum: list.preferNum, //新的赞数
                            trendsNum: list.trendsNum //新的朋友圈数
                        };
                        if (list.trendsNum > 0) { //首页徽标
                            $(".al-footerBarItem").eq(0).append('<i class="icon-newTips"></i>');
                            $(".al-indexRecommendItem a").eq(0).append('<i class="icon-newTips"></i>');
                        }
                        /*if(list.trendsNum>0){//发现徽标
                         $(".al-footerBarItem").eq(1).append('<i class="al-newsNum"></i>');
                         }*/
                        if (list.messageNum > 0) { //消息徽标
                            $(".al-footerBarItem").eq(3).append('<i class="al-newsNum">' + (list.messageNum < 100 ? list.messageNum : '...') + '</i>');
                        }
                        if (list.draftNum > 0 || list.fansNum > 0 || list.preferNum > 0 || list.collectionNum > 0) { //我的徽标
                            $(".al-footerBarItem").eq(4).append('<i class="icon-newTips"></i>');
                        }

                        //个人中心
                        if (list.collectionNum) { //收藏
                            $(".ev-collectIcon").append('<i class="al-newsNum">' + (list.collectionNum < 100 ? list.collectionNum : '...') + '</i>');
                        }
                        if (list.draftNum > 0) { //草稿
                            $(".ev-draftIcon").append('<i class="al-newsNum">' + (list.draftNum < 100 ? list.draftNum : '...') + '</i>');
                        }
                        if (list.fansNum > 0) { //有新的粉丝加徽标
                            $(".al-personalSnsNum").eq(0).append('<i class="icon-newTips"></i>');
                        } else {
                            $(".al-personalSnsNum").eq(0).find("i").remove();
                        }
                        if (list.preferNum > 0) { //有新的关注人加徽标
                            $(".al-personalSnsNum").eq(2).append('<i class="icon-newTips"></i>');
                        } else {
                            $(".al-personalSnsNum").eq(2).find("i").remove();
                        }
                    }
                }
            },
            error: function () {
            }
        });
    }
};

/*
 * 未认证用户显示邮箱或手机号码
 * */
comm.getRegisterName = function (email, mobile) {
    var count = "";
    if (email) {
        count = email.substr(0, 2) + "****" + email.substring(email.lastIndexOf("@"));
    } else if (mobile) {
        count = mobile.substr(0, 3) + "****" + mobile.substring(mobile.length - 4);
    }
    return count;
}

/**
 * @desc 在页面底部显示提示下载
 * @param {String} page video|img|home|topic 页面类型
 */
comm.showAppDownload = function (page, zIndex) {
    comm.getAppLogin();
    if (localStorage.getItem("appLogin") == 1) { //在app上登陆过过不继续往下执行
        return;
    }
    var userAgentInfo = navigator.userAgent;
    var isIphone = false;
    if (userAgentInfo.indexOf("iPhone") > 0) {
        isIphone = true
    }

    var isWeixin = (userAgentInfo.indexOf("MicroMessenger") > 0);
    if (typeof zIndex === "undefined") {
        index = 5;
    }
    if (!page) {
        return;
    }

    //alert(isWeixin);
    var sesName = "DownAppClosed_"; // + page;
    var sess;
    var link;
    /*if (window.sessionStorage) {
     sess = sessionStorage.getItem(sesName);
     } else {
     sess = $.cookie(sesName);
     }*/

    sess = $.cookie(sesName);
    if (!sess) { // 未关闭过
        $("body").find(".mo-download-app").remove();
        if (isIphone) {
            if (isWeixin) {
                link = "http://a.app.qq.com/o/simple.jsp?pkgname=com.allin.social";
            } else {
                link = "https://itunes.apple.com/cn/app/wei-yi-for-iphone/id986266583";
            }
        } else {
            link = "http://a.app.qq.com/o/simple.jsp?pkgname=com.allin.social";
        }

        $("body").append('<div class="mo-download-app">' +
            '<div class="app_position_close"><img src="/images/img50/app/colse.png" /></div>' +
            '<div class="app_position_logo"><img src="/images/img50/app/allin_logo.png" /></div>' +
            '<div class="app_position_text"><img src="/images/img50/app/app_text_' + page + '.png" /></div>' +
            '<div class="app_position_down"><a href="' + link + '" data-ajax="false">' +
            '   <img src="/images/img50/app/downland.png" /></a></div>' +
            '</div>');
        $(".mo-download-app").css("zIndex", zIndex);
        $(".app_position_close").on("vclick", function () {
            $(".mo-download-app:last").remove();
            /* if (window.sessionStorage) {
             sessionStorage.setItem(sesName, 1);
             } else {
             $.cookie(sesName, 1);
             }*/

            $.cookie(sesName, 1, {expires: 1, path: "/"});
        });


        /* if (isWeixin) {
         $(".app_position_down").on("vclick", function () {
         $("body").append(' <div class="app_popup_wx"></div>' +
         '              <div class="app_popup_wx_img"><img src="/images/img50/app/popup_wx.png" /></div>');
         $(".app_popup_wx_img").off("vclick").on("vclick", function () {
         $(".app_popup_wx,.app_popup_wx_img").remove();
         return false;
         })
         });
         }*/

    }

};

//检验是否在app上登录过
comm.getAppLogin = function () {
    if (!localStorage.getItem("appLogin") && localStorage.getItem("userId")) { //在登陆时只会请求一次
        $.ajax({
            type: "post",
            url: "/mcall/log/customer/login/getIsLogin/",
            data: {"paramJson": $.toJSON({"dataFlag": 2, pageIndex: 1, pageSize: 10})},
            async: false,
            dataType: "json",
            success: function (rep) {
                if (rep.responseObject && rep.responseObject.responseMessage) {
                    localStorage.setItem("appLogin", rep.responseObject.responseMessage.isLogin); //0:未登录过,1:登陆过
                }
            },
            error: function () {
            }
        });
    }
};

/**
 * @desc 字符串插值 近似于Array.prototype.splice
 * @param {String} idx 插入位置
 *        {String} rem 插入位置删除字符数量
 *        {String} str 插入字符串
 */
String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

/**
 * 识别链接是否从APP中分享而来 若是则显示弹层 强制去引导打开APP   ，用户不能关闭
 * @return {boolean} 是否为分享链接
 * */
comm.recognizeAppShareLink = function (callAppOptions) {
    if (comm.getparaNew() && comm.getparaNew().share && (comm.getparaNew().share.toLowerCase() == "app")) {

        var $content = $(".content-page");
        if ($content.size() == 0) {
            $content = $("body");
        }
        $content.append("<div class='app_download_wx_jump_app'><div class='bg'></div><div class='center'><img src='/images/img50/callApp/share-app-popup.png' alt='' ></div></div>");

        var vp = document.querySelector('meta[name="viewport"]').getAttribute('content');

        var scale = vp.match(/initial\-scale=([\d\.]+)/) || vp.match(/maximum\-scale=([\d\.]+)/);
        if (scale != null && parseInt(scale[1]) == 1) {
            $(".app_download_wx_jump_app").addClass("viewport-small");
        }
        $("video,input,select,textarea,object").hide(); // 隐藏某些不受z-index控制的元素。    当前层 z-index 10050

        // 扩展之前页面上已存在的唤醒参数
        if (typeof callAppOptions != "undefined") { // 若存在定义
            callAppOptions = $.extend(callAppOptions, {el: ".app_download_wx_jump_app .center"});
        } else {
            var callAppOptions = {
                el: ".app_download_wx_jump_app .center",
                ios: "allinmdios://",
                ios9: "http://app.allinmd.cn/applinks.html",
                android: "allin://com.allin.social:75235"
            }
        }
        comm.bindCallApp(callAppOptions);

        $("body").css("overflow", "hidden").on("mousemove touchmove", function (e) {
            return false;
        });
        return true; // 分享的链接          7-26      http://cooperation.allinmd.cn/redmine/issues/14431
    } else {
        return false; // 非分享的链接         7-26
    }
};


/**
 * @example Common.bindCallApp({ios:"",android:"",element});
 * @desc 绑定唤醒APP的按钮
 * @param  options {Object,runAtOnce:true，android,ios,ios9,el} 表示地址。必须至少包含一个属性：ios,或 android,
 * 修改本函数，需连同allin/personal/app/scripts/services/mainService.js 此文件中同名函数一同修改。
 * */
//comm.bindCallApp = function (options) {
//    if (typeof options != "object") {
//        log();
//        return;
//    }
//
//    if (!options.hasOwnProperty("ios") && !options.hasOwnProperty("android")) {
//        log();
//        return;
//    }
//    var u = window.navigator.userAgent;
//    var isWeixin = /MicroMessenger/.test(u);
//    var isIOS9 = false;
//    var isIOS9_0_or_1 = false;
//
//    isIOS9 = Boolean(navigator.userAgent.match(/OS ([9]_[0-9]|[10|11][_\d])[_\d]* like Mac OS X/i)); // ios9.2之前的版本，
//    isIOS9_0_or_1 = Boolean(navigator.userAgent.match(/OS ([9]_[0-1])[_\d]* like Mac OS X/i)); // ios9.2之前的版本，
//
//    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
//
//    var isIphone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1;
//    var isWeibo = u.indexOf('weibo') > -1 || u.indexOf('Weibo') > -1;
//    var isQQBrowser = u.indexOf('QQ') > -1 && u.indexOf("NetType") > -1;//qq内置浏览器
//    var StartTime;
//    var elements;
//    var timeoutsArr = [];
//    var url = getUrl();
//
//    /**
//     *  获取对应版本的 schema 地址
//     * */
//    function getUrl() {
//        var url = "";
//        var u = navigator.userAgent;
//        if (isAndroid) {
//            if (options.android != undefined) {
//                url = options.android;
//            }
//        }
//
//        if (isIphone) {
//            if (options.ios != undefined) {
//                url = options.ios;
//            }
//        }
//        return url;
//    }
//
//    $(window).on("blur pagehide beforeunload", clearTimeouts);
//
//    function clearTimeouts() {
//        timeoutsArr.forEach(window.clearTimeout);
//        timeoutsArr = [];
//    }
//
//    // 针对ios9 如果跳至中转页面,返回后仍然没有打开.则尝试用schema再打开一次,若再打不开,再跳转至下载页
//    if (typeof comm.getparaNew().ios9 != "undefined") {
//        tryOpen(url);
//    }
//    /*尝试直接打开*/
//    if (typeof options.runAtOnce == "boolean" && options.runAtOnce) {
//        StartTime = +(new Date);
//
//        if (isIOS9) {
//            if (!(isWeixin || isWeibo)) {
//                locationOpen(options.ios9);
//            }
//
//        } else {
//            if (!(isWeixin || isWeibo)) {
//                tryOpen(url);
//            }
//
//        }
//
//    }
//
//    /* 需要绑定按钮 */
//    if (typeof options.el == "string") {
//
//        elements = options.el;
//        bindIng();
//    }
//
//    function bindIng() {
//
//        if (isAndroid) {
//            /*  alert(isAndroid + "isAndroid")
//             alert(isWeixin + "isWeixin")
//             alert(isWeibo + "isWeibo")
//             alert(isQQBrowser + "isQQBrowser")*/
//            if (isWeixin || isWeibo) {/* || isQQBrowser*/
//                showWeixinGuide("android");
//                return false;
//            } else {
//                bindOpen();
//            }
//        }
//
//        if (isIphone) {
//
//            if (isIOS9) { // ios9直接显示加链接
//                if (isWeixin || isWeibo) {
//                    showWeixinGuide("ios");
//                    return false;
//                } else {
//                    bindOpen(options.ios9);
//                }
//
//            } else { //ios9以下 的话;          */
//                if (isWeixin || isWeibo) {
//                    showWeixinGuide("ios");
//                    return false;
//                } else {
//                    bindOpen(options.ios);
//                }
//            }
//        }
//    }
//
//    function bindOpen(url) {
//
//        $(elements).off("click").on("click", {url: url || ""}, function (event) {
//            var url = event.data.url;
//            StartTime = +(new Date);
//            if (!url) {
//                var url = getUrl();
//            }
//            tryOpen(url);
//        });
//    }
//
//    /*尝试去打开*/
//    function tryOpen(url) {
//
//        if (!url) return;
//        if (isIOS9) {
//            locationOpen(url);
//        } else {
//            var u = url;
//            setTimeout(function () {
//                if (isIOS9_0_or_1) {
//                    locationOpen(u);
//                } else {
//                    iframeOpen(u);
//                }
//
//            }, 0);
//        }
//        checkIfFail();
//    }
//
//
//    function iframeOpen(url) {
//        var iframe = document.createElement("iframe");
//        iframe.src = url;
//        iframe.style.display = "none";
//        document.body.appendChild(iframe);
//        setTimeout(function () {
//            document.body.removeChild(iframe);
//            iframe = null
//        }, 0);
//    }
//
//
//    function locationOpen(url) {
//        window.location.href = url;
//    }
//
//    /**
//     *  在不支持统一链接的微信内的话显示引导界面
//     * */
//    function showWeixinGuide(type) {
//        var imgPath;
//        if (type == "android") {
//            imgPath = "/image/android.png";
//        } else {
//            imgPath = "/image/ios.png";
//        }
//
//        var $content = $(".content-page");
//        if ($content.length > 0) {
//            $content.append("<div class='app_download_wx'><img src='" + imgPath + "' /></div>");
//        } else {
//            $("body").append("<div class='app_download_wx'><img src='" + imgPath + "' /></div>");
//        }
//        $("body").css("overflow", "hidden").bind('touchmove', function (eve) {
//            eve.preventDefault();
//        });
//        $(".app_download_wx").on("click", function () {
//            $(this).remove();
//            $("body").css("overflow", "auto").unbind('touchmove');
//        });
//    }
//
//    /**
//     * 检测是否失败
//     * 失败后跳转到APP 下载
//     * */
//    function checkIfFail() {
//        if (isAndroid) {
//            timeoutsArr.push(window.setTimeout(function () {
//                if (+(new Date) - StartTime < 3100) {
//                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.net.yiding"; // app download url
//                }
//            }, 3e3));
//        } else {
//            timeoutsArr.push(window.setTimeout(function () {
//                if (Date.now() - StartTime < 3100) {
//                    if (isWeixin) {
//                        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.net.yiding"; // app download url
//                    } else {
//                        window.location.href = "https://itunes.apple.com/cn/app/yi-ding/id1127209482?mt=8"; // app download url
//                    }
//                }
//            }, 3e3));
//        }
//
//    }
//
//    function log() {
//        // console.log("请传入要跳转的APP地址的参数对象，如：{ios:\"allinmdios://meettingBroadcast/meetInfo\",android:\"'allin://com.allin.social:75235?data=mydata\"}");
//    }
//};

/***
 * 生成导航
 * @param index {number}选中的索引 -1 不选  0-首页,1-病例,2-视频,3-专家,4-会议,5-文库,6-话题
 * @param isCallApp {Object} 是否显示打开APP  ID为 callAppBtn
 * @param isShowSearch {boolean}是否显示 搜索条
 */
comm.bindNav = function (index, isCallApp, isShowSearch) {
    var $header;
    var href = "";
    /* 初始化DOM */
    function initHeaderDom() {
        $("#selector_top").remove();
        var openAppDom = "";
        if (isCallApp) {
            openAppDom = ' <div class="app_iphone" id="callAppBtn">' +
                '                <a href="javascript:void(0)" data-ajax="false">' +
                '                    <div class="app_iphone_text">打开APP</div>' +
                '                </a>' +
                '           </div>';
        }

        $header = $("header");
        if (!$header.size()) {
            $(".content-page").prepend('<header class="al-indexHeader"></header>');
            $header = $("header");
        }
        switch (index) {
            case 1:
                title = "病例";
                href = TempCache.getItem("prevCaseHref");
                break;
            case 2:
                title = "视频";
                break;
            case 5:
                title = "文库";
                break;
            case 6:
                title = "话题";
                href = TempCache.getItem("prevTopicHref");
                break;
            default:
                title = "";
                break;
        }
        $header.html(
            openAppDom + '<figure class="al-indexHeaderItem">' +
            '<a href="javascript:;" data-ajax="false">' +
            '<img src="/images/img50/pages/personal/arrow_back.png" alt="">' +
            '</a>' +
            '</figure>' +
            '<figure class="al-indexHeaderItem">' +
            '<h1>' + title + '</h1>' +
            '</figure>' +
            '<figure class="al-indexHeaderItem">' +
            '<a href="javascript:void(0)">' +
            '</a>' +
            '</figure>'
        );

    }


    /**
     * 保证传入了正确的参数
     * @param key
     */
    function checkParams(key) {
        if (!callAppOptions.hasOwnProperty(key)) {
            throw "打开APP的参数没有传入" + key;
        }
    }


    function init() {
        initHeaderDom();
        $(".al-indexHeaderItem a").on("click", function () {
            if (href) {
                location.href = href;
                if (index == 1) {
                    TempCache.removeItem("prevCaseHref");
                }
                if (index == 6) {
                    TempCache.removeItem("prevTopicHref");
                }
            } else if (document.referrer.lastIndexOf("/passport/") > -1 || document.referrer.indexOf("seminar") > -1 || !document.referrer) {
                window.location.href = "//m.allinmd.cn";
            } else {
                history.back();
            }
            return false;
        })
    }

    init();
};

/***
 * app唤醒提示
 * @param callAppOptions
 * @param pattern {string}
 *        'btn' 按钮提示
 *        'figure' 横幅提示
 *        'confirm' 弹框提示
 */

comm.appWakeUp = function (pattern, callAppOptions) {
    var t = this;
    this.callAppOptions = callAppOptions;
    var template = '    <section class="al-appWakeUpFigure">' +
        '        <figure class="al-appWakeUpImg">' +
        '            <img src="/images/img50/pages/index/logo.png" alt="">' +
        '            <figcaption>' +
        '                <h2>唯医APP</h2>' +
        '                <p>打开唯医APP浏览医学资源，更省流量</p>' +
        '            </figcaption>' +
        '        </figure>' +
        '        <button class="al-appWakeUpFigureBtn ev-openAppBtn">' +
        '            打开APP' +
        '        </button>' +
        '    </section>';
    var bTemplate = '<button class="al-appWakeUpBtn icon-appWakeUp ev-openAppBtn"><span>打开APP</span></button>';
    if (pattern === 'figure') {
        $('body').prepend(template);
        appWakeUpCallback(".ev-openAppBtn");
    } else if (pattern === 'btn') {
        $(".al-indexHeaderItem").filter(':last').append(bTemplate);
        appWakeUpCallback(".ev-openAppBtn");
    } else if (pattern === 'confirm') {

        comm.confirmBox({
            title: '在"唯医应用"中打开链接吗？',
            cancel: '取消',
            ensure: '打开',
            callBack: function () {
                appWakeUpCallback(".al-confirmModalEnsureBtn");
            },
            cancelCallback: function () {
                return false;
            }
        });

        $(".al-confirmModal").css({
            width: "30rem",
            marginLeft: "-15rem"
        });

        $(".al-confirmModalContent").css({
            fontSize: "2em"
        })
        $(".al-confirmModalCancelBtn").css({
            border: "none",
            borderRight: "1px solid #e4e9ed"
        })
    }

    function appWakeUpCallback(el) {
        if (typeof t.callAppOptions != "undefined") { // 若存在定义
            var callAppOptions = $.extend(t.callAppOptions, {el: el});
        } else {
            var callAppOptions = {
                el: el,
                ios: "allinmdios://",
                ios9: "http://app.allinmd.cn/applinks.html",
                android: "allin://com.allin.social:75235"
            }
        }
        comm.bindCallApp(callAppOptions);
    }
}


/***
 * app认证失败提示
 *
 */

comm.authFail = function () {
    var template = '<section class="al-authFailBox">' +
        '<header class="al-authFailTitle">' +
        '<h2>认证拒绝</h2>' +
        '</header>' +
        '<article class="al-authFailText">' +
        '<p>很抱歉！您提交的认证资料不符合要求，为了保证您的权益，请重新认证！</p>' +
        '</article>' +
        '<section class="al-authFailBtn">' +
        '<button class="btn-primary-lg" id="now_goAuth">' +
        '现在认证' +
        '</button>' +
        '<span class="al-authGiveUp">暂不认证</span>' +
        '</section>' +
        '</section>';
    if ($('.al-authFailBox').size() === 0) {
        $("body").append(template);

        setTimeout(function () {

            if (comm.browser.versions.ios) {
                $('.al-authFailBox').addClass('show');
                $(".al-mainInner").addClass('al-fullBlur');
                if ($(".content-page").size() !== 0) {
                    $(".content-page").addClass('al-fullBlur');
                }
            } else {
                $('.al-authFailBox').addClass('al-fullBlurAndroid');
                $(".al-mainInner").addClass('al-fullBlurAndroid');
                if ($(".content-page").size() !== 0) {
                    $(".content-page").addClass('al-fullBlurAndroid');
                }
            }
            if ($(".al-releasePageMask").size() !== 0) {
                $(".al-releasePageMask").removeClass('show');
            }
        }, 200)
    } else {
        if (comm.browser.versions.ios) {
            $('.al-authFailBox').addClass('show');
            $(".al-mainInner").addClass('al-fullBlur');
            if ($(".content-page").size() !== 0) {
                $(".content-page").addClass('al-fullBlur');
            }
        } else {
            $('.al-authFailBox').addClass('al-fullBlurAndroid');
            $(".al-mainInner").addClass('al-fullBlurAndroid');
            if ($(".content-page").size() !== 0) {
                $(".content-page").addClass('al-fullBlurAndroid');
            }
        }
        if ($(".al-releasePageMask").size() !== 0) {
            $(".al-releasePageMask").removeClass('al-fullBlurAndroid');
        }
    }

}


// 侧边栏
comm.hoverSidebarChange = function () {
    //左侧边栏点击效果
    $(".Ev-sidebarHelp").css("marginTop","500px");
    $("#al-mainSidebarList li").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
    $(".al-collapseLogo").css("display", "none"); //宽logo的隐藏
    $(".al-collapseItem").css("display", "none");
    $(".al-mainSidebarItem figcaption").css("display", "block");
    $("#al-mainSidebar").on("mouseenter", function () {
        $("#al-mainSidebarWide").css("width", "152px");
        $(".al-mainSidebarItem figcaption").css("display", "none");
        $(".al-collapseLogo").css("display", "block");
        $(".al-collapseItem").css("display", "inline-block");
        $(".al-mainLogo").css("display", "none");
        $(".al-mainSidebarItem").addClass("leftnavHover");
        $(".al-mainSidebarItem").removeClass("leftnavNarmal");
    });
    $("#al-mainSidebar").on("mouseleave", function () {
        $("#al-mainSidebarWide").css("width", "80px");
        $(".al-mainSidebarItem").addClass("leftnavNarmal");
        $(".al-mainSidebarItem").removeClass("leftnavHover");
        $(".al-mainSidebarItem figcaption").css("display", "block");
        $(".al-collapseLogo").css("display", "none");
        $(".al-collapseItem").css("display", "none");
        $(".al-mainLogo").css("display", "block");
    });
}

// 判断PC/Mobile

comm.isPC = function () {
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
comm.isIe8=function() {
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    var trim_Version = version[1].replace(/[ ]/g, "");

    var v = parseInt(trim_Version.substring(4));
    if (browser === "Microsoft Internet Explorer" && v < 10) {
        return true;
    } else {
        return false;
    }
}
// PC端右下侧固定功能块
comm.changeUrl = function(str){
    var newStr = "";
    var reg = "";
    if(comm.isPC()){
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
/*新手引导页功能
* 习题错题传0
* 收藏传1
* 课程收藏传2
* */
comm.guideUser = function(type){
    $(".guideModel").remove();
    var guideHtml = "";
    var guideOnOff = false;
    switch (type){
        case 0://错题
            guideOnOff = localStorage.getItem("testWrong")?false:true;
            guideHtml = "<section class=\"yd-confirmModalMask show  guideModel\" style=\"background-color:rgba(0,0,0,.6)\"><div class=\"pcErrorQuestions\"><div class=\"guideCont\"><img src=\"/image/guide/errorTi.png\"><\/div><div class=\"guideBut\"><img src=\"/image/guide/button.png\"><\/div><\/div><\/section>\n";
            break;
        case 1://习题收藏
            guideOnOff = localStorage.getItem("collectQue")?false:true;
            guideHtml = "<section class=\"yd-confirmModalMask show  guideModel\" style=\"background-color:rgba(0,0,0,.6)\"><div class=\"pcQuestionsCollect\"><div class=\"guideCont\"><img src=\"/image/guide/questionsCollect.png\"><\/div><div class=\"guideBut\"><img src=\"/image/guide/button.png\"><\/div><\/div><\/section>\n";
            break;
        case 2://课程收藏
            guideOnOff = localStorage.getItem("collectCourse")?false:true;
            guideHtml = "<section class=\"yd-confirmModalMask show  guideModel\" style=\"background-color:rgba(0,0,0,.6)\"><div class=\"pcCourseCollect\"><div class=\"guideCont\"><img src=\"/image/guide/courseCollect.png\"><\/div><div class=\"guideBut\"><img src=\"/image/guide/button.png\"><\/div><\/div><\/section>\n";
            break;
        case 3://课程错题本
            break;
        default:
            break;
    }
    if(guideOnOff){
        switch (type){
            case 0:
                localStorage.setItem("testWrong","true")
                break;
            case 1:
                localStorage.setItem("collectQue","true")
                break;
            case 2:
                localStorage.setItem("collectCourse","true")
                break;
            default:
                break;
        }
        $("body").append(guideHtml);
        $(".guideBut").unbind("click").bind("click",function(){
            $(".guideModel").remove();
        })
    }

};
comm.pcSideModule = function (opts) {
    $(".yd-mainInner").removeClass("none");
    if ($(".al-header").size() === 0) {
        $(".yd-mainInner").prepend('<header class="al-header al-indexHeader pcModule" style="margin-left: 0px;">' +
            '            <section class="al-headerContainer">' +
            '                <ul class="al-headerTopNav" id="al-headerTopNav" data-alcode-mod="11">' +
            (function (sData) {
                var items = "";
                $(sData).each(function (index, el) {
                    items += '<li class="' + (el.active ? "active" : "") + '"><a href="' + el.href + '">' + el.item + '</a></li>';
                });
                return items;
            })(opts) +
            '                </ul>' +
            '                <div class="al-se-lo-re">' +
            '                    <div class="al-search">' +
            '                        <div  class="icon-search" data-url="//www.yi-ding.net.cn/pages/search/search.html">' +
            '                        </div>' +
            '                    </div>' +
            '                    <div class="al-lo-re notLogin" id="notLogin">' +
            '                        <div class="al-login">登录</div>' +
            '                        <div class="al-register">注册</div>' +
            '                    </div>' +
            '                    <div class="al-lo-re isLogin" id="isLogin">' +
            '                        <div class="user-header"><img src="" style="width:40px;height:40px;"></div>' +
            '                        <div class="user-name"><a href="//www.yi-ding.net.cn/pages/personal/personal_index.html">黄志强</a></div>' +
            '                    </div>' +
            '                </div>' +
            '            </section>' +
            '        </header>' +
            '<section id="al-mainSidebar" class="pcModule" style="width: auto; height: 1000px;position: fixed; left: 0;top: 0; z-index: 4;">' +
            '            <!--左侧导航栏-->' +
            '            <aside class="al-mainSidebar al-mainSidebarCollapse pcModule" style="width: 80px;" id="al-mainSidebarWide">' +
            '                <header class="al-collapseLogo" style="display: none;">' +
            '                    <img src="/image/index/bigLogo.png" alt="">' +
            '                </header>' +
            '                <header class="al-mainLogo" style="display: block;">' +
            '                    <img src="/image/index/logo.png" alt="" style="box-shadow: rgb(51,51,51) 0px 0px 2px;">' +
            '                </header>' +
            '                <section class="al-mainSidebarList" id="al-mainSidebarList" data-alcode-mod="6">' +
            '                    <ul>' +
            '                        <li class="al-mainSidebarItem active Ev-sidebarIndex">' +
            '                            <a href="//www.yi-ding.net.cn">' +
            '                                <i class="icon-home"></i>' +
            '                                <figcaption style="display: block;">首页</figcaption>' +
            '                                <article class="al-collapseItem" style="display: none;">' +
            '                                    <p class="al-collapseItemText">' +
            '                                    </p>' +
            '                                    <h4>首页</h4>' +
            '                                    <p>HOME</p>' +
            '                                    <p></p>' +
            '                                </article>' +
            '                            </a>' +
            '                        </li>' +
            '                        <li class="al-mainSidebarItem Ev-sidebarMessage">' +
            '                            <a href="/pages/message/message_discuss.html">' +
            '                                <i class="icon-message"></i>' +
            '                                <figcaption style="display: block;">消息</figcaption>' +
            '                                <article class="al-collapseItem" style="display: none;">' +
            '                                    <p class="al-collapseItemText">' +
            '                                    </p>' +
            '                                    <h4>消息</h4>' +
            '                                    <p>MESSAGE</p>' +
            '                                    <p></p>' +
            '                                </article>' +
            '                            </a>' +
            '                        </li>' +
            '                        <li class="al-mainSidebarItem Ev-sidebarHelp">' +
            '                            <a href="/pages/help_feedback/help_feedback.html">' +
            '                                <i class="icon-feedback"></i>' +
            '                                <figcaption style="display: block;">帮助与反馈</figcaption>' +
            '                                <article class="al-collapseItem" style="display: none;">' +
            '                                    <p class="al-collapseItemText">' +
            '                                    </p>' +
            '                                    <h4>帮助与反馈</h4>' +
            '                                    <p>Q & A</p>' +
            '                                    <p></p>' +
            '                                </article>' +
            '                            </a>' +
            '                        </li>' +
            '                    </ul>' +
            '                </section>' +
            '            </aside>' +
            '        </section>');
        $(".icon-search").unbind("click").bind("click",function(){
            function pageName()
            {
                var a = location.href;
                var b = a.split("/");
                var c = b.slice(b.length-1, b.length).toString(String).split(".");
                return c.slice(0, 1);
            }
            /*if(window.location.href.indexOf("http://www.yi-ding.net.cn/series")>-1){
                commLog.creatEvent({"id":32,"url":location.href,"keyword":"系列课程点击搜索",});
            }*/
            /*if(window.location.href.indexOf("http://www.yi-ding.net.cn/course")>-1){
                commLog.creatEvent({"id":33,"url":location.href,"keyword":"课程终端点击搜索",});
            }*/
            switch (pageName()[0]){
                case "question":
                    commLog.creatEvent({"id":34,"url":location.href,"keyword":"习题页搜索","browseType":"3"});
                    break;
                case "message_discuss":
                    commLog.creatEvent({"id":35,"url":location.href,"keyword":"消息讨论点击搜索","browseType":"29"});
                    break;
                case "message_like":
                    commLog.creatEvent({"id":36,"url":location.href,"keyword":"消息赞了点击搜索","browseType":"30"});
                    break;
                case "message_index":
                    commLog.creatEvent({"id":37,"url":location.href,"keyword":"系统消息点击搜索","browseType":"27"});
                    break;
                case "exercise_order_begin":
                    commLog.creatEvent({"id":49,"url":location.href,"keyword":"顺序练习首页点击搜索","browseType":"32"});
                    break;
                case "exercise_order":
                    commLog.creatEvent({"id":50,"url":location.href,"keyword":"顺序练习答题点击搜索","browseType":"34"});
                    break;
                case "exercise_order_result":
                    commLog.creatEvent({"id":34,"url":location.href,"keyword":"习题-顺序练习答题结果页","browseType":"35"});
                    break;
                case "exercise_suit_wrong":
                    commLog.creatEvent({"id":34,"url":location.href,"keyword":"习题-习题资源页","browseType":"34"});
                    break;
                case "exercise_suit_exhibition":
                    commLog.creatEvent({"id":34,"url":location.href,"keyword":"习题-习题资源页","browseType":"34"});
                    break;
                case "exercise_project_begin":
                    commLog.creatEvent({"id":47,"url":location.href,"keyword":"专项练习首页点击搜索","browseType":"31"});
                    break;
                case "exercise_project":
                    commLog.creatEvent({"id":48,"url":location.href,"keyword":"专项练习答题点击搜索","browseType":"34:"});
                    break;
                case "exercise_project_result":
                    commLog.creatEvent({"id":34,"url":location.href,"keyword":"习题-专项练习答题结果页","browseType":"35"});
                    break;
                case "personal_index":
                    commLog.creatEvent({"id":39,"url":window.location.href,"keyword":"个人中心点击搜索","browseType":"42"});
                    break;
                case "personal_wrongList":
                    commLog.creatEvent({"id":40,"url":window.location.href,"keyword":"错题本点击搜索","browseType":"33"});
                    break;
                case "personal_myDiscuss":
                    commLog.creatEvent({"id":41,"url":window.location.href,"keyword":"我的讨论点击搜索","browseType":"43"});
                    break;
                case "personal_collection":
                    commLog.creatEvent({"id":42,"url":window.location.href,"keyword":"收藏点击搜索","browseType":"47"});
                    break;
                case "personal_learnHistory":
                    commLog.creatEvent({"id":43,"url":window.location.href,"keyword":"学习历史点击搜索","browseType":"49"});
                    break;
                case "personal_setting":
                    commLog.creatEvent({"id":44,"url":window.location.href,"keyword":"设置点击搜索","browseType":"52"});
                    break;
                case "personal_introConfig":
                    commLog.creatEvent({"id":45,"url":window.location.href,"keyword":"编辑资料点击搜索","browseType":"50"});
                    break;
                case "personal_qualification":
                    commLog.creatEvent({"id":46,"url":window.location.href,"keyword":"认证资料点击搜索","browseType":"51"});
                    break;
                case "":
                    commLog.creatEvent({"id":31,"url":window.location.href,"keyword":"首页点击搜索","browseType":"24"});
                    break;



            }
            window.location.href = $(this).attr("data-url");
        })
    } else {
        $("#al-headerTopNav li").each(function (index, el) {
            $(el).removeClass();
            if(opts[index]){
                $(el).addClass(opts[index].active ? "active" : "").find('a').attr("href", opts[index].href).text(opts[index].item);
            }

        });
    }

    if ($(".al-rightNav").size() === 0) {
        $("body").append('<aside class="pcModule al-rightNav" id="al-rightNav">' +
            '           <div class="toTop rightNav" id="toTop">' +
            '               <i class="icon-toTop" style="display: block;"></i>' +
            '               <p style="display: none;">回到<br>顶部</p>' +
            '           </div>' +
            '           <div class="code rightNav" id="code">' +
            '               <i class="icon-code" style="display: block;"></i>' +
            '               <p style="display: none;">二维码</p>' +
            '               <p class="codePic" style="display: none;">' +
            '                   <img src="/image/1486539881.png">'+
            '               </p>' +
            '           </div>' +
            '           <div class="suggestion rightNav" id="suggestion">' +
            '               <i class="icon-suggestion"></i>' +
            '               <p style="display: none;">意见<br>反馈</p>' +
            '           </div>' +
            '           <section class="yd-suggestionBox">' +
            '                <button class="yd-suggestionBoxClose">X</button>' +
            '               <article class="yd-suggestionText">' +
            '                   <textarea name="" id="Ev-suggestionText" cols="30" rows="10" placeholder="请输入反馈，我们将不断为您改进"></textarea>' +
            '                    <span>500</span>' +
            '               </article>' +
            /*            '               <article class="yd-suggestionPhone">' +
             '                   <input type="text" placeholder="请输入手机/邮箱">' +
             '               </article>' +*/
            '               <figure class="yd-suggestionBtn">' +
            '                   <button>提交</button>' +
            '               </figure>' +
            '           </section>' +
            '        </aside>'
        )
        ;


        $("#toTop").on('click', function () {
            $('html,body').animate({scrollTop: 0}, 500); //滚动返回顶部
            return false;
        })
        //右侧鼠标划上显示文字
        $("#al-rightNav").on("mouseenter", "div", function () {
            $(this).children("i").css("display", "none");
            $(this).children("p").css("display", "block");
        })
        //鼠标离开显示图案
        $("#al-rightNav").on("mouseleave", "div", function () {
            $(this).children("i").css("display", "block");
            $(this).children("p").css("display", "none");
        });

        //右侧导航回到顶部效果
        if($("#course-main").length==0){
            $(window).on("scroll", function () {
                var topH = $("#al-headerTopNav").innerHeight();
                var scrollH = $(window).scrollTop();
                if (scrollH >= topH) {
                    $("#toTop").fadeIn(500); //淡入淡出效果
                } else {
                    $("#toTop").fadeOut(500);
                }
            });
        }/*else{
            console.log("scroll")
            $("body").on("scroll", function (e) {
                e.stopPropagation();
                console.log("进来")
                var topH = $("#al-headerTopNav").innerHeight();
                var scrollH = $(window).scrollTop();
                if (scrollH >= topH) {
                    $("#toTop").fadeIn(500); //淡入淡出效果
                } else {
                    $("#toTop").fadeOut(500);
                }
            });
        }*/

    }
}


// 底部选择弹框
comm.bottomSelector = function () {
    if ($(".yd-bottomSelectorBox").size() === 0) {
        $("body").append('<footer class="yd-bottomSelectorBox">' +
            '        <footer class="yd-bottomSelector">' +
            '            <section class="yd-bottomSelectorItemBox">' +
            '                <section class="yd-bottomSelectorItem">保存</section>' +
            '                <section class="yd-bottomSelectorItem">放弃</section>' +
            '            </section>' +
            '            <section class="yd-bottomSelectorItemBox cancel">' +
            '                <section class="yd-bottomSelectorItem">取消</section>' +
            '            </section>' +
            '        </footer>' +
            '    </footer>');
        setTimeout(function () {
            $(".yd-bottomSelectorBox").addClass('on');
        })
    } else {
        $(".yd-bottomSelectorBox").addClass('on');
    }
}

// 公共页脚
comm.pcFooterModule = function () {
    if ($(".yd-mainFooter").size() === 0) {
        $(".yd-mainInner").append('<footer class="yd-mainFooter pcModule">' +
            '        <section class="yd-mainFooterInner" data-alcode-mod="12">' +
            '            <section class="yd-mainFooterContent">' +
            '                <section class="yd-mainFooterLinks">' +
            '                    <a href="/pages/help/statement.html" class="yd-mainFooterLinkItem" style="padding-left: 0;">隐私声明</a>' +
            '                    <a href="/pages/help/service.html" class="yd-mainFooterLinkItem">服务条款</a>' +
            '                    <a href="/pages/help/about_us.html" class="yd-mainFooterLinkItem">关于我们</a>' +
            '                    <a href="/pages/help/contact.html" class="yd-mainFooterLinkItem" style="padding-right: 0;border-right: none;">联系我们</a>' +
            '                </section>' +
            '                <article class="yd-mainFooterMsg">' +
            '                    <figure class="yd-mainFooterMsgImg marginR">' +
            '                        <a id="___szfw_logo___" href="https://credit.szfw.org/CX20160321018165560180.html" target="_blank">' +
            '                            <img src="//img10.allinmd.cn/v3/common/icon/site_1.png" alt="">' +
            '                        </a>' +
            '                    </figure>' +
            '                    <figure class="yd-mainFooterMsgImg">' +
            '                        <a href="http://www.anquan.org/authenticate/cert/?site=www.allinmd.cn&amp;at=business">' +
            '                            <img src="//img10.allinmd.cn/v3/common/icon/site_2.png" alt="">' +
            '                        </a>' +
            '                    </figure>' +
            '                </article>' +
            '                <article class="yd-mainFooterRecordMsg">' +
            '                    <p>京ICP备14007118号-3 京公网安备 11010502031779号京卫计网审[2014] 第0378号 </p>' +
            '                    <p>Copyright@2017 Yi-ding.net.cn All Rights Reserved.版权所有@北京欧应科技有限公司</p>' +
            '                    <p>地址：北京市朝阳区光华路9号光华路SOHO2期D座802    <span>电话：010-59007121</span></p>' +
            '                </article>' +
            '            </section>' +
            //'            <figure class="yd-mainFooterErWeiCode">' +
            //'                <img src="//img10.allinmd.cn/v3/common/icon/footer_erweiCode.png" alt="">' +
            //'            </figure>' +
            '        </section>' +
            '    </footer>');
    } else {
        return;
    }
}


// 手动添加蒙层
comm.maskBackground = {
    show: function (bgc) {
        console.log("进入蒙层")
        if ($(".yd-maskBackground").size() === 0) {
            $(".yd-mainInner").append("<section class='yd-maskBackground' style='background-color:" + (bgc ? bgc : "rgba(0,0,0,0)") + "; '></section>");
        } else {
            $(".yd-maskBackground").show();
        }
    },

    hide: function () {
        $(".yd-maskBackground").hide();
    }
};

// IE8兼容forEach
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(callback, thisArg) {

        var T, k;

        if (this == null) {
            throw new TypeError("this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;

        while (k < len) {

            var kValue;
            if (k in O) {

                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}
//登录注册
var loginAbout = {};
loginAbout.init = function(options){
    $.ajax({
        url:"//www.yi-ding.net.cn/call/yiding/web/user/getWebUser/",    //请求的url地址
        dataType: "json",
        async: false,
        data: {paramJson: $.toJSON({customerId:localStorage.getItem("userId")})},
        type: "POST",
        beforeSend: function() {
            comm.loading.show();
        },
        success: function(req) {
            comm.loading.hide();
            if(req.responseObject.responseStatus){//表示已经登录
                localStorage.setItem("userId",req.responseObject.responseMessage.userId);
                localStorage.setItem("userState","true");
                //微信或唯医登录成功后调用登录接口
                if(localStorage.getItem("allinUrl")||localStorage.getItem("weiUrl")){
                    localStorage.removeItem("allinUrl");
                    localStorage.removeItem("weiUrl");
                }
                loginAbout.changeHead();//调用方法进行更换头像
                $(window).unload(function(){
                    localStorage.setItem("unActive","0");
                    localStorage.removeItem("allLogin");
                });
                window.onbeforeunload = function () {
                    localStorage.setItem("unActive","0");
                    localStorage.removeItem("allLogin");
                };
                //获取本地存储信息表示被动登录，并且认证信息不完整时
                //if(localStorage.getItem("unActive")==1&&(req.responseObject.responseMessage.status!=1||req.responseObject.responseMessage.status!=2)){//被动登录并且没有认证通过
                //    authentication.init({
                //        success: function () {
                //            authentication.exit();
                //            location.reload();//刷新页面
                //            localStorage.setItem("unActive",0);
                //        }
                //    })
                //}
                //如果是唯医联合登录，登录成功显示弹层。
                if(localStorage.getItem("allLogin")){
                    comm.alertBox({
                        "title":"成功使用唯医登录<br/>之后您可以使用手机快捷登录医鼎",
                        "ensure":"好的",
                        "ensureCallback":function(){
                            localStorage.removeItem("allLogin");
                        }
                    });
                }
            }else{
                $(".notLogin").show();
                $(".isLogin").hide();
                loginAbout.login.init({
                    "ele":$(".al-login"),
                    before:function(){
                        if(options){
                            options.failed&&options.failed();
                        }
                    },"success":function(){
                        loginAbout.changeHead();
                        loginAbout.login.exit();
                        localStorage.setItem("userState","true");
                        if(options){
                            options.loginPass&&options.loginPass();
                        }
                    }
                });
                loginAbout.register.init({
                    "ele": $(".al-register"),
                    before:function(){
                        if(options){
                            options.failed&&options.failed();
                        }
                    },
                    success: function () {
                        loginAbout.register.exit();
                        loginAbout.changeHead();
                        localStorage.setItem("userState","true");
                        if(options){
                            options.registerPass&&options.registerPass()
                        };
                    }
                });
            }
        },
        complete: function() {

        },
        error: function() {
        }
    });
}
//更改头像
loginAbout.changeHead = function(){
    $.ajax({
        url:"//www.yi-ding.net.cn/call/yiding/web/user/getMapById/",
        dataType: "json",
        async: false,
        data: {paramJson: $.toJSON({customerId:localStorage.getItem("userId"),visitSiteId:13})},
        type: "POST",
        beforeSend: function() {
            comm.loading.show();
        },
        success: function(req) {
            if(req.responseObject.responseStatus){
                if(req.responseObject.responseData){
                    comm.loading.hide();
                    if(req.responseObject.responseData.data_list){
                        var data = req.responseObject.responseData.data_list[0];
                        if(data.customerLogoUrl.length>0){
                            $(".user-header").find('img').attr('src',data.customerLogoUrl);
                        }
                        if(data.customerName.length>0){
                            $(".user-name").find("a").html(data.customerName);
                        }
                        $(".notLogin").hide();
                        $(".isLogin").css({"display":"inline-block","cursor":"pointer"});
                        $(".user-header").on('click',function(){
                            window.location.href="//www.yi-ding.net.cn/pages/personal/personal_index.html";
                        })
                    }
                }
            }

        },
    });
}
//动态添加注册界面实现功能
loginAbout.register = {
    init:function(obj){
        var that=this;
        obj.ele.on('click',function(){
            commLog.creatEvent({"id":148,"url":window.location.href,"keyword":"头部点击的注册按钮","browseType":"","browseTypeSourceUrl":window.location.href});
            obj.before&&obj.before();
            that.show(obj);
        });
    },
    show:function(obj){
        commLog.createBrowse(9, "登录注册-注册页");
        $("body").addClass("yd_overflow");
        comm.maskBackground.show("rgba(0,0,0,.6)");
        var registerHtml = "<section class=\"loginMain\">"+
            "    <section class=\"loginCont\">"+
            "        <section class=\"authorityCommon\">"+
            "        <!--关闭-->"+
            "        <section class=\"experiencePo reg-experiencePo\"" +
            "" +
            "" +
            "><img src=\"/image/authority/login/login_close.png\"> </section>"+
            "        <!--错误提示-->"+
            "        <section class=\"errorTip\"><i></i> <span>密码错误</span></section>"+
            "        <!--注册-->"+
            "        <section class=\"loginWidth ev-register\">"+
            "<section class=\"loginFixed\">"+
            "                    <div class=\"authorityTitle\">创建唯医通行证</div>"+
            "                    <section class=\"titleInput clear marginTop\">"+
            "                        <div class=\"titleText\">账号</div>"+
            "                        <input class=\"titleType ev-regNum\" placeholder=\"请输入手机号或邮箱\"/>"+
            "                    </section>"+
            "                    <section class=\"titleInput clear marginTop\">"+
            "                        <div class=\"titleText\">密码</div>"+
            "                        <input class=\"titleType ev-regPas\" type=\"password\"  placeholder=\"请输入6位以上密码\"/>"+
            "                    </section>"+
            "                    <section class=\"titleInput clear marginTop ev-fidValue\" style=\"display:none;\">"+
            "                        <div class=\"titleText\">验证码</div>"+
            "                        <input class=\"titleType ev-regCode\" placeholder=\"请输入验证码\"/>"+
            "                        <div class=\"validate ev-regvalidate\"><!--获取验证码--><!--60s后重新获取-->获取验证码</div>"+
            "                    </section>"+
            "                    <section class=\"service\"><i class=\"active\"></i>同意<a href=\"/pages/help/service.html\" target=\"_blank\">医鼎服务条款</a>"+
            "                    </section>"+
            "                    <div class=\"loginBtn ev-regSave\">立即创建</div>"+
            "                    <div class=\"returnText\" style=\"cursor: pointer;color: #546690\">去登录</div>"+
            "                </section>"+
            "       <i class=\"authorityBg\"></i>"+
            "        <!--注册 END-->"+
            "    </section>"+
            "        </section>"+
            "</section>";
        console.log($(".yd-maskBackground"))
        $(".yd-maskBackground").html(registerHtml);
        $(".returnText").unbind("click").bind("click",function(){
            commLog.creatEvent({"id":162,"url":"","keyword":"PC注册去登录","browseType":"9","browseTypeSourceUrl":window.location.href});
            loginAbout.register.exit();
            loginAbout.login.show(obj);
        });
        $(".reg-experiencePo").unbind("click").bind("click", function () {
            commLog.creatEvent({"id":14,"url":"","keyword":"注册关闭","browseType":"","browseTypeSourceUrl":window.location.href});
            comm.confirmBox({
                "title":"确定放弃注册吗?",
                "content":"放弃注册,将无法拥有以下权限:浏览完整系列课程,参与课程问答,",
                "cancel":"放弃",
                "ensure":"继续注册",
                "ensureCallback":function(){
                    //console.log("继续注册");
                },
                "cancelCallback":function(){
                    //window.location.href="//www.yi-ding.net.cn/pages/index/index.html";//跳转首页
                    loginAbout.login.exit();
                }
            });
        });
        console.log(registerHtml)
        registerFn.init(obj);
    },
    exit:function(exitFn){
        $("body").removeClass("yd_overflow");
        if(loginAbout.login.status().state){

        }else{
            $(".notLogin").css("display","inline-block");
            $(".isLogin").css("display","none");
        }
        $(".yd-maskBackground").remove();
        exitFn&&exitFn();
    }
};
//动态添加登录界面实现功能
loginAbout.login ={
    init:function(obj){
        var that=this;
        obj.ele.on('click',function(){
            commLog.creatEvent({"id":1,"url":"","keyword":"医鼎登录","browseType":"","browseTypeSourceUrl":window.location.href});
            obj.before&&obj.before();
            that.show(obj);
        })
    },
    show:function(obj){
        //将除了其他几个页面的埋点去掉
        var url = (window.location.href).substring((window.location.href).indexOf("/"),(window.location.href).length);
        var weixin = "//www.yi-ding.net.cn/pages/authority/weixinBindLogin.html";
        var allin = "//www.yi-ding.net.cn/pages/authority/allinAuthority.html";
        var changePhone = "//www.yi-ding.net.cn/pages/authority/changePhone.html";
        if(!(url==weixin)&&!(url==allin)&&!(url==changePhone)){
            commLog.createBrowse(4, "登录注册-登录页");
        }
        $("body").addClass("yd_overflow");
        comm.maskBackground.show("rgba(0,0,0,.6)");
        /*var loginHtml = "<section class=\"loginMain\"><section class=\"loginCont\"><section class=\"authorityCommon\"><section class=\"experiencePo\"><img src=\"/image/authority/login/login_close.png\"><\/section><section class=\"errorTip\"><i><\/i> <span>密码错误<\/span><\/section><section class=\"loginWidth ev-login\" style=\"display:none\"><div class=\"yd_logo\"><img src=\"/image/authority/login/yiding_logo.png\"><\/div><aside class=\"loginUsername marginTop\"><input type=\"text\" class=\"ev-phoneNum\" placeholder=\"请输入唯医通行证\"><div class=\"phone\"><i class=\"close\"><\/i><\/div><div class=\"allinPass\"><i><\/i><a href=\"/pages/help/allin_pass.html\" target=\"_blank\"><span>什么是唯医通行证？<\/span><\/a><\/div><\/aside><ul class=\"history\"><\/ul><aside class=\"loginUsername clear\"><input type=\"password\" class=\"ev-passWord\" placeholder=\"请输入6位以上密码\"><div class=\"password\"><i class=\"close\"><\/i> <i class=\"eyeClose\"><\/i> <i class=\"eyeOpen\"><\/i><\/div><\/aside><div class=\"phoneFind clear\"><div class=\"phoneLogin isJump\">手机快捷登录<div class=\"prompt\">点击这里使用手机快捷登录<\/div><\/div><div class=\"findPassword isJump\">找回密码<\/div><\/div><div class=\"loginBtn ev-loginBtn\">登录<\/div><div class=\"goOnregister\">立即注册<\/div><div class=\"wechatLogin\"><i><\/i>微信登录<\/div><\/section><section class=\"loginWidth\" style=\"display:none\"><section class=\"loginFixed\"><div class=\"authorityTitle\">注册唯医通行证<\/div><section class=\"titleInput clear marginTop\"><div class=\"titleText\">手机号<\/div><input class=\"titleType\" placeholder=\"请输入手机号\"><\/section><section class=\"titleInput clear marginTop\"><div class=\"titleText\">密码<\/div><input class=\"titleType\" placeholder=\"请输入6位以上密码\"><\/section><section class=\"titleInput clear marginTop\"><div class=\"titleText\">验证码<\/div><input class=\"titleType\" placeholder=\"请输入验证码\"><div class=\"validate\">重新获取<\/div><\/section><section class=\"service\"><i class=\"active\"><\/i>同意<a href=\"/pages/help/service.html\" target=\"_blank\">医鼎服务条款<\/a><\/section><div class=\"loginBtn activation\">保存<\/div><a class=\"returnText\" href=\"\">返回上一步<\/a><\/section><i class=\"authorityBg\"><\/i><\/section><section class=\"loginWidth\" style=\"display:\"><section class=\"loginFixed\"><div class=\"authorityTitle\" style=\"margin-bottom:0\">绑定唯医通行证<\/div><div class=\"bindPass\">绑定唯医通行证，下次就可以使用微信快速登录<\/div><section class=\"titleInput clear marginTop\"><div class=\"titleText\">账号<\/div><input class=\"titleType\" placeholder=\"请输入唯医通行证\"><\/section><section class=\"titleInput clear marginTop\"><div class=\"titleText\">密码<\/div><input class=\"titleType\" placeholder=\"请输入6位以上密码\"><\/section><div class=\"loginBtn activation loginMargin\">登录<\/div><a class=\"returnText\" href=\"\">返回上一步<\/a><\/section><i class=\"authorityBg\"><\/i><\/section><\/section><\/section><\/section>\n";*/
        var loginHtml = "<section class=\"loginMain\">"+
            "    <section class=\"loginCont\">"+
            "        <section class=\"authorityCommon\">"+
            "            <!--关闭-->"+
            "            <section class=\"experiencePo log-experiencePo\"><img src=\"/image/authority/login/login_close.png\"> </section>"+
            "            <!--错误提示-->"+
            "            <section class=\"errorTip\"><i></i> <span>密码错误</span></section>"+
            "        <!--登录状态-->"+
            "<section class=\"loginWidth ev-login\"><div class=\"yd_logo\"><img src=\"/image/authority/login/yiding_logo.png\"><\/div><aside class=\"loginUsername marginTop\"><input type=\"text\" class=\"ev-phoneNum\" placeholder=\"请输入唯医通行证\"><div class=\"phone\"><i class=\"close\"><\/i><\/div><div class=\"allinPass ev-permit\"><i><\/i><a href=\"/pages/help/allin_pass.html\" target=\"_blank\"><span>什么是唯医通行证？<\/span><\/a><\/div><\/aside><ul class=\"history\"><\/ul><aside class=\"loginUsername clear\"><input type=\"password\" class=\"ev-passWord\" placeholder=\"请输入6位以上密码\"><div class=\"password\"><i class=\"close\"><\/i> <i class=\"eyeClose\"><\/i> <i class=\"eyeOpen\"><\/i><\/div><\/aside><div class=\"phoneFind clear\"><div class=\"phoneLogin isJump\">手机快捷登录<div class=\"prompt\">点击这里使用手机快捷登录<\/div><\/div><div class=\"findPassword isJump\">找回密码<\/div><\/div><div class=\"loginBtn ev-loginBtn\">登录<\/div><div class=\"goOnregister\">创建唯医通行证<\/div><div class=\"OR\"><\/div><ul class=\"unionLogin clear\"><li class=\"weixin isJump\"><div class=\"icon\"><img src=\"/image/authority/login/login_WeChat.png\"><\/div><div class=\"text\">微信<\/div><\/li><li class=\"allin isJump\"><div class=\"icon\"><\/div><div class=\"text\"><\/div><\/li><li class=\"allin isJump ev-allinCaos\"><div class=\"icon\"><img src=\"/image/authority/login/login_caos.png\"><\/div><div class=\"text\">CAOS<\/div><\/li><\/ul><\/section>\n"+
            "        <!--登录状态 END-->"+
            "        <!--找回密码-->"+
            "        <section class=\"loginWidth ev-findPassword\" style=\"display: none;\">"+
            "            <section class=\"loginFixed\">"+
            "                <div class=\"authorityTitle\">找回密码</div>"+
            "                <section class=\"titleInput clear marginTop\">"+
            "                    <div class=\"titleText\">账号</div>"+
            "                    <input class=\"titleType ev-findNum\" placeholder=\"请输入手机号\">"+
            "                    <div class=\"phone\"> "+
            "	            		<i class=\"close\"></i>"+
            "	            	</div>"+
            "                </section>"+
            "                <section class=\"titleInput clear\">"+
            "                    <div class=\"titleText\">验证码</div>"+
            "                    <input class=\"titleType ev-fidCode\" placeholder=\"请输入验证码\">"+
            "                    <div class=\"validate ev-finValidate\">获取验证码<!--60s后重新获取--><!--重新获取--></div>"+
            "                </section>"+
            "                <div class=\"loginBtn ev-fidNext\">下一步</div>"+
            "                <a class=\"returnText ev-findReturn isJump\" href=\"javaScript:;\">返回上一步</a>"+
            "            </section>"+
            "        </section>"+
            "        <!--找回密码 END-->"+
            "        <!--验证手机号-->"+
            "        <section class=\"loginWidth\" style=\"display: none; \">"+
            "            <section class=\"loginFixed\">"+
            "                <div class=\"authorityTitle\">验证手机号</div>"+
            "                <section class=\"titleInput clear marginTop\">"+
            "                    <div class=\"titleText\">账号</div>"+
            "                    <input class=\"titleType\" placeholder=\"请输入手机号\">"+
            "                </section>"+
            "                <section class=\"titleInput clear\">"+
            "                    <div class=\"titleText\">验证码</div>"+
            "                    <input class=\"titleType ev-phoneNum\" placeholder=\"请输入验证码\">"+
            "                    <div class=\"validate\"><!--获取验证码--><!--60s后重新获取-->重新获取</div>"+
            "                </section>"+
            "                <div class=\"loginBtn\">下一步</div>"+
            "                <a class=\"returnText isJump\" href=\"javaScript:;\">返回上一步</a>"+
            "            </section>"+
            "        </section>"+
            "        <!--验证手机号 END-->"+
            "        <!--设置新密码-->"+
            "        <section class=\"loginWidth ev-newPass\" style=\"display: none;\">"+
            "            <section class=\"loginFixed\">"+
            "                <div class=\"authorityTitle\">设置新密码</div>"+
            "                <section class=\"titleInput clear marginTop\">"+
            "                    <div class=\"titleText\">新密码</div>"+
            "                    <input class=\"titleType ev-newPas\" type=\"password\" oncopy=\"log(\'复制被阻止!\'); return false;\" placeholder=\"请输入6位以上密码\">"+
            "                    <div class=\"phone\"> "+
            "	            		<i class=\"close\"></i>"+
            "	            	</div>"+
            "                </section>"+
            "                <section class=\"titleInput clear\">"+
            "                    <div class=\"titleText\">确认密码</div>"+
            "                    <input class=\"titleType ev-conPas\" type=\"password\" oncopy=\"log(\'复制被阻止!\'); return false;\" placeholder=\"请再次输入新密码\">"+
            "                    <div class=\"password\"> "+
            "	            		<i class=\"close\"></i>"+
            "	            	</div>"+
            "                </section>"+
            "                <div class=\"loginBtn ev-passSave\">保存</div>"+
            "                <a class=\"returnText ev-newReturn isJump\" href=\"javaScript:;\">返回上一步</a>"+
            "            </section>"+
            "            <section class=\"reset\">已重置</section>"+
            "        </section>"+
            "        <!--设置新密码 END-->"+
            "        <!--验证手机号-->"+
            "        <section class=\"loginWidth ev-testNum\" style=\"display:none; \">"+
            "            <section class=\"loginFixed\">"+
            "                <section class=\"return\"></section>"+
            "                <div class=\"authorityTitle\">验证手机号</div>"+
            "                <section class=\"yanzheng\">验证码已发送至：<span>15022322566</span></section>"+
            "                <section class=\"proving\"><input type=\"text\" class=\"error\"></section>"+
            "                <section class=\"send\"><span>9</span>秒后重新发送</section>"+
            "                <section class=\"surplus\">今天剩余<span>2</span>次</section>"+
            "            </section>"+
            "        </section>"+
            "        <!--验证手机号 END-->"+
            "        <!--手机快捷登录-->"+
            "        <section class=\"loginWidth ev-quickLogin\" style=\"display:none; \">"+
            "            <section class=\"loginFixed\">"+
            "                <div class=\"authorityTitle\">手机快捷登陆</div>"+
            "                <section class=\"titleInput clear marginTop\">"+
            "                    <div class=\"titleText\">账号</div>"+
            "                    <input class=\"titleType ev-quiNum\" placeholder=\"请输入手机号\">"+
            "                    <div class=\"phone\"> "+
            "	            		<i class=\"close\"></i>"+
            "	            	</div>"+
            "<div class=\"allinPass registerAllinmd none\"><i></i><span>创建唯医通行证！!</span></div>"+
            "                </section>"+
            "                <section class=\"titleInput clear login-qui-disabled\">"+
            "                    <div class=\"titleText\">验证码</div>"+
            "                    <input class=\"titleType ev-quiCode\" placeholder=\"请输入验证码\"  disabled=\"disabled\" >"+
            "                    <div class=\"validate ev-quickCode\"><!--获取验证码--><!--60s后重新获取-->获取验证码</div>"+
            "                </section>"+
            "                <div class=\"loginBtn ev-quiLoginBtn \">登录</div>"+
            "                <a class=\"returnText ev-quickReturn isJump\" href=\"javaScript:;\">返回上一步</a>"+
            "            </section>"+
            "        </section>"+
            "        <!--验证手机号 END-->"+
            "        <!--绑定手机号创建账号-->"+
            "        <section class=\"loginWidth ev-createBind\" style=\"display: none;\">"+
            "            <div class=\"yd_logo\"><img src=\"/image/authority/login/yiding_logo.png\"></div>"+
            "            <div class=\"createAccount\">使用13033333333创建医鼎账号</div>"+
            "            <div class=\"shortcut\">之后您将可以使用手机号快捷登录医鼎</div>"+
            "            <div class=\"loginBtn ev-createAccount activation\">创建账号</div>"+
            "            <div class=\"changeSigns ev-changeSigns\">更换其他手机号</div>"+
            "            <a class=\"returnText ev-createReturn isJump\" href=\"javaScript:;\">返回上一步</a>"+
            "        </section>"+
            "        <!--绑定手机号创建账号 END-->"+
            "        <!--唯医绑定医鼎账号-->"+
            "        <section class=\"loginWidth ev-bindAllin\" style=\"display: none\">"+
            "            <section class=\"loginFixed\">"+
            "                <section class=\"return\"></section>"+
            "                <div class=\"authorityTitle\">绑定医鼎账号</div>"+
            "                <section class=\"binding\">绑定医鼎账号，可用唯医登录</section>"+
            "                <section class=\"titleInput clear marginTop\">"+
            "                    <div class=\"titleText\">账号</div>"+
            "                    <input class=\"titleType ev-bindNum\" placeholder=\"请输入手机号\">"+
            "                    <div class=\"phone\"> "+
            "	            		<i class=\"close\"></i>"+
            "	            	</div>"+
            "                </section>"+
            "                <section class=\"titleInput clear\">"+
            "                    <div class=\"titleText\">验证码</div>"+
            "                    <input class=\"titleType ev-bindCode\" placeholder=\"请输入验证码\">"+
            "                    <div class=\"validate ev-bindValidate\"><!--获取验证码--><!--60s后重新获取-->获取验证码</div>"+
            "                </section>"+
            "                <div class=\"loginBtn ev-bindLogin\">登录</div>"+
            "                <a class=\"returnText ev-bindReturn isJump\" href=\"javaScript:;\">返回上一步</a>"+
            "            </section>"+
            "        </section>"+
            "        <!--绑定医鼎账号 END-->"+
            "        <!--微信绑定医鼎账号-->"+
            "        <section class=\"loginWidth ev-bindWeixin\" style=\"display: none\">"+
            "            <section class=\"loginFixed\">"+
            "                <section class=\"return\"></section>"+
            "                <div class=\"authorityTitle\">绑定医鼎账号</div>"+
            "                <section class=\"binding\">绑定医鼎账号,可用微信快速登录</section>"+
            "                <section class=\"titleInput clear marginTop\">"+
            "                    <div class=\"titleText\">账号</div>"+
            "                    <input class=\"titleType ev-bindWeixinNum\" placeholder=\"请输入手机号\">"+
            "                    <div class=\"phone\"> "+
            "	            		<i class=\"close\"></i>"+
            "	            	</div>"+
            "                </section>"+
            "                <section class=\"titleInput clear\">"+
            "                    <div class=\"titleText\">验证码</div>"+
            "                    <input class=\"titleType ev-bindWeixinCode\" placeholder=\"请输入验证码\">"+
            "                    <div class=\"validate ev-bindWeixinValidate\"><!--获取验证码--><!--60s后重新获取-->获取验证码</div>"+
            "                </section>"+
            "                <div class=\"loginBtn ev-bindWeixinLogin\">登录</div>"+
            "                <a class=\"returnText ev-bindWeixinReturn isJump\" href=\"javaScript:;\">返回上一步</a>"+
            "            </section>"+
            "        </section>"+
            "        <!--绑定医鼎账号 END-->"+
            "<div class=\"loginWidth ev-CAOSlOgin\" style=\"display:none ;\">"+
            "            <div class=\"loginFixed\">"+
            "                <div class=\"authorityTitle\"><span>CAOS账号登录</span></div>"+
            "                <section class=\"titleInput clear marginTop\">"+
            "                    <div class=\"titleText\">账号</div>"+
            "                    <input class=\"titleType ev-caosPhone\" placeholder=\"您在CAOS的用户名\" />"+
            "                </section>"+
            "                <section class=\"titleInput clear\">"+
            "                    <div class=\"titleText\">密码</div>"+
            "                    <input class=\"titleType ev-caosPass\" placeholder=\"您在CAOS的密码\" type=\"password\" oncopy=\"log(\'复制被阻止!\'); return false;\" \/>"+
            "                </section>"+
            "                <div class=\"loginBtn ev-CAOSloginBtn\">登录</div>"+
            "                <a class=\"returnText\" href=\"javaScript:;\">返回上一步</a>"+
            "            </div>"+
            "        </div>"+
            "       <i class=\"authorityBg\"></i>"+
            "    </section>"+
            "</section>"+
            "    </section>";
        $(".yd-maskBackground").html(loginHtml);
        $(".log-experiencePo").unbind("click").bind("click",function(){
            commLog.creatEvent({"id":10,"url":"","keyword":"关闭登录","browseType":""});
            loginAbout.login.exit();
        });
        $(".goOnregister").unbind("click").bind("click",function(){
            commLog.creatEvent({"id":7,"url":"","keyword":"立即注册","browseType":"09"});
            setTimeout(function(){
                $(".errorTip").css("display","none");
            },300);
            setTimeout(function(){
                $(".errorTip").css("display","none");
            },500);
            loginAbout.login.exit();
            loginAbout.register.show(obj);
        });
        loginFn.init(obj);
    },
    status:function(){
        var loginJson = {};
        var state = false;
        var userInfo = {};
        if(localStorage.getItem("userState")){
            state = true;
            loginJson.userId = localStorage.getItem("userId");
            if(localStorage.getItem("userInfo")){
                userInfo = JSON.parse(localStorage.getItem("userInfo"));
                var name = userInfo.customerName;
                var head = userInfo.customerLogoUrl;
                loginJson.userName = name;
                loginJson.userLogUrl = head;
                loginJson.userInfo = userInfo;
            }
        }
        loginJson.state = state;
        return loginJson;
    },
    exit:function(type,exitFn){
        $("body").removeClass("yd_overflow");
        if(type){
            localStorage.clear("userId");
            localStorage.clear("userInfo");
            $(".notLogin").css("display","inline-block");
            $(".isLogin").css("display","none");
        }
        $(".yd-maskBackground").remove();
        exitFn&&exitFn();
    },
};

var DONT_ENUM = "propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor".split(","),
    hasOwn = ({}).hasOwnProperty;
for (var i in {
    toString: 1
}) {
    DONT_ENUM = false;
}
Object.keys = Object.keys || function (obj) {
        var result = [];
        for (var key in obj)
            if (hasOwn.call(obj, key)) {
                result.push(key);
            }
        if (DONT_ENUM && obj) {
            for (var i = 0; key = DONT_ENUM[i++];) {
                if (hasOwn.call(obj, key)) {
                    result.push(key);
                }
            }
        }
        return result;
    };


/**
 * 跳转方法
 * @param el $元素
 * @param url 跳转地址
 * @param openNewWindow 是否打开新窗口
 */
comm.jump = function (el, url, openNewWindow) {
    if (typeof g_sps != "undefined") {
        g_sps.jump(el, url, openNewWindow);
    } else {
        if (openNewWindow) {
            window.open(url);
        } else {
            window.location.href = url;
        }
    }
};
