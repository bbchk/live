const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: process.env.NODE_ENV !== 'production' ? false : true,
  reactStrictMode: false,
  images: {
    domains: ['storage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/live_world/*.*',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/*',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/*',
      },
    ],
  },
  async redirects() {
    if (process.env.MAINTENANCE_MODE === 'true') {
      return [
        {
          source: '/:path((?!maintenance.html).*)',
          destination: '/maintenance.html',
          permanent: false,
        },
      ]
    }
    return []
  },
  //! todo delete this after testing
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
