# EDWARD · Initial political balance

## Design intent

The model treats the court as a set of claims that reinforce or strain one another. It does not produce a moral score or add independent meters into a single ruler rating.

## State

Most values run from 0 to 100: royal authority (A), realm order (O), succession security (S), faith (F), marriage (M), inheritance (I), treasury, royal power, and plot exposure. Warwick’s affinity (W) and the queen’s household (Q) run from −100 to 100. Positive affinity means a stronger bond to Edward’s court; negative affinity means estrangement.

A choice applies its direct effects, then the court applies cross-effects:

- Household distance is g = |W − Q|. A widening gap reduces order by 0.055 × max(0, g_new − g_old). This means a choice that strengthens one household while alienating another can weaken governability.
- Shared support changes authority by 0.018 × (min(W, Q) − 36). Both households accepting the Crown provides more stability than one household dominating it.
- Succession changes by 0.018 × (M − 50) + 0.022 × (I − 45). Marriage and inheritance therefore work together.
- Faith changes authority by 0.008 × (F − 50). Royal power and treasury also support authority by 0.006 × (power − 50) and 0.012 × (treasury − 48). Once power exceeds 68, its concentration reduces order by 0.035 per point above that mark.
- Faction pressure is: P = clamp(0.42g + 0.24(100 − A) + 0.22(100 − O) + 0.16(100 − S) + 2.8U + 0.12 max(W, Q), 0, 100), where U is the number of open promises.

The interface shows current household alignment and faction pressure on the decision card. After each choice, the next card explains any visible cross-effect. A warning about the king’s safety appears once plot exposure reaches 18.

## Crisis and endings

At 1469, the player can explicitly yield the royal seal. This ends Edward’s rule by choice; the game never deposes him automatically. Resisting or negotiating keeps the period open to other outcomes.

An early death can occur from 1469 onward if plot exposure reaches 38 while faction pressure is at least 58. The guard warning and threat value are visible before that threshold. Reaching the 1483 boundary ends the reign with Edward’s death if no earlier plot has killed him.

## Calibration

These starting values and coefficients are a playable hypothesis, not historical measurements. During playtests, record state before and after each decision, response selection, and whether the player anticipated the resulting political effect. Tune one coefficient at a time and keep a plain-language explanation beside each threshold.
