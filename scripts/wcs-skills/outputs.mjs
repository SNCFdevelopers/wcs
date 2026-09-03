import fs from 'node:fs';
import path from 'node:path';
import { toPosixPath } from './markdown.mjs';
import { STORIES_COMPONENTS_DIR } from './paths.mjs';
import { renderComponentReference } from './render.mjs';

/** Copies every indexed story file verbatim under references/stories/, keyed by skill-root-relative path. */
export const buildStoriesOutputs = (storiesIndex) => {
    const outputs = {};
    const relativeByTag = new Map();
    for (const [tag, absolutePaths] of storiesIndex.entries()) {
        const relPaths = absolutePaths.map((absolutePath) => {
            const relativeToComponents = toPosixPath(path.relative(STORIES_COMPONENTS_DIR, absolutePath));
            const outputPath = `references/stories/${relativeToComponents}`;
            outputs[outputPath] = fs.readFileSync(absolutePath, 'utf-8');
            return outputPath;
        });
        relativeByTag.set(tag, relPaths);
    }
    return { outputs, relativeByTag };
};

/** Builds one `references/components/<tag>/<tag>.md` output entry per docs.json component. */
export const buildComponentReferenceOutputs = (components, relativeByTag) => {
    const outputs = {};
    for (const component of components) {
        const selfPath = `references/components/${component.tag}/${component.tag}.md`;
        outputs[selfPath] = renderComponentReference(component, relativeByTag.get(component.tag) ?? [], selfPath);
    }
    return outputs;
};

/**
 * Extracts markdown link targets from generated content, ignoring external URLs, Storybook-only
 * in-app navigation links (`?path=...`, meaningless outside Storybook) and bare image asset
 * filenames coming from verbatim-copied editorial content (resolved by Storybook's static dirs,
 * not by this skill) — none of those are meant to resolve as files within the generated output.
 */
const extractInternalLinks = (content) => {
    const links = [];
    const pattern = /]\(([^)]+)\)/g;
    let match;
    while ((match = pattern.exec(content)) !== null) {
        const target = match[1];
        if (/^([a-z]+:)?\/\//i.test(target) || target.startsWith('#')) continue;
        if (target.includes('?path=')) continue;
        if (/\.(svg|png|jpe?g|webp|gif)$/i.test(target)) continue;
        links.push(target);
    }
    return links;
};

/**
 * Validates that every internal link in `outputs` resolves to a real file: either another entry in
 * `outputs` itself, or — when `crossPackagePrefix` is given — a path under `crossPackageDir` on disk
 * (the actually-published skill of the package being linked to, e.g. wcs-core's). Passing the real
 * directory rather than an in-memory map means this checks the artifact a consumer would really see.
 */
export const validateInternalLinks = (outputs, { crossPackagePrefix, crossPackageDir } = {}) => {
    if (crossPackagePrefix && !fs.existsSync(crossPackageDir)) {
        return [`${crossPackageDir} does not exist — generate that package's skill first.`];
    }

    const problems = [];
    for (const [filePath, content] of Object.entries(outputs)) {
        for (const link of extractInternalLinks(content)) {
            if (crossPackagePrefix && link.startsWith(crossPackagePrefix)) {
                const relativePath = link.slice(crossPackagePrefix.length);
                if (!fs.existsSync(path.join(crossPackageDir, relativePath))) {
                    problems.push(`${filePath}: broken cross-package link "${link}"`);
                }
                continue;
            }
            const resolved = toPosixPath(path.normalize(path.join(path.dirname(filePath), link)));
            if (!(resolved in outputs)) {
                problems.push(`${filePath}: broken link "${link}" (resolved to "${resolved}")`);
            }
        }
    }
    return problems;
};

export const writeOutputs = (outputDir, outputs) => {
    if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
    }
    for (const [relativePath, content] of Object.entries(outputs)) {
        const fullPath = path.join(outputDir, relativePath);
        fs.mkdirSync(path.dirname(fullPath), { recursive: true });
        fs.writeFileSync(fullPath, content, 'utf-8');
    }
};

