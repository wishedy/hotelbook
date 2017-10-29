(function($){
    $.fn.scroll = function(options){
        var scroll = {
            options:options,
            maxTop:$(window).height(),
            init:function(){
                var t = this;
                t.scrollBegin().content();
                return t;
            },
            content:function(){
              var t = this;
              $(".Gambier-detail-bar").html("<a href='"+t.options.link+"'>"+t.options.text+"</a>")
              return t;
            },
            scrollBegin:function(){
                var t = this;
                $(document).off("scroll").on("scroll",function(){
                   var nowTop = $(document).scrollTop();
                   var scrollObj = $(".Gambier-top")
                   if(nowTop>t.maxTop){
                       scrollObj.fadeIn();
                   }else{
                       scrollObj.fadeOut();
                   }
                   scrollObj.off("click").on("click",function(){
                       $('html, body').animate({scrollTop: 0}, 800);
                   });
                });
                return t;
            }
        };
        scroll.init();
    };
})(jQuery);