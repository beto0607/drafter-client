import { IElement } from './element.types';
import { HexColor, WithId, WithTimestamp } from './misc.types';

export interface IProject extends WithTimestamp, WithId {
  name: string;
  elements: IElement[];
  backgroundColor: HexColor;
}
