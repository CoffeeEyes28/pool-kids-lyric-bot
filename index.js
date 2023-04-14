require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const cron = require("cron").CronJob;
const { twitterClient } = require("./twitter.js");

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let lyrics = require("./lyrics");
const { CronJob } = require("cron");

let tweetedLyrics = [];

const tweetLyric = async () => {
  if (lyrics.length > 0) {
    let index = Math.floor(Math.random() * lyrics.length);
    let chosenLyric = lyrics.splice(index, 1)[0];

    tweetedLyrics.push(chosenLyric);

    
try {
  await createTweet(chosenLyric);
} catch (error) {
  console.log(error);
}
    
  } else {
    let lyrics = tweetedLyrics;
    tweetedLyrics = [];

    tweetLyric();
  }
}

const createTweet = async (lyricTweet) => {
  try {
    const regex = /(\n\s*)/g;
    const newTweet = lyricTweet.replace(regex, "\n");
    await twitterClient.v2.tweet(newTweet);
  } catch (error) {
    console.log(error);
  }
};

const cronTweet = new CronJob("* 0 */8 * * *", async () => {
  tweetLyric();
});

cronTweet.start();
