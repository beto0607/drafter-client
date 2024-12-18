import { IPosition, ISize } from "../domain";

export function isPositionInRect(point: IPosition, rect: IPosition & ISize): boolean {
  return rect.x <= point.x && (rect.x + rect.width) >= point.x &&
    rect.y <= point.y && (rect.y + rect.height) >= point.y;
}
