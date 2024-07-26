/** @type {import('next').NextConfig} */
import "dotenv/config";
import bcrypt from 'bcrypt'
const DATABASE_URL = process.env.DATABASE_URL;
const nextConfig = {
  env: {
    DATABASE_URL: DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  }
};

export default nextConfig;
