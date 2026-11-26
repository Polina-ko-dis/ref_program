# Guest Card Points Variant Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans in the existing local checkout.

**Goal:** Implement the four requested guest-card changes when the prototype panel selects the points program.

**Architecture:** Pass the program kind from App to GuestCardPage and conditionally render the action, loyalty detail, balance and table columns. Use fixed mock point transactions on numeric booking rows, totaling the displayed 5500 balance; do not generate new random values during rendering.

**Tech Stack:** React 19.3.0, Reactor 0.0.226, @reactor/table 0.0.154, Node test runner.

**Spec:** The user's four-item request on 2026-11-26.

## Constraints

- Preserve the discount-program view and all existing sidebar and prototype-panel changes.
- Keep the accumulation-type selector unchanged; only the program-kind selector controls this variant.
- Add the wallet action; its form is not specified, so clicking shows a prototype-only notice instead of pretending to change the balance.
- In the guest-card widget, replace the discount detail with a loyalty-level detail without a discount percentage.
- Insert the 5500 points balance first in accumulation details.
- Replace both discount columns with one points column only in the points variant.
- Only numeric booking rows receive mock point amounts; their total must be exactly 5500.
- Keep all changes local; do not commit, push or publish.

## Task: Implement and verify the variant

- [x] Write and run a failing test for the 5500 points fixture; confirm the wallet action is absent before implementation.
- [x] Add fixed transaction amounts and balance, connect the selected kind and render the four conditional changes.
- [x] Verify the points view, all row sums and the unchanged discount view in the browser, including narrow screens.
- [x] Run all repository tests, build the guest card, update README and obtain a focused review.

## Verification

- RED: the fixture lacked the 5500 balance and the points wallet action was absent. GREEN: both new fixture tests pass and the native wallet action appears only for the points program.
- Browser: the points view has 7 matching columns, no discount headers, 14 numeric booking rows summing to exactly 5500, and empty point cells for non-booking operations.
- Switching back restores 8 matching discount columns and removes the points balance and wallet action.
- Mobile 390×844: the wallet button fits within the viewport and the document has no horizontal overflow. The temporary viewport override was reset after inspection.
- Repository suite: 16 tests passed. Guest-card production build passed with the existing bundle-size warning.
- Independent focused review: no findings; the reviewer also reran the 2 fixture tests successfully.
- Changes remain local, including the previously approved prototype panel; no commit, push or publication was performed.
