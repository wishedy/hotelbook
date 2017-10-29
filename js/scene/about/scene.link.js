/**
 * Created by 萤火虫 on 2017/10/21.
 */
$(document).ready(function(){
    var roomDetail = {
        init:function(){
            console.log("首页");
            var t = this;
            // t.templateService();
            $(".Gambier-scrollTop").scroll({
                link: "http://www.jikelearn.cn/pages/scene/cooperation/cooperation.html",
                text: "我要合作"
            });
            t.bannerList();
            return t;
        },
        path:{
            roomUrl:"//www.jikelearn.cn/web-ssm/imageDisRest/showImage"
        },
        data:{
            editType:"4"
        },
        templateBanner:function(data){
            var t = this;
            var myTemplate = Handlebars.compile($("#banner").html());
            $('.Gambier-banner-container').html(myTemplate(data));
            t.swiperInit();
            return t;
        },
        bannerList:function(){
            var t = this;
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data:{paramJson: $.toJSON({type:'1',RHtype:t.data.editType})},
                success: function (data, status) {
                    t.templateBanner(data.responseData.result);
                },
                fail: function (err, status) {
                    console.log(err)
                }
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
    roomDetail.init();
});