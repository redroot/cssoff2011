$(document).ready(function(){
  
  // set opacity of nav after you scroll down
  
  // obstacle hover and click states
  
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
  
  // clock timer
  start = 60;
  setInterval(function(){
    
    start--;
    start_text = start < 10 ? "0"+start : start;
    $("#clock-time").text(start_text);
    
    if(start == 0) { start = 60 }
    
  },1000);
  
});