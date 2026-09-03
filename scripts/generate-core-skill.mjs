#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {
    readPackageInfo,
    loadDocsJson,
    warnOnTagCoverageMismatch,
    buildStoriesIndex,
    buildStoriesOutputs,
    buildComponentReferenceOutputs,
    buildComponentIndexTable,
    renderTokensReference,
    renderTemplateReference,
    renderAccessibilityReference,
    renderMdxReference,
    linkTo,
    refLink,
    section,
    renderSkillMd,
    renderTokenAuditSection,
    DEFAULT_COVERAGE,
    COMPONENTS_PREAMBLE,
    validateInternalLinks,
    writeOutputs,
    CORE_PACKAGE_JSON_PATH,
    CORE_SKILL_OUTPUT_DIR,
    THEMING_MDX_PATH,
    TEMPLATE_MDX_PATH,
    ACCESSIBILITY_MDX_PATH,
    GETTING_STARTED_DIR,
    DESIGN_TOKENS_DIST_DIR,
    AUDIT_TOKEN_SCRIPT_PATH
} from './wcs-skills/index.mjs';

const ACTIVATION_DESCRIPTION =
    'Build, style, or review web user interfaces with WCS (Web Components SNCF) as plain custom elements — ' +
    'no framework, or a framework without an official WCS wrapper. Use when a task adds or changes WCS ' +
    'components, applies the WCS base stylesheet or a WCS theme, or scaffolds a page with WCS design tokens. ' +
    'Do not activate for non-UI logic or for Angular/React projects that use `wcs-angular` / `wcs-react`.';

const FRAMEWORK_SYNTAX = [
    '- Load components once at startup: `import { applyPolyfills, defineCustomElements } from \'wcs-core/loader\'; ' +
        'applyPolyfills().then(() => defineCustomElements());`.',
    '- Use the custom-element tags directly in HTML: `<wcs-button mode="stroked">Click me</wcs-button>`.',
    '- Set a prop as an attribute using its **exact `Attribute` column value** from a component reference ' +
        '(kebab-case, e.g. `start-icon`), or as a DOM property for non-string values (e.g. `el.disabled = true`).',
    "- Listen to an event with its **exact `Event` column value** (camelCase, e.g. `wcsChange`): " +
        "`element.addEventListener('wcsChange', (e) => console.log(e.detail));`.",
    '- Place a child into a named slot with the `slot="..."` attribute.'
].join('\n');

const GETTING_STARTED_MDX_PATHS = ['introduction.mdx', 'dist.mdx', 'bundle.mdx', 'composite-elements.mdx'].map((file) =>
    path.join(GETTING_STARTED_DIR, 'core', file)
);

const main = () => {
    const core = readPackageInfo(CORE_PACKAGE_JSON_PATH);
    const { components, timestamp: docsTimestamp } = loadDocsJson();
    warnOnTagCoverageMismatch(components);

    const storiesIndex = buildStoriesIndex();
    const { outputs: storyOutputs, relativeByTag } = buildStoriesOutputs(storiesIndex);
    const componentReferenceOutputs = buildComponentReferenceOutputs(components, relativeByTag);

    const ref = (refPath) => linkTo('', refPath);
    const componentIndexTable = buildComponentIndexTable(components, (tag) => ref(`references/components/${tag}/${tag}.md`));

    const sections = [
        section('## Coverage', DEFAULT_COVERAGE),
        section('## Framework syntax', FRAMEWORK_SYNTAX),
        section('## Components', COMPONENTS_PREAMBLE, '', componentIndexTable),
        section(
            '## Style and template',
            `See ${refLink(ref('references/template.md'))} for the base common stylesheet and different base ` +
                'templates you can implement with WCS. Consult it when you init a project or refactor a base template.'
        ),
        section(
            '## Tokens & theming',
            `See ${refLink(ref('references/tokens/theming.md'))} for installed themes and how design tokens work.`,
            '',
            renderTokenAuditSection(ref)
        ),
        section('## Getting started', `See ${refLink(ref('references/getting-started.md'))} for installation and setup.`),
        section(
            '## Accessibility',
            `See ${refLink(ref('references/accessibility.md'))} for general accessibility guidelines.`
        )
    ];

    const skillMd = renderSkillMd({
        name: core.name,
        description: ACTIVATION_DESCRIPTION,
        title: `# WCS (\`core\`) — \`${core.name}@${core.version}\``,
        intro:
            `Version-exact knowledge of the installed WCS release: every prop, event, token and example here ` +
            `matches \`${core.name}@${core.version}\` (generated from \`docs.json\` dated \`${docsTimestamp}\`). ` +
            'Never mix guidance across versions.',
        sections
    });

    const outputs = {
        'SKILL.md': skillMd,
        ...componentReferenceOutputs,
        ...storyOutputs,
        'references/tokens/theming.md': renderTokensReference(THEMING_MDX_PATH, DESIGN_TOKENS_DIST_DIR),
        'references/template.md': renderTemplateReference(TEMPLATE_MDX_PATH),
        'references/accessibility.md': renderAccessibilityReference(ACCESSIBILITY_MDX_PATH),
        'references/getting-started.md': renderMdxReference(GETTING_STARTED_MDX_PATHS, { title: 'Getting started' }),
        'scripts/audit-tokens.js': fs.readFileSync(AUDIT_TOKEN_SCRIPT_PATH, 'utf-8')
    };

    const linkProblems = validateInternalLinks(outputs);
    if (linkProblems.length > 0) {
        console.error('[wcs-core] broken internal links:');
        linkProblems.forEach((problem) => console.error(` - ${problem}`));
        process.exit(1);
    }

    writeOutputs(CORE_SKILL_OUTPUT_DIR, outputs);
    console.log(`[wcs-core] generated ${components.length} component references and SKILL.md (wcs-core@${core.version}).`);
};

main();
