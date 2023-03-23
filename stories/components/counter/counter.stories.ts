import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from "../../utils/args-generation";
import { WcsCounterSize } from "../../../src";

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

const Template: StoryFn<Partial<{size: WcsCounterSize, value: number, label: string, min: number, max: number, step: number}>> = (args) => html`
    <wcs-counter size=${args.size}
                 value=${args.value}
                 label="${args.label}"
                 min=${args.min}
                 max=${args.max}
                 step=${args.step}></wcs-counter>
`;

export const Default = Template.bind({});
Default.args = {value: 1, label: "Number of passengers", min: 0, max: 5, step: 1};

const TemplateSize: StoryFn<Partial<{value: number, min: number, max: number, step: number}>> = (args) => html`
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
`

export const Sizes = TemplateSize.bind({});
Sizes.args = { value: 1, min: 0, max: 5, step: 1 }



