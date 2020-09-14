import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-example',
  template: `
    <h2>Exemple d'utilisation du select</h2>
    <wcs-card>
      <wcs-card-body>
        <h3>Valeur par défaut</h3>
        <wcs-select placeholder="Le select" [value]="value" name="sel-30" multiple>
          <wcs-select-option value="1">One</wcs-select-option>
          <wcs-select-option value="2">Two</wcs-select-option>
          <wcs-select-option value="3">Three</wcs-select-option>
        </wcs-select>
        <h3>Binding</h3>
        <p>Selected values : {{binding}}</p>
        <wcs-select placeholder="Le select" [(ngModel)]="binding" name="sel-893" multiple>
          <wcs-select-option value="1">One</wcs-select-option>
          <wcs-select-option value="2">Two</wcs-select-option>
          <wcs-select-option value="3">Three</wcs-select-option>
        </wcs-select>
        <h3>Set value</h3>
        <wcs-select placeholder="Le select" [(ngModel)]="random" name="sel-763">
          <wcs-select-option value="1">One</wcs-select-option>
          <wcs-select-option value="2">Two</wcs-select-option>
          <wcs-select-option value="3">Three</wcs-select-option>
        </wcs-select>
        <br/>
        <wcs-button class="primary" mode="stroked" (click)="onRandomButtonClick()">Set random value</wcs-button>
      </wcs-card-body>
    </wcs-card>
  `,
  styles: []
})
export class SelectExampleComponent {
  value = [1, 2];
  binding: any;
  random = this.randomIntFromInterval(1, 3);

  constructor() {
  }

  randomIntFromInterval(min, max): number { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  onRandomButtonClick() {
    this.random = this.randomIntFromInterval(1, 3);
  }
}
