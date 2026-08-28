import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WcsAlertService, WcsAngularModule } from 'wcs-angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HorizontalStepConfig } from 'wcs-core';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [
    WcsAngularModule,
    JsonPipe,
    ReactiveFormsModule,
  ],
  template: `
    <h2>Controls</h2>
    <wcs-button (click)="onHelloButtonClick($event)">Hello From Angular Standalone App</wcs-button>
    <wcs-button (click)="onAlertButtonClick()">Display info alert</wcs-button>
    <wcs-button (click)="onClearAlertsButtonClick()">Clear alerts</wcs-button>
    <form class="column" [formGroup]="formGroup">
      <wcs-input placeholder="Enter text" formControlName="input"></wcs-input>
      <wcs-select placeholder="Select an option" formControlName="number">
        <wcs-select-option value="0">Option 1</wcs-select-option>
        <wcs-select-option value="1">Option 2</wcs-select-option>
        <wcs-select-option value="2">Option 3</wcs-select-option>
      </wcs-select>
      <wcs-switch formControlName="switch">Toggle me!</wcs-switch>
      <wcs-checkbox formControlName="checkbox">Check me!</wcs-checkbox>
      <wcs-counter formControlName="counter" label="Mon compteur" [min]="0" [max]="5"></wcs-counter>
      <wcs-textarea formControlName="text" placeholder="Enter text"></wcs-textarea>
      <wcs-radio-group formControlName="radio" mode="option">
        <wcs-radio label="SNCF" value="1"></wcs-radio>
        <wcs-radio label="SNCF Réseau" value="2"></wcs-radio>
        <wcs-radio label="SNCF Voyageurs" value="3"></wcs-radio>
      </wcs-radio-group>
    </form>

    <div>
      {{ formGroup.value | json }}
    </div>

    <section>
      <h3>Horizontal stepper</h3>
      <wcs-horizontal-stepper [(currentStep)]="currentStep" [steps]="stepperSteps"></wcs-horizontal-stepper>
      <p>Current step: {{ currentStep }}</p>
      <div class="row">
        <wcs-button mode="clear" [disabled]="currentStep === 0" (click)="currentStep = currentStep - 1">Previous</wcs-button>
        <wcs-button mode="clear" [disabled]="currentStep === stepperSteps.length - 1" (click)="currentStep = currentStep + 1">Next</wcs-button>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--wcs-semantic-spacing-large, 16px);
    }
  `]
})
export class ControlsPageComponent {
  currentStep = 1;

  formGroup: FormGroup = new FormGroup({
    input: new FormControl('test'),
    number: new FormControl('0'),
    checkbox: new FormControl(true),
    counter: new FormControl(5),
    switch: new FormControl(true),
    text: new FormControl('texte'),
    radio: new FormControl('2'),
  });
  title = 'wcs-angular-standalone-example';
  readonly pageSize: number = 5;
  readonly stepperSteps: HorizontalStepConfig[] = [
    { text: 'Step 1', button: { kind: 'Text', text: '1' } },
    { text: 'Step 2', button: { kind: 'Text', text: '2' } },
    { text: 'Step 3', button: { kind: 'Text', text: '3' } },
  ];

  private alertService: WcsAlertService = inject(WcsAlertService);

  constructor() {
    this.alertService.setConfig({
      position: 'bottom-right',
      showProgressBar: true,
      timeout: 5000
    })
  }


  onHelloButtonClick($event: MouseEvent) {
    window.alert("Hello from Angular Standalone App!");
  }

  onAlertButtonClick() {
    this.alertService.info('Info', 'This is an info alert from Angular Standalone App!');
  }

  onButtonClick($event: MouseEvent) {
    window.alert("Hello from Angular Standalone App!");
  }

  onClearAlertsButtonClick() {
    this.alertService.clear();
  }
}
