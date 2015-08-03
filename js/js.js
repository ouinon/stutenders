var v = {
	gallery : {

		img_count : 0,
		width : 860
	}
}

var init = function(){

	//objs.gallery = $("#gallery");

	var $gallery = $("#gallery .o_gallery_ct");
	
	v.gallery.img_count = $("#gallery .gallery_ct img").length;

	$("#gallery").data("count",v.gallery.img_count).data("image_show",0);
	
	v.gallery.full_width = v.gallery.width * (v.gallery.img_count+2);
	
	$("#gallery .gallery_ct").width(v.gallery.full_width);
	
	//ensure the last-child isn't the appended last-child
	$lastchild = $("#gallery .gallery_ct img:last-child")
	
	$("#gallery .gallery_ct img:first-child").clone().appendTo("#gallery .gallery_ct");
	
	$lastchild.clone().prependTo("#gallery .gallery_ct");
	
	$gallery.scrollLeft(v.gallery.width);
	
	$("#gallery").on("nav",function(evnt,args){

		var direction = args.direction;
		
		crt_image_show = $(this).data("image_show");
		
		new_image_show = crt_image_show + direction;
		
		//if(new_image_show < 0 || new_image_show >= $(this).data("count")){
		//if(new_image_show > -1 && new_image_show < $(this).data("count")){
	
		
		if(new_image_show < 0){
		
			//alert('go');
		
			if($gallery.is(':animated')){
				
				return false;
				
			}
			
			$gallery.scrollLeft(v.gallery.full_width);
		
			direction = -1;
		
			$(this).data("image_show",v.gallery.img_count);
		
		}else if(new_image_show >= $(this).data("count")){
		
			if($gallery.is(':animated')){
				
				return false;
				
			}
			
			$gallery.scrollLeft(0);
		
			direction = 0;
		
			$(this).data("image_show",0);
			
		
		}
		
		$(this).data("image_show",$(this).data("image_show")+direction);
		
		
		var elementTo = $(this).data("image_show")+1;
		
		var scrollTo = elementTo * 860;
		
		var img_title = $("img:eq("+elementTo+")",this).attr("title");
		
		$(".banner p",this).text(img_title);
		
		$gallery.stop().animate({scrollLeft:scrollTo},'slow');
	
	}).mousewheel(function(event,delta,deltaX,deltaY){
		
		direction = delta * -1;
	
		$(this).trigger("nav",{"direction":direction});
		
		return false;
		
	}).hover(
		function(){
			$(this).addClass('over');
			$(".banner",this).stop().animate({height:"22px"},"fast");
		}
		,
		function(){
			$(this).removeClass('over');
			$(".banner",this).stop().animate({height:"0px"},"fast");
		}
	);

	$("#gallery button").click(
		function(){
			
			var direction = 0;
			
			if($(this).attr('class') == "right"){
				direction = -1;
			}else{
				direction = 1;
			};
			
			$(this).parent().trigger("nav",{"direction":direction});
		}
	);
	
	$("header > nav,footer > nav").click(function(){
	
		$("#o_content").load("http://static.rivieraboathire.com/gi/cte/prices.html",function(){
		
		});
	
	})

};

//$(function(){
	//alert('yo');
$(window).load(function() {
	init();
});
