"use strict";

app.controller("logInCtrl",
[
  "$scope",
  "$location",
  "$http",
  "authFactory",
  "firebaseURL",

  function ($scope, $location, $http, authFactory, firebaseURL) {

    // Local variables
    let ref = new Firebase(firebaseURL);

    // Variables on $scope for use in DOM
    $scope.account = { email: "", password: "" };
    $scope.message = "";


    $scope.account = {email: "", password: ""};
    $scope.newAccount = {email: "", password: "", username: ""};


    // Registers a new user and creates a new user_data object.
    $scope.register = function () {
      $scope.account = $scope.newAccount;
      ref.createUser({
        // Set user with email and pw
        email: $scope.account.email,
        password: $scope.account.password
      }, function (error, userData) {
        if (error) {
          console.log(`Error creating user: ${error}`);
        } else {
          console.log(`Created user account with UID: ${userData.uid}`, userData);
          authFactory.storeUser(userData.uid, $scope.account.email, $scope.account.username);
          $scope.login();
        }
      });
    };

    
    // Attempt to authenticate the user with the supplied credentials.
    $scope.login = () => 
      authFactory
        .authenticate($scope.account)
        .then(() => {
          $location.path("/songlist");
          $scope.$apply();  // Needed for $location.path() to succeed
        });


  }
]);





















