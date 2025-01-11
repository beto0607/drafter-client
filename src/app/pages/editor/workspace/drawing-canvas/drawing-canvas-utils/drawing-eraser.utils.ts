import { IPosition } from '../../../../../domain';

export function startEraserDrawing(
  canvasCtx: CanvasRenderingContext2D,
  event: IPosition,
  size: number,
): void {
  canvasCtx.globalCompositeOperation = 'destination-out';
  canvasCtx.lineWidth = size;
  canvasCtx.lineCap = 'square';
  canvasCtx.beginPath();
  canvasCtx.moveTo(event.x, event.y);
}
export function updateEraserDrawing(
  canvasCtx: CanvasRenderingContext2D,
  event: IPosition,
): void {
  canvasCtx.lineTo(event.x, event.y);
  canvasCtx.stroke();
}
export function stopEraserDrawing(
  canvasCtx: CanvasRenderingContext2D,
  event: IPosition,
): void {
  canvasCtx.moveTo(event.x, event.y);
  canvasCtx.stroke();
  canvasCtx.closePath();
  canvasCtx.globalCompositeOperation = 'source-over';
}
