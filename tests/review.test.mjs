import test from 'node:test';
import assert from 'node:assert/strict';

import {clipReviewRect} from '../src/review.mjs';
const bounds = {left: 288, top: 48, right: 1280, bottom: 720};

test('review highlight is clipped below the fixed toolbar', () => {
  assert.deepEqual(clipReviewRect({left: 320, top: 20, right: 700, bottom: 80}, bounds),
    {left: 317, top: 48, width: 386, height: 35});
});

test('offscreen review targets produce no overlay', () => {
  assert.equal(clipReviewRect({left: 320, top: 800, right: 700, bottom: 900}, bounds), null);
});

test('review highlight remains inside a narrow viewport', () => {
  assert.deepEqual(clipReviewRect({left: 16, top: 80, right: 420, bottom: 800},
    {left: 0, top: 48, right: 390, bottom: 720}),
    {left: 13, top: 77, width: 377, height: 643});
});
