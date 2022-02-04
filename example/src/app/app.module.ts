import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectExampleComponent } from './select-example/select-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioGroupExampleComponent } from './radio-group/radio-group-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { InputExampleComponent } from './input-example/input-example.component';
import { WcsAngularModule } from 'wcs-angular';
import { FormlyExampleComponent } from './formly-example/formly-example.component';
import { FormlyModule } from '@ngx-formly/core';
import { WcsFormlyModule } from 'wcs-formly';
import { FormlyStylingExampleComponent } from './formly-example/formly-styling-example.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectExampleComponent,
    RadioGroupExampleComponent,
    GridExampleComponent,
    InputExampleComponent,
    FormlyExampleComponent,
    FormlyStylingExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WcsAngularModule,
    FormlyModule.forRoot({
      extras: {lazyRender: true},
      validationMessages: [
        {name: 'required', message: 'Ce champ est obligatoire'}
      ]
    }),
    WcsFormlyModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
