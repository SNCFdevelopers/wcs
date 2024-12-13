import { create } from '@storybook/theming';

import logo from '../stories/assets/images/wcs-logo-white.png';

const theme = create({
    base: 'dark',
    fontBase:
        '"Avenir", -apple-system, BlinkMacSystemFont, "Segoe UI", "Segoe UI Web (West European)", Roboto, "Helvetica Neue", sans-serif;',
    fontCode: 'monospace',

    // Form colors
    inputBorderRadius: 4,

    // SNCF / WCS branding for the upper left image
    brandTitle: 'WCS • Web Components SNCF',
    brandImage: logo,
    colorSecondary: '#6558b1',
    colorPrimary: '#6558b1',
});

export default theme;
