// massively hacked code from
// http://www.jankoatwarpspeed.com/examples/reinventing-drop-down/Select2DropDown.html#

function customSelects(){
  createDropDowns();

  $(".dropdown dt a").click(function() {
       $(this).parents(".dropdown").find("dd ul").toggle();
  });
  
  $(document).bind('click', function(e) {
      var $clicked = $(e.target);
      if (! $clicked.parents().hasClass("dropdown")){
          $(".dropdown dd ul").hide();
      }
  });
  
  $(".dropdown dd ul li a").click(function() {
      var text = $(this).html();
      var parent = $(this).parents(".dropdown");
      parent.find("dt a").html(text);
      parent.find("dd ul").hide();
  
      var source = $("#"+parent.data("orig"));
      source.val($(this).find("span.value").html());
  });
  
}

function createDropDowns(){
    counter = 0
    $("form select").each(function(){
      var selected = $(this).find("option[selected]");
      var options = $("option", $(this));
      var id = "dropdown-"+($(this).attr("id") || counter);
      
      $(this).after('<dl data-orig="'+$(this).attr("id")+'" id="'+id+'" class="dropdown"></dl>');
      $("#"+id).append('<dt><a href="#dd">' + selected.text() + 
          '<span class="value">' + selected.val() + 
          '</span></a></dt>')
      $("#"+id).append('<dd><ul></ul></dd>');
      
      options.each(function(){
          $("#"+id+" dd ul").append('<li><a href="#dd">' + 
              $(this).text() + '<span class="value">' + 
              $(this).val() + '</span></a></li>');
      });
      
      $(this).css("display","none").attr("aria-hidden");
      counter++;
    });
}

$(document).ready(function(){
  
  // set opacity of nav after you scroll down if bigger than 600px
  if(screen.width > 600 && $(window).width() > 600){
    $(window).scroll(function(){
      if($(window).scrollTop() > 400){
        $("nav").addClass("fadeIn");
      }else{
        $("nav").removeClass("fadeIn");
      }
    });
  }
  
  // obstacle hover and click states
  var obstacles = $("#obstacles li");
  var large_text = [$("#obstacles .right p em"), $("#obstacles .right p span")];
  var large_img = $("#obstacles .right img");
  
  var obstacle_text = {
    "obstacle-tank"    : ["The Tank","Submerge yourself in gunge!"],
    "obstacle-slide"   : ["The Sundae Slide","Slide through the dessert!"],
    "obstacle-wheel"   : ["Human Hamster Wheel", "6 Settings of thrilling speed!"],
    "obstacle-hatch"   : ["Down The Hatch", "6ft Slide Covered In Gunk"],
    "obstacle-pick"    : ["Pick It!","Brave the sticky goo!"],
    "obstacle-wringer" : ["The Wringer","Squeeze through the rolling pins!"],
  };
  
  obstacles.live("click",function(){
    
    obstacles.removeClass("current");
    $(this).addClass("current");

    var alt = $(this).find("img").attr("alt").replace("small","large");
    var src = "assets/images/"+$(this).attr("id")+"-large.jpg"

    large_img.attr("src",src).attr("alt",alt);
    large_text[0].text(obstacle_text[$(this).attr("id")][0]);
    large_text[1].text(obstacle_text[$(this).attr("id")][1]);
  });
  
  // Implemented this way since it's available across all browsers
  // and stylable
  $("input[type=text]").each(function(){
    $(this).data("placeholder",$(this).val());
  }).live("focus",function(){
    if($(this).val() == $(this).data("placeholder")){
      $(this).val("");
    }
  }).live("blur", function(){
    if($(this).val().length == 0){
      $(this).val($(this).data("placeholder"));
    }
  });
  
  // custom selects
  if(!$.browser.msie || ($.browser.msie&&$.browser.version>6)){
    customSelects();
  }
  
  // clock timer
  start = 60;
  setInterval(function(){
    
    start--;
    start_text = start < 10 ? "0"+start : start;
    $("#clock-time").text(start_text);
    
    if(start == 0) { start = 60 }
    
  },1000);
  
});

