# EDWARD — The Living Court (experimental)

An additive development of the exact Emergent Worldcraft build previously on `YUVALF14/EDWARD/main`, commit `99bd92cc18f4f6819b22742ee6463c37d1f4e763`. Existing event modules, maps, illustrations, character dossiers and save schema remain in place.

## Play

Use **Royal Initiative** below the card, or **Council** in the existing navigation. Requests can arrive later, be delayed, or be refused. Open a reply to question, reassure, threaten, promise, bargain or dismiss. The king's exact responses and significant court business are saved.

The Council permits appointments, dismissals and invitations to counsel. Offices and council access are separate. George Neville and Robert Stillington are clerical candidates for the Great Seal; a military magnate cannot simply be made Chancellor through this UI. Dismissing an officer does not confiscate hereditary land or remove an ecclesiastical dignity.

Eleven initiatives include summonses, private audiences, council meetings, messengers, investigations, intelligence, family mediation, patronage, diplomatic missions, alliances and regional intervention. A purpose selector shapes the audience. Patronage can offer a household stipend, safe-conduct, or one explicitly fictional uncommitted Crown demesne lease. Existing disputed private estates cannot be seized through this grant mechanic.

A court action uses 1–2 weeks of an eight-week **annual gameplay allowance**, plus abstract household funds where shown. Replies take additional court-clock time, including extra travel for northern and continental contacts. Ordinary decisions advance that clock. Funds replenish when the existing calendar changes year. These values are balance assumptions, not reconstructed medieval fiscal or travel data.

Promises must be fulfilled by a successful witnessed settlement before the displayed deadline. A new appointment made before an explicitly promised appointment hearing also breaks the pledge. Threats depend on the recipient's influence relative to royal authority. An independent clerical councillor improves commissioned investigations; interested households can withhold intelligence. Council delegation creates a delayed inquiry.

## Integration and preservation

- All prior content modules are preserved. The assembled HTML includes two additive modules and one stylesheet.
- Court costs affect existing credit; responses change existing actors, links, grievances, regional unrest and selected inter-household feud state. These conditions feed the existing crisis generator.
- Grieved actors seek support independently; Edward receives delayed, uncertain reports.
- Early court grievances survive the transition into the 1465 sandbox.
- Schema-10 autosaves, manual slots and JSON imports are retained. Court schema 1 is lazily added. Existing fields are not discarded. Pending requests, conversations, transcripts, offices and promises serialize with the existing world.
- Focus / Story / Full, full original historical context, menu, maps, portraits, manual saves and autosaves remain. Displayed royal decisions are spoken dialogue in every mode; original action labels remain in card metadata. Dialogue is reconstruction, never attributed as a historical quotation.

## Validation

Run `node test_living_court.js` from any directory. It checks migration, office eligibility, dismissals, mortality, refusals, delay, persistent meetings, promises, council composition, initiative budgets, autonomous response, pre-1465 continuity, council inquiry and bounded Crown leases. It also compares 120 matched-seed pairs and runs 40 full reigns beginning in 1461. See `living_court_audit.json` for measured results.

`python3 build.py` assembles the standalone game. The extracted full JavaScript bundle passes `node --check`.

Browser-control capability was unavailable during this change. No current browser, screenshot, mobile layout or physical iPhone Safari test is claimed. Existing earlier-build Chromium results do not verify this update.

## Historical basis and limits

- George Neville's 1476 death remains an availability constraint; battle-dependent deaths are not imposed when their battles never took place. The inherited simulation uses a coarse yearly calendar rather than exact daily dates.
- Robert Stillington's clerical service and appointment as Chancellor in 1467: [Dictionary of National Biography](https://en.wikisource.org/wiki/Dictionary_of_National_Biography%2C_1885-1900/Stillington%2C_Robert).
- Hastings's household office and diplomatic service: [Dictionary of National Biography](https://en.wikisource.org/wiki/Dictionary_of_National_Biography%2C_1885-1900/Hastings%2C_William).
- Council research context: [Counsel and the King's Council in England](https://ora.ox.ac.uk/objects/uuid%3A35d7c39a-7485-4274-9db8-cb680257d37d/files/m873d09254716eb3037cb79f3fec3a05e).
- Manuscript visual reference: [British Library digitised manuscripts](https://www.bl.uk/collection/digitised-manuscripts-archives). Existing interpretive vector portraits and ten vignettes are retained, with restrained manuscript-style rules and typography. This is not a replacement suite of archival paintings.

This remains a finite rules-based experiment. The meetings use state-conditioned written responses, not unrestricted conversation. Institutions, information, land tenure and finance are simplified. The eight-week budget, councillor eligibility lists and fictional lease are design assumptions. Narrative divergence tests demonstrate causal variation in the tested policies, not unique stories or comprehensive historical validation. Further art work and physical Safari testing remain necessary.
