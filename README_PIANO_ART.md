# Recorded piano and manuscript art — experimental increment

Music now defaults to seven self-hosted acoustic Yamaha C5 recordings from Alexander Holm's Salamander Grand Piano, CC BY 3.0. Turn Music on by tapping it; change sound and volume under Music & atmosphere. Loading happens only when needed. Original synthesised strings remain selectable. This supersedes the earlier stewardship release's note about the absence of recorded piano.

The score is an original scheduled arrangement whose phrases, tempo and spacing follow the current scene and unrest. It uses recorded individual piano notes, not a recording of a complete pianist performance. This modern interpretive soundtrack is not a reconstruction of fifteenth-century music. Audio preference is separate from world saves. Total MP3 payload is about 571 KiB; the browser decodes the bank in memory.

First key artwork is integrated into title and reign opening. Art & credits describes provenance, palette and intent; see ART_DIRECTION.md for prompt and asset paths. Existing character portraits and all gameplay content are retained. Chapter art beyond the first opening plate is future work.

Validation: built JavaScript parses; test_piano.js checks load, cache, pitch, stop, cancellation, fallback selection and retry with mocked Web Audio; all seven MP3s decode without ffmpeg errors. test_guidance.js confirms existing guide and ending interfaces remain read-only where intended. Asset and layout code uses intrinsic image ratio, wrapping utility controls, touch-sized settings and a scrollable title. This is not a rendered iPhone Safari test or a human listening assessment. No new 1000-run simulation claim is made for this audiovisual-only increment; prior balance results remain in reign_1000_audit.json.
