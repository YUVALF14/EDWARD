# EDWARD IV — acoustic soundtrack and interface sounds

All musical tones and interface sounds in the released Living Court campaign use recordings of real acoustic instruments. There is no oscillator music or synthetic fallback.

## Recording source

**Versilian Community Sample Library (VCSL)**, Versilian Studios LLC / Sam Gossner and contributing performers, including the Etherealwinds folk-harp recordings.

- Official project: https://versilian-studios.com/vcsl/
- Source repository: https://github.com/sgossner/VCSL
- Pinned source commit: `c1ea7bcc3c7309650ab0da9d15c9cd1fbc4a4c7e`
- License: **CC0 1.0 Universal**, https://creativecommons.org/publicdomain/zero/1.0/
- The complete license is included as `VCSL-LICENSE.txt`.
- Each original recording path, pitch and sprite segment appears in `court-samples.json`.

The bank contains folk harp, Baroque-model tenor recorder, frame drum and woodblock recordings. Samples were trimmed, converted to mono at 32 kHz, levelled, faded at the tail, and encoded into one 96 kb/s MP3 sprite (approximately 1.24 MB). The original sample files are not required at runtime.

EDWARD's original modal phrases combine the recordings into five restrained arrangements: court, intimacy, campaign, instability and reflection. Phrase order, accompaniment, timing and rests vary. Music loads on a user gesture, plays only when enabled, and suspends when the page is hidden. Interface sounds use the same acoustic recordings at a separate level.

This is a modern interpretive score, not a surviving fifteenth-century English composition, an authentic period-instrument reconstruction, or a complete live ensemble performance. Lute, viol and shawm parts are not represented by synthetic substitutes.

Rebuild the sample sprite with `python tools/build_court_audio.py` (Python with NumPy; FFmpeg on PATH). The script fetches only the listed CC0 recordings from the pinned source commit.
