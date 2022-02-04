import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

type Option = { value: string, label: string, disabled: boolean};

@Component({
  selector: 'app-formly-example',
  template: `
    <h2>Formly</h2>
    <wcs-switch [checked]="disabled" (wcsChange)="toggleDisabled()">Disabled</wcs-switch>
    <wcs-switch [checked]="required" (wcsChange)="toggleRequired()">Required</wcs-switch>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <formly-form class="formly" [form]="form" [fields]="fields" [model]="model"></formly-form>
      <wcs-button type="submit">
        Submit
      </wcs-button>
    </form>
  `,
  styles: [`
    form {
      width: 500px;
    }

    .formly {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
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

  disabled = false;
  required = false;
  form = new FormGroup({});
  model = {
    fieldInput: '',
    fieldCheckbox: false,
    fieldRadio: null,
    fieldRadioAsynchronous: null,
    fieldSelect: null,
    fieldSelectAsynchronous: null,
    fieldSwitch: true,
    fieldTextArea: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      id: 'fieldInput',
      key: 'fieldInput',
      type: 'input',
      templateOptions: {
        label: 'Champ de type input',
        prefixLabel: 'prefix',
        suffixLabel: 'suffix',
        placeholder: 'Placeholder'
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    },
    {
      id: 'fieldCheckbox',
      key: 'fieldCheckbox',
      type: 'checkbox',
      templateOptions: {
        label: 'Champ de type checkbox'
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    },
    {
      id: 'fieldRadio',
      key: 'fieldRadio',
      type: 'radio',
      templateOptions: {
        label: 'Champ de type radio',
        options: this.options
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    },
    {
      id: 'fieldRadioHorizontal',
      key: 'fieldRadioHorizontal',
      type: 'radio',
      templateOptions: {
        attributes: {
          mode: 'horizontal'
        },
        label: 'Champ de type radio',
        options: this.options
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    },
    {
      id: 'fieldRadioAsynchronous',
      key: 'fieldRadioAsynchronous',
      type: 'radio',
      templateOptions: {
        label: 'Champ de type radio (avec récupération asynchrone des options)',
        options: this.asynchronousOptionsSubject
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    },
    {
      id: 'fieldSelect',
      key: 'fieldSelect',
      type: 'select',
      templateOptions: {
        label: 'Champ de type select',
        options: this.options
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    },
    {
      id: 'fieldSelectAsynchronous',
      key: 'fieldSelectAsynchronous',
      type: 'select',
      templateOptions: {
        label: 'Champ de type select (avec récupération asynchrone des options)',
        options: this.asynchronousOptionsSubject
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    },
    {
      id: 'fieldSwitch',
      key: 'fieldSwitch',
      type: 'switch',
      templateOptions: {
        label: 'Champ de type switch'
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    },
    {
      id: 'fieldInputText',
      key: 'fieldInputText',
      type: 'input',
      templateOptions: {
        label: 'Champ de type input',
        placeholder: 'L\'input',
        tooltip: 'Une aide dans un tooltip'
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    },
    {
      id: 'fieldTextArea',
      key: 'fieldTextArea',
      type: 'textarea',
      templateOptions: {
        label: 'Champ de type textarea',
        placeholder: 'Placeholder'
      },
      expressionProperties: {
        'templateOptions.disabled': () => this.disabled,
        'templateOptions.required': () => this.required
      }
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
    setTimeout(() => this.asynchronousOptionsSubject.next(this.options), 3000);
  }

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  toggleRequired(): void {
    this.required = !this.required;
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
