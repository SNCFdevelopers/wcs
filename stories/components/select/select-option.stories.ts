import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';
import { ifDefined } from "lit-html/directives/if-defined.js";

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
            <wcs-select id="select1"
                        placeholder="My placeholder"
                        value="${ifDefined(args.value)}"
                        ?multiple="${args.multiple}"
                        ?chips="${args.chips}" name="The select">
                <wcs-select-option value="1"
                                   ?disabled="${args.disabled}"
                                   ?selected="${args.selected}"
                                   chip-color="${ifDefined(args.chipColor)}"
                                   chip-background-color="${ifDefined(args.chipBackgroundColor)}">One</wcs-select-option>
                <wcs-select-option value="2"
                                   ?selected="${args.selected}"
                                   chip-color="${ifDefined(args.chipColor)}"
                                   chip-background-color="${ifDefined(args.chipBackgroundColor)}">Two</wcs-select-option>
                <wcs-select-option value="3"
                                   ?selected="${args.selected}"
                                   chip-color="${ifDefined(args.chipColor)}"
                                   chip-background-color="${ifDefined(args.chipBackgroundColor)}">Three</wcs-select-option>
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


/**
 * It is a bad UX practice to have a text that is too long to be displayed in the select.  
 * However, if you do not have the choice :
 * - You may add a `title` HTML attribute to show on hover what is the full text
 * - For better UX, you can add these properties on your text to show that the text is overflowing :
 *
 * ```css
 * display: block;
 * overflow: hidden;
 * white-space: nowrap;
 * text-overflow: ellipsis;
 * ```
 * 
 * - If you are on mobile, use a [native-select](.?path=/docs/components-native-select--documentation) instead.
 * The overflow will be natively handled by your device. 
 */
export const LargeTexts = {
    render: (args) => html`
        <style>
            wcs-select{
                width: 400px;
            }
            .overflowing {
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        </style>
        <div style="min-height: 200px">
            <wcs-form-field>
            <wcs-label>Choose an option</wcs-label>
            <wcs-select id="select2"
                        placeholder="My placeholder"
                        value="${ifDefined(args.value)}"
                        ?multiple="${args.multiple}"
                        multiple
                        ?chips="${args.chips}" name="The select">
                <wcs-select-option value="1"
                                   title="This is a long option that will exceed the container width and overflow"
                                   ?disabled="${args.disabled}"
                                   ?selected="${args.selected}"
                                   chip-color="${ifDefined(args.chipColor)}"
                                   chip-background-color="${ifDefined(args.chipBackgroundColor)}">
                    <span class="overflowing">
                        This is a long option that will exceed the container width and overflow
                    </span>
                </wcs-select-option>
                <wcs-select-option value="2"
                                   ?selected="${args.selected}"
                                   chip-color="${ifDefined(args.chipColor)}"
                                   chip-background-color="${ifDefined(args.chipBackgroundColor)}">Two</wcs-select-option>
                <wcs-select-option value="3"
                                   ?selected="${args.selected}"
                                   chip-color="${ifDefined(args.chipColor)}"
                                   chip-background-color="${ifDefined(args.chipBackgroundColor)}">Three</wcs-select-option>
            </wcs-select>
        </wcs-form-field>
        </div>
    `,
    args: {
        ...Default.args,
    }
}
