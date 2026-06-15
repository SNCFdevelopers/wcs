import { FunctionalComponent, h } from '@stencil/core';

export const AlertCloseButton: FunctionalComponent<{
    onClick: (e: MouseEvent) => void;
}> = ({ onClick }) => (
    <wcs-button
        shape="round"
        size="s"
        mode="clear"
        class="close-button wcs-dark"
        aria-label="Fermer cette notification"
        onClick={onClick}
    >
        <wcs-mat-icon icon="close"></wcs-mat-icon>
    </wcs-button>
);
