# EDWARD IV · The Living Court

Inhabit Edward IV’s kingship, 1461–1471: a historical narrative strategy game of work, movement, pleasure, family and power.

**Play:** https://yuvalf14.github.io/EDWARD/

## The released campaign

Four acts of forty-four concise decisions follow Edward from Towton through the crises of 1465–1469 to exile and restoration in 1470–1471. Authority, order, succession, personal relationships, competing affinities, promises, and the four sources of legitimacy shape the terms of each settlement. Responses have costs as well as benefits; repeated methods lose effectiveness. Some third responses are available only after earlier decisions build the necessary trust or religious standing. The final account describes the ruler’s political signature.

The marriage, exile, restoration and major military events follow the recorded reign. Edward can surrender the crown in 1469, die in a political trap or failed escape, or recover the crown in 1471. Brief story cards mark the passage to Grafton and the final battles at Barnet and Tewkesbury. Conversations and representative officers are fictional reconstructions. Historical pop-ups distinguish documented anchors from these scenes.

The court changes with the date. Elizabeth enters as a widowed petitioner before the 1464 marriage and May 1465 coronation. Children do not receive adult commands. Dead characters leave the living network; exiled companions, opponents, regional affinities and the prince’s household are identified separately.

## Inhabit the Crown expansion

The campaign has a **240-decision reserve**, including forty four-part stories. A complete new reign selects **176 decisions**: the 80 original historical audiences plus 24 complete four-part stories. At each act opening, two essential threads are retained and four more are sampled without replacement. A human interlude and practical royal business are guaranteed; regional cooperation, preparedness, credit, information and relationships weight the selection. All ten threads in each act remain reachable across replays. The selected route is saved and never rerolled on reload. Existing version-4 saves keep their full 240-card route. A progress, a hunt, a tournament, the nursery, a fool at the gate, a guarded writing table and the preparations for return give royal work an emotional range. Earlier choices change later context and unlock responses. The historical campaign stays focused on 1461–1471.

The royal council permits two initiatives per act: accounts, a muster, independent messengers, petitions, debt settlement or a short local progress. The progress has a departure, a choice of route, an encounter and a return to the current audience. It does not overwrite the campaign’s itinerary. Custody limits what Edward can initiate.

Under The realm, general and act objectives sit beside reserve, debt, credit, readiness and information. A ledger explains changes; monthly upkeep and ageing intelligence prevent measures from simply accumulating. Selected choices require established credit, information or preparedness. Open the larger map for continental orientation; regional panels distinguish France, Calais and the Burgundian lands from the English Crown’s reach.

The score holds an arrangement across an act. Changes wait for a phrase boundary; card rendering, stories and papers do not stop scheduled notes or restart a phrase. Existing recorded acoustic samples and credits are retained. See [HISTORICAL_DEPTH.md](HISTORICAL_DEPTH.md) for sources, reconstruction boundaries and system definitions.

## Controls and saves

- Choose a response by button, or use number keys 1–3.
- On touch screens, swipe the card or the small seal left for response 1 or right for response 2. Vertical scrolling remains free. Every response is also available as a button.
- Tap a speaker or court portrait for a short profile. Underlined historical references open a brief source-backed note.
- On mobile, Audience, The realm and The court keep secondary information accessible.
- Letters and papers arrive within existing audiences. Open them without making a decision; revisit their received wording under The household record. Replies use the audience choices.
- The reign autosaves after each decision and completed initiative. Manual save is also available during an audience; loading returns to the most recently saved audience. Saves are local to the browser. The expanded campaign uses a separate version-4 key; earlier version-3 act saves remain untouched and are not silently converted to different scene indices.
- Music is opt-in. Real acoustic harp, recorder, frame-drum and woodblock recordings supply the score and interface sounds. Five original modal arrangements use a steadier pulse and phrase-boundary changes. The arrangement holds through ordinary card changes. Settings include music volume and interface sound control.

## Build and verify

The site is static HTML, CSS and JavaScript, with self-hosted images, font and acoustic recordings. It needs no runtime package installation or third-party service.

```sh
python build.py
node test_release.js
node test_release_browser.cjs
node test_living_documents.js
node test_living_documents_browser.cjs
node test_depth.js
node test_depth_browser.cjs
```

The browser check requires Playwright and Chromium. Set `CHROMIUM_EXECUTABLE` to use an installed browser and `EDWARD_TEST_URL` to test the deployed build. `EDWARD_SCREENSHOTS` selects the screenshot directory. `build.py` validates the runtime files, copies `edward-loop-demo.html` to `index.html`, and writes the SHA-256 release manifest.

Active source:

- `edward-loop-demo.html` — interface and established map.
- `edward-reign-data.js` — four authored acts.
- `edward-court.js` — dated profiles, household network and historical notes.
- `edward-reign.js` — existing political model, decisions, progression, saves and interface.
- `edward-depth-data.js` — 160 additional authored audiences, forty connected stories and forty household papers.
- `edward-depth.js` — accounts, objectives, regional context, royal initiatives and local progress.
- `edward-acoustic.js` — recorded-instrument playback and arrangements.
- `edward-reign.css` — the manuscript-inspired visual framework.

Earlier simulation modules and design notes remain in source control as project history. Their assembler is `python tools/build_legacy.py`, which writes `legacy-index.html` and cannot overwrite the released entry point. Earlier test suites target that earlier simulation; the release checks above target this campaign.

## Credits and verification limits

The established opening plate, map and character illustrations are retained. The portraits and opening plate are modern artistic interpretations, not authenticated likenesses. EB Garamond is distributed under the SIL Open Font License. Acoustic recordings are CC0 VCSL assets from Versilian Studios; see `assets/audio/ATTRIBUTION.md` for the pinned source and processing details.

The music is a modern arrangement from recorded acoustic instruments, including a Baroque-model recorder; it is not an exact reconstruction of a fifteenth-century ensemble. Lute, viol and shawm have not been imitated with synthetic substitutes.

Release checks cover Chromium on desktop and mobile touch emulation at 390, 375 and 320 CSS pixels. Physical iPhone Safari/WebKit and listening on different speakers remain unverified. See `RELEASE_NOTES.md` for the review findings and test evidence.
