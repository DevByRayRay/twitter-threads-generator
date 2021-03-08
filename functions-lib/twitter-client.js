var Twit = require('twit')
require('dotenv').config()

const { TWITTER_CLIENT, TWITTER_SECRET, TWITTER_ACCESS, TWITTER_ACCESS_SECRET } = process.env;

console.log('TWITTER_ACCESS_SECRET: ', { TWITTER_CLIENT, TWITTER_SECRET, TWITTER_ACCESS, TWITTER_ACCESS_SECRET })
const TWITTER = () => {
    return new Twit({
        consumer_key: TWITTER_CLIENT,
        consumer_secret: TWITTER_SECRET,
        access_token: TWITTER_ACCESS,
        access_token_secret: TWITTER_ACCESS_SECRET,
        timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    })
}

export { TWITTER }