/**
 * Created by 萤火虫 on 2017/10/22.
 */
$(document).ready(function(){
    var bookRoom = {
        path:{
            submit:"//47.94.225.154:8081/web-ssm/orderRest/order",
            roomUrl:"//47.94.225.154:8081/web-ssm/hotelRest/submit",
            banner:"//47.94.225.154:8081/web-ssm/imageDisRest/showImage"
        },
        data:{
            editType:"4",
            addType:"1"
        },
        init:function(){
            console.log("首页");
            var t = this;
            new Picker(document.querySelector('.Gambier-start-time'), {
                format: 'YYYY/MM/DD HH:mm:ss',
            })
            new Picker(document.querySelector('.Gambier-end-time'), {
                format: 'YYYY/MM/DD HH:mm:ss',
            })
            t.bannerList().submitInfo();//.swiperInit();
            return t;
        },
        submitInfo:function(){
          var t = this;
          $(".Gambier-submit").off("click").on("click",function(){
                var nameInfo = "";
                var phoneNum = "";
                var emailInfo = "";
                var idInfo = "";
                var idType = "";
                var startTime = "";
                var endTime = "";
                var des = "";
                var nameObj = $(".Gambier-name-input");
                var phone = $(".Gambier-phone-input");
                var email = $(".Gambier-email-input");
                var identity = $(".Gambier-identity-type");
                var identityNumber = $(".Gambier-identity-number");
                var startTimeObj = $(".Gambier-start-time");
                var endTimeObj =  $(".Gambier-end-time");
                var liveDes = $(".form-des");
              function isPoneAvailable($poneInput) {
                  var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                  if (!myreg.test($poneInput)) {
                      return false;
                  } else {
                      return true;
                  }
              }
              function isEmail(str){
                  var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                  return reg.test(str);
              }
              nameInfo = nameObj.val();
              phoneNum = phone.val();
              emailInfo = email.val();
              idInfo = identityNumber.val();
              idType = $('input:radio[name="certificate"]:checked').val();
              startTime = startTimeObj.val();
              endTime = endTimeObj.val();
              des = liveDes.val();
              var allRight = true;
              if(nameInfo.length){
                  nameObj.removeClass("error-tips")
              }else{
                  nameObj.addClass("error-tips")
                  allRight = false;
              }
              if(phoneNum.length&&isPoneAvailable(phoneNum)){
                  phone.removeClass("error-tips")
              }else{
                  phone.addClass("error-tips")
                  allRight = false;
              }
              if(emailInfo.length&&isEmail(emailInfo)){
                  email.removeClass("error-tips")
              }else{
                  email.addClass("error-tips")
                  allRight = false;
              }
              if(idType.length){
                  $('input:radio[name="certificate"]').removeClass("error-tips")
              }else{
                  $('input:radio[name="certificate"]').addClass("error-tips")
                  allRight = false;
              }
              if(idInfo.length){
                  identityNumber.removeClass("error-tips")
              }else{
                  identityNumber.addClass("error-tips")
                  allRight = false;
              }
              if(startTime.length){
                  nameObj.removeClass("error-tips")
              }else{
                  startTimeObj.addClass("error-tips")
                  allRight = false;
              }
              if(endTime.length){
                  endTimeObj.removeClass("error-tips")
              }else{
                  endTimeObj.addClass("error-tips")
                  allRight = false;
              }
              if(allRight){
                  var dataJson = {
                      cardNum: idInfo,
                      cardType: idType,
                      endTime: startTime,
                      roomId: t.queryName("roomId"),
                      startTime: startTime,
                      userEmail: emailInfo,
                      userName: nameInfo,
                      userPhone: phoneNum,
                      RHtype:t.data.addType
                  };
                  console.log(dataJson);
                  $.ajax({
                      url: t.path.submit,
                      type: 'post',
                      dataType: 'json',
                      timeout: 1000,
                      data: {paramJson: $.toJSON(dataJson)},
                      success: function (data, status) {
                          if(parseInt(data.responseCode,10)===200){
                              t.successDialog(data.responseData.orderId);
                          }
                      },
                      fail: function (err, status) {

                      }}
                  );
              }
          });
          return t;
        },
        successDialog:function(num){
          var t = this;
            $('html, body').animate({scrollTop: 0}, 800);
          $(".Gambier-mask").show().find(".book-num").html(num);
          $("body").css({"overflow":"hidden"});
          return t;
        },
        queryName:function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
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
                    var imgData = {"list":[]};
                    $.each(data.responseData.result.list[0].imgUrl.split(","),function(i,v){
                        var dataJson = {
                            imgUrl:v
                        };
                        imgData.list.push(dataJson);
                    });
                    t.analyseRoom(data.responseData.result.list[0]);
                    t.templateBanner(imgData);
                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
            return t;
        },
        analyseRoom:function(data){
          var t = this;
            var roomType = ["标准1","标准2","标准3","标准4"];
            var priceType = ["$","AUD","￥"];
            $(".ev-room-title").html(data.title);
            $(".ev-room-des").html(roomType[parseInt(data.roomType,10)]+data.description);
            $(".ev-room-price").html(priceType[parseInt(data.aud,10)]+data.price);
            return t;
        },
        templateBanner:function(data){
            var t = this;
            var myTemplate = Handlebars.compile($("#banner").html());
            $('.swiper-wrapper').html(myTemplate(data));
            t.swiperInit();
            return t;
        },
        swiperInit:function(){
            var t = this;
            var mySwiper = new Swiper('.Gambier-room-img', {
                autoplay: 5000,//可选选项，自动滑动
                pagination : '.Gambier-room-pagination',
            });
            return t;
        }
    };
    bookRoom.init();
});