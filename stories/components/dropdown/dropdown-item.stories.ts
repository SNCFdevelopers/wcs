import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { DropdownStoryArgs } from "./dropdown.stories";
import { getComponentArgs } from "../../utils/args-generation";

const meta: Meta = {
    title: 'Components/Dropdown/Subcomponents/Dropdown Item',
    component: 'wcs-dropdown-item',
    argTypes: getComponentArgs('wcs-dropdown-item')
};

export default meta;

export const Default: StoryObj<DropdownStoryArgs> = {
    render: () => html`
        <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
        <div style="display: flex; width: 100%; align-items: center; justify-content: center">
            <wcs-dropdown mode="plain">
                <span slot="placeholder">Dropdown</span>
                <wcs-dropdown-item>Action 1</wcs-dropdown-item>
                <wcs-dropdown-item>Action 2</wcs-dropdown-item>
            </wcs-dropdown>
        </div>
        <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
    `
}
