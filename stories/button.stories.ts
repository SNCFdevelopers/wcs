import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsButtonMode, WcsButtonShape } from '../src/components/button/button-interface';

export default {
    title: 'Example/Button',
    component: 'wcs-button'
} as Meta;

const Template: Story<Partial<{ innerText: string, mode: WcsButtonMode, shape: WcsButtonShape, href: string, disabled: boolean, ripple: boolean }>> = (args) => html`
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                class="wcs-primary">
        ${args.innerText}
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                class="wcs-secondary">
        Secondary
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                class="wcs-success">
        Success
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                class="wcs-warning">
        Warning
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                class="wcs-danger">
        Danger
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                class="wcs-info">
        Info
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                class="wcs-dark">
        Dark
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                class="wcs-light">
        Light
    </wcs-button>
`;

export const Default = Template.bind({});
Default.args = {innerText: 'Primary'};

export const clear = Template.bind({});
clear.args = {innerText: 'Primary', mode: 'clear'};

export const stroked = Template.bind({});
stroked.args = {innerText: 'Primary', mode: 'stroked'};

export const disabled = Template.bind({});
disabled.args = {innerText: 'Primary', disabled: true};

const TemplateShape: Story<Partial<{ shape: WcsButtonShape }>> = (args) => html`
    <wcs-button shape=${args.shape} class="wcs-primary">
        <i class="material-icons">accessibility_new</i>
    </wcs-button>
    <wcs-button shape=${args.shape} mode="clear" class="wcs-primary">
        <i class="material-icons">accessibility_new</i>
    </wcs-button>
    <wcs-button shape=${args.shape} mode="stroked" class="wcs-primary">
        <i class="material-icons">accessibility_new</i>
    </wcs-button>
    <wcs-button shape=${args.shape} class="wcs-primary" disabled>
        <i class="material-icons">accessibility_new</i>
    </wcs-button>
`;

export const square = TemplateShape.bind({});
square.args = {shape: 'square'};

export const round = TemplateShape.bind({});
round.args = {shape: 'round'};

export const small = TemplateShape.bind({});
small.args = {shape: 'small'};

const TemplateLink: Story<Partial<{ href: string }>> = (args) => html`
    <wcs-button href=${args.href}>
        Avec lien
    </wcs-button>
`;

export const link = TemplateLink.bind({});
link.args = {href: 'https://sncf.com'};
