import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <wcs-card>
          <wcs-card-body>
              <wcs-select id="lazy-loaded-select" placeholder="Le select" multiple>
                  <wcs-select-option *ngFor="let opt of options" [value]="opt.value">{{ opt.name }}</wcs-select-option>
              </wcs-select>
              <wcs-button (click)="addOptions()" mode="stroked" class="primary">Add option</wcs-button>
          </wcs-card-body>
      </wcs-card>
      <wcs-card>
          <wcs-card-body>
              <wcs-form-field>
                  <input [(ngModel)]="inputValue"/>
              </wcs-form-field>
              <wcs-form-field>
                  <input [(ngModel)]="inputValue"/>
                  <wcs-button shape="square" slot="suffix"><i class="material-icons">person</i></wcs-button>
              </wcs-form-field>
              <wcs-form-field>
                  <wcs-select placeholder="Et ouais">
                      <wcs-select-option *ngFor="let opt of options" [value]="opt.value">{{ opt.name }}</wcs-select-option>
                  </wcs-select>
                  <input [(ngModel)]="inputValue"/>
                  <wcs-button shape="square" slot="suffix"><i class="material-icons">person</i></wcs-button>
              </wcs-form-field>
          </wcs-card-body>
      </wcs-card>
  `,
  styles: [
      `
      wcs-form-field {
          margin-bottom: 8px;
      }
      input {
          width: 100%;
      }
      `
  ]
})
export class AppComponent {
  id = 2;
  inputValue = `lol`;

  options: { value: string, name: string }[] = [{
    name: '1', value: '1'
  }];

  addOptions() {
    this.options.push({ name: this.id.toString(), value: this.id.toString() });
    this.id++;
  }
}
