import { Meta, StoryFn } from '@storybook/web-components';
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

const BasicTemplate: StoryFn<Partial<{ mode: CardMode }>> = (args) => html`
    <wcs-card mode=${args.mode}>
        <wcs-card-body>
            Basic card
        </wcs-card-body>
    </wcs-card>
`;

const WithoutBodyTemplate: StoryFn<Partial<{ mode: CardMode }>> = (args) => html`
    <wcs-card mode=${args.mode}>
        Basic card
    </wcs-card>
`;

const TwoBodyAndDividerTemplate: StoryFn<Partial<{ mode: CardMode }>> = (args) => html`
    <wcs-card mode=${args.mode}>
        <wcs-card-body>
            Flat card content
        </wcs-card-body>
        <wcs-divider></wcs-divider>
        <wcs-card-body>
            Another part of the card
        </wcs-card-body>
    </wcs-card>
`;

const OneBodyAndDividerTemplate: StoryFn<Partial<{ mode: CardMode }>> = (args) => html`
    <wcs-card mode=${args.mode}>
        <wcs-card-body>
            Flat card content
            <wcs-divider style="margin: 8px 0 8px 0"></wcs-divider>
            Another part of the card
        </wcs-card-body>
    </wcs-card>
`;

export const Default = BasicTemplate.bind({});
Default.args = {
    mode: 'raised'
};

export const FlatMode = BasicTemplate.bind({});
FlatMode.args = {
    mode: 'flat'
};

export const WithoutBody = WithoutBodyTemplate.bind({});
WithoutBody.args = {
    mode: 'raised'
};

export const TwoBodyAndDivider = TwoBodyAndDividerTemplate.bind({});
TwoBodyAndDivider.args = {
    mode: 'raised'
};

export const OneBodyAndDivider = OneBodyAndDividerTemplate.bind({});
OneBodyAndDivider.args = {
    mode: 'raised'
};
