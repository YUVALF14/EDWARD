# The Living Court · 1.10.0

This increment builds on release 1.9.3. The active entry is still
`edward-loop-demo.html`, assembled to `index.html` by `build.py`.

Click a court portrait to enter a short, authored exchange. Twenty-two topics
cover household humour, family obligations, wounded pride, independent clients,
and Henry VI's circumstances. Each topic has two turns, persists in the existing
numeric save flags, and cannot award the same relationship change twice.
Letters and questions through a keeper wait for another royal audience before
revealing the reply. Direct conversation does not advance the historical card.

Henry cannot be interviewed while a fugitive or summoned by Edward during the
Readeption. Custody conversations are imagined, not documented meetings. Henry's
illness does not stand in for his personality. His son is not described as alive
after Tewkesbury. Historical anchors, childhood, deaths and existing saves remain
constraints. Reference: https://www.royal.uk/henry-vi and
https://www.hrp.org.uk/tower-of-london/history-and-stories/henry-vi/ .

A new reign now reaches the first audience immediately. Explanations and chapter
art remain in the menu. Later historical transitions keep their chapter folios.
The card's obsolete fixed 540px width has been removed.

The main score is the complete harp composition “Enchanted Journey” by Kevin
MacLeod, CC BY 4.0. It streams unmodified from the composer's official site,
requires a network connection, and continues through cards, profiles and letters.
Low CC0 VCSL harp strings supply the interface cues. Credits and source URLs are
in `assets/audio/ATTRIBUTION.txt` and the game's settings. This is modern
atmospheric music, not a reconstruction of a court performance.

## Checks

`npm ci` installs the test-only JSDOM dependency; the browser game has no npm
runtime dependency. `npm test` checks the campaign reserve, conversation dates,
remote delays, persistent turns, repeat guards, sound controls, actual DOM click
handlers and complete campaigns under three decision policies. The DOM check
uses mock media and is not a browser rendering or listening test.

`python3 build.py` checks and hashes every local runtime asset. The streaming
music is credited separately and is not represented as an offline local asset.

Physical iPhone Safari and listening impressions remain a separate playtest.
Further work should make selected private exchanges feed later interpersonal
scenes, rather than multiply interchangeable conversation topics.
