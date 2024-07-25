/** @type {import('next').NextConfig} */
import "dotenv/config";
const DATABASE_URL = process.env.DATABASE_URL;
const nextConfig = {
  env: {
    DATABASE_URL: DATABASE_URL,
  },
};

export default nextConfig;
