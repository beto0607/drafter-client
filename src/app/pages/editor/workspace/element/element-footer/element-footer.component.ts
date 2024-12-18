import { Component, input, output } from '@angular/core';
import { PillComponent } from '../../../../../components';
import { IElement } from '../../../../../domain';

@Component({
  imports: [PillComponent],
  selector: 'app-element-footer',
  templateUrl: './element-footer.component.html',
  styleUrl: './element-footer.component.scss',
})
export class ElementFooterComponent {
  element = input.required<IElement>();
  resizePressed = output();

  onResizeMouseDown(): void {
    this.resizePressed.emit();
  }
}
