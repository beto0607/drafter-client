import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appKebabItem],[app-kebab-item]',
})
export class KebabItemDirective {
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    this.elementRef.nativeElement.setAttribute('tabindex', '0');
    this.elementRef.nativeElement.style.cursor = 'pointer';
  }
}
