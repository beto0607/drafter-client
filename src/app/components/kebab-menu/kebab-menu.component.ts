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
    this.setPopoverPosition();
    this.popover().nativeElement.showPopover();
  }

  close(): void {
    this.popover().nativeElement.hidePopover();
  }

  private setPopoverPosition(): void {
    const wrapper = this.wrapper().nativeElement;
    const popover = this.popover().nativeElement;

    const { x, y } = wrapper.getBoundingClientRect();
    popover.style.left = `${x}px`;
    popover.style.top = `${y}px`;
  }
}
