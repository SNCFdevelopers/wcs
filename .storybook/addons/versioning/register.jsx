import React, { memo } from 'react';
import { IconButton, WithTooltip, TooltipLinkList } from 'storybook/internal/components';
import { version as currentVersion } from '../../../package.json';

/**
 * All versions of archived WCS documentation.
 * The latest version always redirects to wcs.dev.sncf, because if we are on an archive we would be forced to fetch the latest version from the public registry.
 */
const VERSIONS = [
    { title: 'latest', id: 'latest', href: 'https://wcs.dev.sncf' },
    { title: 'v6.0.0', id: 'v6.0.0', href: 'https://wcs-archive-852f99.gitlab.io/v6/' },
    { title: 'v5.1.0', id: 'v5.1.0', href: 'https://wcs-archive-852f99.gitlab.io/v5/' },
    { title: 'v4.2.0', id: 'v4.2.0', href: 'https://wcs-archive-852f99.gitlab.io/v4/' }
];

export const WcsVersionSwitcher = memo(function WcsVersionSwitcher() {
    return (
        <WithTooltip
            placement="top"
            closeOnOutsideClick
            tooltip={() => {
                return (
                    <TooltipLinkList links={VERSIONS} />
                );
            }}
        >
            <IconButton
                key="versions"
                title="Change version of the documentation"
                active={true}
            >
                <span>v{currentVersion}</span>
            </IconButton>
        </WithTooltip>
    );
})