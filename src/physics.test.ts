import { describe, test, expect } from 'vitest';
import {
  updatePositionVectors,
  updateAccelerationVectors,
  updateVelocityVectors,
  updateBodies,
} from './physics';
import { planets } from './bodies';

const G = 39.5;
const SOFTENING_CONSTANT = 0.15;

describe('physics', () => {
  test.skip('updatePositionVectors', () => {
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
        -0.005129093417839196, 0.006987018492991927, 0.00006034205790824802,
      ],
      velocity: [
        -0.000008077856797797696, -0.000003712057754231977,
        2.325966506827774e-7,
      ],
      accelleration: [
        -0.000018177005128062863, -0.00010593081119597778, 5.214104876603709e-9,
      ],
    });
  });
});
