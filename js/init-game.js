$(function(){  
    play(7, 5);

    $(".play_now_btn").live("click", function(){
        $(this).addClass("active");        
        return false;
    })
    $("#placed_main_block tr.place_tr").live("mouseover mouseout click", function(event){
        if(event.type == "mouseover"){
            $(this).addClass("hover");
        } 
        else if(event.type == "mouseout"){
            $(this).removeClass("hover");
        }
        else if(event.type == "click"){
            $("#placed_main_block tr.place_tr").each(function(){
                $(this).removeClass("active"); 
            });
            var class_color = $(this).attr("class").split(" ");
            class_color = cross = class_color[1];
            $("#your_stake_block").attr("class", "section "+class_color);
            $("#your_stake_block .bottom_info").html( $(this).find(" td.currency div").html());
            $(this).addClass("active");
        }
    });
    
    var width_td = 163/($("#tab_positining_ table tr").size());
    var height_td = 117/($("#tab_positining_ table td").size());
    $("#tab_positining_ table td").each(function(){
        $(this).css("width", Math.ceil(width_td+5) +"%"); 
        $(this).css("width", Math.ceil(height_td+5) +"%"); 
    });
    
    $("#list_num_funds .td_funds").live("click", function(){
        $("#list_num_funds .td_funds").each(function(){
            $(this).removeClass("active"); 
        });
        $(this).addClass("active"); 
    });
    
    //init value.. (ajax!)            
    var color_ = new Array("yellow", "red", "green", "blue", "pink");
    var currency_ = new Array("&pound;1", "50p", "20p", "10p", "1p");
    var pound_ = new Array("100,000", "50,000", "20,000", "10,000", "1,000");
    var placed_ = new Array(3, 3, 3, 3, 3);
    var left_ = new Array(7, 17, 47, 97, 997);
    
    var html_;
    //play now block (right_block)...
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
                            '<img src="themes/default/images/small_end.png" />'+
                        '</td>'+
                        '<td class="slider_vals_block" colspan="2" style="height: 20px;">'+
                            '<div id="slider_stake" style="width: 100px; display: none;" align="center"></div>'+
                            '<div id="slider_stake_big" style="width: 100px;" align="center"></div>'+                            
                        '</td>'+
                        '<td style="height: 20px; text-align:center;">'+
                            '<img src="themes/default/images/large_end.png" />'+
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
    
    //init value.. (ajax!)            
    var td_found_ = new Array("&pound;5", "&pound;10", "&pound;15", "&pound;20", "&pound;50", "&pound;100");
    
    //add funds block (right_block)...
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
    
    $("#slider_stake_big").slider({
        range: "min",
		value: 1,
		min: 0,
		max: 1,
		change: function(event, ui) { 
            slider_big_change();                       
		}
	});
    
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
    
    $("#slider_stake").hide();
    
    $("#your_balance_block .main_c .bottom_ a").live("click", function(){
        $("#your_balance_block .main_c .bottom_ a").each(function(){
            $(this).removeClass("active"); 
        });
        $(this).addClass("active");          
        
        if($(this).hasClass("play_now_btn")){
            $("#placed_main_block .bg_css3").each(function(){
                if($(this).hasClass("play_now_block__")) $(this).css("display", "block");
                else $(this).css("display", "none");
            });            
        }
        else if($(this).hasClass("add_funds_btn")){
            $("#placed_main_block .bg_css3").each(function(){
                if($(this).hasClass("add_funds_block__")) $(this).css("display", "block");
                else $(this).css("display", "none");
            });
        }
    });
    
    $("#tab_positining_ table td").live("click", function(){
        var num_tr = $(this).parents("tr").index();
        var num_td = $(this).index();
        
        $(".grid_div table").find("tr").eq(num_tr).find("td").eq(num_td).click();
    });
});