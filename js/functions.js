var alph = new Array('!','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','Q','X','Y','Z');

var spots = new Array();
var spots_juadges = new Array();
//spots_juadges = ['F4', 118, 81];
var arr_color = new Array("yellow", "red", "green", "blue", "pink");
spots = [['F4', 118, 81, 0], ['F4', 118, 181, 1], ['F4', 38, 23, 2], ['F4', 238, 121, 3], ['F4', 258, 121, 3]];

var src_img = "themes/default/images/";

/*default*/
var cross = "pink";

$(function(){  
    $(".textarea_st1 textarea").autoResize({
        // On resize:
        onResize : function() {
            $(this).css({opacity:1});
            $("#comments_block .sent_block").css("float", "none"); //fix IE8;
            $("#comments_block .sent_block").css("float", "left"); //fix IE8;
        },
        // After resize:
        animateCallback : function() {
            $(this).css({opacity:1});
        },
        // Quite slow animation:
        animateDuration : 1,
        // More extra space:
        extraSpace : 0
    });
    $("input.uploadSt1").each(function(){
        $(this).wrap("<div class='inputUploadSt1'></div>")
    });
    $("input.checkboxSt1").each(function(){
        $(this).wrap("<div class='inputCheckboxSt1'></div>");
        if($(this).attr("checked")){
            $(this).parents(".inputCheckboxSt1").addClass("checked-b");
        }
    });
    $(".inputCheckboxSt1").live("click", function(){
        if($(this).find("input.checkboxSt1").attr("checked")){
            $(this).find("input.checkboxSt1").attr("checked", 0);
            $(this).removeClass("checked-b");
        }
        else{
            $(this).find("input.checkboxSt1").attr("checked", 1);
            $(this).addClass("checked-b");
        }
    });
    
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
    $(".select-sb").each(function(){
        $(this).sb({
            fixedWidth: true
        }); 
    });
    $(".scroll-pane").each(function(){
        $(this).jScrollPane({
			verticalDragMinHeight: 20,
			verticalDragMaxHeight: 20,
            verticalDragMinWidth: 20,
			verticalDragMaxWidth: 20
		});
    });
    
    opacity();
});
function closePopupSpot(){
    $("#popup-block").fadeOut(350, function(){
        $(this).remove();
        $("#back-bg-popup").remove();
        $("body").removeClass("popup");
    });
    $("#back-bg-popup").fadeOut(350);
}
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
    slider_big_change();  
}

function placed_judges(cl){
    $("#game_screen_main .grid_div table .spot_dot").each(function(){
        $(this).remove(); 
    });
    
    for(var key1 in spots_juadges){
        for(var key2 in alph){
            if(alph[key2] == spots_juadges[key1][0].substr(0,1)){
                var num_td_val_arr = parseInt(key2-1); //begin from 0..
                var num_tr_val_arr = parseInt(spots_juadges[key1][0].substr(1,1)-1);
                
                var x = spots_juadges[key1][1]-12;
                var y = spots_juadges[key1][2]-12;
                
                $("#game_screen_main .grid_div table tr").eq(num_tr_val_arr).find("td").eq(num_td_val_arr).find(".show_td").append("<div class='spot_dot' style='top:"+(y)+"px; left:"+(x)+"px'><img src=\"themes/default/images/bg/placed/light_orange_placed_img.png\" style='width:23px; height:23px;' /></div>");
            }
        }
    }
}

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
            $('#spots').append("<div class='spot_dot' style='padding:"+ (20-size)/2 +"px; top:"+(spots[i][2]-10)+"px; left:"+(spots[i][1]-10)+"px'><img src=\"themes/default/images/bg/placed/"+arr_color[spots[i][3]]+"_placed_img.png\" /></div>");
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
         });
    $(".grid_div, .grid_div table").hide();
    var fn = function (e){
        var x = e.pageX - parseInt($(".screen_show").offset().left);
        var y = e.pageY - parseInt($(".screen_show").offset().top);
        $("#coord").html("- X"+x+" - Y"+y);  
    };
    $(".screen_show").live("mousemove", fn);
}

function active_td_judges(rw){  
    $("#addr").html("");   
    $("#spots").html("");
    $("#spots").css("width", $(".screen_show").width()-2);
    $("#spots").css("height", $(".screen_show").height()-2);
    
    for(var key1 in spots_juadges){
        for(var key2 in alph){
            if(alph[key2] == spots_juadges[key1][0].substr(0,1)){
                var num_td_val_arr = parseInt(key2-1); //begin from 0..
                var num_tr_val_arr = parseInt(spots_juadges[key1][0].substr(1,1)-1);
                
                var absolutePosX = spots_juadges[key1][1] + ($(".grid_div table td .show_td").width() + 1)*(num_td_val_arr);
                var absolutePosY = spots_juadges[key1][2] + ($(".grid_div table td .show_td").height() + 1)*(num_tr_val_arr); 
                
                $("#spots").html("<div id='spots_judges'></div>");
                $("#spots_judges").css("left", $(".screen_show .main_game_img").css("left"));
                $("#spots_judges").css("top", $(".screen_show .main_game_img").css("top"));
                $("#spots_judges").width($(".screen_show .main_game_img").width());
                $("#spots_judges").height($(".screen_show .main_game_img").height());
                $("#spots_judges").html("<div class='spot_dot' style='padding:0px; top:"+(absolutePosY*rw)+"px; left:"+(absolutePosX*rw)+"px'><img src=\"themes/default/images/bg/placed/light_orange_placed_img.png\" style='width:24px; height:24px;' /></div>");
            }
        }
    }
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
         });
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
    
    $('#spots').append("<div class='spot_dot' style='padding:"+ (20-size)/2 +"px; top:"+(y)+"px; left:"+(x)+"px'><img src=\"themes/default/images/bg/placed/"+cross+"_placed_img.png\" style='width:"+size+"px; height:"+size+"px;' /></div>");
    /*update your data in db*/
    $(".screen_show").live("dblclick", dbl_click_);
}
var dbl_click_judges = function(e){
    $(".screen_show").die("dblclick", dbl_click_judges);
    
    $('#spots').html("");
    
    var x = e.pageX - parseInt($(".screen_show").offset().left) - 12;
    var y = e.pageY - parseInt($(".screen_show").offset().top) - 12;
    
    var absolutePos = $(".your_positining #coord").text().split(" - ");
    absolutePosX = absolutePos[0].replace("X", "");
    absolutePosY = absolutePos[1].replace("Y", "");
    
    var num_td = Math.floor(absolutePosX/($(".grid_div table td .show_td").width() + 1)) + 1;
    var num_tr = Math.floor(absolutePosY/($(".grid_div table td .show_td").height() + 1)) + 1;
    
    var td_x_loc = parseInt(absolutePosX%($(".grid_div table td .show_td").width() + 1));
    var td_y_loc = parseInt(absolutePosY%($(".grid_div table td .show_td").height() + 1));
    var positing_grid = alph[num_td] + num_tr;
    
    var indent_x = ($("#spots").width()+2)/($(".grid_div table td .show_td").width() + 1);
    var indent_y = ($("#spots").height()+2)/($(".grid_div table td .show_td").height() + 1);
    
    var x_grid_loc = td_x_loc * indent_x;
    var y_grid_loc = td_y_loc * indent_y;
    
    var add_array = [positing_grid, td_x_loc, td_y_loc, x_grid_loc, y_grid_loc];    //x_grid_loc, y_grid_loc for comparison with the values ??of the players 
    spots_juadges = new Array(); 
    spots_juadges.push(add_array);    
    
    $('#spots').append("<div class='spot_dot' style='padding:0px; top:"+(y)+"px; left:"+(x)+"px'><img src=\"themes/default/images/bg/placed/light_orange_placed_img.png\" style='width:24px; height:24px;' /></div>");
    /*update your data in db*/
    $(".screen_show").live("dblclick", dbl_click_judges);
}

function opacity(){
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