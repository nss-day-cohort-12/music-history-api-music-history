"use strict";


app.controller("songListCtrl", [
  "$scope",
  "$http",
  "$location",
  "authFactory",
  "song-factory",
  "firebaseURL",

  function ($scope, $http, $location, authFactory, songFactory, firebaseURL) {
    // Default property values for keys bound to input fields

    let user = {};
    let ref = new Firebase(firebaseURL);

    $scope.songs = [];
    // $scope.artistFilter;
    // $scope.albumFilter;
    // $scope.genreFilter;

    // Get current user object
    authFactory.getUser().then(UserObj => {
      user = UserObj;
      }
    )
    .then(
      function () {
        return songFactory().then(
          function (songsObj) {
          // Handle resolve() from the promise
            Object.keys(songsObj).forEach(function (key) {
              songsObj[key].id = key;
              $scope.songs.push(songsObj[key]);
            })
            console.log("Songs Array", $scope.songs); 
            },

            // Handle reject() from the promise
            function (err) {
              console.log(err)
            }
          )
        }
    // End of invoke .then
    );

    $scope.deleteSong = function (song) {
      $http.delete("http://localhost:55630/api/Song/" + song.id)
      .then(
        $http.get("http://localhost:55630/api/Song")
        // console.log("Song " + song.id + " deleted from collection.")
      )
      .then(
        // After adding comment to database, return to the main portal
        function () {
          $location.path('#/songlist');
        }
      )
    }


    // Unauth through Firebase/LogOut
    $scope.logout = () => {
      console.log("User is logged out.");
      ref.unauth();
    };



  // End dependancy function
  }
]);