import fetch from "node-fetch";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config({ quiet: true });

let accessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  const now = Date.now();

  // Reuse token if still valid
  if (accessToken && now < tokenExpiresAt) {
    return accessToken;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
    })
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status}`);
  }

  const data = await response.json();

  accessToken = data.access_token;
  tokenExpiresAt = now + data.expires_in * 1000;

  return accessToken;
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter Spotify user ID: ", async (userID) => {
  try {
    const encodedUser = encodeURIComponent(userID);

    const url = `https://api.spotify.com/v1/users/${encodedUser}/playlists`

    const token = await getAccessToken();

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();
    const playlists = data.items;

    if (playlists.length == 0) {
        console.log("No public playlists found.");
    }
    else {
        console.log(`Found ${playlists.length} playlists:\n`);

        playlists.forEach((playlist, index) => {
            console.log(`${index + 1}. ${playlist.name}`);
            console.log(`   Tracks: ${playlist.tracks.total}`);
            console.log(`   Track endpoint: ${playlist.tracks.href}`);
            console.log(`   Public: ${playlist.public}`);
            console.log("");
        });
    }
    
  } catch (err) {
    console.error(err.message);
  } finally {
    rl.close();
  }
});
