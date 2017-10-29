/**
 * 功能描述：  输入框输入文字，标题上浮，字数倒数   参照个人首页发布类
 * 使用方法: comm.textChange({"$tex":$(""),"$num":$(""),"noTop":1});
 * 注意事件：
 * 引入来源：  作用：
 *
 * Created by LiChunHui on 2015/3/27.
 */
String.prototype.subByte = function (start, bytes)
{
    for (var i=start; bytes>0; i++)
    {
        var code = this.charCodeAt(i);
        bytes -= code<256 ? 1 : 2;
    }
    return this.slice(start,i)
};
comm.textChange=function(obj){
    var options={};
    var o={
        minTop:24,
        maxTop:32
    };
    options= $.extend(o,obj);
    var ie = jQuery.support.htmlSerialize; //是否ie
    var str = 0;//汉字的个数
    var abcnum = 0; //非汉字个数
    var maxNum = maxNum; //最大字符数
    var texts= 0;
    options.$tex.bind("focus",function(){
        options.$tex.parent().parent().find(".default_name").css("color","#3d84c6");
    })
    options.$tex.bind("blur",function(){
        options.$tex.parent().parent().find(".default_name").css("color","#808080");
    });
    //文本框字数计算和提示改变
    if(!!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1)){//ie
        options.$tex.bind("propertychange",function(){
            changeNum();
        });
        options.$tex.bind("keyup",function(){
            changeNum();
        });
    }else{//非ie
        options.$tex.bind("keyup keydown change input cut paste drop",function(){
            changeNum();
        })
    }
    function changeNum(){
        //汉字的个数
        //str = (options.$tex.val().replace(/\w/g,"")).length;
        //非汉字的个数
        //abcnum = options.$tex.val().length-str;
        var total=comm.getByteLen(options.$tex.val());//str*2+abcnum;
        maxNum = options.$tex.attr("max")*2;
        if(!options.noTop){
            if(total==0){
                options.$tex.parent().parent().find(".default_name").hide();
                options.$tex.parent().css("top",options.minTop);
            }else{
                options.$tex.parent().parent().find(".default_name").show();
                options.$tex.parent().css("top",options.maxTop);
            }
        }
        if(total<maxNum || total == maxNum){ //未超出
            texts =Math.ceil((maxNum - total)/2);
            //texts= maxNum - abcnum;
            if(options.$num) {
                options.$num.text(texts);
                if (texts == 0) {
                    options.$num.css("color", "#F00");
                } else {
                    options.$num.css("color", "#c5c5c5");
                }
            }
        }else if(total>maxNum){ //超出规定字符
            options.$tex.val(options.$tex.val().subByte(0,maxNum));
            if(options.$num) {
                options.$num.text(0).css("color", "#F00");
            }
        }
    }
}