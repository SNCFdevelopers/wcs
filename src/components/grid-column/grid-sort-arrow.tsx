import { FunctionalComponent, h } from '@stencil/core';
import { WcsSortOrder } from '../grid/grid-interface';

interface GridSortArrowProps {
  state: WcsSortOrder;
}

export const GridSortArrow: FunctionalComponent<GridSortArrowProps> = ({ state }) => (
    <svg style={{ marginLeft: 'auto' }} xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20">
        <style type="text/css">{`
            .arrow-group {
                transform-origin: 50% 51%;
                transition: transform 175ms ease-in-out;
            }
            .arrow{
                transition: fill 175ms ease-in-out;
                fill: var(--wcs-text-light);
            }
            .asc {
                transform: scaleY(1) translateY(-6px);
            }
            .desc {
                transform: scaleY(-1) translateY(-6px);
            }
            .active {
                fill: var(--wcs-primary);
            }

        `}</style>
        <g fill="none" class='asc arrow-group'>
            <path class={(state === 'asc' ? 'active' : '') + ' arrow'} d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
        <g fill="none" class='desc arrow-group'>
            <path class={(state === 'desc' ? 'active' : '') + ' arrow'} d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
    </svg>
);
