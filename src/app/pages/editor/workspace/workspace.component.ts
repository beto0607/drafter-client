import { Component, effect, ElementRef, inject, viewChild } from "@angular/core";
import { WorkspaceStateService } from "../../../state/workspace";
import { WorkspaceDrawerService } from "./workspace-drawer.service";

@Component({
  selector: 'app-workspace',
  imports: [],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  providers: [WorkspaceDrawerService]
})
export class WorkspaceComponent {
  private workspaceStateService = inject(WorkspaceStateService);
  private workspaceDrawerService = inject(WorkspaceDrawerService)
  private canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    effect(() => {
      const canvas = this.canvas()
      if (!canvas) {
        return;
      }
      this.workspaceDrawerService.setCanvas(canvas.nativeElement)
    })

    effect(async () => {
      this.drawProject()
    })
  }

  private async drawProject(): Promise<void> {
    const project = this.workspaceStateService.project()
    console.log(project)
    if (!project) {
      return;
    }
    this.workspaceDrawerService.drawProjectBackground(project.backgroundColor)

    for (const element of project.elements) {
      await this.workspaceDrawerService.drawElement(element)
    }
  }
}

