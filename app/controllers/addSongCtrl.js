"use strict";


app.controller("addSongCtrl", [
  "$scope",
  "$http",
  "$location",
  "song-factory",

  function ($scope, $http, $location, songFactory) {
    // Default property values for keys bound to input fields
    $scope.songs = [];
    $scope.name;
    $scope.artist;
    $scope.album;
    $scope.genre;

    $scope.checkGenre = function () {
      if ($('#Rock').is(':checked')) {
        $scope.genre = "Rock";
      } else if ($('#RB').is(':checked')) {
        $scope.genre = "R & B";
      } else if ($('#HipHop').is(':checked')) {
        $scope.genre = "Hip-Hop";
      } else if ($('#Classical').is(':checked')) {
        $scope.genre = "Classical";
      } else if ($('#Pop').is(':checked')) {
        $scope.genre = "Pop";
      } else if ($('#Country').is(':checked')) {
        $scope.genre = "Country";
      } else if ($('#Dance').is(':checked')) {
        $scope.genre = "Dance";
      } else if ($('#Other').is(':checked')) {
        $scope.genre = "Other";
      }
    };

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
          title: $scope.name,
          artist: $scope.artist,
          album: $scope.album,
          genre: $scope.genre
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