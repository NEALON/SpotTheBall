/*
 * Author: Eugene Tsurcan
 * email: tsurcan@softreactor.com
 */

var spotTheBall = spotTheBall || {};

var alph = new Array('!','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','Q','X','Y','Z');

var spots = new Array();
var spots_juadges = new Array();
var arr_color = new Array("yellow", "red", "green", "blue", "pink");

spots = [['F4', 118, 81, 0], ['F4', 118, 181, 1], ['F4', 38, 23, 2], ['F4', 238, 121, 3], ['F4', 258, 121, 3]];

var src_img = "images/";

/* default */
var cross = "pink";


spotTheBall.init = function() {
  play(7, 5);
  
  // Events Spot Rates block
  $("#placed_main_block tr.place_tr").live("mouseover mouseout click", function(event){
    // Mouse Over
    if(event.type == "mouseover"){
      $(this).addClass("hover");
    } 
    // Mouse Out
    else if(event.type == "mouseout"){
      $(this).removeClass("hover");
    }
    // Selected rate
    else if(event.type == "click"){
      $("#placed_main_block tr.place_tr").each(function(){
          $(this).removeClass("active"); 
      });
      var class_color = $(this).attr("class").split(" ");
      // Color name
      class_color = cross = class_color[1];
      $("#your_stake_block").attr("class", "section "+class_color);
      $("#your_stake_block .bottom_info").html( $(this).find(" td.currency div").html());
      $(this).addClass("active");
    }
  });
  
  // Mini-grid set size each td
  var width_td = 163/($("#tab_positining_ table tr").size());
  var height_td = 117/($("#tab_positining_ table td").size());
  $("#tab_positining_ table td").each(function(){
    $(this).css("width", Math.ceil(width_td+5) +"%"); 
    $(this).css("width", Math.ceil(height_td+5) +"%"); 
  });
  
  // Selected Num Funds
  $("#list_num_funds .td_funds").live("click", function(){
    $("#list_num_funds .td_funds").each(function(){
      $(this).removeClass("active"); 
    });
    $(this).addClass("active"); 
  });
  
  
  // Spot Rates (init values)       
  var color_ = new Array("yellow", "red", "green", "blue", "pink");
  var currency_ = new Array("&pound;1", "50p", "20p", "10p", "1p");
  var pound_ = new Array("100,000", "50,000", "20,000", "10,000", "1,000");
  var placed_ = new Array(3, 3, 3, 3, 3);
  var left_ = new Array(7, 17, 47, 97, 997);
  
  var html_;
  
  // Spot Rates block (right_block)
  html_ = ''+
      '<div class="play_now_block__ bg_css3" style="display: none;">'+
        '<table cellpadding="0" cellspacing="0" class="tabs_placed">'+
          '<thead>'+
            '<tr>'+
              '<td class="cross">Cross</td>'+
              '<td class="currency">&pound;</td>'+
              '<td class="wins">Wins</td>'+
              '<td class="placed">Placed</td>'+
              '<td class="left">Left</td>'+
            '</tr>'+
            '<tr class="strip"><td colspan="5">&nbsp;</td></tr>'+
          '</thead>'+
          '<tbody>';
          
            for(var key in color_){
                html_ += ''+
                  '<tr class="strip"><td colspan="5">&nbsp;</td></tr>'+
                  '<tr class="place_tr '+ color_[key] +'">'+
                    '<td class="cross"><div></div></td>'+
                    '<td class="currency"><div>'+ currency_[key] +'</div></td>'+
                    '<td class="wins">'+
                      '<div class="l_b_">'+
                        '<div class="r_b_">'+
                          '<div class="main_c">&pound;'+ pound_[key] +'</div>'+
                        '</div>'+
                      '</div>'+
                    '</td>'+
                    '<td class="placed">'+
                      '<div class="l_b_">'+
                        '<div class="r_b_">'+
                          '<div class="main_c">'+ placed_[key] +'</div>'+
                        '</div>'+
                      '</div>'+
                    '</td>'+
                    '<td class="left">'+
                      '<div class="l_b_">'+
                        '<div class="r_b_">'+
                          '<div class="main_c">'+ left_[key] +'</div>'+
                        '</div>'+
                      '</div>'+
                    '</td>'+
                  '</tr>';
            }
          
          html_ += ''+     
              '<tr class="strip" style="height: 10px;"><td colspan="5">&nbsp;</td></tr>'+
              '<tr><td colspan="5" style="text-align: left;">Spot control</td></tr>'+
              '<tr>'+
                  '<td style="height: 20px; text-align:center;">'+
                    '<img src="images/small_end.png" />'+
                  '</td>'+
                  '<td class="slider_vals_block" colspan="2" style="height: 20px;">'+
                    '<div id="slider_stake" style="width: 100px; display: none;" align="center"></div>'+
                    '<div id="slider_stake_big" style="width: 100px;" align="center"></div>'+                            
                  '</td>'+
                  '<td style="height: 20px; text-align:center;">'+
                    '<img src="images/large_end.png" />'+
                  '</td>'+
                  '<td style="height: 20px;">'+
                    '<div class="switch_btn_main on_active">'+
                      '<div id="show_spots"></div>'+
                      '<div id="hide_spots"></div>'+
                    '</div>'+
                  '</td>'+
              '</tr>'+                           
          '</tbody>'+ 
        '</table>'+
      '</div>';
  
  $("#placed_main_block").append(html_);
  
  
  // Cash block (init values)           
  var td_found_ = new Array("&pound;5", "&pound;10", "&pound;15", "&pound;20", "&pound;50", "&pound;100");
  
  // Cash block (right_block)
  html_ = ''+
      '<div class="add_funds_block__ bg_css3" style="display: none;">'+
        '<ul id="list_num_funds">';
              
          for(var key in td_found_){
            if((key+1)%3 == 1){
              html_ += '<li class="row_"><span>';
            }
            
            html_ += '<div class="td_funds"><div class="main">'+ td_found_[key] +'</div></div>';
            
            if((key+1)%3 == 0){
              html_ += '</span></li>';
            }  
          }
            
          html_ += ''+
            '<li class="submit_">'+
              '<span>'+
                '<a id="clear_funds" href="#"><div class="main">clear</div></a>'+
                '<a id="submit_funds" href="#"><div class="main">submit</div></a>'+
              '</span>'+
            '</li>'+
            
      '</ul>'+
    '</div>';
    
  $("#placed_main_block").append(html_);
  
  // Change Size Spots (Default State Big-grid)
  $("#slider_stake_big").slider({
    range: "min",
    value: 1,
    min: 0,
    max: 1,
    change: function(event, ui) { 
      slider_big_change();                       
    }
  });
  
  // Change Size Spots (Zoomed State Big-grid)
  $("#slider_stake").slider({
    range: "min",
    value: 20,
    min: 1,
    max: 20,
    slide: function(event, ui) {
      $('.spot_dot img').css("width", ui.value);
      $('.spot_dot img').css("height", ui.value);
      $('.spot_dot').css("padding", (20-ui.value)/2);
    }
  });    
  
  // Hide/Show right-blocks
  $("#your_balance_block .main_c .bottom_ a").live("click", function(){
    $("#your_balance_block .main_c .bottom_ a").each(function(){
      $(this).removeClass("active"); 
    });
    $(this).addClass("active");          
    
    // Show Spot Rates block
    if($(this).hasClass("play_now_btn")){
      $("#placed_main_block .bg_css3").each(function(){
        if($(this).hasClass("play_now_block__")) $(this).css("display", "block");
        else $(this).css("display", "none");
      });            
    }
    
    // Show Cash block
    else if($(this).hasClass("add_funds_btn")){
      $("#placed_main_block .bg_css3").each(function(){
        if($(this).hasClass("add_funds_block__")) $(this).css("display", "block");
        else $(this).css("display", "none");
      });
    }
    
    return false;
  });  
  
  // change of position player with mini-grid
  $("#tab_positining_ table td").live("click", function(){
    var num_tr = $(this).parents("tr").index();
    var num_td = $(this).index();
    
    $(".grid_div table").find("tr").eq(num_tr).find("td").eq(num_td).click();
  });
  
  // Landing Page (hover effect)
  $("#multisport-block .game-list-b li a").live("mouseenter mouseleave", function(event){    
      if(event.type == "mouseenter"){
        if($.browser.msie && parseInt($.browser.version) < 9){
          $(this).find(".hover-l").animate({
            "opacity": 1
          }, 400);
          $(this).parents("li").find("a").animate({
            "color": "#ffffff"
          }, 400);
        }
        else{
          $(this).find(".hover-l").animate({
            "opacity": 1
          }, 400); 
        }
      }
      else{
        if($.browser.msie && parseInt($.browser.version) < 9){
          var color;
          if($(this).parents("li").hasClass("football")){
            color = "#0099FF";
          }
          else if($(this).parents("li").hasClass("cricket")){
            color = "#999999";
          }
          else if($(this).parents("li").hasClass("tennis")){
            color = "#C09D55";
          }
          else if($(this).parents("li").hasClass("golf")){
            color = "#009933";
          }
          
          $(this).find(".hover-l").animate({
            "opacity": 0
          }, 300);
          $(this).parents("li").find("a").animate({
            "color": color
          }, 300);
        }
        else{
          $(this).find(".hover-l").animate({
            "opacity": 0
          }, 300);
        }
      }
    });
    
    // Main-grid hover effect
    hoverMainGrid();
};

// Document Ready
$(function($) {
  spotTheBall.init();
});

function play(cl, rw, admin_p){
  var table_html = "";
  for (var j=1; j<= rw; j++){
    table_html += "<tr>";
    for (var i=1; i<= cl; i++){
      table_html += "<td alt='"+i+":"+j+"'>"+
                      "<div class='show_td'>";
                      
                        if(!admin_p){ 
                          table_html += ''+
                            "<div class='summary_block'>"+
                              "<div class='pink summ'>"+
                                "<div class='mn_'>"+
                                  "<img src='"+ src_img +"/bg/placed/pink_placed_img2.png' border='0'/>"+
                                  "<span></span>"+
                                "</div>"+
                              "</div>"+
                              "<div class='green summ'>"+
                                "<div class='mn_'>"+
                                  "<img src='"+ src_img +"/bg/placed/green_placed_img2.png' border='0'/>"+
                                  "<span></span>"+
                                "</div>"+
                              "</div>"+
                              "<div class='blue summ'>"+
                                "<div class='mn_'>"+
                                  "<img src='"+ src_img +"/bg/placed/blue_placed_img2.png' border='0'/>"+
                                  "<span></span>"+
                                "</div>"+
                              "</div>"+
                              "<div class='red summ'>"+
                                "<div class='mn_'>"+
                                  "<img src='"+ src_img +"/bg/placed/red_placed_img2.png' border='0'/>"+
                                  "<span></span>"+
                                "</div>"+
                              "</div>"+
                              "<div class='yellow summ'>"+
                                "<div class='mn_'>"+
                                  "<img src='"+ src_img +"/bg/placed/yellow_placed_img2.png' border='0'/>"+
                                  "<span></span>"+
                                "</div>"+
                              "</div>"+
                              "<div class='orange summ'>"+
                                "<div class='mn_'>"+
                                  "<img src='"+ src_img +"/bg/placed/orange_placed_img2.png' border='0'/>"+
                                  "<span></span>"+
                                "</div>"+
                              "</div>"+                                        
                            "</div>";
                        }
                            
                        table_html += ''+
                      
                        "<div class='bg_white_'></div>"+
                      "</div>"+
                    "</td>";
    }
    table_html += "</tr>";
  }
  
  $("#tab_positining_ table").html(table_html);
  $("#game_screen_main").append("<div class='grid_div'><table cellpadding='0' cellspacing='0'>"+table_html+"</table></div>");
  $(".grid_div table td div").css("width", parseFloat(parseFloat($(".screen_show img").css("width"))/cl - 1));    
  $(".grid_div table td div").css("height", parseFloat(parseFloat($(".screen_show img").css("height"))/rw - 1));
  $(".grid_div, .grid_div table").css("width", $(".screen_show img").css("width"));
  $(".grid_div, .grid_div table").css("height", $(".screen_show img").css("height"));
  $("#game_screen_main").css("width", $(".screen_show img").css("width"));
  $("#game_screen_main").css("height", $(".screen_show img").css("height"));
  $(".screen_show").css("width", $(".screen_show img").css("width"));
  $(".screen_show").css("height", $(".screen_show img").css("height"));
  $(".screen_show .borders_").css("width", $(".screen_show img").css("width"));
  $(".screen_show .borders_").css("height", $(".screen_show img").height()-2);
  
  if(!admin_p){         
    $(".grid_div table td div").css("line-height", parseFloat((parseFloat($(".screen_show img").css("height"))/rw - 1)/3.33)+"px");
    $(".grid_div table td div").css("font-size", parseFloat((parseFloat($(".screen_show img").css("height"))/rw - 1)/6 - 3)+"px");
    $(".grid_div table td div.summary_block .mn_").css("height", parseFloat($(".grid_div table td div.summary_block .mn_").parent("div").height())+"px");
    $(".grid_div table td div.summary_block .mn_").css("width", parseFloat($(".grid_div table td div.summary_block .mn_").parent("div").width())+"px");
    $(".grid_div table td div.summary_block img").css("height", parseFloat($(".grid_div table td div.summary_block img").parent("div").height())+"px");

    total_placed_populate(); 
    
    $("#show_spots").live("click", function(){
      if ($("#right_menu_game").css('display')=='none'){
        $(".summary_block").show();
        $(".switch_btn_main").addClass("on_active");
      }
      else{
        $('#spots').show();
        $(".switch_btn_main").addClass("on_active");
      }
    });
    $("#hide_spots").live("click", function(){
      if($("#right_menu_game").css('display')=='none'){
        $(".summary_block").hide();
        $(".switch_btn_main").removeClass("on_active");
      }
      else{
        $('#spots').hide();  
        $(".switch_btn_main").removeClass("on_active"); 
      }    
    });
  } 
  
  $(".grid_div table td").live("click", function(e){        
    $(".switch_btn_main").addClass("on_active");
    $("#slider_stake_big").hide();
    $("#slider_stake").show();
    
    if($(".play_now_btn").hasClass("active") || admin_p){
      if($("#placed_main_block").length){
        var is_active_place = 0;
        $("#placed_main_block tr.place_tr").each(function(){
          if($(this).hasClass("active")){
            is_active_place = 1;
            var class_color = $(this).attr("class").split(" ");
            class_color = class_color[1];
            $("#your_stake_block").attr("class", "section "+class_color);
            $("#your_stake_block .bottom_info").html( $(this).find(" td.currency div").html());
          }
        });
        if(!is_active_place){
          $("#placed_main_block tr.place_tr:last").addClass("active");
          var class_color = $("#placed_main_block tr.place_tr:last").attr("class").split(" ");
          class_color = class_color[1];
          $("#your_stake_block").attr("class", "section "+class_color);
          $("#your_stake_block .bottom_info").html( $("#placed_main_block tr.place_tr:last").find(" td.currency div").html());
        }
      }
      if($("#right_menu_game").css("display") == "none"){
        $("#right_menu_game").show("slide", { direction: "right" }, 500);
      }
      $(".screen_show").animate({width : $(".screen_show").css("height")}, 500, function(){
        if(!admin_p){
          $(".screen_show").die("dblclick", dbl_click_);
          $(".screen_show").live("dblclick", dbl_click_);
        }
        else{
          $(".screen_show").die("dblclick", dbl_click_judges);
          $(".screen_show").live("dblclick", dbl_click_judges);
        }
      });
      var cell = $(this).attr("alt");
      cell = cell.split(":");
      
      if(!admin_p){
        set_center(cl, rw, cell[0], cell[1], e);
        active_td(cell[0], cell[1], cl);
      }
      else{
        set_centerMouse(cl, rw, e);  
        //active_td_judges(cell[0], cell[1], cl);  
      }
    }
  }); 
  
  $("#btn_screen_game").live("click", function(){
    $(this).removeClass("hover");
    if($(".summary_block").css("display") == "none"){
      $(".switch_btn_main").removeClass("on_active");            
    }
    else{
      $(".switch_btn_main").addClass("on_active");
    }
    
    if(!admin_p){
      $(".screen_show").die("dblclick", dbl_click_);
      total_placed_populate();
    }
    else{
      $(".screen_show").die("dblclick", dbl_click_judges);
      placed_judges(cl);
    }
    
    $("#slider_stake_big").show();
    $("#slider_stake").hide();
    
    $('#spots').hide();
    $("#right_menu_game").hide("slide", { direction: "right" }, 500, function(){
      $(".grid_div, .grid_div table").show();
    });
    $(".screen_show").css("width", $("#game_screen_main").css("width"));
    $(".screen_show img").animate({
      left :  "0px",
      top :  "0px",
      width : $("#game_screen_main").css("width"),
      height: $("#game_screen_main").css("height")}, 1000, "easeOutQuart");      
    return false;
  });    
}

function total_placed_populate(){
  $(".summary_block .summ").each(function(){
    $(this).find("span").text("");
  });
  $("#game_screen_main .grid_div table tr").each(function(){
    for(var key1 in spots){
      for(var key2 in alph){
        if(alph[key2] == spots[key1][0].substr(0,1)){
          var num_td_val_arr = parseInt(key2-1);
          var num_tr_val_arr = parseInt(spots[key1][0].substr(1,1)-1);
          
          var tr = parseInt($(this).index());
          if(num_tr_val_arr == parseInt($(this).index())){
            $(this).find("td").each(function(){
              if(num_td_val_arr == parseInt($(this).index())){
                $(this).find(".summary_block .summ").each(function(){
                  if($(this).hasClass(arr_color[spots[key1][3]])){
                    if($(this).find("span").text() == ''){
                      $(this).find("span").text("1");
                    }
                    else{
                      var curr_summ = parseInt($(this).find("span").text());
                      curr_summ++;
                      $(this).find("span").text(curr_summ);
                    }
                  }
                });
              }
            });
          }
        }
      }
    }        
  });
  $("#game_screen_main .grid_div table .summary_block").each(function(){
    $(this).find(".summ").each(function(){
      if(!$(this).hasClass("orange")){
        if($(this).find("span").text() != ''){
          if($(this).parent(".summary_block").find(".orange span").text() == ''){
            $(this).parent(".summary_block").find(".orange span").text($(this).find("span").text());
          }
          else{
            var curr_total_summ = parseInt($(this).parent(".summary_block").find(".orange span").text());
            curr_total_summ += parseInt($(this).find("span").text());
            $(this).parent(".summary_block").find(".orange span").text(curr_total_summ);
          }
        }
      }
    });        
  });
  
  // Change Size Spots (Default State Big-grid)
  slider_big_change();  
}

// Change Size Spots (Default State Big-grid)
function slider_big_change(){
  if($("#slider_stake_big").slider("value")){
    $(".summary_block .summ").each(function(){
      if($(this).find("span").text() == '' || $(this).hasClass("orange")){
        $(this).hide();
      }
      else{
        $(this).show();
      }
    });                         
  }
  else{        
    $(".summary_block .summ").each(function(){
      if($(this).hasClass("orange")){
        if($(this).find("span").text() == ''){
          $(this).hide();
        }
        else{
          $(this).show();
        }
      }
      else{
        $(this).hide();
      }
    });
  }
}

function active_td(x, y, cl){
  $("#tab_positining_ td").removeClass("curr_pos");
  $("#tab_positining_ td").html("&nbsp;");
  var cl_t;
  cl_t =  alph[parseInt(x)];
  var num = (parseInt(y)-1)*cl + parseInt(x);
  $("#tab_positining_ td:eq("+(num-1)+")").addClass("curr_pos");
  $("#tab_positining_ td:eq("+(num-1)+")").html(cl_t+""+y);
  $("#addr").html(cl_t+""+y);   
  $('#spots').hide();
  $("#spots").css("width", $(".screen_show").width()-2);
  $("#spots").css("height", $(".screen_show").height()-2);
  $('#spots').html("");
  
  var size = $("#slider_stake").slider("value");
  for(var i = 0; i < spots.length; i++){
    if(spots[i][0] == cl_t+""+y){
      $('#spots').append("<div class='spot_dot' style='padding:"+ (20-size)/2 +"px; top:"+(spots[i][2]-10)+"px; left:"+(spots[i][1]-10)+"px'><img src=\"images/bg/placed/"+arr_color[spots[i][3]]+"_placed_img.png\" /></div>");
    }
  }
  
  $('.spot_dot img').css("width", size);
  $('.spot_dot img').css("height", size);
}

function set_center(cl, rw, cl_c, rw_c, e){
  var width = parseFloat($(".screen_show").css("height"));
  var height = parseFloat($(".screen_show").css("height"));
  var n_width = width*cl;
  var n_height = height*rw;
  var s_w = width - cl_c*width;
  var s_h = n_height/rw - rw_c*n_height/rw;
  $(".screen_show img").animate(
    {
      height: n_height,
      width : n_width, 
      left :  s_w + "px",
      top :  s_h + "px"
    }, 
    1000, 
    "easeInQuart", function(){
      $('#spots').show();
      $("#btn_screen_game").removeClass("hover");
    }
  );
  $(".grid_div, .grid_div table").hide();
  var fn = function (e){
    var x = e.pageX - parseInt($(".screen_show").offset().left);
    var y = e.pageY - parseInt($(".screen_show").offset().top);
    $("#coord").html("- X"+x+" - Y"+y);  
  };
  $(".screen_show").live("mousemove", fn);
}

function set_centerMouse(cl, rw, e){
  var width = $(".screen_show").height();
  var height = $(".screen_show").height();    
  var n_width = width*cl;
  var n_height = height*rw;    
  var x = e.pageX - parseInt($(".screen_show").offset().left);
  var y = e.pageY - parseInt($(".screen_show").offset().top); 
  var s_w = width/2 - x*rw - 26;
  var s_h = $(".screen_show").height()/2 - y*rw;
  
  if(s_w > 0) s_w = 0;
  if(s_h > 0) s_h = 0;    
  if(Math.abs(s_w) > (n_width - width)) s_w = -(n_width - $(".screen_show").width() + 181 - 26);
  if(Math.abs(s_h) > (n_height - height)) s_h = -(n_height - $(".screen_show").height());    
  
  $(".screen_show img").animate(
    {
      height: n_height,
      width : n_width, 
      left :  s_w + "px",
      top :  s_h + "px"
    }, 
    1000, 
    "easeInQuart", function(i){          
      $('#spots').show();
      var x = parseInt((e.pageX - parseInt($(".screen_show").offset().left) - parseInt(parseInt($(".screen_show .main_game_img").css("left"))))/rw);
      var y = parseInt((e.pageY - parseInt($(".screen_show").offset().top) - parseInt(parseInt($(".screen_show .main_game_img").css("top"))))/rw);
      $("#coord").html("X"+x+" - Y"+y);
      $("#btn_screen_game").removeClass("hover");
      
      active_td_judges(rw);
    }
  );
  $(".grid_div, .grid_div table").hide(); 
  
  var fn = function (e){
    var x = parseInt((e.pageX - parseInt($(".screen_show").offset().left) - parseInt(parseInt($(".screen_show .main_game_img").css("left"))))/rw);
    var y = parseInt((e.pageY - parseInt($(".screen_show").offset().top) - parseInt(parseInt($(".screen_show .main_game_img").css("top"))))/rw);
    
    $("#coord").html("X"+x+" - Y"+y);  
  };
  $(".screen_show").live("mousemove", fn);
}

var dbl_click_ = function(e){
  $(".screen_show").die("dblclick", dbl_click_);
  
  var size = $("#slider_stake").slider("value");
  var x = e.pageX - parseInt($(".screen_show").offset().left) - 10;
  var y = e.pageY - parseInt($(".screen_show").offset().top) - 10;
  var positing_grid = $(".your_positining #addr").text();
  
  var class_color;
        
  if($("#placed_main_block tr.place_tr").length){
    $("#placed_main_block tr.place_tr").each(function(){
      if($(this).hasClass("active")) class_color = $(this).attr("class").split(" ");
    });        
  }
  class_color = cross = class_color[1];
  
  class_color = cross;
  
  var num_color;        
  for(var key in arr_color){
      if(arr_color[key] == class_color) num_color = key;
  }
  
  var add_array = [positing_grid, x, y, num_color];    
  spots.push(add_array);    
  
  $('#spots').append("<div class='spot_dot' style='padding:"+ (20-size)/2 +"px; top:"+(y)+"px; left:"+(x)+"px'><img src=\"images/bg/placed/"+cross+"_placed_img.png\" style='width:"+size+"px; height:"+size+"px;' /></div>");
  /*update your data in db*/
  $(".screen_show").live("dblclick", dbl_click_);
}

function hoverMainGrid(){
  $(".grid_div table").hover(
    function(){
      if($(".play_now_btn").hasClass("active") || admin_p){
        $(this).addClass("tablein");
      }
    },
    function(){
      if($(".play_now_btn").hasClass("active") || admin_p){
        $(this).removeClass("tablein");
      }
    }
  )
  
  $(".grid_div table td .show_td").hover(
    function(){
      if($(".play_now_btn").hasClass("active") || admin_p){
        $(".grid_div table").removeClass("for_opacity_show");

        var _curr = $(this);
        var _active = $(".grid_div table td .show_td.active_opacity");

        if ($(_active).html() != null){
          $(this).addClass("active_opacity");
          $(_active).removeClass("active_opacity");
          $(_active).animate(
          {
            'background-color': '#000000', 
            'opacity': 0.45
          });
          $(this).animate(
          {
            'opacity': 0
          });            
        }else{
          $(".grid_div table td .show_td").each(
            function(){
              if ($(this)[0] != $(_curr)[0]){
                $(this).css("background-color", "#000000").css("opacity", 0).animate(
                  {
                    'opacity': 0.45
                  }, 300
                )
              }else{
                $(this).addClass("active_opacity");
                $(this).animate(
                  {
                    'opacity': 0
                  }, 200
                )
              }
            }
          )
        }
      }
    },
    function(){
      if($(".play_now_btn").hasClass("active") || admin_p){
        $(this).animate(
          {
            'background-color': '#000000', 
            'opacity': 0.45
          }, 200, function(){
            if(!$(".grid_div table").hasClass("tablein")){
              $(".grid_div table td .show_td.active_opacity").removeClass("active_opacity");
              $(".grid_div table").addClass("for_opacity_show");
            }
          }
        );
      }
    }
  )
}


