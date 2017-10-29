/**
 * 功能描述：  方法集
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by lichunhui on 2016/07/19.
 */
function popup(obj) {

    if ($(".ev-commTips").length == 0) {

        $("body").append('<section class="al-middleTipsBox">'+
            '<section class="al-middleTipsModal ev-commTips">'+
            '<figure class="al-middleTipsModalText">'+
            (obj.hasImg?'<img src="/image/personal/loading_finish.png" alt="">':'')+
            '<p class="tipText">' + obj.text + '</p> '+
            '</figure>'+
            '</section>'+
            '</section>');

        setTimeout(function() {
            $(".ev-commTips").addClass('show')
        }, 100);
    } else {
        $(".ev-commTips").addClass('show');
        $(".tipText").text(obj.text);
        if (!obj.hasImg){
            $(".al-middleTipsModalText img").hide();
        }else{
            $(".al-middleTipsModalText img").show();
        }
    }
    setTimeout(function() {
        $(".ev-commTips").removeClass('show');
    }, 3000)
}

function sendError(text) {
    var text = text || '当前网络环境不佳，请重新发送';
    if ($('.EV-sendErrorTips').length === 0) {

        $(".al-indexHeader").append('<section class="al-sendFailTips EV-sendErrorTips"><p>' + text + '</p></section>');

        setTimeout(function() {
            $('.EV-sendErrorTips').addClass('show');
        }, 100)


    } else {
        $('.EV-sendErrorTips').addClass('show');
        $(".EV-sendErrorTips").text(text);
    }

    setTimeout(function() {
        $('.EV-sendErrorTips').removeClass('show');
    }, 3000);
}

function popupAutoDisappear(content, time) {
    if ($("#popupBasic2").length == 0) {
        $("body").append('<div data-role="popup" id="popupBasic2" data-dismissible="false">' +
            '                    <p></p>' +
            '            </div>').enhanceWithin();
    }

    $("#popupBasic2 p").text(content);

    $("#popupBasic2").popup("open", {
        overlayTheme: "b"
    });

    setTimeout(function() {
        $("#popupBasic2").popup("close");
    }, time);
}

//等比率缩放图片大小
function changeSize(nodeImg, width, height) {
    var oWH = fgetRealWH(width, height, nodeImg.width, nodeImg.height);
    $(nodeImg).animate({
        width: oWH.width,
        height: oWH.height
    });
}

//获取等比率缩放后的宽度和高度值
function fgetRealWH(baseWidth, baseHeight, realWidth, realHeight) {
    if (!realWidth || !realHeight) {
        return {
            width: baseWidth,
            height: baseHeight
        }
    }
    var rate1 = baseWidth / realWidth;
    var rate2 = baseHeight / realHeight;
    var width, height;
    rate1 = (rate1 < rate2 ? rate1 : rate2);
    width = Math.ceil(realWidth * rate1);
    height = Math.ceil(realHeight * rate1);
    return {
        width: width,
        height: height
    };
};

function getpara(symbol) { //获取参数的函数
    var url = document.URL;
    var param = {};
    var str, item;
    if (url.lastIndexOf(symbol ? symbol : "?") > 0) {
        str = url.substring(url.lastIndexOf(symbol ? symbol : "?") + 1, url.length);
        var arr = str.split("&");
        for (var i = 0; i < arr.length; i++) {
            item = arr[i].split("=");
            param[item[0]] = decodeURI(item[1]);
        }
    }
    return param;
};

function popupClose() {
    $("#popupBasic2").popup("close");
}

function checkAccountType(account) {
    var type = "";
    if (/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(account)) {
        type = "mobile";
    }
    if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(account)) {
        type = "email";
    }
    return type;
}


function twoStar(email) {
    var str = "";
    var arr = email.split("@");
    str = arr[0].substr(0, 1) + "**" + arr[0].substr(arr[0].length - 1, 1) + "@" + arr[1];
    return str;
}

function DrawImage(ImgD, iwidth, iheight) {
    //参数(图片,允许的宽度,允许的高度)
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= iwidth / iheight) {
            if (image.width > iwidth) {
                ImgD.width = iwidth;
                ImgD.height = (image.height * iwidth) / image.width;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        } else {
            if (image.height > iheight) {
                ImgD.height = iheight;
                ImgD.width = (image.width * iheight) / image.height;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        }
    }
}

function DrawImageLarge(ImgD, iwidth, iheight) {
    //参数(图片,允许的宽度,允许的高度)
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= iwidth / iheight) {

            ImgD.width = iwidth;
            ImgD.height = (image.height * iwidth) / image.width;

        } else {
            ImgD.height = iheight;
            ImgD.width = (image.width * iheight) / image.height;

        }
    }
}

function reDrawImg(ImgD, rate) {
    var image = new Image();
    image.src = ImgD.src;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= iwidth / iheight) {
            if (image.width > iwidth) {
                ImgD.width = iwidth;
                ImgD.height = (image.height * iwidth) / image.width;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        } else {
            if (image.height > iheight) {
                ImgD.height = iheight;
                ImgD.width = (image.width * iheight) / image.height;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        }
    }
}
String.prototype.toWK = function() {
    if (isNaN(parseInt(this))) return 0;

    if (parseInt(this) < 10000 && parseInt(this) > 999) {
        return Math.floor(parseInt(this) / 1000) + "千+";
    } else if (parseInt(this) > 9999) {
        return Math.floor(parseInt(this) / 10000) + "万+";
    } else {
        return this;
    }
}

Number.prototype.toWK = function() {
    if (isNaN(parseInt(this))) return 0;

    if (parseInt(this) < 10000 && parseInt(this) > 999) {
        return Math.floor(parseInt(this) / 1000) + "K+";
    } else if (parseInt(this) > 9999) {
        return Math.floor(parseInt(this) / 10000) + "W+";
    } else {
        return this;
    }
}

String.prototype.toInt = function() {
    return parseInt(this);
};
String.prototype.toK = function() {
    if (parseInt(this) > 999) {
        return Math.floor(parseInt(this) / 1000) + "K+";
    } else {
        return this;
    }
};
Number.prototype.toK = function() {
    if (parseInt(this) > 999) {
        return Math.floor(parseInt(this) / 1000) + "K+";
    } else {
        return this;
    }
};
String.prototype.toW = function() {
    if (parseInt(this) > 9999) {
        return Math.floor(parseInt(this) / 10000) + "W+";
    } else {
        return this;
    }
};
Number.prototype.toW = function() {
    if (parseInt(this) > 9999) {
        return Math.floor(parseInt(this) / 10000) + "W+";
    } else {
        return this;
    }
};

function toggleToPC() {
    var PC = comm.equipment.IsPC();
    if (PC) {
        var currentUrl = location.href;
        if (currentUrl.indexOf("m.allinmd.cn") > -1) {
            location.href = currentUrl.replace("m.allinmd.cn", "www.allinmd.cn").replace("/m/", "/");
        }
    }
}

jQuery.cookie = function(key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires,
                t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function(s) {
        return s;
    } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};


//文本域高度自适应
$.fn.extend({
    textareaAutoHeight: function(options) {
        this._options = {
            minHeight: 0,
            maxHeight: 1000
        };
        this.init = function() {
            for (var p in options) {
                this._options[p] = options[p];
            }
            if (this._options.minHeight == 0) {
                this._options.minHeight = parseFloat($(this).height());
            }
            for (var p in this._options) {
                if ($(this).attr(p) == null) {
                    $(this).attr(p, this._options[p]);
                }
            }
            $(this).keydown(this.resetHeight).keyup(this.resetHeight).change(this.resetHeight)
                .focus(this.resetHeight);
            $(this)[0].onpaste = this.resetHeight;
        };
        this.resetHeight = function() {
            var _minHeight = parseFloat($(this).attr("minHeight"));
            var _maxHeight = parseFloat($(this).attr("maxHeight"));
            if (!$.browser.msie) {
                $(this).height(0);
            }
            var h = parseFloat(this.scrollHeight);
            h = h < _minHeight ? _minHeight :
                h > _maxHeight ? _maxHeight : h;
            $(this).height(h).scrollTop(h);
            if (h >= _maxHeight) {
                $(this).css("overflow-y", "scroll");
            } else {
                $(this).css("overflow-y", "hidden");
            }
            $(this).parents(".case_title").css("height", $(this).parent().next().outerHeight(true) + $(this).height() + 12);
            $(this).parents(".case_title_more_p").css("height", $(this).parent().next().outerHeight(true) + $(this).height() + 12);
        };
        this.init();
    }
});

String.prototype.cutString = function(len) {
    //length属性读出来的汉字长度为1
    if (this.length * 2 <= len) {
        return this;
    }
    var strlen = 0;
    var s = "";
    for (var i = 0; i < this.length; i++) {
        s = s + this.charAt(i);
        if (this.charCodeAt(i) > 128) {
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

var TempCache = {
    cache: function(value) {
        localStorage.setItem("EasyWayTempCache", value);
    },
    getCache: function() {
        return localStorage.getItem("EasyWayTempCache");
    },
    setItem: function(key, value) {
        localStorage.setItem(key, value);
    },
    getItem: function(key) {
        var item = localStorage.getItem(key);
        if (key && key == "fromPage") // 来源页面只能获取一次
            localStorage.removeItem(key);
        return item;
    },
    removeItem: function(key) {
        return localStorage.removeItem(key);
    },
    clear: function() {
        // 清除缓存
        /* storage = window.localStorage;
         while (storage.key(storage.length - 1).indexOf(keyword) === 0) {
         storage.removeItem(storage.key(storage.length - 1))
         }*/
        var wxBrowseAccessLockOn = localStorage.getItem("wxBrowseAccessLockOn");
        localStorage.clear();
        localStorage.setItem("wxBrowseAccessLockOn", wxBrowseAccessLockOn);
    }
};

function initTuiJian(obj) {
    var str = "";
    $.each(tuijianList, function(index, val) {
        str += '<div class="ui-block-' + (index % 2 == 0 ? 'a' : 'b') + ' item" videoKey="' + val.key + '">' +
            '<div>' +
            '<img src="' + val.pic + '"  />' +
            '<span class="type">' + val.type + '</span><a  class="title">' + val.title + '</a>' +
            '<span class="author"><span class="user"></span>' + val.author + '</span>' +
            '</div>' +
            '</div>'
    });
    $(obj).html(str);

    $(obj).find(".item").on('vclick', function(e) {
        TempCache.setItem("videoKey", $(this).attr("videoKey"));
        $.mobile.changePage("video.html", {
            transition: "slideleft"
        });
    });

}

function runvote(videoId, location) {
    var param = {
        useful_type: 1,
        up_down_type: 1,
        ref_id: videoId
    };

    $.ajax({
        type: 'POST',
        url: "/mcall/customer/prefer/createPrefer/",
        data: {
            "paramJson": $.toJSON(param)
        },
        dataType: "json",
        timeout: 10000,
        success: function callback(rep) {
            if (rep != null) {
                if (rep.responseObject.responseStatus) {
                    alert("投票成功");

                } else {
                    if ("9X0001" == rep.responseObject.responseCode) {
                        alert("您已经投过票了");
                    }

                }

                if (location != window.location.href) {
                    window.location.href = location;
                } else {
                    setVideoInfo();
                }
            }

        },
        error: function() {
            alert("数据错误");
        }
    });
}

function getXueZuListData() {
    var result = [];
    $.ajax({
        type: 'POST',
        url: "/mcall/comm/data/tag/json_list/",
        data: {
            treeLevel: '2',
            pageIndex: 1,
            pageSize: 100
        },
        dataType: "json",
        timeout: 20000,
        async: false,
        success: function callback(rep) {
            if (rep && rep.responseObject) {
                result = rep.responseObject.responseMessage;
            } else {
                //console.log("getDataTags数据错误");
            }
        },
        error: function() {
            //console.log("getDataTags数据错误");
        }
    });
    return result;
}

function initXueZu(selector) {
    var data = getXueZuListData();
    var str = $.map(data, function(el, index) {
        return "<div class='tab_a'><div class='tab_b'>" + el + "</div></div>";
    }).join("");
    $("#" + selector).html(str);

    $("#xuezu_list >div ").on("vclick", function() {
        window.location.href = "/html/pages/video_list.html?type=" + $(this).text();
    });
}


if (!Array.indexOf) {
    Array.prototype.indexOf = function(Object) {
        for (var i = 0; i < this.length; i++) {
            if ($.trim(this[i]) == $.trim(Object)) {
                return i;
            }
        }
        return -1;
    }
}

if (!Array.remove) {
    //Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };
}

function shareFriend() {
    var link = location.href;
    var desc = ((typeof weiXinDesc == "undefined") || weiXinDesc == "") ? link : weiXinDesc;
    var title = ((typeof weiXinTitle == "undefined") || weiXinTitle == "") ? $("title").text() : weiXinTitle;
    var logoUrl = ((typeof weiXinLogo == "undefined") || weiXinLogo == "") ? "" : weiXinLogo;
    if (link.indexOf("?") > 0) {
        link = link + "&_=" + Math.random();
    }
    //alert("title"+$("title").text());
    WeixinJSBridge.invoke('sendAppMessage', {
        "img_url": logoUrl || "//m.allinmd.cn/images/img50weixin_video_logo.jpg",
        "img_width": "640",
        "img_height": "640",
        "link": link,
        "desc": desc || "",
        "title": title || $("title").text()
    }, function(res) {
        //_report('send_msg', res.err_msg);
    })
}

function shareTimeline() {
    var link = location.href;
    var desc = ((typeof weiXinDesc == "undefined") || weiXinDesc == "") ? link : weiXinDesc;
    var title = ((typeof weiXinTitle == "undefined") || weiXinTitle == "") ? $("title").text() : weiXinTitle;
    var logoUrl = ((typeof weiXinLogo == "undefined") || weiXinLogo == "") ? "" : weiXinLogo;
    if (link.indexOf("?") > 0) {
        link = link + "&_=" + Math.random();
    }
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url": logoUrl || "//m.allinmd.cn/images/img50weixin_video_logo.jpg",
        "img_width": "640",
        "img_height": "640",
        "link": link,
        "desc": desc,
        "title": title || $("title").text()
    }, function(res) {
        //_report('timeline', res.err_msg);
    });
}

function shareWeibo() {

    WeixinJSBridge.invoke('shareWeibo', {
        "content": descContent,
        "url": lineLink
    }, function(res) {
        _report('weibo', res.err_msg);
    });
}


var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var isIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !isIE8;
if (isIE8 || isIE7) {
    document.attachEvent('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        if (location.pathname.indexOf("login") < 0 && location.pathname.indexOf("regist") < 0) {
            WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                shareFriend();
            });

            WeixinJSBridge.on('menu:share:timeline', function(argv) {
                shareTimeline();
            });
        }
    }, false);
} else {
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        if (location.pathname.indexOf("login") < 0 && location.pathname.indexOf("regist") < 0) {
            WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                shareFriend();
            });

            WeixinJSBridge.on('menu:share:timeline', function(argv) {
                shareTimeline();
            });
        }


        /*  // 分享到朋友圈


         // 分享到微博
         WeixinJSBridge.on('menu:share:weibo', function(argv){
         shareWeibo();
         });*/
    }, false);
}

function goBack(href, step) {
    //var nav = browser.versions;
    //if(nav.iPhone||nav.iPad||nav.ios){
    window.location.href = href;
    /*}else{
     history.back(step?step:-1);
     }*/
}

function rem(opx) {
    var px = parseInt(opx);

    return (px / 75) + 'rem';
}
//展示时把html标签转换成字符串显示
function htmlToString(str) {
    return str.replace(/[<>&]/g, function(c) {
        return { '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]; });
}

//特殊字符转义
function escapeReplace(str) {
    return str.replace(/[+/?#&=!%]/g, function(c) {
        return { '+': '%2B', '/': '%2F', '?': '%3F', '#': '%23', '&': '%26', '=': '%3D', '!': '%21', '%': '%25' }[c]; });
}
//----------------------------------------------------------------------
//
// ECMAScript 5 Polyfills
//
//----------------------------------------------------------------------

//----------------------------------------------------------------------
// ES5 15.2 Object Objects
//----------------------------------------------------------------------

//
// ES5 15.2.3 Properties of the Object Constructor
//

// ES5 15.2.3.2 Object.getPrototypeOf ( O )
// From http://ejohn.org/blog/objectgetprototypeof/
// NOTE: won't work for typical function T() {}; T.prototype = {}; new T; case
// since the constructor property is destroyed.
if (!Object.getPrototypeOf) {
    Object.getPrototypeOf = function (o) {
        if (o !== Object(o)) { throw TypeError("Object.getPrototypeOf called on non-object"); }
        return o.__proto__ || o.constructor.prototype || Object.prototype;
    };
}

//    // ES5 15.2.3.3 Object.getOwnPropertyDescriptor ( O, P )
//    if (typeof Object.getOwnPropertyDescriptor !== "function") {
//        Object.getOwnPropertyDescriptor = function (o, name) {
//            if (o !== Object(o)) { throw TypeError(); }
//            if (o.hasOwnProperty(name)) {
//                return {
//                    value: o[name],
//                    enumerable: true,
//                    writable: true,
//                    configurable: true
//                };
//            }
//        };
//    }

// ES5 15.2.3.4 Object.getOwnPropertyNames ( O )
if (typeof Object.getOwnPropertyNames !== "function") {
    Object.getOwnPropertyNames = function (o) {
        if (o !== Object(o)) { throw TypeError("Object.getOwnPropertyNames called on non-object"); }
        var props = [], p;
        for (p in o) {
            if (Object.prototype.hasOwnProperty.call(o, p)) {
                props.push(p);
            }
        }
        return props;
    };
}

// ES5 15.2.3.5 Object.create ( O [, Properties] )
if (typeof Object.create !== "function") {
    Object.create = function (prototype, properties) {
        if (typeof prototype !== "object") { throw TypeError(); }
        function Ctor() {}
        Ctor.prototype = prototype;
        var o = new Ctor();
        if (prototype) { o.constructor = Ctor; }
        if (properties !== undefined) {
            if (properties !== Object(properties)) { throw TypeError(); }
            Object.defineProperties(o, properties);
        }
        return o;
    };
}

// ES 15.2.3.6 Object.defineProperty ( O, P, Attributes )
// Partial support for most common case - getters, setters, and values
(function() {
    if (!Object.defineProperty ||
        !(function () { try { Object.defineProperty({}, 'x', {}); return true; } catch (e) { return false; } } ())) {
        var orig = Object.defineProperty;
        Object.defineProperty = function (o, prop, desc) {
            // In IE8 try built-in implementation for defining properties on DOM prototypes.
            if (orig) { try { return orig(o, prop, desc); } catch (e) {} }

            if (o !== Object(o)) { throw TypeError("Object.defineProperty called on non-object"); }
            if (Object.prototype.__defineGetter__ && ('get' in desc)) {
                Object.prototype.__defineGetter__.call(o, prop, desc.get);
            }
            if (Object.prototype.__defineSetter__ && ('set' in desc)) {
                Object.prototype.__defineSetter__.call(o, prop, desc.set);
            }
            if ('value' in desc) {
                o[prop] = desc.value;
            }
            return o;
        };
    }
}());

// ES 15.2.3.7 Object.defineProperties ( O, Properties )
if (typeof Object.defineProperties !== "function") {
    Object.defineProperties = function (o, properties) {
        if (o !== Object(o)) { throw TypeError("Object.defineProperties called on non-object"); }
        var name;
        for (name in properties) {
            if (Object.prototype.hasOwnProperty.call(properties, name)) {
                Object.defineProperty(o, name, properties[name]);
            }
        }
        return o;
    };
}


// ES5 15.2.3.14 Object.keys ( O )
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
    Object.keys = function (o) {
        if (o !== Object(o)) { throw TypeError('Object.keys called on non-object'); }
        var ret = [], p;
        for (p in o) {
            if (Object.prototype.hasOwnProperty.call(o, p)) {
                ret.push(p);
            }
        }
        return ret;
    };
}

//----------------------------------------------------------------------
// ES5 15.3 Function Objects
//----------------------------------------------------------------------

//
// ES5 15.3.4 Properties of the Function Prototype Object
//

// ES5 15.3.4.5 Function.prototype.bind ( thisArg [, arg1 [, arg2, ... ]] )
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function (o) {
        if (typeof this !== 'function') { throw TypeError("Bind must be called on a function"); }

        var args = Array.prototype.slice.call(arguments, 1),
            self = this,
            nop = function() {},
            bound = function () {
                return self.apply(this instanceof nop ? this : o,
                    args.concat(Array.prototype.slice.call(arguments)));
            };

        if (this.prototype)
            nop.prototype = this.prototype;
        bound.prototype = new nop();
        return bound;
    };
}


//----------------------------------------------------------------------
// ES5 15.4 Array Objects
//----------------------------------------------------------------------

//
// ES5 15.4.3 Properties of the Array Constructor
//


// ES5 15.4.3.2 Array.isArray ( arg )
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
Array.isArray = Array.isArray || function (o) { return Boolean(o && Object.prototype.toString.call(Object(o)) === '[object Array]'); };


//
// ES5 15.4.4 Properties of the Array Prototype Object
//

// ES5 15.4.4.14 Array.prototype.indexOf ( searchElement [ , fromIndex ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */) {
        if (this === void 0 || this === null) { throw TypeError(); }

        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) { return -1; }

        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (isNaN(n)) {
                n = 0;
            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }

        if (n >= len) { return -1; }

        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

// ES5 15.4.4.15 Array.prototype.lastIndexOf ( searchElement [ , fromIndex ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/lastIndexOf
if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function (searchElement /*, fromIndex*/) {
        if (this === void 0 || this === null) { throw TypeError(); }

        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) { return -1; }

        var n = len;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n !== n) {
                n = 0;
            } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }

        var k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n);

        for (; k >= 0; k--) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

// ES5 15.4.4.16 Array.prototype.every ( callbackfn [ , thisArg ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/every
if (!Array.prototype.every) {
    Array.prototype.every = function (fun /*, thisp */) {
        if (this === void 0 || this === null) { throw TypeError(); }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function") { throw TypeError(); }

        var thisp = arguments[1], i;
        for (i = 0; i < len; i++) {
            if (i in t && !fun.call(thisp, t[i], i, t)) {
                return false;
            }
        }

        return true;
    };
}

// ES5 15.4.4.17 Array.prototype.some ( callbackfn [ , thisArg ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/some
if (!Array.prototype.some) {
    Array.prototype.some = function (fun /*, thisp */) {
        if (this === void 0 || this === null) { throw TypeError(); }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function") { throw TypeError(); }

        var thisp = arguments[1], i;
        for (i = 0; i < len; i++) {
            if (i in t && fun.call(thisp, t[i], i, t)) {
                return true;
            }
        }

        return false;
    };
}

// ES5 15.4.4.18 Array.prototype.forEach ( callbackfn [ , thisArg ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/forEach
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fun /*, thisp */) {
        if (this === void 0 || this === null) { throw TypeError(); }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function") { throw TypeError(); }

        var thisp = arguments[1], i;
        for (i = 0; i < len; i++) {
            if (i in t) {
                fun.call(thisp, t[i], i, t);
            }
        }
    };
}


// ES5 15.4.4.19 Array.prototype.map ( callbackfn [ , thisArg ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Map
if (!Array.prototype.map) {
    Array.prototype.map = function (fun /*, thisp */) {
        if (this === void 0 || this === null) { throw TypeError(); }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function") { throw TypeError(); }

        var res = []; res.length = len;
        var thisp = arguments[1], i;
        for (i = 0; i < len; i++) {
            if (i in t) {
                res[i] = fun.call(thisp, t[i], i, t);
            }
        }

        return res;
    };
}

// ES5 15.4.4.20 Array.prototype.filter ( callbackfn [ , thisArg ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Filter
if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp */) {
        if (this === void 0 || this === null) { throw TypeError(); }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function") { throw TypeError(); }

        var res = [];
        var thisp = arguments[1], i;
        for (i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}


// ES5 15.4.4.21 Array.prototype.reduce ( callbackfn [ , initialValue ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/Reduce
if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (fun /*, initialValue */) {
        if (this === void 0 || this === null) { throw TypeError(); }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function") { throw TypeError(); }

        // no value to return if no initial value and an empty array
        if (len === 0 && arguments.length === 1) { throw TypeError(); }

        var k = 0;
        var accumulator;
        if (arguments.length >= 2) {
            accumulator = arguments[1];
        } else {
            do {
                if (k in t) {
                    accumulator = t[k++];
                    break;
                }

                // if array contains no values, no initial value to return
                if (++k >= len) { throw TypeError(); }
            }
            while (true);
        }

        while (k < len) {
            if (k in t) {
                accumulator = fun.call(undefined, accumulator, t[k], k, t);
            }
            k++;
        }

        return accumulator;
    };
}


// ES5 15.4.4.22 Array.prototype.reduceRight ( callbackfn [, initialValue ] )
// From https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/ReduceRight
if (!Array.prototype.reduceRight) {
    Array.prototype.reduceRight = function (callbackfn /*, initialValue */) {
        if (this === void 0 || this === null) { throw TypeError(); }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof callbackfn !== "function") { throw TypeError(); }

        // no value to return if no initial value, empty array
        if (len === 0 && arguments.length === 1) { throw TypeError(); }

        var k = len - 1;
        var accumulator;
        if (arguments.length >= 2) {
            accumulator = arguments[1];
        } else {
            do {
                if (k in this) {
                    accumulator = this[k--];
                    break;
                }

                // if array contains no values, no initial value to return
                if (--k < 0) { throw TypeError(); }
            }
            while (true);
        }

        while (k >= 0) {
            if (k in t) {
                accumulator = callbackfn.call(undefined, accumulator, t[k], k, t);
            }
            k--;
        }

        return accumulator;
    };
}


//----------------------------------------------------------------------
// ES5 15.5 String Objects
//----------------------------------------------------------------------

//
// ES5 15.5.4 Properties of the String Prototype Object
//


// ES5 15.5.4.20 String.prototype.trim()
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return String(this).replace(/^\s+/, '').replace(/\s+$/, '');
    };
}



//----------------------------------------------------------------------
// ES5 15.9 Date Objects
//----------------------------------------------------------------------


//
// ES 15.9.4 Properties of the Date Constructor
//

// ES5 15.9.4.4 Date.now ( )
// From https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Date/now
if (!Date.now) {
    Date.now = function now() {
        return Number(new Date());
    };
}


//
// ES5 15.9.5 Properties of the Date Prototype Object
//

// ES5 15.9.4.43 Date.prototype.toISOString ( )
// Inspired by http://www.json.org/json2.js
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function () {
        function pad2(n) { return ('00' + n).slice(-2); }
        function pad3(n) { return ('000' + n).slice(-3); }

        return this.getUTCFullYear() + '-' +
            pad2(this.getUTCMonth() + 1) + '-' +
            pad2(this.getUTCDate()) + 'T' +
            pad2(this.getUTCHours()) + ':' +
            pad2(this.getUTCMinutes()) + ':' +
            pad2(this.getUTCSeconds()) + '.' +
            pad3(this.getUTCMilliseconds()) + 'Z';
    };
}
if (typeof window.getComputedStyle !== "function") {
    window.getComputedStyle = function(el, pseudo) {
        var oStyle = {};
        var oCurrentStyle = el.currentStyle || {};
        for (var key in oCurrentStyle) {
            oStyle[key] = oCurrentStyle[key];
        }

        oStyle.styleFloat = oStyle.cssFloat;

        oStyle.getPropertyValue = function(prop) {
            // return oCurrentStyle.getAttribute(prop) || null;  // IE6 do not support "key-key" but "keyKey"
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return oStyle;
    }
}
if (typeof Array.prototype.map != "function") {
    Array.prototype.map = function (fn, context) {
        var arr = [];
        if (typeof fn === "function") {
            for (var k = 0, length = this.length; k < length; k++) {
                arr.push(fn.call(context, this[k], k, this));
            }
        }
        return arr;
    };
}
