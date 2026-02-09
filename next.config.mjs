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
};

export default nextConfig;
