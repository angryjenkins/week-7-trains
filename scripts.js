var trainTracker = new Firebase("https://mattmartintrains.firebaseIO.com");

function pushData(){
	
	console.log(moment.unix(firstTimeConverted));

	console.log(name);
	console.log(dest);
	console.log(firstTime);
	console.log(freq);

	var diffTime = moment().diff(moment.unix(firstTimeConverted), "minutes");
	console.log(diffTime);

	var rem = diffTime % freq;
	console.log(rem);

	var minutesTill = freq - rem;
	console.log(minutesTill);

	var nextTrain = moment().add(minutesTill, "minutes");
	console.log(moment(nextTrain).format("HH:mm"));


	trainTracker.push({
	  name: name,
	  destination: dest,
	  first: firstTime,
	  frequency: freq,
	  // next: nextTrain,
	  // minutesTo: minutesTill
	})

	$("#name").val("");
	$("#destination").val("");
	$("#first").val("");
	$("#frequency").val("");
};

trainTracker.on("child_added", function(snap){
    $("#results").append("<tr><td>" + snap.val().name + "</td><td>" + snap.val().destination + "</td><td>" + snap.val().frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTill + "</td></tr>");
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#go").click(function(){
  pushData();
});
$(window).keyup(function(e) { 
  if(e.keyCode == 13){
    pushData();
  }
});