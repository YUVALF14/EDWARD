# Reign entries and objective record — experimental update

Six entry years: 1461, 1465, 1469, 1471, 1475, 1480. The 1465 settlement is the retained illustrative shortcut. Later entries simulate seeded alternate prehistory from that settlement through the actual event engine. They are explicitly NOT historically reconstructed snapshots. Generated decisions, relationships, disputes and records remain saved. The player starts with a recorded baseline, so generated history is not credited to them as player decisions. Entry preparation cannot overwrite autosaves midway through generation.

Each new reign opens with a manuscript-style typographic frontispiece and access to its preceding chronicle. The company identity and full-screen painted cinematic artwork are deferred; no fictional studio brand or placeholder art has been presented as finished artwork.

The menu and ending now expose the objective record: player card decisions, generated decisions, orders, resolved local incidents, promises, current officeholders, regional unrest, credit and authority changes from entry. Values are game model units, not historical measurements. Legacy saves report missing baselines as unknown. Epilogues are labelled conditional projections.

## 1,000 additional completed simulations

Reproduce: `node test_reign_1000.js` (Node, no packages). Raw results: `reign_1000_audit.json`.

500 matched seeds, each with two contrasting policies (left choices + conciliatory audiences; right choices + threats). Starts: 168 in 1461, 168 in 1465, and 166 in each of 1469, 1471, 1475, 1480. This is 1,000 runs from selected entries to the ending, not 1,000 complete 1461–1483 campaigns.

- 1,000 completed; zero failing assertions after repair.
- 3,742 JSON save/load checks of current-card identity and objective record.
- 78,720 checks against existing historical model invariants.
- Zero missing up/down testimony quotes.
- 79 distinct complete ending keys, but only three broad ending labels.
- All 500 paired policies produced different final states, event sequences and ending keys.
- 17–182 player decisions from the chosen entry.

The first test pass exposed an existing persistence bug: only `sb-` cards were recovered from the saved dynamic event. `dw-` and other generated cards could be discarded on repeated selection or load. The engine now rebuilds the saved dynamic event and checks its actual identifier, preserving the currently open hearing regardless of prefix. The failing pass is not counted as successful coverage.

## Balance findings: still unresolved

All 1,000 tested runs reached the broad **fractured realm** category. 938 ended indebted, 59 strained and three creditworthy. Warwick led the household influence ranking in 917 runs. This is strong convergence in broad dimensions despite the other differences; 79 keys do not mean 79 wholly distinct authored endings.

The two fixed test policies are deliberately contrasting, not optimal strategies. These results suggest reviewing cumulative unrest, credit recovery, influence saturation and ending thresholds. They do not establish that a peaceful outcome is impossible. No thresholds were changed merely to improve the diversity statistics. All reigns still stop at 1483 by design.

## Verification limits

Node simulations, actual rendering-function checks with DOM objects, and compiled-script syntax validation. No real browser rendering, iPhone Safari interaction, visual screenshots or audio listening were available. The automated historical audit checks a limited set of existing invariants, not comprehensive historical accuracy. Existing save schema 10, manual slots, historical content, five-second card interval and all underlying systems remain in place.
