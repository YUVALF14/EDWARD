# EDWARD · Godot prototype

This branch starts the engine transition as a separate vertical slice. The HTML demo remains the quick-to-open reference.

## Open

1. Install Godot 4.3 or later.
2. Download this repository branch or clone it.
3. Open `godot/EDWARD/project.godot` in Godot and press F6/F5.

## What is in this slice

- A minimal title screen, then a three-page animated historical prologue.
- The existing map and Edward, Warwick and Elizabeth portraits.
- A repeating twenty-decision period, with two or three responses per event.
- A quieter, generated instrumental lyre-and-drone loop and a restrained UI click.
- Visible Crown, realm order, succession, household relations, sources of meaning and political memory.
- Nonlinear cross-effects: widening household rivalry erodes order, shared affinity can reinforce authority, and marriage, inheritance and faith alter succession and political pressure.
- 1469 deposition is possible but never automatic. If Edward survives to 1483, the reign ends with his death.

This is an engine foundation, not yet a full port of the twenty-card historical deck. The current deck is a playable balance slice. The complete scenario, scene transitions and the rest of the card set are the next content pass.

## Audio

The loop is synthesized in `Main.gd` from a soft sustained drone and slow plucked notes. It uses no external recording or network request.
