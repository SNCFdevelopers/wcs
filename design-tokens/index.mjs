import { readFile } from 'fs/promises';
import { buildVariables } from "./token-builder.mjs";
import { Manifest } from "./manifest.mjs";
import path from 'path';

const MANIFEST_PATH = 'design-tokens/tokens/wcs-design-tokens-manifest.json';
const INPUT_JSON_DIR = 'design-tokens/tokens';
const OUTPUT_CSS_DIR = 'design-tokens/dist';

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
        jsonFiles: entry[1]
    });
}
