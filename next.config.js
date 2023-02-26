const withPWA = require('next-pwa')({ dest: 'public' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/diary',
        permanent: true,
      },
    ]
  },
}

module.exports = withPWA(nextConfig)
