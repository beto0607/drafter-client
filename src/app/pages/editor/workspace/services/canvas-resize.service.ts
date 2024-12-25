import { Injectable } from '@angular/core';

@Injectable()
export class CanvasResizeService {
  updateCanvasSize(canvas: HTMLCanvasElement): void {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }

  updateCanvasSizeToElement(
    canvas: HTMLCanvasElement,
    targetElement: HTMLElement,
  ): void {
    const { width, height } = targetElement.getBoundingClientRect();
    const padding = 6;
    canvas.height = height - padding;
    canvas.width = width - padding;
  }
}
