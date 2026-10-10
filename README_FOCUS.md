# EDWARD — Focused Reading (experimental demo)

This build retains the complete historical-political simulation and adds a **progressive-disclosure reading layer** to reduce text overload without deleting the original writing.

## How to read

- **FOCUS (default):** one plain-language line of dialogue, one sentence of stakes, and short action labels. All **36 story beats** and **4 conditional crossover hearings** have individually authored short versions. Other dynamic and 1461–1464 cards use a conservative sentence-based excerpt of their existing dialogue, not a newly invented narrative.
- **STORY:** the original dramatic speech, with a short explanation of the stakes.
- **FULL:** the original speech, original political context, and recent report when available.
- Tap **FOCUS ▾** on the card or **Aa** in the header to cycle through modes. Reading preference is stored locally and does not reset the timer or change any game decision.
- Tap **Read more** for four optional layers: full testimony and original choice wording, political context and causal trigger, a glossary of relevant technical terms, and historical background / research reference. The modal can be opened even during the ten-second decision lock.
- The **Cases** panel now leads with six collapsible story titles; crossovers, earlier dossiers and historical notes are folded beneath them rather than crowding the initial view.

The original story text, historical anchors, choices, relationship calculations, event scheduling, delayed third choice, biographies, atlas, original audio, save slots and exports are unchanged. New plain-language lines are **interpretive paraphrases of fictional dialogue**, not archival quotations. The full hearing is always available.

## Files

- `focus.js`: 40 authored summaries, reading modes, details, glossary, casebook reordering.
- `focus.css`: readable mobile typography and disclosure styles.
- `index.template.html` and `build.py`: include the two new assets in the single-file HTML.
- `test_focus.py`: verifies modes, complete text, overlays, unchanged turn count, save slots, Casebook, 390×844 / 375×667 / 320×568 layouts, and completion to 1483.
- `story_audit.js` / `story_invariants.js`: unchanged simulation test harnesses.

## Validation

- 2,000 complete simulation runs: 0 engine failures, 40 authored event definitions, 36 unique arc beat IDs encountered, average 34.05 story hearings per full run (not every authored scene appears in every game).
- 100 invariant runs: 7,600 decisions, no duplicate crossover, chronological records and save migration verified.
- Playwright Chromium mobile at three phone viewport sizes: all passed; tests confirm full text is accessible and all three modes work without changing a decision or resetting the reading lock.
- Also tested a complete 1461–1483 playthrough and the existing save/biography/atlas test suite.
- **Physical Safari/iPhone has not been tested.** Open the HTTPS GitHub Pages version in Safari, not a file preview.

## Build

```bash
python build.py
node story_audit.js 2000
node story_invariants.js
python test_focus.py
python test_story_ui.py
python test_enhancements.py
```

This remains an experimental course-project demo, not v1.0. Narrative speeches and counterfactual decisions are dramatizations; historically documented anchors are separately identified.
