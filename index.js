require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const cron = require('cron').CronJob
const { twitterClient } = require('./twitter.js');

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})





let lyrics = require("./lyrics");
const { CronJob } = require('cron');

let tweetedLyrics = [];



function tweetLyric() {
  if (lyrics.length > 0) {
    let index = Math.floor(Math.random() * lyrics.length);
    let chosenLyric = lyrics.splice(index, 1)[0];
    
    tweetedLyrics.push(chosenLyric);

    createTweet(chosenLyric);

  } else {
    let lyrics = tweetedLyrics;
    tweetedLyrics = [];

    tweetLyric();
  }
}


const createTweet = async (lyricTweet) => {
try {

  await twitterClient.v2.tweet(`${lyricTweet}`);

} catch (error) {
  console.log(error);
  
}
}

const cronTweet = new CronJob("* 0 */8 * * *", async () => {

  tweetLyric();
})

cronTweet.start();