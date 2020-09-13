const fs = require('fs-extra')
const cheerio = require('cheerio')

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

getFiles().then((files) => {
  const htmlFiles = files.filter((file) => file.endsWith('.html'))

  htmlFiles.forEach(async (file) => {
    const data = await fs.readFile(file, 'utf8')
    const $ = cheerio.load(data)

    $('script').each((i, el) => {
      const $el = $(el)

      const src = $el.attr('src')
      if (!src || !src.includes('_next')) return

      // $el.attr('th:src', '@{' + src + '}')
      // TODO TEMP FIX
      $el.attr('src', "/across/resources/static/development" + src.replace("@static:", ""));

    })

    $('link[rel=preload]').each((i, el) => {
      const $el = $(el)

      const href = $el.attr('href')
      $el.attr('th:href', '@{' + href + '}')
      $el.attr('href', null)
    })

    const parsedHtml = $.root().html()
    return fs.outputFile(file, parsedHtml)
  })
})
