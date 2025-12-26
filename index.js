import fetch from "node-fetch";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config({ quiet: true });

const ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.error("Missing SPOTIFY_ACCESS_TOKEN in .env");
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter Spotify user ID: ", async (userID) => {
  try {
    const encodedUser = encodeURIComponent(userID);

    const url = `https://api.spotify.com/v1/users/${encodedUser}/playlists`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
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
