import { Component, inject } from '@angular/core';
import { IconComponent } from '../../../components';
import { ColorPickerComponent } from '../../../components/color-picker/color-picker.component';
import { HexColor } from '../../../domain';
import { WorkspaceStateService } from '../../../state/workspace';
import { SaveButtonComponent } from './save-button/save-button.component';

@Component({
  imports: [IconComponent, ColorPickerComponent, SaveButtonComponent],
  selector: 'app-project-tools',
  templateUrl: './project-tools.component.html',
  styleUrl: './project-tools.component.scss',
})
export class ProjectToolsComponent {
  private workspaceStateService = inject(WorkspaceStateService);

  currentBackgroundColor = this.workspaceStateService.backgroundColor;

  onColorSelected(newColor: HexColor): void {
    this.workspaceStateService.setBackgroundColor(newColor);
  }
}
