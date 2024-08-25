// CJS
const { Notebook } = require('crossnote');
const fs = require('fs');
const path = require('path');

/**
 *
 * @param {string} filepath
 * @returns
 */
async function main(filepath) {
  const dir = path.dirname(filepath);
  const filename = path.basename(filepath);

  const environments = {
    plantumlServer: process.env.PLANTUML_SERVER,
    krokiServer: process.env.KROKI_SERVER,
    configOverwrite: process.env.CONFIG_OVERWRITE,
    isExportHtml: process.env.EXPORT_HTML === 'true',
    isExportPdf: process.env.EXPORT_PDF !== 'false',
  }
  // if plantumlServer is not set, use krokiServer as plantumlServer
  if (!environments.plantumlServer && environments.krokiServer) {
    environments.plantumlServer = `${environments.krokiServer}/plantuml/svg/`;
  }
  const overwrite = JSON.parse(environments.configOverwrite || '{}')
  const notebook = await Notebook.init({
    notebookPath: dir,
    config: {
      previewTheme: 'github-light.css',
      codeBlockTheme: 'github.css',
      puppeteerArgs: ['--no-sandbox', "--disable-accelerated-2d-canvas", "--disable-gpu"],
      plantumlServer: environments.plantumlServer || 'http://localhost:8080/svg/',
      krokiServer: environments.krokiServer || 'http://localhost:8000',
      enableLinkify: true,
      ...overwrite
    },
  });

  // Get the markdown engine for a specific note file in your notebook.
  const engine = notebook.getNoteMarkdownEngine(filename);

  //   // open in browser
  //   await engine.openInBrowser({ runAllCodeChunks: true });

  if (environments.isExportHtml) {
    console.log('html export begin')
    console.time('time for html export');
    // html export
    await engine.htmlExport({ offline: false, runAllCodeChunks: true });
    console.timeEnd('time for html export');
    console.log('html export end')
  }

  // chrome (puppeteer) export
  if (environments.isExportPdf) {
    console.log('pdf export begin')
    console.time('time for pdf export');
    await engine.chromeExport({ fileType: 'pdf', runAllCodeChunks: true }); // fileType = 'pdf'|'png'|'jpeg'
    console.timeEnd('time for pdf export');
    console.log('pdf export end')
  }

  //   // prince export
  //   await engine.princeExport({ runAllCodeChunks: true });

  //   // ebook export
  //   await engine.eBookExport({ fileType: 'epub' }); // fileType = 'epub'|'pdf'|'mobi'|'html'

  //   // pandoc export
  //   await engine.pandocExport({ runAllCodeChunks: true });

  //   // markdown(gfm) export
  //   await engine.markdownExport({ runAllCodeChunks: true });

  return process.exit();
}

main(process.argv[2]);
