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

export type PointMass = {
  m: number;
  position: Vector;
  velocity: Vector;
  accelleration: Vector;
};

export type Planet = PointMass & {
  name: string;
  color: string;
};

export type Vector = [x: number, y: number, z: number];
