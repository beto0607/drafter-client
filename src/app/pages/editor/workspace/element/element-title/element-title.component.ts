import { Component, computed, inject, input } from '@angular/core';
import { TitleInputComponent } from '../../../../../components';
import { WorkspaceStateService } from '../../../../../state/workspace';
import { IElement } from '../../../../../domain';

@Component({
  imports: [TitleInputComponent],
  selector: 'app-element-title',
  templateUrl: './element-title.component.html',
  styleUrl: './element-title.component.scss',
})
export class ElementTitleComponent {
  private workspaceStateService = inject(WorkspaceStateService);
  element = input.required<IElement>();
  elementTitle = computed(() => this.element().title);

  onTitleChanged(newValue: string): void {
    this.workspaceStateService.updateElementTitle(this.element().id, newValue);
  }
}
