import { IAsset } from './asset.types';
import { IPosition, IRotation, ISize } from './geom.types';
import { WithId, WithTimestamp } from './misc.types';
import { ITag } from './tag.types';

export interface IElement extends WithTimestamp, WithId {
  position: IPosition;
  size: ISize;
  rotation: IRotation;
  title: string;
  locked: boolean;
  tags: ITag[];
  assets: IAsset[];
  caption: string; // Markdown?
}
