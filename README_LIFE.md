# Living Realm / Guided Court — experimental update

## Changes

- Fixed the reported empty up/down quotations: `lcInstall` now rewrites only actual choice labels (left/right/wait). Council/private navigation retains its title. Down now displays the correct direction. Arena quotation functions are evaluated consistently; testimony has protected space and a return-to-hearing button.
- Seven fictional, state-connected life incidents: damaged harvest, delayed cargo, steward's fever, market fire, household marriage, unpaid garrison and a growing fair. Incidents have region/season eligibility, pressure-weighted probability, cooldowns and delayed reports. Each produces an actionable hearing with distinct council and private testimony. Funding/refusal alters money, credit, relationships or unrest, feeding existing crises.
- Random state, pending incidents, resolved consequences and early-period unrest are saved. The stream advances once per main decision, not when opening menus or loading. These are finite weighted rules, not an unlimited life simulation.
- Royal Initiative now records actual immediate before/after effects. The expandable What changed panel follows requests, conversations, appointments and dismissals. Delayed consequences still arrive through existing reports and crises.
- Added a six-step tutorial on first play, with harmless decision practice, an example council/private hearing and explanations of initiative, consequences, reading modes and saving. Skip/replay from the menu. No tutorial practice changes the reign.
- Added a searchable Encyclopedia as its own menu entry and navigation tab: people, court profiles, institutions, documented chronology with existing source links, and clearly labelled simulation mechanics.
- Removed decorative menu glyphs/emoji, added text controls and warm manuscript-leaf styling. Existing original vector portraits and vignettes remain.
- Replaced the repeating music pattern with an original modal score: plucked/reed synthesis, room resonance, limiting, phrase rests, different scene patterns, tension-linked pacing and a saved volume setting. Starts only on user interaction. Interpretation, not historically authentic instrumentation.

## Validation and limitations

`node test_living_court.js` runs the prior 13 focused checks and 280 simulations with the new life layer loaded. `node test_life.js` checks seed/save determinism, regional/seasonal weighting, the suspended hearing, funded/refused outcomes, measurable initiative effects, and executes the affected button-rendering function against DOM objects. It also runs 80 full reigns and checks every encountered up/down testimony.

A regression exposed yearly court funds not being synchronized when a life card bypassed the normal card selector. The life selector now performs the same lazy court migration before showing a saved/pending incident.

The full JavaScript bundle is syntax checked. Browser control remains unavailable, so these tests do not verify layout, sound quality or touch behaviour on a real browser/iPhone Safari. The score requires listening QA. The incidents, effects and probabilities are explicitly fictional modelling. No real historical person is killed by the fever event.

The existing five-second reading pause and schema-10 saves are retained. Build with `python3 build.py`.
