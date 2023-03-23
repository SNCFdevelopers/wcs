import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-counter-example',
  template: `
    <h2>Exemple utilisation compteur</h2>
    <wcs-counter [value]="1" [min]="0" [max]="5" (wcsChange)="counterValueChanged($event)"></wcs-counter>
    <div class="cards">
      <span *ngIf="cardsIds.length < 1" class="info">Incrémentez le compteur !</span>
      <wcs-card *ngFor="let card of cardsIds; let i = index">
        <wcs-card-body>
          Élément {{ i+1 }}
        </wcs-card-body>
      </wcs-card>
    </div>

    <h2>Avec Formly</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit(model)">
      <formly-form [form]="form" [fields]="fields" [model]="model"></formly-form>
      <wcs-button type="submit">Submit</wcs-button>
    </form>
    <pre>{{model | json}}</pre>

  `,
  styles: [`
    div.cards {
      display: flex;
      margin: var(--wcs-base-margin) 0;
      flex-wrap: wrap;
      gap: var(--wcs-base-margin);
    }
    span.info {
      color: var(--wcs-text-disabled)
    }
    wcs-card {
      max-width: 200px;
    }
    wcs-button {
      width: 130px;
      margin-top: calc(var(--wcs-base-margin)*2)
    }
  `]
})
export class CounterExampleComponent implements AfterViewInit {
  public cardsIds = [0];

  form = new FormGroup({});
  model = { counter: 1 };

  ngAfterViewInit() {
    this.form.get('counter').valueChanges.subscribe((value: number) => {
      this.updateCount(value);
    })
  }

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
  }

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
            marginTop: 'var(--wcs-base-margin)',
            width: '300px'
          }
        }
      }
    };
  }

  updateCount(n: number) {

    const allFields = [this.counterField, this.simpleInput(1)]

    for (let i = 2; i <= n; i++) {
      allFields.push(this.simpleInput(i))
    }

    this.fields = allFields;
  }

  onSubmit(model) {
    console.log(model);
  }

  counterValueChanged($event: any) {
    this.cardsIds = new Array($event.detail.value);
  }

}
