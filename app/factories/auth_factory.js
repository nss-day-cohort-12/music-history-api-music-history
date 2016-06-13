"use strict";

app.factory("authFactory", (firebaseURL, $http) => {

  let ref = new Firebase(firebaseURL);
  let currentUserData;
  let currentUID = null;

  return {
    // Checks if user is authenticated.
    isAuthenticated () {
      let authData = ref.getAuth();
      if (authData) {
        currentUserData = authData.uid;
        return true;    
      } else {
        return false;
      }
    },

    // getUser() returns the currentUserData which contains both the uid and userName.
    getUser () {
      return new Promise(function (resolve, reject) {
        $http.get(`${firebaseURL}/user_data/${currentUserData}.json`)
        .success(
          userObj => resolve(userObj),
          error => reject(error)
        )
      });
    },
    
    // Authenticates user through Firebase
    authenticate (credentials) {
      return new Promise(function (resolve, reject) {
        ref.authWithPassword({
          "email": credentials.email,
          "password": credentials.password
        }, function (error, authData) {
          if (error) {
            reject(error);
          } else {
            console.log("Auth with password completed with UID:", authData.uid);
            currentUID = authData.uid;
            resolve(authData);
          }
        });
      });
    },

    // Upon registration, storeUser() creates an object within the user_data object that contains the uid, userName, and user auth status.
    storeUser (authData, userEmail, userName) {
      let userRef = new Firebase(`${firebaseURL}/user_data/${authData}`);
      userRef.set({
        uid: authData,
        email: userEmail
      });
    }

  };
});













