/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'personal-project-image-uploader.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            }]
    }
}

module.exports = nextConfig
