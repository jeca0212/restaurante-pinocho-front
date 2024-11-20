module.exports = {
    async redirects() {
      return [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'restaurantepinochozaragoza.es',
            },
          ],
          destination: 'https://www.restaurantepinochozaragoza.es/:path*',
          permanent: true,
        },
      ];
    },
  };
  