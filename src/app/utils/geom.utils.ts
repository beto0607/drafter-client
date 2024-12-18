import { IElement, IPosition, ISize } from '../domain';
import {
  ELEMENT_NAME_OFFSET,
  SELECTED_ELEMENT_PADDING,
} from '../pages/editor/workspace/workspace-drawer.constants';

export function isPositionInRect(
  point: IPosition,
  rect: IPosition & ISize,
): boolean {
  return (
    rect.x <= point.x &&
    rect.x + rect.width >= point.x &&
    rect.y <= point.y &&
    rect.y + rect.height >= point.y
  );
}

export function getBoundingRect(element: IElement): IPosition & ISize {
  return {
    x: element.position.x - SELECTED_ELEMENT_PADDING,
    y: element.position.y - ELEMENT_NAME_OFFSET - SELECTED_ELEMENT_PADDING,
    width: element.size.width + SELECTED_ELEMENT_PADDING * 2,
    height:
      element.size.height +
      SELECTED_ELEMENT_PADDING * 2 +
      ELEMENT_NAME_OFFSET * 2,
  };
}
