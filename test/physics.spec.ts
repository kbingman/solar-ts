import {
  calcDeltas,
  calcForce,
  calcDistSquared,
  calcAcceleration,
  updateBodiesWithConstants,
} from '../src/physics';

import { bodies } from '../src/bodies';

import { Body as Nbody } from '../src/types';

const G = 39.5;
const SOFTENING_CONSTANT = 0.1;

const body1 = { name: 'body1', x: 0, y: 0, z: 0, m: 1, vx: 0, vy: 0, vz: 0 };
const body2 = { name: 'body2', x: 1, y: 2, z: 0, m: 1.1, vx: 0, vy: 0, vz: 0 };

test('calcDeltas', () => {
  expect(calcDeltas(body1, body2)).toEqual({ dx: 1, dy: 2, dz: 0 });
});

test('calculates the distance squared', () => {
  expect(calcDistSquared({ dx: 1, dy: 1, dz: 1 })).toEqual(3);
  expect(calcDistSquared({ dx: 2, dy: 1, dz: 1 })).toEqual(6);
  // t.is(calcDistSquared(2, 2, 2), 12);
  // t.is(calcDistSquared(3, 3, 1), 19);
});

test('calculates F', () => {
  expect(calcForce(G, SOFTENING_CONSTANT, 1, 1)).toBe(37.661772275200896);
});

test('calculate acceleration', () => {
  expect(calcAcceleration(1, SOFTENING_CONSTANT, body1, body2)).toEqual({
    vx: 0.09741763740941049,
    vy: 0.19483527481882099,
    vz: 0.09741763740941049,
  });
});

test('update bodies', () => {
  const updateBodies = updateBodiesWithConstants(1, SOFTENING_CONSTANT);
  // console.log(calcDistSquared(calcDeltas(body1, body2)));
  const bodies = updateBodies([body1, body2]);
  // console.log(calcDistSquared(calcDeltas(body1, body2)));

  expect(bodies[1].vx).toBe(-0.10517023508026825);
  expect(bodies[1].vy).toBe(-0.2103404701605365);
  expect(bodies[1].vz).toBe(-0.31551070524080477);
});

test('update bodies', () => {
  const updateBodies = updateBodiesWithConstants(G, SOFTENING_CONSTANT);
  const results = updateBodies(bodies as Nbody[]);

  expect(results[0].x).toBe(-0.00466650135019521);
  expect(results[0].vx).toBe(0.0004625920676439864);
});
