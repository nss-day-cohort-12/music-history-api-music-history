"use strict";


app.factory("song-factory", function($q, $http) {

  function songFactory() {

    // Return a promise for our async XHR
    return $q(function(resolve, reject) {

      // Perform some asynchronous operation, resolve or reject 
      // the promise when appropriate.
      $http.get('http://localhost:55630/api/Song')
      .success(
        function(songsObj) {
          resolve(songsObj);
          // console.log("songsObj", songsObj);
        },function(error) {
          reject(error);
          console.log("Error:", error);
        }
      );
    });
  }
  return songFactory;
});