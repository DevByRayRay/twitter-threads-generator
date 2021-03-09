const Twit = require('twit')
const { TwitThread } = require("twit-thread");
import Twitter from 'twitter-lite';
require('dotenv').config()

const { TWITTER_CLIENT, TWITTER_SECRET, TWITTER_ACCESS, TWITTER_ACCESS_SECRET } = process.env;

console.log('TWITTER_ACCESS_SECRET: ', { TWITTER_CLIENT, TWITTER_SECRET, TWITTER_ACCESS, TWITTER_ACCESS_SECRET })

const config = (userAccessToken, userAccesTokenSecret) => {
    return {
        consumer_key: TWITTER_CLIENT,
        consumer_secret: TWITTER_SECRET,
        access_token: userAccessToken || TWITTER_ACCESS,
        access_token_secret: userAccesTokenSecret || TWITTER_ACCESS_SECRET,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    }
}

const TWITTER = (userAccessToken, userAccesTokenSecret) => {
    console.info({ userAccessToken, userAccesTokenSecret })
    return new Twit(config(userAccessToken, userAccesTokenSecret))
}
const THREAD = (userAccessToken, userAccesTokenSecret) => {
    return new TwitThread(config(userAccessToken, userAccesTokenSecret))
}

export { TWITTER, THREAD }