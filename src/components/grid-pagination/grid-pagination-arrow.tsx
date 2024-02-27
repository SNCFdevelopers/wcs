import { FunctionalComponent, h } from '@stencil/core';

interface GridPaginationArrowProps {
  active: boolean;
  order: 'next' | 'previous';
  double?: boolean;
}

const getAccessibleName = (order: GridPaginationArrowProps['order'], double: GridPaginationArrowProps['double']): string => {
  switch (order) {
    case 'next':
      return double ? 'Last page' : 'Next page';
    case 'previous':
    default:
      return double ? 'First page' : 'Previous page';
  }
}

export const GridPaginationArrow: FunctionalComponent<GridPaginationArrowProps> = ({active, order, double = false}) => (
  <wcs-button mode="clear"
              shape="square"
              size="s"
              disabled={!active}
              title={getAccessibleName(order, double)}>
    <svg style={{cursor: 'pointer'}}
         aria-hidden="true"
         xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 24 20">
      <style type="text/css">{`
              .arrow-group {
                  transform-origin: 50% 51%;
                  transition: transform 175ms ease-in-out;
              }
              .arrow {
                  transition: fill 175ms ease-in-out;
                  fill: var(--wcs-text-light);
              }
              .second-arrow {
                  transform: translateY(-8px);
              }
              .next {
                  transform: rotate(90deg);
              }
              .previous {
                  transform: rotate(-90deg);
              }
              .active {
                  fill: var(--wcs-primary);
              }
          `}</style>
      <g fill="none" class={order + ' arrow-group'}>
        <path class={(active ? 'active' : '') + ' arrow'} d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </g>
      {
        double ?
          <g fill="none" class={order + ' arrow-group'}>
            <path class={(active ? 'active' : '') + ' arrow second-arrow'}
                  d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </g>
          : ''
      }
    </svg>
  </wcs-button>
);
