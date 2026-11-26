# Invited Guests Sidebar Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan in the current local checkout.

**Goal:** Open a Reactor sidebar from the invited-guests link and reproduce the supplied mockup.

**Architecture:** Keep visibility in App's existing window state. A focused InvitedGuestsSidebar component renders SidebarWindow, a progress summary and one read-only guest section using Reactor primitives.

**Tech Stack:** React 19.3.0, Reactor 0.0.226, @reactor/intl 1.0.155, Vite 6.4.2.

**Spec:** The screenshot and direct implementation request in this chat on 2026-11-26.

## Global Constraints

- Preserve all existing uncommitted guest-card changes and the running local preview.
- Keep implementation local until publication is explicitly requested; the user approved publishing on 2026-11-26.
- Use SidebarWindow's native header, close icon, scrolling and actions footer.
- Use the approved follow-up progress values: 1 registered guest, 1 stayed guest, 0 vouchers with an orange Tag, and 3 nights accrued instead of points.
- Keep one guest example with registration date 24.11.2026, confirmed email and stay, and reward text «начислено 3 ночи».
- Format numbers and date-only timestamps through @reactor/intl in UTC.

## Review Focus

- The invited-guests link opens the sidebar without affecting guest editing.
- The close button, header close icon and Escape close it; reopening shows the complete content.
- Header and footer remain usable while the long guest list scrolls.
- Narrow screens have no horizontal overflow; guest details adapt to a single column.
- Guest links provide a prototype-only notice rather than navigating to an unrelated or invented URL.

## Task 1: Complete sidebar flow

**Files:** `guest-card/src/InvitedGuestsSidebar.jsx`, `guest-card/src/data.mjs`, `guest-card/src/App.jsx`, `guest-card/src/GuestCardPage.jsx`, `guest-card/src/styles.css`.

**Interface:** `InvitedGuestsSidebar({open, onClose, onOpenGuest})`; `GuestCardPage` forwards `onOpenInvitedGuests` to the accumulation widget.

- [x] Verify the current link does not render the requested progress header.
- [x] Add the screenshot's mock progress and guest data.
- [x] Implement the native sidebar, summary and responsive guest details, and connect the link.
- [x] Verify opening, all close paths, reopening, guest-link feedback and mobile scrolling in the browser.
- [x] Run `pnpm test`, build `guest-card/`, and check the diff.
- [x] Review the focused diff and leave the local sidebar open for inspection.

## Verification

- RED: the original invited-guests click produced no progress header. GREEN: the sidebar initially matched all three screenshot examples; subsequent approved edits reduce the list to one guest and update the progress values.
- Browser: footer close, header close, Escape, reopening at the top and guest-link notification passed.
- Mobile 390×844: all guests reachable by body scrolling, footer stays visible, no horizontal overflow.
- Keyboard: Enter opens the sidebar; Escape closes it and returns focus to the initiating link. A ref-based close handler fixes the older pinned Windows package's missing focus restoration without modifying vendor files.
- Independent focused review: no actionable important or minor findings.
- Repository suite: 14 passed. Local guest-card build: passed, with the existing dependency deprecations and bundle-size warning.
- Follow-up browser checks: non-circular filled Tags, single-line invitation link on desktop and at 390px, one guest with the approved date and reward, and exact updated progress values passed. The zero-voucher Tag uses the Reactor orange palette.
- Pre-publication verification: 14 tests passed and `pnpm build:pages` succeeded on 2026-11-26.
