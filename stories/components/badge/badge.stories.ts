import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import badgeDocumentation from './badge-documentation.md'
import { BadgeColor, BadgeShape, BadgeSize } from '../../../src/components/badge/badge-interface';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Badge',
    component: 'wcs-badge',
    argTypes: getComponentArgs('wcs-badge'),
};
export default meta;

const Template: StoryFn<Partial<{ shape: BadgeShape, color: BadgeColor, size: BadgeSize }>> = (args) => html`
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-primary">Primary</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-secondary">Secondary</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-success">Success</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-danger">Danger</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-warning">Warning</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-info">Info</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-light">Light</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-dark">Dark</wcs-badge>
`;

export const Default = Template.bind({});
Default.args = {
    shape: 'normal',
    color: 'initial',
    size: 'm',
};

export const NormalShapeWithLighterColor = Template.bind({});
NormalShapeWithLighterColor.args = {
    shape: 'normal',
    color: 'lighter',
    size: 'm',
};

export const RoundedShapeWithInitialColor = Template.bind({});
RoundedShapeWithInitialColor.args = {
    shape: 'rounded',
    color: 'initial',
    size: 'm',
};

export const RoundedShapeWithLighterColor = Template.bind({});
RoundedShapeWithLighterColor.args = {
    shape: 'rounded',
    color: 'lighter',
    size: 'm',
};

/**
 * Change the `wcs-badge` size by setting this property.  
 * The available sizes are "l" (large), "m" (medium, default) and "s" (small).
 */
export const Sizes: StoryObj = {
    render: (args) => html`
        <wcs-badge shape=${args.shape} color=${args.color} size="l" class="wcs-primary">Large</wcs-badge>
        <wcs-badge shape=${args.shape} color=${args.color} size="m" class="wcs-primary">Medium</wcs-badge>
        <wcs-badge shape=${args.shape} color=${args.color} size="s" class="wcs-primary">Small</wcs-badge>
    `,
    args: {
        ...Default.args
    }
}
