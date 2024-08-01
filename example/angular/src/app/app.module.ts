import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WcsAngularModule } from 'wcs-angular';
import { FormlyModule } from '@ngx-formly/core';
import { WcsFormlyModule } from 'wcs-formly';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { AboutComponent } from './about/about.component';
import { AboutIntroComponent } from './about/about-intro.component';
import { AboutArticleComponent } from './about/about-article.component';
import { MainExampleComponent } from './example/main-example.component';
import { SelectExampleComponent } from './example/select-example/select-example.component';
import { RadioGroupExampleComponent } from './example/radio-group-example/radio-group-example.component';
import { GridExampleComponent } from './example/grid-example/grid-example.component';
import { InputExampleComponent } from './example/input-example/input-example.component';
import { FormlyExampleComponent } from './example/formly-example/formly-example.component';
import { FormlyStylingExampleComponent } from './example/formly-example/formly-styling-example.component';
import { ModalExampleComponent } from './example/modal-example/modal-example.component';
import { FormlyInputExamplesComponent } from './example/formly-example/formly-input-examples.component';
import { GridServerPaginationExampleComponent } from './example/grid-example/grid-server-pagination-example.component';
import { CounterExampleComponent } from './example/counter-example/counter-example.component';
import { CounterFormlyPassengersExampleComponent } from './example/counter-example/counter-formly-passengers-example.component';
import { CounterFormlyDefaultValueComponent } from './example/counter-example/counter-formly-default-value.component';
import { NativeSelectExampleComponent } from './example/select-example/native-select-example.component';
import { AutocompleteSelectExampleComponent } from './example/select-example/autocomplete-select-example.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AriaCurrentDirective } from './aria-current.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AboutComponent,
    AboutIntroComponent,
    AboutArticleComponent,
    MainExampleComponent,
    SelectExampleComponent,
    RadioGroupExampleComponent,
    GridExampleComponent,
    GridServerPaginationExampleComponent,
    InputExampleComponent,
    FormlyExampleComponent,
    FormlyStylingExampleComponent,
    ModalExampleComponent,
    FormlyInputExamplesComponent,
    CounterExampleComponent,
    CounterFormlyPassengersExampleComponent,
    CounterFormlyDefaultValueComponent,
    NativeSelectExampleComponent,
    AutocompleteSelectExampleComponent,
    BreadcrumbComponent,
    AriaCurrentDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WcsAngularModule,
    FormlyModule.forRoot({
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
