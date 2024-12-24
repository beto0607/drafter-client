import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../../../components';
import { DrawingCanvasService } from './drawing-canvas.service';

@Component({
  imports: [IconComponent],
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrl: './drawing-canvas.component.scss',
})
export class DrawingCanvasComponent {
  private drawingCanvasService = inject(DrawingCanvasService);

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    this.drawingCanvasService.openDialog$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        console.log('subs');
        this.openDialog();
      });
  }

  private openDialog(): void {
    const dialogElement = this.dialog()?.nativeElement;
    if (!dialogElement) {
      return;
    }
    console.log('dialog.showModal');
    dialogElement.showModal();
  }
}
