import { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';

const meta: Meta = {
    title: 'Components/Select',
    component: 'wcs-select',
    argTypes: getComponentArgs('wcs-select')
};
export default meta;

/**
 * It is strongly recommended to add a width size to the select.
 *
 * ```css
 * wcs-select {
 *     width: 400px;
 * }
 * ```
 */
export const Default: StoryObj = {
    render: (args) => html`
        <style>
            wcs-select{
                width: 400px;
            }
        </style>
        <div style="min-height: 200px">
            <wcs-form-field>
                <wcs-label>Choose an option</wcs-label>
                <wcs-select placeholder="${args.placeholder ?? nothing}" id="theselect" value="${args.value ?? nothing}"
                            ?disabled="${args.disabled}" ?multiple="${args.multiple}" ?chips="${args.chips}" size=${args.size ?? nothing} name="${args.name ?? nothing}">
                    <wcs-select-option value="1" chip-background-color="var(--wcs-pink)">One</wcs-select-option>
                    <wcs-select-option value="2" chip-background-color="var(--wcs-yellow)" chip-color="var(--wcs-black)">Two</wcs-select-option>
                    <wcs-select-option value="3" chip-background-color="var(--wcs-red)">Three</wcs-select-option>
                </wcs-select>
            </wcs-form-field>
        </div>
    `,
    args: {
        value: "",
        placeholder: 'My placeholder',
        disabled: false,
        multiple: false,
        chips: false,
        size: 'm',
        name: "The select"
    }
};

/**
 * Change the `wcs-select` size by setting this property. The available sizes are "l" (large) and "m" (medium).
 */
export const Sizes: StoryObj = {
    render: () => html`
        <div style="display: flex; gap: var(--wcs-base-margin); min-height: 200px">
            <wcs-select placeholder="Select L" id="theselect-l" size="l" style="width: 200px;">
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
            <wcs-select placeholder="Select M (default)" id="theselect-m" size="m" style="width: 200px;">
                <wcs-select-option value="1">One</wcs-select-option>
                <wcs-select-option value="2">Two</wcs-select-option>
                <wcs-select-option value="3">Three</wcs-select-option>
            </wcs-select>
        </div>
    `
};

/**
 * `wcs-select` can be disabled by setting the `disabled` property to `true`.  
 * It will prevent the user from interacting with the component.
 */
export const Disabled: StoryObj = {
    ...Default,
    args: {
        ...Default.args,
        disabled: true
    }
}

/**
 * Setting the `value` property to one of the `wcs-select-option` value will select it by default.
 */
export const OneOptionSelected: StoryObj = {
    ...Default,
    args: {
        ...Default.args,
        value: "1",
        placeholder: 'My option is already selected',
        disabled: false,
        multiple: false,
        chips: false,
        size: 'm'
    }
};

/**
 * Enable this mode to allow the user to select multiple options.
 */
export const MultipleMode: StoryObj = {
    ...Default,
    args: {
        value: '',
        placeholder: 'I have multiple mode',
        disabled: false,
        multiple: true,
        chips: false,
        size: 'm'
    }
};

/**
 * Enable this mode with `multiple` to allow the user to select multiple options and display them as chips.  
 * 💡 `chip-background-color` and `chip-color` properties on `wcs-select-option` can be used to customize the appearance
 * of the chips.
 */
export const MultipleAndChipsMode: StoryObj = {
    ...Default,
    args: {
        value: '',
        placeholder: 'I have multiple and chips mode',
        disabled: false,
        multiple: true,
        chips: true,
        size: 'm'
    }
};

/**
 * A `wcs-select-option` can be `disabled` to prevent the user from selecting it.
 */
export const OneOptionDisabled: StoryObj = {
    render: (args) => html`
    <style>
        wcs-select {
            width: 400px;
        }
    </style>
    <div style="min-height: 200px">
        <wcs-form-field>
            <wcs-label>Select with one option disabled</wcs-label>
            <wcs-select placeholder="${args.placeholder}" id="select-with-disabled-option" value="${args.value}"
                        ?disabled="${args.disabled}" ?multiple="${args.multiple}" ?chips="${args.chips}">
                <wcs-select-option value="1"> One</wcs-select-option>
                <wcs-select-option value="2" disabled>Two</wcs-select-option>
                <wcs-select-option value="3"> Three</wcs-select-option>
            </wcs-select>
        </wcs-form-field>
    </div>
    `,
    args: {
        value: '',
        placeholder: 'One of my options is disabled',
        disabled: false,
        multiple: false,
        chips: false
    }
}

/**
 * **How to handle special cases**  
 * If you have a special feature to implement, the best UX practice is to let the user know what is wrong and why,
 * rather than just disabling some features of the page without any explanation. You can use a
 * [wcs-form-field](.?path=/docs/components-form-field--documentation) with a hint and an error message to do so.
 * If the rule is not too complex, you can use a hint to explain it.  
 *   
 * In this example, we want the user to select only 2 stations, and these stations must be in the same region.  
 * When the select blur or changes, we handle the error and toggle the `is-error` attribute of the `wcs-form-field`.
 */
export const SpecialCases: StoryObj = {
    render: (args) => html`
    <style>
    .error-indicator {
        border: solid 1px red;
        border-radius: var(--wcs-border-radius);
    }
    </style>
    <div style="min-height: 450px">
        <wcs-form-field ?is-error=${args.isError} id="form-field">
            <wcs-label>Favorite railway stations</wcs-label>
            <wcs-select @wcsChange=${v => handleChange(v)} placeholder="Select stations"
                        id="select-special-cases"
                        multiple="true"
                        chips="true">
                <wcs-select-option value="lyo-aura">Lyon Part-Dieu</wcs-select-option>
                <wcs-select-option value="gre-aura">Grenoble</wcs-select-option>
                <wcs-select-option value="val-aura">Valence TGV</wcs-select-option>
                <wcs-select-option value="pmp-idf">Paris Montparnasse</wcs-select-option>
                <wcs-select-option value="pge-idf">Paris Gare de L'Est</wcs-select-option>
                <wcs-select-option value="tou-occi">Toulouse Matabiau</wcs-select-option>
                <wcs-select-option value="mpl-occi">Montpellier Saint-Roch</wcs-select-option>
                <wcs-select-option value="bdx-aqui">Bordeaux Saint-Jean</wcs-select-option>
                <wcs-select-option value="poi-aqui">Poitiers</wcs-select-option>
                <wcs-select-option value="nan-loir">Nantes</wcs-select-option>
                <wcs-select-option value="ang-loir">Angers</wcs-select-option>
                <wcs-select-option value="qui-bzh">Brest</wcs-select-option>
                <wcs-select-option value="qui-bzh">Quimper</wcs-select-option>
            </wcs-select>
            <wcs-hint>Max: 2 choices. Chosen stations must be in the same region.</wcs-hint>
            <wcs-error id="special-error">⚠️</wcs-error>
        </wcs-form-field>
    </div>
    `,
  args: {
    ...Default.args,
    isError: false
  }
    
}

function handleChange(v: any) {
  const regions = v.target.value.map((value: any) => value.split("-")[1]);
  
  let isError = false;
  let isErrorMultipleRegion = new Set(regions).size > 1;
  let isErrorTooManyStations = v.target.value.length > 2;
  
  isError = isErrorMultipleRegion || isErrorTooManyStations;
  
  document.querySelector('#form-field').setAttribute('is-error', isError ? 'true' : 'false');
  document.querySelector("#select-special-cases").classList.toggle('error-indicator', isError);
  
  if (isError) {
      document.querySelector('#special-error').innerHTML = "⚠️" +
          (isErrorMultipleRegion ? " Chosen stations must be in the same region. " : "") +
          (isErrorTooManyStations ? " You can only select 2 stations. " : "");
  }
}
