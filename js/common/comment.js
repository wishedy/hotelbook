/**
 * 功能描述： 撰写评论
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by LiuYuTao on 2015/5/20.
 */

$(function () {
    /**
     * @module comment 评论
     * */
     var attContent;
     var controller = {
        path: {
            create: "/mcall/customer/review/createReview/",
            update:"/mcall/customer/review/update/",
            info:"/mcall/customer/review/info/",
            delImg:"/mcall/customer/reviewattachment/delete/"
        },
        bindFla:false,
        pic:false,
        submitting:0,
        el: {
            submit: $(".w_comm_fb"),
            textarea:$(".write_comm_input textarea"),
            textareaParent:$(".write_commtent_who"),
            form: $(".commentForm:eq(0)"),
            formParams:$("#formParams")
        },
        textLimitNum:1000,
        refCustomerIdList:[],
        remindCustomerIdList:"",
        opts:{},
        init: function () {
            var t = this;
            t.idList="";//存储删除图片的id字符串
            t.textareaInitHeight = $(".write_comm_input textarea").height();
          /*  console.log('t.textareaInitHeight' + t.textareaInitHeight);
            $(".write_commtent_who_text").text(t.textareaInitHeight);*/
            t.textareaParentInitHeight = $(".write_commtent_who").height();
            /*if(document.referrer.indexOf("personal/app")>-1){
                t.lastUrl=localStorage.getItem("fromPage");
	            localStorage.removeItem("fromPage");
            }else{
                t.lastUrl = document.referrer;
            }*/

            user.privExecute({
                operateType:'auth',
                callback:function(){
                    if (t.getParam()) {
                        if(t.opts.draftEdit){
                            document.title="编辑评论";
                            $(".new_case_title").text("编辑评论");
                            $("#delete").show();
                            t.delete();//删除草稿
                            t.getComment();
                        }
                        t.bindRemind();
                        t.bindEdit();
                        t.bindPicUpload();
                        t.bindCancel();

                    }else{
                        alert("参数不足");
                    }
                }
            });

        },
        // 提醒谁看
        bindRemind: function () {
            var t = this;
            $(".remind").on("vclick", function () {
                //$.mobile.changePage("#remind");
                $("#remind").show();
                $("#index").hide();
                return false;
            });
        },
        getParam: function () {
            var t = this;
            var param = comm.getpara();
            t.opts.id=param.id;
            t.opts.resourceId = param.resourceId;
            t.opts.username = param.username;
            t.opts.type = param.type;
            t.opts.parentId = param.parentId;
            t.opts.draftEdit = param.draft;
            t.opts.refCustomerId = param.refCustomerId?param.refCustomerId:'';//资源发布人ID

            if(param.id){
                return true;
            }else if (param.resourceId == undefined || param.username == undefined|| param.type == undefined) {
                return false;
            } else {
                $(".write_commtent_who_text span").html(t.opts.username);
                return true;
            }

        },
        // 图片上传处理
        bindPicUpload: function () {
            var t = this;
            $(".w_comm_photo .upload").addRemoveablePicComment({
                container: $(".w_comm_photo ul", t.el.form),
                limit: 9,
                existNum:t.existNum,//已上传
                html: '<div><img src="//img50.allinmd.cn/comment/photo_normal.png" /></div>',
                onSizeChange: function (isExist) {
                    t.picCb(isExist);
                },
                //删除初始化图片
                deleteImg:function($this){
                    //alert($this.attr("closeid"));
                    t.idList+=$this.attr("closeid")+",";
                }
            });
        },
        bindEdit: function () {
            var t = this;

            t.el.textarea.on("keyup keydown change input cut paste drop", function () {
                t.checkHeight();
                t.submitToggle();
                t.updateParams();
            });
        },
        checkHeight: function () {
            var t = this;
            t.el.textarea.height(0);
            t.el.textareaParent.css("marginTop",0);
            var textareaHeight = t.el.textarea.innerHeight();
            var textHeight = t.el.textarea.get(0).scrollHeight-4;
            var titleHeight = $(".write_commtent_who_text").height();
            var minusHeight = textHeight - t.textareaInitHeight;
            t.el.textareaParent.css("marginTop",0);
            // console.log(textareaHeight);
            if(t.el.textarea.val().length>0){
                t.content = true;
                if(t.el.textarea.val().length>(t.textLimitNum)){
                    t.el.textarea.val(t.el.textarea.val().substr(0,t.textLimitNum));
                }
            }else{
                t.content = false;
            }
            if(minusHeight<0){
                t.el.textarea.height(t.textareaInitHeight);
                t.el.textareaParent.css("marginTop",0);
            }else{
                if(minusHeight > titleHeight){
                    t.el.textarea.height(t.textareaParentInitHeight-20);
                    t.el.textareaParent.css("marginTop",-titleHeight);
                }else{
                    t.el.textarea.height(textHeight);
                    t.el.textareaParent.css("marginTop",-minusHeight);
                }
            }
        },
        picCb:function(isExist) {
            var t = this;
            t.pic = isExist;
            t.submitToggle();
            t.updateParams();
        },
        //切换发布
        submitToggle: function () {
            var t = this;
            if (t.pic || t.content){
                if(!t.bindFlag){
                    $(t.el.submit).removeClass("comm_disable").
                        off("vclick").on("vclick", function () {
                            if(!t.submitting){
                                // console.log("sdf"+t.submitting);
                                t.submit();
                                t.submitting=1;
                            }
                        });
                    t.bindFlag = true;
                }
            }else{
                $(t.el.submit).addClass("comm_disable").off("vclick");

                t.bindFlag = false;
            }
        },
        submit: function () {
            //draft  传值的话：保存草稿箱
            var t = this;
            $.mobile.loading("show"/*,{
                text: '提交评论中，请稍等...', //加载器中显示的文字
                textVisible: true, //是否显示文字
                textonly: false,   //是否只显示文字
                html: ""           //要显示的html内容，如图片等
            }*/);
            $("#loading_mask").show();

            $(t.el.form).ajaxSubmit({
                url: t.opts.draftEdit?t.path.update:t.path.create,
                success: function (result) {
                    if(typeof result!="object"){
                        var result = $.parseJSON(result);
                    }
                    $("#loading_mask").hide();
                    $.mobile.loading("hide");
                    if(t.draft){
                        $("#save_dra").attr("on","true");
                    };

                    if (result.responseObject.responseStatus) {
                        //window.location.href=t.lastUrl;
                        TempCache.setItem("detailNoNeedApp",1);
                        history.back();
                    } else {
                        if(t.draft){
                            $("#atten").hide();
                            popup("草稿箱保存失败！");
                            return;
                        };
                        alert("发布失败，请稍后再试！");
                    }
                }
            });
        },
        //组装提交参数
        updateParams: function (noRemind) {
            //draft  传值的话：保存草稿箱
            var t = this;
            var isUploadAttachment = 0, attachmentIds = "";
            if (typeof FileReader != 'undefined') {  // 本地可预览模式
                isUploadAttachment = 1;
            }

            attachmentIds = $(".imgPkList").length>0?$(".imgPkList").val():'';
            idList=t.idList.substr(0,t.idList.length-1);
            var reviewContent="";
            if(noRemind){
                reviewContent=$(t.el.textarea).val();
            }else{
                reviewContent=$(t.el.textarea).val() + t.remindCustomerIdList;
            }
            $(t.el.formParams).val("" +
                "{"+(t.opts.id?"'id':"+t.opts.id+",":"")+""+(t.opts.id?"'reviewAttachmentIdList':'"+idList+"',":"")+"'reviewType':" + t.opts.type + "," +
                "'isDraft':"+(t.draft?1:0)+","+
                "'isValid':"+(t.draft?0:1)+","+
                "'refId':" + t.opts.resourceId + "," +
                "'parentId':" + t.opts.parentId + "," +
                "'reviewContent':'" + reviewContent +"'," +
                "'imageType':5,'refCustomerIdList':'" + t.refCustomerIdList.toString() + "'," +
                "'isUploadAttachment':" + isUploadAttachment + "," +
                "'attachmentIds':'" + attachmentIds + "'}");
        },
        //获取评论草稿箱
        getComment:function(){
            var t=this;
            var data={id:this.opts.id,attUseFlag:7};
            var param={};
            param.paramJson= $.toJSON(data);
            $.ajax({
                type : "post",
                url : this.path.info,
                data : param,
                async: false,
                dataType : "json",
                success : function(rep){
                    if(rep.responseObject.responseData){
                        if(rep.responseObject.responseData.author_name){
                            $(".write_commtent_who_text span").html(rep.responseObject.responseData.author_name);
                        }
                        if(rep.responseObject.responseData.customer_review_insite){
                            reviewInsite=rep.responseObject.responseData.customer_review_insite;
                            $("#reviewContent").val(reviewInsite.reviewContent);
                            t.opts.type=reviewInsite.reviewType;
                            t.opts.resourceId=reviewInsite.refId;
                            t.opts.parentId=reviewInsite.parentId;
                        }
                        if(rep.responseObject.responseData.customer_review_attachment){
                            att=rep.responseObject.responseData.customer_review_attachment;
                            html="";
                            t.existNum=att.length;
                            if(att.length>0){
                                $.each(att,function(i,val){
                                    html+='<li><div class="add_photo_img"><div class="comm_close" closeid="'+val.id+'"></div><img src="'+val.attUrl+'"></div></li>';
                                });
                                $(html).insertBefore($(".w_comm_photo ul").find(".clear"));
                                //t.deleteImg();
                            }
                        }
                        if(rep.responseObject.responseData.review_remind_list){
                            attContent=rep.responseObject.responseData.review_remind_list;
                            if(attContent.length>0){
                                html="";
                                $.each(attContent,function(i,val){
                                    $("#rem_title").hide();
                                    $("#rem_show").show();
                                    name=val.lastName+val.firstName;
                                    html+="<li>"+name+"，</li>";
                                    t.refCustomerIdList.push(val.customerId);
                                    t.remindCustomerIdList+="<a href="+val.customerId+">@"+name+"</a>";
                                });
                                html+='<div class="clear"></div>';
                                $(".rem_list").show().append(html);
                            }
                        }
                        t.checkHeight();
                        t.submitToggle();
                        t.updateParams();
                    }else{
                        popup("获取信息失败");
                    }
                },
                error:function(){}
            });
        },
        //删除草稿
        delete:function(){
            var t=this;
            $("#delete").on("vclick",function(){
                $.mobile.loading("show");
                var data={id:t.opts.id,deleteFlag:1,isValid:0};
                var param={};
                param.paramJson= $.toJSON(data);
                $.ajax({
                    type : "post",
                    url : t.path.update,
                    data : param,
                    dataType : "json",
                    success : function(rep){
                        $.mobile.loading("hide");
                        if(rep.responseObject.responseStatus){
                            popup("删除成功");
                            TempCache.setItem("detailNoNeedApp",1);
                            //window.location.href=t.lastUrl;
                            history.back();
                        }else{
                            popup("删除失败");
                        }
                    },
                    error:function(){}
                });
            })
        },

        /**
         * 取消按钮
         */
        bindCancel: function () {
            var t=this;
            $(".comment_qx").on("vclick", function () {
                if(t.opts.type==2){//文库暂不加草稿箱
                    //以前的取消
                    $("#cancel_mask").show();

                     $(".jix_r").on("vclick", function () {
                         //window.location.href = document.referrer;
                         TempCache.setItem("detailNoNeedApp",1);
                         if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
                             //window.location.href = window.document.referrer;
                             history.go(-1);
                         } else {
                             history.go(-1);
                         }
                         return false;
                     });
                    $("#continue_pub").on("vclick",function(){
                         setTimeout(function(){
                         $("#cancel_mask").hide();
                         },400);
                     });
                }else{
                    //现在是保存草稿箱
                    if($(".case_content textarea").val()||$(".add_photo li").length>1||$(".rem_list li").length>0){
                        comm.draftAttention($(".case_content"),"是否要保存该评论至草稿箱？");
                        $("#no_save_dra").on("vclick",function(){//不保存
                            //window.location.href = t.lastUrl;
                            TempCache.setItem("detailNoNeedApp",1);
                            if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
                                //window.location.href = window.document.referrer;
                                history.back();
                            } else {
                                //window.history.go("-1");
                                history.back();
                            }
                        });
                        $("#save_dra").attr("on","true");
                        $("#save_dra").on("vclick",function(){//保存
                            t.draft=1;
                            if($("#save_dra").attr("on")=="true"){
                                t.updateParams(1);//不需要拼@
                                t.submit();
                            }
                        })
                    }else{
                        history.go(-1);
                    }
                }

            });

        }
    };




    var remindController = attention={
        init:function(){
            var t=this;
            var para=comm.getpara();
            this.source=para.source;
            this.getInitUser();
        },
        getHtml:function(data,className){
            html="";
            $.each(data.responseObject.responseData.data_list,function(i,val){
                if(className=="who_look_link"){
                    baseInfo=val.customer_baseinfo;
                }else{
                    baseInfo=val.customer_unite;
                }
                userAuth=val.customer_auth;
                medicalTitle="";
                if(typeof userAuth.medicalTitle=="string"){
                    medical=userAuth.medicalTitle.split(",");
                }else{
                    medical="";
                }
                if(medical){
                    $.each(medical,function(i,val){
                        if(val&&val.split("_")[1]){
                            medicalTitle+=(val.split("_")[1]+",");
                        }else{
                            medicalTitle+=val+",";
                        }
                    });
                }
                userAtt=val.customer_att.logoUrl;
                html+='<li class="'+className+'" customerid="'+baseInfo.customerId+'">'+
                    '<div class="user_img_who">'+
                    '<img src="'+($.isEmptyObject(userAtt)?'//img50.allinmd.cn/personal_v2/user_mr.png':userAtt)+'" />'+
                    (userAuth.state>=1?'<div class="vip_img_who"><img src="//img50.allinmd.cn/personal_v2/vip@2x.png" /></div>':'')+
                    '</div>'+
                    '<div class="user_name_who">'+
                    '<div class="who_name">'+(userAuth.state>=1?userAuth.lastName+userAuth.firstName:baseInfo.nickname)+'</div>'+
                    '<div class="who_zhiwei">'+(userAuth.state>=1?(medicalTitle.substring(0,medicalTitle.length-1)?'<span>'+medicalTitle.substring(0,medicalTitle.length-1)+'</span>':'')+'<span>'+userAuth.company+'</span>':'<span>你们可能是朋友</span>')+'</div>'+
                    '</div>'+
                    '<div class="clear"></div>'+
                    '</li>';
            });
            return html;
        },
        //初始化
        getInitUser:function(){
            var t=this;
            user.getSessionInfo();
            customerId=TempCache.getItem("userId");
            var url="/mcall/customer/follow/people/json_list/";
            var data={dataFlag:2,useFlag:1,logoUseFlag:3,customerId:customerId,sessionCustomerId:customerId,pageIndex:1,pageSize:100, logoUseFlag:3};
            $("#loading").show();
            $.ajax({
                url: url,
                data:data,
                type:"get",
                dataType:"json",
                success:function(data){
                    $("#loading").hide();
                    if(data&&data.responseObject.responseStatus&&!$.isEmptyObject(data.responseObject.responseData)&&data.responseObject.responseData.data_list.length>0){
                        $("#my_user").html(t.getHtml(data,"who_look_link"));
                        t.myUserClick();

                    }
                    if(attContent&&attContent.length>0){
                        var html="";
                        $.each(attContent,function(i,val){
                            name=val.lastName+val.firstName;
                            html+="<li customerid="+val.customerId+">"+name+"，</li>";
                            $.each($("#my_user li"),function(j,em){
                                if(val.customerId==$(em).attr("customerid")){
                                    $(em).removeClass("who_look_link").addClass("who_look_hover");
                                }
                            })
                        });
                        $(".user_list").append(html);
                    }

                    t.keyUp();
                    $("#success").off("vclick").on("vclick",function(){
                        t.setLocalStorage();
                        $("#remind").hide();
                        $("#index").show();
                        //if(t.source=="case"){
                        //$.mobile.changePage("#index");
                        //}else{
                        //window.location.href=pageurl.urlList.toTopicUpload.url;
                        //}
                        return false;
                    })
                },
                error:function(){
                    popup("没有内容了");
                    return false;
                }
            });
        },
        myUserClick:function(){
            var t=this;
            $("#my_user li").each(function(i,em){
                $(em).on("vclick",function(){
                    if($(em).attr("class")=="who_look_link"){//添加
                        setTimeout(function(){
                            if($(".user_list li").length<10){
                                $(".user_list").append("<li customerid="+$(em).attr("customerid")+">"+$(em).find(".who_name").text()+"，</li>");
                                $(em).removeClass("who_look_link").addClass("who_look_hover");
                            }
                        },300);
                    }else{//删除
                        setTimeout(function(){
                            $(em).removeClass("who_look_hover").addClass("who_look_link");
                            $this=$(em);
                            $(".user_list li").each(function(i,em){
                                if($(em).attr("customerid")==$this.attr("customerid")){
                                    $(em).remove();
                                }
                            });
                        },300);
                    }
                });
            });
        },

        //键盘事件
        keyUp:function(){
            var t=this;
            this.input=$("#user_input");
            var val = "",val2 = "",changeInterval;
            t.input.on("focus",function(){

                changeInterval = setInterval(function(){
                    val2 = t.input.val();
                    if(val != val2){
                        changeHandler(t.input.val());
                    }
                },500);
            });
            t.input.on("blur",function(){
                clearInterval(changeInterval);
            });
            t.input.on("change",function(){
                if(val != val2){
                    changeHandler(t.input.val());
                }
            });
            function changeHandler(keyWord){
                if(keyWord!=""){
                    $("#my_user").hide();
                    $("#loading").show();
                    var data={dataFlag:1,useFlag:1,logoUseFlag:3,searchParam:t.input.val(),pageIndex:1,pageSize:10,logoUseFlag:3};
                    $.ajax({
                        url: "/mcall/customer/unite/json_list/",
                        data:data,
                        type:"get",
                        dataType:"json",
                        success:function(data){
                            var html="";
                            $("#loading").hide();
                            if(data&&data.responseObject.responseStatus&&!$.isEmptyObject(data.responseObject.responseData)&&data.responseObject.responseData.data_list.length>0){
                                $(".yy_none_search").hide();
                                $("#search_user").show().html(t.getHtml(data,"who_look_mr"));
                            }else{
                                $("#search_user").hide();
                                $(".yy_none_search").show();
                            };
                            val = val2;
                            t.searchClick();
                        }
                    });

                }else{
                    $("#search_user").hide();
                    $("#my_user").show();
                }
            };
            $("#user_input").keyup(function(ev){
                //alert(ev.keyCode);   //13:enter键,188:逗号
                if($(this).val()==""){
                    //删除
                    if(ev.keyCode=="8"){
                        setTimeout(function(){
                            var userList=$(".user_list li");
                            var last=userList.eq(userList.length-1);
                            if(userList.length>0){
                                last.remove();
                                $.each($(".who_look_hover"),function(i,em){
                                    if($(em).attr("customerid")==last.attr("customerid")){
                                        $(em).removeClass("who_look_hover").addClass("who_look_link");
                                        return;
                                    }
                                })
                            }

                        },300);
                    }
                }
            });
        },
        //搜索列表点击
        searchClick:function(){

            var t=this;
            $("#search_user li").off("vclick").on("vclick",function(){
                $("#user_input").val("");
                var $this=$(this);
                var has=false;
                setTimeout(function(){
                    $(".user_list li").each(function(i,em){
                        if($(em).attr("customerid")==$this.attr("customerid")){
                            $(em).remove();
                            has=true;
                            return;
                        }
                    });
                    $.each($("#my_user li"),function(i,em){

                        if($(em).attr("customerid")==$this.attr("customerid")){
                            if($(em).attr("class")=="who_look_link"){
                                $(em).removeClass("who_look_link").addClass("who_look_hover");
                            }else{
                                $(em).removeClass("who_look_hover").addClass("who_look_link");
                            }
                        }
                    });
                    if(!has){
                        if($(".user_list li").length<10){
                            $(".user_list").append("<li customerid="+$this.attr("customerid")+">"+$this.find(".who_name").text()+"，</li>");
                        }
                    }
                },300);
            })
        },
        setLocalStorage:function(){
            var attention={};
            attention.attContent=[];
            var str= "";
            //if($(".user_list li").length>0){

                controller.refCustomerIdList = [];
            controller.remindCustomerIdList = "";
                $(".user_list li").each(function(i,em){

                    var customerId=$(em).attr("customerid");
                    var name=$(em).text().substring(0,$(em).text().length-1);
                    str += "<li>" + name + ",</li>";
                    controller.refCustomerIdList.push(customerId);
                    controller.remindCustomerIdList+="<a href="+customerId+">@"+name+"</a>";
                    //attention.attContent.push([customerId,name]);
                });
                    controller.updateParams();
                    if(str.length>0){
                       $("#rem_title").hide();
                       $("#rem_show").show();
                       $(".rem_list").show().html(str+"<div class=clear></div>");
                        controller.submitToggle();
                    }else{
                       $("#rem_title").show();
                       $("#rem_show").hide();
                       $(".rem_list").hide();
                    }
            //}

        }
    };


    controller.init();
    remindController.init();
});
