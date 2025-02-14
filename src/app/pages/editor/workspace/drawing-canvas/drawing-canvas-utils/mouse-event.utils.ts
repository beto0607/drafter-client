import { IPosition } from '../../../../../domain';

export function getEventOffset(
  canvas: HTMLCanvasElement,
  event: MouseEvent,
): IPosition {
  const { x, y } = canvas.getBoundingClientRect();
  const newX = Math.round(event.x - x);
  const newY = Math.round(event.y - y);
  return { x: newX, y: newY };
}
