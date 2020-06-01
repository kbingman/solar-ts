export const updatePositionVectors = (dt: number, masses: any[]) => {
  for (const mass of masses) {
    mass.x += mass.vx * dt;
    mass.y += mass.vy * dt;
    mass.z += mass.vz * dt;
  }

  return masses;
};

export const updateAccelerationVectors = (
  g: number,
  softeningConstant: number,
  masses: any[]
) => {
  for (const massI of masses) {
    let ax = 0;
    let ay = 0;
    let az = 0;

    for (const massJ of masses) {
      if (massI !== massJ) {
        const dx = massJ.x - massI.x;
        const dy = massJ.y - massI.y;
        const dz = massJ.z - massI.z;

        const distSq = dx * dx + dy * dy + dz * dz;

        const f =
          (g * massJ.m) / (distSq * Math.sqrt(distSq + softeningConstant));

        ax += dx * f;
        ay += dy * f;
        az += dz * f;
      }
    }

    massI.ax = ax;
    massI.ay = ay;
    massI.az = az;
  }

  return masses;
};

export const updateVelocityVectors = (dt: number, masses: any[]) => {
  for (const massI of masses) {
    massI.vx += (massI.ax || 0) * dt;
    massI.vy += (massI.ay || 0) * dt;
    massI.vz += (massI.az || 0) * dt;
  }
  return masses;
};

export const updateBodies = (
  g: number,
  softeningConstant: number,
  dt: number
) => (masses: any[]) =>
  updateVelocityVectors(
    dt,
    updateAccelerationVectors(
      g,
      softeningConstant,
      updatePositionVectors(dt, masses)
    )
  );

/**
 * Gravitational n-body algorithm
 */
export class nBodyProblem {
  g: number;
  dt: number;
  softeningConstant: number;
  masses: any[];

  constructor(params: any) {
    this.g = params.g;
    this.dt = params.dt;
    this.softeningConstant = params.softeningConstant;

    this.masses = params.masses;
  }

  updatePositionVectors() {
    const massesLen = this.masses.length;

    for (let i = 0; i < massesLen; i++) {
      const massI = this.masses[i];

      massI.x += massI.vx * this.dt;
      massI.y += massI.vy * this.dt;
      massI.z += massI.vz * this.dt;
    }

    return this;
  }

  updateVelocityVectors() {
    const massesLen = this.masses.length;

    for (let i = 0; i < massesLen; i++) {
      const massI = this.masses[i];

      massI.vx += (massI.ax || 0) * this.dt;
      massI.vy += (massI.ay || 0) * this.dt;
      massI.vz += (massI.az || 0) * this.dt;
    }
  }

  updateAccelerationVectors() {
    const massesLen = this.masses.length;

    for (let i = 0; i < massesLen; i++) {
      let ax = 0;
      let ay = 0;
      let az = 0;

      const massI = this.masses[i];

      for (let j = 0; j < massesLen; j++) {
        if (i !== j) {
          const massJ = this.masses[j];

          const dx = massJ.x - massI.x;
          const dy = massJ.y - massI.y;
          const dz = massJ.z - massI.z;

          const distSq = dx * dx + dy * dy + dz * dz;

          const f =
            (this.g * massJ.m) /
            (distSq * Math.sqrt(distSq + this.softeningConstant));

          ax += dx * f;
          ay += dy * f;
          az += dz * f;
        }
      }

      massI.ax = ax;
      massI.ay = ay;
      massI.az = az;
    }

    return this;
  }
}
