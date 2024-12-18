import { IAudioElement, IElement, IGroupElement, IImageElement, ITextElement, IVideoElement } from "../domain";

export function isImageElement(element: IElement): element is IImageElement {
  return element.type === 'image' && 'asset' in element;
}

export function isVideoElement(element: IElement): element is IVideoElement {
  return element.type === 'video' && 'asset' in element;
}

export function isTextElement(element: IElement): element is ITextElement {
  return element.type === 'text' && 'content' in element;
}

export function isAudioElement(element: IElement): element is IAudioElement {
  return element.type === 'audio' && 'content' in element;
}

export function isGroupElement(element: IElement): element is IGroupElement {
  return element.type === 'group' && 'children' in element;
}
