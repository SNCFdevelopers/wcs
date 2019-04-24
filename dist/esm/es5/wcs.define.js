
// wcs: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './wcs.core.js';
import { COMPONENTS } from './wcs.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, COMPONENTS, opts);
}
