import fs from 'node:fs';
import { CORE_SKILL_OUTPUT_DIR } from './wcs-skills/paths.mjs';

// Stencil's package.json "files" validation runs during `stencil build`, before generation of skills.
// pre-create an empty skills/ so that check passes on a clean clone.
fs.mkdirSync(CORE_SKILL_OUTPUT_DIR, { recursive: true });