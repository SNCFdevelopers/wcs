import { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { useArgs } from '@storybook/preview-api';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Breadcrumb',
    component: 'wcs-breadcrumb',
    argTypes: {
        ...getComponentArgs('wcs-breadcrumb'),
        ariaLabel: {
            description: 'You can change the `aria-label` attribute default value',
            type: 'string',
            table: {
                defaultValue: {
                    summary: 'Breadcrumb'
                },
            }
        },
        ariaLabelExpandButton: {
            description:
                'You can change the `aria-label` attribute default value for the expand button when the breadcrumb is collapsed.',
            type: 'string',
            table: {
                defaultValue: {
                    summary: 'Show all breadcrumb items'
                },
            }
        }
    }
};
export default meta;

type Item = {
    text: string;
    href?: string;
};

type BreadcrumbStoryArgs = {
    ariaLabel?: string;
    ariaLabelExpandButton?: string;
    breadcrumbItems?: Item[];
    maxItems?: number;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;
};

const handleItemClick = (e: MouseEvent) => {
    e.preventDefault();
};

export const Default: StoryObj<BreadcrumbStoryArgs> = {
    render: (args) => html`
        <wcs-breadcrumb
            aria-label=${args.ariaLabel || nothing}
            aria-label-expand-button=${args.ariaLabelExpandButton || nothing}
            max-items=${ifDefined(args.maxItems)}
            items-before-collapse=${ifDefined(args.itemsBeforeCollapse)}
            items-after-collapse=${ifDefined(args.itemsAfterCollapse)}
        >
            <wcs-breadcrumb-item @click=${handleItemClick}>
                <a href="/">Accueil</a>
            </wcs-breadcrumb-item>
            <wcs-breadcrumb-item @click=${handleItemClick}>
                <a href="/groupe">Découvrir le Groupe</a>
            </wcs-breadcrumb-item>
            <wcs-breadcrumb-item @click=${handleItemClick}>
                <a href="/groupe/portrait-entreprise">Qui sommes-nous ?</a>
            </wcs-breadcrumb-item>
            <wcs-breadcrumb-item>Les sociétés du Groupe</wcs-breadcrumb-item>
        </wcs-breadcrumb>
    `,
};

/**
 * If the last item is a link to the current page, you must set the `aria-current` attribute to `page`.  
 * If the element representing the current page is not a link, `aria-current` is optional.
 */
export const LastItemIsALink: StoryObj = {
    render: (args) => html`
        <wcs-breadcrumb
            aria-label=${args.ariaLabel || nothing}
            aria-label-expand-button=${args.ariaLabelExpandButton || nothing}
            max-items=${ifDefined(args.maxItems)}
            items-before-collapse=${ifDefined(args.itemsBeforeCollapse)}
            items-after-collapse=${ifDefined(args.itemsAfterCollapse)}
        >
            <wcs-breadcrumb-item @click=${handleItemClick}>
                <a href="/">Accueil</a>
            </wcs-breadcrumb-item>
            <wcs-breadcrumb-item @click=${handleItemClick}>
                <a href="/groupe">Découvrir le Groupe</a>
            </wcs-breadcrumb-item>
            <wcs-breadcrumb-item @click=${handleItemClick}>
                <a href="/groupe/portrait-entreprise">Qui sommes-nous ?</a>
            </wcs-breadcrumb-item>
            <wcs-breadcrumb-item @click=${handleItemClick}>
                <a href="/groupe/portrait-entreprise/societes-groupe" aria-current="page">Les sociétés du Groupe</a>
            </wcs-breadcrumb-item>
        </wcs-breadcrumb>
    `,
};

const initialItems = [
    { text: 'Accueil', href: '/' },
    { text: 'Découvrir le Groupe', href: '/groupe' },
    { text: 'Qui sommes-nous ?', href: '/groupe/portrait-entreprise' },
    { text: 'Les sociétés du Groupe' },
];

/**
 * If you set `max-items` and the number of breadcrumb items exceeds this maximum, 
 * the breadcrumb will collapse and show an expand button.  
 * If the breadcrumb is updated, for example while browsing the website or web app,
 * the `max-items` prop value will still be taken into account. You can test by clicking 
 * the `Next page` and `Previous page` buttons of this example.
 */
export const CollapsedBreadcrumbItems: StoryObj<BreadcrumbStoryArgs> = {
    render: (args) => {
        const [_, updateArgs] = useArgs();

        const handleAddItemBtnClick = (): void => {
            if (args.breadcrumbItems) {
                const previousItems = [...args.breadcrumbItems];
                previousItems[previousItems.length - 1].href = '/item';
                updateArgs({ ...args, breadcrumbItems: [...previousItems, { text: 'Item' }] });
            }
        };

        const handleRemoveItemBtnClick = (): void => {
            if (args.breadcrumbItems) {
                const previousItems = [...args.breadcrumbItems];
                if (previousItems.length > 1) {
                    previousItems.pop();
                    previousItems[previousItems.length - 1].href = undefined;
                    updateArgs({ ...args, breadcrumbItems: [...previousItems] });
                }
            }
        };

        return html`
            <div style="display: flex; margin-bottom: 16px;">
                <wcs-button size="s" @click=${handleAddItemBtnClick} style="margin-right: 8px">Next page</wcs-button>
                <wcs-button size="s" @click=${handleRemoveItemBtnClick} style="">Previous page</wcs-button>
            </div>

            <wcs-breadcrumb
                aria-label=${args.ariaLabel || nothing}
                aria-label-expand-button=${args.ariaLabelExpandButton || nothing}
                max-items=${ifDefined(args.maxItems)}
                items-before-collapse=${ifDefined(args.itemsBeforeCollapse)}
                items-after-collapse=${ifDefined(args.itemsAfterCollapse)}
            >
                ${args.breadcrumbItems?.map(
                    (item) => html`
                        <wcs-breadcrumb-item @click=${handleItemClick}>
                            ${item.href ? html`<a href=${item.href}>${item.text}</a>` : item.text}
                        </wcs-breadcrumb-item>
                    `
                )}
            </wcs-breadcrumb>
        `;
    },
    args: {
        maxItems: 3,
        breadcrumbItems: initialItems,
    },
};
