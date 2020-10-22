import { Directive, ElementRef, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioGroupChangeEventDetail } from '../../../../../../dist/types/components/radio-group/radio-group-interface';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'wcs-radio-group',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioGroupValueAccessor,
      multi: true
    }
  ]
})
// tslint:disable-next-line:directive-class-suffix
export class RadioGroupValueAccessor implements ControlValueAccessor {
  private value;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected injector: Injector, protected el: ElementRef) {
    this.el.nativeElement.addEventListener('wcsChange', (event: CustomEvent<RadioGroupChangeEventDetail>) => {
      this.onChange(event.detail.value);
    });
  }

  // tslint:disable-next-line:typedef
  writeValue(value) {
    this.value = value;
    this.el.nativeElement.setAttribute('value', this.value);
  }

  // tslint:disable-next-line:typedef
  registerOnChange(fn) {
    this.onChange = fn;
  }

  /**
   * Not implemented for now
   */
  // tslint:disable-next-line:typedef
  registerOnTouched(fn) {
  }

}
