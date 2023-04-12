let lyrics = require("./lyrics");

let tweetedLyrics = [];

console.log(lyrics.length);

function tweetLyric() {
  if (lyrics.length > 0) {
    let index = Math.floor(Math.random() * lyrics.length);
    let chosenLyric = lyrics.splice(index, 1)[0];

    tweetedLyrics.push(chosenLyric);
  } else {
    let lyrics = tweetedLyrics;
    tweetedLyrics = [];

    tweetLyric();
  }
}
