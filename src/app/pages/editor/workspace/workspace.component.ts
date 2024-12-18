import { Component, effect, ElementRef, HostListener, inject, signal, viewChild } from "@angular/core";
import { WorkspaceStateService } from "../../../state/workspace";
import { WorkspaceDrawerService } from "./workspace-drawer.service";
import { WorkspaceResizeService } from "./workspace-resize.service";
import { IElement, IPosition } from "../../../domain";
import { isPositionInRect } from "../../../utils/geom.utils";
import { SetElementsPositionType } from "../../../state/workspace/workspace.actions.types";

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

  private selectedElements = signal<IElement['id'][]>([])

  private updatedViewWhileMouseDown = false;

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

  onMouseDown(event: MouseEvent): void {
    const clickPosition: IPosition = {
      x: event.x,
      y: event.y
    }

    const project = this.workspaceStateService.project();
    if (!project) {
      return;
    }
    const clickedElement = [...project.elements].reverse().find((element) => isPositionInRect(clickPosition, { ...element.size, ...element.position }))

    if (!clickedElement) {
      this.selectedElements.set([])
      return
    }

    const multipleElements = event.ctrlKey || event.shiftKey
    if (!multipleElements && this.selectedElements().includes(clickedElement.id)) {
      return
    }
    this.selectedElements.update((selectedElements) => {
      if (selectedElements.includes(clickedElement.id)) {
        return multipleElements ?
          selectedElements.filter((elementId) => clickedElement.id !== elementId) : []
      }
      return [...selectedElements, clickedElement.id];
    })
  }

  onMouseUp(_event: MouseEvent): void {
    if (this.updatedViewWhileMouseDown) {
      this.selectedElements.set([])
    }
    this.updatedViewWhileMouseDown = false;
  }

  onMouseMove(event: MouseEvent): void {
    const selectedElements = this.selectedElements()
    if (!selectedElements.length || event.buttons !== 1) {
      return
    }
    const updates: SetElementsPositionType = [];
    const elements = this.workspaceStateService.project()?.elements ?? [];
    for (const selectedElement of selectedElements) {
      const element = elements.find(({ id }) => id === selectedElement)
      if (!element) {
        continue;
      }
      const newPosition: IPosition = {
        x: event.x - Math.round(element.size.width / 2),
        y: event.y - Math.round(element.size.height / 2),
      }
      updates.push({
        elementId: element.id,
        newPosition
      })
    }
    if (updates.length) {
      this.updatedViewWhileMouseDown = true;
      this.workspaceStateService.updateElementsPosition(updates)
    }
  }

  @HostListener("window:resize")
  private _onResizeWindow(): void {
    const canvas = this.canvas()
    this.workspaceResizeService.updateCanvasSize(canvas.nativeElement)
    this.drawProject()
  }

  private async drawProject(): Promise<void> {
    const project = this.workspaceStateService.project()
    if (!project) {
      return;
    }
    const selectedElements = this.selectedElements()
    requestAnimationFrame(() => {
      this.workspaceDrawerService.drawProject(project, selectedElements)

    })
  }
}

