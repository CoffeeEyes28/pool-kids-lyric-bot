const { TwitterApi } = require('twitter-api-v2');

const twitter = new TwitterApi({
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
})



const twitterClient = twitter.readWrite;


module.exports = { twitterClient };