"use strict";


app.controller("addSongCtrl", [
  "$scope",
  "$http",
  "$location",
  "authFactory",
  "song-factory",

  function ($scope, $http, $location, authFactory, songFactory) {
    // Default property values for keys bound to input fields
    $scope.songs = [];
    $scope.name;
    $scope.artist;
    $scope.album;
    $scope.year;
    $scope.genre;
    $scope.image;
    $scope.currAlbumId;

    let user = {};

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
      authFactory.getUser().then(UserObj => {
        user = UserObj;
        }
      )
      .then(
        function () {
          $http.post(
            "http://localhost:55630/api/User",
            JSON.stringify({
              Username: user.Username,
              EmailAddress: user.EmailAddress,
              Artist: $scope.artist
            })
          )
        }
      )
      .then(
        function () {
          $http.post(
            "http://localhost:55630/api/Album",
            JSON.stringify({
              Name: $scope.album,
              Year: $scope.year,
              Artist: $scope.artist,
              MHUserId: user.MHUserId
            })
          )
        }
      )
      .then(
        function () {
        // POST the song to Firebase
        $http.post(
          "http://localhost:55630/api/Song",
          // Remember to stringify objects/arrays before
          // sending them to an API
          JSON.stringify({
            Name: $scope.name,
            AlbumId: 1,
            Artist: $scope.artist,
            album: $scope.album,
            genre: $scope.genre,
            image: $scope.image
          })
        )}
      // The $http.post() method returns a promise, so you can use then()
      )
      .then(
        () => console.log("Added song to firebase"),// Handle resolve
        (response) => console.log(response)  // Handle reject
      )
      .then(
        // After adding comment to database, return to the main portal
        function () {
          $location.path('/songlist');
        }
      )

      $scope.findTitle = "";

    };

  // End dependancy function
  }
]);