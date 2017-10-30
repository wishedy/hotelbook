/**
 * Created by 萤火虫 on 2017/10/14.
 */
$(document).ready(function(){
    var editBanner = {
        path:{
            bannerList:"/web-ssm/imageDisRest/showImage"
        },
        el:{
          submit:$(".ev-submit"),
            uploadImage:$(".ev-uploadImg")
        },
        data:{
            formData:null,
            bannerList:[],
            nowIndex:0,
            editType:"4",
            id:0,
            pageSize:999,
            pageNum:1,
            editId:""
        },
        submitInfo:function(){
          var t = this;
            $(".ev-add-banner").off("mousedown").on("mousedown",function(){
                t.data.editType = '1';
            });
            t.el.submit.off("mousedown").on("mousedown",function(){
                console.log("确定");
                var bannerTypeObj = $(".ev-roomType");
                var jumpLinkObj = $("#ev-jumplink");
                var titleObj = $("#ev-title");
                var subTitle = $("#ev-subtitle");
                var imgList = $(".ev-img-item");
                if(imgList.length===0){
                    alert("请上传本位置的图片");
                    return false;
                }
                if(titleObj.val().length===0){
                    alert("请输入标题");
                    return false;
                }
                if(subTitle.val().length===0){
                    alert("请输入副标题");
                    return false;
                }
                var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
                if(!reg.test(jumpLinkObj.val())){
                    alert("请输入正确的网址例如:https://www.baidu.com/;或http://www.baidu.com/");
                    return false;
                }
                var activeOnOff = false;
                activeOnOff = (titleObj.val().length>0)&&(subTitle.val().length>0)&&(reg.test(jumpLinkObj.val()))&&(imgList.length>0);
                console.log(activeOnOff)
                if(activeOnOff){
                    var postData = {
                        title: titleObj.val(),
                        subtitle: subTitle.val(),
                        imgUrl: imgList.find("img").attr("src"),
                        RHtype:t.data.editType,
                        status:1,
                        jumpUrl:jumpLinkObj.val(),
                        type:bannerTypeObj.val()
                    };
                    if(t.data.editId){
                        postData.id = t.data.editId;
                    }
                    $.ajax({
                        url: t.path.bannerList,
                        type: 'post',
                        dataType: 'json',
                        timeout: 1000,
                        data: {paramJson: $.toJSON(postData)},
                        success: function (data, status) {
                            //debugger;
                            window.location.reload();
                        },
                        fail: function (err, status) {

                        }
                    });
                }

            });
            return t;
        },
        templateBanner:function(data){
          var t = this;
            var myTemplate = Handlebars.compile($("#tpl-user-info").html());
            //console.log(myTemplate(data))
            $('.ev-room-list').html(myTemplate(data));
            t.editBanner();
            return t;
        },

        createImage(file) {
            if(typeof FileReader==='undefined'){
                alert('您的浏览器不支持图片上传，请升级您的浏览器');
                return false;
            }
            var image = new Image();
            var vm = this;
            var leng=file.length;
            for(var i=0;i<leng;i++){
                var reader = new FileReader();
                reader.readAsDataURL(file[i]);
            }
            if(leng>0) {
                $.ajax({
                    url: "/web-ssm/uploads",
                    type: 'post',
                    dataType: 'json',
                    timeout: 1000,
                    data:vm.data.formData,
                    async:false,
                    cache:false,
                    contentType:false,
                    processData:false,
                    success: function (data, status) {
                        if(data.responseData.images.length){
                            $.each(data.responseData.images,function(i,v){
                                console.log(v);
                                $(".ev-postImage-container").html('<div class="col-md-6">'+
                                    '	<a href="javascript:;" class="thumbnail ev-img-item">'+
                                    '	<img src="'+v+'" alt="预览图">'+
                                    '	</a>'+
                                    '<span class="close-icon">X</span>'+
                                    '</div>');
                                $(".close-icon").off("click").on("click",function(){
                                    $(this).parent().remove();
                                });
                            });
                        }
                    },
                    fail: function (err, status) {
                        console.log(err)
                    }
                });
            }
        },
        editBanner:function(){
          var t = this;
            t.el.uploadImage.off("change").on("change",function(e){
                var ot = t;
                var files = e.target.files || e.dataTransfer.files;
                var filesData= $(this).get(0).files;
                //如果有选择图片则上传图片
                var formData= new FormData();
                if(filesData.length>0) {
                    for (var i = 0; i < filesData.length; i++) {
                        formData.append('files', files[i]);
                    }
                }
                ot.data.formData = formData;
                ot.createImage(files);
            });
            $(".ev-banner").off("mousedown").on("mousedown",function(){
                var nowObj = $(this);
                t.data.editType = "2";
                var nowIndex = parseInt(nowObj.attr("data-index"));
                var nowData = t.data.bannerList[nowIndex];
                t.data.editId = nowData.id;
                console.log(t.data.editId)
                //debugger;
                var bannerTypeObj = $(".ev-roomType");
                var jumpLinkObj = $("#ev-jumplink");
                var titleObj = $("#ev-title");
                var subTitle = $("#ev-subtitle");
                var imgList = $(".ev-img-item");
                jumpLinkObj.val(nowData.jumpUrl);
                titleObj.val(nowData.title);
                subTitle.val(nowData.subtitle);
                bannerTypeObj.find("option[value='"+nowData.type+"']").attr("selected",true);
                $(".ev-postImage-container").html('<div class="col-md-6">'+
                    '	<a href="javascript:;" class="thumbnail ev-img-item">'+
                    '	<img src="'+nowData.imgUrl+'" alt="预览图">'+
                    '	</a>'+
                    '<span class="close-icon">X</span>'+
                    '</div>');
                $(".close-icon").off("click").on("click",function(){
                    $(this).parent().remove();
                });
            });
            $(".ev-delete-room").off("mousedown").on("mousedown",function(){
                var isThis = $(this);
                alert("您确定要删除")
                var nowIndexData = t.data.bannerList[parseInt(isThis.attr("data-index"))];
                t.data.nowIndex = isThis.attr("data-index");
                t.data.editType = '3';
                t.data.editId = nowIndexData.id;
                var postData = {
                    RHtype:t.data.editType,
                    id:t.data.editId
                };
                $.ajax({
                    url: t.path.bannerList,
                    type: 'post',
                    dataType: 'json',
                    timeout: 1000,
                    data: {paramJson: $.toJSON(postData)},
                    success: function (data, status) {
                        window.location.reload();
                    }
                });
            });
            return t;
        },
        showList:function(){
          var t = this;
            $.ajax({
                url: t.path.bannerList,
                type: 'post',
                dataType: 'json',
                timeout: 1000,
                data: {paramJson: $.toJSON({RHtype:'4',pageNum:t.data.pageNum, pageSize:t.data.pageSize})},
                success: function (data, status) {

                    var newData = [];
                    $.each(data.responseData.result.list,function(i,v){
                        var type = parseInt(v.type,10);
                        console.log(type)
                        if(type===1||type===6||type===2||type===7){
                            newData.push(v);
                        }
                    });
                    t.data.bannerList = newData;
                    var dataJson = {
                        list:newData
                    };
                    t.templateBanner(dataJson);
                },
                fail: function (err, status) {

                }
            });
            return t;
        },
        registerFilter:function(){
          var t = this;
            Handlebars.registerHelper("bannerType",function(v){
                var dataJson = {
                  "1":"首页",
                  "6":"合作共赢",
                  "2":"酒店预订",
                  "7":"关于我们"
                };
                return dataJson[v+""];
            });
            return t;
        },
        init:function(){
            var t = this;
            t.registerFilter().showList().editBanner().submitInfo();
            return t;
        }
    };
    editBanner.init();
});