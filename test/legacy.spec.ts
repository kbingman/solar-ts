import { 
  nBodyProblem, 
  updatePositionVectors, 
  updateAccelerationVectors, 
  updateVelocityVectors,
  updateBodies
} from '../src/legacy';
import { bodies } from '../src/bodies';

const G = 39.5;
const SOFTENING_CONSTANT = 0.15;
const DT = 0.008; //0.005 years is equal to 1.825 days

test('nbody updatePositionVectors', () => {
  const masses = JSON.parse(JSON.stringify(bodies));
  const nbody = new nBodyProblem({ masses, g: G, dt: DT, softeningConstant: SOFTENING_CONSTANT });
  const x = nbody.masses[3].x;
  nbody.updatePositionVectors()

  expect(x - nbody.masses[3].x).toBe(0.038806842004751374);
});

test('nbody updateAccelerationVectors', () => {
  const masses = JSON.parse(JSON.stringify(bodies));
  const nbody = new nBodyProblem({ masses, g: G, dt: DT, softeningConstant: SOFTENING_CONSTANT });
  const x = nbody.masses[3].ax || 0;
  nbody.updateAccelerationVectors()

  expect(x - nbody.masses[3].ax).toBe(24.595433864433154);
});

test('nbody updateVelocityVectors', () => {
  const masses = JSON.parse(JSON.stringify(bodies));
  const nbody = new nBodyProblem({ masses, g: G, dt: DT, softeningConstant: SOFTENING_CONSTANT });
  const x = nbody.masses[3].vx || 0;
  nbody.updateVelocityVectors()

  expect(x - nbody.masses[3].vx).toBe(0);
});

test('nbody', () => {
  const masses = JSON.parse(JSON.stringify(bodies));
  const nbody = new nBodyProblem({ masses, g: G, dt: DT, softeningConstant: SOFTENING_CONSTANT });
  const x = nbody.masses[3].x || 0;
  console.time('nbody');
  nbody
    .updatePositionVectors()
    .updateAccelerationVectors()
    .updateVelocityVectors();
  console.timeEnd('nbody');

  expect(x - nbody.masses[3].x).toBe(0.038806842004751374);
});

test('functional', () => {
  const masses = JSON.parse(JSON.stringify(bodies));
  const x = masses[3].x || 0;
  console.time('functional');
  updateBodies(G, SOFTENING_CONSTANT, DT)(masses);
  console.timeEnd('functional');

  expect(x - masses[3].x).toBe(0.038806842004751374);
});

test('updatePositionVectors', () => {
  const masses = JSON.parse(JSON.stringify(bodies));
  const x = masses[3].x;
  updatePositionVectors(DT, masses)

  expect(x - masses[3].x).toBe(0.038806842004751374);
});

test('updateAccelerationVectors', () => {
  const masses = JSON.parse(JSON.stringify(bodies));
  const x = masses[3].ax || 0;
  updateAccelerationVectors(G, SOFTENING_CONSTANT, masses)

  expect(x - masses[3].ax).toBe(24.595433864433154);
});

test('updateVelocityVectors', () => {
  const masses = JSON.parse(JSON.stringify(bodies));
  const x = masses[3].vx || 0;
  updateVelocityVectors(DT, bodies)

  expect(x - masses[3].vx).toBe(0);
});
