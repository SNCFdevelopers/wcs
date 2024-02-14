import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Dropdown/Subcomponents/Dropdown Header',
    component: 'wcs-dropdown-header',
};

export default meta;

export const Default: StoryObj = {
    render: () => html`
        <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
        <div style="display: flex; width: 100%; align-items: center; justify-content: center">
            <wcs-dropdown mode="plain">
                <span slot="placeholder">Dropdown</span>
                <wcs-dropdown-header>ACTION HEADER GROUP 1</wcs-dropdown-header>
                <wcs-dropdown-item>Item 1 group 1</wcs-dropdown-item>
                <wcs-dropdown-item>Item 2 group 1</wcs-dropdown-item>
            </wcs-dropdown>
        </div>
        <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
    `
}
