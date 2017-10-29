/**
 * Created by 萤火虫 on 2017/10/12.
 */
$(document).ready(function(){
    var editRoom = {
        el: {
            roomId: $(".ev-roomId"),
            roomName: $(".ev-roomName"),
            roomType: $(".ev-roomType"),
            roomService: $(".ev-roomService"),
            roomState: $(".ev-roomState"),
            roomPrice: $(".ev-roomPrice"),
            roomPriceType: $(".ev-roomPriceType"),
            roomDes: $(".ev-roomDes"),
            uploadImage:$(".ev-uploadImg")
        },
        path:{
            roomUrl:"//47.94.225.154:8081/web-ssm/hotelRest/submit",
        },
        data: {
            tempData: {
                roomId: null,
                title: "",
                roomType: null,
                desc: "",
                price: "",
                aud: null,
                idle: null,
                service: "",
                imgUrl: ""
            },
            pageSize:10,
            pageNum:1,
            editId:"",
            nowIndex:-1,
            editType:'4',
            imagesData:[],
            formData:{}
        },
        editRoomInfo:function(){
          var t = this;
            t.el.roomId.off("input propertychange").on("input propertychange",function(){
                var isThis = $(this);
                var str =  isThis.val();
                if(!/^[0-9]*$/.test(str)){
                    isThis.val(str.substring(0,str.length-1));
                }
            });
            t.el.roomPrice.off("input propertychange").on("input propertychange",function(){
                var isThis = $(this);
                var str =  isThis.val();
                if(!/^[0-9]*$/.test(str)){
                    isThis.val(str.substring(0,str.length-1));
                }
            });
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
                reader.onload =function(e){
                    vm.data.imagesData.push(e.target.result);
                };
            }
            if(leng>0) {
                $.ajax({
                    url: "//47.94.225.154:8081/web-ssm/uploads",
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
                            vm.data.tempData.imgUrl = "";
                            $.each(data.responseData.images,function(i,v){
                                if(i>0){
                                    vm.data.tempData.imgUrl+=","+v;
                                }else{
                                    vm.data.tempData.imgUrl+=v;
                                }
                                $(".ev-postImage-container").append('<div class="col-md-6">'+
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
            console.log($(".ev-add-room"))
            $("#ev-add-room").off("mousedown").on("mousedown",function(){
                t.data.editType = '1';//新增
                t.data.nowIndex = -1;
            });
            $(".ev-submitInfo").off("click").on("click",function(){
                var serviceObj = $(".ev-roomService.active");
                var stateObj = $(".ev-roomState.active");
                var imgList = $(".ev-img-item");
                if (t.el.roomId.val().length === 0) {
                    alert("请您输入房间编号！");
                    return false;
                }
                if (t.el.roomName.val().length === 0) {
                    alert("请您输入房间名称！");
                    return false;
                }
                if (t.el.roomDes.val().length === 0) {
                    alert("请您输入房间相关描述！");
                    return false;
                }
                if (t.el.roomPrice.val().length === 0) {
                    alert("请您输入房间价格！");
                    return false;
                }
                if (t.el.roomType.val().length === 0) {
                    alert("请您输入房间标准！");
                    return false;
                }
                if (t.el.roomPriceType.val().length === 0) {
                    alert("请您输入货币类型！");
                    return false;
                }
                if (serviceObj.length === 0) {
                    alert("请您选择服务类型！");
                    return false;
                }
                if (stateObj.length === 0) {
                    alert("请您选择房间当前状态！");
                    return false;
                }
                if (imgList.length === 0) {
                    alert("请您上传房间照片！");
                    return false;
                }
                var allOkOnOff = (t.el.roomId.val().length!==0)&&(t.el.roomName.val().length !== 0)&&(t.el.roomDes.val().length !== 0)&&(t.el.roomPrice.val().length !== 0)&&(t.el.roomPriceType.val().length !== 0)&&(serviceObj.length !== 0)&&(stateObj.length !== 0)&&(imgList.length !== 0)&&(t.el.roomType.val().length !== 0);
                if(allOkOnOff){
                    var serviceStr = "";
                    var imgStr = "";
                    serviceObj.each(function(i){
                        if(i==0){
                            serviceStr+=$(this).parent().index()+"";
                        }else{
                            serviceStr+=","+$(this).parent().index()+"";
                        }
                    });
                    imgList.each(function(i){
                        if(i==0){
                            imgStr+=$(this).find("img").attr("src")+"";
                        }else{
                            imgStr+=","+$(this).find("img").attr("src")+"";
                        }
                    });

                    var postData = {
                        roomId: t.el.roomId.val(),
                        title: t.el.roomName.val(),
                        roomType: t.el.roomType.val(),
                        description: t.el.roomDes.val(),
                        price: t.el.roomPrice.val(),
                        aud: t.el.roomPriceType.val(),
                        idle: stateObj.index(),
                        service: serviceStr,
                        imgUrl: imgStr,
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
                        },
                        fail: function (err, status) {

                        }
                    });
                }
            });


        },
        templateRoomInfo:function(){
            var t = this;
            $(".ev-edit-roomInfo").off("mousedown").on("mousedown",function(){
                var isThis = $(this);
                var nowIndexData = t.roomList[parseInt(isThis.attr("data-index"))];
                t.data.nowIndex = isThis.attr("data-index");
                t.data.editType = '2';
                t.data.editId = nowIndexData.id;
                t.el.roomId.val(nowIndexData.id);
                t.el.roomName.val(nowIndexData.title);
                t.el.roomDes.val(nowIndexData.desc);
                t.el.roomPrice.val(nowIndexData.price);
                t.el.roomType.val(nowIndexData.roomType);
                t.el.roomType.find("option[value='"+nowIndexData.roomType+"']").attr("selected",true);
                t.el.roomPriceType.find("option[value='"+nowIndexData.aud+"']").attr("selected",true);
                t.el.roomState.eq(parseInt(nowIndexData.idle,10)).trigger("click");
                var serviceList = nowIndexData.service.split(",");
                $.each(serviceList,function(i,v){
                    t.el.roomService.eq(parseInt(v,10)).trigger("click");
                });
                var imgList = nowIndexData.imgUrl.split(",");
                var imgStr = "";
                $.each(imgList,function(i,v){
                    imgStr+='<div class="col-md-6">'+
                        '	<a href="javascript:;" class="thumbnail ev-img-item">'+
                        '	<img src="'+v+'" alt="预览图">'+
                        '	</a>'+
                        '<span class="close-icon">X</span>'+
                        '</div>';
                });
                $(".ev-postImage-container").html(imgStr);
                $(".close-icon").off("click").on("click",function(){
                    $(this).parent().remove();
                });
            });
            $(".ev-search-list").off("click").on("click",function(){
               window.location.reload();
            });
            $(".ev-search-room").off("mousedown").on("mousedown",function(){
                var isThis = $(this);
                var searchStr = $("#firstName").val();
                t.data.editType = "4";
                if(!/^[0-9]*$/.test(searchStr)){
                    alert("请输入正确的编号");
                }else{
                    var postData = {
                        roomId: searchStr,
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
            $(".ev-delete-room").off("mousedown").on("mousedown",function(){
                var isThis = $(this);
                alert("您确定要删除")
                var nowIndexData = t.roomList[parseInt(isThis.attr("data-index"))];
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
        templateRoom:function(data){
          var t = this;
            var myTemplate = Handlebars.compile($("#tpl-room-info").html());
            //console.log(myTemplate(data))
            $('.ev-room-list').html(myTemplate(data));
            t.templateRoomInfo();
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
                    t.showRoom();
                }

            });
            return t;
        },
        showRoom:function(){
          var t = this;
            $.ajax({
                url: t.path.roomUrl,
                type: 'post',
                dataType: 'jsonp',
                timeout: 1000,

                data:{paramJson: $.toJSON({pageNum:t.data.pageNum,pageSize:t.data.pageSize,RHtype:t.data.editType})},
                success: function (data, status) {
                    t.roomList = data.responseData.result.list;
                    t.templatePage(data.responseData.result.pages);
                    t.templateRoom(data.responseData.result);

                },
                fail: function (err, status) {
                    console.log(err)
                }
            });
            return t;
        },
        registerHandelBar:function(){
          var t = this;
            Handlebars.registerHelper("filterRoomType", function (v) {
                var roomList = ["单人间", "双人间/标准间", "大床间", "三人间", "套间", "商务间"];
                return roomList[parseInt(v, 10)];
            });
            Handlebars.registerHelper("money",function(v1,v2){
               var moneyType = ["¥","$","aud"];
                return moneyType[parseInt(v1)]+v2;
            });
            Handlebars.registerHelper("checkRoomState",function(v){
                var state = ["闲置","已预订","已入住"];
                if(v&&v.length===0){
                    v = 0;
                }else{
                    if(!v){
                        v = 0;
                    }
                }
               return state[parseInt(v)];
            });
            Handlebars.registerHelper("imgLen",function(v){
               return v.split(",").length;
            });
            Handlebars.registerHelper("serviceList",function(v){
               console.log(v.split(","));
                var serviceNameList = ["房间预定","贵宾服务","机场接送","酒店入住","房间备品","房间设施","酒店服务","结账离店","每天送酒","管家服务","延迟退房"];
                var serviceArr = v.split(",");
                var serviceStr = "";
                $.each(serviceArr,function(index,value){
                    if(index===0){
                        serviceStr+=serviceNameList[parseInt(value)];
                    }else{
                        serviceStr+=","+serviceNameList[parseInt(value)];
                    }
                });
                return serviceStr;
            });
            return t;
        },
        init:function(){
            var t = this;
            t.registerHandelBar().showRoom().editRoomInfo().submitInfo();
        }
    };
    editRoom.init();

});