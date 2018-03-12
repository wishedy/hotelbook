$(document).ready(function(){

    $(".Gambier-send-msg").off("click").on("click",function(){
        var name = $("#Gambier-name");
        var phoneNum = $("#Gambier-phone");
        var emailAddress = $("#Gambier-email");
        var msgContent = $("#Gambier-msg");
        var nameDes = name.val();
        var phoneNumDes = phoneNum.val();
        var emailAddressDes = emailAddress.val();
        var msgContentDes = msgContent.val();
        var dataJson = {
            name:name.val(),
            phoneNum:phoneNum.val(),
            emailAddress:emailAddress.val(),
            msgContent:msgContent.val()
        }
        if((nameDes.length!=0)||(phoneNumDes.length!=0)||(emailAddressDes.length!=0)||(msgContentDes.length!=0)){
            console.log(dataJson);
        }
    });
});