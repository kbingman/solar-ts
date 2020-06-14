import { describe, test, expect } from 'vitest';
import {
  updatePositionVectors,
  updateAccelerationVectors,
} from './physics';
import { planets } from './bodies';

const G = 39.5;
const SOFTENING_CONSTANT = 0.15;

describe('physics', () => {
  test('updatePositionVectors', () => {
    expect(updatePositionVectors(1, planets)[0]).toEqual({
      name: 'Sun',
      color: 'yellow',
      m: 1,
      position: [
        -0.005137171274636994, 0.006983306435237695, 0.0000605746545589308,
      ],
      velocity: [
        -0.000008077856797797696, -0.000003712057754231977,
        2.325966506827774e-7,
      ],
      accelleration: [0, 0, 0],
    });
  });

  test('updateAccelerationVectors', () => {
    expect(
      updateAccelerationVectors(G, SOFTENING_CONSTANT, planets)[0]
    ).toEqual({
      name: 'Sun',
      color: 'yellow',
      m: 1,
      position: [
        -0.005137171274636994, 0.006983306435237695, 0.0000605746545589308,
      ],
      velocity: [
        -0.000008077856797797696, -0.000003712057754231977,
        2.325966506827774e-7,
      ],
      accelleration: [
        0.00048212324221185153, -0.001716377855023952, -0.000006971793438640271,
      ],
    });
  });
});
