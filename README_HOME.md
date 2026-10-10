# EDWARD IV — Royal Menu & Illustrated Court (experimental demo)

This is an incremental extension of **EDWARD Focused Reading**. It is not a production 1.0 release.

## New in this build
- **Title screen on every visit** with Continue Reign, New Game, Load Game and How to Play. Loading a page never silently advances the saved game.
- **New Game** lets the player start in 1461 or jump to the preset 1465 living-world sandbox. When an autosave exists, starting a new game requires confirmation. The new game replaces only the autosave, not any of the three manual save slots.
- **Load Game** lists autosave, three manual slots and JSON import. Slots remain independent. All data is local to the browser; Safari may clear it. Export a JSON backup from the in-game Save menu.
- **In-game ☰ menu**: resume, save/export, load, return to title screen, or start a new game. Returning to the title does not reset progress.
- **22 original SVG character illustrations** integrated into the title screen, on cards where the speaker matches a historical character, in character biographies, and in the People panel. The portraits are *interpretive illustrations*, not authenticated historical likenesses. Generic fictional petitioners do not receive a misleading named portrait.
- All content remains self-contained in one HTML file. No third-party fonts, images, CDN requests or audio files.

## Existing mechanics preserved
- Focus / Story / Full reading levels; historical references; interactive atlas; story arcs and causal consequences; three manual save slots; autosave; export/import; music; delayed decisions; touch and button controls.

## Test status
- `python test_home.py` — 390x844, 375x667, 320x568 mobile viewport: new game, continue, load, slot persistence, title-on-reload, portraits, no page errors.
- `python test_focus_new.py` — all three viewports, complete 1465–1483 sandbox runs of 76 decisions, no page errors.
- `node story_audit.js` — 400 narrative simulations.
- `node story_invariants.js` — 100 simulations, 7,600 decisions, no duplicate crossovers, saves compatible.
- Browser tests used Chromium mobile emulation. **Physical iPhone Safari / WebKit has not been tested**.

## Rebuild

```sh
python build.py
```

The script combines `index.template.html`, all JS and CSS modules into a standalone `index.html`.

## Cautions
- Starting a new game overwrites the current autosave; manually saved slots are preserved.
- Save data is browser-local, not synced across devices. Use Export to protect important playthroughs.
- Historical dialogue and alternative timelines are fictional reconstructions.
