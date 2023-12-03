import { describe, test, expect } from 'vitest';
import {
  updatePositionVectors,
  updateAccelerationVectors,
  updateVelocityVectors,
  updateBodies,
} from '../src/physics';
import { planets } from '../src/bodies';

const G = 39.5;
const SOFTENING_CONSTANT = 0.15;
const DT = 0.008; //0.005 years is equal to 1.825 days

describe.skip(() => {
  test('functional', () => {
    const masses = JSON.parse(JSON.stringify(planets));
    const x = masses[3].position[0];
    updateBodies(G, SOFTENING_CONSTANT, DT)(masses);

    expect(x - masses[3].position[0]).toBe(-0.00013331230969529373);
  });

  test('updatePositionVectors', () => {
    const masses = JSON.parse(JSON.stringify(planets));
    const x = masses[1].position[0];
    updatePositionVectors(DT, masses);

    expect(x - masses[1].position[0]).toBe(-0.00013331230969529373);
  });

  test('updateAccelerationVectors', () => {
    const masses = JSON.parse(JSON.stringify(planets));
    const x = masses[1].ax || 0;
    updateAccelerationVectors(G, SOFTENING_CONSTANT, masses);

    expect(x - masses[1].ax).toBe(-6.055247336454543);
  });

  test('updateVelocityVectors', () => {
    const masses = JSON.parse(JSON.stringify(planets));
    const x = masses[1].vx || 0;
    updateVelocityVectors(DT, planets);

    expect(x - masses[1].vx).toBe(0);
  });
});
