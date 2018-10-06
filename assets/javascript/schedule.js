//Start of Train JS Schedule

// Global vars

var trainName = "";
var trainTime = "";
var frequency = "";
var destination = "";

// Firebase  backend starts here

var config = {
  apiKey: "AIzaSyA-1ayBJTadIFR7baekXCRBhXprto0q9II",
  authDomain: "train-js.firebaseapp.com",
  databaseURL: "https://train-js.firebaseio.com",
  projectId: "train-js",
  storageBucket: "train-js.appspot.com",
  messagingSenderId: "609317396559"
};
firebase.initializeApp(config);

// Attach the firebase data to the var

var trainInfo = firebase.database();

// Add new train to schedule here

$("#submit-here").on("click", function(event) {
  //on click the function extracts data and places it in the user input
  var trainName = $("#trainInput")
    .val()
    .trim();
  var destination = $("#destinationInput")
    .val()
    .trim();
  var trainTime = moment(
    $("#timeInput")
      .val()
      .trim(),
    "HH:mm Military Time"
  ).format("LT");
  var frequency = $("#frequencyInput")
    .val()
    .trim();

  event.preventDefault();

  // If statements

  if (trainName === "") {
    alert("Enter train here");
    return false;
  }
  if (trainTime === "") {
    alert("Train Time");
    return false;
  }
  if (frequency === "") {
    alert("Train Frequency");
    return false;
  }
  if (destination === "") {
    alert("destination");
    return false;
  }

  // Moment.js variables and math breakdown

  var currentTime = moment().format("HH:mm");

  var firstTrainConverted = moment().subtract(trainTime, "minutes");

  var remainder = firstTrainConverted % frequency;

  var minUntilTrain = frequency - remainder;

  var nextTrain = moment()
    .add(minUntilTrain, "minutes")
    .format("HH:mm");

  // Console.logs for each var and moment.js input

  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(trainTime);
  console.log(minUntilTrain);
  console.log(remainder);
  console.log(firstTrainConverted);
  console.log(nextTrain);
  console.log(currentTime);

  // Train object data pushed to firebase with assigned values

  trainInfo.ref().push({
    name: trainName,
    time: trainTime,
    destination: destination,
    frequency: frequency,
    currentTime: currentTime,
    minUntilTrain: minUntilTrain,
    nextTrain: nextTrain
  });
});

// Referencing train data that is connected to the firebase and capturing values from objects

trainInfo.ref().on(
  "child_added",
  function(snapshot) {
    var savedV = snapshot.val();

    // savedV or "saved value" is taking a snapshot of the objects assigned

    console.log(savedV.name);
    console.log(savedV.destination);
    console.log(savedV.time);
    console.log(savedV.frequency);
    console.log(savedV.nextTrain);

    // Append values to the html with rows and tables

    $("#train-schedule").append(
      "<tr>" +
        "<td>" +
        savedV.name +
        "</td>" +
        "<td>" +
        savedV.destination +
        "</td>" +
        "<td>" +
        savedV.frequency +
        " min" +
        "</td>" +
        "<td>" +
        savedV.nextTrain +
        "</td>" +
        "<td>" +
        savedV.minUntilTrain +
        "</td>" +
        "</tr>"
    );
  },
  function(errorObject) {
    console.log("Errors spotted: " + errorObject.code);
  }
);
 // End of Schedule.js file






