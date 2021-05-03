/**
 * common.js
 *
 *  version --- 3.7
 *  updated --- 2012/10/12
 */


/* !stack ------------------------------------------------------------------- */
jQuery(document).ready(function($) {
	pageScroll();
	rollover();
	addCss();
	pulldownmenu();
	accorditonBox();
});


/* !isUA -------------------------------------------------------------------- */
var isUA = (function(){
	var ua = navigator.userAgent.toLowerCase();
	indexOfKey = function(key){ return (ua.indexOf(key) != -1)? true: false;}
	var o = {};
	o.ie      = function(){ return indexOfKey("msie"); }
	o.fx      = function(){ return indexOfKey("firefox"); }
	o.chrome  = function(){ return indexOfKey("chrome"); }
	o.opera   = function(){ return indexOfKey("opera"); }
	o.android = function(){ return indexOfKey("android"); }
	o.ipad    = function(){ return indexOfKey("ipad"); }
	o.ipod    = function(){ return indexOfKey("ipod"); }
	o.iphone  = function(){ return indexOfKey("iphone"); }
	return o;
})();
/* !pageScroll -------------------------------------------------------------- */
var pageScroll = function(){
	jQuery.easing.easeInOutCubic = function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	}; 
	$('a.scroll, .scroll a, .pageTop a').each(function(){
		$(this).bind("click keypress",function(e){
			e.preventDefault();
			var target  = $(this).attr('href');
			var targetY = $(target).offset().top;
			var parent  = ( isUA.opera() )? (document.compatMode == 'BackCompat') ? 'body': 'html' : 'html,body';
			$(parent).animate(
				{scrollTop: targetY },
				400,
				'easeInOutCubic'
			);
			return false;
		});
	});
}
/* !rollover ---------------------------------------------------------------- */
var rollover = function(){
	var suffix = { normal : '_no.', over   : '_on.'}
	$('a.over, img.over, input.over').each(function(){
		var a = null;
		var img = null;

		var elem = $(this).get(0);
		if( elem.nodeName.toLowerCase() == 'a' ){
			a = $(this);
			img = $('img',this);
		}else if( elem.nodeName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'input' ){
			img = $(this);
		}

		var src_no = img.attr('src');
		var src_on = src_no.replace(suffix.normal, suffix.over);

		if( elem.nodeName.toLowerCase() == 'a' ){
			a.bind("mouseover focus",function(){ img.attr('src',src_on); })
			 .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'img' ){
			img.bind("mouseover",function(){ img.attr('src',src_on); })
			   .bind("mouseout", function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'input' ){
			img.bind("mouseover focus",function(){ img.attr('src',src_on); })
			   .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}

		var cacheimg = document.createElement('img');
		cacheimg.src = src_on;
	});
};

/* !defFunc ----------------------------------------------------------------- */
var defFunc = (function(){
	Print = function(){ window.print(); return false;}
	Close = function(){ window.close(); return false;}
})();
/* !Addition Fitst & Last --------------------------------------------------- */
var addCss = (function(){
	$('li:first-child:not(:last-child)').addClass('first');
	$('li:last-child').addClass('last');
});
/* !pulldownmenu --------------------------------------------------- */
var pulldownmenu = (function(){
	$('.pulldownmenu').hover(function(){
		$(this).children('.submenu').fadeIn(200);
	}, function() {
		$(this).children('.submenu').fadeOut(400);
	})
});
/* !accorditonBox --------------------------------------------------- */
var accorditonBox = (function(){
	$('.opencloseTit01').click(function(){
		$(this).next('.opencloseBox01').slideToggle(600, 'easeInOutCirc');
		$(this).toggleClass('boxopen');
	});
});

$(function(){
	$('.accordion dd').hide();
	$('.accordion dd').eq(1).show();
	
	$('.accordion dt').click(function(){
		$('.accordion dd').not($(this).next('dd')).hide('slow');
		$(this).next('dd').toggle('slow');
	});
});



