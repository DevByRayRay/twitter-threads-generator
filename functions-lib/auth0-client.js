import { ManagementClient } from 'auth0'
require('dotenv').config()

const { AUTH0_DOMAIN, AUTH0_CLIENT, AUTH0_SECRET } = process.env;


const AUTH0 = (scope) => new ManagementClient({
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT,
    clientSecret: AUTH0_SECRET,
    scope: scope || 'read:users'
});

export { AUTH0 }