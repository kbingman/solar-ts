import { PointMass, Vector } from './types';

/**
 * Updates vectors
 */
export const updatePositionVectors = <B extends PointMass>(
  dt: number,
  masses: B[]
) => {
  for (const mass of masses) {
    for (const i in mass.position) {
      mass.position[i] += mass.velocity[i] * dt;
    }
  }

  return masses;
};

/**
 * Updates acceleration vectors
 *
 * @param {number} g - the gravitational constant
 * @param {number} softeningConstant - the softening constant
 * @param {Body[]} masses
 *
 */
export const updateAccelerationVectors = <B extends PointMass>(
  g: number,
  softeningConstant: number,
  masses: B[]
) => {
  for (const massI of masses) {
    let accl = [0, 0, 0] as Vector;

    for (const massJ of masses) {
      if (massI !== massJ) {
        const dist = massJ.position.map(
          (position, i) => position - massI.position[i]
        ) as Vector;

        const distSq = dist.reduce((sum, d) => sum + d * d, 0);

        const f =
          (g * massJ.m) / (distSq * Math.sqrt(distSq + softeningConstant));

        accl = dist.map((d, i) => (accl[i] += d * f)) as Vector;
      }
    }

    massI.accelleration = accl;
  }
  return masses;
};

/**
 * Updates velocities vectors
 *
 * @param {number} dt - the timestep
 * @param {Body[]} masses - the bodies
 */
export const updateVelocityVectors = <B extends PointMass>(
  dt: number,
  masses: B[]
) => {
  for (const mass of masses) {
    mass.velocity = mass.velocity.map(
      (v, i) => v + mass.accelleration[i] * dt
    ) as Vector;
  }
  return masses;
};

/**
 * Updates all bodies
 *
 * @param {number} g - the gravitational constant
 * @param {number} softeningConstant - the softening constant
 * @param {number} dt - the timestep
 *
 * @returns updated bodies
 */
export const updateBodies = <B extends PointMass>(
  g: number,
  softeningConstant: number,
  dt: number
): ((masses: B[]) => B[]) => {
  return (masses: B[]) =>
    updateVelocityVectors(
      dt,
      updateAccelerationVectors(
        g,
        softeningConstant,
        updatePositionVectors(dt, masses)
      )
    );
};
