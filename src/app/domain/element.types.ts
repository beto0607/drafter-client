import { AudioTypes, IAsset, ImageTypes, VideoTypes } from "./asset.types";
import { IPosition, IRotation, ISize } from "./geom.types";
import { WithId, WithTimestamp } from "./misc.types";
import { ITextFormat } from "./text_format.types";

export interface IElement extends WithTimestamp, WithId {
  type: 'image' | 'video' | 'audio' | 'text' | 'group'
  position: IPosition;
  size: ISize;
  rotation: IRotation;
  name: string;
  locked: boolean;
  tags: string[];
}

export interface IImageElement extends IElement {
  type: 'image'
  asset: IAsset<ImageTypes>;
}

export interface IVideoElement extends IElement {
  type: 'video';
  assset: IAsset<VideoTypes>;
}

export interface IAudioElement extends IElement {
  type: 'audio';
  assset: IAsset<AudioTypes>;
}

export interface ITextElement extends IElement {
  type: 'text';
  content: string;
  format: ITextFormat
}

export interface IGroupElement extends IElement {
  type: 'group';
  children: IElement[]
}
