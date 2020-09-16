const withOptimizedImages = require('next-optimized-images');
const withSourceMaps = require('@zeit/next-source-maps')

module.exports = withSourceMaps(withOptimizedImages({
  /* config for next-optimized-images */
  inlineImageLimit: -1,
  // your config for other plugins or the general next.js here...
  assetPrefix: "/nextjs",
  env: {}
}));
