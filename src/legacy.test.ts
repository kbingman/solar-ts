import { describe, test, expect } from 'vitest';
import {
  updatePositionVectors,
  updateAccelerationVectors,
  updateVelocityVectors,
  updateBodies,
} from './legacy';
import { bodies } from './bodies';

const G = 39.5;
const SOFTENING_CONSTANT = 0.15;

describe('physics', () => {
  test('updatePositionVectors', () => {
    // console.log(updatePositionVectors(1, bodies));
  });

  test('updateAccelerationVectors', () => {
    console.log(updateAccelerationVectors(G, SOFTENING_CONSTANT, bodies));
  });
});
