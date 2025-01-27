import { FunctionalComponent, h } from '@stencil/core';
import { WcsSortOrder } from '../grid/grid-interface';

interface GridSortArrowProps {
    state: WcsSortOrder;
}

export const GridSortArrow: FunctionalComponent<GridSortArrowProps> = ({state}) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <g class={(state === 'none' ? '' : state) + ' arrow-group'}>
            <path class="arrow"
                  fill="#333333"
                  d="M10.0973 5.34619C9.79269 5.67941 9.29832 5.67941 8.99348 5.34619L6.78316 2.92128L6.78316 11.144C6.78316 11.6168 6.43368 12 6.00289 12C5.57187 12 5.22261 11.6168 5.22261 11.144L5.22261 2.92128L3.01219 5.34619C2.70802 5.67941 2.21341 5.67941 1.90881 5.34619C1.75655 5.17859 1.68005 4.95932 1.68005 4.73997C1.68005 4.52061 1.75655 4.30192 1.90881 4.13433L5.45122 0.250846C5.75597 -0.0836145 6.24977 -0.0836145 6.55454 0.250846L10.0973 4.13433C10.4017 4.46883 10.4017 5.01168 10.0973 5.34619Z"
            />
        </g>
    </svg>

);
