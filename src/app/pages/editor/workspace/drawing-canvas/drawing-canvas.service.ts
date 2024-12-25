import { Injectable, signal } from '@angular/core';
import { HexColor } from '../../../../domain';
import { ToolType } from './drawing-canvas-tools.types';
import {
  startPencilDrawing,
  stopPencilDrawing,
  updatePencilDrawing,
} from './drawing-canvas-utils/drawing-pencil.utils';
import { getEventOffset } from './drawing-canvas-utils';

@Injectable()
export class DrawingCanvasService {
  private canvas: HTMLCanvasElement | undefined;
  private canvasCtx: CanvasRenderingContext2D | undefined;

  private _currentTool = signal<ToolType>('pencil');
  currentTool = this._currentTool.asReadonly();

  private _currentColor = signal<HexColor>('#000000');
  currentColor = this._currentColor.asReadonly();

  private _currentSize = signal(10);
  currentSize = this._currentSize.asReadonly();

  private isMouseDown = false;

  setCurrentTool(newTool: ToolType): void {
    this._currentTool.set(newTool);
  }

  setCurrentSize(newSize: number): void {
    this._currentSize.set(newSize);
  }

  setCanvas(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) {
      throw new Error("Couldn't get context from canvas");
    }
    this.canvasCtx = canvasCtx;
  }

  setColor(newColor: HexColor): void {
    this._currentColor.set(newColor);
  }

  onMouseDown(event: MouseEvent): void {
    if (!this.canvasCtx || !this.canvas) {
      return;
    }
    this.isMouseDown = true;
    const eventPosition = getEventOffset(this.canvas, event);
    const currentColor = this.currentColor();
    switch (this.currentTool()) {
      case 'pencil': {
        startPencilDrawing(
          this.canvasCtx,
          eventPosition,
          currentColor,
          this.currentSize(),
        );
        break;
      }
    }
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.canvasCtx || !this.canvas) {
      return;
    }
    this.isMouseDown = false;
    const eventPosition = getEventOffset(this.canvas, event);
    const currentColor = this.currentColor();
    switch (this.currentTool()) {
      case 'pencil': {
        stopPencilDrawing(this.canvasCtx, eventPosition, currentColor);
        break;
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.canvasCtx || !this.isMouseDown || !this.canvas) {
      return;
    }
    const eventPosition = getEventOffset(this.canvas, event);
    const currentColor = this.currentColor();
    switch (this.currentTool()) {
      case 'pencil': {
        updatePencilDrawing(this.canvasCtx, eventPosition, currentColor);
        break;
      }
    }
  }
}
