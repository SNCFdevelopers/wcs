import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { createRef, ref } from 'lit-html/directives/ref.js';
// @ts-ignore
import navDocumentation from './nav-documentation.md';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Nav',
    component: 'wcs-nav',
    argTypes: {
        ...getComponentArgs('wcs-nav'),
        ariaLabel: {
            description: 'An optional aria-label can be added'
        },
        text: {
            description: 'The text of the item inside the slot of `<wcs-nav-item>`'
        },
        href: {
            description: 'The href of the `<a>` inside the slot of `<wcs-nav-item>`'
        }
    },
    parameters: {
        docs: {
            description: {
                component: navDocumentation
            }
        }
    },
    subcomponents: {
        'WcsNavItem': 'wcs-nav-item'
    }
};
export default meta;

interface WcsNavArgs {
    ariaLabel: string
}

interface WcsNavItemArgs {
    text: string,
    href: string,
}

const Template: StoryFn<WcsNavArgs & WcsNavItemArgs> = (args: WcsNavArgs & WcsNavItemArgs) => {

  const navRef = createRef();

  function navItemClick($event: any) {
    $event.preventDefault();
    // @ts-ignore
    Array.from(navRef.value.children).forEach((navItem: HTMLWcsNavItemElement) => {
        navItem.classList.remove('active');
        navItem.children[0]?.removeAttribute('aria-current');
    });
    $event.target.closest('wcs-nav-item').classList.toggle('active', true);
    $event.target.closest('a')?.setAttribute('aria-current', 'page');
  }
    
  return html`
    <div style="height: 600px">
        <wcs-nav ${ref(navRef)} aria-label=${args.ariaLabel || nothing}>
            <wcs-nav-item @click="${e => navItemClick(e)}">
                <a href=${args.href}>
                    <wcs-mat-icon icon="star"></wcs-mat-icon>
                    <span>${args.text}</span>
                </a>
            </wcs-nav-item>
            <wcs-nav-item class="active" @click="${e => navItemClick(e)}">
                <a href="/description" aria-current="page">
                    <wcs-mat-icon icon="description"></wcs-mat-icon>
                    <span>Description</span>
                </a>
            </wcs-nav-item>
            <wcs-nav-item @click="${e => navItemClick(e)}">
                <a href="/trains">
                    <wcs-mat-icon icon="train" role="img" aria-label="My trains"></wcs-mat-icon>
                    <span>Trains</span>
                </a>
            </wcs-nav-item>
            <wcs-nav-item slot="bottom" @click="${e => navItemClick(e)}">
                <a href="/support">
                    <wcs-mat-icon icon="support"></wcs-mat-icon>
                    <span>Support</span>
                </a>
            </wcs-nav-item>
        </wcs-nav>
    </div>
  `;
}



export const Default: StoryObj = {
    render: (args: WcsNavArgs & WcsNavItemArgs) => Template(args, this),
    args: {
        ariaLabel: "Main menu",
        text: "Favorite",
        href: "/favorite"
    }
}
