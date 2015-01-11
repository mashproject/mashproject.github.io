	$(".hero").scrollspy({
			min:$("body").offset().top+643,max:$("body").offset().top+10000,
	onEnter:function(d,c){
		$(".hero").addClass("fixed")
	},
	onLeave:function(d,c){
		$(".hero").removeClass("fixed")
	}});