# EDWARD · Initial political balance

## Design intent

The model should show a ruler making choices inside a court where claims reinforce and undermine one another. It should not reduce the reign to a moral score or a simple sum of independent meters.

## State

The playable slice uses 0–100 values for royal authority, realm order, succession security, faith, marriage, inheritance, treasury, and royal power. Warwick’s affinity and the queen’s household range from −100 to 100. Higher affinity means a stronger bond to Edward’s court; negative values mean estrangement.

A choice has a direct vector of effects, then the court applies interactions:

- Let (g=|W-Q|), the distance between Warwick’s affinity (W) and the queen’s household (Q). When that gap widens, order falls by (0.055\max(0,g_{new}-g_{old})).
- Shared support affects authority: (A\leftarrow A+0.018(\min(W,Q)-36)). This rewards a court whose major households both accept the crown, while a single dominant affinity does not provide the same stability.
- Succession responds to the dynastic foundations: (S\leftarrow S+0.018(M-50)+0.022(I-45)), where (M) is marriage and (I) is inheritance.
- Faith has a smaller legitimacy effect on authority: (A\leftarrow A+0.008(F-50)).
- Faction pressure combines household distance, weakness in authority and order, uncertain succession, open promises, and the leverage of the strongest affinity:

[
P=\operatorname{clamp}(0.42g+0.24(100-A)+0.22(100-O)+0.16(100-S)+2.8U+0.12\max(W,Q),0,100)
]

where (U) is open promises.

## Reading the results

A high pressure value means a challenge is plausible, not inevitable. At 1469 the player can face deposition as one possible response to accumulated conditions. A particular choice or state threshold should never depose Edward automatically. Reaching 1483 ends the reign with Edward’s death if no earlier plot has killed him.

Early death should be driven by a specific exposed plot, failed inquiry or force imbalance, rather than a hidden random roll. The probability must be legible from the scene and its political warnings.

## Calibration

Treat the starting values as a playable hypothesis, not historical measurements. During playtests, record the state before and after each decision, how often each response is selected, and whether the displayed relationship consequence matches the player’s expectation. Tune one coefficient at a time and keep a plain-language explanation beside each threshold.
