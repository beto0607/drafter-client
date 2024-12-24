import { IAsset, IElement, ITag } from '../../domain';
import { uuidv4 } from '../../utils';

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

export function duplicateElement(element: IElement): IElement {
  return {
    ...element,
    id: uuidv4(),
  };
}

export function removeAsset(
  elements: IElement[],
  elementId: IElement['id'],
  assetId: IAsset['id'],
): IElement[] {
  return elements.map((element) =>
    element.id !== elementId
      ? element
      : {
          ...element,
          assets: element.assets.filter(({ id }) => id !== assetId),
        },
  );
}

export function duplicateAsset(
  element: IElement,
  assetId: IAsset['id'],
): IElement {
  const asset = element.assets.find(({ id }) => id === assetId);
  if (!asset) {
    return element;
  }
  return {
    ...element,
    assets: [
      ...element.assets,
      {
        ...asset,
        id: uuidv4(),
      },
    ],
  };
}

export function deleteTag(tags: ITag[], tag: ITag): ITag[] {
  return tags.filter(
    (currentTag) =>
      !(currentTag.color === tag.color && currentTag.text === tag.text),
  );
}
