import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CanvasResizeService } from '../services';
import { DrawingCanvasOpenerService } from './drawing-canvas-opener.service';
import { DrawingCanvasToolsComponent } from './drawing-canvas-tools/drawing-canvas-tools.component';
import { DrawingCanvasService } from './drawing-canvas.service';

@Component({
  imports: [DrawingCanvasToolsComponent],
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrl: './drawing-canvas.component.scss',
  providers: [CanvasResizeService, DrawingCanvasService],
})
export class DrawingCanvasComponent implements AfterViewInit {
  private canvasResizeService = inject(CanvasResizeService);
  private drawingCanvasService = inject(DrawingCanvasService);
  private drawingCanvasOpenerService = inject(DrawingCanvasOpenerService);

  private dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  brushSize = this.drawingCanvasService.currentSize;

  constructor() {
    this.drawingCanvasOpenerService.openDialog$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.openDialog();
      });

    effect(() => {
      const canvas = this.canvas()?.nativeElement;
      if (!canvas) {
        return;
      }
      this.drawingCanvasService.setCanvas(canvas);
    });
  }

  ngAfterViewInit(): void {
    const canvas = this.canvas()?.nativeElement;
    if (!canvas) {
      return;
    }
    const dialog = this.dialog().nativeElement;
    this.canvasResizeService.updateCanvasSizeToElement(canvas, dialog);
  }

  onMouseDown(event: MouseEvent): void {
    if ((event.target as HTMLElement).tagName !== 'CANVAS') {
      return;
    }
    event.preventDefault();
    this.drawingCanvasService.onMouseDown(event);
  }

  onMouseUp(event: MouseEvent): void {
    if ((event.target as HTMLElement).tagName !== 'CANVAS') {
      return;
    }
    event.preventDefault();
    this.drawingCanvasService.onMouseUp(event);
  }

  onMouseMove(event: MouseEvent): void {
    if ((event.target as HTMLElement).tagName !== 'CANVAS') {
      return;
    }
    event.preventDefault();
    this.drawingCanvasService.onMouseMove(event);
  }

  @HostListener('window:resize')
  private _onResizeWindow(): void {
    const canvas = this.canvas()?.nativeElement;
    if (!canvas) {
      return;
    }
    const dialog = this.dialog().nativeElement;
    this.canvasResizeService.updateCanvasSizeToElement(canvas, dialog);
  }

  private openDialog(): void {
    const dialogElement = this.dialog()?.nativeElement;
    if (!dialogElement) {
      return;
    }
    dialogElement.showModal();
    this._onResizeWindow();
  }
}
