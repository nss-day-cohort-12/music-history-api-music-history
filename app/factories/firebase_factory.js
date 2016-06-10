"use strict";

// Returning a promise of the user movie data
app.factory("FirebaseFactory", ($q, $http) =>
  () =>
    $q((resolve, reject) => // Return a promise for our async XHR
      $http
        .get("https://torrid-heat-5160.firebaseio.com/songs.json")
        .success(
          userCollection => resolve(userCollection),
          error => reject(error)
        )
    )
);