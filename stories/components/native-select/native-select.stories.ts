import { Meta } from '@storybook/web-components';
import { html, nothing } from "lit-html";
import { WcsNativeSelectSize } from "../../../src";
import { getComponentArgs } from "../../utils/args-generation";

/**
 * A `wcs-native-select` allows one option to be selected from multiple options. The `wcs-native-select` component is a
 * wrapper around the native `<select>` element.
 *
 * 💡It is strongly recommended to use select-native when you don't have to support the multi-selection feature
 *
 * ### Guidance ✅:
 * - To have a placeholder, you must have an option as child which has `selected` attribute and `disabled`
 * attribute. You can add the `hidden` attribute to don't show the placeholder option in the options overlay
 */
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
 * `wcs-native-select` can have different sizes. The available sizes are "s" (small) and "m" (medium). The size is determined by the `size` property of the component.
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
