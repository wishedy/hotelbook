/**
 * Created by 萤火虫 on 2017/10/14.
 */
$(document).ready(function(){
    var bookRoom = {
        init:function(){
            console.log("预定房间");
            var t = this;
            t.registerFilter().showList().searchUser();
        },
        path:{
          roomUrl:"//47.94.225.154:8081/web-ssm/orderRest/order"
        },
        data: {
            pageNum: 1,
            pageSize: 10
        },
        searchUser:function(){
          var t = this;
            $(".ev-all-user").off("mousedown").on("mousedown",function(){
               window.location.reload();
            });
            $(".ev-one-user").off("mousedown").on("mousedown",function(){
                var isThis = $(this);
                var searchStr = $("#firstName").val();
                t.data.editType = "4";
                if(!/^[0-9]*$/.test(searchStr)){
                    alert("请输入正确的编号");
                }else{
                    var postData = {
                        orderId: searchStr,
                        RHtype:t.data.editType
                    };
                    $.ajax({
                        url: t.path.roomUrl,
                        type: 'post',
                        dataType: 'json',
                        timeout: 1000,
                        data: {paramJson: $.toJSON(postData)},
                        success: function (data, status) {
                            t.roomList = data.responseData.result.list;
                            t.templateRoom(data.responseData.result);
                        },
                        fail: function (err, status) {

                        }}
                    );
                }

            });
            return t;
        },
        templateRoom:function(data){
            var t = this;
            //console.log(data,$("#tpl-user-info").html())
            var myTemplate = Handlebars.compile($("#tpl-user-info").html());
            //console.log(myTemplate(data))
            //console.log("进来")
            $('.ev-room-list').html(myTemplate(data));
            t.templateRoomInfo();
            return t;
        },
        templateRoomInfo:function(){
          var t = this;
            $(".ev-state-show").each(function(i){
                var isT = $(this);
                if(parseInt(isT.attr("data-state"))===2){
                    $(".ev-state").eq(i).trigger("click").attr({"data-original":"1"});
                }
            });
            $(".ev-state").off("click").on("click",function(){
                var isThis = $(this);
                var state = "";
                //if(parseInt(isThis.attr("data-original"))===0)
                if(parseInt(isThis.attr("data-original"))===0){
                    state = '2';
                }else{
                    state = '0';
                }
                    $.ajax({
                        url: t.path.roomUrl,
                        type: 'post',
                        dataType: 'json',
                        timeout: 1000,
                        data: {paramJson: $.toJSON({id:isThis.attr("data-id"),status:state,pageNum:t.data.pageNum,pageSize:t.data.pageSize,RHtype:'2'})},
                        success: function (data, status) {
                            window.location.reload();
                        },
                        fail: function (err, status) {

                        }
                    });

            });
            return t;
        },
        templatePage:function(num){
            var t = this;
            var str = "";
            if(num>1){
                for(var i = 0;i<num;i++){
                    var activeClass="";
                    if((i+1)===t.data.pageNum){
                        activeClass = "active";
                    }
                    str+='<li class="ev-page '+activeClass+'"><a href="javascript:void(0);">'+parseInt((i+1),10)+' <span class="sr-only">'+num+'</span></a></li>';
                }
            }
            $(".pagination").html(str);
            $(".ev-page").off("mousedown").on("mousedown",function(){
                if(t.data.pageNum===($(this).index()+1)){
                    return false;
                }else{
                    $(this).addClass("active").siblings().removeClass("active");
                    t.data.pageNum = $(this).index()+1;
                    t.data.editType="4";
                    t.showList();
                }

            });
            return t;
        },
        showList:function(){
          var t = this;
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data: {paramJson: $.toJSON({pageNum:t.data.pageNum,pageSize:t.data.pageSize,RHtype:"4"})},
                success: function (data, status) {
                    t.roomList = data.responseData.result.list;
                    t.templatePage(data.responseData.result.pages);
                    t.templateRoom(data.responseData.result);
                },
                fail: function (err, status) {

                }
            });
            return t;
        },
        registerFilter:function(){
            var t = this;
            Handlebars.registerHelper("changeState",function(v){
               var stateArr = ["闲置",'已预订',"已入住"];
                return stateArr[parseInt(v,10)];
            });
            console.log("护手霜")
            Handlebars.registerHelper("changeTime",function(v){
                console.log(v)
                var nS = new Date(v);
                var dateStr = v.split("-")
                var timeStr = dateStr[2].split(' ');
                return JSON.parse(dateStr[0]+"年"+dateStr[1]+"月"+timeStr[0]+"日"+timeStr[1]);
            });
            return t;
        }
    };
    bookRoom.init();
});