var TrainActivity = function() {

    var trainName = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency = "";
    var newTrainData;
    var nextTrainArrival;
    var minutesAway;
    var myInterval;

       // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAp6lBndBnWQIXB1uoGZEpJISR3YPKK8pM",
        authDomain: "trainactivity-d3485.firebaseapp.com",
        databaseURL: "https://trainactivity-d3485.firebaseio.com",
        projectId: "trainactivity-d3485",
        storageBucket: "",
        messagingSenderId: "347867649628"
    };
    firebase.initializeApp(config);

     var database = firebase.database();

    function init() {
        // login();
        initEventHandlers();
        addTrainToHTML();
        var updateTI = setInterval(updateTrainInfo, 100);
    }


    function initEventHandlers() {
        $("#submitButton").on("click", function(event) {
            event.stopPropagation();
            trainName = $("#trainName").val().trim();
            destination = $("#destination").val().trim();
            firstTrainTime = $("#firstTrainTime").val().trim();
            frequency = $("#frequency").val().trim();
            pushDataToDatabase();
        });
    }

    function pushDataToDatabase () {
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
        });
        $(".myInput").val("");
    }

    function addTrainToHTML() {
        database.ref().on("child_added", function(childSnapshot) {
            newTrainData = childSnapshot.val();
            nextArrival();
            $("#trainInfoTable").append(`
                <tr>
                    <td>${newTrainData.trainName}</td>
                    <td>${newTrainData.destination}</td>
                    <td>${newTrainData.frequency}</td>
                    <td>${nextTrainArrival}</td>
                    <td>${minutesAway}</td>
                <tr>
            `);
        });        
    }

    function nextArrival() {
        firstTrainTime = newTrainData.firstTrainTime;
        frequency = newTrainData.frequency;
        var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
        var timeApart = (moment().diff(moment(firstTrainTimeConverted), "minutes")) % frequency;
        minutesAway = frequency - timeApart;
        nextTrainArrival = moment(moment().add(minutesAway, "minutes")).format("hh:mm A");
    }

    function updateTrainInfo() {        
        $("#trainInfoTable").html("");
        addTrainToHTML();        
    }

    return {
        init: init
    };
}();

$(function() {
    TrainActivity.init();    
});