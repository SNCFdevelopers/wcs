import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Select/Subcomponents/Select Option',
    component: 'wcs-select-option',
    argTypes: getComponentArgs('wcs-select-option')
};
export default meta;

type SelectOptionArgs = {
    disabled: boolean;
    selected: boolean;
    chipColor?: string;
    chipBackgroundColor?: string;
}

const Template: StoryFn = (args: Partial<SelectOptionArgs & { multiple: boolean, chips: boolean, value: any }>) => html`
    <style>
        wcs-select{
            width: 400px;
        }
    </style>
    <div style="min-height: 200px">
        <wcs-form-field>
            <wcs-label>Choose an option</wcs-label>
            <wcs-select id="theselect"
                        placeholder="My placeholder"
                        value="${args.value}"
                        ?multiple="${args.multiple}"
                        ?chips="${args.chips}" name="The select">
                <wcs-select-option value="1"
                                   ?disabled="${args.disabled}"
                                   ?selected="${args.selected}"
                                   chip-color="${args.chipColor ?? nothing}"
                                   chip-background-color="${args.chipBackgroundColor ?? nothing}">One</wcs-select-option>
                <wcs-select-option value="2"
                                   ?selected="${args.selected}"
                                   chip-color="${args.chipColor ?? nothing}"
                                   chip-background-color="${args.chipBackgroundColor ?? nothing}">Two</wcs-select-option>
                <wcs-select-option value="3"
                                   ?selected="${args.selected}"
                                   chip-color="${args.chipColor ?? nothing}"
                                   chip-background-color="${args.chipBackgroundColor ?? nothing}">Three</wcs-select-option>
            </wcs-select>
        </wcs-form-field>
    </div>
`;

/**
 * **Default option example**  
 * A `wcs-select-option` should always be a child of a `wcs-select` to display properly.
 */
export const Default: StoryObj = {
    render: (args, context) => Template(args, context),
    args: {
        disabled: false,
        selected: false,
    }
};

/**
 * A `wcs-select-option` can be `disabled` to prevent the user from selecting it.
 */
export const Disabled: StoryObj = {
    render: (args, context) => Template(args, context),
    args: {
        ...Default.args,
        disabled: true
    }
    
}

/**
 * **Custom chip appearance**  
 * `chip-background-color` and `chip-color` attributes can be used to customize the appearance of the chips.  
 * Can be any valid CSS variable or custom value. 
 */
export const CustomChip: StoryObj = {
    render: (args, context) => Template(args, context),
    args: {
        ...Default.args,
        multiple: true,
        chips: true,
        chipColor: 'var(--wcs-black)',
        chipBackgroundColor: 'var(--wcs-green)'
    }
}