const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/OpenPI.github.io' : '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
};

module.exports = nextConfig;
