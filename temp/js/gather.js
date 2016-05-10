$(function(){

	$("#serializedCode").focus();

	$(".btm_nav li").on("click",function(e){
		var cls = $(e.target).data("class");
		cls == "code_tab"?$("#parse").show() : $("#parse").hide();
		$(this).addClass("active").siblings().removeClass("active");
		$("."+cls).show().siblings().hide();
	});

	$("#parse").on("click",function(){
		var rptString = $("#serializedCode").val(),
			html = "";
		if(!rptString){
			return;
		}

		html = parseReport(rptString);
		$("#preview").html(html);
		$("#htmlCode").val(html);
		$("li[data-class='preview_tab']").trigger("click");
	});

	/**
     * 报表对象解析成报表
     * @param reportString 报表汇总代码
     * return 报表html
     */
	function parseReport(reportString){
		var hl = "", hp = "",
			i,j,k,l,obj,head,
			rptArray = reportString.split(";;"),
			hSty = ' style = "color:#888;text-align: left;font-size: 16px;padding: 5px 15px 0 15px;margin:0;" ',
			tableSty = ' style="margin: 15px;width: 965px;border-collapse:collapse;text-align: left;border-spacing: 0; " ',
			ftdSty = ' style="min-width:40px;border: solid 1px #DDD;background-color: #999;font-size: 16px;text-align: center;color: #FFF;font-weight: normal;font-family: \'Microsoft YaHei\', \'WenQuanYi Micro Hei\', \'tohoma,sans-serif\';" ',
			nameSty = ' style="color: #258AAF;text-align: center;font-size: 14px;width: 50px;border: solid 1px #DDD;background-color: #F7F7F7;padding: 4px 6px;" ',
			
			tdComCss = 'color:#888;font-family: monospace;font-size:12px;border: solid 1px #DDD;background-color: #F7F7F7;padding: 4px 6px;',
			tdComSty = ' style="'+ tdComCss +'" ',
		 	tdComAcSty = ' style="'+ tdComCss +'width: 60px;;text-align: center;" ',
	 		tdComAcShortSty = ' style="'+ tdComCss +'width: 40px;;text-align: center;" ';;

		rptArray.length = rptArray.length - 1;

		for(i = 0, j = rptArray.length; i < j;i ++){
			rptArray[i] = JSON.parse(rptArray[i]);
		}

		for(i = 0, j = rptArray.length; i < j; i ++){
			obj = rptArray[i].last;
			for(k = 0, l = obj.length; k < l; k ++){
				hl += '<tr>';

				if(k == 0){
					hl += '<td rowspan="'+ l +'" '+ nameSty +'>'+ rptArray[i].name +'</td>';
				}

				hl += '<td '+ tdComAcShortSty +'>'+ obj[k].project +'</td>'
					+'<td '+ tdComAcSty +'>'+ obj[k].subProject +'</td>'
					+'<td '+ tdComAcShortSty +'>'+ obj[k].projectType +'</td>'
					+'<td '+ tdComSty +'>'+ obj[k].task +'</td>'
					+'<td '+ tdComAcSty +'>'+ obj[k].status +'</td>'
					+'<td '+ tdComSty +'>'+ obj[k].comment +'</td>'
				+'</tr>';
			}
			//本周计划
			obj = rptArray[i].plan;
			for(k = 0, l = obj.length; k < l; k ++){
				hp += '<tr>';

				if(k == 0){
					hp += '<td rowspan="'+ l +'"'+ nameSty +'>'+ rptArray[i].name +'</td>';
				}

				hp += '<td '+ tdComAcShortSty +'>'+ obj[k].project +'</td>'
					+'<td '+ tdComAcSty +'>'+ obj[k].subProject +'</td>'
					+'<td '+ tdComAcShortSty +'>'+ obj[k].projectType +'</td>'
					+'<td '+ tdComSty +'>'+ obj[k].task +'</td>'
					+'<td '+ tdComAcSty +'>'+ obj[k].status +'</td>'
					+'<td '+ tdComSty +'>'+ obj[k].comment +'</td>'
				+'</tr>';
			}
		}

		head = '<table '+ tableSty +'>'
				+'<tr>'
					+'<td '+ ftdSty +'>姓名</td>'
					+'<td '+ ftdSty +'>平台</td>'
					+'<td '+ ftdSty +'>项目</td>'
					+'<td '+ ftdSty +'>类型</td>'
					+'<td '+ ftdSty +'>任务</td>'
					+'<td '+ ftdSty +'>状态</td>'
					+'<td '+ ftdSty +'>备注</td>'
				+'</tr>';

		if(hl.length){
			hl = '<h2 '+ hSty +'>上周工作：</h2>' + head + hl +'</table>';
		}
		if(hp.length){
			hp = '<h2 '+ hSty +'>本周计划：</h2>' + head + hp +'</table>';
		}

		return hl + hp;
	}
});