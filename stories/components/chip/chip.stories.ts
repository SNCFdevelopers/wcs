import { Meta, StoryFn } from '@storybook/web-components-vite';
import { html, nothing } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';
import { WcsChipMode, WcsChipVariant } from '../../../src/components/chip/chip-interface';
import { withActions } from 'storybook/actions/decorator';

const meta: Meta = {
    title: 'Components/Chip',
    component: 'wcs-chip',
    argTypes: getComponentArgs('wcs-chip'),
    parameters: {
        actions: {
            handles: [
                'wcsChipSelectChange',
                'wcsChipDismiss'
            ]
        }
    },
    decorators: [withActions]
};
export default meta;

const Template: StoryFn<Partial<{
    value: string,
    label: string,
    selected: boolean,
    disabled: boolean,
    mode: WcsChipMode,
    variant: WcsChipVariant
}>> = (args) => html`
    <wcs-chip
        value="${args.value ?? nothing}"
        label="${args.label ?? nothing}"
        ?selected="${args.selected}"
        mode="${args.mode ?? nothing}"
        ?disabled="${args.disabled}"
        variant="${args.variant ?? nothing}"
    ></wcs-chip>
`;

export const Default = Template.bind({});
Default.args = {
    value: 'chip-id',
    label: 'Un chip',
    selected: false,
    mode: 'selectable',
    disabled: false,
    variant: 'primary'
};

export const Dismissible = Template.bind({});
Dismissible.args = {
    value: 'dismissible-chip-id',
    label: 'Un chip désactivable',
    selected: false,
    mode: 'dismissible',
    disabled: false,
    variant: 'primary'
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: 'disabled-chip-id',
    label: 'Un chip',
    selected: false,
    mode: 'selectable',
    disabled: true,
    variant: 'primary'
};


const MultipleChipsTemplate: StoryFn<Partial<{
    value: string,
    label: string,
    selected: boolean,
    disabled: boolean,
    mode: WcsChipMode,
    variant: WcsChipVariant
}>> = (args) => html`
    <wcs-chip
        value="lyon-part-dieu"
        label="Lyon Part-Dieu"
        ?selected="${args.selected}"
        mode="${args.mode ?? nothing}"
        ?disabled=${args.disabled}
        variant="${args.variant ?? nothing}"
    ></wcs-chip>
    <wcs-chip
        value="lyon-perrache"
        label="Lyon Perrache"
        ?selected="${args.selected}"
        mode="${args.mode ?? nothing}"
        ?disabled=${args.disabled}
        variant="${args.variant ?? nothing}"
    ></wcs-chip>
    <wcs-chip
        value="lyon-saint-paul"
        label="Lyon Saint-Paul"
        ?selected="${args.selected}"
        mode="${args.mode ?? nothing}"
        ?disabled=${args.disabled}
        variant="${args.variant ?? nothing}"
    ></wcs-chip>
    <wcs-chip
        value="lyon-saint-exupéry"
        label="Lyon Saint-Exupéry"
        ?selected="${args.selected}"
        mode="${args.mode ?? nothing}"
        ?disabled=${args.disabled}
        variant="${args.variant ?? nothing}"
    ></wcs-chip>
    <wcs-chip
        value="lyon-jean-macé"
        label="Lyon Jean-Macé"
        ?selected="${args.selected}"
        mode="${args.mode ?? nothing}"
        ?disabled=${args.disabled}
        variant="${args.variant ?? nothing}"
    ></wcs-chip>
`;

export const MultipleChips = MultipleChipsTemplate.bind({});
MultipleChips.args = {
    selected: false,
    mode: 'selectable',
    disabled: false,
    variant: 'primary'
};
