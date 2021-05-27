import { NgModule } from '@angular/core';
import { SelectValueAccessor } from './directives/select-value-accessor.directive';
import { RadioGroupValueAccessor } from './directives/radio-group-value-accessor.directive';
import { CheckboxValueAccessorDirective } from './directives/checkbox-value-accessor.directive';
import { SwitchValueAccessorDirective } from './directives/switch-value-accessor.directive';
import { InputValueAccessorDirective } from './directives/input-value-accessor.directive';
import { TextareaValueAccessorDirective } from './directives/textarea-value-accessor.directive';


@NgModule({
  declarations: [InputValueAccessorDirective, TextareaValueAccessorDirective, SelectValueAccessor, RadioGroupValueAccessor, CheckboxValueAccessorDirective, SwitchValueAccessorDirective],
  imports: [],
  exports: [InputValueAccessorDirective, TextareaValueAccessorDirective, SelectValueAccessor, RadioGroupValueAccessor, CheckboxValueAccessorDirective, SwitchValueAccessorDirective]
})
export class WcsAngularModule {
}
