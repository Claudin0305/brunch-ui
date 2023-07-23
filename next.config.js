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
    // Increase the timeout for getServerSideProps to 60 seconds.
    getServerSidePropsTimeout: 60000,
  },
}

module.exports = nextConfig
