import type { NextConfig } from 'next';
import packageJson from './package.json';

const nextConfig: NextConfig = {
  // Exposes the release version to the UI (shown in the user menu).
  env: { NEXT_PUBLIC_APP_VERSION: packageJson.version },
  images: {
    // Google account avatars shown in the user menu.
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
};

export default nextConfig;
