const withOptimizedImages = require('next-optimized-images');

module.exports = withOptimizedImages({
  /* config for next-optimized-images */
  inlineImageLimit: -1,
  // your config for other plugins or the general next.js here...
  assetPrefix: "@static:/nextjs",
  env: {}
});
