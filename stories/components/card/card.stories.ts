import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { CardMode } from '../../../src/components/card/card-interface';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Card',
    component: 'wcs-card',
    argTypes: getComponentArgs('wcs-card'),
    subcomponents: {
        'WcsCardBody': 'wcs-card-body'
    }
};
export default meta;

type CardStoryArgs = {
    mode: CardMode;
}

const Template = (args: CardStoryArgs) => html`
    <wcs-card mode=${args.mode}>
        <wcs-card-body>
            Basic card
        </wcs-card-body>
    </wcs-card>
`;

export const Default: StoryObj<CardStoryArgs> = {
    render: (args) => Template(args),
    args: {
        mode: 'raised'
    }
}

export const FlatMode: StoryObj<CardStoryArgs> = {
    render: (args) => Template(args),
    args: {
        mode: 'flat'
    }
}

export const WithImage: StoryObj<CardStoryArgs> = {
    render: (args) => html`
        <wcs-card mode=${args.mode}>
            <img alt="Train with landscape" src="train_autumn.jpg"
                 style="object-fit: cover; object-position: 50% 70%; height: 150px; border-radius: var(--wcs-card-border-radius) var(--wcs-card-border-radius) 0 0">
            <wcs-card-body>
                Card with Image
            </wcs-card-body>
        </wcs-card>
    `,
    args: {
        mode: 'flat'
    }
}

export const WithoutBody: StoryObj<CardStoryArgs> = {
    render: (args) => html`
        <wcs-card mode=${args.mode}>
            Basic card
        </wcs-card>
    `,
    args: {
        mode: 'raised'
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
        mode: 'raised'
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
        mode: 'raised'
    }
}
