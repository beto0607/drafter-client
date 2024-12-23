import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appKebabSeparator],[app-kebab-separator]',
})
export class KebabSeparatorDirective {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    this.elementRef.nativeElement.setAttribute('tabindex', '-1');
  }
}
