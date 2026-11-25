# Guest Card Reactor Alignment Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Correct the eight Reactor discrepancies from the approved audit in the local guest-card prototype.

**Architecture:** Keep the current mock data and demo actions. Replace duplicated UI with Reactor components and remove their superseded CSS.

**Tech Stack:** React 19.3.0, Reactor 0.0.226, Vite 6.4.2.

**Spec:** The audit in this chat and the user's instruction to fix its discrepancies locally only.

## Global Constraints

- Work in the existing local checkout. Do not create branches, commit, push, or publish.
- Keep the referral-program prototype unchanged.
- Pin Table and Scaffold dependencies to versions using Reactor 0.0.226.
- Preserve guest editing and the demonstration behavior of accumulation and voucher actions.
- Verify visual changes in a browser; do not add implementation-mirroring tests for this presentation refactor.

## Review Focus

- All operation rows, comments, empty cells, and level tags remain visible.
- Date, number, currency, and percentage formatting uses the initialized Reactor locale.
- All three modals retain their controls, standard actions, and narrow-screen usability.
- The selected menu item, nested sections, mobile navigation, and help remain usable.
- The local app builds and loads without duplicated React contexts or missing assets.

### Task 1: Standard page content

**Files:** `guest-card/package.json`, `guest-card/pnpm-lock.yaml`, `guest-card/src/GuestCardPage.jsx`, `guest-card/src/data.mjs`, `guest-card/src/main.jsx`.

- [x] Add compatible `@reactor/table` and `@reactor/scaffold-ui` dependencies.
- [x] Replace the custom table with `Table`; keep its eight columns and all mock operations.
- [x] Use the standard title typography, Tile spacing, and DataWidgetLayout.
- [x] Store dates as timestamps and format visible values through `@reactor/intl`.

### Task 2: Standard modal composition

**Files:** `guest-card/src/modals.jsx`, `guest-card/src/App.jsx`.

- [x] Use Label for form labels, neutral helper text, and ModalWindow actions for save/apply and cancel.
- [x] Keep form state, controls, and cancel behavior; use Reactor formatting for dates and balances.

### Task 3: Standard scaffold and verification

**Files:** `guest-card/src/Navigation.jsx`, `guest-card/src/App.jsx`, `guest-card/src/styles.css`, `README.md`.

- [x] Replace the custom shell, sidebar, ribbon, and admin marker with Scaffold components.
- [x] Remove obsolete CSS and the extra weight-300 font imports.
- [x] Run the guest-card build and the repository test suite.
- [x] Start the local guest-card server and inspect the page, history, menu, and three modals on desktop and a narrow viewport.
- [x] Leave the local preview running and report its URL; do not publish.

## Verification

- `pnpm build` in `guest-card/`: passed. Upstream Sass deprecations and the bundle-size warning remain.
- `pnpm test` at repository root: 14 passed, 0 failed.
- Browser checks at 1280×720 and 390×844: 21 operation rows, eight columns, 40/48 title typography, horizontal table scrolling, mobile menu close, form save/cancel, voucher selection/apply, calendar selection/save, accumulation apply, and help close.
- Local server: `http://127.0.0.1:4177/#/GuestCard`; no publication or Git operations changing branch/history.

## Review Decisions

- Use the low-level Scaffold and ribbon views because ScaffoldShell's user menu expects a server script absent from the local prototype.
- Reset Scaffold on mobile menu selection through its React key; parent guest state is retained and the page returns to the top.
- Format all date-only timestamps explicitly in UTC, matching DatePicker.
- SelectField and DatePickerField are display primitives; use Select and DatePicker to include their popups.
- Keep existing demonstration persistence and accumulation/voucher no-ops. Upstream missing-key warnings in Reactor components are outside the local UI refactor; vendor files remain unchanged.

## Approved Follow-ups

- Move the information alert inside the operation-history tile, above the table.
- Remove the widget-group background and outer padding while retaining the native responsive layout and 24px gaps.
- Render the three operation icons through one Icon component with the accent token; preserve the level-change comment hint.
- The user approved pushing and publishing on 2026-11-25, superseding the initial local-only restriction.
- Final pre-publication checks: 14 repository tests passed; the guest-card GitHub Pages build passed.
