import { readFile } from 'fs/promises';
import { buildVariables } from "./token-builder.mjs";
import { Manifest } from "./manifest.mjs";
import path from 'path';
import fs from 'fs';

const MANIFEST_PATH = 'design-tokens/tokens/wcs-design-tokens-manifest.json';
const INPUT_JSON_DIR = 'design-tokens/tokens';
const OUTPUT_CSS_DIR = 'design-tokens/dist';
const OVERRIDE_CSS_DIR = 'design-tokens/overrides';
export const ROOT_SCOPED_FILE_NAME_SUFFIX = '-root-scoped';

if (!MANIFEST_PATH) {
    throw new Error('MANIFEST_PATH is required');
} else if (!INPUT_JSON_DIR) {
    throw new Error('INPUT_JSON_DIR is required');
} else if (!OUTPUT_CSS_DIR) {
    throw new Error('OUTPUT_CSS_DIR is required');
}

const manifestPath = path.resolve(MANIFEST_PATH);
const manifestJson = JSON.parse((await readFile(manifestPath)).toString());
const manifest = Manifest.fromJson(manifestJson);
const jsonFilesByMode = manifest.getJsonFilesNamesByMode().entries();

for (const entry of jsonFilesByMode) {
    await buildVariables({
        inputDirectory: INPUT_JSON_DIR,
        outputDirectory: OUTPUT_CSS_DIR
    }, {
        theme: entry[0],
        jsonFiles: entry[1],
        selector: `.${entry[0]}`
    });
    appendOverridesToGeneratedFiles(entry);
}

function appendOverridesToGeneratedFiles(entry) {
    const cssGeneratedFile = `${OUTPUT_CSS_DIR}/${entry[0]}.css`;
    const cssRootScopedGeneratedFile = `${OUTPUT_CSS_DIR}/${entry[0]}${ROOT_SCOPED_FILE_NAME_SUFFIX}.css`;
    const overrideFile = `${OVERRIDE_CSS_DIR}/${entry[0]}.css`;

    try {
        if (fs.existsSync(overrideFile)) {
            const initialContent = fs.readFileSync(overrideFile, 'utf8');
            const initialContentRootScoped = initialContent.toString().replaceAll(`.${entry[0]}`, ':root');
            fs.appendFileSync(cssGeneratedFile, `\n/* Components Overrides */\n${initialContent}`);
            fs.appendFileSync(cssRootScopedGeneratedFile, `\n/* Components Overrides */\n${initialContentRootScoped}`);
        }
    } catch (err) {
        console.error(`Error appending overrides for theme ${entry[0]}:`, err);
    }
}
