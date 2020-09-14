const { copyStaticAssets, copyHtmlAssets } = require('./copy-utils');

copyStaticAssets("../resources/views/static/nextjs/_next");
copyHtmlAssets("../resources/views/th/nextjs");
