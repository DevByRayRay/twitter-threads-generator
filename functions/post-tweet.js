import { TWITTER, THREAD } from '../functions-lib/twitter-client'
import { headers } from '../functions-lib/cors'

exports.handler = async function (event, context) {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: 'Ok' }
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, headers, body: JSON.stringify({ message: "Method Not Allowed" }) };
    }
    // your server-side functionality
    const { ut, uts } = event.queryStringParameters
    const parsedBody = JSON.parse(event?.body)
    const { message } = parsedBody
    const thread = THREAD(ut, uts)

    try {

        const messages = [
            {
                text: `“The greatest discovery of all time is that a person can change his future by merely changing his attitude.”
            – Oprah Winfrey`},
            {
                text: `“It’s a funny thing about life, once you begin to take note of the things you are grateful for, you begin to lose sight of the things that you lack.”
            – Germany Kent`},
            {
                text: `“Happiness is a quality of the soul…not a function of one’s material circumstances.”
            – Aristotle`}
        ];
        
        const tweets = await thread.tweetThread(messages)
        console.log("🚀 ~ file: post-tweet.js ~ line 33 ~ tweets", tweets)
        
        // const post = await twitter.post('statuses/update', { status: message })
        // const { data } = post
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                // data,
                tweets: tweets || []
            })
        }
        
    } catch (error) {
        console.error(error)
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ message: error })
        }
    }

}

async function tweetThread(client, thread) {
    let lastTweetID = [];
    const tweets = thread.map(async (status, index) => {
        let tweetConf = {
            status,
        }

        if (index !== 0) {
            tweetConf.auto_populate_reply_metadata = true
            tweetConf.in_reply_to_status_id = lastTweetID[index - 1]
        }
        
        console.log('status: ', tweetConf)
        const tweet = await client.post("statuses/update", tweetConf);
        lastTweetID.push(tweet.id_str);
    })

    return Promise.all(tweets)
  }

