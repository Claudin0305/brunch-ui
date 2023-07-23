/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    base_route: "http://grahn-brunch.ddns.net:9094/api",
  },
  images: {
    domains: ['localhost', "grahn-brunch.ddns.net"],
  },
   serverRuntimeConfig: {
    // Increase the timeout for getServerSideProps to 15 seconds.
    getServerSidePropsTimeout: 15000,
  },
}

module.exports = nextConfig
