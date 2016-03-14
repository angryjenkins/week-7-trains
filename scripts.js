$(document).ready(function(){
	var train, dest, firstTrain, freq;

	url = "https://mattmartintrains.firebaseio.com/";
	var dataRef =  new Firebase(url);

	$('#go').click(function(){
		train = $('#trainName').val().trim();
		dest = $('#destination').val().trim();
		firstTrain = $('#firstTrain').val().trim();
		freq = $('#frequency').val().trim();

		var minutes = moment().diff(moment(firstTrain), 'minutes');

		var minRemainder = mintues%freq;

		dataRef.push({
			train: train,
			destination: dest,
			firstTrain: firstTrain,
			frequency: freq,
			minutesAway: freq - minRemainder,
			nextArrival: moment().add(minutesAway, "minutes"),
			dateAdded: Firebase.ServerValue.TIMESTAMP
		});
		// Don't refresh the page!
		return false;
	});

	dataRef.on("child_added", function(childSnapshot) {
		// Log everything that's coming out of snapshot
		console.log(childSnapshot.val().train);
		console.log(childSnapshot.val().destination);
		console.log(childSnapshot.val().firstTrain);
		console.log(childSnapshot.val().frequency);
		console.log(childSnapshot.val().dateAdded)

		// full list of items to the table

	$('#results').append('<tr><td>' + childSnapshot.val().train + '</td><td>' + childSnapshot.val().destination + '</td><td>' + childSnapshot.val().firstTrain + '</td><td>' + childSnapshot.val().frequency + '</td><td>' + x + '</td><td>' + childSnapshot.val().minutesAway  + '</td>/tr>')
		// Handle the errors
	}, function(errorObject){
		console.log("Errors handled: " + errorObject.code)
	});
});