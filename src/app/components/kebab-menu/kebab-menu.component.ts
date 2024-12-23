import {
  Component,
  contentChildren,
  ElementRef,
  viewChild,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { KebabItemDirective } from './kebab-item.directive';

@Component({
  imports: [IconComponent],
  selector: 'app-kebab-menu',
  templateUrl: './kebab-menu.component.html',
  styleUrl: './kebab-menu.component.scss',
})
export class KebabMenuComponent {
  private content = contentChildren(KebabItemDirective);

  private wrapper = viewChild.required<ElementRef<HTMLDivElement>>('wrapper');
  private popover = viewChild.required<ElementRef<HTMLDivElement>>('popover');

  onButtonClicked(): void {
    if (!this.content().length) {
      return;
    }
    this.popover().nativeElement.showPopover();
    this.setPopoverPosition();
  }

  close(): void {
    this.popover().nativeElement.hidePopover();
  }

  private setPopoverPosition(): void {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const wrapper = this.wrapper().nativeElement;
    const popover = this.popover().nativeElement;

    const popoverRect = popover.getBoundingClientRect();
    const { x, y } = wrapper.getBoundingClientRect();

    if (x + popoverRect.width >= innerWidth) {
      popover.style.left = `${x - popoverRect.width}px`;
    } else {
      popover.style.left = `${x}px`;
    }

    if (y + popoverRect.height >= innerHeight) {
      popover.style.top = `${y - popoverRect.height}px`;
    } else {
      popover.style.top = `${y}px`;
    }
  }
}
