import { FunctionalComponent, h } from '@stencil/core';
/* <svg style="display: block;height: 24px;" width="24" height="24" viewbox="0 0 100 100">
    <style>
        polyline {
            stroke: black;
        stroke-linecap: round;
        stroke-width: 10px;
    }

                        </style>
    <polyline fill="none" points="20,65 50,35 80,65">
        <animate attributename="points" dur="375ms" repeatcount="indefinite" to="20,65 50,35 80,65"
            from="20,35 50,65 80,35"></animate>
    </polyline>
</svg> */
export const SelectArrow: FunctionalComponent<{
    up: boolean;
    ariaLabel?: string;
}> = ({ up, ariaLabel}) => (
    <svg aria-hidden={ariaLabel ? false:"true"} role="img" aria-label={ariaLabel? ariaLabel:false} style={{ marginLeft: 'auto' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <style type="text/css">{`
            .arrow-group {
                transform-origin: 50% 50%;
                transition: transform 175ms ease-in-out;
            }
            .up {
                transform: scaleY(1);
            }
            .down {
                transform: scaleY(-1);
            }
        `}</style>
        <g fill="none" class={(up ? 'up' : 'down') + ' arrow-group'}>
            <path class="arrow" fill="black" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </g>
    </svg>
);
