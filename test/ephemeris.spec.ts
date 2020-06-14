import { findEphemeris, openEphemeris } from '../src/ephemeris';

test('findEphemeris', async () => {
  const txt = await openEphemeris();
  const data = findEphemeris(txt);
  // console.log(data);
  expect(data.name).toBe('Oberon');
  expect(data.id).toBe('704');
});
