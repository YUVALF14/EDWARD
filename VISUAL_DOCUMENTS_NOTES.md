# Living documents and manuscript artwork

Based on main `53bea1f`. The original opening plate, political action values, dated court rules, four acts and 80 decisions are preserved.

## Assets

New portraits: `assets/art/portraits/cecily.webp`, `anthony.webp`, `margaret-york.webp`. New plates under `assets/art/transitions/`: `northern-aftermath.webp`, `queens-household.webp`, `middleham-confinement.webp`, `channel-exile.webp`, `return-england.webp`.

Created with the built-in OpenAI ImageGen tool, using the existing opening plate, Jacquetta and Hastings portraits as style references. Modern artistic interpretations, not authenticated likenesses. Optimized to WebP (portraits 432×576; plates up to 1152×768). The opening image was not changed. Clarence and Gloucester retain their existing childhood portrait suppression.

Prompt direction: flattened English/Burgundian manuscript miniature perspective; expressive ink contours, matte tempera, warm vellum, madder red, muted lapis, olive and restrained gold; modest botanical borders; no text or photographic/cinematic treatment. Portrait subjects: Cecily around 50 in a widow’s wimple and dark veil; Anthony around 28 in a burgundy cap and blue doublet with a book; Margaret around 20 in a cream veil and red gown without a crown. Scene subjects: ordinary work after northern victory; linen, accounts and children in the queen’s household; Edward in a guarded Middleham chamber; a small company crossing the sea in exile; a restrained landing at Ravenspur.

## Correspondence

Twelve papers in existing scenes: Cecily’s linen note, Elizabeth Grey’s petition, a mercer’s account, a chapel repair appeal, Yorkshire complaints, the Edgcote dispatch, restrictions on letters at Middleham, Elizabeth’s private letter, Margaret’s correspondence, the sanctuary letter, a London annalist’s extract, and Burgundian negotiating articles.

All are fictional reconstructions. Authors, representatives and carriers are distinguished. Letter origins never determine the court pin. Specific earlier decisions about the Grey boys, Margaret’s departure and Elizabeth’s requested reassurance select callback paragraphs. Relationship scores do not invent those events.

A paper is received once. Its text, author, origin, delivery and receiving context are stored in `S.documents`; an applicable audience choice records the reply separately. Reading, unfolding and reopening do not modify game state. Household-record access reuses the received snapshot. Existing v3 saves remain readable, with an empty document archive rather than invented past receipts. New act saves include received documents; loading discards papers received after that saved opening.

Seals are schematic issuer devices: a household armorial seal, Margaret’s personal device, an ecclesiastical oval, and an already-broken small personal seal for Elizabeth. No Great Seal is used for informal correspondence. These are not reproductions of specific surviving matrices. Background on functions and types: The National Archives, https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/seals/ and https://cdn.nationalarchives.gov.uk/documents/education/medieval-seals.pdf.

Recorded opening sound: Kenney RPG Audio `bookOpen.ogg`, CC0, converted to MP3. Original license and provenance are in `assets/audio/PAPER-LICENSE.txt` and `ATTRIBUTION.txt`. The interface-sound setting controls playback; failed playback stays quiet.

## Verification commands

```
python build.py
node test_release.js
node test_living_documents.js
CHROMIUM_EXECUTABLE=/tmp/chromium node test_release_browser.cjs
CHROMIUM_EXECUTABLE=/tmp/chromium node test_living_documents_browser.cjs
```

Browser verification uses Chromium with mobile touch emulation. Physical iPhone Safari remains unverified.

Results: build validates 34 runtime assets; static suites pass; complete browser campaign passes with 181 responses, different ruling styles, death/deposition/restoration and both escape outcomes. Document tests pass for inert reading, unfolding, receipts, replies, archive reload, legacy saves, specific callbacks, court location and 320/375/390px folios. Mobile account and seal folios and the illustrated act opening were visually inspected.
