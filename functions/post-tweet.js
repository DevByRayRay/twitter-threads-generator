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

        // const messages = [
        //     {
        //         text: `“The greatest discovery of all time is that a person can change his future by merely changing his attitude.”
        //     – Oprah Winfrey`},
        //     {
        //         text: `“It’s a funny thing about life, once you begin to take note of the things you are grateful for, you begin to lose sight of the things that you lack.”
        //     – Germany Kent`},
        //     {
        //         text: `“Happiness is a quality of the soul…not a function of one’s material circumstances.”
        //     – Aristotle`}
        // ];

        console.log("🚀 ~ file: post-tweet.js ~ line 16 ~ messages", messages)
        let tweets = Array.isArray(messages) ? messages : [messages]
        const mappedTweets = tweets.map((tweetItem) => {
            return {
                text: tweetItem
            }
        })

        console.log("mappedTweets", mappedTweets)
        console.log("mappedTweets", mappedTweets.length)
        const sendTweetRequest = await thread.tweetThread(mappedTweets)

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
