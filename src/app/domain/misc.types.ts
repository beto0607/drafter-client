export interface WithTimestamp {
  createdAt: string | undefined;
  modifiedAt: string | undefined;
  deletedAt: string | undefined;
}

export interface WithId {
  id: string;
}

export type HexColor = `#${string}`;

export interface Color {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}
