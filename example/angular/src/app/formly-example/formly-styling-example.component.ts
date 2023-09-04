import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

type Option = { value: string, label: string, disabled: boolean, class: string };

@Component({
  selector: 'app-formly-styling-example',
  template: `
    <h2>Formly styling examples</h2>
    <form [formGroup]="form">
      <formly-form class="formly" [form]="form" [fields]="fields" [model]="model"></formly-form>
    </form>
  `,
  styles: []
})
export class FormlyStylingExampleComponent {
  form = new FormGroup({});
  private options: Option[] = [
    {
      value: '1',
      label: 'Première valeur',
      disabled: false,
      class: 'value1'
    }, {
      value: '2',
      label: 'Deuxième valeur',
      disabled: false,
      class: 'value2'
    }, {
      value: '3',
      label: 'Troisième valeur',
      disabled: false,
      class: 'value3'
    }
  ];
  model = {
    fieldInput: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      id: 'fieldInput',
      key: 'fieldInput',
      type: 'input',
      props: {
        label: 'Champ de type input',
        placeholder: 'Placeholder',
        description: 'Ceci est un message d\'aide très lisible',
        styles: {
          label: {color: 'violet'},
          input: {border: 'solid 4px aqua'},
          error: {textDecoration: 'underline'},
          hint: {
            fontWeight: 'bold'
          }
        },
        required: true
      }
    },
    {
      id: 'fieldRadioHorizontal',
      key: 'fieldRadioHorizontal',
      type: 'radio',
      props: {
        attributes: {
          mode: 'horizontal'
        },
        styles: {
          input: {width: '50%'}
        },
        label: 'Champ de type radio',
        options: this.options
      }
    },
  ];
}
