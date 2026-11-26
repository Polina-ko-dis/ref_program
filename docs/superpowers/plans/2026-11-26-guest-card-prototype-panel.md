# Guest Card Prototype Panel Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans in the existing local checkout.

**Goal:** Add the referral page's floating program and accumulation selectors to the guest card, retaining the original panel.

**Architecture:** Keep the selected kind and accumulation in the guest-card App. A focused PrototypePanel uses native Reactor Select and IconButton controls and the existing panel's visual treatment. Guest-card data and variants remain unchanged until the next request.

**Tech Stack:** React 19.3.0, Reactor 0.0.226, Vite 6.4.2.

**Spec:** The user's request and confirmation to retain the panel on both pages on 2026-11-26.

## Constraints

- Work locally; do not commit, push or publish this addition.
- Preserve the referral program's existing panel, example filling, reset and save behavior.
- Reuse the two program choices and three accumulation choices with the same labels.
- Retain selections while hiding and reopening the new panel; support presentation mode.
- Do not change guest-card content when selecting a future variant.

## Task: Add and verify the panel

- [x] Confirm the guest card has no prototype panel.
- [x] Add PrototypePanel, App state and responsive styling; keep it behind guest windows.
- [x] Verify both program choices, all accumulation choices, hide/reopen, presentation mode, and narrow layout.
- [x] Preserve the original referral panel, run the repository tests and both builds, and update README.

## Verification

- RED: no prototype aside existed on the guest card. GREEN: the new native selectors are rendered and switch values.
- Browser: discount/points and money/nights/mixed choices, hide/reopen with selections retained, suspension during the invited-guests sidebar, and presentation-mode trigger passed.
- Mobile 390×844: the panel fits inside the viewport without horizontal overflow. The temporary viewport override was reset.
- Original referral source is unchanged (`git diff -- src` is empty). Its existing panel and form actions are retained; a separate runtime smoke check timed out, so preservation is verified from the unchanged source and passing build rather than that browser tab.
- Repository suite: 14 tests passed. Both production builds passed with the existing bundle-size warning.
- Independent focused review: no actionable findings.
- No commit, push or publication was performed for this addition.

## Follow-up: Keep settings above all windows

- The user's next request supersedes the original behind-windows/suspension behavior: the panel, collapsed trigger and choices now stay above sidebars, modals, hints and snackbars.
- A dedicated pointer-transparent layer at z-index 1700 preserves interaction with the page outside the toolbar.
- Local popups compose public Reactor SelectField, SelectPopup and TileSurface components. Native global Select/Hint windows outside a sidebar close it through Reactor's window manager, so settings avoid those registrations.
- Choice popups close on selection, outside pointerdown, Escape or focus leaving. Toolbar icon buttons use native titles and accessible labels instead of global HintWindow popups.
- No dependency, global portal or Reactor window-manager changes are needed.
- Verified in the browser: changing either selector preserves the open sidebar; selectors also remain usable above the accumulation modal. Hide/reopen, outside click, Escape inside a popup and focus-leave dismissal preserve the sidebar.
- Mobile 390×844: panel and open choices stay inside the viewport, and selecting a value preserves the sidebar. The viewport override was reset.
- All 16 repository tests pass; `git diff --check` passes. The installed Vite production build passes with the existing chunk-size warning. It was invoked directly because `pnpm build` attempted a dependency reinstall; no reinstall or security-setting change was made.
- The changes remain local and unpublished.
