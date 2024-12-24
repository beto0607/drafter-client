import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faDownload,
  faHome,
  faSave,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { ColorPickerComponent } from '../../../components/color-picker/color-picker.component';
import { HexColor } from '../../../domain';
import { WorkspaceStateService } from '../../../state/workspace';
import { SaveButtonComponent } from './save-button/save-button.component';

@Component({
  imports: [FaIconComponent, ColorPickerComponent, SaveButtonComponent],
  selector: 'app-project-tools',
  templateUrl: './project-tools.component.html',
  styleUrl: './project-tools.component.scss',
})
export class ProjectToolsComponent {
  private workspaceStateService = inject(WorkspaceStateService);
  faSave = faSave;
  faHome = faHome;
  faShare = faShare;
  faDownload = faDownload;

  currentBackgroundColor = this.workspaceStateService.backgroundColor;

  onColorSelected(newColor: HexColor): void {
    this.workspaceStateService.setBackgroundColor(newColor);
  }
}
