import { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit-html';
import { getComponentArgs } from '../../utils/args-generation';
import { withActions } from 'storybook/actions/decorator';
import { sampleDepartments } from "./select-sample-data";

const meta: Meta = {
    title: 'Components/Select',
    component: 'wcs-select',
    argTypes: {
        ...getComponentArgs('wcs-select'),
        departments: {
            description: 'Sample options for demo'
        },
    },
    parameters: {
        actions: {
            handles: [
                'wcsChange',
                'wcsFocus',
                'wcsBlur',
                'wcsFilterChange',
                'wcsSelectOptionClick',
            ]
        }
    },
    decorators: [withActions]
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
                <wcs-select placeholder="${args.placeholder ?? nothing}" 
                            id="theselect" value="${args.value ?? nothing}"
                            ?disabled="${args.disabled}" 
                            ?multiple="${args.multiple}" 
                            ?chips="${args.chips}" 
                            size=${args.size ?? nothing}
                            ?autocomplete=${args.autocomplete}
                            ?server-mode=${args.serverMode}
                            .filterFn=${args.filterFn ?? nothing}}
                            name="${args.name ?? nothing}">
                    <wcs-select-option value="1">One</wcs-select-option>
                    <wcs-select-option value="2">Two</wcs-select-option>
                    <wcs-select-option value="3">Three</wcs-select-option>
                    <wcs-select-option value="4">Four</wcs-select-option>
                    <wcs-select-option value="5">Five</wcs-select-option>
                    <wcs-select-option value="6">Six</wcs-select-option>
                    <wcs-select-option value="7">Seven</wcs-select-option>
                    <wcs-select-option value="8">Eight</wcs-select-option>
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
        <div style="display: flex; gap: var(--wcs-semantic-spacing-base); min-height: 200px">
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
 * of the chips : [Select Option doc](.?path=/docs/components-select-subcomponents-select-option--documentation).
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
 * **Filtering your results**  
 * Add the **`autocomplete`** boolean attribute to your `wcs-select` to **filter your results**.
 * 
 * You can customize the default filtering function with the `filterFn` property.  
 * If not specified, uses `WcsDefaultSelectFilterFn`
 * [(see source)](https://gitlab.com/SNCF/wcs/-/blob/develop/src/components/select/select-interface.ts?ref_type=heads)
 */
export const Autocomplete: StoryObj = {
    render: (args) => {
        return html`
            <style>
                wcs-select {
                    width: 400px;
                }
            </style>
    <div style="min-height: 450px">
        <wcs-form-field>
            <wcs-label>Choose a French department</wcs-label>
            <wcs-select id="${args.id}"
                        @keydown="${event => {
            // FIXME : hotfix to avoid event bubbling to storybook keyboard shortcuts (A, F, D, etc...)
            // Will be fixed in Storybook v8 : https://github.com/storybookjs/storybook/pull/25625
            event.stopPropagation();
        }}"
                        name="${args.name ?? nothing}"
                        size="${args.size ?? nothing}"
                        value="${args.value ?? nothing}"
                        placeholder="${args.placeholder ?? nothing}"
                        .filterFn="${args.filterFn ?? nothing}"
                        @wcsFilterChange="${args.serverMode ? (event) => handleFilterChangeServerMode(event) : nothing}"
                        ?autocomplete="${args.autocomplete}"
                        ?server-mode="${args.serverMode}"
                        ?disabled="${args.disabled}"
                        ?multiple="${args.multiple}"
                        ?chips="${args.chips}">
                ${args.departments.map(({value, hidden, disabled, name }) =>
                    html`<wcs-select-option value="${value}" .hidden="${hidden}" .disabled="${disabled}">${name}</wcs-select-option>
                `)}
            </wcs-select>
        </wcs-form-field>
    </div>
    `},
    args: {
        ...Default.args,
        id: 'select-autocomplete',
        autocomplete: true,
        serverMode: false,
        placeholder: 'Choose a French department',
        departments: sampleDepartments,
    }
};

/**
 * **Autocomplete using a server**  
 * If you want to filter the options with your backend server at each keystroke, you can set the select autocomplete to `server-mode`.
 * 
 * > **Angular example :**  
 * > 
 * > 1. Declare a select in your template with autocomplete and server-mode
 * > 2. Map your options with `ngFor`
 * > 3. Listen to the `wcsFilterChange` event (optional: use a debounce) to update the options dynamically (with your backend filtering the results)
 * 
 * ```ts
 *  <wcs-select placeholder="Choose a transport"
 *              (wcsFilterChange)="onFilterChange($event)"
 *              autocomplete serverMode>
 *      <wcs-select-option *ngFor="let opt of myOptions" [value]="opt.value">{{ opt.label }}</wcs-select-option>
 *  </wcs-select>
 *         
 *  // ...
 *  
 *  private mockOptions = [
 *    { label: 'TGV', value: 'tgv' },
 *    { label: 'TER', value: 'ter' },
 *    { label: 'RER', value: 'rer' },
 *    { label: 'Intercités', value: 'intercites' },
 *  ]
 *
 *  public myOptions = this.mockOptions;
 *
 *  onFilterChange($event: CustomEvent<SelectFilterChangeEventDetail>) {
 *    const filter = $event.detail.value;
 *    // Simulate a call to the backend server that should return me a filtered list of options
 *    this.myOptions = this.mockOptions.filter(opt => opt.value.toLowerCase().startsWith(filter.toLowerCase()));
 *  }
 * ```
 * 
 * > 💡 **It is advised to fetch some default option from your server** (e.g : first or relevant 10 results, favorite results...).  
 * > If you don't want any default value in your autocomplete select with server mode, you can add a empty div in the options slot.  
 * > This will ensure the "No result" slot will be shown after your first input :
 * >
 * > ```html
 * > <div slot="options"></div>
 * > ```
 */
export const AutocompleteWithServerMode: StoryObj = {
    render: (args) => html`
        ${Autocomplete.render(args, this)}
    `,
    args: {
        ...Autocomplete.args,
        id: 'select-autocomplete-server-mode',
        serverMode: true,
        departments: sampleDepartments.slice(0, 10)
    }
}

function handleFilterChangeServerMode(ev: any) {
    if ((window as any).__wcsSelectTimeout) {
        clearTimeout((window as any).__wcsSelectTimeout);
    }
    (window as any).__wcsSelectTimeout = setTimeout(() => {
        // @ts-ignore
        Array.from(ev.target.children).forEach((option: HTMLWcsSelectOptionElement) => {
            option.remove();
        });
        const filterStr = ev.detail.value;
        sampleDepartments.forEach((department) => {
            if (department.name.toLowerCase().startsWith(filterStr.toLowerCase())) {
                // @ts-ignore
                const optionToAppend = document.createElement('wcs-select-option');
                optionToAppend.textContent = department.name;
                optionToAppend.value = department.value;
                ev.target.appendChild(optionToAppend);
            }
        });
    }, 500);
}

/**
 * **Customize the "No result found" content**  
 * When your filter doesn't match any value in the select, a default slot is displayed saying "No result found".  
 * You can customize this slot with any content you want.  
 * 
 * (Type a random value in the input field to check it out)
 */
export const AutocompleteWithCustomSlot = {
    render: (args) => html`
    <style>
        .my-custom-container {
            display: flex;
            align-items: center;
            gap: var(--wcs-semantic-spacing-base);
        }
        wcs-select {
            width: 400px;
        }
    </style>
    <div style="min-height: 450px">
        <wcs-form-field>
            <wcs-label>Choose a French department</wcs-label>
            <wcs-select id="autocomplete-with-custom-slot"
                        @keydown="${event => {
                            // FIXME : hotfix to avoid event bubbling to storybook keyboard shortcuts (A, F, D, etc...)
                            // Will be fixed in Storybook v8 : https://github.com/storybookjs/storybook/pull/25625
                            event.stopPropagation();
                        }}"
                        name="${args.name ?? nothing}"
                        size="${args.size ?? nothing}"
                        value="${args.value ?? nothing}"
                        placeholder="${args.placeholder ?? nothing}"
                        .filterFn="${args.filterFn ?? nothing}"
                        ?autocomplete="${args.autocomplete}"
                        ?server-mode="${args.serverMode}"
                        ?disabled="${args.disabled}"
                        ?multiple="${args.multiple}"
                        ?chips="${args.chips}">
                ${args.departments.map(({value, name}) => html`<wcs-select-option value="${value}">${name}</wcs-select-option>
                `)}
                <div slot="filter-no-result" class="my-custom-container">
                    <span>Aucun résultat trouvé</span>
                    <wcs-mat-icon icon="sentiment_dissatisfied"></wcs-mat-icon>
                </div>
            </wcs-select>
        </wcs-form-field>
    </div>
    `,
    args: {
        ...Autocomplete.args
    }
}

/**
 * The autocomplete mode with `multiple`.
 */
export const AutocompleteMultiple = {
    render: (args) => Autocomplete.render(args, this),
    args: {
        ...Autocomplete.args,
        id: 'select-autocomplete-multiple',
        multiple: true,
    }
}

/**
 * The autocomplete mode also handles `multiple` and `chips` display.
 */
export const AutocompleteWithMultipleAndChipsMode = {
    render: (args) => Autocomplete.render(args, this),
    args: {
        ...Autocomplete.args,
        id: 'select-autocomplete-multiple-chips',
        multiple: true,
        chips: true
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
                <wcs-select-option value="bre-bzh">Brest</wcs-select-option>
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

/**
 * 
 * This story demonstrates how the component handles asynchronous options loading.
 * 
 * For example, you can load options from a server in server mode or not (need to manage the data model outside the select, for example if too many options). At the initialization of the select, you only know the current value of the select, and the options will be loaded later with their labels. To sum up:
 * - The select is initialized with a value
 * - The options are loaded asynchronously
 * - The select automatically updates its label when the options are loaded
 * 
 * Even if this is supported by the component, we recommend not using this UX pattern because it can be confusing for the user. It is better to use a skeleton loader or a loading spinner to indicate that the options are being loaded and displaying the select only when the options are fully loaded.
 * 
 * 💡 **To improve UX**, you can also add a default option with a label like "No options are available for now" to let the user know that the options are being loaded, and then replace it with the real options when they are loaded.
 * 
 * ```html
 * <wcs-select-option disabled value="no-options">No options are available for now ...</wcs-select-option>
 * ```
 * 
 * 
 * Note that the handling of asynchronous options is available in both server and non-server modes.
 * 
 */
export const AsynchronousOptions: StoryObj = {
    render: () => {
        const options = [
            { value: 'lyo-aura', label: 'Lyon Part-Dieu' },
            { value: 'gre-aura', label: 'Grenoble' },
            { value: 'val-aura', label: 'Valence TGV' },
            { value: 'pmp-idf', label: 'Paris Montparnasse' },
            { value: 'pge-idf', label: 'Paris Gare de L\'Est' },
            { value: 'tou-occi', label: 'Toulouse Matabiau' },
            { value: 'mpl-occi', label: 'Montpellier Saint-Roch' },
            { value: 'bdx-aqui', label: 'Bordeaux Saint-Jean' },
            { value: 'poi-aqui', label: 'Poitiers' },
            { value: 'nan-loir', label: 'Nantes' },
            { value: 'ang-loir', label: 'Angers' },
            { value: 'bre-bzh', label: 'Brest' },
            { value: 'qui-bzh', label: 'Quimper' }
        ];
        
        const loadOptions = () => {
            const select = document.querySelector('#select-asynchronous-options');
            setTimeout(() => {
                if(select) {
                    while (select.firstChild) {
                        select.firstChild.remove();
                    }
                }
                options.forEach(option => {
                    const selectOption = document.createElement('wcs-select-option');
                    selectOption.setAttribute('value', option.value);
                    selectOption.textContent = option.label;
                    select?.appendChild(selectOption);
                });
            }, 1000);
        };

        return html`
            <div style="min-height: 450px; display: flex; gap: 16px; flex-direction: column; width: 400px;">
                <wcs-button
                    mode="stroked"
                    size="s"
                    @click=${loadOptions}>
                    Load options
                </wcs-button>
                <wcs-select
                    placeholder="Select stations"
                    id="select-asynchronous-options"
                    value="lyo-aura"
                    server-mode>
                    <wcs-select-option disabled value="no-options">No options are available for now ...</wcs-select-option>
                </wcs-select>
            </div>
            <p>
            💡To improve UX, in this example and before the options are loaded, a default disabled <code>wcs-select-option</code> is displayed to inform the user that no options are available yet.
            </p>
            <p>
            You can replicate this pattern in your project while keeping in mind that it is important to provide feedback to the user during loading times and that displaying a select with no options can be confusing.
            </p>
        `;
    },
    args: {
        ...Default.args,
        isError: false
    }
};



function handleChange(v: any) {
  const regions = v.target.value.map((value: any) => value.split("-")[1]);
  
  let isError = false;
  const isErrorMultipleRegion = new Set(regions).size > 1;
  const isErrorTooManyStations = v.target.value.length > 2;
  
  isError = isErrorMultipleRegion || isErrorTooManyStations;
  
  // @ts-ignore
    document.querySelector('#form-field').setAttribute('is-error', isError ? 'true' : 'false');
  
  if (isError) {
      // @ts-ignore
      document.querySelector('#special-error').innerHTML = "⚠️" +
          (isErrorMultipleRegion ? " Chosen stations must be in the same region. " : "") +
          (isErrorTooManyStations ? " You can only select 2 stations. " : "");
  }
}
