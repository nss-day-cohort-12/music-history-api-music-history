"use strict";


$(document).ready(function() {
	$('.optionContainer').hide();
	$('#navbar').hide();
	$('#primary-container').hide()
	$('.messageDiv').hide();
	$('#mainHeader').show();
	$('#loginModal').show();
});

$('#registerBtn').click(function() {
	let newUserEmail = $('#login_name').val();
	let newUserPW = $('#password_text').val();
	console.log(newUserEmail, newUserPW);

	var registerRef = new Firebase("https://torrid-heat-5160.firebaseio.com/");
	registerRef.createUser({
	  email    : newUserEmail,
	  password : newUserPW
	}, function(error, userData) {
	  if (error) {
	    console.log("Error creating user:", error);
	    alert("I'm sorry. You can not register with that information.");

	    $('#login_name').val("");
			$('#password_text').val("");

	  } else {
	    console.log("Successfully created user account with uid:", userData.uid);

	    $('.optionContainer').slideDown('slow');
	    $('#navbar').show();
			$('#primary-container').show()
			$('#mainHeader').show();
			$('.messageDiv').show();
			$('#loginModal').hide();
			$('#exampleModal').modal('hide');
	  }
	});

	$('#login_name').val("");
	$('#password_text').val("");

});


$('#loginBtn').click(function() {
	let regEmail = $('#login_name').val();
	let regPW = $('#password_text').val();

	var loginRef = new Firebase("https://torrid-heat-5160.firebaseio.com/");
	loginRef.authWithPassword({
	  email    : regEmail,
	  password : regPW
	}, function(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	    alert("I'm sorry. Those are invalid login credentials.")
	  } else {
	    console.log("Authenticated successfully with payload:", authData);

	    $('.optionContainer').slideDown('slow');
	    $('#navbar').show();
			$('#primary-container').show()
			$('#mainHeader').show();
			$('.messageDiv').hide();
			$('#loginModal').hide();
			$('#exampleModal').modal('hide');
	  }
	});

	$('#login_name').val("");
	$('#password_text').val("");

});


// Create a callback which logs the current auth state
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
    $('.optionContainer').slideUp('slow');
    $('#navbar').hide();
		$('#primary-container').hide()
		$('.messageDiv').show();
		$('#loginModal').show();
  }
};

// Register the callback to be fired every time auth state changes
var authRef = new Firebase("https://torrid-heat-5160.firebaseio.com/");
authRef.onAuth(authDataCallback);


$('#logoutBtn').click(function () {
	authDataCallback(null);
});


$.ajax({
  url: "https://torrid-heat-5160.firebaseio.com/songs.json",
  method: "GET"
	}).done(function(songsObj) {
	console.log("Songs Object:", songsObj);

	// Object.keys returns an array of keys.
	let songKeys = [];
	Object.keys(songsObj).forEach((key) => {
		songKeys.push(key)
		console.log("songKeys", songKeys);
	});

	// Creates and empty array in which the songsObj data is stored.
	let songsArray = [];
	songsArray = $.map(songsObj, function(value) {
  	return value;
	});

	// This is the primary output element in which new song input will be added
	let playlistOutput = $('#playlistId');

	// These are the two primary output elements for accepting new artist and new album options to add to the selectable dropdown menus.
	let newArtistOption = $('#artistSelect');
	let newAlbumOption = $('#albumSelect');

	// This is the large 'add music to playlist button' in the 'add music' div.
	let saveToPlaylistBtn = $('#saveNewSongBtn');

	// Place new string into html doc using data from the songsArray.
	function populate () {
		$(playlistOutput).html("");
		$(newArtistOption).html("");
		$(newAlbumOption).html("");
		for (let i = 0; i < songsArray.length; i++) {
			let playlistHtml = 			`<div id="sortable"><div class='col-md-12 newSong'>
																<div class='panel panel-default col-md-10'>
																	<div class='panel-heading'>
																		<h3 class='panel-title'>${songsArray[i].title}</h3>
																	</div>
																	<div class='panel-body'>
																		<strong>${songsArray[i].artist}</strong> ${songsArray[i].album}
																		<div class="col-md-11">
																  	</div>
																  	<div class="col-md-1">
																  		<button id="${i}" class="btn btn-primary deleteBtn">Delete</button>
																  	</div>
																	</div>
																</div>
																<div class='albumCover col-md-2'>
																	<a href'#' class='thumbnail'>
																		<img src='${songsArray[i].image}'>
																	</a>	
																</div>
															</div></div>`;
			$(playlistOutput).append(playlistHtml);
	// Adds artist and album options to the selectable dropdown menus.
			$(newArtistOption).append(`<option>${songsArray[i].artist}</option>`);
			$(newAlbumOption).append(`<option>${songsArray[i].album}</option>`);
		};
	// Adds delete functionality to delete buttons on each song.
		$('.deleteBtn').click(removeSong);
	};

	// This call is the first call of the loopArray function, which populates the array for the first time.
	populate();
	console.log("songsArray", songsArray);

	// Once the user fills out the song form and clicks the add button, you should collect all values from the input fields, add the song to your array of songs, and update the song list in the DOM.
	function addOnClick () {
	// Places the new object of entered song into the variable 'addedSong'.
		let addedSong = {title: $('#newSongBox').val(), artist: $('#newArtistBox').val(), album: $('#newAlbumBox').val(), image: "http://24.media.tumblr.com/tumblr_m3j315A5l31r6luwpo1_500.png"};
	// adds new song input from the 'add music' page to the beginning of the songsArray.
		songsArray.unshift(addedSong);
	// Resets all text box values to empty strings.
		$('.textInputBox').val('');
	// Adds delete functionality to delete buttons on each song.
		$('.deleteBtn').click(removeSong);
	// After the new song is placed into the array, the loopArray function is called again to refresh the array and the playlist div.
		populate();
		console.log("songsArray", songsArray);
	// .stringify before POSTing the addedSong to the database.
	// POST to your database.
		$.ajax({
		 url: "https://torrid-heat-5160.firebaseio.com/songs.json",
		 method: "POST",
		 data: JSON.stringify(addedSong)
		}).done(function(theNewSong) {
		console.log("The New Song:", theNewSong)
		});
	};

	$(saveToPlaylistBtn).click(addOnClick);

	// Removes index from array, then calls populate to refresh DOM with updated array data.
	function removeSong (removeEvt) {
		if (removeEvt.target.innerHTML === 'Delete') {
			let buttonId = removeEvt.target.id;
			songsArray.splice(buttonId, 1);
	// Uses the songKeys array and the ID of the target element to store that key into removedSong for data deletion.
			let removedSong = songKeys[buttonId];
			console.log("index", buttonId);
			console.log(removedSong);
	// Delete from firebase the selected key, stored in the value removedSong.
			$.ajax({
			 url: `https://torrid-heat-5160.firebaseio.com/songs/${removedSong}.json`,
			 method: "DELETE",
			}).done(function() {
			console.log("songsArray", songsArray);
			});
			
		};
		populate();
	};

	// In the navigation bar, make sure you have two links labeled "List Music", and "Add Music".
	// Add a DOM element that contains some input fields for the user to enter in the name of a song, the artist for the song, and the album. You do not need to enclose them in a <form> element because we're not actually submitting this form anywhere.
	// Add a <button> element at the bottom of the input fields labeled "Add".
	// The input fields and the add button make up the Add Music View.
	// The existing view - the combination of the filter form and the song list - will be referred to as the List Music View.
	// The Add Music View should not appear when the user first visits your page. The song list with the corresponding filter form should be visible.

	// These are the navbar buttons
	var homeButton = $('#homeNavBtn');
	var myMusicBtn = $('#viewMusicNavBtn');
	var addMusicBtn = $('#addMusicNavBtn');

	// This is the div containing all elements and input fields for adding a new song to the playlist.
	var addSongDiv = $('addSongPage');

	// When the user clicks on "Add Music" in the navigation bar, the List Music View should be hidden, and the Add Music View should be shown (see example wireframe).
	function addMusicPage () {
		$('#playlistId').addClass('hide');
		$('#addSongPage').removeClass('hide');
	};

	// When the user clicks on "List Music" in the naviation bar, the Add Music View should be hidden, and the List Music View should be shown (see example wireframe).
	function listMusicPage () {
		$('#playlistId').removeClass('hide');
		$('#addSongPage').addClass('hide');
	};

	$(myMusicBtn).click(listMusicPage);
	$(addMusicBtn).click(addMusicPage);
	$(homeButton).click(listMusicPage);

// End of $.done IIFE
});



