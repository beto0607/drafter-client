import { Injectable } from '@angular/core';
import { HexColor, IElement, IProject } from '../../../domain';
import { drawFillRect } from '../../../utils/canvas.utils';

@Injectable()
export class WorkspaceDrawerService {
  private canvas: HTMLCanvasElement | undefined;
  private canvasCtx: CanvasRenderingContext2D | undefined;

  setCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    const canvasCtx = this.canvas.getContext('2d');
    if (!canvasCtx) {
      throw new Error("Couldn't get context from canvas");
    }
    this.canvasCtx = canvasCtx;
    this.canvasCtx.font = '24px serif';
  }

  async drawProject(
    project: IProject,
    _selectedElements: IElement['id'][],
  ): Promise<void> {
    this.drawProjectBackground(project.backgroundColor);
  }

  private drawProjectBackground(color: HexColor): void {
    if (!this.canvasCtx || !this.canvas) {
      throw new Error('Canvas context not set');
    }
    drawFillRect(
      this.canvasCtx,
      {
        x: 0,
        y: 0,
        width: this.canvas.width,
        height: this.canvas.height,
      },
      color,
    );
  }
}
