import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import { CardMode, CardOrientation } from '../../../src/components/card/card-interface';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Card',
    component: 'wcs-card',
    argTypes: getComponentArgs('wcs-card'),
    subcomponents: {
        'WcsCardBody': 'wcs-card-body',
        'WcsCardHeader': 'wcs-card-header',
        'WcsCardMedia': 'wcs-card-media',
        'WcsCardContent': 'wcs-card-content',
        'WcsCardFooter': 'wcs-card-footer',
    }
};
export default meta;

type CardStoryArgs = {
    mode: CardMode;
    orientation: CardOrientation;
    withBadges: boolean;
    withActions: boolean;
    withImage: boolean;
    withHeaderActions: boolean;
}

const Template = (args: CardStoryArgs) => html`
    <wcs-card mode=${args.mode} orientation="${args.orientation}">
    ${args.withImage ? html`
    <wcs-card-media>
        <img slot="vertical" alt="Train with landscape" src="train_autumn.jpg" style="object-position: 50% 70%; max-height: 200px">
        <img slot="horizontal" alt="Train with landscape" src="train_autumn.jpg" style="object-position: 80% 50%;">
    </wcs-card-media>` 
    : null}
        <wcs-card-body>
            <wcs-card-header>
                <span>Title</span>
                ${args.withBadges ? html`<wcs-badge slot="badges" class="wcs-primary" shape="normal" color="lighter" size="m">Libellé</wcs-badge>` : null}
                ${args.withHeaderActions ? html`
                    <wcs-dropdown aria-label="More actions" slot="actions" class="wcs-primary" mode='clear' shape='square' placement='bottom-end' size='s' no-arrow>
                        <span slot="placeholder">
                            <wcs-mat-icon icon="more_horiz"></wcs-mat-icon>
                        </span>
                        <wcs-dropdown-item>Premier item</wcs-dropdown-item>
                        <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
                        <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
                        <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
                        <wcs-dropdown-divider></wcs-dropdown-divider>
                        <wcs-dropdown-item class="wcs-critical">Supprimer</wcs-dropdown-item>
                    </wcs-dropdown>
                ` : null }
            </wcs-card-header>
            <wcs-card-content>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto maiores pariatur quis ut
                    voluptatibus! Aperiam consequuntur, earum eligend
                </p>
            </wcs-card-content>
            ${args.withActions && args.orientation != 'horizontal' ? html`
                <wcs-card-footer>
                    <wcs-button>Button</wcs-button>
                </wcs-card-footer>
            ` : null}
        </wcs-card-body>
    </wcs-card>
`;

export const Default: StoryObj<CardStoryArgs> = {
    render: (args) => Template(args),
    args: {
        mode: 'flat',
        orientation: 'vertical',
        withBadges: false,
        withActions: false,
        withImage: false,
    }
}

/**
 * ⚠️ Raised mode will be deprecated in the future. Please always prefer flat mode.
 */
export const RaisedMode: StoryObj<CardStoryArgs> = {
    render: (args) => Template(args),
    args: {
        mode: 'raised',
        orientation: 'vertical',
        withBadges: false,
        withActions: false
    }
}

export const WithImage: StoryObj<CardStoryArgs> = {
    render: (args) => Template(args),
    args: {
        mode: 'flat',
        orientation: 'vertical',
        withBadges: false,
        withActions: false,
        withImage: true,
    }
}

/**
 * You can customize `wcs-card` by adding header, image, and footer.
 * 💡When you have a card with footer, you should prefer to have a vertical orientation
 */
export const VerticalOrientation: StoryObj<CardStoryArgs> = {
    render: (args) => Template(args),
    args: {
        mode: 'flat',
        orientation: 'vertical',
        withBadges: true,
        withActions: true,
        withImage: true,
        withHeaderActions: true
    }
}

/**
 * You can also use the card in horizontal orientation. In this case, you should not use the footer actions, but rather
 * use the header actions if you have some.
 */
export const HorizontalOrientation: StoryObj<CardStoryArgs> = {
    render: (args) => Template(args),
    args: {
        mode: 'flat',
        orientation: 'horizontal',
        withBadges: true,
        withActions: false,
        withImage: true,
        withHeaderActions: true
    }
}

/**
 * Card is flexible, you can use it without body to build rich elements for a page based on the card design.
 * 
 * ❗But you should always prefer to make something like what we have in the other stories above. ❗
 */
export const WithoutBody: StoryObj<CardStoryArgs> = {
    render: (args) => html`
        <wcs-card mode=${args.mode}>
            Basic card
        </wcs-card>
    `,
    args: {
        mode: 'flat'
    }
}

export const OneBodyAndDivider: StoryObj<CardStoryArgs> = {
    render: (args) => html`
        <wcs-card mode=${args.mode}>
            <wcs-card-body>
                Flat card content
                <wcs-divider style="margin: 8px 0 8px 0"></wcs-divider>
                Another part of the card
            </wcs-card-body>
        </wcs-card>
    `,
    args: {
        mode: 'flat'
    }
}

export const TwoBodyAndDivider: StoryObj<CardStoryArgs> = {
    render: (args) => html`
        <wcs-card mode=${args.mode}>
            <wcs-card-body>
                Flat card content
            </wcs-card-body>
            <wcs-divider></wcs-divider>
            <wcs-card-body>
                Another part of the card
            </wcs-card-body>
        </wcs-card>
    `,
    args: {
        mode: 'flat'
    }
}
