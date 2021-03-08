import { TWITTER } from '../functions-lib/twitter-client'

exports.handler = async function (event, context) {
    // your server-side functionality
    const twitter = TWITTER()

    // return twitter.post('statuses/update', { status: 'Working on something cool 😅 #devlife' }, function (err, data, response) {
    //     if (err) {
    //         return {
    //             statusCode: 400,
    //             body: JSON.stringify({ message: err })
    //         }
    //     }

    //     console.log('response: ', response)

    //     return {
    //         statusCode: 200,
    //         body: JSON.stringify({
    //             response
    //         })
    //     }

    // })

    return twitter.get('account/verify_credentials', { skip_status: true })
        .catch(function (err) {
            console.log('caught error', err.stack)
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: err
                })
            }
        })
        .then(function (result) {
            // `result` is an Object with keys "data" and "resp".
            // `data` and `resp` are the same objects as the ones passed
            // to the callback.
            // See https://github.com/ttezel/twit#tgetpath-params-callback
            // for details.

            console.log('data', result.data);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    result
                })
            }


        })
}