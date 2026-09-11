import type { NextConfig } from "next";

const VARUH_REPORTS_URL =
  "https://www.varuh-rs.si/porocila-in-publikacije/letna-porocila-in-odzivna-porocila-vlade/";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "varuh.galgustin.com",
          },
        ],
        destination: VARUH_REPORTS_URL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
