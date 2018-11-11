import { Component } from '@stencil/core';

@Component({
  tag: 'wcs-card-body',
})
export class CardBody {
  hostData() {
    return {
      class: {
        'card-body': true,
      }
    };
  }
}
