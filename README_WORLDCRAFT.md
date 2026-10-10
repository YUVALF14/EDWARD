# EDWARD IV — Emergent Worldcraft (experimental demo)

**This is not v1.0 and is not a historical research-grade reconstruction.** It extends Royal Menu & Illustrated Court with a historical provenance layer, state-triggered crises, richer decision substance, conditional avoidance of scripted scenes, and ten original vector scene illustrations.

## What changed

1. **The player receives new information, not a recap.** The four new conditional crisis threads introduce a returned summons, double rent warrant, sworn parish truce, or double-pledged customs revenue. Each offers two distinct orders with numerical and delayed consequences. The two stages only occur when the corresponding conditions persist.
2. **Emergence rather than predetermined chronology.** The 36 authored beats are now conditional: reconciliations can prevent a Neville muster, royal intervention can prevent a Caister siege, and clear diplomatic instructions can prevent contradictory letters. The skipped event is logged as a *non-event* and does not consume a player turn. Some scenes are deliberately still scheduled by historical *pressure*; this remains a hybrid authored/rule-based engine.
3. **Picquigny is not a free gift.** If the player never prepared an English expedition, the 1475 scene becomes a **commercial safe-conduct negotiation**, without a French royal pension. The 1477 follow-up uses the actual resulting financial flag. In an expeditionary path, a military peace settlement remains available.
4. **Clarence is not automatically a traitor.** A recorded allowance and lack of a Neville grievance produce a non-treason financial/household dispute rather than a scripted accusation in 1477. His historical execution is not forced.
5. **Historical geography and dated constraints.** Caister’s unrest belongs to **East Anglia**, not the Midlands. Nibley Green belongs to the **West Country / Gloucestershire**; its date is 20 March 1469/70 (usually 1470 in modern reckoning). George Neville's 1476 death prevents him from holding the Great Seal thereafter. Older saved games receive missing regional fields on loading.
6. **Historical lens.** Game menu → **History & your reign** shows documented chronology alongside the *different* outcome in this particular simulation, and links to research sources. The Casebook includes conditional crises and crises avoided through earlier orders.
7. **Ten original self-contained SVG vignettes** for coronation, battle, castle, diplomacy, marriage, council, inheritance, parish, succession and treasury. In **Focus** they are optional via **✦ Scene**; on tall screens a muted background illustration fills otherwise unused space. In **Story/Full** the illustration is shown inline. **Read more** offers a collapsible illustrated moment. These are artistic interpretations, not primary sources or authentic portraits.
8. **All 40 Focus scenes have revised, concrete stakes** tied to their real two-choice effects. The 1463 Northumberland priest and the 1461 Yorkshire priest cases now include specific evidence and legal consequences rather than generalized atmosphere.

## How to play

Open the standalone `index.html` on a normal HTTPS website, or locally in a desktop browser. In iOS Safari use the hosted GitHub Pages game rather than the ChatGPT/Files preview. New Game / Continue / Load Game, three manual slots, JSON export/import, music, Focus / Story / Full, and portrait biographies remain available. iPhone Safari requires a tap to enable audio.

## Historical sources used for chronology

- National Archives, *Wars of the Roses* (Edward proclaimed king 4 March 1461, Towton later): https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/
- Historic England, *Caister Castle*: https://historicengland.org.uk/listing/the-list/list-entry/1002882
- Historic England, *Battle of Barnet*: https://historicengland.org.uk/listing/the-list/list-entry/1000001
- Historic Royal Palaces, *Henry VI*: https://www.hrp.org.uk/tower-of-london/history-and-stories/henry-vi/
- Royal Family, *Edward IV*: https://www.royal.uk/edward-iv
- North Nibley local history, *Battle of Nibley Green* (year-numbering ambiguity): https://www.northnibley.org.uk/battle.php
- Dictionary of National Biography (historical text), *George Neville*: https://en.wikisource.org/wiki/Dictionary_of_National_Biography%2C_1885-1900/Neville%2C_George_%281433%3F-1476%29

Historical documentation supports background, **not** invented royal hearings, characters' spoken lines, fictitious estates, or generated alternative outcomes.

## Tests

- `node audit_worldcraft.js 2000`: **2,000** complete seeded runs, **0 runtime failures**, **0 specified historical-integrity warnings**, mean **1.93** potentially scripted beats avoided per run, mean **4.29** conditional crisis entries / resolutions per run, mean **30.83** authored story beats encountered. **80 / 120** matched-seed policy comparisons produced different event sequences. These are simulation metrics, **not** proof of historical plausibility.
- `python test_home.py`: 390×844, 375×667, 320×568, start / load / manual saves / portraits, all passed.
- `python test_focus_new.py`: full 76-decision sandbox run at all three mobile sizes, all passed.
- `python test_worldcraft.py`: visual scene sheet, historical lens, new priest crisis, game menu, casebook and resolution, all passed.
- Tests use **Chromium mobile emulation**. Physical iPhone Safari and Playwright WebKit have **not** been tested.

## Known limitations

- This remains a small rules-based world, with abstract actor influence, credit, unrest and a four-decisions-per-year calendar. It is not an academically validated reconstruction of medieval English fiscal, legal, dynastic, military or church institutions.
- Historical dates are used as anchors. Major battles, betrayals and executions are *not* automatically imposed; the model also does not yet simulate every historically important institution or person.
- There are **10 symbolic vector scenes**, not photorealistic oil paintings or archival illustrations. They intentionally avoid claiming exact heraldry or documentary likenesses.
- Autosaves are local to the browser and may be cleared by Safari. Export JSON backups for important runs.
- Do not describe the 2,000 simulations as 2,000 unique stories; many outcomes share templates.

## Rebuild

```bash
python build.py
```

All JS/CSS modules are combined into one offline-capable HTML file. The playable build requires no external images, fonts, audio or network calls.
