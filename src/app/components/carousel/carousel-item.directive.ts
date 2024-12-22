import { Directive, effect, ElementRef, inject, signal } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appCarouselItem],[app-carousel-item]',
})
export class CarouselItemDirective {
  private host = inject(ElementRef);
  private visible = signal(true);

  isVisible = this.visible.asReadonly();

  constructor() {
    effect(() => {
      const visible = this.visible();
      if (visible) {
        this.host.nativeElement.style.display = 'block';
      } else {
        this.host.nativeElement.style.display = 'none';
      }
    });
  }

  hide(): void {
    this.visible.set(false);
  }
  show(): void {
    this.visible.set(true);
  }
}
