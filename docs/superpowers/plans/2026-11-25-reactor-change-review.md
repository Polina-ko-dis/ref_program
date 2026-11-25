# Reactor corrections and change comments

**Goal:** Apply the reviewed Reactor corrections and let a developer inspect each change on the page through a floating toggle.

**Design:** Keep React 19, Reactor 0.0.226 and the existing page. Use the standard Tile header, page-title, paragraph/subtitle, Tile padding, Label and Separator. A small floating “Что изменилось” button opens one nonmodal comment at a time, with before/after values and a reason. Previous/next controls scroll to and outline all instances of that change. No screen dimming, interception of form input, or persisted review state. Closing the mode removes its outlines. Comments can be collapsed while the outline remains visible. The user explicitly delegated the annotation design, so proceed without another approval round.

**Architecture:** `ChangeReview.jsx` owns the temporary review state and observes target geometry; `review.mjs` holds the six comments and rectangle clipping; `change-review.css` styles only the review controls. Existing form behavior and storage remain unchanged. Keep the current checkout and dependencies; use branch `codex/reactor-change-review` because the user requested edits to this project.

## Tasks

- [x] Restore standard Reactor typography, Tile spacing, Label and Separator; remove unused extra font imports.
- [x] Add six contextual comments, floating toggle, next/previous navigation, collapse, Escape close and clipped highlights that track scrolling/resizing.
- [x] Verify clipping against offscreen targets, viewport edges and the scroll container with focused unit tests. Verify the UI in the browser at desktop/mobile widths, including form interaction, mode close and missing introduction after saving.
- [x] Run the full model/geometry test suite and production build, get one independent code review, and document the resulting behavior and validation.

## Review focus

- Highlights must not cover the fixed top bar or leak beyond the workspace scroll container.
- Narrow screens must retain usable comment controls without horizontal overflow.
- Comment mode must not alter saved form values or block pointer input to highlighted controls.
- After the introductory card disappears, navigation must skip its missing targets.
- Scroll/resize listeners and observers must be cleaned up when the mode closes.

## Progress

- Baseline: 11 model tests passed. The checkout was clean. Created the branch with the approved filesystem escalation.
- Geometry tests: observed all three fail before implementation, then all 14 model/geometry tests passed. Build with Vite native configLoader succeeded; the default config bundler was blocked by sandbox directory access.
- Browser: all six comments; computed typography and Tile padding match Reactor; collapse/expand; form limit checkbox and number input remain usable; Save skips the removed introduction; Escape removes the comment and outlines; 390×844 has no horizontal overflow.
- Independent review found one layout invalidation edge in a tall viewport. Reproduced at 1280×1800 (workspace/content both 1752 px, missing introduction remained in count), then added observation of the intrinsic main page height. Mobile reveal now scrolls targets 16 px below the workspace top, above the comment.
- Repeated the tall viewport sequence after the fix: count changed from 2/6 to 2/5 on Save; Next opened Tile spacing (3/5), skipping Introduction. Restored initial local demo data and reset the viewport override. Final suite: 14/14. Production build succeeded; only the existing bundle-size warning remains. No deferred review findings.
- Publication must preserve the new guest-card source and the guest-card directory already deployed on gh-pages; fetched origin/main changes b85f8fc before integrating.
