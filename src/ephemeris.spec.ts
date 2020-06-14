import { test, expect } from 'vitest';
import { findEphemeris, openEphemeris } from './ephemeris';

test('findEphemeris', async () => {
  const txt = await openEphemeris();
  const data = findEphemeris(txt);
  // console.log(data);
  expect(data.name).toBe('Oberon');
  expect(data.id).toBe('704');
});
