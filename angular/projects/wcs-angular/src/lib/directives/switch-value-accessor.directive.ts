import { Directive, ElementRef, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwitchChangeEventDetail } from '../../../../../../dist/types/components/switch/switch-interface';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'wcs-switch',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwitchValueAccessorDirective,
      multi: true
    }
  ]
})
// tslint:disable-next-line:directive-class-suffix
export class SwitchValueAccessorDirective implements ControlValueAccessor {
  private checked;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected injector: Injector, protected el: ElementRef) {
    this.el.nativeElement.addEventListener('wcsChange', (event: CustomEvent<SwitchChangeEventDetail>) => {
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

  /**
   * Not implemented for now
   */
  // tslint:disable-next-line:typedef
  registerOnTouched(fn) {
  }
}
