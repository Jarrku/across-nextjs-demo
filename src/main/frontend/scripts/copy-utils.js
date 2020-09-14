const fs = require('fs-extra')

function filter(src, dest) {
  console.log(src, " -> ",dest);
  return !src.includes("/_next")
}

function copyStaticAssets(targetPath) {
  fs.copySync("./out/_next", targetPath)
}

function copyHtmlAssets(targetPath) {
  fs.copySync("./out/", targetPath, { filter })
}

module.exports = {
  copyStaticAssets,
  copyHtmlAssets,
}