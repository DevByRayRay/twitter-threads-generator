// next.config.js
module.exports = {
    // Target must be serverless
    target: "serverless",
    async rewrites() {
        return [
            {
                source: '/api/management/:path*',
                destination: 'http://localhost:9000/.netlify/functions/:path*',
            },
        ]
    },
};