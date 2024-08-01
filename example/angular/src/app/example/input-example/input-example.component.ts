import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-example',
  template: `
    <h2>Exemple utilisation input</h2>
    <h3>Input bindé avec un ngModel</h3>
    Input 1 (L)
    <wcs-input [(ngModel)]="inputText1" size='l' placeholder="exemple d'input bindé avec ngModel"></wcs-input>
    Input 2 (M)
    <wcs-input [(ngModel)]="inputText1" placeholder="exemple d'input bindé avec ngModel"></wcs-input>
    Input 3 (S)
    <wcs-input [(ngModel)]="inputText1" size='s' placeholder="exemple d'input bindé avec ngModel"></wcs-input>

    <h3>Idem avec textarea</h3>
    Textarea 1
    <wcs-textarea [(ngModel)]="textareaText1" auto-grow placeholder="exemple d'un textarea bindé avec ngModel"></wcs-textarea>
    Textarea 2
    <wcs-textarea [(ngModel)]="textareaText1" auto-grow placeholder="exemple d'un textarea bindé avec ngModel"></wcs-textarea>

    <h3>Erreur si la checkbox reste décochée après une première interaction</h3>
    <wcs-form-field [isError]="isChecked.touched && isChecked.invalid">
      <wcs-label>Checkbox</wcs-label>
      <wcs-checkbox [formControl]="isChecked">
        placeholder
      </wcs-checkbox>
      <wcs-error>
        <wcs-mat-icon size="s" icon="info" family="filled"></wcs-mat-icon>
        Veuillez renseigner ce champ
      </wcs-error>
    </wcs-form-field>
  `,
  styles: []
})
export class InputExampleComponent implements OnInit {
  public inputText1: string;
  public textareaText1: string;
  public isChecked = new FormControl(false, [Validators.requiredTrue]);

  constructor() {
  }

  ngOnInit(): void {
  }

}
