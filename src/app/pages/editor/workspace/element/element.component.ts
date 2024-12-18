import { Component, HostBinding, input } from '@angular/core';
import { IElement } from '../../../../domain';
import { ElementTitleComponent } from './element-title/element-title.component';

@Component({
  imports: [ElementTitleComponent],
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss',
})
export class ElementComponent {
  element = input.required<IElement>();

  @HostBinding('top')
  get top(): number {
    return this.element().position.y;
  }

  @HostBinding('left')
  get left(): number {
    return this.element().position.x;
  }
}
