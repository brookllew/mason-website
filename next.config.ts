import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: '/work', destination: '/work.html' },
      { source: '/work/', destination: '/work.html' },
      { source: '/services', destination: '/services.html' },
      { source: '/services/', destination: '/services.html' },
      { source: '/about', destination: '/about.html' },
      { source: '/about/', destination: '/about.html' },
      { source: '/blog', destination: '/blog.html' },
      { source: '/blog/', destination: '/blog.html' },
      { source: '/lets-talk', destination: '/lets-talk.html' },
      { source: '/lets-talk/', destination: '/lets-talk.html' },
      { source: '/higher-education', destination: '/higher-education.html' },
      { source: '/higher-education/', destination: '/higher-education.html' },
      { source: '/ecommerce', destination: '/ecommerce.html' },
      { source: '/ecommerce/', destination: '/ecommerce.html' },
      { source: '/creative-portfolio', destination: '/creative-portfolio.html' },
      { source: '/creative-portfolio/', destination: '/creative-portfolio.html' },
    ];
  },
};

export default nextConfig;
