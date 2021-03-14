// next.config.js
module.exports = {
    // Target must be serverless
    target: "serverless",
    images: {
        domains: ['lh3.googleusercontent.com', 'avatars2.githubusercontent.com', 'res.cloudinary.com', 'localhost', 'cdn-images-1.medium.com', 'a.impactradius-go.com', 'skillshare.eqcm.net', 'cloudways.com', 'ws-na.amazon-adsystem.com', 'ir-na.amazon-adsystem.com'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/raymons/image/fetch/',
    },
    async rewrites() {
        return [
            {
                source: '/api/management/:path*',
                destination: 'http://localhost:9000/.netlify/functions/:path*',
            },
        ]
    },
};