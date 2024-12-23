import { Component, effect, inject, input, viewChild } from '@angular/core';
import {
  IconComponent,
  KebabItemDirective,
  KebabMenuComponent,
  KebabSeparatorDirective,
} from '../../../../../components';
import { IElement } from '../../../../../domain';
import { WorkspaceStateService } from '../../../../../state/workspace';

@Component({
  imports: [
    IconComponent,
    KebabMenuComponent,
    KebabItemDirective,
    KebabSeparatorDirective,
  ],
  selector: 'app-edit-element-menu',
  templateUrl: './edit-element-menu.component.html',
  styleUrls: [
    '../../../../../styles/menu.styles.scss',
    './edit-element-menu.component.scss',
  ],
})
export class EditElementMenuComponent {
  private workspaceStateService = inject(WorkspaceStateService);

  element = input.required<IElement>();

  private menu = viewChild.required(KebabMenuComponent);

  constructor() {
    effect(() => {
      const _elements = this.workspaceStateService.elements();
      console.log(this.menu());
      this.menu().close();
    });
  }

  onDeleteElementClicked(): void {
    const element = this.element();
    this.workspaceStateService.deleteElement(element.id);
  }

  onDuplicateElementClicked(): void {
    const element = this.element();
    this.workspaceStateService.duplicateElement(element.id);
  }
}
