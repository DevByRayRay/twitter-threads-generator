import { AUTH0 } from '../functions-lib/auth0-client'
import { headers } from '../functions-lib/cors'

exports.handler = async function (event, context) {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: 'Ok' }
    }

    if (event.httpMethod !== "GET") {
        return { statusCode: 405, headers, body: JSON.stringify({ message: "Method Not Allowed" }) };
    }

    const { id } = event.queryStringParameters
    console.log('event: ', id)


    try {
        const user = await AUTH0('read:users read:user_idp_tokens').getUser({ id })
        console.log('auth: ', user)

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                data: user
            })
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: 'Something went wrong',
                error
            })
        }

    }
    // });
}