#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    assertSameVersionAsCore,
    loadDocsJson,
    buildComponentIndexTable,
    linkTo,
    refLink,
    section,
    renderSkillMd,
    renderTokenAuditSection,
    renderCrossPackageResolutionNote,
    renderMdxReference,
    DEFAULT_COVERAGE,
    COMPONENTS_PREAMBLE,
    validateInternalLinks,
    writeOutputs,
    CORE_PACKAGE_JSON_PATH,
    CORE_SKILL_OUTPUT_DIR,
    GETTING_STARTED_DIR
} from '../../scripts/wcs-skills/index.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OWN_PACKAGE_JSON_PATH = path.join(SCRIPT_DIR, '..', 'package.json');
const DEFAULT_OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', 'skills', 'wcs-react');
const CROSS_PACKAGE_PREFIX = 'wcs-core/skills/wcs-core/';

const ACTIVATION_DESCRIPTION =
    'Build, style, or review React user interfaces with WCS (Web Components SNCF) via the `wcs-react` ' +
    'wrapper. Use when a task adds or changes WCS components in JSX, wires `onWcsXxx` event handlers, ' +
    'applies the WCS base stylesheet or a WCS theme, or scaffolds a React page with WCS design tokens. ' +
    'Do not activate for non-React WCS usage.';

const FRAMEWORK_SYNTAX = [
    '- Import each component by its PascalCase export from `wcs-react` (e.g. `wcs-button` → `WcsButton`).',
    '- Register the loader once, e.g. in your root component: `import { defineCustomElements } from \'wcs-react\'; ' +
        'defineCustomElements();`.',
    '- Pass a prop using its **exact `Property` column name** (camelCase, e.g. `mode="stroked"`); use ' +
        '`className` for CSS classes.',
    '- Handle an event with `on` + capitalized **exact `Event` column name** (e.g. event `wcsChange` → prop ' +
        '`onWcsChange={(e) => console.log(e.detail)}`).',
    '- Place a child into a named slot with the `slot="..."` attribute.'
].join('\n');

const main = () => {
    const { wrapper: react, core } = assertSameVersionAsCore(CORE_PACKAGE_JSON_PATH, OWN_PACKAGE_JSON_PATH, {
        dependencyField: 'dependencies'
    });
    const { timestamp: docsTimestamp, components } = loadDocsJson();

    const coreRef = (refPath) => linkTo(CROSS_PACKAGE_PREFIX, refPath);
    const localRef = (refPath) => linkTo('', refPath);

    const componentIndexTable = buildComponentIndexTable(components, (tag) =>
        coreRef(`references/components/${tag}/${tag}.md`)
    );

    const sections = [
        section('## Coverage', DEFAULT_COVERAGE),
        section('## Framework syntax', FRAMEWORK_SYNTAX),
        section('## Components', COMPONENTS_PREAMBLE, '', componentIndexTable),
        section(
            '## Style and template',
            `See ${refLink(coreRef('references/template.md'))} for the base common stylesheet and different base ` +
                'templates you can implement with WCS. Consult it when you init a project or refactor a base template.'
        ),
        section(
            '## Tokens & theming',
            `See ${refLink(coreRef('references/tokens/theming.md'))} for installed themes and how design tokens work.`,
            '',
            renderTokenAuditSection(coreRef)
        ),
        section(
            '## Getting started',
            `See ${refLink(localRef('references/getting-started.md'))} for installation and setup.`
        ),
        section(
            '## Accessibility',
            `See ${refLink(coreRef('references/accessibility.md'))} for general accessibility guidelines.`
        )
    ];

    const skillMd = renderSkillMd({
        name: react.name,
        description: ACTIVATION_DESCRIPTION,
        title: `# WCS (\`react\`) — \`${react.name}@${react.version}\``,
        intro:
            `Version-exact knowledge of the installed WCS release: every prop, event, token and example here ` +
            `matches \`${react.name}@${react.version}\` (generated from \`docs.json\` dated \`${docsTimestamp}\`). ` +
            `Never mix guidance across versions.\n\n${renderCrossPackageResolutionNote({
                packageName: react.name,
                coreVersion: core.version
            })}`,
        sections
    });

    const outputs = {
        'SKILL.md': skillMd,
        'references/getting-started.md': renderMdxReference([path.join(GETTING_STARTED_DIR, 'react.mdx')], {
            title: 'Getting started'
        })
    };

    const linkProblems = validateInternalLinks(outputs, {
        crossPackagePrefix: CROSS_PACKAGE_PREFIX,
        crossPackageDir: CORE_SKILL_OUTPUT_DIR
    });
    if (linkProblems.length > 0) {
        console.error('[wcs-react] broken internal links (is the wcs-core skill generated? run "npm run generate-skills" at the repo root):');
        linkProblems.forEach((problem) => console.error(` - ${problem}`));
        process.exit(1);
    }

    writeOutputs(DEFAULT_OUTPUT_DIR, outputs);
    console.log(`[wcs-react] generated SKILL.md (wcs-react@${react.version}) at ${DEFAULT_OUTPUT_DIR}.`);
};

main();
