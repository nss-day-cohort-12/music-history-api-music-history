# Music History API

The final group project for Nashville Software School students. Bringing back the memories.

## Requirements

You are going to build an API and an Angular client to keep track of all of your favorite music tracks.

1. Every track must have the following properties.
    1. Title
    2. Album
    3. Genre
    4. Author
1. The albums that can be assigned to a track must have the following properties.
    1. Title
    2. Artist
    3. Year released
1. Your application must support multiple users.
1. Your application must allow users to authenticate, via OAuth, against a popular provider (i.e. Twitter, Facebook, etc.)
1. Your application must allow users to filter their track list on any of the properties of the track itself, or the album on which it is contained.

## UX Requirements

1. After a user has authenticated, a list of track should be displayed to the user. Just display the track title and the album title.
1. When the user clicks on a track, they will be be presented with a different view that shows all properties of the track and the album.
1. When the user is viewing the list of tracks, the user must be able to filter the list of tracks by any of the following properties.
    1. Album title
    2. Year released
    3. Author
    4. Genre
    5. Track title
