$(function(){
	var arr=new Array;	
	var obj=new String;
	var startx;
	var endx;
	var extent;
	$(".add").on("touchend",function(){
		var inner=$.trim($("#input input").val());
		obj={
			name:"",
			stat:0
		}
		if(inner){
			var li=$("<li>").appendTo($("#content"));
			li.html(inner+"<div class='delete'></div>");
			obj.name=inner;
			arr.push(obj);
			localStorage.calender=JSON.stringify(arr);
			$("#input input").val('');
		}
	})
	if(localStorage.calender){
		arr=JSON.parse(localStorage.calender);
		$(arr).each(function(index){
			var inner=arr[index].name;
			var li=$("<li>").html(inner+"<div class='delete'>");
			li.appendTo($("#content"));
			$("#input input").val('');
			if(arr[index].state==1){
				li.addClass('done');
			}
		})
	}
	$("#content").on("touchstart","li",function(e){
		startx=e.originalEvent.targetTouches[0].screenX;
	})
	$("#content").on("touchend","li",function(e){
		endx=e.originalEvent.changedTouches[0].screenX;
		var index=$(this).index();
		var differ = endx-startx;
		if(differ>50&&($(this).attr("class")=="done")){
			$(this).removeClass('done');
			arr[index].state=0;
			localStorage.calender=JSON.stringify(arr);
		}else if(differ<-50){
			$(this).addClass('done');
			arr[index].state=1;
			localStorage.calender=JSON.stringify(arr);
		}
	})
	$(".delete").on("touchend",function(){
		var parent=$(this).parent();
		var index=parent.index;
		arr.splice(index,1);
		localStorage.calender=JSON.stringify(arr);
		parent.remove();

	})
})
