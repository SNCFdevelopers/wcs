import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { WcsButtonMode, WcsButtonShape } from '../../../src/components/button/button-interface';
// @ts-ignore
import { WcsDropdownPlacement } from '../../../src/components/dropdown/dropdown-interface';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Dropdown',
    component: 'wcs-dropdown',
    argTypes: getComponentArgs('wcs-dropdown'),
    parameters: {
        actions: {
            handles: [
                'wcsDropdownItemClick'
            ]
        }
    },
    subcomponents: {
        'WcsDropdownItem': 'wcs-dropdown-item',
        'WcsDropdownHeader': 'wcs-dropdown-header',
        'WcsDropdownDivider': 'wcs-dropdown-divider',
    },
    decorators: [withActions]
};
export default meta;

export interface DropdownStoryArgs {
    disabled: boolean,
    mode: WcsButtonMode,
    shape: WcsButtonShape,
    placement: WcsDropdownPlacement,
    noArrow: boolean
}

export const Default: StoryObj<DropdownStoryArgs> = {
    render: (args) => html`
        <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
        <div style="display: flex; width: 100%; align-items: center; justify-content: center">
            <wcs-dropdown ?disabled=${args.disabled} mode=${args.mode} shape=${args.shape} placement=${args.placement}
                          ?no-arrow=${args.noArrow}>
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
    `,
    args: {
        disabled: false,
        placement: 'bottom-end',
        mode: 'plain',
        shape: 'normal'
    }
}

export const WithoutArrow: StoryObj<DropdownStoryArgs> = {
    ...Default,
    args: {
        disabled: false,
        placement: 'bottom-end',
        mode: 'plain',
        noArrow: true,
        shape: 'normal'
    }
}

export const Disabled: StoryObj<DropdownStoryArgs> = {
    ...Default,
    args: {
        disabled: true,
        placement: 'bottom-end',
        mode: 'plain',
        shape: 'normal'
    }
}

export const WithIcon: StoryObj<DropdownStoryArgs> = {
    render: (args) => html`
        <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
        <div style="display: flex; width: 100%; align-items: center; justify-content: center">
            <wcs-dropdown ?disabled=${args.disabled} mode=${args.mode} shape=${args.shape} placement=${args.placement}
                          ?no-arrow=${args.noArrow}>
                <span slot="placeholder">
                    <wcs-mat-icon icon="more_horiz"></wcs-mat-icon>
                </span>
                <wcs-dropdown-item>Premier item</wcs-dropdown-item>
            </wcs-dropdown>
        </div>
        <div style="height: 250px"></div>  <!-- tag to let the overlay display properly -->
    `,
    args: {
        disabled: false,
        placement: 'bottom-end',
        mode: 'plain',
        shape: 'normal',
        noArrow: true,
    }
}
