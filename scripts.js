var trainTracker = new Firebase("https://mattmartintrains.firebaseio.com/");


$("#go").click(function(){
  pushData();
});
$(window).keyup(function(e) { 
  if(e.keyCode == 13){
    pushData();
  }
});

function pushData(){
  var name = $("#name").val().trim();
  var dest = $("#destination").val().trim();
  var firstArrival = new Date($("#first").val().trim());
  var freq = $("#frequency").val().trim();
  
  if(name != "" && dest != "" && firstArrival != "" && freq != ""){
    var diffTime = moment().diff(moment.unix(firstArrival), "minutes");
	console.log(diffTime);

	var tRemainder = diffTime % freq;
	console.log(tRemainder);
    
    var minutesTill = freq - tRemainder;
	console.log(minutesTill);

	var nextTrain = moment().add(minutesTill, "minutes")
	console.log(moment(nextTrain).format("HH:mm"));

    $("#name").val("");
    $("#destination").val("");
    $("#first").val("");
    $("#frequency").val("");

  

    trainTracker.push({
      name: name,
      destination: dest,
      first: firstArrival,
      frequency: freq,
      minutesTo: minutesTill,
      next: nextTrain
    });
  }
}

trainTracker.on("child_added", function(snap){
    $("#results").append("<tr><td>"+snap.val().name + "</td><td>"+snap.val().destination +"</td><td>" + snap.val().frequency + "</td><td>" + snap.val().next + "</td><td>" + snap.val().minutesTo + "</td></tr>");
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});