import { IElement } from '../../domain';

export function updateElement(
  elements: IElement[],
  elementId: IElement['id'],
  key: keyof IElement,
  newValue: IElement[keyof IElement],
): IElement[] {
  return elements.map((element) =>
    element.id === elementId ? { ...element, [key]: newValue } : element,
  );
}
