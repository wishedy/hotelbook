/**
 * Created by 萤火虫 on 2017/10/14.
 */
$(document).ready(function(){
    var partIn = {
        init:function(){
            var t = this;
            t.showList();
            return t;
        },
        path:{
          friend:"//localhost:8081/web-ssm/franRest/fran"
        },
        data:{
            pageNum:1,
            pageSize:10,
          firendList:[]
        },
        templateFriend:function(data){
          var t = this;
            var myTemplate = Handlebars.compile($("#tpl-user-info").html());
            //console.log(myTemplate(data))
            $('.ev-room-list').html(myTemplate(data));
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
                url: t.path.friend,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data: {paramJson: $.toJSON({pageNum:t.data.pageNum,pageSize:t.data.pageSize,RHtype:"4"})},
                success: function (data, status) {
                    t.data.firendList = data.responseData.result.list;
                    t.templatePage(data.responseData.result.pages);
                    t.templateFriend(data.responseData.result);
                },
                fail: function (err, status) {

                }
            });
            return t;
        }
    };
    partIn.init();
});