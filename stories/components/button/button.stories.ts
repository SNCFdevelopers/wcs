import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsButtonMode, WcsButtonShape, WcsButtonSize } from '../../../src/components/button/button-interface';
import { createRef, ref, Ref } from 'lit-html/directives/ref.js';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Button',
    component: 'wcs-button',
    argTypes: getComponentArgs('wcs-button'),
};
export default meta;

const Template: StoryFn<Partial<{ innerText: string, mode: WcsButtonMode, size: WcsButtonSize, loading: boolean, shape: WcsButtonShape, href: string, disabled: boolean, ripple: boolean }>> = (args) => html`
    <wcs-button mode=${args.mode} shape=${args.shape} size=${args.size ?? 'm'} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-primary">
        ${args.innerText}
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} size=${args.size ?? 'm'} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-secondary">
        Secondary
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} size=${args.size ?? 'm'} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-success">
        Success
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} size=${args.size ?? 'm'} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-warning">
        Warning
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} size=${args.size ?? 'm'} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-danger">
        Danger
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} size=${args.size ?? 'm'} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-info">
        Info
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} size=${args.size ?? 'm'} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-dark">
        Dark
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} size=${args.size ?? 'm'} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-light">
        Light
    </wcs-button>
    <h3>Full Width</h3>
    <wcs-button style="width: 100%" mode=${args.mode} shape=${args.shape} size=${args.size ?? 'm'} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-primary">
        ${args.innerText}
    </wcs-button>
`;

export const Default = Template.bind({});
Default.args = {innerText: 'Primary', loading: false, shape: 'normal'};

export const clear = Template.bind({});
clear.args = {innerText: 'Primary', mode: 'clear', loading: false};

export const stroked = Template.bind({});
stroked.args = {innerText: 'Primary', mode: 'stroked', loading: false};

export const disabled = Template.bind({});
disabled.args = {innerText: 'Primary', disabled: true, loading: false};

const TemplateSizes: StoryFn<Partial<{ loading: boolean }>> = (args) => html`
    <wcs-button size="l" ?loading="${args.loading}">Button L</wcs-button>
    <wcs-button size="m"  ?loading="${args.loading}">Button M (default)</wcs-button>
    <wcs-button size="s"  ?loading="${args.loading}">Button S</wcs-button>
`;

export const sizes = TemplateSizes.bind({});
sizes.args = {loading: false};

const TemplateShape: StoryFn<Partial<{ shape: WcsButtonShape, loading: boolean}>> = (args) => html`
    <wcs-button shape=${args.shape} ?loading="${args.loading}" class="wcs-primary">
        <wcs-mat-icon icon="accessibility_new"></wcs-mat-icon>
    </wcs-button>
    <wcs-button shape=${args.shape} ?loading="${args.loading}" mode="clear" class="wcs-primary">
        <wcs-mat-icon icon="accessibility_new"></wcs-mat-icon>
    </wcs-button>
    <wcs-button shape=${args.shape} ?loading="${args.loading}" mode="stroked" class="wcs-primary">
        <wcs-mat-icon icon="accessibility_new"></wcs-mat-icon>
    </wcs-button>
    <wcs-button shape=${args.shape} ?loading="${args.loading}" class="wcs-primary" disabled>
        <wcs-mat-icon icon="accessibility_new"></wcs-mat-icon>
    </wcs-button>
`;

export const square = TemplateShape.bind({});
square.args = {shape: 'square', loading: false};

export const round = TemplateShape.bind({});
round.args = {shape: 'round', loading: false};

const TemplateLink: StoryFn<Partial<{ href: string, target: string }>> = (args) => html`
    <wcs-button href=${args.href}>
        Lien par default
    </wcs-button>

    <wcs-button href=${args.href} target=${args.target}>
        S'ouvre dans une nouvelle fenêtre
    </wcs-button>
`;

export const link = TemplateLink.bind({});
link.args = {href: 'https://sncf.com', target: '_blank'};


/**********************/
/* MANUAL FOCUS DEMO  */
/**********************/
const buttonToFocus: Ref<HTMLInputElement> = createRef();

function setFocus(){
    buttonToFocus.value?.focus();
}

const TemplateManualFocus: StoryFn<Partial<{ innerText: string, mode: WcsButtonMode, shape: WcsButtonShape, href: string, disabled: boolean, ripple: boolean, loading: boolean}>> = (args) => html`
    <p>You can set the focus on the button by calling the native <code>focus()</code> method on the wcs-button web component.</p>
    <wcs-button @click="${setFocus}" class="wcs-light">Set focus on next button</wcs-button>
    <wcs-button ${ref(buttonToFocus)} mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple}
                ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-light">
        ${args.innerText}
    </wcs-button>`;

export const ManualFocus = TemplateManualFocus.bind({});
ManualFocus.args = {innerText: 'Button to focus', loading: false};

export const Loading = Template.bind({});
Loading.args = {innerText: 'Loading button', loading: true};
