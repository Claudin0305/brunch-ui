/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    base_route: "http://localhost:8080/api",
  },
}

module.exports = nextConfig
