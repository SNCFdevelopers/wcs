import { addons, types } from 'storybook/manager-api';
import theme from './theme.js';
import { WcsVersionSwitcher } from './addons/versioning/register.jsx';

addons.setConfig({
    theme: theme,
});

/**
 * Register the toolbar addon "Versioning".
 * This addon will display the current version of the documentation and allow the user to switch between archived versions.
 * The repository for archives can be found here: https://gitlab.com/SNCF/wcs-archive/
 */
addons.register('wcs-version-switcher', () => {
    addons.add('wcs-version-switcher/tool', {
        title: 'WCS Version Switcher',
        type: types.TOOLEXTRA,
        render: WcsVersionSwitcher
    });
});