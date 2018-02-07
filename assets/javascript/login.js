var LoginPage = function() {

    function init() {
        login();
    }

    function login() {
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

        database = firebase.database();
            // FirebaseUI config.
        var uiConfig = {
            signInSuccessUrl: 'home.html',
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
                },
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: true
                }
            ]
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            }
        }, function(error) {
            console.log(error);
        });
    }
    return {
        init: init
    };
}();

$(function() {
    LoginPage.init();
});

