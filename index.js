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

rl.question("Enter artist name: ", async (artistName) => {
  try {
    const encodedArtist = encodeURIComponent(artistName);

    const url = `https://api.spotify.com/v1/search?q=${encodedArtist}&type=artist&limit=1`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();
    const artists = data.artists.items;

    if (artists.length === 0) {
      console.log("No artist found.");
    } else {
      console.log(`Artist: ${artists[0].name}`);
      console.log(`Popularity: ${artists[0].popularity}`);
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    rl.close();
  }
});
