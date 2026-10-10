# EDWARD IV — Interwoven Chronicles (experimental demo)

This is a **playable extension**, not v1.0, of the historical-political card game EDWARD. It retains the 1461–1464 authored introduction, autonomous 1465–1483 simulation, 1484–1485 contingent aftermath, tap/swipe controls, mobile layout, optional original music, atlas, biographies, 10-second reading lock, later deliberation choice, and local save/export system.

## The change

Instead of adding more unrelated generic petitions, the game now schedules **six interdependent narrative arcs with six authored beats each** (36 scenes), plus **four conditional crossover scenes** that exist only when earlier choices create a joint political crisis (40 authored scene definitions total).

| Chronicle | Approximate span | Core tensions |
| --- | --- | --- |
| The Kingmaker's Price | 1465–1472 | Warwick's authority, Neville affinity, household appointments, diplomacy, reconciliation vs confrontation |
| The Queen's Door | 1465–1478 | Elizabeth Woodville's kin, wardship, access, patronage, disputed revenues (requires the Elizabeth marriage route) |
| The Northern Inheritance | 1465–1478 | Percy–Neville claims, rents, garrisons, enforceability of royal writs |
| Letters from Caister | 1467–1476 | Paston family, Duke of Norfolk, Fastolf inheritance, physical possession vs legal title |
| The Two Shores | 1466–1477 | Calais trade, Warwick's French diplomacy, Burgundy, royal credit, the 1475 French choice |
| The Blood and the Seal | 1468–1482 | Clarence, Neville marriage politics, inherited estates, allegations, guardianship and succession |

**Conditional crossovers:** two doors at Westminster (queen's kin + confidential diplomacy), a northern writ (Percy restoration + Neville ultimatum), two empty chests (continental expedition + domestic royal garrison), and two guardianships (overlapping concentrated guardianships).

## How it works

- `story_scenes.js`: 36 detailed first-person narrative beats with **two authored alternatives each**, and distinct choice effects. A scene's text is selected by earlier choices, household grievances, and other chronicle flags.
- `story_crossovers.js`: four one-off hearings whose eligibility requires **specific combinations** of decisions from different stories. They do not fire on a fixed date.
- `story_engine.js`: scheduler (max two narrative hearings per year), state transitions, delayed information, remembered rulings, relationship effects, occasional independent retaliation, and a conditional ending epilogue.
- `story_ui.js`: six unfolding histories and conditional crossovers in **Cases**, with individual decisions and historical-source links. Realm map annotations reflect Caister, northern title and French policy decisions.
- All decisions still use the existing `engine.js` choice pipeline. A third, delayed course remains available in eligible hearings and has a genuine political cost.
- Each chronicle has `stage`, `dueYear`, `inFlight`, `lastChoice`, `lastOutcome` and `lastSerial` persisted in the save file. World flags, actors' grievances, trust, unrest, royal credit, title transfers and reports feed into future situations.
- The game does **not** reveal private actions to the player automatically. A separate truth ledger and courier reports preserve partial information.
- When an older save is opened partway through the reign, historical story beats from earlier years are skipped instead of being presented anachronistically.

### What it is **not**

This is a deterministic, seeded **rule-based story engine**, not a generative language model. Forty authored scene definitions and 72+ alternate narrative variants are not forty dynamically written new historical records. The 1465–1483 period still ends at a fixed date, and generic sandbox cards still appear between story hearings. **Distinct numerical ending keys are not distinct literary endings.** No historical outcome is guaranteed by the real-world timeline (e.g., Warwick's 1470 betrayal or Clarence's execution).

## Historical grounding

Historical anchors are distinct from **invented speech, letters, specific commissions, and counterfactual decisions**:

- Edward IV, Warwick's changing allegiance, 1475 Picquigny: https://www.royal.uk/edward-iv
- Caister Castle, Fastolf/Paston title and 1469 seizure: https://historicengland.org.uk/listing/the-list/list-entry/1287573
- Paston correspondence and protracted legal dispute: https://www.bbc.co.uk/history/british/middle_ages/pastonletters_01.shtml
- Percy restoration and Neville displacement: https://www.historyofwar.org/articles/battles_barnet.html
- Clarence, inherited estates, grants and parliamentary attainder: https://www.cambridge.org/core/journals/historical-journal/article/abs/i-attainder-and-forfeiture-1453-to-15091/1EA8D0EFB954878797B941400045B969
- Edward IV's French diplomacy and 1475 propaganda: https://academic.oup.com/histres/article-abstract/83/220/253/5609937

Six local estates in the Deep World submodel remain **fictional demonstration properties**, not historic locations. The coastline atlas is geographic, not a 15th-century jurisdictional map.

## Build and test

```
python build.py
node story_audit.js 2000
node story_causality.js 250
python test_story_ui.py
python test_enhancements.py
python test_advanced.py
```

`index.html` is the self-contained browser game, requiring no remote assets or LLM/API. To use on an iPhone, open a **hosted HTTPS link in Safari**; a ChatGPT or Files HTML preview may block JavaScript. Playwright mobile tests use system Chromium; physical iPhone Safari has **not** been verified.

The 3 manual save slots and autosave remain local to the browser. Use Export to preserve a reign between devices or if Safari clears site data.
