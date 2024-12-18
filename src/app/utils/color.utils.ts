import { HexColor } from '../domain';

export function isHexColor(value: string): value is HexColor {
  return value.length === 7 && value[0] === '#';
}
