# The Living Court 1.0 — release review

## What changed

### History and narrative

- Replaced twenty repeatedly reused historical scenes with 80 period-specific decision cards in four acts. The twenty-decision act structure and existing political/relationship model remain.
- Elizabeth begins outside the royal household as John Grey’s widow. Her 1464 marriage, uncrowned status, May 1465 coronation, 1470 sanctuary and return to the royal household have distinct states.
- George and Richard begin as children. Titles and adult roles develop with the date. Anthony is Lord Scales before inheriting the Rivers title; Margaret’s Burgundian marriage and correspondence connect the exiles to a separate court.
- Henry VI is a fugitive before his 1465 capture, a prisoner thereafter, restored in 1470, and absent from the living network after May 1471. Warwick leaves it after Barnet. Clarence’s reconciliation and the return of the royal household are shown within 1471; later events are outside this release.
- The court distinguishes household service, royal family and people beyond the household. Edward’s exiled companions are separate from Henry VI’s government. The prince’s household and northern affinities become important later.
- Removed repeated exposition. Added short act arrivals, an account of the preceding settlement, dated locations, personal introductions and concise historical notes.
- Earlier favours, strained trust, broken promises and regional dependence affect later context and political pressure. The final signature now reflects the actual pattern of decisions rather than the first relationship to cross a threshold.

### Audio

- Removed oscillator music and the synthetic instrumental layer from the active release.
- Included a 1.24 MB self-hosted MP3 sprite of 23 real acoustic recordings: folk harp, tenor recorder, frame drum and woodblock. CC0 source, pinned commit, individual original paths and full license are included.
- Five restrained arrangements use related modal phrases, different instrumentation, varied spacing and silence. Scene and act transitions fade existing voices before the next arrangement.
- Added recorded interface feedback, music volume, sound control, background suspension, and a clear retry path. Rapid music toggles cannot create duplicate scheduling timers.

### Presentation

- Retained the original opening artwork, manuscript portraits, map and vellum/olive/madder palette.
- Restored a clear title presentation and a short introduction to Edward. Refined the card frame, type hierarchy, spacing, menus, profiles, source notes, act folios and ending.
- Added a small self-hosted EB Garamond font subset for consistent serif typography.
- On mobile, secondary information has three direct views; the main card can scroll naturally. The card and the small seal accept horizontal swipes while vertical movement remains page scrolling. There are no directional arrows in the response text.
- Native dialogs contain keyboard focus and close with Escape. Buttons remain available for every choice; reduced motion is respected.

## Findings fixed during actual browser review

| Finding | Correction | Evidence |
| --- | --- | --- |
| A missing DOM target interrupted the old render before factions and chronicle completed | Removed the stale write and integrated the completed court/record render | Full browser campaign without page exceptions |
| The same scenes caused dead or wrongly titled speakers to recur | Dated authored scenes, profiles and network membership | All 80 scenes checked for living speakers; historical state assertions |
| Opening act music could remain active over a differently scored first scene | Restore the scene arrangement when entering or dismissing an act folio | Browser assertion: campaign scene to court scene |
| Most successful play styles saturated the meters | Diminishing gains, maintenance pressure, moderated affinity growth | Command replay ends around authority 74, order 34, succession 52 |
| Ending descriptions favoured an arbitrary relationship threshold | Compare the recorded pattern of governing decisions | Different replay styles produce different signatures |
| Failed storage could imply that the current act was saved | Validate the full saved state; distinguish failed writes and matching act openings | Save/load/reload and corrupt-storage checks |
| Music load failure could leave unclear state; rapid toggles could duplicate timers | Explicit failure/retry state and request generation guard | Browser download/decode/play/pause/retry checks |

## Fresh verification

- `python build.py` — passes; validates 24 runtime files, including every required portrait, soundtrack, font and license. Generates the release manifest and entry point.
- `node test_release.js` — passes: four acts, 80 unique decision cards, chronological ordering, living speakers, historical household changes, marriage/title transitions and required assets.
- `CHROMIUM_EXECUTABLE=/tmp/chromium node test_release_browser.cjs` — passes in Chromium 153: a complete 80-decision playthrough using real clicks; a second complete governing style; the restored-crown, king-killed and surrendered-crown endings; all 181 authored responses, relationship-dependent third options and story interludes; profiles, historical notes, menus, saves, title reload, corrupt storage, audio playback, transitions and failure/retry.
- The browser suite replays reachable decision histories for both a successful escape and a fatal escape. A stronger household escapes alive; a weakened household can lose the king.
- Desktop: 1440 × 1000. Mobile touch emulation: 390 × 844, 375 × 844, 320 × 568. Reviewed screenshots of title, audience, court, act changes and ending. No horizontal overflow, missing runtime assets or page exceptions. Browser-dispatched touch input selects exactly one response on a horizontal seal swipe and card swipe; vertical scrolling makes no decision.
- `node --check` on active scripts and `git diff --check` — pass.

## Reachable response check

The early northern commission originally required more Hastings trust than the preceding scenes could grant. Its threshold now matches the earlier chamber appointment. The browser test earns the additional response by choosing Hastings, then replays the same route without that favour and verifies that only two responses remain.

## Published hosting check

The first live deployment exposed an older Pages configuration that excluded every JavaScript, CSS and JSON file. It had been suitable for the earlier single-file build. The release configuration now excludes individual archived sources while shipping the active modules and data. The build validates that no runtime dependency is excluded. In-game recording credits use a plain-text file so Markdown conversion cannot change their URL.

## Second critical review

The opening now establishes Edward and the court before showing the political measures. Each act changes the people, stakes and place; the dossier supports the audience rather than dominating it. Intimate scenes interrupt campaigns and appointments. Short consequences and the final signature give a through-line to the decisions.

This release deliberately closes with the restoration in May 1471. The principal remaining limits are the finite authored campaign and the interpretive, abstract political model. Historical anchors are fixed where the introduction says they are; this is not an unrestricted alternate-history simulation. The acoustic score uses modern sampled instruments, not a bespoke live period ensemble. Physical iPhone Safari/WebKit and speaker-to-speaker listening have not been tested. The long mobile card is intentionally scrollable rather than fitted into one screen by shrinking its text.

## Final scope

Four acts and 80 decisions cover 1461–1471. Eighteen of the cards offer a third response, with three additional third responses conditional on earned trust or faith. Story folios bridge Grafton, Barnet and Tewkesbury. No later campaign years are playable. Reliable sources were checked again for the final battles and restoration: Historic England’s Tewkesbury battlefield report and the Royal Household’s accounts of Edward IV and Henry VI.

## 1.1 · Inhabit the Crown — 16 October 2026

This expansion turns the fixed 80-decision campaign into 240 distinct base decisions across the same four acts. It preserves the existing card interface, artwork and political relationships. Forty four-part stories add royal work, amusement, recreation, grief, fear and family life. Forty new household papers bring the received archive to 52 documents during a complete route.

Earlier decisions change subsequent context and conditional responses, including connections between acts: a livery roll becomes useful for the king’s guard; a financial inquiry follows the king into a credit negotiation; a private channel to Margaret matters in exile. Selected third choices require credit, information or readiness. Gloucester takes part in 1469 and the restoration, using the existing working portrait and age-aware profile.

The royal council allows two initiatives per act. A short local progress offers a route, an encounter and a return to the current audience. Accounts, military inspection, messengers, petitions and debt settlement make room for the king to initiate business. Custody constrains physical actions. General and act objectives, five operational measures, regional cooperation and a cause-labelled ledger sit in the optional realm view. Calendar-month upkeep and ageing intelligence require continued maintenance.

The original map now includes continental orientation and an enlarged view, with explanatory place panels for France, Calais and the Burgundian lands. The score holds its arrangement across ordinary cards and story dialogs; changes are queued at musical phrase boundaries without stopping scheduled notes or resetting the phrase. The pulse and gaps between phrases have been revised using the existing licensed recorded acoustic samples.

Expanded version-4 saves use a separate key and retain older version-3 saves unchanged. Autosaving follows decisions and completed initiatives rather than requiring a sixty-card act to be replayed. See HISTORICAL_DEPTH.md for source choices, fictional reconstruction boundaries, and the distinction between a local excursion and a fully simulated travel system.

### Fresh verification

- `python build.py`: verified 36 runtime assets and rebuilt the static entry and SHA-256 manifest.
- `node test_release.js`: 240 unique chronological scenes, two or three authored answers, living speakers, dated court and portrait assets.
- `node test_living_documents.js`: document delivery, existing choice callbacks, provenance and local assets.
- `node test_depth.js`: forty four-part threads, act lengths, historical-note references and Gloucester participation.
- `node test_release_browser.cjs`: two complete 240-decision governing styles, death and deposition, reachable successful and failed escapes, all 546 authored answers, acoustic decoding/playback/failure recovery, menus, saves, keyboard and touch controls. Desktop plus 390/375/320 CSS-pixel mobile views.
- `node test_living_documents_browser.cjs`: inert document reading, unfolding, receipt snapshots, actual-choice variants, archive/reload and small-screen folios.
- `node test_depth_browser.cjs`: council limits and persistence, local progress, map enlargement and place context, objectives, actual earlier-choice branches, phrase continuity, every autosave across 240 decisions, 52 received papers, forty completed stories, resource-dependent options, debt recording and the visible Gloucester portrait. Prior version-3 save preservation is checked.
- `git diff --check`: clean.

Browser checks used Playwright with headless Chromium 153. This verifies interaction and audio scheduling, not subjective enjoyment, listening quality on speakers, or physical iPhone Safari/WebKit. Those remain human/device review tasks. No claim is made that 240 scenes are 240 documented historical incidents, that every response produces an exclusive campaign, or that the map is a free-travel strategic simulation.

## Reserve stories and replay variety

- New campaigns encounter 176 of the 240 authored decision cards. All 80 central audiences remain; each act includes six complete four-part stories out of ten. Two anchor threads per act guarantee continuity for the main family and political arc.
- Side-story selection uses weighted sampling without replacement at the start of each act. Regional and household needs, relationships and earlier choices influence odds, while guaranteed human and practical interludes preserve emotional variety. Unselected stories remain in reserve for another reign.
- Selections persist with saves; all four beats and their documents stay together in chronological order. Optional cross-act callbacks appear only when their originating story was played. Existing v4 saves continue with their original full itinerary. Political drift scales to actual act length.
- Verification: 100 sampled complete itineraries cover all 40 threads, central cards and intact chronological chains; a browser route exercises 176 decisions and save validation after each, 36 received documents, council actions, music continuity and reload stability. The original 240-card route remains under the exhaustive legacy regression.
