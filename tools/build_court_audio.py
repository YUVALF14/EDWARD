"""Build the self-hosted acoustic sample sprite from CC0 VCSL recordings.
Requires numpy and ffmpeg. Source commit is pinned for reproducibility.
"""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import urllib.request, urllib.parse, json, subprocess, math
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets/audio'; OUT.mkdir(parents=True,exist_ok=True)
CACHE=Path('/tmp/edward-acoustic-sources');CACHE.mkdir(exist_ok=True)
COMMIT='c1ea7bcc3c7309650ab0da9d15c9cd1fbc4a4c7e'
BASE='https://raw.githubusercontent.com/sgossner/VCSL/'+COMMIT+'/'
items=[]
for kind,notes in [('harp',['C2','D2','E2','F#2','G#2','A#2','C3','D3','E3','F#3','G#3','A#3','C4']),('recorder',['C3','D3','E3','F#3','G#3','A#3','C4'])]:
 for note in notes:
  path=('Chordophones/Composite Chordophones/Folk Harp/EWHarp_Normal_'+note+'_v2_RR1.wav') if kind=='harp' else ('Aerophones/Edge-blown Aerophones/Baroque Tenor Recorder/Sustain/TenRecorder_Sus_'+note+'_rr1_Main.wav')
  pitch={'C':0,'D':2,'E':4,'F#':6,'G#':8,'A#':10}[note[:-1]]
  items.append(dict(id=kind+'-'+note.replace('#','s'),kind=kind,note=note,midi=12*(int(note[-1])+2)+pitch,source=path))
for ident,path in [('drum','Membranophones/Struck Membranophones/Frame Drum/HDrumL_HitMuted_v2_rr1_Sum.wav'),('drum2','Membranophones/Struck Membranophones/Frame Drum/HDrumL_HitMuted_v2_rr2_Sum.wav'),('click','Idiophones/Struck Idiophones/Woodblock/wood_click_pp_rr1.wav')]:
 items.append(dict(id=ident,kind=ident,midi=0,source=path))
def fetch(item):
 dest=CACHE/(item['id']+'.wav')
 if not dest.exists():
  with urllib.request.urlopen(BASE+urllib.parse.quote(item['source']),timeout=45) as r:dest.write_bytes(r.read())
 return dest
with ThreadPoolExecutor(max_workers=6) as pool:files=list(pool.map(fetch,items))
parts=[];offset=0;rate=32000
for item,file in zip(items,files):
 sr=rate;data=np.frombuffer(subprocess.check_output(['ffmpeg','-loglevel','error','-i',str(file),'-f','f32le','-ac','1','-ar',str(rate),'-']),dtype='<f4').copy()
 # Keep the natural attack and body; remove only near-silent leader.
 peak=np.max(np.abs(data));active=np.flatnonzero(np.abs(data)>peak*.004);start=max(0,int(active[0])-int(sr*.012))
 data=data[start:start+int(sr*(5 if item['kind']=='harp' else 4.8 if item['kind']=='recorder' else 1.5))]

 data=data/max(np.max(np.abs(data)),.001)*.72
 fade=min(len(data),int(rate*.12));data[-fade:]*=np.linspace(1,0,fade)
 # Detect octave from the recorded fundamental (VCSL uses C3 = middle C).
 if item['midi']:
  segment=data[int(rate*.25):int(rate*1.1)];spectrum=np.abs(np.fft.rfft(segment*np.hanning(len(segment))))
  freqs=np.fft.rfftfreq(len(segment),1/rate);expected=440*2**((item['midi']-69)/12)
  bands=[(f,float(spectrum[np.argmin(abs(freqs-f))])) for f in [expected/2,expected,expected*2]]
  print(item['id'],'expected',round(expected,1),'fundamental candidates',[(round(f,1),round(a,1)) for f,a in bands])
 item['offset']=round(offset/rate,6);item['duration']=round(len(data)/rate,6)
 parts.extend([data,np.zeros(int(rate*.18))]);offset+=len(data)+int(rate*.18)
(CACHE/'court-samples.f32').write_bytes(np.concatenate(parts).astype('<f4').tobytes())
subprocess.run(['ffmpeg','-y','-loglevel','error','-f','f32le','-ar',str(rate),'-ac','1','-i',str(CACHE/'court-samples.f32'),'-codec:a','libmp3lame','-b:a','96k',str(OUT/'court-samples.mp3')],check=True)
(OUT/'court-samples.json').write_text(json.dumps({'version':1,'sourceCommit':COMMIT,'license':'CC0-1.0','samples':items},indent=2)+'\n')
with urllib.request.urlopen(BASE+'LICENSE',timeout=30) as r:(OUT/'VCSL-LICENSE.txt').write_bytes(r.read())
print('Sprite bytes:',(OUT/'court-samples.mp3').stat().st_size)
