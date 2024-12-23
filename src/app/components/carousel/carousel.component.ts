import { Component, contentChildren, effect, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CarouselItemDirective } from './carousel-item.directive';

@Component({
  imports: [IconComponent],
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  private items = contentChildren(CarouselItemDirective);

  private currentIndex = signal(0);

  constructor() {
    effect(() => {
      const items = this.items();
      const currentIndex = this.currentIndex();
      items.forEach((item, index) =>
        index === currentIndex ? item.show() : item.hide(),
      );
    });
  }

  onArrowLeftClicked(): void {
    const itemsLength = this.items().length;
    this.currentIndex.update((currentIndex) =>
      currentIndex - 1 < 0 ? itemsLength - 1 : currentIndex - 1,
    );
  }

  onArrowRightClicked(): void {
    const itemsLength = this.items().length;
    this.currentIndex.update(
      (currentIndex) => (currentIndex + 1) % itemsLength,
    );
  }
}
