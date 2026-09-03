// Public API for per-package generate-skill scripts. Import only from here — the sibling modules
// (render.mjs, outputs.mjs, sources.mjs, paths.mjs) are implementation details of this toolkit.

export {
    readPackageInfo,
    assertSameVersionAsCore,
    loadDocsJson,
    warnOnTagCoverageMismatch,
    buildStoriesIndex
} from './sources.mjs';

export {
    renderComponentReference,
    buildComponentIndexTable,
    renderTokensReference,
    renderTemplateReference,
    renderAccessibilityReference,
    renderMdxReference,
    stripStorybookPlumbing,
    linkTo,
    refLink,
    section,
    renderSkillMd,
    renderTokenAuditSection,
    renderCrossPackageResolutionNote,
    DEFAULT_COVERAGE,
    COMPONENTS_PREAMBLE
} from './render.mjs';

export {
    buildStoriesOutputs,
    buildComponentReferenceOutputs,
    validateInternalLinks,
    writeOutputs
} from './outputs.mjs';

export {
    ROOT,
    DOCS_JSON_PATH,
    CUSTOM_ELEMENTS_JSON_PATH,
    STORIES_COMPONENTS_DIR,
    THEMING_MDX_PATH,
    TEMPLATE_MDX_PATH,
    ACCESSIBILITY_MDX_PATH,
    GETTING_STARTED_DIR,
    DESIGN_TOKENS_DIST_DIR,
    CORE_PACKAGE_JSON_PATH,
    AUDIT_TOKEN_SCRIPT_PATH,
    CORE_SKILL_OUTPUT_DIR
} from './paths.mjs';
