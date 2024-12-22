import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { IElement, IPosition } from '../../../domain';
import { WorkspaceStateService } from '../../../state/workspace';
import { SetElementsPositionType } from '../../../state/workspace/workspace.actions.types';
import { EditElementComponent } from './edit-element/edit-element.component';
import { ElementComponent } from './element/element.component';
import {
  ELEMENT_MIN_HEIGHT,
  ELEMENT_MIN_WIDTH,
  RESIZE_ICON_SIZE,
} from './workspace-drawer.constants';
import { WorkspaceDrawerService } from './workspace-drawer.service';
import { WorkspaceResizeService } from './workspace-resize.service';

@Component({
  selector: 'app-workspace',
  imports: [ElementComponent, EditElementComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
  providers: [WorkspaceResizeService, WorkspaceDrawerService],
})
export class WorkspaceComponent {
  private workspaceStateService = inject(WorkspaceStateService);
  private workspaceDrawerService = inject(WorkspaceDrawerService);
  private workspaceResizeService = inject(WorkspaceResizeService);

  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  selectedElements = signal<IElement['id'][]>([]);
  editingElementId = signal<IElement['id'] | undefined>(undefined);

  private updatedViewWhileMouseDown = false;
  private isResizing = false;

  private eventOffset: IPosition | undefined;

  elements = computed(
    () => this.workspaceStateService.project()?.elements ?? [],
  );

  constructor() {
    effect(() => {
      const canvas = this.canvas();
      if (!canvas) {
        return;
      }
      this.workspaceResizeService.updateCanvasSize(canvas.nativeElement);
      this.workspaceDrawerService.setCanvas(canvas.nativeElement);
    });

    effect(async () => {
      this.drawProject();
    });
  }

  onElementClicked(element: IElement): void {
    const selectedElements = this.selectedElements();
    if (selectedElements.includes(element.id)) {
      return;
    }
    this.selectedElements.update((elements) => [...elements, element.id]);
  }

  onMouseDown(event: MouseEvent): void {
    const clickPosition: IPosition = {
      x: event.x,
      y: event.y,
    };

    const project = this.workspaceStateService.project();
    if (!project) {
      return;
    }
    if (this.isResizing) {
      return;
    }
    const selectedElements = this.selectedElements();
    const clickedElement = project.elements.find(({ id }) =>
      selectedElements.includes(id),
    );
    if (!clickedElement) {
      this.selectedElements.set([]);
      return;
    }
    this.eventOffset = {
      x: clickPosition.x - clickedElement.position.x,
      y: clickPosition.y - clickedElement.position.y,
    };
  }

  onResizePressed(element: IElement): void {
    this.selectedElements.set([element.id]);
    this.isResizing = true;
  }

  onEditElement(element: IElement): void {
    this.selectedElements.set([element.id]);
    this.editingElementId.set(element.id);
  }

  onFisnishedEditing(): void {
    this.editingElementId.set(undefined);
  }

  onMouseUp(_event: MouseEvent): void {
    if (this.updatedViewWhileMouseDown) {
      this.selectedElements.set([]);
    }
    this.updatedViewWhileMouseDown = false;
    this.isResizing = false;
  }

  onMouseMove(event: MouseEvent): void {
    const editingElement = this.editingElementId();
    if (editingElement) {
      return;
    }
    const selectedElements = this.selectedElements();
    if (!selectedElements.length || event.buttons !== 1) {
      return;
    }
    const eventPosition = { x: event.x, y: event.y };
    if (this.isResizing) {
      if (selectedElements.length === 1) {
        this.resizeSelectedElement(selectedElements[0], eventPosition);
      }
      return;
    }
    this.moveSelectedElements(selectedElements, eventPosition);
  }

  private resizeSelectedElement(
    elementId: IElement['id'],
    eventPosition: IPosition,
  ): void {
    const project = this.workspaceStateService.project();
    const elementToUpdate = project?.elements.find(
      ({ id }) => elementId === id,
    );
    if (!elementToUpdate) {
      return;
    }
    this.workspaceStateService.updateElementSize(elementId, {
      width: Math.max(
        Math.abs(elementToUpdate.position.x - eventPosition.x),
        ELEMENT_MIN_WIDTH,
      ),
      height: Math.max(
        Math.abs(elementToUpdate.position.y - eventPosition.y) -
          RESIZE_ICON_SIZE,
        ELEMENT_MIN_HEIGHT,
      ),
    });
  }

  private moveSelectedElements(
    selectedElements: IElement['id'][],
    eventPosition: IPosition,
  ): void {
    const updates: SetElementsPositionType = [];
    const elements = this.workspaceStateService.project()?.elements ?? [];
    for (const selectedElement of selectedElements) {
      const element = elements.find(({ id }) => id === selectedElement);
      if (!element) {
        continue;
      }
      const newPosition: IPosition = {
        x: eventPosition.x - (this.eventOffset?.x ?? 0),
        y: eventPosition.y - (this.eventOffset?.y ?? 0),
      };
      updates.push({
        elementId: element.id,
        newPosition,
      });
    }
    if (updates.length) {
      this.updatedViewWhileMouseDown = true;
      this.workspaceStateService.updateElementsPosition(updates);
    }
  }

  @HostListener('window:resize')
  private _onResizeWindow(): void {
    const canvas = this.canvas();
    this.workspaceResizeService.updateCanvasSize(canvas.nativeElement);
    this.drawProject();
  }

  private async drawProject(): Promise<void> {
    const project = this.workspaceStateService.project();
    if (!project) {
      return;
    }
    const selectedElements = this.selectedElements();
    requestAnimationFrame(() => {
      this.workspaceDrawerService.drawProject(project, selectedElements);
    });
  }
}
