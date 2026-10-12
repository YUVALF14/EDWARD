# EDWARD — Presentation and Chronicle Notes

Captured direction for later development. These are product commitments and design constraints, not features already present in the build.

## Visual identity to preserve

The restrained gold, dark green, vellum, madder and muted lapis direction is the visual foundation of EDWARD. It should feel intimate, tactile and emotionally serious: an interactive fifteenth-century chronicle shaped by ink, tempera, seals, margins and worn metal.

Gold is scarce. Use it for royal authority, seals, important rules, chapter transitions and moments whose meaning has been earned. It should never become a bright decorative wash. The interface must remain legible and calm on a phone.

Future colour work should define semantic roles before expanding the palette:

| Colour | Primary meaning |
| --- | --- |
| Restrained gold | Crown, authority, ceremony, durable record |
| Vellum | Readable narrative, documents, memory |
| Ink | Judgment, names, official text |
| Madder red | Immediate stakes, rupture, blood, warning |
| Muted lapis | Diplomacy, distance, the wider world |
| Dark green | Court, continuity, inhabited political space |

Colour must clarify state and mood without implying that one political choice is morally correct.

## Future audio palette

Extend the current recorded piano score with three historically suggestive colours:

- **Frame drum:** danger, procession, military movement and public ceremony. It should be sparse, low and physical rather than a continuous battle rhythm.
- **Bowed strings:** private pressure, grief, unstable alliances and household intimacy. Select an instrument and sample licence only after listening tests; avoid modern cinematic string pads.
- **Flute or recorder:** travel, courtly respite, correspondence and seasonal change. Use short phrases so it does not turn the court into a pastoral fantasy.

The instruments should be scheduled by world conditions, place and dramatic pressure. They should not merely select random tracks. Piano remains the emotional ground; other instruments enter as political colour. Players retain music, volume and accessibility controls. Credits must name the performer or sample source and licence for every recording.

## Studio opening and credits

Add a short studio card before the game title after the company name and mark are chosen. The sequence should be quiet: black screen, restrained mark, brief sound or silence, then fade to the EDWARD title. It should be skippable immediately and should not replay whenever the player returns to the main menu.

Credits should become a dedicated, readable view containing:

- design, writing, development and historical research;
- original and generated artwork provenance;
- music performance, sample sources and licences;
- historical and artistic references;
- software and typeface licences where required;
- a clear statement that invented dialogue and generated events are historical fiction grounded in documented conditions.

Do not decide or display a temporary studio identity in the live game.

## The Royal Chronicle

The Chronicle should become the accessible historical document of the player's reign. It records the history produced by the simulation rather than acting as an activity log.

Each entry should answer five questions:

1. **When and where did it happen?**
2. **What did the king order, promise or refuse?**
3. **Who witnessed, carried out or resisted it?**
4. **What was known at the time?**
5. **What did it later cause?**

An action enters first as a contemporary record: a sealed order, a council minute, a reported audience or an uncertain rumour. Later consequences can amend the same entry with marginal notes. This lets the player see causality without exposing information Edward could not yet know.

### Proposed presentation

- **Chronicle leaf:** a concise, readable entry for each significant act.
- **Margins:** later consequences, broken promises, disputed testimony and retrospective corrections attach to the original act.
- **Threads:** filters for Crown, Council, households, regions, diplomacy, war, finance, Church and succession.
- **People and places:** names link to the existing encyclopedia and map.
- **Certainty:** documented fact, royal record, credible report, rumour and retrospective inference remain visibly distinct.
- **Chapter folios:** each campaign chapter opens a new section, while older unresolved matters remain linked across chapters.
- **End of reign:** the chronicle produces an objective summary, comparison with the historical reign and a forecast for the kingdom after Edward's death.

### Writing voice

The base text should resemble a clear modern translation of a late medieval chronicle: concrete, restrained and attentive to witnesses, seals, offices and consequences. It may carry the Crown's institutional perspective, but it must preserve dissent, uncertainty and adverse outcomes. It must never turn the player's actions into automatic praise.

Example structure:

> **Westminster, February 1466 — entered under the Great Seal**  
> The king ordered the disputed customs accounts examined before any further grant was made. William Hastings undertook to bring the collectors before the Council. The merchants accepted the delay for one term.
>
> *Margin, Michaelmas 1467:* Two collectors failed to appear. London now cites the king's earlier promise in refusing a new advance.

This is generated prose and must not be presented as an authentic historical quotation.

## Implementation order when resumed

1. Design the Chronicle data model so entries reference existing decisions, promises, actors, reports and delayed effects.
2. Upgrade the current Chronicle view into linked folios without changing simulation outcomes.
3. Add marginal consequence updates and certainty labels.
4. Add chapter summaries and end-of-reign compilation.
5. Establish a complete credits view.
6. Choose the studio identity and build its opening card.
7. Source and audition licensed drum, bowed-string and flute recordings; then integrate adaptive orchestration.

The Chronicle must remain useful in Focus mode and richer in Story and Full modes. It should make twenty-two years understandable without compressing the reign into a predetermined moral or narrative path.
