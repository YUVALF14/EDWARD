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

## Second critical review

The opening now establishes Edward and the court before showing the political measures. Each act changes the people, stakes and place; the dossier supports the audience rather than dominating it. Intimate scenes interrupt campaigns and appointments. Short consequences and the final signature give a through-line to the decisions.

This release deliberately closes with the restoration in May 1471. The principal remaining limits are the finite authored campaign and the interpretive, abstract political model. Historical anchors are fixed where the introduction says they are; this is not an unrestricted alternate-history simulation. The acoustic score uses modern sampled instruments, not a bespoke live period ensemble. Physical iPhone Safari/WebKit and speaker-to-speaker listening have not been tested. The long mobile card is intentionally scrollable rather than fitted into one screen by shrinking its text.

## Final scope

Four acts and 80 decisions cover 1461–1471. Eighteen of the cards offer a third response, with three additional third responses conditional on earned trust or faith. Story folios bridge Grafton, Barnet and Tewkesbury. No later campaign years are playable. Reliable sources were checked again for the final battles and restoration: Historic England’s Tewkesbury battlefield report and the Royal Household’s accounts of Edward IV and Henry VI.
