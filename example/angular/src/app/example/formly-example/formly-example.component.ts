import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

type Option = { value: string, label: string, disabled: boolean };

@Component({
  selector: 'app-formly-example',
  template: `
    <h2>Formly</h2>
    <wcs-switch [checked]="model.disabled" (wcsChange)="toggleDisabled()">Disabled</wcs-switch>
    <wcs-switch [checked]="model.required" (wcsChange)="toggleRequired()">Required</wcs-switch>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <formly-form class="formly" [form]="form" [fields]="fields" [model]="model"></formly-form>
      <wcs-button type="submit">
        Submit
      </wcs-button>
    </form>
    <h2>Input examples</h2>
    <app-formly-input-examples></app-formly-input-examples>
  `,
  styles: [`
    form {
      width: 500px;
    }
  `]
})
export class FormlyExampleComponent implements OnInit {

  private options: Option[] = [
    {
      value: '1',
      label: 'Première valeur',
      disabled: false
    }, {
      value: '2',
      label: 'Deuxième valeur',
      disabled: true
    }, {
      value: '3',
      label: 'Troisième valeur',
      disabled: false
    }
  ];
  private asynchronousOptionsSubject = new Subject<Option[]>();

  form = new FormGroup({});
  model = {
    fieldInput: '',
    fieldCheckbox: false,
    fieldRadio: null,
    fieldRadioAsynchronous: null,
    fieldSelect: null,
    fieldSelectAsynchronous: null,
    fieldSwitch: true,
    fieldTextArea: '',
    required: false,
    disabled: false
  };
  fields: FormlyFieldConfig[] = [
    // first, we create a group to add a gap between fields (with a global css class)
    {
      fieldGroupClassName: 'formly-group-flex-col-with-gap',
      fieldGroup: [
        // we declare each form fields in the group
        {
          id: 'fieldInput',
          key: 'fieldInput',
          type: 'input',
          props: {
            label: 'Champ de type input',
            prefixLabel: 'prefix',
            suffixLabel: 'suffix',
            placeholder: 'Placeholder'
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },
        {
          id: 'fieldCheckbox',
          key: 'fieldCheckbox',
          type: 'checkbox',
          props: {
            label: 'Champ de type checkbox'
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },
        {
          id: 'fieldRadio',
          key: 'fieldRadio',
          type: 'radio',
          name: 'choice1',
          props: {
            label: 'Champ de type radio',
            options: this.options
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },
        {
          id: 'fieldRadioHorizontal',
          key: 'fieldRadioHorizontal',
          type: 'radio',
          name: 'choice2',
          props: {
            attributes: {
              mode: 'horizontal'
            },
            label: 'Champ de type radio',
            options: this.options,
            styles: {
              input: {width: '100%'},
            }
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },
        {
          id: 'fieldRadioOption',
          key: 'fieldRadioOption',
          type: 'radio',
          name: 'choice3',
          props: {
            attributes: {
              mode: 'option'
            },
            label: 'Champ de type radio option',
            options: this.options
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },
        {
          id: 'fieldSelect',
          key: 'fieldSelect',
          type: 'select',
          props: {
            label: 'Champ de type select',
            placeholder: 'Choisissez',
            options: this.options
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },
        {
          id: 'fieldSelectAsynchronous',
          key: 'fieldSelectAsynchronous',
          type: 'select',
          props: {
            label: 'Champ de type select (avec récupération asynchrone des options)',
            placeholder: 'Choisissez',
            options: this.asynchronousOptionsSubject
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },
        {
          id: 'fieldSwitch',
          key: 'fieldSwitch',
          type: 'switch',
          props: {
            label: 'Champ de type switch'
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },
        {
          id: 'fieldInputText',
          key: 'fieldInputText',
          type: 'input',
          props: {
            required: true,
            label: 'Champ de type input',
            placeholder: 'L\'input',
            tooltip: {
              content: 'Contenu du tooltip...',
              color: 'var(--wcs-semantic-color-text-inverse)',
              icon: 'help',
              size: 'm',
            }
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },
        {
          id: 'fieldInputTextWithDynamicTooltip',
          key: 'fieldInputTextWithDynamicTooltip',
          type: 'input',
          props: {
            required: true,
            label: 'Champ de type input avec tooltip interactif, qui change dynamiquement',
            placeholder: 'L\'input',
            tooltip: {
              interactive: true,
              color: 'var(--wcs-semantic-color-text-inverse)',
              icon: 'help',
              size: 'm',
            }
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required',
            'props.tooltip.dynamicContent': () => {
              return this.form.get('fieldInputTextWithDynamicTooltip')?.value;
            }
          }
        },
        {
          id: 'fieldTextArea',
          key: 'fieldTextArea',
          type: 'textarea',
          props: {
            label: 'Champ de type textarea',
            placeholder: 'Placeholder'
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        },

        {
          id: 'fieldRadioAsynchronous',
          key: 'fieldRadioAsynchronous',
          type: 'radio',
          props: {
            label: 'Champ de type radio (avec récupération asynchrone des options)',
            options: this.asynchronousOptionsSubject
          },
          expressions: {
            'props.disabled': 'model.disabled',
            'props.required': 'model.required'
          }
        }
      ]
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => this.asynchronousOptionsSubject.next(this.options), 3000);
  }

  toggleDisabled(): void {
    this.model = {
      ...this.model,
      disabled: !this.model.disabled
    };
  }

  toggleRequired(): void {
    this.model = {
      ...this.model,
      required: !this.model.required
    };
  }

  onSubmit(): void {
    console.log('fieldInput', this.form.get('fieldInput')?.value);
    console.log('fieldCheckbox', this.form.get('fieldCheckbox')?.value);
    console.log('fieldRadio', this.form.get('fieldRadio')?.value);
    console.log('fieldRadioAsynchronous', this.form.get('fieldRadioAsynchronous')?.value);
    console.log('fieldSelect', this.form.get('fieldSelect')?.value);
    console.log('fieldSelectAsynchronous', this.form.get('fieldSelectAsynchronous')?.value);
    console.log('fieldSwitch', this.form.get('fieldSwitch')?.value);
    console.log('fieldTextArea', this.form.get('fieldTextArea')?.value);
  }
}
