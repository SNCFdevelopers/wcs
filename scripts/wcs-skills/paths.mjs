import { fileURLToPath } from 'node:url';
import path from 'node:path';

// scripts/wcs-skills/paths.mjs -> repo root is two directories up
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export const p = (...segments) => path.join(ROOT, ...segments);

export const DOCS_JSON_PATH = p('stories', 'documentation', 'generated', 'docs.json');
export const CUSTOM_ELEMENTS_JSON_PATH = p('custom-elements.json');
export const STORIES_COMPONENTS_DIR = p('stories', 'components');
export const THEMING_MDX_PATH = p('stories', 'documentation', 'theming.mdx');
export const TEMPLATE_MDX_PATH = p('stories', 'documentation', 'template.mdx');
export const ACCESSIBILITY_MDX_PATH = p('stories', 'documentation', 'accessibility.mdx');
export const GETTING_STARTED_DIR = p('stories', 'documentation', 'Getting Started');
export const DESIGN_TOKENS_DIST_DIR = p('design-tokens', 'dist');

export const CORE_PACKAGE_JSON_PATH = p('package.json');

export const AUDIT_TOKEN_SCRIPT_PATH = p('scripts', 'audit-tokens.js');

export const CORE_SKILL_OUTPUT_DIR = p('skills', 'wcs-core');
