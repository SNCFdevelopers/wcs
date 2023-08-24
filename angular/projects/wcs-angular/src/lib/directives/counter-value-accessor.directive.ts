import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
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
  private value: any;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected injector: Injector, protected el: ElementRef) {
    this.el.nativeElement.addEventListener('wcsChange', (event: CustomEvent<CounterChangeEventDetail>) => {
      this.onChange(event.detail.value);
    });
  }

  writeValue(value): void {
    this.value = value;
    this.el.nativeElement.value = this.value;
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  @HostListener('wcsBlur', ['$event.target'])
  _handleBlurEvent(el: any): void {
    if (el === this.el.nativeElement) {
      this.onTouched();
    }
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }
}
