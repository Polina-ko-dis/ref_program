import test from 'node:test';
import assert from 'node:assert/strict';
import {accumulations, operations} from '../guest-card/src/data.mjs';

test('numeric booking operations add up to the guest points balance of 5500', () => {
  assert.equal(accumulations.pointsBalance, 5500);
  const bookings = operations.filter(operation => /^\d+$/.test(operation.label));
  assert.ok(bookings.length > 0);
  assert.ok(bookings.every(operation => Number.isInteger(operation.points) && operation.points > 0));
  assert.equal(bookings.reduce((total, operation) => total + operation.points, 0), accumulations.pointsBalance);
});

test('non-booking operations do not receive mock point transactions', () => {
  for (const operation of operations.filter(operation => !/^\d+$/.test(operation.label))) {
    assert.equal(operation.points, undefined);
  }
});
