import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  ...(process.env.NODE_ENV === "development" ? { outputFileTracingRoot: path.join(__dirname, "../../") } : null),
};

export default nextConfig;
