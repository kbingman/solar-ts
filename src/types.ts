export interface Body {
  name: string;
  color?: string;
  m: number;
  r?: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  ax?: number;
  ay?: number;
  az?: number;
}

export interface Delta {
  dx: number;
  dy: number;
  dz: number;
}
