import { Component, effect, ElementRef, HostListener, inject, viewChild } from "@angular/core";
import { WorkspaceStateService } from "../../../state/workspace";
import { WorkspaceDrawerService } from "./workspace-drawer.service";
import { WorkspaceResizeService } from "./workspace-resize.service";

@Component({
  selector: 'app-workspace',
  imports: [],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  providers: [
    WorkspaceResizeService,
    WorkspaceDrawerService]
})
export class WorkspaceComponent {
  private workspaceStateService = inject(WorkspaceStateService);
  private workspaceDrawerService = inject(WorkspaceDrawerService)
  private workspaceResizeService = inject(WorkspaceResizeService)

  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    effect(() => {
      const canvas = this.canvas()
      if (!canvas) {
        return;
      }
      this.workspaceResizeService.updateCanvasSize(canvas.nativeElement)
      this.workspaceDrawerService.setCanvas(canvas.nativeElement)
    })

    effect(async () => {
      this.drawProject()
    })
  }

  @HostListener("window:resize")
  private _onResizeWindow(): void {
    console.log('onResizeWindow')
    const canvas = this.canvas()
    this.workspaceResizeService.updateCanvasSize(canvas.nativeElement)
    this.drawProject()
  }

  private async drawProject(): Promise<void> {
    const project = this.workspaceStateService.project()
    console.log(project)
    if (!project) {
      return;
    }
    this.workspaceDrawerService.drawProject(project)
  }
}

