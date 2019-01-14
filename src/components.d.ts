/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  Color,
} from './interface';
import {
  ButtonType,
} from './components/button/button-type';


export namespace Components {

  interface WcsBadge {
    'color': Color;
  }
  interface WcsBadgeAttributes extends StencilHTMLAttributes {
    'color'?: Color;
  }

  interface WcsButton {
    /**
    * Specify the button color.
    */
    'color': Color;
    /**
    * Specify wether the button is disabled or not.
    */
    'disabled': boolean;
    /**
    * Set a URL to point to. If specified use a `a` tag instead of `btn`.
    */
    'href'?: string;
    /**
    * This attribute specifies the size of the button. Setting this attribute will change the height and padding of a button.
    */
    'mode': 'normal' | 'small' | 'block' | 'icon-only' | 'round';
    /**
    * Specify wether the button should have a ripple effect or not.
    */
    'ripple': boolean;
    /**
    * Specify the button type.
    */
    'type': ButtonType;
  }
  interface WcsButtonAttributes extends StencilHTMLAttributes {
    /**
    * Specify the button color.
    */
    'color'?: Color;
    /**
    * Specify wether the button is disabled or not.
    */
    'disabled'?: boolean;
    /**
    * Set a URL to point to. If specified use a `a` tag instead of `btn`.
    */
    'href'?: string;
    /**
    * This attribute specifies the size of the button. Setting this attribute will change the height and padding of a button.
    */
    'mode'?: 'normal' | 'small' | 'block' | 'icon-only' | 'round';
    /**
    * Specify wether the button should have a ripple effect or not.
    */
    'ripple'?: boolean;
    /**
    * Specify the button type.
    */
    'type'?: ButtonType;
  }

  interface WcsCardBody {}
  interface WcsCardBodyAttributes extends StencilHTMLAttributes {}

  interface WcsCard {}
  interface WcsCardAttributes extends StencilHTMLAttributes {}

  interface WcsIcon {
    'icon': string;
    'size': 'x5' | 'x75' | '1x' | '1x2' | '1x5' | '1x7' | '2x' | '3x' | '30px' | '50px' | '66px' | '90px' | '96px' | '140px';
  }
  interface WcsIconAttributes extends StencilHTMLAttributes {
    'icon'?: string;
    'size'?: 'x5' | 'x75' | '1x' | '1x2' | '1x5' | '1x7' | '2x' | '3x' | '30px' | '50px' | '66px' | '90px' | '96px' | '140px';
  }

  interface WcsProgressBar {
    /**
    * Whether it displays a label indicating the percentage of progress above the bar.
    */
    'showLabel': boolean;
    /**
    * Whether the component display the small version
    */
    'small': boolean;
    /**
    * The actual value of the progress. Ranging from 0 to 100.
    */
    'value': number;
  }
  interface WcsProgressBarAttributes extends StencilHTMLAttributes {
    /**
    * Whether it displays a label indicating the percentage of progress above the bar.
    */
    'showLabel'?: boolean;
    /**
    * Whether the component display the small version
    */
    'small'?: boolean;
    /**
    * The actual value of the progress. Ranging from 0 to 100.
    */
    'value'?: number;
  }
}

declare global {
  interface StencilElementInterfaces {
    'WcsBadge': Components.WcsBadge;
    'WcsButton': Components.WcsButton;
    'WcsCardBody': Components.WcsCardBody;
    'WcsCard': Components.WcsCard;
    'WcsIcon': Components.WcsIcon;
    'WcsProgressBar': Components.WcsProgressBar;
  }

  interface StencilIntrinsicElements {
    'wcs-badge': Components.WcsBadgeAttributes;
    'wcs-button': Components.WcsButtonAttributes;
    'wcs-card-body': Components.WcsCardBodyAttributes;
    'wcs-card': Components.WcsCardAttributes;
    'wcs-icon': Components.WcsIconAttributes;
    'wcs-progress-bar': Components.WcsProgressBarAttributes;
  }


  interface HTMLWcsBadgeElement extends Components.WcsBadge, HTMLStencilElement {}
  var HTMLWcsBadgeElement: {
    prototype: HTMLWcsBadgeElement;
    new (): HTMLWcsBadgeElement;
  };

  interface HTMLWcsButtonElement extends Components.WcsButton, HTMLStencilElement {}
  var HTMLWcsButtonElement: {
    prototype: HTMLWcsButtonElement;
    new (): HTMLWcsButtonElement;
  };

  interface HTMLWcsCardBodyElement extends Components.WcsCardBody, HTMLStencilElement {}
  var HTMLWcsCardBodyElement: {
    prototype: HTMLWcsCardBodyElement;
    new (): HTMLWcsCardBodyElement;
  };

  interface HTMLWcsCardElement extends Components.WcsCard, HTMLStencilElement {}
  var HTMLWcsCardElement: {
    prototype: HTMLWcsCardElement;
    new (): HTMLWcsCardElement;
  };

  interface HTMLWcsIconElement extends Components.WcsIcon, HTMLStencilElement {}
  var HTMLWcsIconElement: {
    prototype: HTMLWcsIconElement;
    new (): HTMLWcsIconElement;
  };

  interface HTMLWcsProgressBarElement extends Components.WcsProgressBar, HTMLStencilElement {}
  var HTMLWcsProgressBarElement: {
    prototype: HTMLWcsProgressBarElement;
    new (): HTMLWcsProgressBarElement;
  };

  interface HTMLElementTagNameMap {
    'wcs-badge': HTMLWcsBadgeElement
    'wcs-button': HTMLWcsButtonElement
    'wcs-card-body': HTMLWcsCardBodyElement
    'wcs-card': HTMLWcsCardElement
    'wcs-icon': HTMLWcsIconElement
    'wcs-progress-bar': HTMLWcsProgressBarElement
  }

  interface ElementTagNameMap {
    'wcs-badge': HTMLWcsBadgeElement;
    'wcs-button': HTMLWcsButtonElement;
    'wcs-card-body': HTMLWcsCardBodyElement;
    'wcs-card': HTMLWcsCardElement;
    'wcs-icon': HTMLWcsIconElement;
    'wcs-progress-bar': HTMLWcsProgressBarElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
