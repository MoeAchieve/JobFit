/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/material", "@mui/lab", "@mui/icons-material"],
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/models/:path*",
        destination: "http://localhost:5000/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
