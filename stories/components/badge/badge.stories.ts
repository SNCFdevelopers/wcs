import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import badgeDocumentation from './badge-documentation.md'
import { BadgeColor, BadgeShape } from '../../../src/components/badge/badge-interface';

const meta: Meta = {
    title: 'Components/Badge',
    component: 'wcs-badge',
    parameters: {
        docs: {
            description: {
                component: badgeDocumentation
            }
        }
    },
};
export default meta;

const Template: StoryFn<Partial<{ shape: BadgeShape, color: BadgeColor }>> = (args) => html`
    <wcs-badge shape=${args.shape} color=${args.color} class="wcs-primary">Primary</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} class="wcs-secondary">Secondary</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} class="wcs-success">Success</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} class="wcs-danger">Danger</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} class="wcs-warning">Warning</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} class="wcs-info">Info</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} class="wcs-light">Light</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} class="wcs-dark">Dark</wcs-badge>
`;

export const Default = Template.bind({});
Default.args = {
    shape: 'normal',
    color: 'initial'
};

export const NormalShapeWithLighterColor = Template.bind({});
NormalShapeWithLighterColor.args = {
    shape: 'normal',
    color: 'lighter'
};

export const RoundedShapeWithInitialColor = Template.bind({});
RoundedShapeWithInitialColor.args = {
    shape: 'rounded',
    color: 'initial'
};

export const RoundedShapeWithLighterColor = Template.bind({});
RoundedShapeWithLighterColor.args = {
    shape: 'rounded',
    color: 'lighter'
};
