const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    domains: ['cdn.discordapp.com', 'mc-heads.net', 'localhost', 'cdn.pixabay.com'],
  },}

module.exports = withContentlayer(nextConfig)