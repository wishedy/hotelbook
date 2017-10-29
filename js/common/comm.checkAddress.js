

/**
 * @desc 是否江浙沪
 * @return {Boolean}
 */
var checkJiangZheHu = function () {
	if (this.cache) {
		return this.cache;
	} else {
		var rst = false;
		var cookieLogin = $.cookie("accessLoginVersion");
		if (cookieLogin =="" || cookieLogin == null) {
			$.ajax({
				url: "/call/log/op/location/getIpArea/",
				async: false,
				success: function (data) {
					if (data && data.responseObject && data.responseObject.responseData) {
						//if ("zhejiang,jiangsu,shanghai".indexOf(data.responseObject.responseData.city.toLowerCase()) > 0) {
						if (data.responseObject.responseData.isNew=="1") {
							rst = true;
							$.cookie("accessLoginVersion", "planB");
						} else {
							$.cookie("accessLoginVersion", "planA");
						}

					}
				}
			});
		}else{
			if(cookieLogin == "planB"){
				rst = true;
			}
		}
		this.cache = rst;
		return rst;
	}
};

var checkIsChina = function () {
	if (this.cache) {
		return this.cache;
	} else {
		var rst = false;
		var cookieLogin = $.cookie("accessLoginCountry");
		if (cookieLogin =="" || cookieLogin == null) {
			$.ajax({
				url: "/mcall/log/op/location/getIpArea/",
				async: false,
				success: function (data) {
					if (data && data.responseObject && data.responseObject.responseData) {
						//if ("zhejiang,jiangsu,shanghai".indexOf(data.responseObject.responseData.city.toLowerCase()) > 0) {
						if (data.responseObject.responseData.countryCode=="CN") {
							rst = true;
							$.cookie("accessLoginCountry", "CN");
						} else {
							$.cookie("accessLoginCountry", "NotCN");
						}
					}
				}
			});
		}else{
			if(cookieLogin == "CN"){
				rst = true;
			}
		}
		this.cache = rst;
		return rst;
	}
};
