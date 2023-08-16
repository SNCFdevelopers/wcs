import { Directive, ElementRef, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CounterChangeEventDetail } from '../../../../../../dist/types/components/counter/counter-interface';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'wcs-counter',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CounterValueAccessorDirective,
      multi: true
    }
  ]
})
// tslint:disable-next-line:directive-class-suffix
export class CounterValueAccessorDirective implements ControlValueAccessor {
  private value;
  private onChange: (value: any) => void = () => {};

  constructor(protected injector: Injector, protected el: ElementRef) {
    this.el.nativeElement.addEventListener('wcsChange', (event: CustomEvent<CounterChangeEventDetail>) => {
      this.onChange(event.detail.value);
    });
  }

  // tslint:disable-next-line:typedef
  writeValue(value) {
    this.value = value;
    this.el.nativeElement.value = value;
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
