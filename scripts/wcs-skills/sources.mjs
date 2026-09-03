import fs from 'node:fs';
import path from 'node:path';
import { DOCS_JSON_PATH, CUSTOM_ELEMENTS_JSON_PATH, STORIES_COMPONENTS_DIR } from './paths.mjs';

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf-8'));

/** Reads a package.json into { name, version, raw } — `raw` for any wrapper-specific field. */
export const readPackageInfo = (packageJsonPath) => {
    const raw = readJson(packageJsonPath);
    return { name: raw.name, version: raw.version, raw };
};

/**
 * Fails fast if a wrapper package is not pinned to the exact same version as wcs-core (see
 * scripts/update-version.js, which always bumps every package together) — a mismatch would make
 * the generated skill reference the wrong release. `dependencyField` (e.g. 'peerDependencies' or
 * 'dependencies') is also checked for a `wcs-core` entry equal to the core version, when provided.
 */
export const assertSameVersionAsCore = (corePackageJsonPath, wrapperPackageJsonPath, { dependencyField } = {}) => {
    const core = readPackageInfo(corePackageJsonPath);
    const wrapper = readPackageInfo(wrapperPackageJsonPath);

    const mismatches = [];
    if (wrapper.version !== core.version) {
        mismatches.push(`${wrapper.name} version (${wrapper.version}) !== wcs-core version (${core.version})`);
    }
    if (dependencyField) {
        const declared = wrapper.raw[dependencyField]?.['wcs-core'];
        if (declared !== core.version) {
            mismatches.push(
                `${wrapper.name} ${dependencyField}.wcs-core (${declared}) !== wcs-core version (${core.version})`
            );
        }
    }
    if (mismatches.length > 0) {
        throw new Error(
            `wcs-skills generator: version mismatch between wcs-core and ${wrapper.name}, the skill would ` +
                `reference an incorrect version.\n - ${mismatches.join('\n - ')}`
        );
    }

    return { core, wrapper };
};

/**
 * Loads the Stencil-generated docs.json, the single authoritative source for component APIs.
 * Regenerate it with `npm run generate-docs-json` before running the skills generator.
 */
export const loadDocsJson = () => {
    if (!fs.existsSync(DOCS_JSON_PATH)) {
        throw new Error(
            `wcs-skills generator: ${DOCS_JSON_PATH} not found. Run "npm run generate-docs-json" first.`
        );
    }
    const docs = JSON.parse(fs.readFileSync(DOCS_JSON_PATH, 'utf-8'));
    const components = [...docs.components].sort((a, b) => a.tag.localeCompare(b.tag));
    return { ...docs, components };
};

/**
 * Extracts the set of public custom-element tags from custom-elements.json.
 * This manifest is only used as a cross-check against docs.json (Storybook addon-docs' own source
 * of truth) — it must never become a second source for API content.
 */
const loadCustomElementsManifestTags = () => {
    if (!fs.existsSync(CUSTOM_ELEMENTS_JSON_PATH)) {
        return new Set();
    }
    const customElementsManifest = JSON.parse(fs.readFileSync(CUSTOM_ELEMENTS_JSON_PATH, 'utf-8'));
    const tags = new Set();
    for (const mod of customElementsManifest.modules ?? []) {
        for (const decl of mod.declarations ?? []) {
            if (decl.customElement && decl.tagName) {
                tags.add(decl.tagName);
            }
        }
    }
    return tags;
};

/**
 * Warns (does not fail) about tags in docs.json missing from custom-elements.json, and vice versa.
 */
export const warnOnTagCoverageMismatch = (components) => {
    const docsJsonTags = new Set(components.map((c) => c.tag));
    const customElementsTags = loadCustomElementsManifestTags();
    const missingFromCustomElements = [...docsJsonTags].filter((tag) => !customElementsTags.has(tag));
    const missingFromDocsJson = [...customElementsTags].filter((tag) => !docsJsonTags.has(tag));
    if (missingFromCustomElements.length > 0) {
        console.warn(`[wcs-skills] tags in docs.json but not in custom-elements.json: ${missingFromCustomElements.join(', ')}`);
    }
    if (missingFromDocsJson.length > 0) {
        console.warn(`[wcs-skills] tags in custom-elements.json but not in docs.json: ${missingFromDocsJson.join(', ')}`);
    }
};

const walkStoriesFiles = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files.push(...walkStoriesFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.stories.ts')) {
            files.push(fullPath);
        }
    }
    return files;
};

const COMPONENT_LITERAL = /component:\s*'([^']+)'/;

/**
 * Scans stories/components/**\/*.stories.ts and groups files by the custom-element tag declared
 * in their Meta.component literal. Files are only read as text (regex extraction of the literal),
 * never imported or executed — the generator never depends on Storybook at build time.
 *
 * @returns Map<tag, string[]> of absolute story file paths, sorted by path.
 */
export const buildStoriesIndex = () => {
    const index = new Map();
    if (!fs.existsSync(STORIES_COMPONENTS_DIR)) return index;

    for (const filePath of walkStoriesFiles(STORIES_COMPONENTS_DIR).sort()) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const match = content.match(COMPONENT_LITERAL);
        if (!match) continue;
        const tag = match[1];
        if (!index.has(tag)) index.set(tag, []);
        index.get(tag).push(filePath);
    }
    return index;
};
