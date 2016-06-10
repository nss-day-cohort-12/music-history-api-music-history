"use strict";

app.factory('newAuthFactory', [

function () {

	let currentUser = null;

	return {
		getUser () {
			return currentUser;
		},
		setUser (user) {
			currentUser = user;
		}
	}
}


]);