export interface Body {
  name: string;
  m: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color?: string;
  r?: number;
  ax?: number;
  ay?: number;
  az?: number;
  active?: boolean;
}

export interface Delta {
  dx: number;
  dy: number;
  dz: number;
}
