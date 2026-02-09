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

  // Disable caching for WordPress content updates
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
