import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioGroupChangeEventDetail } from 'wcs-core';

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

  writeValue(value: any): void {
    this.value = value;
    this.el.nativeElement.value = this.value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  @HostListener('wcsBlur', ['$event'])
  _handleBlurEvent(ev: any): void {
    if (!this.el.nativeElement.contains(ev.detail.relatedTarget)) {
      this.onTouched();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
