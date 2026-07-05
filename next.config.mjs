/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['10.92.242.132'],
  images: {
    unoptimized: true,
  },
}

export default nextConfig
