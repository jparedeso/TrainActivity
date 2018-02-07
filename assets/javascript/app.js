var TrainActivity = function() {

    var trainName = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency = "";
    var newData;

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
        addTrainToHTML()        
    }

    function initEventHandlers() {
        $("#submitButton").on("click", function(event) {
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
            frequency: frequency
        });
        $(".myInput").val("");
    }

    function addTrainToHTML() {
        database.ref().on("child_added", function(childSnapshot) {
            newTrainData = childSnapshot.val();
            $("#trainInfoTable").append(`
                <tr>
                    <td>${newTrainData.trainName}</td>
                <tr>
            `);
        });
    }

    return {
        init: init
    };
}();

$(function() {
    TrainActivity.init();
});









    // function login() {
    //      // Initialize Firebase
    //   var config = {
    //     apiKey: "AIzaSyAp6lBndBnWQIXB1uoGZEpJISR3YPKK8pM",
    //     authDomain: "trainactivity-d3485.firebaseapp.com",
    //     databaseURL: "https://trainactivity-d3485.firebaseio.com",
    //     projectId: "trainactivity-d3485",
    //     storageBucket: "",
    //     messagingSenderId: "347867649628"
    //   };
    //   firebase.initializeApp(config);

    // database = firebase.database();
    //     // FirebaseUI config.
    // var uiConfig = {
    //     signInSuccessUrl: 'home.html',
    //     signInOptions: [
    //         {
    //             provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
    //         },
    //         {
    //             provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //             requireDisplayName: true
    //         }
    //     ]
    // };

    // // Initialize the FirebaseUI Widget using Firebase.
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // // The start method will wait until the DOM is loaded.
    // ui.start('#firebaseui-auth-container', uiConfig);

    // firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //     }
    // }, function(error) {
    //     console.log(error);
    // });
    // }