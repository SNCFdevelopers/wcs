import { Directive, HostBinding, Host } from "@angular/core";
import { RouterLinkActive } from "@angular/router";

@Directive({
  selector: '[routerLinkActive]'
})
export class AriaCurrentDirective {
  constructor(@Host() private rla: RouterLinkActive) {}

  get isActive() {
    return this.rla.isActive;
  }

  @HostBinding("attr.aria-current") get ariaCurrent() {
    return this.isActive ? "page" : undefined;
  }
}
