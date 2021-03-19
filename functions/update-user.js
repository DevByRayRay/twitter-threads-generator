import { AUTH0 } from '../functions-lib/auth0-client'
import { headers } from '../functions-lib/cors'

const errorResponse = (err = null) => {
    return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
            message: 'Something went wrong',
            err
        })
    }
}

exports.handler = async function (event, context) {

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: 'Ok' }
    }

    if (event.httpMethod !== "PATCH") {
        return { statusCode: 405, headers, body: JSON.stringify({ message: "Method Not Allowed" }) };
    }

    const parsedBody = JSON.parse(event?.body)
    const { data, id } = parsedBody

    console.log('event: ', data)
    console.log('id: ', id)

    if (!id) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: 'Something went wrong! The user ID was not found.',
            })
        }
    }

    try {
        const user = await AUTH0('update:users update:users_app_metadata').updateUserMetadata({ id }, data)
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
}