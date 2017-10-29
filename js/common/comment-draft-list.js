/**
 * 功能描述：
 * 使用方法:
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by LiChunHui on 2015/9/29.
 */
$(function(){
    var para=Common.getpara();
    resourceId=para.resourceId;
    resourceType=para.resourceType;
    pageSize=11;
    scrollpage=2;
    var isScroll=false;
    $(".case_fh").on("vclick",function(){
        window.location.href=localStorage.getItem("draftListLastHref");
    })
    $.ajax({
        type : "get",
        url : "/mcall/customer/draft/getCustomerDraftList/",
        data : {resourceId:resourceId,reviewType:resourceType,refType:8,attUseFlag:3,useFlag:3,pageIndex:1,pageSize:pageSize},
        dataType : "json",
        success : function(rep){
            list(rep);
            if(isScroll){
                (function(){
                    $(".draft_ul").scrollPagination({
                        'contentPage':"/mcall/customer/draft/getCustomerDraftList/",
                        'type':'GET',
                        'noParamJson':1,
                        'contentData':{resourceId:resourceId,reviewType:resourceType,refType:8,attUseFlag:3,useFlag:3,pageIndex:function(){return scrollpage++},pageSize:pageSize},
                        'scrollTarget': $(window),
                        'heightOffset': 0,
                        'delaytime':1000,
                        'beforeLoad': function(){
                            if(isScroll){
                                $.mobile.loading("show");
                            }else{
                                $(".draft_ul").attr("scrollpagination","disbaled");
                                return false;
                            }
                        },
                        'afterLoad': function(elementsLoaded){
                            $.mobile.loading("hide");
                        },
                        'loader':function(data){
                            list(data);
                        }
                    });
                })();
            }
        },
        error:function(){}
    });

    function list(rep){
        var html="";
        isScroll=false;
        if(rep&&rep.responseObject&&rep.responseObject.responseData) {
            if (rep.responseObject.responseData.data_list && rep.responseObject.responseData.data_list.length > 0) {
                if(rep.responseObject.responseData.data_list.length==pageSize){
                    isScroll=true;
                }else{
                    isScroll=false;
                }
                $.each(rep.responseObject.responseData.data_list, function (i, val) {
                    review = val.customer_review;
                    title = "";
                    att = "";

                    if (review.parentId) {//有回复父级
                        title = "＂" + Common.cutstr(review.review_title, 30) + "＂";
                    } else {//针对资源的回复
                        title = "《" + Common.cutstr(review.review_title, 30) + "》";
                    }

                    if (val.customer_review_attachment && val.customer_review_attachment.length > 0) {
                        $.each(val.customer_review_attachment, function (j, obj) {
                            if (j < 3) {
                                att += '<li><img src="' + obj.attUrl + '"/></li>';
                            }
                        })
                    }

                    html += '<li>' +
                    '<div class="draft_l_content">' +
                    '<div class="draft_l_top">' +
                    '<div class="d_l_fl">评论</div>' +
                    '<div class="d_l_time">最后编辑于' + diffDay_one(val.last_update_time, local_time()) + '</div>' +
                    '<div class="d_l_but"><a href="/pages/common/comment.html?id=' + review.id + '&draft=1" data-ajax="false"><img src="/images/img50/draft/edit_again_but.png" /></a></div>' +
                    '</div>' +
                    '<div class="d_l_title d_l_title_hf">回复了' + title + '</div>' +
                    '<div class="d_l_text">' + (review.reviewContent ? Common.cutstr(review.reviewContent, 44) : '') + '</div>' +
                    '<div class="d_l_case_img">' +
                    '<ul>' + att + '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                });
                $(".draft_ul").append(html);
            }
        }
    }
})

