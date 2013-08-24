function divideTextInSpans(text){
   return $.map(text.split(" "), function(word){
      return "<span class='word'>"+word+"</span>";
   }).join(" ");
}

function setAnimation(elem, count) {
  $(elem).css("position", "absolute");
  $(elem)[0].style[Modernizr.prefixed('animation')] = "wordfall"+count+" 1s";
  $(elem)[0].style[Modernizr.prefixed('animation-fill-mode')] = "forwards";
}


(function ($) {
  $.fn.wordFall = function(options) {
    var settings = $.extend({
      'paddingRight':20,
      'paddingBottom':20
    }, options);
    /* Internal settings */
    var multiplier = 360;
    var adder = 720;

    var style = document.documentElement.
                  appendChild(document.createElement("style"));
    return this.each(function(){
      var newInnerHtml = divideTextInSpans($(this).text());
      $(this).html(newInnerHtml);
      $(this).children().each(function(count){
        var rotateDegree = Math.random()*multipler + adder;
        var index = Modernizr._prefixes.length;
        var rule = "";
        var elem = $(this);
        var offset = $(elem).offset();
        var targetTop = $(document).height()
                          - offset.top
                          - settings.paddingBottom;
        var targetLeft = offset.left + settings.paddingRight;

        while(index--){

          rule="@"+Modernizr._prefixes[index]+"keyframes wordfall"+count+"\
          { from{ \
            top:"+offset.top+"px; \
            left:"+offset.left+"px; \
            } \
            to{ \
            top:"+targetTop+"px; \
            left:"+targetLeft+"px; \
            -webkit-transform:rotate("+rotateDegree+"deg); \
            -moz-transform:rotate("+rotateDegree+"deg); \
            -transform:rotate("+rotateDegree+"deg); \
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
  };
})(jQuery);
