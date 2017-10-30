/**
 * Created by 萤火虫 on 2017/10/21.
 */
$(document).ready(function(){
    var serviceData = [
        {"type":"0",classTagName:"Gambier-service-coffee",des:"免费咖啡"},
        {"type":"1",classTagName:"Gambier-service-milk",des:"免费牛奶"},
        {"type":"2",classTagName:"Gambier-service-tea",des:"免费茶水"},
        {"type":"3",classTagName:"Gambier-service-wind",des:"吹风机"},
        {"type":"4",classTagName:"Gambier-service-conditioner",des:"空调"},
        {"type":"5",classTagName:"Gambier-service-refrigerator",des:"冰箱"},
        {"type":"6",classTagName:"Gambier-service-tv",des:"电视"},
        {"type":"7",classTagName:"Gambier-service-wifi",des:"免费wifi"},
        {"type":"8",classTagName:"Gambier-service-bath",des:"热水洗浴"},
        {"type":"9",classTagName:"Gambier-service-clean",des:"房间打扫"},
    ];
    var roomDetail = {
        data:{
            editType:"4"
        },
        path:{
            roomUrl:"/web-ssm/hotelRest/submit",
            imgList: "/web-ssm/imageDisRest/showImage"
        },
        queryName:function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        init:function(){
            console.log("首页");
            var t = this;
            t.registerFilter().bannerList().siteList();
            return t;
        },
        templateBanner:function(data){
            var t = this;
            var myTemplate = Handlebars.compile($("#banner").html());
            $('.Gambier-banner-container').html(myTemplate(data));

            t.swiperInit();
            return t;
        },
        templateService:function(data){
          var t = this;
          var newData = {
              list:[]
          };
          var serviceList = data.service.split(",");
          $.each(serviceList,function(i,v){
             $.each(serviceData,function(index,value){
                 if(parseInt(v,10)===parseInt(value.type,10)){
                     newData.list.push(value);
                 }
             })
          });
            var myTemplate = Handlebars.compile($("#service").html());
            $('.Gambier-service-list').html(myTemplate(newData));
            t.changeService();
          return t;
        },
        changeService:function(){
            var t = this;
            var serviceList = $(".Gambier-service-list");
            var leftObj = $(".Gambier-service-left");
            var rightObj = $(".Gambier-service-right");
            t.data.sumServiceNum = $(".Gambier-service-item").length-5;
            if(t.data.sumServiceNum<=0){
                leftObj.hide();
                rightObj.hide();
            }
            leftObj.off("click").on("click",function(){
                if(t.data.serviceIndex>0){
                    t.data.serviceIndex--;
                }
                serviceList.animate({left:-t.data.serviceIndex*180});
                console.log(t.data.serviceIndex)
            });
            rightObj.off("click").on("click",function(){
                if(t.data.serviceIndex<t.data.sumServiceNum){
                    t.data.serviceIndex++;
                }
                serviceList.animate({left:-t.data.serviceIndex*245},"slow","swing");
                console.log(t.data.serviceIndex)
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
        siteList: function () {
            var t = this;
            $.ajax({
                url: t.path.imgList,
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
            console.log(dataItem)
            var title = dataItem.title;
            var des = dataItem.content;
            var imgStr = dataItem.imgUrl;
            var titleList = $(".Gambier-circum-siteTitle");
            titleList.eq(0).html(title);
            titleList.eq(1).html(des);
            console.log($(".Gambier-circum-view img"))
            $(".Gambier-circum-view img").attr({"src":imgStr});
            t.hoverSite();
            return t;
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
        bannerList:function(){
          var t = this;
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data:{paramJson: $.toJSON({id:t.queryName("roomId"),RHtype:t.data.editType})},
                success: function (data, status) {
                    console.log(data);
                    var imgData = {"list":[]};
                    $.each(data.responseData.result.list[0].imgUrl.split(","),function(i,v){
                       var dataJson = {
                           imgUrl:v
                       };
                        imgData.list.push(dataJson);
                    });
                    $(".Gambier-intro-content").html(data.responseData.result.list[0].description);
                    $(".Gambier-scrollTop").scroll({link:"//47.94.225.154:8081/pages/scene/book/book_info.html?roomId="+t.queryName("roomId"),text:"现在预订"});
                    t.templateBanner(imgData);
                    t.templateService(data.responseData.result.list[0]);

                    /*t.roomList = data.responseData.result.list;
                    var pageArr = [];
                    for(var i = 0;i<parseInt(data.responseData.result.pages,10);i++){
                        pageArr.push(i+1);
                    }
                    t.templatePage({"list":pageArr});
                    t.templateRoom(data.responseData.result);
*/
                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
            return t;
        },
        registerFilter:function(){
          var t = this;
            return t;
        },
        showRoomList:function(){
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data:{paramJson: $.toJSON({pageNum:t.data.pageNum,pageSize:t.data.pageSize,RHtype:t.data.editType})},
                success: function (data, status) {
                    t.roomList = data.responseData.result.list;
                    //t.templatePage(data.responseData.result.pages);
                    //t.templateRoom(data.responseData.result);

                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
          var t = this;
            return t;
        },
        swiperInit:function(){
            var t = this;
            var mySwiper = new Swiper('.Gambier-banner', {
                autoplay: 5000,//可选选项，自动滑动
                pagination : '.Gambier-banner-pagination',
            });
            $(".ev-book-now").attr({"href":"//47.94.225.154:8081/pages/scene/book/book_info.html?roomId="+t.queryName("roomId")});
            return t;
        }
    };
    roomDetail.init();
});