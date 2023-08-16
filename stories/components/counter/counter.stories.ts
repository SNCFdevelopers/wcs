import { Meta } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from "../../utils/args-generation";

const meta: Meta = {
    title: 'Components/Counter',
    component: 'wcs-counter',
    parameters: {
        actions: {
            handles: [
                'wcsBlur',
                'wcsChange',
                'wcsFocus',
                'wcsCounter'
            ]
        }
    },
    decorators: [withActions],
    argTypes: getComponentArgs('wcs-counter')
};
export default meta;

/**
 * By default, if you don't put `min` and `max`, `counter` doesn't have a range of values.
 *
 * ⚠️<b>Prefer a small range of values for accessibility reasons</b> ⚠️
 */
export const Default = {
    render: (args) => html`
        <wcs-counter size=${args.size ?? nothing}
                     value=${args.value ?? nothing}
                     label="${args.label ?? nothing}"
                     min=${args.min ?? nothing}
                     max=${args.max ?? nothing}
                     step=${args.step ?? nothing}></wcs-counter>
    `,
    args: {
        label: "Number of passengers"
    }
};

/**
 * You can set a min and a max value.
 * <br>
 * For larger or specific ranges please refer to <a href=".?path=/docs/components-input--documentation">wcs-input (type number)</a>
 *  and define it's two props `min` and `max`
 */
export const MinMax = {
    ...Default,
    args: {
        value: 1,
        label: "Number of passengers",
        min: 0,
        max: 5
    }
};

export const Sizes = {
    render: (args) => html`
        <wcs-label>Size M</wcs-label>
        <wcs-counter value=${args.value}
                     size="m"
                     label="size m"
                     min=${args.min}
                     max=${args.max}
                     step=${args.step}></wcs-counter>
        <wcs-label>Size L</wcs-label>
        <wcs-counter value=${args.value}
                     size="l"
                     label="size l"
                     min=${args.min}
                     max=${args.max}
                     step=${args.step}></wcs-counter>
    `,
    args: {
        value: 1,
        min: 0,
        max: 5,
        step: 1
    }
};


