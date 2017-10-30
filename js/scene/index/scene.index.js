/**
 * Created by 萤火虫 on 2017/10/21.
 */
$(document).ready(function () {
    var roomDetail = {
        init: function () {
            console.log("首页");
            var t = this;
            $(".Gambier-scrollTop").scroll({
                link: "http://47.94.225.154:8081/pages/scene/cooperation/cooperation.html",
                text: "我要合作"
            });
            t.register().bannerList().business().serviceList().siteList();
            return t;
        },
        siteList: function () {
            var t = this;
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data: {paramJson: $.toJSON({type: '8', RHtype: t.data.editType})},
                success: function (data, status) {
                    console.log(data.responseData.result.list)
                    t.templateSite(t.filterSite(data.responseData.result.list));
                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
            return t;
        },
        path: {
            roomUrl: "/web-ssm/imageDisRest/showImage"
        },
        data: {
            editType: "4"
        },
        register: function () {
            var t = this;
            Handlebars.registerHelper("activeClass", function (v) {
                if (v === 2) {
                    return "active";
                } else {
                    return "";
                }
            });
            return t;
        },
        templateBanner: function (data) {
            var t = this;
            var myTemplate = Handlebars.compile($("#banner").html());
            $('.Gambier-banner-container').html(myTemplate(data));
            t.swiperInit();
            return t;
        },
        serviceList: function () {
            var t = this;
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data: {paramJson: $.toJSON({type: '5', RHtype: t.data.editType, "pageNum": 1, "pageSize": 999})},
                success: function (data, status) {
                    t.templateService(t.filterService(data.responseData.result.list));
                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
            return t;
        },
        templateSite: function (data) {
            var t = this;
            console.log(data);
            var myTemplate = Handlebars.compile($("#site").html());
            $('.Gambier-circum-scenic .swiper-wrapper').html(myTemplate(data));
            var mySwiperService = new Swiper('.Gambier-circum-scenic', {
                paginationClickable: true,
                pagination: '.Gambier-circum-pagination',
            });
            var dataItem = data.list[0][0];
            var title = dataItem.title;
            var des = dataItem.content;
            var imgStr = dataItem.imgUrl;
            var titleList = $(".Gambier-circum-siteTitle");
            titleList.eq(0).html(title);
            titleList.eq(1).html(des);
            $(".Gambier-circum-view img").attr({"src":imgStr});
            t.hoverSite();
            return t;
        },
        templateService: function (data) {
            var t = this;
            var myTemplate = Handlebars.compile($("#service").html());
            $('.Gambier-characteristic-wrap').html(myTemplate(data));
            var mySwiperSite = new Swiper('.Gambier-characteristic-swiper', {
                pagination: '.Gambier-characteristic-pagination',
                autoplay: 5000,//可选选项，自动滑动

            });

            return t;
        },
        hoverSite: function () {
            var t = this;
            $(".Gambier-circum-item").hover(function () {
                var isThis = $(this);
                $(".Gambier-circum-view img").attr({src: isThis.find("img").attr("src")});
                var titleList = $(".Gambier-circum-siteTitle");
                titleList.eq(0).html(isThis.find("img").attr("data-text"));
                titleList.eq(1).html(isThis.find("img").attr("data-long"));
            });
            return t;
        },
        filterService: function (data) {
            var a = data;
            var arrData = [];
            var num = 0;
            var temArr = [];
            $.each(a, function (i, v) {
                if (i % 6 === 5 || i === a.length - 1) {
                    temArr.push(v);
                    arrData.push(temArr);
                    temArr = [];
                } else {
                    temArr.push(v);
                }
            });
            return {
                list: arrData
            };
        },
        filterSite: function (data) {
            var a = data;
            var arrData = [];
            var num = 0;
            var temArr = [];
            $.each(a, function (i, v) {
                if (i % 9 === 8 || i === a.length - 1) {
                    temArr.push(v);
                    arrData.push(temArr);
                    temArr = [];
                } else {
                    temArr.push(v);
                }
            });
            console.log(arrData)
            return {
                list: arrData
            };
        },
        bannerList: function () {
            var t = this;
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data: {paramJson: $.toJSON({type: '1', RHtype: t.data.editType})},
                success: function (data, status) {
                    t.templateBanner(data.responseData.result);
                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
            return t;
        },
        templateBusiness: function (data) {
            var t = this;
            var myTemplate = Handlebars.compile($("#business").html());
            $('.Gambier-business-list').html(myTemplate(data));
            $(".Gambier-business-item").off("mouseover").on("mouseover", function () {
                $(this).addClass("active").siblings().removeClass("active");
            });
            return t;
        },
        business: function () {
            var t = this;
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data: {paramJson: $.toJSON({type: '3', RHtype: t.data.editType})},
                success: function (data, status) {
                    var dataResult = {
                        list: []
                    };
                    $.each(data.responseData.result.list, function (i, v) {
                        if (i < 5) {
                            dataResult.list.push(v);
                        }
                    });
                    t.templateBusiness(dataResult);
                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
            return t;
        },
        swiperInit: function () {
            var t = this;
            var mySwiper = new Swiper('.Gambier-banner', {
                autoplay: 5000,//可选选项，自动滑动
                pagination: '.Gambier-banner-pagination',
            });


            return t;
        }
    };
    roomDetail.init();
});