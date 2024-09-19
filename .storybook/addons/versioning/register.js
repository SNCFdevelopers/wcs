import React from 'react'

import { addons, types } from '@storybook/addons';
import { IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';
import { version as currentVersion } from '../../../package.json';

/**
 * All versions of archived WCS documentation.
 * The latest version always redirects to wcs.dev.sncf, because if we are on an archive we would be forced to fetch the latest version from the public registry.
 */
const VERSIONS = [
    { title: 'latest', key: 'latest', href: 'https://wcs.dev.sncf'},
    { title: 'v5.1.0', key: 'v5.1.0', href: 'https://wcs-archive-852f99.gitlab.io/v5/'},
    { title: 'v4.2.0', key: 'v4.2.0', href: 'https://wcs-archive-852f99.gitlab.io/v4/'}
];

/**
 * Register the toolbar addon "Versioning".
 * This addon will display the current version of the documentation and allow the user to switch between archived versions.
 * The repository for archives can be found here: https://gitlab.com/SNCF/wcs-archive/
 */
addons.register('wcs-version-switcher', () => {
    addons.add('wcs-version-switcher/tool', {
        title: 'WCS Version Switcher',
        type: types.TOOLEXTRA,
        render: () => {
            return (
                <WithTooltip
                    placement="top"
                    closeOnOutsideClick
                    tooltip={() => {
                        return (
                            <TooltipLinkList links={VERSIONS}/>
                        );
                    }}
                >
                    <IconButton
                        key="versions"
                        title="Change version of the documentation"
                        active={true}
                    >
                        <span>v{ currentVersion }</span>
                    </IconButton>
                </WithTooltip>
            )
        },
    })
})
