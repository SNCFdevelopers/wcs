import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectExampleComponent } from './select-example/select-example.component';
import { FormsModule } from '@angular/forms';
import { RadioGroupExampleComponent } from './radio-group/radio-group-example.component';
import { GridExampleComponent } from './grid-example/grid-example.component';
import { InputExampleComponent } from './input-example/input-example.component';
import { WcsAngularModule } from 'wcs-angular';

@NgModule({
  declarations: [
    AppComponent,
    SelectExampleComponent,
    RadioGroupExampleComponent,
    GridExampleComponent,
    InputExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WcsAngularModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
