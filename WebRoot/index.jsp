<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
   <title>Kanban Board</title>
	<link type="text/css" href="css/ui-darkness/jquery-ui-1.7.2.custom.css" rel="stylesheet" />
	<link rel="stylesheet" href="css/kanban.css" type="text/css">
	
	<script type='text/javascript' src='/kanbanboard/dwr/interface/AjaxFacade.js'></script>
  	<script type='text/javascript' src='/kanbanboard/dwr/engine.js'></script>
	
	<script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.7.2.custom.min.js"></script>
	<script src="js/jquery.corner.js" language="javascript" type="text/javascript"></script>
	
	<script type="text/javascript" src="js/form-jquery.js"></script>
	<script type="text/javascript" src="js/kanban.js"></script>
  </head>
  
  <body>
  	<div id="top">
  		<input type="button" value="Create Card" id="create_card">
  	</div>

    <div id="board">
    	<div id="BACKLOG" class="board2">
    		<span class="title">Backlog</span>
    	</div>
    	<div id="INPROGRESS" class="board2">
    		<span class="title">In Progress</span>
    	</div>
    	<div id="DONE" class="board2">
    		<span class="title">Done</span>
    	</div>
    </div>
    
    <div id="dialog" title="Create Story" style="display:none;">
    	<form id="form_create_story" action="#">
    		<label for="name">Name</label> <br/>
    		<input type="text" id="name" name="name"> <br/>
    		<label for="status">Status</label> <br/>
    		<select id="status" name="status">
    			<option id="0">BACKLOG</option>
    			<option id="1">INPROGRESS</option>
    			<option id="2">DONE</option>
    		</select>
    		<br/>
    		<input type="hidden" id="project.id" name="project.id">
    		<label for="project.name">Project</label>
    		<input id="project.name" name="project.name">
    		<div id="auto_project" style="display:none;"></div>
    		<br/>
    		<input type="submit" value="Enviar">
    		
    	</form>
    </div>
    
  </body>
</html>
