# spotify-mainstream-score
**Input your Spotify user ID and receive a score (0-100) that determines how mainstream your music taste is.**  
This CLI tool analyzes your public Spotify playlists and calculates a "mainstream score" based on how popular the tracks are.

# Features
- Easy CLI interface for calculating your **music mainstream score**
- Uses Spotify Web API to fetch playlist and track popularity
- Outputs a descriptive breakdown of your listening habits
- Lightweight and simple to run locally

# How it Works
The app:
1. Fetches all public playlists for your Spotify account
2. Retrieves each track's popularity score from the Spotify API
3. Computes an overall **mainstream score (0-100)**
4. Describes what that score means in terms of listening preferences

## Tech Stack
- JavaScript / Node.js
- Spotify Web API
- Node Package Manager (npm/yarn)

## Prerequisites
Before running the project, make sure you have:  
✔️ Node.js installed  
✔️ A **Spotify Developer account**  
✔️ A registered Spotify app  
✔️ A **Refresh Token** with playlist access  

## Installation
:one: Clone the repo
```
git clone https://github.com/sophmatheson-bit/spotify-mainstream-score.git
cd spotify-mainstream-score
```
:two: Install dependencies  

```npm install```  

:three: Create a ```.env``` file in the project root and add:
```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```
### :warning: ***Do not commit your ```.env``` file!*** It should be ignored via ```.gitignore```

## Usage
:one: Run the script:  

```npm start```  

:two: Follow the prompt to input your Spotify User ID.  

Your User ID is found in the URL when viewing your profile in a web browser:  

```https://open.spotify.com/user/<your_user_id>```

### Example output
```
Your mainstream score: 45.49358307318765
        0-20: Deep niche/obscure. You listen to underground, experimental, or very new artists.
        21-40: Niche but established. You listen to artists with loyal fanbases but limited mainstream exposure.
        41-60: Mid-Level. You listen to artists that are popular on Spotify playlists but not global chart leaders.
        61-80: Mainstream. You listen to widely recognized artists and keep up with popular music.
        81-100: Global/Mass Appeal. You mostly listen to the biggest artists in the world.
```

# Enhancement Ideas
- Employ ```/me``` endpoint to retrieve the User ID automatically
- Gather additional data such as listening habits over time
- A web UI to display user scores and stats





