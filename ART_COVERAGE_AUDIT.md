# EDWARD — map of the current visual coverage

Audit of the card data and rendering code, 12 October 2026. This is a presentation audit; it proposes no change to card order, event conditions, choices, consequences, years or saves.

## What “no art” means in the current build

Every one of the 96 authored situation cards currently receives a small scene illustration under its divider. The scene is selected by a keyword heuristic from **10 reusable SVG vignettes**, not drawn for that card. So the answer depends on the standard:

| Standard | Cards |
|---|---:|
| No scene illustration at all | **0 of 96** in the authored card set |
| A scene composed specifically for this individual card | **0 of 96** |
| Reuse one of ten thematic vignettes | **96 of 96** |
| Also match a speaker in the portrait catalogue and show their illustrated portrait | **41 of 96** |

The portraits and vignettes are interpretive SVG drawings, not authenticated likenesses. One AI-assisted opening illustration appears on the title screen. The new reign and chapter openings use black text screens instead of repeating that image. The same scene vignette is offered again in the optional “Scene” view; it is not a second, more detailed artwork.

## The current 96-card map

Groups below show the vignette the current code assigns. **[portrait]** means that the speaker matches a named entry in the portrait catalogue; the rest of the card still has a scene vignette. “Council” is the renderer’s default category, not a claim that the event itself is a council meeting.

| Current vignette | Count | Situation IDs; [portrait] marks a speaker portrait |
|---|---:|---|
| King’s council (default) | 53 | `young_knight`, `york_oath`, `north_command` [portrait], `first_messenger`, `chancellor` [portrait], `hastings` [portrait], `reward_claim`, `warwick_grant` [portrait], `warwick_reply` [portrait], `parliament` [portrait], `attainder`, `writ_dispute`, `scots_border`, `henry_scotland`, `somerset_pardon` [portrait], `somerset_at_court` [portrait], `dispossessed_yorkist`, `somerset_defection` [portrait], `mercy_witness`, `neville_kinship` [portrait], `northern_seal_echo`, `hastings_clients` [portrait], `widow_claim_returns`, `chancery_queue` [portrait], `london_receipt`, `northern_discretion`, `border_misinformation` [portrait], `somerset_sureties` [portrait], `household_rivalry` [portrait], `somerset_oath_echo`, `court_petition_routes`, `captains_dispute`, `restored_knight_surety`, `warwick_early_grant`, `north_waiting_family`, `warwick_clients_royal` [portrait], `hastings_direct_access` [portrait], `neville_petition_routed`, `yorkist_reward_friction`, `attainder_widow`, `parliamentary_exception`, `sheriff_two_writs`, `northern_hearing_request`, `border_report_conflict` [portrait], `warwick_discretion_1462` [portrait], `northern_delay_1462`, `somerset_contact_rumour` [portrait], `somerset_clients_claim`, `somerset_outside_court`, `hastings_petition_competition` [portrait], `somerset_kept_oath` [portrait], `somerset_breaks_oath`, `northern_king_in_person` |
| Battlefield | 9 | `towton` [portrait], `prisoners`, `unpaid_retinue`, `hedgeley` [portrait], `hexham` [portrait], `retinue_wages`, `captains_prisoners`, `retinue_pay_dispute`, `north_campaign_avoided` [portrait] |
| Disputed inheritance | 8 | `wardship`, `confiscated_estate`, `percy_return` [portrait], `percy_petition`, `percy_unrest`, `percy_son` [portrait], `percy_retainer_recruitment` [portrait], `percy_dispossessed_followers` [portrait] |
| Royal marriage | 8 | `elizabeth_petition` [portrait], `marriage_diplomacy` [portrait], `marriage_choice` [portrait], `woodville_network` [portrait], `queen_suitors` [portrait], `foreign_betrothal`, `woodville_family_petitions` [portrait], `queen_kin_arrangements` |
| Foreign diplomacy | 6 | `calais` [portrait], `border_truce`, `french_match` [portrait], `burgundy_trade`, `warwick_diplomatic_commitment` [portrait], `foreign_envoy_reaction` |
| Royal coronation | 3 | `coronation`, `unmarried_crown` [portrait], `king_seal_queue` [portrait] |
| Castle and moat | 1 | `castle_garrison` |
| Parish and harvest road | 3 | `sanctuary`, `forfeiture_witness`, `north_local_reconciliation` |
| Royal treasury | 3 | `city_credit`, `merchant_credit_rumour`, `london_merchants_patron` |
| Succession and seal | 2 | `forfeited_knight_family`, `ward_kinship` |

The count and assignment are reproducible from `SITUATIONS` in `data.js`, `reactive.js` and `emergent.js` using `edwardSceneType()` in `scene_art.js`. IDs are listed here so the next art pass can be reviewed against actual play content.

## The living layers use the same visual vocabulary

The code also renders 36 beats in the six interwoven chronicles, four possible crossover hearings, eight scenes in four conditional crises, and seven stochastic life incidents. Their illustrative assignments are likewise reused: the 36 beats are distributed across council 6, diplomacy 8, battle 1, marriage 5, inheritance 2, castle 6 and succession 8. Crossover hearings use council 1, inheritance 1, treasury 1 and succession 1. Conditional crisis scenes use council 3, battle 1, parish 2 and treasury 2. Life incidents use parish 1, diplomacy 1, council 3, marriage 1 and battle 1.

These categories identify renderer output, not a separate picture for each beat. The label “life” does not currently have its own image family; an ill steward, a market fire or a fair uses one of the older political vignettes, while harvest and garrison wages reuse the parish and battlefield scenes.

## The largest visual and conceptual gaps

1. **The Council vignette carries too many different ideas.** It currently covers 53 authored cards (55%). That includes parliamentary law, household access, mercy, rumours, petitions, local levies, rival promises and a northern king’s personal visit. The repeat makes government look like a room full of advisers when much of the reign happens through writs, estates, roads, households and delayed news.
2. **Names and places should not decide the scene by accident.** The audit caught six false battle matches caused by “Warwick” in card IDs. This increment removes that match and recognizes diplomatic language: `warwick_diplomatic_commitment` now uses the diplomacy vignette; the other five use the council vignette. It also stops incidental place names such as Newcastle from acting as art instructions, and assigns foreign betrothal to the marriage vignette. These are presentation-only corrections.
3. **Ordinary people have little visual presence.** The 41 matched speaker portraits mostly belong to known nobles and senior figures. The 55 other authored cards lack a speaker portrait, including petitions from composite landholders, widows, messengers, clerks and local officers. The existing scene bands rarely distinguish their point of view.
4. **The economy has only a royal chest.** Credit, customs, wages, cargo, rents, harvest, markets and tenants should not all read as a single treasury problem. Trade and household finance belong to different places and people.
5. **The current opening image cannot stand for six different reign lengths and starting years.** It is a useful title image, but the campaign needs a sequence of distinct visual ideas: victory and obedience; court access; loyalty under pressure; peace and its cost; inheritance; and the kingdom after the king.

## A chapter frame and the idea each image should carry

The new campaign frame has six presentation-only parts. A chapter opens at the year in the simulation, with a black screen, a short claim, the immediate political situation, and optional documented history. Its wording describes pressures and questions; it does not promise a rebellion, marriage, execution, treaty or battle.

| Years | Chapter | Image idea for a future full artwork | What it lets the player feel without predetermining an answer |
|---|---|---|---|
| 1461–64 | **A Crown Is Not Yet a Kingdom** | A muddy northern road leading toward Westminster; the royal seal in the foreground, distant households on the road | Victory is real; obedience still has to travel through people and places |
| 1465–68 | **The Court Gathers Around the Crown** | One chamber with several doors, a petition carried between households | Access and patronage connect family, office and government |
| 1469–71 | **When Service Becomes a Claim** | Two sets of retainers waiting outside one royal chamber; no battle shown unless one occurs | A grievance can be negotiated, contained or intensified |
| 1472–75 | **The Price of Settlement** | A Channel crossing above two open account books, English and continental | Military policy, trade and credit pull on the same resources |
| 1476–78 | **The House Behind the Crown** | Two sealed inheritance documents beside an empty chair for an heir | Succession begins as a set of claims, custody and obligations |
| 1479–83 | **What Remains After the King** | An unoccupied royal chamber, a closed seal box and a letter left open | The player’s government has consequences beyond Edward’s life |

The campaign screen now distinguishes what is documented from what the simulation has made of it. A later starting year labels its invented prehistory as generated. This keeps the historical frame visible while leaving room for the player’s Edward to rule differently.

## Order for the art pass

1. Keep classification semantic: tests now guard the six former Warwick false matches, place names, diplomacy and betrothal against future misrouting.
2. Split the overloaded Council family into **royal audience**, **law and Parliament**, **household access**, **land and wardship**, **local life**, **market and trade**, and **royal finance**. Keep each visual small enough to support the card rather than compete with its words.
3. Commission or generate the six chapter images from the table above. Use them only at chapter openings and important crossings; retain compact vignettes on ordinary cards.
4. Add portraits for composite roles only as *roles* (for example, “a widow petitioner”), not fabricated likenesses of named historical people. Maintain the established English and Burgundian manuscript style.

No new artworks beyond the existing title/reign plate and current reusable illustrations are claimed by this audit. Its purpose is to show the work left and the political ideas the current imagery obscures.
