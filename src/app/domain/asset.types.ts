import { WithId, WithTimestamp } from "./misc.types";

export type VideoTypes = 'mp4';

export type ImageTypes = 'jpeg' | 'gif' | 'png' | 'webp';

export type AudioTypes = 'acc' | 'mp3';

export interface IAsset<Type = VideoTypes | ImageTypes | AudioTypes> extends WithTimestamp, WithId {
  url: string;
  type: Type
}
