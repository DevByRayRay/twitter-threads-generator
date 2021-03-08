// next.config.js
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/management/:path*',
                destination: 'http://localhost:9000/.netlify/functions/:path*',
            },
        ]
    },
};