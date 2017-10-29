/**
 * Created by 萤火虫 on 2017/10/21.
 */
$(document).ready(function(){
    var bookRoom = {
        data:{
            pageNum:0,
            pageSize:9,
            editType:"4"
        },
        path:{
            roomUrl:"//www.hotelbook.cn/web-ssm/hotelRest/submit",
            banner:"//www.hotelbook.cn/web-ssm/imageDisRest/showImage"
        },
        init:function(){
            console.log("首页");
            var t = this;
            $(".Gambier-scrollTop").scroll({
                link: "http://www.hotelbook.cn/pages/scene/cooperation/cooperation.html",
                text: "我要合作"
            });
            t.registerFilter().bannerList().showRoomList();
            return t;
        },
        bannerList:function(){
          var t = this;
            $.ajax({
                url: t.path.banner,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data:{paramJson: $.toJSON({type:"2",RHtype:t.data.editType})},
                success: function (data, status) {
                    console.log(data)
                    t.templateBanner(data.responseData.result);

                    /*var pageArr = [];
                    for(var i = 0;i<parseInt(data.responseData.result.pages,10);i++){
                        pageArr.push(i+1);
                    }
                    t.templatePage({"list":pageArr});
                    t.templateRoom(data.responseData.result);*/

                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
            return t;
        },
        templateBanner:function(data){
          var t = this;
            var myTemplate = Handlebars.compile($("#banner").html());
            $('.Gambier-banner-container').html(myTemplate(data));
            t.swiperInit();
            return t;
        },
        registerFilter:function(){
          var t = this;
            Handlebars.registerHelper("imgSelect",function(v){
                return v.split(",")[0];
            });
            Handlebars.registerHelper("ellipsis",function(v,len){
                return comm.getStrLen(v,len);
            })
            Handlebars.registerHelper("roomTypeChange",function(v){
                var arr = ["标准间","家庭间","单人间"]
                return arr[parseInt(v,10)];
            });
            Handlebars.registerHelper("priceType",function(v){
                var arr = ["$","AUD","￥"];
                return arr[parseInt(v,10)];
            });
            Handlebars.registerHelper("activeClass",function(v){
               if(v===t.data.pageNum){
                   return "active";
               }
            });
            return t;
        },
        showRoomList:function(){
            var t = this;
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data:{paramJson: $.toJSON({pageNum:t.data.pageNum,pageSize:t.data.pageSize,RHtype:t.data.editType})},
                success: function (data, status) {
                    t.roomList = data.responseData.result.list;
                    var pageArr = [];
                    for(var i = 0;i<parseInt(data.responseData.result.pages,10);i++){
                        pageArr.push(i+1);
                    }
                    t.templatePage({"list":pageArr});
                    t.templateRoom(data.responseData.result);

                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
            return t;
        },
        templatePage:function(data){
            var t = this;
            var myTemplate = Handlebars.compile($("#page").html());
            $('.Gambier-bookList-pagination').html(myTemplate(data));
            t.pageClick();
        },
        pageClick:function(){
          var t = this;
            $(".Gambier-bookList-page").off("click").on("click",function(){
                var isThis = $(this);
                isThis.addClass("active").siblings().removeClass("active");
                t.data.pageNum =parseInt(isThis.index(),10);
                t.showRoomList();
            });

            return t;
        },
        templateRoom:function(data){
          var t = this;
            var myTemplate = Handlebars.compile($("#room-list").html());
            $('.Gambier-bookList-list').html(myTemplate(data));
        },
        swiperInit:function(){
            var t = this;
            var mySwiper = new Swiper('.Gambier-banner', {
                autoplay: 5000,//可选选项，自动滑动
                pagination : '.Gambier-banner-pagination',
            });

            return t;
        }
    };
    bookRoom.init();
});