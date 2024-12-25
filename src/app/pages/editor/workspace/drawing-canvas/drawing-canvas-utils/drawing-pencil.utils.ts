import { HexColor, IPosition } from '../../../../../domain';

export function startPencilDrawing(
  canvasCtx: CanvasRenderingContext2D,
  event: IPosition,
  color: HexColor,
  size: number,
): void {
  canvasCtx.strokeStyle = color;
  canvasCtx.lineWidth = size;
  canvasCtx.beginPath();
  canvasCtx.moveTo(event.x, event.y);
}

export function stopPencilDrawing(
  canvasCtx: CanvasRenderingContext2D,
  event: IPosition,
  _color: HexColor,
): void {
  canvasCtx.moveTo(event.x, event.y);
  canvasCtx.stroke();
  canvasCtx.closePath();
}

export function updatePencilDrawing(
  canvasCtx: CanvasRenderingContext2D,
  event: IPosition,
  _color: HexColor,
): void {
  canvasCtx.lineTo(event.x, event.y);
  canvasCtx.stroke();
}
