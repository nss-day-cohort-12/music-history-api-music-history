"use strict";


app.controller("addSongCtrl", [
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

    $scope.add = function () {
      // POST the song to Firebase
      $http.post(
        "https://torrid-heat-5160.firebaseio.com/songs.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          title: $scope.song.title,
          artist: $scope.song.artist,
          album: $scope.song.album,
        })

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        () => console.log("Added song to firebase"),// Handle resolve
        (response) => console.log(response)  // Handle reject
      );

      $scope.findTitle = "";

    };










  // End dependancy function
  }
]);