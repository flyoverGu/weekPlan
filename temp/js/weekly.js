$(function(){
	var name="",
		projs = [
			{'qianniu':'千牛'},
			{'dianzhang':'店长'},
			{'jixiao':'绩效'},
			{'yunying':'运营'},
			{'houtai':'后台'},
			{'qianduan':'前端'},
			{'qita':'其他'}
		],
		subProjs = {
			'qianniu':['超级营销','超级商品','超级交易','超级会员','超级促销','超级供销','超级数据','基础库'],
			'dianzhang':['店铺管理','营销推广','模板素材','数据分析','用户中心','基础问题','其他'],
			'jixiao':['绩效主体','绩效活动','其他'],
			'yunying':['静态活动','分销平台','其他'],
			'houtai':['模板库','其他'],
			'qianduan':['基础库','框架','其他'],
			'qita':['其他']
		};

	if(window.sessionStorage && window.sessionStorage.getItem("username")){
		name = "顾天桥";
	}else{
		$(".overlay").show();
	}

	$(".overlay").hide();
	$("#inputuser").on("click",function(){
		var user = $("#username").val();
		if(!user){
			alert("姓名不能为空");
			return;
		}
		name = user;
		if(window.sessionStorage){
			sessionStorage.setItem("username",user);
		}

		$(".overlay").hide();
	});

	$(".task_nav").on("click",function(e){
		var index = $(e.target).data("index"),
			position = $(this).data("position"),
			$pre;
		if(!index){
			return;
		}else if(index == "last"){
			//last-child
			$pre = $(e.target).prev();
			if($pre.length && $pre.data("index")){
				index = $pre.data("index")+1;
			}else{
				index = 1;
			}
			//index = $(this).children().length;
			$(this).children().last().before('<li data-index="'+ index +'">任务'+ index +'</li>');
			$("#task_dash_"+position).append(taskTemplate(position,index,projs,subProjs));
		}

		$(".task_content_"+position+"[data-index!='"+ index +"']").hide();
		$(".task_content_"+position+"[data-index='"+ index +"']").show();	

		$(this).find(".active").removeClass("active");
		$(this).find("li[data-index='"+ index +"']").addClass("active");
	}).on("dblclick",function(e){
		var index = $(e.target).data("index"),
			position = $(this).data("position");
		if(!index || index == "last"){
			return;
		}

		$(e.target).remove();
		$(".task_content_"+position+"[data-index='"+ index +"']").remove();

		//展示前一个
		$(this).find("li[data-index='"+ (index-1) +"']").addClass("active");
		$(".task_content_"+position+"[data-index='"+ (index-1) +"']").show();
	});

	$(".btm_nav li").on("click",function(e){
		var cls = $(e.target).data("class");
		$(this).addClass("active").siblings().removeClass("active");
		$("."+cls).show().siblings().hide();
	});

	$(".m_con").on("change",".projSel",function(){
		var proj = $(this).find("option:selected").data("code"),
			opts = genSubProjOpt(subProjs[proj]);

		$(this).parentsUntil("form").find(".subProjSel").html(opts);
	});

	$("#serialize").on("click",function(){
		var lastArray = serializeForm(".task_form_left"),
			planArray = serializeForm(".task_form_right"),
			curDate = new Date(),
			html = "",
			reportObj = {	
							name:name,
							date:curDate.getFullYear()+"-"+(curDate.getMonth()+1)+"-"+curDate.getDate(),
							last:lastArray,
							plan:planArray	
						};

		$("#serializedCode").val(JSON.stringify(reportObj)+";;");

		html = parseReport(reportObj);
		$("#preview").html(html);
		$("#htmlCode").val(html);
		$("li[data-class='preview_tab']").trigger("click");
		
	});

	/**
     * 序列化表单为json数组
     * @param selector 表单选择器
     * return 表单json数组
     */
	function serializeForm(selector){
		var array = [];
		$(selector).each(function(index){
			var form = $(this).serializeArray(),
				obj = {index:index + 1},
				i = 0,
				j = form.length;
			for(; i < j;i ++){
				obj[form[i].name] = form[i].value;
			}
			array.push(obj);
		});

		return array;
	}
	/**
     * 报表对象解析成报表
     * @param reportOjb 报表对象
     * return 报表html
     */
	function parseReport(reportObj){
		var hl = "",i,j,obj,head,
			comTdCss = 'border: solid 1px #DDD;background-color: #F7F7F7;padding: 4px 12px;font-family: monospace;font-size: 12px;',
			tableSty = ' style="margin: 15px;width: 765px;border-collapse:collapse;border-spacing: 0; text-align: left;" ',
			h2Sty = ' style="color:#888;text-align: left;font-size: 16px;padding: 5px 15px 0 15px;margin:0;" ',
			firstTrTdSty = ' style="text-align: center;background-color: #999;color: #FFF;border: solid 1px #DDD;font-weight: normal;font-family: \'Microsoft YaHei\', \'WenQuanYi Micro Hei\', \'tohoma,sans-serif\';" ',
			tdComSty = ' style="min-width: 40px;text-align:center;color: #888;'+ comTdCss +'" ',
			tdComLeftSty = ' style="min-width: 40px;text-align:left;color: #888;'+ comTdCss +'" ',
			tdComCenSty = ' style="min-width: 60px;text-align: center;color: #888;'+ comTdCss +'" ',
			tdFirstSty = ' style="min-width: 40px;text-align:center;color:#258AAF;'+ comTdCss +'" ';

		head = '<table '+ tableSty +'>'
					+'<tr>'
						+'<td '+ firstTrTdSty +'>平台</td>'
						+'<td '+ firstTrTdSty +'>项目</td>'
						+'<td '+ firstTrTdSty +'>类型</td>'
						+'<td '+ firstTrTdSty +'>任务</td>'
						+'<td '+ firstTrTdSty +'>状态</td>'
						+'<td '+ firstTrTdSty +'>备注</td>'
					+'</tr>';

		if (reportObj.last.length) {
			hl = '<h2 '+ h2Sty +'>上周工作：</h2>' + head;
			for(i = 0,j = reportObj.last.length; i < j; i ++){
				obj = reportObj.last[i]
				hl += '<tr>'
						+'<td '+ tdFirstSty +'>'+ obj.project +'</td>'
						+'<td '+ tdComCenSty +'>'+ obj.subProject +'</td>'
						+'<td '+ tdComSty +'>'+ obj.projectType +'</td>'
						+'<td '+ tdComLeftSty +'>'+ obj.task +'</td>'
						+'<td '+ tdComSty +'>'+ obj.status +'</td>'
						+'<td '+ tdComLeftSty +'>'+ obj.comment +'</td>'
					+'</tr>';
			}

			hl += '</table>';
		};

		if (reportObj.plan.length) {
			hl += '<h2 '+ h2Sty +'>本周计划：</h2>' + head;

			for(i = 0,j = reportObj.plan.length; i < j; i ++){
				obj = reportObj.plan[i]
				hl += '<tr>'
						+'<td '+ tdFirstSty +'>'+ obj.project +'</td>'
						+'<td '+ tdComCenSty +'>'+ obj.subProject +'</td>'
						+'<td '+ tdComSty +'>'+ obj.projectType +'</td>'
						+'<td '+ tdComLeftSty +'>'+ obj.task +'</td>'
						+'<td '+ tdComSty +'>'+ obj.status +'</td>'
						+'<td '+ tdComLeftSty +'>'+ obj.comment +'</td>'
					+'</tr>';
			}

			hl += '</table>';
		};

		return hl;
	}
	/**
     * 表单模板
     * @param position 位置
     * @param index 索引
     * @params projs 平台对象数组
     * @params subProjs 项目明细对象
     * return 表单模板html
     */
	function taskTemplate(position,index,projs,subProjs){
		var reportType = position == "left" ? "lastWeek":"thisWeek";
		var html = '<div class="task_content_'+ position +'" data-index="'+ index +'" style="display:none;">'
					+'<form action="" class="task_form_'+ position +'">'
						+'<input type="hidden" name="reportType" value="'+ reportType +'">'
						+'<table>'
							+'<tr>'
								+'<td>平台</td>'
								+'<td>'
								+'<select name="project" class="projSel">'+ genProjOpt(projs) +'</select>'
								+'</td>'
							+'</tr>'
							+'<tr>'
								+'<td>项目</td>'
								+'<td>'
									+'<select name="subProject" class="subProjSel">'+ genSubProjOpt(subProjs['qianniu']) +'</select>'
								+'</td>'
							+'</tr>'
							+'<tr>'
								+'<td>类型</td>'
								+'<td>'
									+'<select name="projectType" id="">'
										+'<option value="pc">PC</option>'
										+'<option value="移动">移动</option>'
									+'</select>'
								+'</td>'
							+'</tr>'
							+'<tr>'
								+'<td>任务名称</td>'
								+'<td>'
									+'<input type="text" name="task" value="">'
								+'</td>'
							+'</tr>'
							+'<tr>'
								+'<td>任务状态</td>'
								+'<td>'
									+'<select name="status" id="">'
										+'<option value="进行中">进行中</option>'
										+'<option value="已完成">已完成</option>'
										+'<option value="未开始">未开始</option>'
									+'</select>'
								+'</td>'
							+'</tr>'
							+'<tr>'
								+'<td>备注</td>'
								+'<td>'
									+'<textarea name="comment" id="" cols="30" rows="10"></textarea>'
								+'</td>'
							+'</tr>'
						+'</table>'
					+'</form>'
				+'</div>';
		return html;		
	}

	/**
     * 生成平台下拉
     * @param projs array 平台对象数组
     * return option标签字符串
     */
	function genProjOpt(projs){
		var opts = "",
			key,
			obj,
			i = 0,
			j = projs.length;

		for(;i < j; i ++){
			obj = projs[i];
			for(key in obj){
				if(obj.hasOwnProperty(key)){
					opts += '<option value="'+ obj[key] +'" data-code="'+ key +'">'+ obj[key] +'</option>';
				}
			}
		}
		return opts;
	}
	/**
     * 生成项目下拉
     * @param subArray 下拉清单数组
     * return option标签字符串
     */
	function genSubProjOpt(subArray){
		var i = 0,
			j = subArray.length,
			opts = "";
		for(;i < j; i ++){
			opts += '<option value="'+ subArray[i] +'" >'+ subArray[i] +'</option>';
		}
		return opts;
	}
});
