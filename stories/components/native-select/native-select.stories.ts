import { Meta } from '@storybook/web-components';
import { html, nothing } from "lit-html";
import { WcsNativeSelectSize } from "../../../src";
import { getComponentArgs } from "../../utils/args-generation";
import { createRef, ref, Ref } from 'lit-html/directives/ref.js';

const meta: Meta = {
    title: 'Components/Native-select',
    component: 'wcs-native-select',
    argTypes: getComponentArgs('wcs-native-select'),
}
export default meta;

interface StoryParams {
    size: WcsNativeSelectSize,
    disabled: boolean
}

export const Default = {
    render: (args: StoryParams) => {
        return html`
            <label for="select-default" style="margin: var(--wcs-base-margin) 0; display: block">Libélé du select</label>
            <wcs-native-select size=${args.size ?? nothing}>
                <select name="select-default" id="select-default" ?disabled=${args.disabled}>
                    <option disabled selected hidden>Placeholder du select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                </select>
            </wcs-native-select>
        `
    },
    args: {
        size: 'm',
        disabled: false
    }
};

export const Disabled = {
    ...Default,
    args: {
        disabled: true,
        size: 'm'
    }
}

/**
 * `wcs-native-select` can have different sizes. The available sizes are "l" (large) and "m" (medium). The size is determined by the `size` property of the component.
 */
export const Sizes = {
    render: () => {
        return html`
            <label for="select-size-m" style="margin: var(--wcs-base-margin) 0; display: block">Label size m</label>
            <wcs-native-select size="m">
                <select id="select-size-m" name="select-size-m">
                    <option disabled selected hidden>Placeholder du select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                </select>
            </wcs-native-select>

            <label for="select-size-l" style="margin: var(--wcs-base-margin) 0; display: block">Label size l</label>
            <wcs-native-select size="l">
                <select id="select-size-l" name="select-size-l">
                    <option disabled selected hidden>Placeholder du select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                </select>
            </wcs-native-select>
        `
    }
};

export const WithoutPlaceholder = {
    render: () => html`
        <label for="select-size-m" style="margin: var(--wcs-base-margin) 0; display: block">Label size m</label>
        <wcs-native-select size="m">
            <select id="select-size-m" name="select-size-m">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3" disabled>Three</option>
            </select>
        </wcs-native-select>
    `
}

/**
 * 💡`wcs-native-select` hide value label if an overflow occurs
 */
export const OverflowBehaviour = {
    render: () => html`
        <div style="width: 100px">
            <wcs-native-select>
                <select>
                    <option disabled selected>Sélectionner</option>
                    <option value="">Moins de 15 ans</option>
                    <option value="">Entre 15 et 25 ans</option>
                    <option value="">Entre 25 et 35 ans</option>
                    <option value="">Entre 35 et 45 ans</option>
                    <option value="">Entre 45 et 55 ans</option>
                    <option value="">Entre 55 et 65 ans</option>
                    <option value="">Entre 65 et 75 ans</option>
                    <option value="">Plus de 75 ans</option>
                </select>
            </wcs-native-select>
        </div>
    `
}

/**
 * **Manually update styles**
 * `wcs-native-select` exposes a public method called `updateStyles()`.
 * If you want to apply the placeholder style when the select is reset,
 * you have to call the `updateStyles()` method manually.
 *
 * This is due to our choice of implementation to preserve the select style of the Design System.
 * _If you are curious about why we chose to expose a method, click [here](https://gitlab.com/SNCF/wcs/-/issues/128#note_1635122576)_
 *
 * **Example of implementation** :
 *
 * ```typescript
 * function resetForm() {
 *     formRef.value.reset();
 *     nativeSelectRef.value.updateStyles(); // 👈 Very important to update the placeholder style
 * }
 * ```
 */
export const UpdateStylesMethod = {
    render: (args: StoryParams) => html`
        <form ${ref(formRef)} style="display: inline-block">
            <label for="select-default" style="margin: var(--wcs-base-margin) 0; display: block">Label</label>
            <wcs-native-select size=${args.size ?? nothing} ${ref(nativeSelectRef)}>
                <select name="select-default" id="select-default" ?disabled=${args.disabled}>
                    <option selected disabled hidden>Placeholder</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                </select>
            </wcs-native-select>
        </form>
        <wcs-button @click="${resetForm}">Reset</wcs-button>
    `
}

const formRef: Ref<HTMLFormElement> = createRef();
const nativeSelectRef: Ref<HTMLWcsNativeSelectElement> = createRef();

function resetForm() {
    // @ts-ignore : reset method does exist on HTMLFormElement
    formRef.value.reset();
    nativeSelectRef.value.updateStyles();
}

