import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';

import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Breadcrumb/Breadcrumb Item',
    component: 'wcs-breadcrumb-item',
    argTypes: {
        ...getComponentArgs('wcs-breadcrumb-item'),
        text: {
            description: 'The text node you put inside the slotted anchor',
            type: 'string',
        },
        href: {
            description: 'The href attribut you put on the slotted anchor',
            type: 'string',
        }
    }
};
export default meta;

type BreadcrumbItemStoryArgs = {
    text: string;
    href?: string;
};

const handleItemClick = (e: MouseEvent) => {
    e.preventDefault();
};

export const Default: StoryObj<BreadcrumbItemStoryArgs> = {
    render: (args: BreadcrumbItemStoryArgs) => html`
      
            <wcs-breadcrumb-item @click=${handleItemClick}>
                <a href=${args.href}>${args.text}</a>
            </wcs-breadcrumb-item>
          
    `,
    args: {
        text: 'Accueil',
        href: '/'
    }
};
