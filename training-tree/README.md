# Training Codex

Static ES-module app at `/training-tree/`, in the existing GitHub Pages repository. No dependencies or hosting changes. GitHub Pages resolves the directory index on direct navigation and refresh; the bare route normally redirects to the trailing slash.

## Files
- `data.js`: public skill definitions, layout coordinates, prerequisite DAGs, curated October 2026 assessment and coaching sources.
- `logic.js`: evidence validation and derived progression state.
- `app.js`: graph interaction, accessible detail panel, assessment storage and timeline.
- `tree.css`: responsive artwork and motion preferences.

## Update workflow
Edit curated baseline/definitions in `data.js`, then run `npm test` and `npm run build` in this directory. Commit through a branch/PR. No bundling required. Publish by merging to the configured GitHub Pages source after review.

Browser updates are private to that origin/browser via localStorage. Export/import JSON under Methodology for backups and device transfers. Imports replace local evidence. Clearing browser data removes observations; curated baseline remains. No server writes or authentication are implied. Public source only includes the baseline explicitly requested for this app. No Drive data is fetched.

Each record: `{nodeId, date: 'YYYY-MM-DD', value: number|null, passed: boolean, note: string}`. Measurement alone never establishes form or completion. `passed` is an athlete attestation of the complete criterion. Three distinct successful dates confer mastery. Direct demonstrated evidence can complete a skill even when earlier foundations were not tested. Inferred prerequisites allow exploration but never count as verified completions. Active assessment paths remain available despite missing formal prerequisite testing.

Thresholds are coaching checkpoints, not universal validated prerequisites. No volume XP, deadlines, automatic proficiency score or fabricated historical unlock dates. Baseline month precision is retained. A backend can replace the localStorage adapter without changing definitions or pure progression logic; validate all server input and add owner authentication before allowing public writes.

## Validation
`npm test`: cycles, missing edges, multi-parent unlocking, accurate baseline states, import validation, repeated-date mastery handling and measurement-only observations.
`npm run build`: syntax checks. The production artifact is the checked-in static source itself.

Manual QA: both tabs, locked-node inspection, pan/zoom, focus navigation, evidence save/reload, export/import, mobile layout and reduced motion. No dependencies, external fonts, third-party scripts or proprietary game assets.
