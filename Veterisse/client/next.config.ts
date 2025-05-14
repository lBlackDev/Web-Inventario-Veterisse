import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
  experimental: {
    // Configuración para permitir acceso desde la red local
    // host: '0.0.0.0', // Removed as it is not a valid property
    // Configura el puerto utilizando variables de entorno o un servidor personalizado
  },
};

export default nextConfig;
