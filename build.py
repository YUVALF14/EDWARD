"""Validate and assemble the released Living Court campaign for static hosting.

The earlier simulation remains in source control. Its archived assembler is
`python tools/build_legacy.py` and writes legacy-index.html, never this release.
"""
from pathlib import Path
import hashlib, json, re, fnmatch
ROOT=Path(__file__).resolve().parent
html=(ROOT/'edward-loop-demo.html').read_text()
required=set(re.findall(r'(?:src|href)="([^"#]+)"',html))
required={p.split('?',1)[0] for p in required if not p.startswith(('https:','http:'))}
required.update(re.findall(r"url\(['\"]?([^)'\"]+)", (ROOT/'edward-reign.css').read_text()))
required.update(['edward-loop-demo.html','assets/audio/court-samples.mp3','assets/audio/court-samples.json','assets/audio/ATTRIBUTION.txt','assets/audio/VCSL-LICENSE.txt','assets/fonts/OFL.txt'])
required.update('assets/art/portraits/'+p+'.webp' for p in re.findall(r"portrait:'([^']+)'",(ROOT/'edward-court.js').read_text()))
required.update(re.findall(r'assets/art/transitions/[a-z-]+\.webp', (ROOT/'edward-reign-data.js').read_text()))
required.update(['assets/audio/paper-open.mp3','assets/audio/PAPER-LICENSE.txt'])
required.update(['assets/art/portraits/court-faces.webp','assets/art/portraits/young-brothers.webp','assets/art/transitions/household-hall.webp','assets/art/transitions/channel-quay.webp','assets/art/transitions/barnet-mist.webp','assets/art/world-assets.json','assets/audio/war-battle.mp3','assets/audio/war-muster.mp3','assets/audio/war-arrows.mp3','assets/audio/war-sources.json','assets/audio/WAR-LICENSE.txt'])
config=ROOT/'_config.yml'
if config.exists():
 patterns=[json.loads(line.strip()[2:]) for line in config.read_text().splitlines() if line.strip().startswith('- ')]
 for asset in required:
  if any(fnmatch.fnmatchcase(asset,pattern) or pattern.endswith('/') and asset.startswith(pattern) for pattern in patterns):
   raise SystemExit('Required runtime asset excluded by Pages: '+asset)
for p in sorted(required):
 if not (ROOT/p).is_file():raise SystemExit('Missing required release asset: '+p)
(ROOT/'index.html').write_text(html)
required.add('index.html')
manifest={'release':'EDWARD IV — The Living Court 1.10.1 · a court that remembers and judges the reign','entry':'index.html','assets':[{'path':p,'bytes':(ROOT/p).stat().st_size,'sha256':hashlib.sha256((ROOT/p).read_bytes()).hexdigest()} for p in sorted(required)]}
(ROOT/'release-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Built index.html; verified',len(required),'runtime assets;',sum(a['bytes'] for a in manifest['assets']),'bytes including opt-in audio.')
