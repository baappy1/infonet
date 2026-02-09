/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging.hellonotionhive.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'infonet.local',
        pathname: '/**',
      },
    ],
  },

  // Ensure case-insensitive routing and handle missing routes
  async rewrites() {
    return [
      {
        source: '/Industries',
        destination: '/industries',
      },
      {
        source: '/Solutions',
        destination: '/service',
      },
      {
        source: '/solutions',
        destination: '/service',
      },
      {
        source: '/sustainability',
        destination: '/',
      },
    ];
  },
};

export default nextConfig;
