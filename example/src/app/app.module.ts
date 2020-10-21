import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SelectExampleComponent } from './select-example/select-example.component';
import { FormsModule } from '@angular/forms';
import { WcsAngularModule } from 'wcs-angular';
import { RadioGroupExampleComponent } from './radio-group/radio-group-example.component';

@NgModule({
  declarations: [
    AppComponent,
    SelectExampleComponent,
    RadioGroupExampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WcsAngularModule,
    WcsAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
