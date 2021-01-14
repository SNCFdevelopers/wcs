import { NgModule } from '@angular/core';
import { SelectValueAccessor } from './directives/select-value-accessor.directive';
import { RadioGroupValueAccessor } from './directives/radio-group-value-accessor.directive';
import { CheckboxValueAccessorDirective } from './directives/checkbox-value-accessor.directive';
import { SwitchValueAccessorDirective } from './directives/switch-value-accessor.directive';


@NgModule({
  declarations: [SelectValueAccessor, RadioGroupValueAccessor, CheckboxValueAccessorDirective, SwitchValueAccessorDirective],
  imports: [],
  exports: [SelectValueAccessor, RadioGroupValueAccessor, CheckboxValueAccessorDirective, SwitchValueAccessorDirective]
})
export class WcsAngularModule {
}
