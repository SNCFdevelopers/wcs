import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-counter-formly-passengers-example',
  template: `
    <h2>Avec Formly</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
      <wcs-button type="submit">Submit</wcs-button>
    </form>
    <pre>{{model | json}}</pre>
  `,
  styles: [`
      wcs-button {
          width: 130px;
          margin-top: var(--wcs-semantic-spacing-large);
      }
  `]
})
export class CounterFormlyPassengersExampleComponent implements AfterViewInit {

  form = new FormGroup({});
  model = { counter: 1 };

  counterField: FormlyFieldConfig = {
    key: 'counter',
    type: 'counter',
    fieldGroupClassName: 'test',
    props: {
      label: 'Nombre de voyageurs',
      value: 1,
      min: 1,
      max: 4,
      step: 1,
      required: true,
      styles: {
        div: {
          marginBottom: '20px',
          borderStyle: 'solid',
          borderColor: 'red',
          borderWidth: '1',
        }
      }
    }
  };

  fields: FormlyFieldConfig[] = [
    this.counterField,
    this.simpleInput(1)
  ];

  simpleInput(i: number) {
    return {
      key: `passenger${i}`,
      type: 'input',
      props: {
        placeholder: `Voyageur ${i}`,
        required: true,
        styles: {
          input: {
            marginTop: 'var(--wcs-semantic-spacing-base)',
            width: '300px'
          }
        }
      }
    };
  }

  ngAfterViewInit() {
    this.form.get('counter').valueChanges.subscribe((value: number) => {
      this.updateCount(value);
    });
  }


  updateCount(n: number) {

    const allFields = [this.counterField, this.simpleInput(1)]

    for (let i = 2; i <= n; i++) {
      allFields.push(this.simpleInput(i));
    }

    this.fields = allFields;
  }

  onSubmit(model) {
    console.log(model);
  }


}
