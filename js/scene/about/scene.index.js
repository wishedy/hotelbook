/**
 * Created by 萤火虫 on 2017/8/1.
 */
$(document).ready(function(){
    $.ajax({
        url: "//localhost/web-ssm/getJson",
        type: 'post',
        dataType: 'json',
        timeout: 1000,
            data:{paramJson: $.toJSON({a:10,b:22})},
        success: function (data, status) {
            console.log(data)
        },
        fail: function (err, status) {
            console.log(err)
        }
    })
    var pageIndex = {
        data:{
          serviceIndex:0,
            sumServiceNum:0
        },
        init:function(){
            console.log("首页");
            var t = this;
            t.swiperInit().changeBusiness().hoverSite();
            return t;
        },
        changeBusiness:function(){
          var t = this;
            $(".Gambier-business-item").off("mouseover").on("mouseover",function(){
                $(this).addClass("active").siblings().removeClass("active");
            });
            return t;
        },
        swiperInit:function(){
            var t = this;
            var mySwiper = new Swiper('.Gambier-banner', {
                autoplay: 5000,//可选选项，自动滑动
                pagination : '.Gambier-banner-pagination',
            });
            var mySwiperSite = new Swiper('.Gambier-circum-scenic', {
                pagination : '.Gambier-circum-pagination',
                paginationClickable :true,
            });

            return t;
        }
    };
    pageIndex.init();
});