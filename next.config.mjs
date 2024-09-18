/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "https://backend-open-ai-five.vercel.app/:path*",
        destination: "https://backend-open-ai-dwl5.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
