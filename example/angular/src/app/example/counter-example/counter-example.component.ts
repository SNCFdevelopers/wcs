import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-counter-example',
  standalone: false,
  template: `
    <h2>Exemple utilisation compteur</h2>
    <wcs-counter [label]="'Le label'" [value]="1" [min]="0" [max]="5" (wcsChange)="counterValueChanged($event)"></wcs-counter>
    <div class="cards">
      @if (cardsIds().length < 1) {
        <span class="info">Incrémentez le compteur !</span>
      }
      @for (card of cardsIds(); track $index; let i = $index) {
        <wcs-card>
          <wcs-card-body>
            Élément {{ i + 1 }}
          </wcs-card-body>
        </wcs-card>
      }
    </div>

    <app-counter-formly-passengers-example></app-counter-formly-passengers-example>

    <app-counter-formly-default-value></app-counter-formly-default-value>

    <hr/>
    <h1>Two way binding</h1>
    <div class="two-way-binding-container">
      <div class="counter-group">
        <wcs-counter [label]="'Le label'" [ngModel]="counterBidirectionalBinding()" (ngModelChange)="counterBidirectionalBinding.set($event)" [min]="0" [max]="20" [step]="1"></wcs-counter>
        <input type="number" [ngModel]="counterBidirectionalBinding()" (ngModelChange)="counterBidirectionalBinding.set($event)" min="0" max="20" step="1"/>
      </div>
      <b>Compteur:</b> <output>{{counterBidirectionalBinding()}}</output>
      <wcs-button (click)="counterBidirectionalBinding.set(0)">Reset value</wcs-button>
    </div>
  `,
  styles: [`
    div.cards {
      display: flex;
      margin: var(--wcs-semantic-spacing-base) 0;
      flex-wrap: wrap;
      gap: var(--wcs-semantic-spacing-base);
    }
    span.info {
      color: var(--wcs-semantic-color-text-secondary)
    }
    wcs-card {
      max-width: 200px;
    }
    wcs-button {
      width: 130px;
      margin-top: var(--wcs-semantic-spacing-large);
    }

    .two-way-binding-container {
      display: flex;
      width: fit-content;
      flex-direction: column;
      align-items: center;
    }

    .counter-group {
      display: flex;
      flex-direction: row;
      gap: var(--wcs-semantic-spacing-base)
    }
  `]
})
export class CounterExampleComponent {
  public cardsIds = signal([0]);
  counterBidirectionalBinding = signal(0);

  counterValueChanged($event: any) {
    this.cardsIds.set(new Array($event.detail.value));
  }

}
