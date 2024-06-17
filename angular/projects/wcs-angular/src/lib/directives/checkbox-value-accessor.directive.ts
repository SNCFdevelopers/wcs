import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxChangeEventDetail } from '../../../../../../dist/types/components/checkbox/checkbox-interface';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'wcs-checkbox',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxValueAccessorDirective,
      multi: true
    }
  ]
})
// tslint:disable-next-line:directive-class-suffix
export class CheckboxValueAccessorDirective implements ControlValueAccessor {
  private checked;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected injector: Injector, protected el: ElementRef) {
    this.el.nativeElement.addEventListener('wcsChange', (event: CustomEvent<CheckboxChangeEventDetail>) => {
      this.onChange(event.detail.checked);
    });
  }

  // tslint:disable-next-line:typedef
  writeValue(checked) {
    this.checked = checked;
    if (checked) {
      this.el.nativeElement.setAttribute('checked', this.checked);
    } else {
      this.el.nativeElement.removeAttribute('checked');
    }
  }

  // tslint:disable-next-line:typedef
  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('wcsBlur', ['$event.target'])
  _handleBlurEvent(el: any): void {
    if (el === this.el.nativeElement) {
      this.onTouched();
    }
  }
}
