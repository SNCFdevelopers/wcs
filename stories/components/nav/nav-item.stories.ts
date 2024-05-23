import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Nav/Nav Item',
    component: 'wcs-nav-item',
    argTypes: {
        ...getComponentArgs('wcs-nav-item'),
        active: {
            description: 'Marks the nav-item as active if this class is present'
        }
    }
};

export default meta;

export const Default: StoryObj = {
    render: (args: { text: string, href: string, active: boolean }) => {
        
        return html`
            <wcs-nav>
                <wcs-nav-item @click="${e => e.preventDefault()}"
                              class=${classMap({active: args.active})}>
                    <a href=${args.href}>
                        <wcs-mat-icon icon="star"></wcs-mat-icon>
                        <span>${args.text}</span>
                    </a>
                </wcs-nav-item>
            </wcs-nav>
        `
    },
    args: {
        text: "Favorite",
        href: "/favorite",
        active: false,
    }
}
