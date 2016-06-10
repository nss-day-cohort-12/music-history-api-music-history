"use strict";

let app = angular.module("MusicHistory", ["ngRoute", "firebase"]).constant('firebaseURL', "https://torrid-heat-5160.firebaseio.com/");


/*
  Define a promise for any view that needs an authenticated user
  before it will resolve (see below)
 */
let isAuth = (authFactory) => new Promise((resolve, reject) => {
  if (authFactory.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

app.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/log-in.html',
        controller: 'logInCtrl'
      }).
      when('/songlist', {
        templateUrl: 'partials/song-list.html',
        controller: 'songListCtrl',
        resolve: {isAuth}
      }).
      when('/addsong', {
        templateUrl: 'partials/add-song.html',
        controller: 'addSongCtrl',
        resolve: {isAuth}
      }).
      // when('/logout', {
      //   templateUrl: 'partials/log-out.html',
      //   controller: 'logOutCtrl'
      // }).
      otherwise({
        redirectTo: '/songlist'
      });
  }]);


/*
  When the application first loads, redirect the user to the login
  form if there is no authentication
 */
app.run([
  "$location",

  ($location) => {
    let appRef = new Firebase("https://torrid-heat-5160.firebaseio.com/");

    appRef.onAuth(authData => {
      if (!authData) {

        console.log("onAuth detected unauthenticated client");
        $location.path("/login");
      }
    });
  }
]);


