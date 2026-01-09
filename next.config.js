/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Netlify 배포를 위한 설정
  output: 'standalone',
}

module.exports = nextConfig
