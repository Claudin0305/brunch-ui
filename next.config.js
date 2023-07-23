/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    base_route: "http://grahn-brunch.ddns.net:9094/api",
  },
  images: {
    domains: ["grahn-brunch.ddns.net:9094"],
  },
};

module.exports = nextConfig
