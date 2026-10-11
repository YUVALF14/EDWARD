# Stewardship, learning by doing, and the king's legacy

Experimental development update. Existing source, branches, historical records and save schema 10 are retained. Five-second card lock is unchanged.

## Player-facing review of the original campaign

The 1461–1464 sequence was reviewed through its actual cards, choices, facts, witnesses and subsequent reactions. This is a code-and-simulation walkthrough, not hands-on Safari testing.

- Clearer stakes for the opening campaign, patronage, northern delegation, offices and wardship. Full historical context and dialogue remain in Read more.
- Smaller hearing buttons explicitly say EXPLORE; their accessible names distinguish opening testimony from committing an answer.
- Local relief displays its actual cost and available funds, including an unfunded warning.
- Bounded/limited commissions granted in the original campaign can now be managed in the Council; replacing or dismissing their holder preserves grievance consequences.
- Formal testimony is recorded by the serving Chancellor, not automatically George Neville after replacement.
- Authority earned through early local incidents now transfers to the later regional simulation.

## Balance changes

These change causes and recovery, not ending thresholds:

1. Court initiatives pay once from the household purse. The old automatic additional credit deduction was removed; major financial decisions still affect credit.
2. A disgruntled actor can organise one coalition per model year, rather than repeatedly every few court weeks. Threats and independent political action remain.
3. A proposed marriage or intelligence report no longer automatically counts as material injury to a rival before Edward acts. Estate, office and armed disputes still create grievances.
4. Regions lose one unrest per quiet year only when neither mobilisation nor an armed case was recorded there. Current-year disturbances block this recovery.
5. Ordinary customs and estate receipts restore one credit per year when London is sufficiently secure and an overseas campaign does not block recovery. Inactive actors' grievances can ease. These are qualitative simulation assumptions, not historical fiscal estimates.
6. An accounts inquiry with the London alderman can lead to a witnessed repayment agreement. It requires evidence, time, funds and assent, and can improve credit once per year. It does not erase debts.

## Identical 1,000-run comparison

Before: `balance_before_audit.json` (revision 9d0eb52). After: `reign_1000_audit.json`.

500 matched seeds, two policies per seed; six entry years. Left-choice/settlement policy is called "conciliatory" in the harness; right-choice/threat policy is called "coercive". This does not imply that every left choice is peaceful or every right choice violent.

| Recorded measure | Before | After |
| --- | ---: | ---: |
| Completed runs | 1,000 | 1,000 |
| Fractured realm | 1,000 | 798 |
| Uneasy realm | 0 | 131 |
| Settled realm | 0 | 71 |
| Indebted | 938 | 72 |
| Strained credit | 59 | 215 |
| Creditworthy | 3 | 713 |
| Complete ending keys | 79 | 197 |
| Broad ending labels | 3 | 7 |

All 500 policy pairs differed in final world, event sequence and ending key. 3,742 save/reload checks and 78,720 existing historical-invariant checks passed. Zero missing arena quotes. All runs still end at 1483 by design.

Under the left/settlement policy, 70/500 realms settled and 128 were uneasy. Under right/threat, 496/500 were fractured. The latter policy also retains more funds and credit: fiscal strength does not automatically create political peace. These are two stress policies, not optimal play, probabilities for human players or proof of complete balance. High noble influence and remaining fragmentation still warrant observation; no claim of a finished release.

Additional validation: 11 targeted stewardship/base-campaign checks; 280 existing court simulations; 80 existing full-reign life simulations; actual guidance and legacy rendering functions exercised with DOM objects; assembled script syntax check. Browser, audio listening and physical iPhone Safari were not available.

Reproduce with Node: `node test_stewardship.js`, `node test_reign_1000.js`, `node test_living_court.js`, `node test_life.js`, `node test_guidance.js`. Build: `python3 build.py`.

## Progressive guidance

The opening introduces one decision. A saved contextual hint then introduces its actual Chronicle record, optional hearings, reading modes, initiative, travel, replies, consequences, promises, appointments, accounts and succession when relevant. Hints can be muted and lessons reopened from the menu. Royal Initiative is not shown on the main screen for the first six player decisions unless an order already exists; experienced players can still access it from the menu.

"Prepare an audience" opens and fills the actual form. It does not send an order or spend resources. The player dispatches it, advances ordinary cases, receives the reply and makes the audience decision. The guide then points to recorded effects. No tutorial chooses a political response on the player's behalf.

## Ending and historical comparison

The ending opens with a qualitative classification and conditional near-term outlook based on saved household power, living heirs, guardianship, unrest and credit. Explanations, objective records, original epilogue and comparison with documented history are expandable. A forecast is explicitly not an observed future, and there is no historical accuracy score.

Comparison sources, paraphrased and linked in-game:
- Royal Household, Edward IV: https://www.royal.uk/edward-iv
- Royal Household, Edward V: https://www.royal.uk/edward-v

Only marriage, Warwick's historical reversal/death, Picquigny, revenue management and the 1483 succession are compared. Historical money totals are not mapped to abstract game points. The wider historical engine remains an incomplete experimental model.

## Music

The current soundtrack remains an original synthesised modal score. No real piano recording was added or mislabelled as one. A recorded or sampled piano soundtrack is technically feasible; it needs an appropriately licensed asset and should be labelled a modern interpretive score.
