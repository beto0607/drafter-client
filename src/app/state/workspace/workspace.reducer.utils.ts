import { IAsset, IElement, ITag } from '../../domain';

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
    id: 'f3536c1b-cf17-4370-a2e3-894f2c35c3a3',
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
        id: 'f685a523-5dea-407a-b169-a6f562e5b4f4',
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
