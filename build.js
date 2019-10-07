/**
 * This is a custom build script used to separate html files
 * per component and integrate them to the index.html
 */
const fs = require('fs');
const chokidar = require('chokidar');
const process = require('process');
const mem = require('mem');
const hljs = require('highlight.js');
const html = require('highlight.js/lib/languages/htmlbars');
hljs.registerLanguage('language-html', html);
const md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {
            }
        }

        return ''; // use external default escaping
    }
});

const render = mem(content => md.render(content))

/**
 * @returns {Promise<string[]>} All the file names with the given extension
 * @param {import("fs").PathLike} basePath
 * @param {string} extension
 * @param {string} filter
 */
async function allFilesWithExtension(basePath, extension, filter) {
    let filesByDir = await Promise.all((await fs.promises.readdir(basePath))
        .map(async name => {
            const file = await fs.promises.stat(basePath + name);
            if (name[0] === '.') {
                return [];
            }
            return file.isDirectory()
                ? await allFilesWithExtension(basePath + name + '/', extension, filter)
                : name.endsWith(extension)
                    ? [basePath + name]
                    : [];
        }));
    filesByDir = filesByDir.reduce((curr, acc) => [...acc, ...curr], []);
    if (filter != null) {
        filesByDir = filesByDir.filter(x => {
            return x.includes('/' + filter + '/');
        });
    }
    return filesByDir;
}

function insertAfter(string, tag, insertSubString) {
    const insertIndex = getInsertIndex(string, tag);
    return string.slice(0, insertIndex) + insertSubString + string.slice(insertIndex);
}

function getInsertIndex(fileContent, tag) {
    return fileContent.indexOf(tag) + tag.length;
}

/**
 *
 * @param {string[]} filesPath
 */
async function updateIndex(filesPath) {
    const start = process.hrtime();
    console.log('Updating files...');

    const examplesP = await Promise.all(filesPath.map(async path => {
        const readme = (await fs.promises.readFile(path.replace('example.html', 'readme.md'))).toString();
        const readmeHTML = render(readme.replace(/```html([\S\s]*?)```/gmu, '```html$1```\n$1'));
        const name = readmeHTML.match(/<h1>(.*)<\/h1>/)[1];
        const [doc, api] = readmeHTML.split('<!-- Auto Generated Below -->');

        const examples = doc.replace(/<h1>(.*)<\/h1>/, '').trim();
        if (examples.length < 30) {
            console.log(`Generating none for ${name}, examples are empty`);
            return '';
        }
        return `
        <h1>${name}</h1>
        <wcs-card>
            <wcs-tabs>
                <wcs-tab header="Examples" class="normal-padding">
                        ${examples}
                </wcs-tab>
                <wcs-tab header="API" class="normal-padding">
                        ${api}
                </wcs-tab>
            </wcs-tabs>
        </wcs-card>`;
    }));
    const examples = examplesP.reduce((acc, cur) => acc + cur + '\r\n', '');
    const index = (await fs.promises.readFile('./src/template.html')).toString();

    const newContent = insertAfter(index, '<!--Import-->', examples);
    await fs.promises.writeFile('./src/index.html', newContent);
    // Logging
    const end = process.hrtime(start);
    console.log('Rewrite finished in: %d %dms', end[0], end[1] / 100000);
}

/**
 * return null if no filter are specifies in arguments
 */
function getFilterComponentName() {
    let filterComponentName = null;
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == "--filter") {
            filterComponentName = process.argv[i + 1];
        }
    }
    return filterComponentName;
}

async function watchBuild() {
    let filterComponentArgument = getFilterComponentName();
    const files = await allFilesWithExtension('./src/components/', '.md', filterComponentArgument);
    console.log('Watching files:');
    files.sort().forEach(f => console.log(' - ' + f));
    const watcher = chokidar.watch([
        ...files.sort(),
        'src/template.html'
    ]);
    watcher.on('ready', () => updateIndex(files));
    watcher.on('change', () => updateIndex(files));
    if (process.argv[2] !== '--watch') {
        watcher.close();
        updateIndex(files);
    }
}

watchBuild();
