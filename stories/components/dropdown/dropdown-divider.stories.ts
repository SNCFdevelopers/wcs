import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
    title: 'Components/Dropdown/Subcomponents/Dropdown Divider',
    component: 'wcs-dropdown-divider',
};

export default meta;


export const Default: StoryObj = {
    render: () => html`
        <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
        <div style="display: flex; width: 100%; align-items: center; justify-content: center">
            <wcs-dropdown mode="plain">
                <span slot="placeholder">Dropdown</span>
                <wcs-dropdown-item>Premier item</wcs-dropdown-item>
                <wcs-dropdown-divider></wcs-dropdown-divider>
                <wcs-dropdown-item>Second item</wcs-dropdown-item>
            </wcs-dropdown>
        </div>
        <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
    `
}
