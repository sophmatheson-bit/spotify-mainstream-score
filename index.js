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

async function getTracks(playlist) {
  try {
    const token2 = await getAccessToken();
    let url = playlist.tracks.href;
    const popularity = [];

    while (url) {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token2}`}
      });

      if(!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
      }

      const data2 = await response.json();

      popularity.push(
        ...data2.items
        .filter(item => item.track?.popularity != null)
        .map(item => item.track.popularity)
      );

      url = data2.next;
    }

    return popularity;
  }
  catch (err) {
    console.error(err.message);
    return [];
  }
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
      const results = await Promise.all(playlists.map(getTracks));
      const allPopularity = results.flat();
      //console.log(JSON.stringify(allPopularity))
      var sum = 0;
      for (var number of allPopularity) {
        sum += number;
      }
      const average = sum / allPopularity.length;
      console.log(`Your mainstream score: ${average}`);
      console.log(`        0-20: Deep niche/obscure. You listen to underground, experimental, or very new artists.
        21-40: Niche but established. You listen to artists with loyal fanbases but limited mainstream exposure.
        41-60: Mid-Level. You listen to artists that are popular on Spotify playlists but not global chart leaders.
        61-80: Mainstream. You listen to widely recognized artists and keep up with popular music.
        81-100: Global/Mass Appeal. You mostly listen to the biggest artists in the world.`)

    }
    
  } catch (err) {
    console.error(err.message);
  } finally {
    rl.close();
  }
});
