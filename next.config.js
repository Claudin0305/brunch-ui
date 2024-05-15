/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
     base_route: "http://isteah-tech.ddns.net:9094/api/api",
    base_route_get: "http://isteah-tech.ddns.net:9094/api/api",
     //base_route: "http://grahn-brunch.ddns.net:9094/api/api",
    //base_route: "http://localhost:8080/api",
    //base_route_get: "http://localhost:8080/api",
   //  base_route_get: "http://localhost:8080/api/api",
    NEXT_EXTERNAL_REWRITES: false
  },
  images: {
    domains: ['localhost', "grahn-brunch.ddns.net", "isteah-tech.ddns.net"],
  },
  //  serverRuntimeConfig: {
  //   // Increase the timeout for getServerSideProps to 60 seconds.
  //   getServerSidePropsTimeout: 90000,
  // },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://isteah-tech.ddns.net:9094/api/api/:path*', // URL de votre API HTTP
      },
    ];
  },
}

module.exports = nextConfig
