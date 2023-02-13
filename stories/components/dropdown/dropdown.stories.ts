import { Meta, StoryFn } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsButtonMode, WcsButtonShape } from '../../../src/components/button/button-interface';
// @ts-ignore
import dropdownDocumentation from './dropdown-documentation.md'
import { WcsDropdownPlacement } from '../../../src/components/dropdown/dropdown-interface';

const meta: Meta = {
    title: 'Components/Dropdown',
    component: 'wcs-dropdown',
    parameters: {
        actions: {
            handles: [
                'wcsDropdownItemClick'
            ]
        },
        docs: {
            description: {
                component: dropdownDocumentation
            }
        }
    },
    subcomponents: {
        'WcsDropdownItem': 'wcs-dropdown-item',
        'WcsDropdownHeader': 'wcs-dropdown-header',
        'WcsDropdownDivider': 'wcs-dropdown-divider',
    }
};
export default meta;

const Template: StoryFn<Partial<{ disabled: boolean, mode: WcsButtonMode, shape: WcsButtonShape, placement: WcsDropdownPlacement, noArrow: boolean }>> = (args) => html`
    <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
    <div style="display: flex; width: 100%; align-items: center; justify-content: center">
        <wcs-dropdown ?disabled=${args.disabled} mode=${args.mode} shape=${args.shape} placement=${args.placement} ?no-arrow=${args.noArrow}>
            <span slot="placeholder">Dropdown</span>
            <wcs-dropdown-item>Premier item</wcs-dropdown-item>
            <wcs-dropdown-header>ACTION HEADER</wcs-dropdown-header>
            <wcs-dropdown-item>Second item test avec un long texte</wcs-dropdown-item>
            <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
            <wcs-dropdown-divider></wcs-dropdown-divider>
            <wcs-dropdown-item>Dernier item</wcs-dropdown-item>
        </wcs-dropdown>
    </div>
    <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
`;

export const Default = Template.bind({});
Default.args = {
    disabled: false,
    placement: 'bottom-end',
    mode: 'plain',
    shape: 'normal'
};

export const WithoutArrow = Template.bind({});
WithoutArrow.args = {
    disabled: false,
    placement: 'bottom-end',
    mode: 'plain',
    noArrow: true,
    shape: 'normal'
};
