function NewGame() {
	$(document.body).html("");

	$.when(GetMap()).done(function(data){
		console.log( "JSON Data: " + data.map );
		RenderMap(data);
	});
	
};

$(function() {
	NewGame();
});