/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/models/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ];
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
