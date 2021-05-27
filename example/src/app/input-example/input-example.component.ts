import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-example',
  template: `
    <h2>Exemple utilisation input</h2>
    <h3>Input bindé avec un ngModel</h3>
    Input 1
    <wcs-input [(ngModel)]="inputText1" placeholder="exemple d'input bindé avec ngModel"></wcs-input>
    Input 2
    <wcs-input [(ngModel)]="inputText1" placeholder="exemple d'input bindé avec ngModel"></wcs-input>

    <h3>Idem avec textarea</h3>
    Textarea 1
    <wcs-textarea [(ngModel)]="textareaText1" auto-grow placeholder="exemple d'un textarea bindé avec ngModel"></wcs-textarea>
    Textarea 2
    <wcs-textarea [(ngModel)]="textareaText1" auto-grow placeholder="exemple d'un textarea bindé avec ngModel"></wcs-textarea>
  `,
  styles: []
})
export class InputExampleComponent implements OnInit {
  public inputText1: string;
  public textareaText1: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
