import { Color, HexColor } from '../domain';

export function isHexColor(value: string): value is HexColor {
  return value.length === 7 && value[0] === '#';
}

export function colorToHex(value: Color): HexColor {
  const r = value.red.toString(16).padStart(2, '0');
  const g = value.green.toString(16).padStart(2, '0');
  const b = value.blue.toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
}

export function hexToColor(value: HexColor): Color {
  const red = parseInt(value.substring(1, 3), 16);
  const green = parseInt(value.substring(3, 5), 16);
  const blue = parseInt(value.substring(5, 7), 16);
  return {
    red,
    green,
    blue,
    alpha: 255,
  };
}

export function areColorsEqual(a: Color, b: Color): boolean {
  return (
    a.red === b.red &&
    a.blue === b.blue &&
    a.green === b.green &&
    a.alpha === b.alpha
  );
}
