/*
*a 发布时间 
*b 当前时间
*local_time() 获取客户端时间并格式化为2014-03-07 10:15:02
*am_pm_data(a) 规则:上午 10:20 2014年3月12日
*diffDay_one(a,b)规则:刚刚<1分<1小时<1天<7天<日期
*diffDay_two(a,b)规则:7天前<日期
*date_word(a) 规则:2014年3月17日
*cut_date_msec(a) 解除毫秒 如:2014-03-07 10:15:02.0
*/

function local_time(){
	var local = new Date(); 
	var year = local.getFullYear(); 
	var month = local.getMonth()+1;
		if(month<10){
			month = "0"+month;
		}
	var day = local.getDate();
		if(day<10){
			day = "0"+day;
		}
	var time = local.toTimeString().substr(0,8);
	var local_time = year+"-"+month+"-"+day+" "+time;
	return local_time;
}

function am_pm_data(ampm){
	var year = ampm.substr(0,4);
	var month = ampm.substr(5,2);
	var day = ampm.substr(8,2);
	var hour = ampm.substr(11,2);
	if(hour<12){
		day_ampm = "上午 ";
	}else if(hour=12){
		day_ampm = "中午 ";
	}else if(hour>12){
		day_ampm = "下午 ";
	}
	var minute = ampm.substr(14,2);
	ampm = day_ampm+hour+":"+minute+" "+year+"年"+month+"月"+day+"日";
	return ampm;
}

function cut_date_msec(java_date){
	var java_date = java_date.substr(0,19);
	return java_date;
}

function diffDay_one(dateStrBefore, dateStrAfter) {
    if(dateStrBefore==undefined){
        return;
    }
	var dateStrBefore1 = dateStrBefore.substr(0,10); //发布时间
	var dateStrAfter1 = dateStrAfter.substr(0,10); //传入系统时间
	var dateStrBefore2 = dateStrBefore1.replace(/\-/g, '/');
	var dateStrAfter2 = dateStrAfter1.replace(/\-/g, '/');
	
	var days = 1000 * 60 * 60 * 24;
	var day1 = Date.parse(dateStrBefore2);
	var day2 = Date.parse(dateStrAfter2);
	if (isNaN(day1)) {
		alert(dateStrBefore + "格式不正确");
		return NaN;
	}
	if (isNaN(day2)) {
		alert(dateStrAfter + "格式不正确");
		return NaN;
	}
	var d = (day2 - day1) / days;
	if(d<1){//秒分小时
		var dateStrB = new Date(dateStrBefore.replace(/\-/g, '/').substring(0,18));
		var dateStrA = new Date(dateStrAfter.replace(/\-/g, '/'));
		var A_B = (dateStrA.getTime()-dateStrB.getTime())/1000;
		if(A_B<60){ //
			return "刚刚";//A_B+"秒前";
		}else{
			A_B = parseInt(A_B/60);
			if(A_B<60){//
				return A_B+"分钟前";
			}else{
				A_B = parseInt(A_B/60);
				if(A_B<60){
					return A_B+"小时前";
				}
			}
		}
	}else{
		if(d<8){
			return d+"天前";
		}else{
			return dateStrBefore.substr(0,10); //显示日期
			//return dateStrBefore; //显示到秒
		}
		
	}
}

function diffDay_two(dateStrBefore, dateStrAfter){
	var dateStrBefore1 = dateStrBefore.substr(0,10); 
	var dateStrAfter1 = dateStrAfter.substr(0,10);  
	
	var dateStrBefore2 = dateStrBefore1.replace(/\-/g, '/');
	var dateStrAfter2 = dateStrAfter1.replace(/\-/g, '/');
	
	var days = 1000 * 60 * 60 * 24;
	var day1 = Date.parse(dateStrBefore2);
	var day2 = Date.parse(dateStrAfter2);
	if (isNaN(day1)) {
		alert(dateStrBefore + "格式不正确");
		return NaN;
	}
	if (isNaN(day2)) {
		alert(dateStrAfter + "格式不正确");
		return NaN;
	}
	var d = (day2 - day1) / days;
	if(d>7){
		//return dateStrBefore; //显示到秒
		return dateStrBefore.substr(0,10);//显示日期
	}else{
		return "7天前";
	}	
}

function date_word(a){
	var year = a.substr(0,4);
	var month = a.substr(5,2);
	var day = a.substr(8,2);
	if(month<10){
		month = month.substr(1,1);
	}
	if(day<10){
		day = day.substr(1,1);
	}
	a = year+"年"+month+"月"+day+"日";
	return a
}


//*月*日
function datafomat(tar){
	var obj=tar;
	var text;
	obj.each(function(i) {
		text=date_word(obj.eq(i).html());
		obj.eq(i).html(text.substring(text.indexOf('年')+1))
	});
};


