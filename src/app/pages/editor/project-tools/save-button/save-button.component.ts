import { Component, computed, inject } from '@angular/core';
import { IconComponent } from '../../../../components';
import { WorkspaceStateService } from '../../../../state/workspace';

@Component({
  imports: [IconComponent],
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  private workspaceStateService = inject(WorkspaceStateService);

  isLoading = computed(() => !this.workspaceStateService.loaded());
  isProjectDirty = computed(() => this.computeIsProjectDirty());

  onSaveButtonClicked(): void {
    if (!this.isProjectDirty()) {
      return;
    }
    this.workspaceStateService.saveProject();
  }

  private computeIsProjectDirty(): boolean {
    const originalChecksum = this.workspaceStateService.originalChecksum();
    const currentChecksum = this.workspaceStateService.currentChecksum();
    return originalChecksum !== currentChecksum;
  }
}
