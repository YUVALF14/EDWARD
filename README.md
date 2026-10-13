# EDWARD · The Living Court

EDWARD is an experimental political role-playing game about Edward IV's reign, 1461–1483. It combines authored historical situations with a persistent court simulation in which appointments, promises, council advice, delayed reports, local pressure and player initiatives shape later events.

**Play:** [yuvalf14.github.io/EDWARD](https://yuvalf14.github.io/EDWARD/)  
**Stage:** experimental development build. It is playable, but its abstract political model is not a scholarly reconstruction of every English institution and has not received a full physical iPhone Safari test.

## Play and systems

- Start in 1461 for the full authored opening, or enter later years in explicitly generated alternate histories.
- Read the situation, what Edward knows, and the stakes. A new decision waits five seconds before it can be made.
- Swipe left or right, or use the on-screen choice buttons. Some matters offer a formal council hearing or a private audience.
- Royal Initiative, appointments, council advice, promises and personal meetings can affect money, authority, relationships, unrest, reports and subsequent crises. Characters may refuse, delay or act independently.
- Focus, Story and Full reading levels control how much context appears. The Encyclopedia distinguishes historical anchors, interpretation and simulation rules.
- Autosave and three manual save slots are available, with JSON export/import for backups.
- Music is opt-in because browsers require a user gesture. The adaptive score combines seven acoustic Yamaha C5 piano samples, recorded folk harp, a synthesized bass-viol line, recorder and frame drum. The player can mute the drum separately; the full band responds to the kingdom's mood.
- The Royal Chronicle records decisions, their setting, whether they arose in council or a private audience, reports received by the Crown, historical dossiers and incidents from life in the realm. Filters organize acts by political subject. Reports preserve their source and uncertainty; the interface does not invent a causal connection where the simulation has not recorded one.

## Presentation refresh · 12 October 2026

- The existing opening illustration is unchanged (including its 1536 × 1024 WebP file). Repeated fallback council vignettes are now optional on 53 of the 96 authored cards; the Scene button keeps them available.
- The People index brings political ties, offices and rival claims together, with distinct manuscript-inspired portraits for the named court. The portraits use small, locally served WebP files; the original opening plate is unchanged.
- Significant card decisions show the outcome actually entered in the Chronicle. Orders, promises, council changes and appointments have contextual acknowledgements. A dispatched order remains distinct from a successful outcome.
- Save replacement, loading, import, deletion, new games and officer changes use styled in-game confirmations. Cancel preserves the current state. No native alert, confirm or prompt calls remain in the runtime.
- Chapter openings use full-screen pages with Back, Next and a page count. Short screens receive smaller text portions. Full testimony also has a “Read this scene in pages” option; Context & sources returns to the existing reference panels.

## Build and test

The hosted game is a single compiled `index.html`. Its source is split into JavaScript and CSS modules in this directory.

The Pages build excludes source modules, development notes, tests, audit files and artwork masters or duplicate audio encodings. The browser uses the compiled HTML, the original opening WebP, selected character portrait WebPs and seven MP3 samples. Source files remain available in the repository; the opening-art master is retained outside the published game.

```sh
python3 build.py
node test_reign_5000.js
node test_living_court.js
node test_stewardship.js
node test_life.js
node test_chronicle.js
node test_artwork.js
node test_piano.js
```

The Node simulation checks validate model invariants and variation across seeded runs. They do not prove historical accuracy, human musical quality, or iPhone Safari rendering. The run report lists assumptions and any limitations. `test_presentation_browser.js` uses Playwright WebKit for real UI checks (install the optional test dependency with `npm install --no-save playwright`, then `npx playwright install --with-deps webkit`). It checks reading layouts at 390 × 844 and 320 × 568, unchanged state while reading/cancelling, custom confirmations, court actions, real MP3 decoding and percussion cleanup. This is browser-engine emulation, not a physical iPhone or a human listening assessment.

## Historical and creative framing

Documented dates, relationships and disputes establish the starting conditions. Individual dialogue is fictional reconstruction, never an authentic historical quotation. Later events depend on simulated conditions and can differ from the recorded reign. Composite messengers and representatives are identified in the Encyclopedia where applicable. Campaign chapter screens are presentation only; they do not insert decisions or force outcomes.

For detailed art, source and development notes, see `ART_DIRECTION.md`, `ART_COVERAGE_AUDIT.md`, `README_PIANO_ART.md`, `README_LIVING_COURT.md`, `README_STORY_ENGINE.md`, `README_REIGN.md` and `README_WORLDCRAFT.md`.
