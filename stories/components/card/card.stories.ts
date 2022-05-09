import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { CardMode } from '../../../src/components/card/card-interface';

export default {
    title: 'Components/Card',
    component: 'wcs-card',
    subcomponents: {
        'WcsCardBody': 'wcs-card-body'
    }
} as Meta;

const BasicTemplate: Story<Partial<{ mode: CardMode }>> = (args) => html`
    <wcs-card mode=${args.mode}>
        <wcs-card-body>
            Basic card
        </wcs-card-body>
    </wcs-card>
`;

const WithoutBodyTemplate: Story<Partial<{ mode: CardMode }>> = (args) => html`
    <wcs-card mode=${args.mode}>
        Basic card
    </wcs-card>
`;

const TwoBodyAndDividerTemplate: Story<Partial<{ mode: CardMode }>> = (args) => html`
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

const OneBodyAndDividerTemplate: Story<Partial<{ mode: CardMode }>> = (args) => html`
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
