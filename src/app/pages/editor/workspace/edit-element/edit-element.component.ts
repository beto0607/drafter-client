import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { TitleInputComponent } from '../../../../components';
import { IElement } from '../../../../domain';
import { WorkspaceStateService } from '../../../../state/workspace';

@Component({
  imports: [TitleInputComponent],
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrl: './edit-element.component.scss',
})
export class EditElementComponent {
  private workspaceStateService = inject(WorkspaceStateService);

  elementId = input<IElement['id'] | undefined>();

  element = computed(() => this.computeElement());

  finishedEditing = output();

  private dialogElement = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const elementId = this.elementId();
      if (!elementId) {
        this.closeDialog();
        return;
      }
      this.showDialog();
    });
  }

  onTitleChanged(newTitle: string): void {
    const elementId = this.elementId();
    if (!elementId) {
      return;
    }

    this.workspaceStateService.updateElementTitle(elementId, newTitle);
  }

  private showDialog(): void {
    const dialogElement = this.dialogElement();
    if (!dialogElement) {
      return;
    }
    dialogElement.nativeElement.showModal();
    dialogElement.nativeElement.addEventListener('close', () => {
      console.log('haaahahhhhh');
      this.finishedEditing.emit();
    });
  }

  private closeDialog(): void {
    const dialogElement = this.dialogElement();
    if (!dialogElement) {
      return;
    }
    dialogElement.nativeElement.close();
  }

  private computeElement(): IElement | undefined {
    const elementId = this.elementId();
    const elements = this.workspaceStateService.elements();
    return elements?.find(({ id }) => id === elementId);
  }
}
