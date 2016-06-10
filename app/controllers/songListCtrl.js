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
      $http.delete("https://torrid-heat-5160.firebaseio.com/songs/" + song.id + ".json")
      .then(
        $http.get("https://torrid-heat-5160.firebaseio.com/songs.json"),
        console.log("Song " + song.id + " deleted from collection.")
      )
    };

    // Unauth through Firebase/LogOut
    $scope.logout = () => {
      console.log("User is logged out.");
      ref.unauth();
    };



  // End dependancy function
  }
]);