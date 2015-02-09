"use strict";!function(w,$){w.ClickB=function(elementID,userOptions){function _init(){if(_mergeOptions(),(_options.max-_options.min)%_options.step!==0)throw"Blocks length should be multiple to step";_build()}function _mergeOptions(){if(!userOptions)return _options;if("string"==typeof userOptions&&(userOptions=JSON.parse(userOptions)),"undefined"!=typeof userOptions.stepLabelDispFormat&&"string"==typeof userOptions.stepLabelDispFormat){var fn;eval("fn = "+userOptions.stepLabelDispFormat),userOptions.stepLabelDispFormat=fn}for(var optionKey in _options)if(optionKey in userOptions)switch(typeof _options[optionKey]){case"boolean":_options[optionKey]=!!userOptions[optionKey];break;case"number":_options[optionKey]=Math.abs(userOptions[optionKey]);break;case"string":_options[optionKey]=""+userOptions[optionKey];break;default:_options[optionKey]=userOptions[optionKey]}return _options}function _build(){$("#steps_"+elementID).remove(),$("#"+elementID+"_parent").append(_options.readonly?'<div id="steps_'+elementID+'" class="ClickableBlocksSteps ClickableBlocksReadonly"></div>':'<div id="steps_'+elementID+'" class="ClickableBlocksSteps ClickableBlocksEdit"></div>'),_options.toolbar&&($("#steps_"+elementID).append('<div id="selector_steps_'+elementID+'" class="ClickableBlocksAllBlockSelector"><i class="fa  fa-lg fa-2x fa-plus-square"></i><i class="fa  fa-lg fa-2x fa-minus-square"></i></div>'),_options.readonly||($("#steps_"+elementID+" .ClickableBlocksAllBlockSelector i.fa-plus-square").on("click",function(){_planAll(this)}),$("#steps_"+elementID+" .ClickableBlocksAllBlockSelector i.fa-minus-square").on("click",function(){_unplanAll(this)})));for(var a=$("#steps_"+elementID),b=(_options.max-_options.min)/_options.step,c=0,d="",e="",f=0;b>f;f++){c=f*_options.step%60,0===c?(d="ClickableBlocksStepContentFullHour",e="ClickableBlocksStepFullHour"):30===c?(d="ClickableBlocksStepContentHalfHour",e="ClickableBlocksStepHalfHour"):(d="ClickableBlocksStepContentQuarter",e="ClickableBlocksStepQuarter"),0===f&&(d+=" ClickableBlocksStepContentStart",e+=" ClickableBlocksStepStart"),f===b-1&&(d+=" ClickableBlocksStepContentEnd",e+=" ClickableBlocksStepEnd");var g=_options.min+f*_options.step;$("<div/>",{id:"step_"+elementID+"_"+(Number(f)+1),"class":"ClickableBlocksStep "+e,style:"width: 1.1em;","data-start":g,html:'<span class="ClickableBlocksTick">'+_options.stepLabelDispFormat(g)+'</span><div class="ClickableBlocksStepContent '+d+'"></div></div>'}).appendTo(a)}$("#steps_"+elementID).append('<div id="selector_steps_'+elementID+'" class="ClickableBlocksMealSelector"><span class="ClickableBlocksTick">'+_options.stepLabelDispFormat(_options.min+b*_options.step)+'</span><i class="fa fa-cutlery fa-2x mealOff"></i></div>'),_options.readonly||$("#steps_"+elementID+" .ClickableBlocksMealSelector i.fa-cutlery").on("click",function(){_toggleMeal(this)}),_options.toolbar?$("#"+elementID+"_parent").css("width",1.1*b+10+"em"):$("#"+elementID+"_parent").css("width",1.1*b+4+"em")}function _addSteps(a,b,c,d){for(var e=0;e<a.length;e++)a[e].addClass("ClickableBlocksPlannedBlockBody"),a[e].attr("data-id",b.id),a[e].attr("data-colplanned",b.colplanned),a[e].attr("data-colunplanned",b.colunplanned),a[e].attr("data-colreal",b.colreal),a[e].attr("data-coladded",b.coladded),a[e].attr("data-colunreal",b.colunreal),a[e].attr("data-coldeleted",b.coldeleted),a[e].attr("data-planned",b.planned),a[e].attr("data-real",b.real),a[e].attr("data-block",a[0].attr("id")),a[e].find("div.ClickableBlocksStepContent").css("background",b[_getBackgroundColor(b.planned,b.real).color]),0===e&&(a[e].addClass("ClickableBlocksPlannedBlockStart"),a[e].attr("data-value",b.value),a[e].find("div.ClickableBlocksStepContent").html('<i class="'+_getBackgroundColor(b.planned,b.real).item+'">')),e===a.length-1&&a[e].addClass("ClickableBlocksPlannedBlockEnd"),_options.readonly||a[e].unbind("click").on("click",function(){_togglePlan(this)});_addMeal(c,d),"real"===_options.mode?"1"===d?_mealOn():_mealOff():"1"===c?_mealOn():_mealOff(),$(".ClickableBlocksPlannedBlockStart").has("div.ClickableBlocksStepContentFullHour").css("border-left","2px solid #656565"),"function"==typeof _onChange&&_onChange()}function _getBackgroundColor(a,b){return"real"!==_options.mode?"1"===a?{color:"colplanned",item:""}:{color:"colunplanned",item:""}:"1"===b&&"1"===a?{color:"colreal",item:"fa fa-check"}:"1"===b&&"0"===a?{color:"coladded",item:"fa fa-plus"}:"0"===b&&"0"===a?{color:"colunreal",item:""}:"0"===b&&"1"===a?{color:"coldeleted",item:"fa fa-minus"}:void 0}function _togglePlan(a){var b,c=$(a),d=$("[data-block="+c.attr("data-block")+"]");"real"===_options.mode?"1"===c.attr("data-real")?d.attr("data-real","0"):d.attr("data-real","1"):"1"===c.attr("data-planned")?d.attr("data-planned","0"):d.attr("data-planned","1"),b=_getBackgroundColor(c.attr("data-planned"),c.attr("data-real")).color,d.find("div.ClickableBlocksStepContent").css("background",d.attr("data-"+b)),d.find("div.ClickableBlocksStepContent").first().html('<i class="'+_getBackgroundColor(c.attr("data-planned"),c.attr("data-real")).item+'">'),"function"==typeof _onChange&&_onChange()}function _toggleMeal(a){$("div#steps_"+elementID+" .ClickableBlocksPlannedBlockStart").length>0&&($(a).hasClass("mealOff")?_mealOn():_mealOff())}function _addMeal(a,b){var c=$("#steps_"+elementID+" i.fa-cutlery");c.attr("data-meal",a),c.attr("data-rmeal",b)}function _mealOn(){var a=$("#steps_"+elementID+" i.fa-cutlery");a.addClass("click"),a.one("animationend webkitAnimationEnd onAnimationEnd",function(){a.removeClass("click")}),"real"===_options.mode?a.attr("data-rmeal",1):a.attr("data-meal",1);var b=_getBackgroundColor(a.attr("data-meal"),a.attr("data-rmeal")).color,c=$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockBody:first").attr("data-"+b);a.css("color",c),a.removeClass("mealOff").addClass("mealOn"),"function"==typeof _onChange&&_onChange()}function _mealOff(){var a=$("#steps_"+elementID+" i.fa-cutlery");a.addClass("click"),a.one("animationend webkitAnimationEnd onAnimationEnd",function(){a.removeClass("click")}),"real"===_options.mode?a.attr("data-rmeal",0):a.attr("data-meal",0);var b=_getBackgroundColor(a.attr("data-meal"),a.attr("data-rmeal")).color,c=$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockBody:first").attr("data-"+b);a.css("color",c),a.removeClass("mealOn").addClass("mealOff"),"function"==typeof _onChange&&_onChange()}function _planAll(a){$("div#steps_"+elementID+" .ClickableBlocksPlannedBlockStart").length>0&&("real"===_options.mode?$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockBody").attr("data-real","1"):$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockBody").attr("data-planned","1"),$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockBody").each(function(a,b){var c=_getBackgroundColor($(b).attr("data-planned"),$(b).attr("data-real")).color,d=$(b).attr("data-"+c);$(b).find("div.ClickableBlocksStepContent").css("background",d)}),$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockStart").each(function(a,b){var c=_getBackgroundColor($(b).attr("data-planned"),$(b).attr("data-real")).item;$(b).find("div.ClickableBlocksStepContent").html('<i class="'+c+'">')}),$(a).addClass("click"),$(a).one("animationend webkitAnimationEnd onAnimationEnd",function(){$(a).removeClass("click")}),($("div#steps_"+elementID+' div.ClickableBlocksPlannedBlockBody[data-start="720"]').length>0||$("div#steps_"+elementID+' div.ClickableBlocksPlannedBlockBody[data-start="735"]').length>0||$("div#steps_"+elementID+' div.ClickableBlocksPlannedBlockBody[data-start="750"]').length>0||$("div#steps_"+elementID+' div.ClickableBlocksPlannedBlockBody[data-start="765"]').length>0)&&_mealOn(),"function"==typeof _onChange&&_onChange())}function _unplanAll(a){$("div#steps_"+elementID+" .ClickableBlocksPlannedBlockStart").length>0&&("real"===_options.mode?$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockBody").attr("data-real","0"):$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockBody").attr("data-planned","0"),$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockBody").each(function(a,b){var c=_getBackgroundColor($(b).attr("data-planned"),$(b).attr("data-real")).color,d=$(b).attr("data-"+c);$(b).find("div.ClickableBlocksStepContent").css("background",d)}),$("#steps_"+elementID+" div.ClickableBlocksPlannedBlockStart").each(function(a,b){var c=_getBackgroundColor($(b).attr("data-planned"),$(b).attr("data-real")).item;$(b).find("div.ClickableBlocksStepContent").html('<i class="'+c+'">')}),$(a).addClass("click"),$(a).one("animationend webkitAnimationEnd onAnimationEnd",function(){$(a).removeClass("click")}),_mealOff(),"function"==typeof _onChange&&_onChange())}function _getStepssInRange(a,b){for(var c=[],d=Number(a/_options.step)-Number(_options.min/_options.step)+1,e=b/_options.step,f=0;e>f;f++){var g=Number(d)+f;c.push($("#step_"+elementID+"_"+g))}return c}var _stepLabelDispFormat=function(a){var b=Math.floor(Math.abs(a)/60);return Math.abs(a)%60===0?(10>b&&b>=0?"0":"")+b:""},_options={min:0,max:1440,step:30,stepLabelDispFormat:_stepLabelDispFormat,readonly:!1,toolbar:!0,mode:"plan"},_onChange=null;this.addBlocks=function(a){if("string"==typeof a&&(a=JSON.parse(a)),"undefined"!=typeof a){if("object"==typeof a.blocks)for(var b=[],c=0;c<a.blocks.length;c++)b=_getStepssInRange(a.blocks[c].start,a.blocks[c].value),_addSteps(b,a.blocks[c],a.meal,a.rmeal);return this}},this.getBlocks=function(){var a={},b=[],c=$("div#steps_"+elementID+" .ClickableBlocksPlannedBlockStart");return c.length>0&&c.each(function(a,c){var d={};d.id=c.getAttribute("data-id"),d.start=c.getAttribute("data-start"),d.value=c.getAttribute("data-value"),d.planned=c.getAttribute("data-planned"),d.real=c.getAttribute("data-real"),d.colplanned=c.getAttribute("data-colplanned"),d.colunplanned=c.getAttribute("data-colunplanned"),d.coldeleted=c.getAttribute("data-coldeleted"),d.colreal=c.getAttribute("data-colreal"),d.coladded=c.getAttribute("data-coladded"),d.colunreal=c.getAttribute("data-colunreal"),b.push(d)}),a.blocks=b,a.meal=$("div#steps_"+elementID+" .ClickableBlocksMealSelector i.fa").attr("data-meal"),a.rmeal=$("div#steps_"+elementID+" .ClickableBlocksMealSelector i.fa").attr("data-rmeal"),JSON.stringify(a)},this.setChangeCallback=function(callbackFunction){if("string"==typeof callbackFunction){var fn;eval("fn = "+callbackFunction),callbackFunction=fn}return"function"==typeof callbackFunction&&(_onChange=callbackFunction),this},_init()}}(window,jQuery),$(function(){Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;d>c;c++)if(this[c]===a)return c;return-1}),"function"!=typeof Array.prototype.forEach&&(Array.prototype.forEach=function(a){for(var b=0;b<this.length;b++)a.apply(this,[this[b],b,this])})});
