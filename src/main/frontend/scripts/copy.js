
const fs = require('fs-extra')

const filterFunc = (src, dest) => {
  console.log(src, " -> ",dest);
  return !src.includes("/_next")
}

fs.copySync("./out/_next", "../resources/views/static/nextjs/_next")
fs.copySync("./out/", "../resources/views/th/nextjs", { filter: filterFunc })