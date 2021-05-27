import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputChangeEventDetail } from '../../../../../../dist/types/components/input/input-interface';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'wcs-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputValueAccessorDirective,
      multi: true
    }
  ]
})
// tslint:disable-next-line:directive-class-suffix
export class InputValueAccessorDirective implements ControlValueAccessor {
  private value;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected injector: Injector, protected el: ElementRef) {
    this.el.nativeElement.addEventListener('wcsChange', (event: CustomEvent<InputChangeEventDetail>) => {
      this.onChange(event.detail.value);
    });
  }

  // tslint:disable-next-line:typedef
  writeValue(value) {
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
