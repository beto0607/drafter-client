import { Component, inject } from '@angular/core';
import { TitleInputComponent } from '../../../components';
import { WorkspaceStateService } from '../../../state/workspace';

@Component({
  imports: [TitleInputComponent],
  selector: 'app-project-name',
  templateUrl: './project-name.component.html',
  styleUrl: './project-name.component.scss',
})
export class ProjectNameComponent {
  private workspaceStateService = inject(WorkspaceStateService);
  projectName = this.workspaceStateService.projectName;

  onProjectNameChanged(newValue: string): void {
    this.workspaceStateService.setProjectName(newValue);
  }
}
