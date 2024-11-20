/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/:path*', // Coincide con cualquier ruta
          has: [
            {
              type: 'host',
              value: 'restaurantepinochozaragoza.es', // Dominio sin 'www'
            },
          ],
          destination: 'https://www.restaurantepinochozaragoza.es/:path*', // Redirige a 'www'
          permanent: true, // Código 301
        },
      ]; // Cierra el arreglo de redirecciones
    },
  };
  
  export default nextConfig;
  
