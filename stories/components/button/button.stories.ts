import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsButtonMode, WcsButtonShape } from '../../../src/components/button/button-interface';
import { createRef, ref, Ref } from "lit-html/directives/ref";

export default {
    title: 'Components/Button',
    component: 'wcs-button'
} as Meta;

const Template: Story<Partial<{ innerText: string, mode: WcsButtonMode, loading: boolean, shape: WcsButtonShape, href: string, disabled: boolean, ripple: boolean }>> = (args) => html`
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-primary">
        ${args.innerText}
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-secondary">
        Secondary
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-success">
        Success
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-warning">
        Warning
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-danger">
        Danger
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-info">
        Info
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-dark">
        Dark
    </wcs-button>
    <wcs-button mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-light">
        Light
    </wcs-button>
    <h3>Full Width</h3>
    <wcs-button style="width: 100%" mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple}
                ?disabled=${args.disabled} ?loading="${args.loading}"
                class="wcs-primary">
        ${args.innerText}
    </wcs-button>
`;

export const Default = Template.bind({});
Default.args = {innerText: 'Primary', loading: false};

export const clear = Template.bind({});
clear.args = {innerText: 'Primary', mode: 'clear', loading: false};

export const stroked = Template.bind({});
stroked.args = {innerText: 'Primary', mode: 'stroked', loading: false};

export const disabled = Template.bind({});
disabled.args = {innerText: 'Primary', disabled: true, loading: false};

const TemplateShape: Story<Partial<{ shape: WcsButtonShape, loading: boolean}>> = (args) => html`
    <wcs-button shape=${args.shape} ?loading="${args.loading}" class="wcs-primary">
        <i class="material-icons">accessibility_new</i>
    </wcs-button>
    <wcs-button shape=${args.shape} ?loading="${args.loading}" mode="clear" class="wcs-primary">
        <i class="material-icons">accessibility_new</i>
    </wcs-button>
    <wcs-button shape=${args.shape} ?loading="${args.loading}" mode="stroked" class="wcs-primary">
        <i class="material-icons">accessibility_new</i>
    </wcs-button>
    <wcs-button shape=${args.shape} ?loading="${args.loading}" class="wcs-primary" disabled>
        <i class="material-icons">accessibility_new</i>
    </wcs-button>
`;

export const square = TemplateShape.bind({});
square.args = {shape: 'square', loading: false};

export const round = TemplateShape.bind({});
round.args = {shape: 'round', loading: false};

export const small = TemplateShape.bind({});
small.args = {shape: 'small', loading: false};

const TemplateLink: Story<Partial<{ href: string }>> = (args) => html`
    <wcs-button href=${args.href}>
        Avec lien
    </wcs-button>
`;

export const link = TemplateLink.bind({});
link.args = {href: 'https://sncf.com'};


/**********************/
/* MANUAL FOCUS DEMO  */
/**********************/
const buttonToFocus: Ref<HTMLInputElement> = createRef();

function setFocus(){
    buttonToFocus.value?.focus();
}

const TemplateManualFocus: Story<Partial<{ innerText: string, mode: WcsButtonMode, shape: WcsButtonShape, href: string, disabled: boolean, ripple: boolean, loading: boolean}>> = (args) => html`
    <p>You can set the focus on the button by calling the native <code>focus()</code> method on the wcs-button web component.</p>
    <wcs-button @click="${setFocus}" class="wcs-light">Set focus on next button</wcs-button>
    <wcs-button ${ref(buttonToFocus)} mode=${args.mode} shape=${args.shape} ?ripple=${args.ripple} ?disabled=${args.disabled}
                ?loading="${args.loading}"
                class="wcs-light">
        ${args.innerText}
    </wcs-button>`;

export const ManualFocus = TemplateManualFocus.bind({});
ManualFocus.args = {innerText: 'Button to focus', loading: false};

export const Loading = Template.bind({});
Loading.args = {innerText: 'Loading button', loading: true};
