import { AUTH0 } from '../functions-lib/auth0-client'
import { headers } from '../functions-lib/cors'

exports.handler = async function (event, context) {
    console.log('auth: ', await AUTH0.getUsers())

    try {
        const users = await AUTH0.getUsers()

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                data: users
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