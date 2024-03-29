import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'wcs-select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectValueAccessor,
      multi: true
    }
  ]
})
// tslint:disable-next-line:directive-class-suffix
export class SelectValueAccessor implements ControlValueAccessor {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected injector: Injector, protected el: ElementRef) {
  }

  @HostListener('wcsChange', ['$event.detail.value'])
  _handleInputEvent(value: any): void {
      this.onChange(value);
  }

  // tslint:disable-next-line:typedef
  writeValue(value) {
    this.el.nativeElement.value = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
