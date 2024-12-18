import { WithId, WithTimestamp } from './misc.types';

export type LinkAssetType = 'youtube' | 'pinterest' | 'facebook' | 'instagram';

export type VideoAssetType = 'mp4';

export type ImageAssetType = 'jpeg' | 'gif' | 'png' | 'webp';

export type AudioAssetType = 'acc' | 'mp3';

export type OneOfAssetType =
  | LinkAssetType
  | VideoAssetType
  | AudioAssetType
  | ImageAssetType;

export interface IAsset<Type = OneOfAssetType> extends WithTimestamp, WithId {
  url: string;
  type: Type;
}
