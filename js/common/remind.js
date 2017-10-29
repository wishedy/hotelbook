$(function(){
	var attention={};
	attention={
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
    		})
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
	            	t.getLocalStorage();
	            	t.keyUp();
            		$("#success").off("vclick").on("vclick",function(){
            			t.setLocalStorage();
            			//返回
						//goBack(document.referrer);
						window.location.href=document.referrer;
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
					var data={dataFlag:1,useFlag:1,logoUseFlag:3,searchParam:t.input.val(),pageIndex:1,pageSize:20,logoUseFlag:3,isAuthState:1};
					val = val2;
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
			            	t.seachClick();
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
							last=userList.eq(userList.length-1);
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
		seachClick:function(){
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
		//点击完成并且存储localStorage
		setLocalStorage:function(){
			var attention={};
			attention.attContent=[];
			if($(".user_list li").length>0){
				$(".user_list li").each(function(i,em){
					var customerId=$(em).attr("customerid");
					var name=$(em).text().substring(0,$(em).text().length-1);
					
					attention.attContent.push([customerId,name]);
				});
				if(this.source=="case"){//病例
					localStorage.setItem("caseAttStorage", JSON.stringify(attention));
				}else{//话题
					localStorage.setItem("tocAttStorage", JSON.stringify(attention));
				}
			}else{
				if(this.source=="case"){//病例
					TempCache.removeItem("caseAttStorage");
				}else{//话题
					TempCache.removeItem("tocAttStorage");
				}

			}
			
		},
		//获取localStorage
		getLocalStorage:function(){
			var t=this;
			if(localStorage.getItem("tocAttStorage")&&this.source=="topic"){
				var attention=JSON.parse(localStorage.getItem("tocAttStorage"));
				local(attention);
			}
			if(localStorage.getItem("caseAttStorage")&&this.source=="case"){
				var attention=JSON.parse(localStorage.getItem("caseAttStorage"));
				local(attention);
			}
			function local(attention){
				attContent=attention.attContent;
				var html="";
				$.each(attContent,function(i,n){
					html+="<li customerid="+attContent[i][0]+">"+attContent[i][1]+"，</li>";
					$.each($("#my_user li"),function(j,em){
						if(attContent[i][0]==$(em).attr("customerid")){
							$(em).removeClass("who_look_link").addClass("who_look_hover");
						}
					})
				});
				$(".user_list").append(html);
			}
		},
	};
	
	attention.init();
})
