const fs = require('fs-extra')
const cheerio = require('cheerio');
const nextJsConfig = require('../next.config.js');

const assetPrefix = nextJsConfig.assetPrefix;

async function getFiles(path = './out/') {
  const entries = await fs.promises.readdir(path, { withFileTypes: true })

  // Get files within the current directory and add a path key to the file objects
  const files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => path + file.name)

  // Get folders within the current directory
  const folders = entries.filter((folder) => folder.isDirectory())

  /*
        Add the found files within the subdirectory to the files array by calling the
        current function itself
      */
  for (const folder of folders)
    files.push(...(await getFiles(`${path}${folder.name}/`)))

  return files
}

function rewriteAttr(el, attribute, $) {
  $(el).each((i, el) => {
    const $el = $(el)
    const current = $el.attr(attribute);

    if(!current || !current.startsWith(assetPrefix)) return;

    $el.attr(`th:${attribute}`, '@{' + current + '}')
    // $el.attr('src', "/across/resources/static/development" + src.replace("@static:", ""));

    $el.attr(attribute, null)
  })
}

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
