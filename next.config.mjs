/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Lint warnings (e.g. no-explicit-any) shouldn't fail the production build.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
