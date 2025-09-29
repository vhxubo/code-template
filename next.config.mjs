/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/code-template",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
