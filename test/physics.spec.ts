import {
  calcDeltas,
  calcForce,
  calcDistSquared,
  calcAcceleration,
  updateBodies
} from '../src/physics';

const G = 39.5;
const SOFTENING_CONSTANT = 0.1;

const body1 = { x: 0, y: 0, z: 0, m: 1, ax: 0, ay: 0, az: 0 };
const body2 = { x: 1, y: 2, z: 0, m: 1.1, ax: 0, ay: 0, az: 0 };

test('calcDeltas', () => {
  expect(calcDeltas(body1, body2)).toEqual({ dx: 1, dy: 2, dz: 0 });
});

test('calculates the distance squared', () => {
  expect(calcDistSquared({ dx: 1, dy: 1, dz: 1 })).toEqual(3);
  // t.is(calcDistSquared(2, 2, 2), 12);
  // t.is(calcDistSquared(3, 3, 1), 19);
});

test('calculates F', () => {
  expect(calcForce(G, SOFTENING_CONSTANT, 1, 1)).toBe(37.661772275200896);
});

test('calculate acceleration', () => {
  expect(calcAcceleration(1, SOFTENING_CONSTANT, body1, body2)).toEqual({
    ax: 0.09741763740941049,
    ay: 0.19483527481882099,
    az: 0.09741763740941049,
  });
});

test('update bodies', () => {
  // console.log(calcDistSquared(calcDeltas(body1, body2)));
  const bodies = updateBodies(1, SOFTENING_CONSTANT, [body1, body2]);
  // console.log(calcDistSquared(calcDeltas(body1, body2)));

  expect(bodies[1].ax).toBe(-0.10517023508026825);
  expect(bodies[1].ay).toBe(-0.2103404701605365);
  expect(bodies[1].az).toBe(-0.31551070524080477);
});
