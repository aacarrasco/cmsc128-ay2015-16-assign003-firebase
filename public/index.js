var myDataRef = new Firebase('https://luminous-torch-112.firebaseio.com');

$('input').keypress(function (e) {
	if (e.keyCode == 13) {
		console.log("taskName: " + $('#taskName').val() + " completed: " + $('#completed').is(":checked"));
		var name = $('#taskName').val();
		var completed;
		if($('#completed').is(":checked") == "on"){
			completed = "DONE";
		} else {
			completed = "NOT YET DONE"
		}
		
		myDataRef.push({taskName: name, completed: completed});
		$('#taskName').val('');
	}
});

myDataRef.on('child_added', function(snapshot) {
	var message = snapshot.val();
	displayChatMessage(message.taskName, message.completed);
});

function displayChatMessage(name, text) {
	$('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#resultDiv'));
	$('#resultDiv')[0].scrollTop = $('#resultDiv')[0].scrollHeight;
};