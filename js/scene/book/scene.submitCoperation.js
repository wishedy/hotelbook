$(document).ready(function(){
    var part = {
        path:{
          submit:"/web-ssm/franRest/fran"
        },
        data:{
            editType:"4",
            addType:"1"
        },
        successDialog:function(){
          var t = this;
            $('html, body').animate({scrollTop: 0}, 800);
            $(".Gambier-mask").show();
            $("body").css({"overflow":"hidden"});
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
                idType = $('input:radio[name="certificate"]:checked').val();
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
                if(allRight){
                    var dataJson = {
                        cardNum: idInfo,
                        cardType: idType,
                        franEmail: emailInfo,
                        franName: nameInfo,
                        franPhone: phoneNum,
                        RHtype:t.data.addType,
                        operateContent:des
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
                                t.successDialog();
                            }
                        },
                        fail: function (err, status) {

                        }}
                    );
                }
            });
            return t;
        }
    };
    part.submitInfo();
});