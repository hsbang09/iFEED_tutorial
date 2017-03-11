/**
 * 
 */


            

            
function click_leftarrow(){
	if(current_view==5){
		window.location.replace("iFEEDTutorial.html?48375937584=23413");
	}
	if(testType=="1"){
		if(current_view==24){
			current_view=20;
		}else if(current_view==19){
			current_view=11;
		}else if(current_view==11){
			current_view=18;
		}else if(current_view==12){
			current_view=5;
		}else{
			current_view = current_view-1; 	
		}
	}else if(testType=="2"){
		if(current_view==24){
			current_view=22;
		}else{
			current_view = current_view-1; 
		}
	}else{
		current_view = current_view-1; 
	}	
	current_view_displayed--;
	display_views();
}


function click_rightarrow(){
	if(testType=="1"){
		if(current_view==5){
			current_view=12;
		}else if(current_view==18){
			current_view=11;
		}else if(current_view==11){
			current_view=19;
		}else if(current_view==20){
			current_view=24;
		}else{
			current_view = current_view+1; 	
		}
	}else if(testType=="2"){
		if(current_view==22){
			current_view=24;
		}else{
			current_view = current_view+1; 
		}
	}else{
		current_view = current_view+1; 
	}	
	current_view_displayed++;
	display_views();
}




function clear_view(){
    	
        
    d3.select('#basicInfoBox_div')
        .style('border-width','1px')
        .style('border-color','#000000');
        
    d3.select('#filter_options').select('select')
        .style('border-width','0px')
        .style('border-color','#000000');

    d3.select('#getDrivingFeaturesButton')
        .style('border-width','0px')
        .style('border-color','#000000');

    d3.select('#applyFilterButton_new')
        .style('border-width','0px')
        .style('border-color','#000000');      

    d3.select('#StatusBar')
        .style('border-width','0px')
        .style('border-color','#000000');


	d3.select('#filter_application_status')
        .style('border-width','0px')
        .style('border-color','#000000');
	d3.select('#filter_application_save')
        .style('border-width','0px')
        .style('border-color','#000000');
	
//    d3.select('#selection_option_div').select('div')
//        .style('border-width','0px')
//        .style('border-color','#000000');
//    d3.select('#OptionsPane')
//        .style('border-width','1px')
//        .style('border-color','#000000');
//    d3.select('#cancel_selection')
//    	.style('border-width','0px')
//    	.style('border-color','#000000'); 
//    d3.select('#OptionsPane').select('div').select('div')
//    	.style('border-width','0px')
//    	.style('border-color','#000000');      
    
    d3.select('#scatterPlotFigure')
        .style('border-width','1px')
        .style('border-color','#000000');
	d3.select("#main_header").text("");
	d3.select("#main_text").text('');
	d3.select("#main_img").attr("src","")
			.style("width","0%")
			.style("opacity",0);
	d3.select("#main_text2").remove();
	d3.select("#main_img2").attr("src","")
			.style("width","0%")
			.style("opacity",0);
	d3.select("#main_text3").text('');
	d3.select("#main_img_credit").text("");
	activate_right_arrow();
	d3.select('#experiment_start_button').remove();
	
	
	
}




function display_views(){
	
	clear_view();
	var max_view=24;
	
	
	if(testType=="1"){
		max_view=16;
	}else if(testType=="2"){
		max_view=23;
	}

	
	
d3.select('#tutorial_page_number').text("" + current_view_displayed + "/"+ max_view);

if(current_view==5){ // Scatter plot panel
	d3.select("#main_header").text("Scatter Plot Panel")
	d3.select("#main_text").html('<p>The scatter plot panel (box highlighted in red) displays thousands of different designs '
		+' of satellite systems. Each dot corresponds to one design, and its location indicates '
		+'the corresponding'
		+' cost and science benefit score of the design.</p>'
		+'<p>You can zoom in and zoom out using your mouse wheel, or using pinching motion if you are using'
		+' a trackpad. You can also pan using your mouse.</p>');

	d3.select('#scatterPlotFigure')
		.style('border-width','5px')
		.style('border-color','#FF2D65');
}

else if(current_view==6){ // Target solutions
	
	select_archs_using_ids(mid_cost_mid_perf);
	
	d3.select("#main_header").text("Target designs")
	d3.select("#main_text").html('<p>For each task, a set of dots will be highlighted in a light blue color. '
		+' These dots represent the target designs that you need to investigate. </p>'
		+'<p>You will be asked to find patterns that are shared by these designs.</p>');
	d3.select('#scatterPlotFigure')
		.style('border-width','5px')
		.style('border-color','#FF2D65');
    d3.select("[id=numOfSelectedArchs_inputBox]").text(""+numOfSelectedArchs());            	
}

else if(current_view==7){ // Number of designs shown
	
	d3.select("#main_header").text("Number of designs")
	d3.select("#main_text").html('<p>The total number of designs and the number of selected designs are displayed in'
		+' the boxes above the scatter plot.</p>');
	d3.select('#StatusBar')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
}


else if(current_view==8){ 
	d3.select("#main_header").text("Analysis Panel")
	d3.select("#main_text").html('<p>The analysis panel is located below the scatter plot panel, '
			+'and you can use it to analyze the data displayed on the scatter plot.</p>');

	d3.select('#basicInfoBox_div')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
}


else if(current_view==9){
	if(max_view_reached<9){
		deactivate_right_arrow();
	}
	d3.select("#main_header").text("Design Inspection")
	d3.select("#main_text").html('<p>If you hover your mouse over a design on the scatter plot, '
			+' the relevant information will be displayed on the "Inspect Design" tab.</p>'
			+'<p>The displayed information conatains the science benefit score and the cost, as well as'
			+' a figure that shows what instruments are assigned to each orbit.</p>'
			+'<p>The borderline of either the scatter plot or the analysis panel will be represented by bold lines.'
			+' The bold line means that the panel is currently focused. When the analysis panel is focused, hovering the mouse'
			+' over a dot on the scatter plot will not change the information already displayed on the analysis panel.'
			+' To enable the inspection of designs by hovering, click the scatter plot to bring the focus back to the scatter plot.</p>'
			+'<p>To continue, try alternating the focus by clicking on the scatter plot and the analysis panel.</p>');

	document.getElementById('tab1').click();
	cancelDotSelections();
	unhighlight_basic_info_box();
	
	d3.select('#basicInfoBox_div')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
}

else if(current_view==10){
	d3.select("#main_header").text("Filters")
	d3.select("#main_text").html('<p>Filters can be used to highlight a group of designs '
		+'that share a common feature. For example, you can selectively highlight '
		+'designs that use instrument C in any orbit, or designs that assign instrument D and E to the orbit 4000. </p>'
		+'<p>Filters are useful to see how designs sharing the same '
		+'feature are distributed in a scatter plot. So, for example, you may discover that there is a large overlap between'
		+' the target designs and the designs that use instruments D and E.</p>'
		+'<p>The most basic and useful features have been identified and built into the filter options. '
		+'You can select one of these preset filters to specify what patterns you want to investigate.</p>');

document.getElementById('tab2').click();
highlight_basic_info_box();
d3.select('#basicInfoBox_div')
	.style('border-width','5px')
	.style('border-style','solid')
	.style('border-color','#FF2D65');
	
}


else if(current_view==11){
	if(max_view_reached < 11){
		deactivate_right_arrow();
	}
	d3.select("#main_header").text("Preset Filters: Present")
	d3.select("#main_text").html('<p>We will test some of the preset filters. The filter called \'Present\' '
			+'is used to selectively highlight designs that '
			+'contain a specific instrument. It takes in one instrument name as an argument,'
			+' and selects designs that have the given instrument in any orbit. Follow the directions below to activate it:</p>'
			+'<p>1. Select \'Present\' option from the dropdown menu. </p>'
			+'<p>2. In the input field that appears, type in an instrument name. '
			+'The instrument should be an alphabet letter ranging from A to L. </p>'
			+'<p>3. Then click [Apply filter] button to apply the filter.</p>');
	
	document.getElementById('tab2').click();
	highlight_basic_info_box();
	d3.select('#filter_options').select('select')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
	d3.select('#applyFilterButton_new')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');   
}


else if(current_view==12){
	if(max_view_reached<12){
		deactivate_right_arrow();
	}
	d3.select("#main_header").text("Preset Filters: InOrbit")
	d3.select("#main_text").html('<p>The filter called \'InOrbit\' is used to selectively highlight designs that '
			+'assigns a specific instrument to the given orbit. It takes in an orbit name and an instrument '
			+'name as arguments. To continue, follow the steps below:</p>'
			+'<p>1. Select \'InOrbit\' option from the dropdown menu. </p>'
			+'<p>2. In the first input field that appears, type in an orbit name. '
			+'The orbit name should be a number in thousands (1000, 2000, 3000, 4000, or 5000). </p>'
			+'<p>2. In the second input field, type in instrument names (1 or more). '
			+'The instrument should be an alphabet letter ranging from A to L. If there are more than one instruments,'
			+' the names should be separated by commas.</p>'
			+'<p>3. Then click [Apply filter] button to apply the filter.</p>');

	document.getElementById('tab2').click();
	highlight_basic_info_box();
	
	d3.select('#filter_options').select('select')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
	d3.select('#applyFilterButton_new')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
}

else if(current_view==13){
	if(max_view_reached<13){
		deactivate_right_arrow();
	}
	d3.select("#main_header").text("Preset Filters: together")
	d3.select("#main_text").html('<p>The filter called \'together\' is used to selectively highlight designs that '
			+'assigns a group of instrument together in the same orbit. It takes in multiple instrument '
			+'names as arguments. To continue, follow the steps below:</p>'
			+'<p>1. Select \'together\' option from the dropdown menu. </p>'
			+'<p>2. In the input field, type in multiple instrument names, separated by commas. '
			+'The instrument should be an alphabet letter ranging from A to L. </p>'
			+'<p>3. Then click [Apply filter] button to apply the filter.</p>');

	document.getElementById('tab2').click();
	highlight_basic_info_box();
	
	d3.select('#filter_options').select('select')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
	d3.select('#applyFilterButton_new')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
}

else if(current_view==14){
	if(max_view_reached<14){
		deactivate_right_arrow();
	}
	d3.select("#main_header").text("Preset Filters: Empty orbit")
	d3.select("#main_text").html('<p>The filter called \'Empty orbit\' is used to selectively highlight designs that '
			+'do not assign any instrument to the specified orbit. It takes in a single orbit name '
			+'as an argument. To continue, follow the steps below:</p>'
			+'<p>1. Select \'Empty orbit\' option from the dropdown menu. </p>'
			+'<p>2. In the input field, type in an orbit name. '
			+'The orbit name should be a number in thousands (1000, 2000, 3000, 4000, or 5000). </p>'
			+'<p>3. Then click [Apply filter] button to apply the filter.</p>');

	document.getElementById('tab2').click();
	highlight_basic_info_box();
	
	d3.select('#filter_options').select('select')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
	d3.select('#applyFilterButton_new')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
}


else if(current_view==15){
	if(max_view_reached<15){
		deactivate_right_arrow();
	}
	d3.select("#main_header").text("Preset Filters: Number of instruments")
	d3.select("#main_text").html('<p>The filter called \'Number of instruments\' is used to selectively highlight designs that '
			+'uses the specified number of instruments. '
			+'It has some flexibility in what arguments you enter to this filter. </p>'
			+'<p> If orbit name and instrument names are not given (input field empty), '
			+'then it will count the number of all instruments used in the design. </p>'
			+'<p> If orbit name is given, then it will count the number of instruments in that particular orbit. </p>'
			+'<p> If instrument name is given, then it will count the number of those instruments. </p>'
			+'<p> IMPORTANT: Either one of orbit name or instrument name should be empty.'
			+'<p>To continue, follow the steps below:</p>'
			+'<p>1. Select \'Number of instruments\' option from the dropdown menu. </p>'
			+'<p>2. Fill in the input fields. At least one of instrument or orbit names should be empty. The number cannot be empty.</p>'
			+'<p>3. Then click [Apply filter] button to apply the filter.</p>');

	document.getElementById('tab2').click();
	highlight_basic_info_box();
	
	d3.select('#filter_options').select('select')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
	d3.select('#applyFilterButton_new')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
}

else if(current_view==16){
	if(max_view_reached<16){
		deactivate_right_arrow();
	}
	d3.select("#main_header").text("Preset Filters: Num of instruments in a subset")
	d3.select("#main_text").html('<p>The filter called \'Num of instruments in a subset\' is used to selectively highlight designs that '
			+'assign to an orbit a certain number of instruments from a given set. To continue, follow the steps below:</p>'
			+'<p>1. Select \'Num of instruments in a subset\' option from the dropdown menu. </p>'
			+'<p>2. Put in an orbit name.</p>'
			+'<p>3. Put in the minimum and the maximum number of instruments.</p>'
			+'<p>4. Put in a group of instruments to be counted.</p>'
			+'<p>5. Then click [Apply filter] button to apply the filter.</p>'
			+'<p> For example, if you put 1000 as an orbit argument, 2 for the minimum number of instruments, and A,C,D,E '
			+' as instruments to be considered, the filter selects all designs that assigns at least two among {A,C,D,E} in orbit 1000. </p>');

	document.getElementById('tab2').click();
	highlight_basic_info_box();
	
	d3.select('#filter_options').select('select')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
	d3.select('#applyFilterButton_new')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
}


else if(current_view==17){
	if(max_view_reached<17){
		deactivate_right_arrow();
	    var filters = d3.selectAll('.applied_filter')[0];
	    for(var i=0;i<filters.length;i++){
	    	if(i>2){
	    		filters[i].remove();
	    	}
	    }
	}
	d3.select("#main_header").text("Filter Application Status")
	d3.select("#main_text").html('<p>When filters are applied, they appear on the Filter Application Status box. '
			+'You can use this interface to combine multiple filters and generate more complex filters. </p>'
			+'<p>The checkbox indicates whether the corresponding filter is activated or not.</p>'
			+'<p>The dropdown selection allows you to select logical connectives between filters.</p>'
			+'<p>Clicking the arrows allow you to control the indentation levels of filters. This acts as parentheses in'
			+' a mathematical expression. Filters with the same indentation level are evaluated together as if they are inside '
			+'parentheses.</p>'
			+'<p>To continue, try generating a combined filter that has a form: \'filterA and (filterB or filterC)\'. </p>');

	document.getElementById('tab2').click();
	highlight_basic_info_box();
	
	d3.select('#filter_application_status')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');
}

else if(current_view==18){ // skip for testType=='1'
	if(max_view_reached<18){
		deactivate_right_arrow();
	}
	d3.select("#main_header").text("Saving filters")
	d3.select("#main_text").html('<p>You can save the newly defined filter by clicking [Save currently applied filter scheme]'
				+' button. Saving a newly defined filter will allow you to further analyze it later in the data mining stage. </p>'
				+'<p>After defining your own filter, set the filter name by filling in the input field'
				+'<p>To continue, define your own filter by combining multiple filters and save it.</p>');
		
	document.getElementById('tab2').click();
	highlight_basic_info_box();
	
	d3.select('#filter_application_save')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');     
    
}

else if(current_view==19){ // Show only for testType= 2 or 3

	d3.select("#main_header").text("Data Mining - Driving Features")
	d3.select("#main_text").html('<p>iFEED also provides the data mining capability to help analyze the data.'
					+' The data mining capability extracts the driving features. Driving features are the unique patterns that '
					+'are shared by the target designs. '
					+'Extracting these patterns can be useful to learn what constitutes good designs. </p>'
					+'<p>To run data mining, just go to the driving features tab and click the [Run data mining] button.</p>');
	
	document.getElementById('tab3').click();
	highlight_basic_info_box();
	set_selection_option(2);
	cancelDotSelections();
	
	d3.select('#getDrivingFeaturesButton')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');  
}



else if(current_view==20){ // Show only for testType= 2 or 3
	
	d3.select("#main_header").text("Driving Features Explained")
	d3.select("#main_text").html('<p>The driving features are presented as bar graphs. Each bar '
			+'corresponds to one driving feature, and the height of the bar'
			+' indicates how well the feature describes the target designs.'
			+' As you hover your mouse over each bar, the relevant information is presented in 3 ways.</p>'
			+'<p>1. Tooltip shows the name of the feature, including the arguments such as instrument names'
			+' and orbit names. Also, tooltip presents some basic statistics to show the composition of '
			+'designs with the feature and the selected designs in the dataset.</p>'
			+'<p>2. Scatterplot highlights all the designs that have the given feature. </p>'
			+'<p>3. A Venn Diagram is presented to show the composition of designs with the feature and the'
			+' selected designs. The blue circle represents the selected designs, and the pink circle represents'
			+' designs with the feature.</p>');            				
	
	document.getElementById('tab3').click();
	highlight_basic_info_box();
	d3.select('#basicInfoBox_div')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');  
}


else if(current_view==21){ // Show only for testType= 2 or 3
	
	d3.select("#main_header").text("Combining features using bar graphs")
	d3.select("#main_text").html('<p>You can also combine multiple features by clicking on the bars. Similar to '
			+'combining filters, you can see what features are currently activated. On the Feature Application Status box. </p>'
			+'<p>Again, you can save the feature by clicking [Save current feature] button. When a new feature is saved, it appears'
			+' on the Filter Setting tab.</p>'
			+'<p>The point of saving new features is that they will be included in the future data mining runs. For example, try'
			+' selecting the first two driving features, and click [Save current feature] button.</p>'
			+'<p>Then click [Reset data mining] button and re-run data mining. You will be able to see the combined feature also included in the result. </p>'
			+'<p>Through an interative process of creating new features and runnning data mining, you can find features that better'
			+' describes the target designs.</p>');            				
	
	document.getElementById('tab3').click();
	highlight_basic_info_box();
	d3.select('#basicInfoBox_div')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');  
}


else if(current_view==22){ // Show only for testType= 3

	d3.select("#main_header").text("Data Mining: Classification Tree")
	d3.select("#main_text").html('<p>The driving features can also be presented using a classification tree. '
			+'Classification tree is a decision tree that classifies whether a design belongs to the target '
			+'selected region or not. Each node corresponds to one driving feature. All the designs start'
			+'from the root node (far left) and follow the branches depending on whether it contains '
			+'the driving feature specified at each node. If a design contains the driving feature, '
			+'it will follow the green line. Otherwise, it follow the red line.</p>'
			+'<p>Each leaf node (far right) can be expanded by clicking on the node. '
			+'When it is expanded, a new driving feature will replace that node and the tree size will grow. '
			+'The information displayed at each leaf node indicates whether the designs that reach the node '
			+'are classified as selected or not selected in the scatter plot. '
			+'The classification accuracy is displayed inside the parentheses. The “weight” indicates '
			+'the number of designs that reached the leaf node.</p>'
			+'<p>If you hover your mouse over a leaf node (far right), corresponding designs will be'
			+' highlighted on the scatter plot.</p>'
			+'<p>To continue, try expanding and collapsing the tree by clicking on the node.</p>');            				
	
	document.getElementById('tab4').click();
	highlight_basic_info_box();
	
	d3.select('#basicInfoBox_div')
		.style('border-width','5px')
		.style('border-style','solid')
		.style('border-color','#FF2D65');  
	
	if(d3.select('#getDrivingFeaturesButton')[0][0]){
		d3.selectAll('#getDrivingFeaturesButton')[0][0].disabled=false;
		}

}
else if(current_view==24){ 
	deactivate_right_arrow();
	
	d3.select("#main_header").text("Tutorial Finished")
	d3.select("#main_text").html('<p style="font-weight:bold;">This is the end of the tutorial. Now you can start the experiment. Please read the directions below carefully.</p>'
		+'<p style="font-weight:bold;">You will not be able to return to this tutorial. If you need to refer to the tutorial, you can refer to the '
		+'summarized manual provided in Mechanical Turk page.</p>'
		+'<p style="font-weight:bold;">Now you will be given 30 minutes to use iFEED. During this time, you are encouraged to take notes'
		+' (either physically using pencil and papers or electronically using a text editor on you computer).</p>'
		+'<p style="font-weight:bold">After the 30-minute session is over, the page will be automatically reloaded to a different page. You will be provided with'
		+' a key number. Please COPY THIS NUMBER BEFORE YOU CLOSE THE PAGE. You will need this key number to put into the survey page,'
		+' and it will be used as an indication that you completed the whole session.</p>'
		+'<p style="font-weight:bold"> At the end of the final page, a link to the problem set will be provided. '
		+'The problem set is designed to test how much knowledge you have gained during your use of iFEED. A sample problem set is '
		+'provided in the Mechanical Turk page. The actual questions will be of similar types to this problem set, but not exactly the same. '
		+'To do well on this test, you should: </p>'
		+'<p style="font-weight:bold;color:red;"> Try to identify the features that are shared by good designs (Designs with'
		+' high science score and low cost). </p>'
		+'<p>Now you can move on to the experiment by clicking the button below. Good luck!</p>');  

	d3.select('#main_div')
		.insert('button','#main_text3')
		.attr("type","button")
		.attr("id","experiment_start_button")
		.style("width","220px")
		.style("height","30px")
		.style("margin-top:20px");
	d3.select("#experiment_start_button")
		.text("Start the Experiment")
		.on("click", start_experiment);
	
}

}