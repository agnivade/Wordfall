function divideTextInSpans(text){
   return $.map(text.split(" "), function(word){
      return "<span class='word'>"+word+"</span>";
   }).join(" ");
}

$(document).ready(function(){
	var style = document.documentElement.
                appendChild(document.createElement("style"));
	var newInnerHtml = divideTextInSpans($("#block").text());
  $("#block").html(newInnerHtml);
	$("#block").children().each(function(count){
		var index = Modernizr._prefixes.length;
		var rule = "";
		var elem = $(this);
		var offset = $(elem).offset();
		var targetTop = $(document).height() - offset.top - 20;
		var targetLeft = offset.left + 20;

		while(index--){
      rule="@"+Modernizr._prefixes[index]+"keyframes wordfall"+count+"\
      { from{ \
	      top:"+offset.top+"px; \
	      left:"+offset.left+"px; \
	      } \
	      to{ \
	      top:"+targetTop+"px; \
	      left:"+targetLeft+"px; \
	      -webkit-transform:rotate(720deg); \
	      -moz-transform:rotate(720deg); \
	      -transform:rotate(720deg); \
	      } \
      } ";
      try {
        style.sheet.insertRule(rule);
      } catch(err){}
		}
		var interval = (count+1) * 1000;
		setTimeout(function(){
			setAnimation(elem, count)
		},interval);

	});

});

function setAnimation(elem, count) {
	$(elem).css("position", "absolute");
	$(elem)[0].style[Modernizr.prefixed('animation')] = "wordfall"+count+" 1s";
	$(elem)[0].style[Modernizr.prefixed('animation-fill-mode')] = "forwards";
}

