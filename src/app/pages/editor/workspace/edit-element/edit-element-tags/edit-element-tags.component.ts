import { Component, inject, input } from '@angular/core';
import { PillComponent } from '../../../../../components';
import { IElement, ITag } from '../../../../../domain';
import { WorkspaceStateService } from '../../../../../state/workspace';

@Component({
  imports: [PillComponent],
  selector: 'app-edit-element-tags',
  templateUrl: './edit-element-tags.component.html',
  styleUrl: './edit-element-tags.component.scss',
})
export class EditElementTagsComponent {
  private workspaceStateService = inject(WorkspaceStateService);

  element = input.required<IElement>();

  onDeleteTagClicked(tag: ITag): void {
    const elementId = this.element().id;
    this.workspaceStateService.deleteTagFromElement(elementId, tag);
  }
}
