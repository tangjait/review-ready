

# ReviewPrep Enhancement Plan

This plan adds 12 major features to the ReviewPrep MVP while preserving the existing dark navy + amber/gold design system.

## Overview

The enhancements transform ReviewPrep from a basic demo into a polished, feature-rich MVP that demonstrates real value to engineering managers. All data remains mock/localStorage-based.

---

## Phase 1: Data & Infrastructure

### 1.1 Expand Mock Data & Types (`src/data/mockData.ts`)
- Add 3 more employees (8 total) across varied roles, teams, risk levels, and statuses
- Add `previousReview` field to `Employee` interface (previous cycle metrics for comparison view)
- Add `reviewHistory` array with 2-3 past review entries per employee
- Add `checklist` object tracking review readiness items per employee
- Add `tone` field for selected tone preference
- Add `smartPrompts` object (notable projects, specific feedback, development goals)
- Add `timeSavedMinutes` field per employee

### 1.2 localStorage Persistence (`src/hooks/usePersistedState.ts`)
- Create a custom hook wrapping `useState` with `localStorage` read/write
- Use for: employee data edits, checklist state, theme preference, manager notes

### 1.3 Theme System (`src/hooks/useTheme.ts` + `src/index.css`)
- Add light mode CSS variables under a `.light` class in `index.css`
- Light mode: white background, navy text, gold accents
- Create `useTheme` hook reading/writing `localStorage`
- Apply `dark`/`light` class to `<html>` element

---

## Phase 2: Dashboard Enhancements (`src/pages/Index.tsx`)

### 2.1 Top Navigation Bar
- Add a nav bar with ReviewPrep logo/title on the left
- Light/dark mode toggle button on the right (Sun/Moon icon)
- Smooth CSS transition on theme switch

### 2.2 Search & Filter Bar
- Search input filtering by name, role, team
- Dropdown filters: Status (All/Not Started/In Progress/Completed), Risk Level (All/Low/Medium/High)
- Show "X of Y employees" result count

### 2.3 Time Tracking Enhancement
- Expand the "Hours Saved" stat card to show a breakdown tooltip or sub-section
- Add a visual progress bar: "Manual: 24h vs AI: 3.6h" comparison
- Show "Total time saved this cycle" prominently

### 2.4 Bulk Operations
- Add checkbox on each employee row for multi-select
- "Select All" checkbox in the header
- Floating action bar appears when items selected: "Generate All Summaries", "Export All", "Mark Complete"
- Progress bar shown during bulk generation (simulated)

### 2.5 Quick Actions on Employee Cards
- Add action icon buttons on hover/focus for each employee row:
  - Calendar icon: opens a pre-filled meeting template (modal with copyable text)
  - Mail icon: opens email template modal for peer feedback request
  - Checkmark icon: marks review as completed
- Actions appear as small icon buttons to the left of the chevron

### 2.6 Checklist Completion on Dashboard
- Add a small progress indicator on each employee card showing checklist completion %
- Aggregate checklist stats in dashboard overview

---

## Phase 3: Review Page Enhancements (`src/pages/ReviewPage.tsx`)

### 3.1 Tone Selector
- Add a dropdown (Select component) above the "Generate" button
- Options: Balanced, Growth-focused, Performance Improvement, Promotion-ready
- Selected tone stored in state; visually reflected in the generate button label
- After generation, show which tone was used as a badge

### 3.2 Smart Prompts
- Add expandable "Add Context" section before generation
- Three optional fields: "Notable projects", "Specific feedback to address", "Development goals achieved"
- Collapsible by default, expands with a click
- Data feeds into the mock generation (simulated)

### 3.3 Enhanced Inline Editing
- Make ALL AI-generated sections editable (Performance Summary, Key Accomplishments, Highlights, Areas for Growth)
- Each section gets an "AI-generated" or "AI-generated, manager-edited" badge
- Add "Regenerate this section" button (sparkle icon) per section
- Click-to-edit with save/cancel controls

### 3.4 Review Readiness Checklist
- Expandable checklist panel on the review page
- 5 items: 1:1 notes reviewed, Project contributions documented, Peer feedback collected, Goals updated, Discussed with HRBP
- Checkboxes with completion progress bar
- State persisted to localStorage

### 3.5 Comparison View
- "Compare to Last Review" toggle button
- When active, shows side-by-side panels: Current vs Previous cycle
- Metrics comparison with arrow indicators (up/down/same)
- Goal completion, peer score, projects delta
- Color-coded: green for improvement, red for decline, gray for same

### 3.6 Export Functionality
- Two buttons in the review page header: "Export PDF" and "Copy to Clipboard"
- **PDF Export**: Use browser `window.print()` with a print-specific CSS stylesheet that renders a clean, HR-ready document with company logo placeholder, formatted sections, and proper typography
- **Copy to Clipboard**: Generates markdown-formatted text of the full review (summary, accomplishments, highlights, growth areas, manager notes) and copies to clipboard with a toast confirmation

### 3.7 Review History
- "View Past Reviews" expandable section at the bottom of the review page
- Timeline view showing 2-3 previous review entries with dates
- Click to expand and see the historical summary, metrics snapshot
- Shows progression trend over time

---

## Phase 4: New Components

| Component | File | Purpose |
|-----------|------|---------|
| ThemeToggle | `src/components/ThemeToggle.tsx` | Sun/Moon toggle button |
| SearchFilter | `src/components/SearchFilter.tsx` | Search bar + filter dropdowns |
| BulkActions | `src/components/BulkActions.tsx` | Floating bar for batch operations |
| QuickActions | `src/components/QuickActions.tsx` | Action buttons on employee cards |
| ToneSelector | `src/components/ToneSelector.tsx` | Tone dropdown for review generation |
| SmartPrompts | `src/components/SmartPrompts.tsx` | Context fields before generation |
| ReviewChecklist | `src/components/ReviewChecklist.tsx` | Readiness checklist with progress |
| ComparisonView | `src/components/ComparisonView.tsx` | Side-by-side review comparison |
| ExportButtons | `src/components/ExportButtons.tsx` | PDF export + clipboard copy |
| ReviewHistory | `src/components/ReviewHistory.tsx` | Historical review timeline |
| EditableSection | `src/components/EditableSection.tsx` | Extracted from ReviewPage, enhanced with badges + regenerate |

---

## Technical Details

- **No new dependencies needed** -- PDF export uses `window.print()` with print CSS; clipboard uses `navigator.clipboard.writeText()`
- **Theme**: `next-themes` is already installed and will be used for the light/dark toggle
- **localStorage**: All persistence uses a simple `usePersistedState` hook
- **Print CSS**: Added as `@media print` rules in `index.css` to format a clean document
- **Responsive**: All new components use existing Tailwind responsive patterns (sm/lg breakpoints)
- **Animations**: Framer Motion for new section transitions, matching existing patterns

