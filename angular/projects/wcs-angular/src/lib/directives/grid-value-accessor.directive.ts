import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directive, ElementRef, HostListener, Injector } from "@angular/core";

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'wcs-grid',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GridValueAccessorDirective,
      multi: true
    }
  ]
})
// tslint:disable-next-line:directive-class-suffix
export class GridValueAccessorDirective implements ControlValueAccessor {
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(protected el: ElementRef) {}

  /**
   * Write a new value to the element.
   * @param value the selected items
   */
  writeValue(value: any | any[]): void {
    if(this.el.nativeElement.selectionConfig === 'simple') {
      const simpleValue = Array.isArray(value) ? value[0] : value;
      this.el.nativeElement.selectedItems = simpleValue;
    } else if(this.el.nativeElement.selectionConfig === 'multiple') {
      const values = Array.isArray(value) ? value : [value];
      this.el.nativeElement.selectedItems = values;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  @HostListener('wcsGridSelectionChange', ['$event.detail.selectedRows'])
  _handleWcsGridSelectionChange(selectedItem: any | any[]): void {
    this.onChange(selectedItem);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
