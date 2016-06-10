"use strict";


app.controller("songListCtrl", [
  "$scope",
  "$http",
  "$location",
  "song-factory",

  function ($scope, $http, $location, songFactory) {
    // Default property values for keys bound to input fields
    $scope.songs = [];

    // Invoke the promise that reads from Firebase
    songFactory().then(
      function (songsObj) {
      // Handle resolve() from the promise
        Object.keys(songsObj).forEach(function (key) {
          songsObj[key].id = key;
          $scope.songs.push(songsObj[key]);
        })
        console.log($scope.songs); 
      },

      // Handle reject() from the promise
      function (err) {
        console.log(err)
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



  // End dependancy function
  }
]);