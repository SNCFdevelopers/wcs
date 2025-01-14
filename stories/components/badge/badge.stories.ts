import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { BadgeColor, BadgeShape, BadgeSize } from '../../../src/components/badge/badge-interface';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Badge',
    component: 'wcs-badge',
    argTypes: getComponentArgs('wcs-badge'),
};
export default meta;

type BadgeArgs = {
    shape: BadgeShape,
    color: BadgeColor,
    size: BadgeSize
}

const Template: StoryFn<Partial<BadgeArgs>> = (args) => html`
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-primary">Primary</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-secondary">Secondary</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-success">Success</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-danger">Danger</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-warning">Warning</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-info">Info</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-light">Light</wcs-badge>
    <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-dark">Dark</wcs-badge>
`;

export const Default: StoryObj = {
    render: (args) => Template(args, this),
    args: {
        shape: 'normal',
        color: 'initial',
        size: 'm',
    }
}

export const WithIcons: StoryObj = {
    render: (args) => html`
        <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-primary">
            <wcs-mat-icon icon="description" size="s"></wcs-mat-icon>
            <span>Primary</span>
        </wcs-badge>
        <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-secondary">
            <wcs-mat-icon icon="filter_alt" size="s"></wcs-mat-icon>
            <span>Secondary</span>
        </wcs-badge>
        <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-success">
            <wcs-mat-icon icon="done" size="s"></wcs-mat-icon>
            <span>Success</span>
        </wcs-badge>
        <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-critical">
            <wcs-mat-icon icon="delete" size="s"></wcs-mat-icon>
            <span>Critical</span>
        </wcs-badge>
        <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-warning">
            <wcs-mat-icon icon="warning" size="s"></wcs-mat-icon>
            <span>Warning</span>
        </wcs-badge>
        <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-info">
            <wcs-mat-icon icon="info" size="s"></wcs-mat-icon>
            <span>Info</span>
        </wcs-badge>
        <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-light">
            <wcs-mat-icon icon="light_mode" size="s"></wcs-mat-icon>
            <span>Light</span>
        </wcs-badge>
        <wcs-badge shape=${args.shape} color=${args.color} size=${args.size} class="wcs-dark">
            <wcs-mat-icon icon="dark_mode" size="s"></wcs-mat-icon>
            <span>Dark</span>
        </wcs-badge>
    `,
    args: {
        ...Default.args
    }
}

export const NormalShapeWithLighterColor: StoryObj = {
    render: (args) => Template(args, this),
    args: {
        shape: 'normal',
        color: 'lighter',
        size: 'm',
    }
}

export const RoundedShapeWithInitialColor: StoryObj = {
    render: (args) => Template(args, this),
    args: {
        shape: 'rounded',
        color: 'initial',
        size: 'm',
    }
}

export const RoundedShapeWithLighterColor: StoryObj = {
    render: (args) => Template(args, this),
    args: {
        shape: 'rounded',
        color: 'lighter',
        size: 'm',
    }
}

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
