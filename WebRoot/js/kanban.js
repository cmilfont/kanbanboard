if(MILFONT == undefined) {
	var MILFONT = {};
}

var completa = function(el) {
	$("#project\\.id").val(el.id);
	console.log($("#project\\.id").val());
	$("#auto_project").css("display", "none");
}

MILFONT.Story = function() {
	
	var status_tipo = [];
	status_tipo['BACKLOG'] = "yellow";
	status_tipo['INPROGRESS'] = "green";
	status_tipo['DONE'] = "pink";

	var droppable_model = function(color) {
		return {
			tolerance:'fit',
			drop: function(event, ui) {
				$(ui.draggable).css("background-color", color);
				var status = this.id;
				var story = {
					id:$(ui.draggable).attr("id") //,	$dwrClassName:"Story"
				};
				var eu = this;
				AjaxFacade.update(story, status, {
					callback: function(retorno) {
						$(ui.draggable).appendTo(eu);
					},
					errorHandler: function(msg, error) {
						alert(error);
					}
				});
			}
		};
	};

	var colar_no_quadro = function(retorno) {
		$('#'+retorno.status).append("<div id='"+retorno.id+"' class='story'> <span>"+retorno.id+"</span> <span>"+retorno.name+"</span></div>");
		$("#"+retorno.id)
			.css("background-color", status_tipo[retorno.status])
			.corner("dog tr 15px ")
			.draggable({
				helper: function() {
					return $(this).clone();
				},
				containment:'document',revert: 'invalid', 
				snap: true,
				opacity: 0.35
			});
	};
	
	var init = function() {
		/*$("#tabs").tabs();*/
		
		$("#project\\.name").keyup(function(){
			
			filter = $(this).val();
			if(filter.length > 0) {
				
				var project = {
					$dwrClassName:'Project',
					name:filter
				};
				console.log(filter);
				var callback = {
					callback:function(retorno) {
						var list = "<ul>";
						for(var x in retorno) {
							var bean = retorno[x];
							list += "<li id='"+bean.id+"' onclick='completa(this);'>"+bean.name+"</li>";
						}
						list += "</ul>";
						$("#auto_project").html(list);
						$("#auto_project").css("display", "block");
					}, 
					errorHandler: function(msg, error) {
						console.log("Error: " + msg);
					}
				};
				AjaxFacade.autocompletar(project, callback);
			}
			
		});
		
		$("#form_create_story").JsonForm(
				{$dwrClassName:"Story"}, 
				AjaxFacade.save,
				{
					callback: function(retorno) {
						colar_no_quadro(retorno);
						$("#dialog").dialog('close');
					}, 
					errorHandler: function(msg, error) {
						alert(error);
					}
				});
		
		$("#BACKLOG").droppable(droppable_model("yellow"));
		$("#INPROGRESS").droppable(droppable_model("green"));
		$("#DONE").droppable(droppable_model("pink"));
		
		$("#create_card").click(function() {
			$("#dialog").dialog({
				bgiframe:true, 
				height:330,
				modal:true,
				buttons: {
					//"Salvar": create_story,
					Cancel: function() {
						$(this).dialog('close');
					}
				}
				//,show:'fade'
			}).dialog('open');
		});
		
		AjaxFacade.find({$dwrClassName:'Story'}, {
			callback: function(retorno) {
				var stories = retorno.results;
				for (var x in stories) {
					var story = stories[x];
					colar_no_quadro(story);
				}
			},
			errorHandler: function(msg, error)  {}
		});
	};
	
	return {
		init:function() {
			init();
		}
	};
}();

$(document).ready(function() {
	//MILFONT.Story.init();
});


/*
var create_story = function() {
	var story = {
		name:$("#name").val(),
		status:$("#status").val(),
		$dwrClassName:"Story"
	};
	AjaxFacade.save(story, {
		callback: function(retorno) {
			colar_no_quadro(retorno);
		}, 
		errorHandler: function(msg, error) {
			alert(error);
		}
	});
	$("#dialog").dialog('close');
};*/