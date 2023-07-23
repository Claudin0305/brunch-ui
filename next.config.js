/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    base_route: "http://grahn-brunch.ddns.net:9094/api",
    base_route_images: "http:localhost:8080/api"
  },
  images: {
    domains: ["grahn-brunch.ddns.net", "localhost"],
  },
};

module.exports = nextConfig
