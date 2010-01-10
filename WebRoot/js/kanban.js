$(document).ready(function(){

	var status_tipo = [];
	status_tipo['BACKLOG'] = "yellow";
	status_tipo['INPROGRESS'] = "green";
	status_tipo['DONE'] = "pink";

	var completa = function(el) {
		$("#project\\.id").val(el.id);
		console.log($("#project\\.id").val());
		$("#auto_project").css("display", "none");
	}

	var droppable_model = function(color) {
		return {
			tolerance:'fit',
			drop: function(event, ui) {
				$(ui.draggable).css("background-color", color);
				var status = this.id;
				var story = {
					id:$(ui.draggable).attr("id") //, $dwrClassName:"Story"
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
		$('#'+retorno.status).
			append("<div id='"+retorno.id+"' class='story'> <span>"+retorno.id+"</span> <span>"+retorno.name+"</span></div>");
		$("#"+retorno.id)
			.css("background-color", status_tipo[retorno.status])
			.corner("dog tr 15px ")
			.draggable({
				helper: function() {
					return $(this).clone();
				},
				containment:'document',
				revert: 'invalid',
				snap: true,
				opacity: 0.35
			});
	};
	
	 $("#BACKLOG").droppable(droppable_model("yellow"));
	 $("#INPROGRESS").droppable(droppable_model("green"));
	 $("#DONE").droppable(droppable_model("pink"));
	
	$("#project\\.name").keyup(function() {
		if ($(this).val().length > 3) {
			var project = {
					$dwrClassName:'Project',
					name: $(this).val()
				};
				AjaxFacade.autocompletar(project, {
					callback: function(retorno) {
						if (retorno.length > 0) {
							$("#project\\.id").attr("value", retorno[0].id);
							$("#project\\.name").attr("value", retorno[0].name);
						}
						console.log(retorno.toSource());
					},
					errorHandler: function(msg, error)  {
						console.log(msg);
					}
				});	
		}
		console.log($(this).val());

	});
	
	
	$("#dialog > form > input[type=button]").click(function(){
		var project_id = $("#project\\.id").val();
		var story_name = $("#name").val();
		if(project_id == "") {
			throw new Error("Preencha o projeto");
		}
		if(story_name == "") {
			throw new Error("Preencha o nome");
		}
		var story = {
			$dwrClassName:'Story',
			project: {id:project_id},
			status: $("#status > option:selected").attr("id"),
			name: story_name
		};
		AjaxFacade.save(story, {
			callback: function(retorno) {
				$("#project\\.id").attr("value", "");
				$("#project\\.name").attr("value", "");
				console.log(retorno.toSource());
				colar_no_quadro(retorno);
				$("#dialog").dialog('close');
			},
			errorHandler: function(msg, error)  {
				console.log(msg);
			}
		});
	});
	
	$("#create_card").click(function(){
		$("#dialog").dialog({
			bgiframe:true, 
			height:330,
			modal:true,
			buttons: {
				//"Salvar": create_story,
				Cancel: function() {
					$("#project\\.id").attr("value", "");
					$("#project\\.name").attr("value", "");
					$(this).dialog('close');
				}
			}
		}).dialog('open');
	});
	
	var story = {$dwrClassName:'Story'};
	AjaxFacade.find(story, {
		callback: function(retorno) {
			var lista = retorno.results;
			for (var x in lista) {
				var bean = lista[x];
				colar_no_quadro(bean);
			}
		},
		errorHandler: function(msg, error)  {
			console.log(msg);
		}
	});

});