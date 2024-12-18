import { Component, inject, signal } from "@angular/core";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { WorkspaceStateService } from "../../../state/workspace";

@Component({
  imports: [FaIconComponent],
  selector: 'app-project-name',
  templateUrl: './project-name.component.html',
  styleUrl: './project-name.component.scss'
})
export class ProjectNameComponent {
  private workspaceStateService = inject(WorkspaceStateService)
  editIcon = faPen;

  projectName = this.workspaceStateService.projectName
  isEditing = signal(false);

  onClick(): void {
    if (this.isEditing()) {
      return
    }
    this.isEditing.set(true)
  }

  onNameSubmitted(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value.trim();
    if (!newValue) {
      return
    }
    const projectName = this.projectName()
    if (newValue !== projectName) {
      this.workspaceStateService.setProjectName(newValue);
    }
    this.isEditing.set(false)
  }
}
