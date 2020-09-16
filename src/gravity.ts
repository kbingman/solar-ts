import { Body } from "./types";

/**
 * Updates vectors
 */
export const updatePositionVectors = (dt: number, masses: Body[]) => {
  for (const mass of masses) {
    mass.x += mass.vx * dt;
    mass.y += mass.vy * dt;
    mass.z += mass.vz * dt;
  }

  return masses;
};

/**
 * Updates acceleration vectors
 */
export const updateAccelerationVectors = (
  g: number,
  softeningConstant: number,
  masses: Body[]
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

/**
 * Updates velocities vectors
 */
export const updateVelocityVectors = (dt: number, masses: Body[]) => {
  for (const massI of masses) {
    massI.vx += (massI.ax || 0) * dt;
    massI.vy += (massI.ay || 0) * dt;
    massI.vz += (massI.az || 0) * dt;
  }
  return masses;
};

/**
 * Updates all bodies
 */
export const updateBodies = (
  g: number,
  softeningConstant: number,
  dt: number
) => (masses: Body[]) =>
  updateVelocityVectors(
    dt,
    updateAccelerationVectors(
      g,
      softeningConstant,
      updatePositionVectors(dt, masses)
    )
  );
