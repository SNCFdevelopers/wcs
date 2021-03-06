import { Directive, ElementRef, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectChangeEventDetail } from '../../../../../../dist/types/components/select/select-interface';

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
  private value;
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected injector: Injector, protected el: ElementRef) {
    this.el.nativeElement.addEventListener('wcsChange', (event: CustomEvent<SelectChangeEventDetail>) => {
      this.onChange(event.detail.value);
    });


  }

  // tslint:disable-next-line:typedef
  writeValue(value) {
    this.value = value;
    this.el.nativeElement.value = this.value;
  }

  // tslint:disable-next-line:typedef
  registerOnChange(value) {
    this.onChange = value;
  }

  /**
   * Not implemented for now
   */
  // tslint:disable-next-line:typedef
  registerOnTouched(fn) {
  }
}
