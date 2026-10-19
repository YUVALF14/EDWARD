# EDWARD IV · The Living Court

Inhabit Edward IV’s kingship, 1461–1471: a historical narrative strategy game of work, movement, pleasure, family and power.

**Play:** https://yuvalf14.github.io/EDWARD/

## The released campaign

Four historical periods follow Edward from Towton through the crises of 1465–1469 to exile and restoration in 1470–1471. Each plays as a court loop of 21, 25, or 29 decisions. The loop length and optional stories respond to the court’s political and personal strain at its close. Authority, order, succession, relationships, competing affinities, promises, and the four sources of legitimacy shape the terms of each settlement. The final account describes the ruler’s political signature.

The marriage, exile, restoration and major military events follow the recorded reign. Edward can surrender the crown in 1469, die in a political trap or failed escape, or recover the crown in 1471. Brief story cards mark the passage to Grafton and the final battles at Barnet and Tewkesbury. Conversations and representative officers are fictional reconstructions. Historical pop-ups distinguish documented anchors from these scenes.

The court changes with the date. Elizabeth enters as a widowed petitioner before the 1464 marriage and May 1465 coronation. Children do not receive adult commands. Dead characters leave the living network; exiled companions, opponents, regional affinities and the prince’s household are identified separately.

## Inhabit the Crown expansion

The campaign has a **272-scene reserve**: 80 historical audiences and forty-eight four-part stories about court relationships, family life and international politics. Every loop keeps its historical turning points and nine core audiences, then draws three to five complete stories. The next loop responds to the authority, rival affinities, relationships and obligations Edward leaves behind. Random selection varies which stories appear. Routes save without rerolling, and existing version-4 saves retain their original paths. Letters, requests and encounters bring practical and personal concerns into the same audience flow.

Under The realm, general and act objectives sit beside reserve, debt, credit, readiness and information. A ledger explains changes; monthly upkeep and ageing intelligence prevent measures from simply accumulating. Selected choices require established credit, information or preparedness. Open the larger map for continental orientation; regional panels distinguish France, Calais and the Burgundian lands from the English Crown’s reach.

The continuous licensed harp composition “Enchanted Journey” by Kevin MacLeod plays across audiences and correspondence. Recorded harp strings provide button feedback; interface sounds and music have independent controls. See [HISTORICAL_DEPTH.md](HISTORICAL_DEPTH.md) for sources, reconstruction boundaries and system definitions.

## Additional faces, scene plates and recorded war cues

Every current speaker has a portrait, including nine fictional household roles. Richard and George have imagined childhood portraits during their earlier years. The same face appears on a card and in its profile; these are modern interpretations, not surviving likenesses.

Three new manuscript illustrations accompany selected household and Channel audiences and the Barnet story. Short recorded-foley cues mark military musters, the Barnet battle story and bow fire in the Tewkesbury story. World sounds have their own on/off switch and volume, stop when leaving a battle story or hiding the page, and never restart the music. Re-rendering the same audience does not replay its cue. The clips contain no modern gunfire or generated audio.

Audio sources are artisticdude’s RPG Sound Pack and Battle Sound Effects (OpenGameArt), plus Kenney’s RPG Audio; all selected under CC0. `assets/audio/WAR-LICENSE.txt` and `war-sources.json` record credit, licenses, source paths, archive hashes and mixing instructions. Rebuild with `python tools/build_war_audio.py`. Art provenance is in `assets/art/world-assets.json`.

## Controls and saves

- Choose a response by button, or use number keys 1–3. The audience count is intentionally hidden; follow the dates, people and unfolding events.
- On touch screens, choose with the answer buttons. Vertical scrolling remains free.
- Tap a court portrait for a dated personal exchange or correspondence, and an expandable profile. Underlined historical references open a brief source-backed note.
- On mobile, Audience, The realm and The court keep secondary information accessible.
- Letters and papers arrive within existing audiences. Open them without making a decision; revisit their received wording under The household record. Replies use the audience choices.
- The reign autosaves after each decision and completed initiative. Manual save is also available during an audience; loading returns to the most recently saved audience. Saves are local to the browser. The expanded campaign uses a separate version-4 key; earlier version-3 act saves remain untouched and are not silently converted to different scene indices.
- Music starts from the first permitted player gesture. Settings include music volume and independent interface sound control. The score streams from the composer’s official site under CC BY 4.0; local CC0 harp samples supply button feedback.

## Build and verify

The site is static HTML, CSS and JavaScript, with self-hosted images, font and interface recordings. It needs no runtime package installation. The continuous score requires a network connection to its credited official source.

```sh
npm ci
python build.py
npm test
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

Media browser verification: `CHROMIUM_EXECUTABLE=/path/to/chromium node test_world_media_browser.cjs`.
