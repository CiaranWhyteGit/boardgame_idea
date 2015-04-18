function NewGame() {
	$(document.body).html("");

	$.when(GetMap()).done(function(data){
		RenderMap(data);
	});
	
};

$(function() {
	NewGame();
});