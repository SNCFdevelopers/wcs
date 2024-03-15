import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected injector: Injector, protected el: ElementRef) {}

  // tslint:disable-next-line:typedef
  writeValue(value: any) {
    this.el.nativeElement.value = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  @HostListener('wcsBlur', ['$event.target'])
  _handleBlurEvent(el: any): void {
    if (el === this.el.nativeElement) {
      this.onTouched();
    }
  }

  @HostListener('wcsInput', ['$event.target'])
  _handleInputEvent(el: any): void {
    if (el === this.el.nativeElement) {
      this.onChange(el.value);
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
