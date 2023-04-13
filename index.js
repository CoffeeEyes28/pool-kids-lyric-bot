require('dotenv').config({path: __dirname + '/.env'});

const cron = require('cron').CronJob

const { twitterClient } = require('./twitter.js');


let lyrics = require("./lyrics");

let tweetedLyrics = [];

console.log(lyrics[25]);

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
