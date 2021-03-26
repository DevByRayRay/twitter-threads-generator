import { TWITTER, THREAD } from '../functions-lib/twitter-client'
import { headers } from '../functions-lib/cors'

// Fix for netlify
require('encoding')

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
    const { messages } = parsedBody
    const thread = THREAD(ut, uts)

    try {

        console.log("🚀 ~ file: post-tweet.js ~ line 16 ~ messages", messages)
        let tweets = Array.isArray(messages) ? messages : [messages]
        const mappedTweets = tweets.map((tweetItem) => {
            return {
                text: tweetItem
            }
        })

        const maxTweets = mappedTweets.slice(0, 10)

        console.log("mappedTweets", maxTweets)
        console.log("mappedTweets", maxTweets.length)
        const sendTweetRequest = await thread.tweetThread(maxTweets)

        console.log("sendTweetRequest", sendTweetRequest.length)
        console.log("sendTweetRequest", sendTweetRequest)

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                // data,
                tweets: sendTweetRequest || []
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
