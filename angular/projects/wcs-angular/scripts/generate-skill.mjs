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
} from '../../../../scripts/wcs-skills/index.mjs';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const OWN_PACKAGE_JSON_PATH = path.join(SCRIPT_DIR, '..', 'package.json');
const DEFAULT_OUTPUT_DIR = path.resolve(SCRIPT_DIR, '..', '..', '..', 'dist', 'wcs-angular', 'skills', 'wcs-angular');
const CROSS_PACKAGE_PREFIX = 'wcs-core/skills/wcs-core/';

const ACTIVATION_DESCRIPTION =
    'Build, style, or review Angular user interfaces with WCS (Web Components SNCF) via the `wcs-angular` ' +
    'wrapper. Use when a task adds or changes WCS components in Angular templates, wires `(wcsXxx)` outputs, ' +
    'applies the WCS base stylesheet or a WCS theme, or scaffolds an Angular page with WCS design tokens. ' +
    'Do not activate for non-Angular WCS usage.';

const FRAMEWORK_SYNTAX = [
    '- Import `WcsAngularModule` from `wcs-angular` into your (root or feature) `NgModule`.',
    '- Register the loader once, in `main.ts`: `import { defineCustomElements } from \'wcs-core/loader\'; ' +
        'defineCustomElements();`.',
    '- Use the custom-element tags directly in templates: `<wcs-button mode="stroked">Click me</wcs-button>`.',
    '- Bind a prop with `[prop]` using its **exact `Property` column name** (camelCase, e.g. ' +
        '`[groupContentWithHeader]="true"`).',
    '- Bind an event with `(event)` using its **exact `Event` column name**, unchanged (e.g. ' +
        '`(wcsOpenChange)="onOpenChange($event)"`); the payload is on `$event.detail`.',
    '- Place a child into a named slot with the `slot="..."` attribute.'
].join('\n');

const main = () => {
    const { wrapper: angular, core } = assertSameVersionAsCore(CORE_PACKAGE_JSON_PATH, OWN_PACKAGE_JSON_PATH, {
        dependencyField: 'peerDependencies'
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
        name: angular.name,
        description: ACTIVATION_DESCRIPTION,
        title: `# WCS (\`angular\`) — \`${angular.name}@${angular.version}\``,
        intro:
            `Version-exact knowledge of the installed WCS release: every prop, event, token and example here ` +
            `matches \`${angular.name}@${angular.version}\` (generated from \`docs.json\` dated \`${docsTimestamp}\`). ` +
            `Never mix guidance across versions.\n\n${renderCrossPackageResolutionNote({
                packageName: angular.name,
                coreVersion: core.version
            })}`,
        sections
    });

    const outputs = {
        'SKILL.md': skillMd,
        'references/getting-started.md': renderMdxReference([path.join(GETTING_STARTED_DIR, 'angular.mdx')], {
            title: 'Getting started'
        })
    };

    const linkProblems = validateInternalLinks(outputs, {
        crossPackagePrefix: CROSS_PACKAGE_PREFIX,
        crossPackageDir: CORE_SKILL_OUTPUT_DIR
    });
    if (linkProblems.length > 0) {
        console.error('[wcs-angular] broken internal links (is the wcs-core skill generated? run "npm run generate-skills" at the repo root):');
        linkProblems.forEach((problem) => console.error(` - ${problem}`));
        process.exit(1);
    }

    writeOutputs(DEFAULT_OUTPUT_DIR, outputs);
    console.log(`[wcs-angular] generated SKILL.md (wcs-angular@${angular.version}) at ${DEFAULT_OUTPUT_DIR}.`);
};

main();
