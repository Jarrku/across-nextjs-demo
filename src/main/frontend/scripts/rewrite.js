const fs = require('fs-extra')
const cheerio = require('cheerio');
const nextJsConfig = require('../next.config.js');

const assetPrefix = nextJsConfig.assetPrefix;

getFiles().then((files) => {
  const htmlFiles = files.filter((file) => file.endsWith('.html'))

  htmlFiles.forEach(async (file) => {
    const data = await fs.readFile(file, 'utf8')
    const $ = cheerio.load(data)

    rewriteAttr("script", "src", $);
    rewriteAttr("link", "href", $);

    const parsedHtml = $.root().html()
    return fs.outputFile(file, parsedHtml)
  })
})

async function getFiles(path = './out/') {
  const entries = await fs.promises.readdir(path, { withFileTypes: true })

  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => path + file.name)

  const folders = entries.filter((folder) => folder.isDirectory())

  for (const folder of folders)
    files.push(...(await getFiles(`${path}${folder.name}/`)))

  return files
}

function rewriteAttr(el, attribute, $) {
  $(el).each((i, el) => {
    const $el = $(el)
    const current = $el.attr(attribute);

    if(!current || !current.startsWith(assetPrefix)) return;

    $el.attr(`across:static`, current)
    // $el.attr('src', "/across/resources/static/development" + src.replace("@static:", ""));

    $el.attr(attribute, null)
  })
}
