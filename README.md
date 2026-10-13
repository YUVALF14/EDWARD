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
- Music is opt-in because browsers require a user gesture. The default is an adaptive arrangement using seven self-hosted acoustic Yamaha C5 samples from Alexander Holm's Salamander Grand Piano. The samples are distributed under CC BY 3.0. The score is arranged by the game and is not a surviving medieval composition or a complete performance recording. A synthesized strings-and-reeds option is also available.
- The Royal Chronicle records decisions, their setting, whether they arose in council or a private audience, reports received by the Crown, historical dossiers and incidents from life in the realm. Filters organize acts by political subject. Reports preserve their source and uncertainty; the interface does not invent a causal connection where the simulation has not recorded one.

## Build and test

The hosted game is a single compiled `index.html`. Its source is split into JavaScript and CSS modules in this directory.

```sh
python3 build.py
node test_reign_5000.js
node test_living_court.js
node test_stewardship.js
node test_life.js
node test_chronicle.js
node test_piano.js
```

The Node simulation checks validate model invariants and variation across seeded runs. They do not prove historical accuracy, human musical quality, or iPhone Safari rendering. The run report lists assumptions and any limitations.

## Historical and creative framing

Documented dates, relationships and disputes establish the starting conditions. Individual dialogue is fictional reconstruction, never an authentic historical quotation. Later events depend on simulated conditions and can differ from the recorded reign. Composite messengers and representatives are identified in the Encyclopedia where applicable. Campaign chapter screens are presentation only; they do not insert decisions or force outcomes.

For detailed art, source and development notes, see `ART_DIRECTION.md`, `ART_COVERAGE_AUDIT.md`, `README_PIANO_ART.md`, `README_LIVING_COURT.md`, `README_STORY_ENGINE.md`, `README_REIGN.md` and `README_WORLDCRAFT.md`.

## Presentation update · 13 October 2026

Published individual manuscript-inspired WebP portraits and a compact People panel explaining offices, family ties and rival claims. Removed redundant home-screen copy. The opening illustration is unchanged. The deployed HTML retains the newer composed soundtrack, harp, recorder, bass accompaniment, custom dialogs, decision notices and chapter folios.

The portrait images are original AI-assisted modern interpretations, not archival likenesses. Run `node test_artwork.js` to verify portrait asset mapping. Some recent presentation and music changes exist directly in `index.html`; do not rebuild it from the older split sources until those changes have been reconciled.
