import { Meta, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import {
    EditableFieldType,
    FormatFn,
    ValidateFn,
    WcsEditableFieldSize
} from '../../../src/components/editable-field/editable-field-interface';
import { ifDefined } from 'lit-html/directives/if-defined.js';
// @ts-ignore
import { withActions } from '@storybook/addon-actions/decorator';
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
        document.addEventListener("DOMContentLoaded", () => {
            // @ts-ignore
            document.querySelector('#editable-field-ex-2').addEventListener("wcsChange", (e) => {
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
