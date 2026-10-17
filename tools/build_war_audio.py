"""Build small recorded-foley cues. No synthesis; sources and receipts ship in manifest."""
from pathlib import Path
import hashlib, io, json, subprocess, tempfile, urllib.request, zipfile
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
SOURCES={
 'rpg':('https://opengameart.org/sites/default/files/rpg_sound_pack.zip','/tmp/edward-battle-source.zip'),
 'bow':('https://opengameart.org/sites/default/files/battle_sound_effects_0.zip','/tmp/edward-bow-source.zip'),
 'kenney':('https://kenney.nl/media/pages/assets/rpg-audio/8e99002d76-1677590336/kenney_rpg-audio.zip','/tmp/edward-rpg-audio.zip')}
archives={}; receipts=[]
for key,(url,cache) in SOURCES.items():
 p=Path(cache); b=p.read_bytes() if p.exists() else urllib.request.urlopen(url,timeout=45).read()
 archives[key]=zipfile.ZipFile(io.BytesIO(b));receipts.append({'id':key,'url':url,'sha256':hashlib.sha256(b).hexdigest()})
RATE=32000
used=set()
def read(key,name):
 used.add((key,name));b=archives[key].read(name)
 raw=subprocess.run(['ffmpeg','-loglevel','error','-i','pipe:0','-f','f32le','-ac','1','-ar',str(RATE),'pipe:1'],input=b,capture_output=True,check=True).stdout
 data=np.frombuffer(raw,dtype='<f4').copy();peak=np.max(np.abs(data))
 return data/max(peak,.01)*.32
cues={
 'muster':(6.5,[(0,'rpg','RPG Sound Pack/inventory/chainmail1.wav',.7),(.9,'kenney','Audio/footstep00.ogg',1),(1.6,'kenney','Audio/footstep02.ogg',1),(2.3,'kenney','Audio/footstep04.ogg',1),(2.8,'rpg','RPG Sound Pack/inventory/armor-light.wav',.7),(3.7,'kenney','Audio/footstep06.ogg',1),(4.4,'kenney','Audio/footstep08.ogg',1),(5,'rpg','RPG Sound Pack/inventory/chainmail2.wav',.6)]),
 'battle':(11,[(0,'rpg','RPG Sound Pack/inventory/chainmail1.wav',.7),(.4,'bow','battle_sound_effects/Bow.wav',.8),(1.1,'rpg','RPG Sound Pack/battle/sword-unsheathe2.wav',.8),(1.8,'rpg','RPG Sound Pack/inventory/metal-ringing.wav',.5),(2.6,'bow','battle_sound_effects/swish_2.wav',.8),(3.1,'rpg','RPG Sound Pack/battle/sword-unsheathe4.wav',.8),(4,'rpg','RPG Sound Pack/inventory/armor-light.wav',.8),(4.7,'bow','battle_sound_effects/Bow.wav',.65),(5.3,'rpg','RPG Sound Pack/battle/sword-unsheathe5.wav',.8),(6.1,'bow','battle_sound_effects/swish_3.wav',.6),(6.5,'rpg','RPG Sound Pack/inventory/metal-ringing.wav',.7),(7.4,'rpg','RPG Sound Pack/battle/sword-unsheathe2.wav',.7),(8.3,'rpg','RPG Sound Pack/inventory/chainmail2.wav',.7)]),
 'arrows':(3,[(0,'bow','battle_sound_effects/Bow.wav',1),(.55,'bow','battle_sound_effects/Bow.wav',.65),(1.3,'bow','battle_sound_effects/swish_4.wav',.5)])}
for id,(seconds,events) in cues.items():
 mix=np.zeros(int(seconds*RATE),dtype=np.float32)
 for at,key,name,gain in events:
  data=read(key,name)*gain;start=int(at*RATE);length=min(len(data),len(mix)-start);mix[start:start+length]+=data[:length]
 # Gentle entry and exit; avoid a transient startling the reader.
 fade=int(RATE*.12);mix[:fade]*=np.linspace(0,1,fade);mix[-RATE:]*=np.linspace(1,0,RATE)
 peak=np.max(np.abs(mix));mix*=min(1,.7/max(.01,peak))
 dest=ROOT/'assets/audio'/('war-'+id+'.mp3')
 subprocess.run(['ffmpeg','-y','-loglevel','error','-f','f32le','-ar',str(RATE),'-ac','1','-i','pipe:0','-c:a','libmp3lame','-b:a','64k',str(dest)],input=mix.astype('<f4').tobytes(),check=True)
manifest={'license':'CC0-1.0','authors':{'rpg':'artisticdude','bow':'artisticdude (submitted by Ogrebane)','kenney':'Kenney Vleugels'},'sources':receipts,'recordings':[{'archive':a,'path':b} for a,b in sorted(used)],'cues':{k:{'file':'war-'+k+'.mp3','seconds':v[0],'events':[{'at':t,'archive':a,'path':p,'gain':g} for t,a,p,g in v[1]]} for k,v in cues.items()},'processing':'Recorded foley mixed, level-limited, faded and encoded as mono 32 kHz MP3. No oscillator, generated audio, gunfire, monster voices or synthesised substitute.'}
(ROOT/'assets/audio/war-sources.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Built three recorded war cues:',sum((ROOT/'assets/audio'/('war-'+k+'.mp3')).stat().st_size for k in cues),'bytes')
