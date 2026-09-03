import fs from 'node:fs';
import path from 'node:path';
import { markdownTable, escapeCell, escapePipes, summarize, relativeLink } from './markdown.mjs';

// ---------------------------------------------------------------------------
// Component reference (one .md per docs.json component)
// ---------------------------------------------------------------------------

const propRow = (prop) => [
    `\`${prop.name}\`${prop.deprecation ? ' _(deprecated)_' : ''}`,
    prop.attr ? `\`${prop.attr}\`` : '—',
    `\`${escapePipes(prop.type)}\``,
    prop.default !== undefined ? `\`${escapePipes(prop.default)}\`` : '—',
    escapeCell(prop.deprecation || prop.docs)
];

const eventRow = (event) => [
    `\`${event.event}\`${event.deprecation ? ' _(deprecated)_' : ''}`,
    `\`${escapePipes(event.detail)}\``,
    escapeCell(event.deprecation || event.docs)
];

const methodRow = (method) => [
    `\`${method.name}\`${method.deprecation ? ' _(deprecated)_' : ''}`,
    `\`${escapePipes(method.signature)}\``,
    escapeCell(method.deprecation || method.docs)
];

const slotRow = (slot) => [slot.name ? `\`${slot.name}\`` : '_(default)_', escapeCell(slot.docs)];
const partRow = (part) => [`\`${part.name}\``, escapeCell(part.docs)];
const styleRow = (style) => [`\`${style.name}\``, escapeCell(style.docs)];
const tagList = (tags) => tags.map((tag) => `\`${tag}\``).join(', ');

/**
 * Renders the Markdown reference for a single component, derived exclusively from docs.json.
 *
 * @param component a JsonDocsComponent entry from docs.json
 * @param storyFiles skill-root-relative POSIX paths of the copied stories for this tag (may be empty)
 * @param selfPath skill-root-relative POSIX path of the file being rendered (for relative links)
 */
export const renderComponentReference = (component, storyFiles, selfPath) => {
    const sections = [`# \`${component.tag}\``, ''];

    if (component.deprecation) {
        sections.push(`> ⚠️ **Deprecated.** ${component.deprecation}`, '');
    }

    sections.push(component.docs || `\`${component.tag}\` component.`, '');

    sections.push('## Properties', '', markdownTable(
        ['Property', 'Attribute', 'Type', 'Default', 'Description'],
        component.props.map(propRow)
    ), '');

    sections.push('## Events', '', markdownTable(
        ['Event', 'Detail', 'Description'],
        component.events.map(eventRow)
    ), '');

    sections.push('## Methods', '', markdownTable(
        ['Method', 'Signature', 'Description'],
        component.methods.map(methodRow)
    ), '');

    sections.push('## Slots', '', markdownTable(
        ['Slot', 'Description'],
        component.slots.map(slotRow)
    ), '');

    sections.push('## CSS Custom Properties', '', markdownTable(
        ['Variable', 'Description'],
        component.styles.map(styleRow)
    ), '');

    sections.push('## CSS Shadow Parts', '', markdownTable(
        ['Part', 'Description'],
        component.parts.map(partRow)
    ), '');

    if (component.dependents.length > 0 || component.dependencies.length > 0) {
        sections.push('## Component relationships', '');
        if (component.dependents.length > 0) {
            sections.push(`Used by: ${tagList(component.dependents)}`, '');
        }
        if (component.dependencies.length > 0) {
            sections.push(`Depends on: ${tagList(component.dependencies)}`, '');
        }
    }

    sections.push('## Examples', '');
    if (storyFiles.length > 0) {
        sections.push(
            'These Storybook story sources are copied verbatim from the WCS repository; read them for ' +
            'real usage patterns, prop combinations and integration examples (not reproduced here to avoid ' +
            'a second, divergent copy):',
            '',
            ...storyFiles.map((file) => `- [${path.basename(file)}](${relativeLink(selfPath, file)})`)
        );
    } else {
        sections.push('_No Storybook story found for this component._');
    }

    return sections.join('\n') + '\n';
};

export const buildComponentIndexTable = (components, refPathForTag) =>
    markdownTable(
        ['Component', 'Summary', 'Reference'],
        components.map((component) => [
            `\`${component.tag}\`${component.deprecation ? ' _(deprecated)_' : ''}`,
            escapeCell(summarize(component)),
            `[${component.tag}.md](${refPathForTag(component.tag)})`
        ])
    );

// ---------------------------------------------------------------------------
// Editorial references republished verbatim from authored MDX/SCSS sources
// ---------------------------------------------------------------------------

/**
 * Republishes an authored MDX file as a portable reference. Every WCS doc starts its real content
 * with a Markdown heading, preceded only by Storybook plumbing (imports, <Meta/>); keeping everything
 * from the first heading on drops that plumbing without touching narrative content.
 */
export const stripStorybookPlumbing = (mdxContent) => {
    const lines = mdxContent.split(/\r?\n/);
    const start = lines.findIndex((line) => /^#{1,6}\s/.test(line));
    return (start === -1 ? mdxContent : lines.slice(start).join('\n')).trim() + '\n';
};

export const readIfExists = (filePath) => (fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '');

/**
 * Lists installed themes by scanning the generated design-tokens JSON files (not a hard-coded list),
 * then publishes theming.mdx as the reference for how to use and reason about them.
 */
export const renderTokensReference = (themingMdxPath, designTokensDistDir) => {
    const themeFiles = fs.existsSync(designTokensDistDir)
        ? fs
            .readdirSync(designTokensDistDir)
            .filter((name) => name.endsWith('.json'))
            .sort()
        : [];

    const themeList = themeFiles
        .map((file) => {
            const base = file.replace(/\.json$/, '');
            return `- \`${base}\` — \`design-tokens/dist/${base}.css\` and \`design-tokens/dist/${base}-root-scoped.css\``;
        })
        .join('\n');

    const theming = stripStorybookPlumbing(readIfExists(themingMdxPath));

    return '# Design tokens & theming\n\n' + '## Installed themes\n\n' + `${themeList}\n\n` + '## Theming guide\n\n' + theming;
};

export const renderTemplateReference = (templateMdxPath) => stripStorybookPlumbing(readIfExists(templateMdxPath));

export const renderAccessibilityReference = (accessibilityMdxPath) =>
    stripStorybookPlumbing(readIfExists(accessibilityMdxPath));

/** Publishes one or more authored MDX guides as a single portable reference under one heading. */
export const renderMdxReference = (mdxPaths, { title }) => {
    const parts = mdxPaths
        .filter((filePath) => fs.existsSync(filePath))
        .map((filePath) => stripStorybookPlumbing(fs.readFileSync(filePath, 'utf-8')));
    return `# ${title}\n\n${parts.join('\n---\n\n')}`;
};

// ---------------------------------------------------------------------------
// SKILL.md assembly — pure formatting, no framework knowledge.
// Every framework-specific string (activation description, syntax, sections) is owned by the
// package's own generate-skill script and passed in here.
// ---------------------------------------------------------------------------

/** Prefixes a cross-package base (e.g. `wcs-core/skills/wcs-core/`) onto a reference path; pass '' for same-package links. */
export const linkTo = (base, refPath) => `${base}${refPath}`;

/** Builds a correctly-formed `[label](target)` Markdown link — use this instead of hand-writing links. */
export const refLink = (target, label = target) => `[${label}](${target})`;

/** Joins a heading with its body lines into one Markdown section string. */
export const section = (heading, ...body) => [heading, '', ...body].join('\n');

export const DEFAULT_COVERAGE =
    'This skill covers component APIs (props, events, methods, slots, CSS custom properties, CSS shadow ' +
    'parts), the base stylesheet, design tokens & theming, base templates, accessibility, and framework installation. ' +
    'It does **not** cover WCS contribution guidelines, Storybook internals, visual-regression baselines, or `wcs-formly`.';

export const COMPONENTS_PREAMBLE = [
    "Open a component's reference for its props, slots, events, CSS variables and examples before using it. " +
        "Each reference ends with an '## Examples' section listing links to the runnable stories under " +
        "`references/stories/<tag>/<tag>.stories.ts`. Some stories rely on inline CSS (e.g. spacing) that " +
        'the consumer project must reproduce itself — account for that during implementation.',
    '',
    `\`docs.json\` (Stencil's docs-json output) is authoritative: open a component's reference for its full ` +
        'API before using it. Sub-components (e.g. `wcs-select-option`, `wcs-tab`) have their own row and ' +
        'reference; check a parent component reference for how it expects its children to be composed.'
].join('\n');

/** Documents how a wrapper resolves wcs-core's references via its exact-version dependency. */
export const renderCrossPackageResolutionNote = ({ packageName, coreVersion }) =>
    `\`${packageName}\` depends on the exact same version of \`wcs-core\` (\`${coreVersion}\`). References ` +
    `prefixed \`wcs-core/skills/wcs-core/\` live in that package, under \`node_modules/wcs-core/skills/wcs-core/\` ` +
    '— resolve them through Node module resolution, not as relative filesystem paths from this file.';

/** Renders the "mandatory token audit" section; `ref` resolves a wcs-core-relative path for the caller's package. */
export const renderTokenAuditSection = (ref) =>
    [
        '**Mandatory check — do not skip.** Any time you write or edit CSS in this session that references a ' +
            'design token (a `var(--wcs-*)` custom property, or any value copied from `theming.md`), you MUST run ' +
            'the audit script below before considering that work done. This applies every time you touch token ' +
            'CSS, not just once at the end of the whole implementation.',
        '',
        `Run ${refLink(ref('scripts/audit-tokens.js'))}:`,
        '',
        '```bash',
        'node scripts/audit-tokens.js --tokens ./node_modules/wcs-core/design-tokens/dist/{THEME}.css --src ./src',
        '```',
        '',
        '`{THEME}` is the theme actually installed in this project — check `references/tokens/theming.md` or the ' +
            'project config to find it. Never guess the theme name.',
        '',
        'If the audit reports a variable as unknown or unresolved, that token name does not exist in this theme — ' +
            'it is very likely a hallucinated or misremembered reference. Fix it and re-run the script. Repeat ' +
            'until the audit is clean before reporting the component as finished.'
    ].join('\n');

/**
 * Assembles a SKILL.md: YAML frontmatter (name/description), a title, an intro paragraph, then an
 * ordered list of pre-rendered sections. Pure formatting — callers own all framework-specific content.
 */
export const renderSkillMd = ({ name, description, title, intro, sections }) =>
    ['---', `name: ${name}`, `description: ${description}`, '---', '', title, '', intro, '', sections.join('\n\n'), ''].join(
        '\n'
    );
