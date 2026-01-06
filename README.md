# Spotify Playlist Popularity Analyzer
A Node.js CLI tool that fetches the user's public Spotify playlists and the popularity score of each track using the Spotify Web API. These values are used to determine a "mainstream score" between 0-100 that describes the user's tendency either towards niche or global artists.

This project demonstrates:
- one
- two
- three

## Tech Stack
- one
- two
- three

## Prerequisites
You'll need:
- Spotify Developer account
- Registered Spotify app
- Spotify refresh token with playlist access

## Installation and usage
:one: Install dependencies  
:two: Create a .env file in the project root

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

```
### :warning: **Never commit your ```.env``` file**
It is in the ```.gitignore``` file currently.

:three: Run the script.  
:four: Enter your Spotify user ID found by navigating to your profile on the Spotify browser version and copying the string following ```https://open.spotify.com/user/``` in the address bar.

## Output
The script outputs the user's maintstream score and a scale describing its meaning.

Example output:
```
Your mainstream score: 45.49358307318765
        0-20: Deep niche/obscure. You listen to underground, experimental, or very new artists.
        21-40: Niche but established. You listen to artists with loyal fanbases but limited mainstream exposure.
        41-60: Mid-Level. You listen to artists that are popular on Spotify playlists but not global chart leaders.
        61-80: Mainstream. You listen to widely recognized artists and keep up with popular music.
        81-100: Global/Mass Appeal. You mostly listen to the biggest artists in the world.
```





