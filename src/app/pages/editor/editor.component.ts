import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { ProjectNameComponent } from './project-name/project-name.component';
import { ProjectToolsComponent } from './project-tools/project-tools.component';
import { WorkspaceComponent } from './workspace/workspace.component';

@Component({
  imports: [
    LogoComponent,
    WorkspaceComponent,
    ProjectToolsComponent,
    ProjectNameComponent,
  ],
  styleUrl: './editor.component.scss',
  templateUrl: './editor.component.html',
})
export class EditorComponent {}
