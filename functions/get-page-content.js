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



}