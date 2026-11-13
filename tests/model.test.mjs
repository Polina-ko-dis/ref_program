import test from 'node:test';
import assert from 'node:assert/strict';
import {createInitialConfig, validateConfig, prepareConfig, readConfig, saveConfig, activateConfig, STORAGE_KEY} from '../src/model.mjs';

const memory = (initial) => {
  let value = initial;
  return {getItem: () => value, setItem: (_key, next) => {value = next;}};
};

test('disabled voucher and points fields do not block saving a draft', () => {
  const config = createInitialConfig('points');
  assert.deepEqual(validateConfig(config), {});
  assert.equal(saveConfig(memory(), config).config.saved, true);
});

test('selected voucher requires a category and unselected voucher does not', () => {
  const config = createInitialConfig();
  config.registration.voucher = true;
  assert.equal(Boolean(validateConfig(config)['registration.voucherId']), true);
  config.registration.voucherId = 'free-night';
  assert.deepEqual(validateConfig(config), {});
});

test('registration limit accepts integers 1 to 9999 and rejects empty and fractional limits', () => {
  const config = createInitialConfig();
  config.registration.limited = true;
  for (const value of [undefined, 0, -1, 1.5, 10000, NaN]) {
    config.registration.limit = value;
    assert.equal(Boolean(validateConfig(config)['registration.limit']), true, String(value));
  }
  for (const value of [1, 9999]) {
    config.registration.limit = value;
    assert.equal(validateConfig(config)['registration.limit'], undefined);
  }
});

test('saving the discount version removes hidden points data without mutating the form', () => {
  const config = createInitialConfig('discount');
  config.stay.points = true;
  config.stay.amount = 500;
  const saved = prepareConfig(config);
  assert.equal(saved.stay.points, false);
  assert.equal(saved.stay.amount, undefined);
  assert.equal(config.stay.amount, 500);
});

test('percentage reward cannot exceed 100 and fixed reward must be a positive integer', () => {
  const config = createInitialConfig('points');
  config.stay.points = true;
  config.stay.method = 'percent';
  config.stay.amount = 101;
  assert.ok(validateConfig(config)['stay.amount']);
  config.stay.amount = 10;
  assert.equal(validateConfig(config)['stay.amount'], undefined);
  config.stay.method = 'fixed';
  config.stay.amount = 1.2;
  assert.ok(validateConfig(config)['stay.amount']);
});

test('malformed saved state falls back to a usable initial form', () => {
  for (const raw of ['{broken', '{}', 'null', '{"kind":"points","registration":null}']) {
    const restored = readConfig(memory(raw));
    assert.equal(restored.kind, 'discount');
    assert.equal(restored.saved, false);
    assert.equal(restored.registration.voucher, false);
  }
});

test('activation requires a reward for permanent guests, not only invited guests', () => {
  const config = createInitialConfig();
  config.invited.voucher = true;
  config.invited.voucherId = 'free-night';
  const result = activateConfig(memory(), config);
  assert.ok(result.errors.rewards);
  assert.equal(config.status, 'inactive');
});

test('activation saves the current draft atomically and survives a reload', () => {
  const storage = memory();
  const config = createInitialConfig('points');
  config.registration.points = true;
  config.registration.amount = 250;
  const result = activateConfig(storage, config);
  assert.equal(result.config.status, 'active');
  assert.equal(result.config.registration.amount, 250);
  assert.equal(readConfig(storage).registration.amount, 250);
  assert.equal(readConfig(storage).status, 'active');
});

test('storage failure reports an error and leaves draft status unchanged', () => {
  const config = createInitialConfig();
  config.stay.upgrade = true;
  const result = activateConfig({setItem() {throw new Error('quota');}}, config);
  assert.ok(result.error);
  assert.equal(result.config, undefined);
  assert.equal(config.status, 'inactive');
});
