import { Meta, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit-html';
import {
    EditableFieldType,
    FormatFn,
    ValidateFn,
    WcsEditableFieldSize
} from '../../../src/components/editable-field/editable-field-interface';
import { ifDefined } from 'lit-html/directives/if-defined.js';
// @ts-ignore
import { withActions } from 'storybook/actions/decorator';
import { getComponentArgs } from '../../utils/args-generation';


const meta: Meta = {
    title: 'Components/Editable-field',
    component: 'wcs-editable-field',
    argTypes: getComponentArgs('wcs-editable-field'),
    parameters: {
        actions: {
            handles: [
                'wcsChange',
            ]
        }
    },
    decorators: [withActions]
};
export default meta;

const trains = new Map([
    ['train-8391', { name: 'TGV INOUI 8391' }],
    ['train-84621', { name: 'TER 84621' }],
    ['train-7823', { name: 'OUIGO 7823' }]
]);

function handleChange($event: any, id: string) {
    setTimeout(() => {
        // @ts-ignore
        document.getElementById(id).value = $event.detail?.newValue;
    }, 1500)
}

const Template: StoryFn<Partial<
    {
        id: string,
        errorMsg: string,
        formatFn: FormatFn<any>,
        label: string,
        readonly: boolean,
        type: EditableFieldType,
        validateFn: ValidateFn<any>,
        size: WcsEditableFieldSize,
        value: any
    }>> = (args) => {
    
    return html`
        <wcs-editable-field error-msg=${args.errorMsg}
                            @wcsChange=${(e) => handleChange(e, args.id)}
                            .validateFn=${ifDefined(args.validateFn)}
                            .formatFn=${ifDefined(args.formatFn)}
                            label=${args.label}
                            ?readonly=${args.readonly}
                            type=${args.type}
                            value=${args.value}
                            size=${args.size}
                            id=${args.id}>
            ${args.type === 'input' ? html`<wcs-input id="test" size=${args.size} @wcsChange=${(e) => e.stopImmediatePropagation()}></wcs-input>` : ''}
            ${args.type === 'textarea' ? html`<wcs-textarea @wcsChange=${(e) => e.stopImmediatePropagation()}></wcs-textarea>` : ''}
            ${args.type === 'select' ? html`
                <wcs-select placeholder="Le select" size=${args.size} style="width: 100%">
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                </wcs-select>
            ` : ''}
`;
}

/**
 * The following stories are set to have an automatic `timeout` set to 1500ms to simulate the response of a mock server
 */
export const Default: StoryObj = {
    render: (args) => Template({...args, id: 'editable-field-ex-1'}, this),
    args: {
        validateFn: (value) => value.includes('SNCF'),
        formatFn: (value) => 'Formatted : ' + value,
        label: 'My input',
        value: 'Initial value',
        errorMsg: 'SNCF must appear in the value',
        type: 'input'
    }
}

/**
 * You can store the `successHandler` and `errorHandler` methods coming from the `wcsChange` event and call it whenever you need.
 * 
 * <details>
 *     <summary>Example</summary>
 *     
 *     ```js
 *     let successHandler = () => {};
 *     let errorHandler = () => {};
 *     
 *     myEditableField.addEventListener("wcsChange", (e) => {
 *         successHandler = e.detail.successHandler; 
 *         errorHandler = e.detail.errorHandler;
 *     });
 *      
 *     callSuccess() {
 *         // Other instructions...
 *         successHandler();
 *     }
 *      
 *     callError() {
 *         // Other instructions...
 *         errorHandler();
 *     }
 *     ```
 * </details>
 */
export const UsingCallbacks: StoryObj = {
    render: (args) => {
        
        let successHandler = () => {};
        let errorHandler = () => {};
        
        // @ts-ignore
        document?.addEventListener("DOMContentLoaded", () => {
            // @ts-ignore
            document.querySelector('#editable-field-ex-2')?.addEventListener("wcsChange", (e) => {
                successHandler = e.detail.successHandler; 
                errorHandler = e.detail.errorHandler;
            });
        });
        
        return html`
            ${Template({...args, id: 'editable-field-ex-2'}, this)}
            <div style="display: inline-flex; gap: 4px; margin-top: 8px">
                <wcs-button size="s" class="wcs-success" @click=${() => successHandler()}>successHandler</wcs-button>
                <wcs-button size="s" class="wcs-danger" @click=${() => errorHandler()}>errorHandler</wcs-button>
            </div>
        `;
    },
    args: {
        ...Default.args,
        validateFn: undefined,
        formatFn: undefined,
    }
}

/**
 * You can use the `type="textarea"` with a wrapped `wcs-textarea` inside
 */
export const Textarea: StoryObj = {
    render: (args) => Template({...args, id: 'editable-field-ex-3'}, this),
    args: {
        ...Default.args,
        validateFn: undefined,
        formatFn: undefined,
        label: 'My textarea',
        type: 'textarea'
    }

}

/**
 * You can use the `type="select"` with a wrapped `wcs-select` inside
 */
export const Select: StoryObj = {
    render: (args) => html`
        <style>
    #editable-field-ex-4 {
        height: 200px;
    }
</style>
    ${Template({...args, id: "editable-field-ex-4"}, this)}
    `,
    args: {
        ...Default.args,
        validateFn: undefined,
        formatFn: undefined,
        label: 'My select',
        value: '1',
        type: 'select'
    }
}

/**
 * `formatFn` allows you to format the value displayed in the input when the field is not being edited.
 * 
 * In this example, we receive a train id as a value and we use the `formatFn` to display customized displayText in the input based on the argument passed into the function.
 * 
 * Use it if :
 * - you want to display a value into specific format that differs that the normal display text, like the displayText of a select option for example
 * - you want to provide additional context or details about the selected value
 */
export const WithFormatFn: StoryObj = {
    args: {
        ...Default.args,
        validateFn: undefined,
        label: 'Sélectionner un train',
        value: 'train-8391',
        type: 'select',
        formatFn: (value) => {
            const train = trains.get(value);
            return train ? `Train ${train.name}` : value;
        }
    },
    render: (args) => html`
        <style>
            #editable-field-ex-6 {
                height: 200px;
            }
        </style>
        <wcs-editable-field error-msg=${args.errorMsg}
                            @wcsChange=${(e) => handleChange(e, 'editable-field-ex-6')}
                            .validateFn=${ifDefined(args.validateFn)}
                            .formatFn=${ifDefined(args.formatFn)}
                            label=${args.label}
                            ?readonly=${args.readonly}
                            type=${args.type}
                            value=${args.value}
                            size=${args.size}
                            id="editable-field-ex-6">
            <wcs-select placeholder="Choisir un train" size=${args.size} style="width: 100%">
                <wcs-select-option value="train-8391">TGV INOUI 8391</wcs-select-option>
                <wcs-select-option value="train-84621">TER 84621</wcs-select-option>
                <wcs-select-option value="train-7823">OUIGO 7823</wcs-select-option>
            </wcs-select>
        </wcs-editable-field>
    `
}

/**
 * The `readonly` boolean property prevents will prevent the user from interacting with the component.
 */
export const Readonly: StoryObj = {
    render: (args) => Template({...args, id: 'editable-field-ex-5'}, this),
    args: {
        ...Default.args,
        validateFn: undefined,
        formatFn: undefined,
        label: 'My input (readonly)',
        readonly: true,
    }
}
