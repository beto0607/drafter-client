import { Component, inject, input, output } from '@angular/core';
import { IElement } from '../../../../domain';
import { WorkspaceStateService } from '../../../../state/workspace';
import { ElementContentComponent } from './element-content/element-content.component';
import { ElementFooterComponent } from './element-footer/element-footer.component';
import { ElementTitleComponent } from './element-title/element-title.component';

@Component({
  imports: [
    ElementTitleComponent,
    ElementContentComponent,
    ElementFooterComponent,
  ],
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
  private workspaceStateService = inject(WorkspaceStateService);

  element = input.required<IElement>();
  elementClicked = output();
  editElement = output();
  resizePressed = output();

  constructor() {
    setTimeout(() => {
      this.editElement.emit();
    }, 1000);
  }

  get top(): string {
    return this.element().position.y + 'px';
  }

  get left(): string {
    return this.element().position.x + 'px';
  }

  get width(): string {
    return this.element().size.width + 'px';
  }

  get height(): string {
    return this.element().size.height + 'px';
  }

  onCaptionUpdated(newCaption: IElement['caption']): void {
    console.log(newCaption);
    this.workspaceStateService.updateElementCaption(
      this.element().id,
      newCaption,
    );
  }

  onElementDoubleClicked(): void {
    this.editElement.emit();
  }
}
