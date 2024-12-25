import { IPosition } from '../../../../../domain';

export function getEventOffset(
  canvas: HTMLCanvasElement,
  event: MouseEvent,
): IPosition {
  const { x, y } = canvas.getBoundingClientRect();
  return {
    x: event.x - x,
    y: event.y - y,
  };
}
