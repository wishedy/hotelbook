/**
 * Created by 萤火虫 on 2017/10/15.
 */
var editObj = {
    init:function(type){
        console.log("编辑业务");
        var t = this;
        t.data.type = type;
        t.showList(type).submitInfo();
        return t;
    },
    data:{
        editType:"4",
        pageNun:1,
        pageSize:999,
        type:"5",
        editId:""
    },
    path:{
        roomUrl:"//www.hotelbook.cn/web-ssm/imageDisRest/showImage"
    },
    el:{
        submit:$(".ev-submit"),
        uploadImage:$(".ev-uploadImg")
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
                url: "//www.hotelbook.cn/web-ssm/uploads",
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
    submitInfo:function(){
      var t = this;
        $(".ev-add-info").off("mousedown").on("mousedown",function(){
            t.data.editType = "1";
        });

        t.el.submit.off("mousedown").on("mousedown",function(){
            var title =$(".ev-title");
            var desObj = $(".ev-des");
            var imgList = $(".ev-img-item");
            if(title.length===0){
                alert("请输入业务名称");
            }
            if(desObj.length===0){
                alert("请输入该业务的描述");
            }
            if(imgList.length===0){
                alert("请上传该业务照片");
            }
            var activeOnOff = (title.length!==0)&&(desObj.length!==0)&&(imgList.length!==0);
            if(activeOnOff){
                var postData = {
                    title: title.val(),
                    imgUrl: imgList.find("img").attr("src"),
                    content:desObj.val(),
                    type:t.data.type,
                    RHtype:t.data.editType
                };
                if(parseInt(t.data.editType,10)!==1){
                    postData.id = t.data.editId;
                }
                $.ajax({
                    url: t.path.roomUrl,
                    type: 'post',
                    dataType: 'json',
                    timeout: 1000,
                    data: {paramJson: $.toJSON(postData)},
                    success: function (data, status) {
                        window.location.reload();
                    },
                    fail: function (err, status) {

                    }
                });
            }
        });

        return t;
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
        console.log($(".ev-edit-roomInfo"))
        $(".ev-edit-info").off("mousedown").on("mousedown",function(){
            t.data.editType = "2";
            var isThis = $(this);
            var nowIndexData = t.data.bannerList[parseInt(isThis.attr("data-index"))];
            var title =$(".ev-title");
            var desObj = $(".ev-des");
            t.data.nowIndex = isThis.attr("data-index");
            t.data.editId = nowIndexData.id;
            var imgStr = "";
            imgStr+='<div class="col-md-6">'+
                '	<a href="javascript:;" class="thumbnail ev-img-item">'+
                '	<img src="'+nowIndexData.imgUrl+'" alt="预览图">'+
                '	</a>'+
                '<span class="close-icon">X</span>'+
                '</div>';
            desObj.val(nowIndexData.content);
            title.val(nowIndexData.title);
            $(".ev-postImage-container").html(imgStr);
            $(".close-icon").off("click").on("click",function(){
                $(this).parent().remove();
            });
        });
        $(".ev-delete-room").off("mousedown").on("mousedown",function(){
            var isThis = $(this);
            alert("您确定要删除");
            var nowIndexData = t.data.bannerList[parseInt(isThis.attr("data-index"))];
            t.data.nowIndex = isThis.attr("data-index");
            t.data.editType = '3';
            t.data.editId = nowIndexData.id;
            var postData = {
                RHtype:t.data.editType,
                id:t.data.editId
            };
            $.ajax({
                url: t.path.roomUrl,
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
    templateBanner:function(data){
        var t = this;
        var myTemplate = Handlebars.compile($("#tpl-user-info").html());
        //console.log(myTemplate(data))
        $('.ev-info-list').html(myTemplate(data));
        t.editBanner();
        return t;
    },
    showList:function(){
        var t = this;
        var postData = {
            type:t.data.type,
            RHtype:t.data.editType,
            pageNum:t.data.pageNun,
            pageSize:t.data.pageSize
        };
        $.ajax({
            url: t.path.roomUrl,
            type: 'post',
            dataType: 'json',
            timeout: 1000,
            data: {paramJson: $.toJSON(postData)},
            success: function (data, status) {
                t.data.bannerList = data.responseData.result.list;
                t.templateBanner(data.responseData.result);
            }
        });
        return t;
    }
};