/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DATABASE_URL: "postgresql://todo_owner:CrF4DYn1RwqN@ep-late-cake-a28y8oqo.eu-central-1.aws.neon.tech/todo?sslmode=require"
    }
};

export default nextConfig;
