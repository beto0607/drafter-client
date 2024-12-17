import { Injectable } from "@angular/core";

@Injectable()
export class WorkspaceResizeService {
  updateCanvasSize(canvas: HTMLCanvasElement): void {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
  }
}
