var toTopInit = (function($){
    $("<div id='body_totop_btn'></div>").text("返回顶部").css({
      "position": "fixed",
      "bottom":"0.5rem",
      "right":"0.2rem",
      "width":"1.2rem",
      "height":"1.2rem",
      "zIndex": "999",
      "lineHeight": "2.25rem",
      "fontSize": "0.2rem",
      "fontFamily": "PingFangSC-Regular, sans-serif",
      "color": "#AEADAD",
      "textAlign": "center",
      "background": "url(../../image/rocket_up.png) no-repeat center 3px",
      "backgroundSize": "70% 70%",
      "backgroundColor": "rgba(0,0,0,0)",
      "borderRadius": "6px",
      "fontSize": "0.20rem",
      // "color": #20c714;
      "display": "none",
    }).appendTo("body");
    return function(obj){
      obj.on("scroll",function(){alert("haha")
					var scrollTop = obj.scrollTop();
					if(scrollTop >= 30){alert(111)
							$("#body_totop_btn").show().off("click").on("click",function(){
									obj.animate({'scrollTop': '0px'}, 200);
									//myScroll.scrollTo(0, 0, 300)
							})
					}else{alert(222)
							$("#body_totop_btn").hide();
					}
			})

    }
})(jQuery)
