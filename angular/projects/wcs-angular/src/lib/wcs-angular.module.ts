import { NgModule } from '@angular/core';
import { SelectValueAccessor } from './directives/select-value-accessor.directive';
import { RadioGroupValueAccessor } from './directives/radio-group-value-accessor.directive';


@NgModule({
  declarations: [SelectValueAccessor, RadioGroupValueAccessor],
  imports: [],
  exports: [SelectValueAccessor, RadioGroupValueAccessor]
})
export class WcsAngularModule {
}
