import { Component, input, output } from '@angular/core';
import { IElement } from '../../../../domain';
import { ElementFooterComponent } from './element-footer/element-footer.component';
import { ElementTitleComponent } from './element-title/element-title.component';

@Component({
  imports: [ElementTitleComponent, ElementFooterComponent],
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrl: './element.component.scss',
  host: {
    '[style.top]': 'top',
    '[style.left]': 'left',
    '[style.minWidth]': 'width',
    '[style.minHeight]': 'height',
  },
})
export class ElementComponent {
  element = input.required<IElement>();
  elementClicked = output();
  resizePressed = output();

  get top(): string {
    return this.element().position.y + 'px';
  }

  get left(): string {
    return this.element().position.x + 'px';
  }

  get width(): string {
    console.log(this.element().size.width);
    return this.element().size.width + 'px';
  }

  get height(): string {
    return this.element().size.height + 'px';
  }
}
