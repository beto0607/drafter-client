import {
  Component,
  contentChildren,
  ElementRef,
  viewChild,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { KebabItemDirective } from './kebab-item.directive';

@Component({
  imports: [FaIconComponent],
  selector: 'app-kebab-menu',
  templateUrl: './kebab-menu.component.html',
  styleUrl: './kebab-menu.component.scss',
})
export class KebabMenuComponent {
  faKebabMenu = faEllipsisVertical;

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

  private setPopoverPosition(): void {
    const wrapper = this.wrapper().nativeElement;
    const popover = this.popover().nativeElement;

    const { x, y } = wrapper.getBoundingClientRect();
    popover.style.left = `${x}px`;
    popover.style.top = `${y}px`;
  }
}
