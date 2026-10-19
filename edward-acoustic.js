/* A continuous licensed harp composition, with low VCSL harp strings for UI.
   Music and interface effects have separate playback lifecycles. */
const CourtAudio=(()=>{
 let ctx,buffer,samples=[],loading=null,on=false,musicChoice=null,sfx=true,volume=.3,mood='court',requestedMood='court',step=0,phrase=0,status='off',request=0;
 let worldEnabled=true,worldVolume=.28,worldStatus='off',worldKey=null,worldKind=null,worldRequest=0;
 const worldAudio=new Audio();worldAudio.preload='none';
 const paperAudio=new Audio('assets/audio/paper-open.mp3');paperAudio.preload='none';paperAudio.volume=.22;
 function paper(){if(!sfx||document.hidden)return;paperAudio.currentTime=0;const play=paperAudio.play();if(play)play.catch(()=>{});}
 const voices=new Set(),listeners=new Set();
 const musicAudio=new Audio('https://incompetech.com/music/royalty-free/mp3-royaltyfree/Enchanted%20Journey.mp3');musicAudio.preload='none';musicAudio.loop=true;
 const musicLevels={court:1,intimacy:.82,campaign:.72,instability:.75,reflection:.85};
 function musicLevel(){musicAudio.volume=Math.min(.65,volume*musicLevels[requestedMood]);}
 const notify=()=>listeners.forEach(f=>f({on,sfx,volume,mood,status,ready:!!buffer||musicAudio.readyState>=2,worldEnabled,worldVolume,worldStatus}));
 try{const p=JSON.parse(localStorage.getItem('edward-audio-v3')||'null');if(p){sfx=p.sfx!==false;worldEnabled=p.worldEnabled!==false;if(Number.isFinite(p.worldVolume))worldVolume=Math.max(0,Math.min(.5,p.worldVolume));if(Number.isFinite(p.volume))volume=Math.max(0,Math.min(.65,p.volume));}}catch{}
 const save=()=>{try{localStorage.setItem('edward-audio-v3',JSON.stringify({sfx,volume,worldEnabled,worldVolume}));}catch{}};
 function context(){if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();return ctx;}
 async function load(){
  if(buffer)return;if(loading)return loading;
  loading=(async()=>{
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
   try{
    const [meta,res]=await Promise.all([fetch('assets/audio/court-samples.json',{signal:controller.signal}),fetch('assets/audio/court-samples.mp3',{signal:controller.signal})]);
    if(!meta.ok||!res.ok)throw Error('Audio download failed');
    const manifest=await meta.json();const decoded=await context().decodeAudioData(await res.arrayBuffer());
    if(!decoded.duration||!Array.isArray(manifest.samples)||manifest.samples.some(s=>s.offset+s.duration>decoded.duration+.1))throw Error('Audio sprite is incomplete');
    buffer=decoded;samples=manifest.samples;
   }finally{clearTimeout(timeout);}
  })().catch(e=>{throw e;}).finally(()=>{loading=null;notify();});return loading;
 }
 function note(kind,midi,when,duration,gain,ui=false){
  if(!buffer||!ctx)return;const candidates=samples.filter(s=>s.kind===kind);if(!candidates.length)return;
  const sample=candidates.reduce((a,b)=>Math.abs(a.midi-midi)<=Math.abs(b.midi-midi)?a:b);
  const rate=sample.midi?2**((midi-sample.midi)/12):1;
  const length=Math.min(duration,sample.duration/rate-.025),source=ctx.createBufferSource(),g=ctx.createGain();
  source.buffer=buffer;source.playbackRate.value=rate;
  const loud=gain*(ui?1:volume);g.gain.setValueAtTime(.00001,when);g.gain.linearRampToValueAtTime(loud,when+(kind==='recorder'?.055:.006));
  g.gain.setValueAtTime(loud,when+Math.max(.06,length-.25));g.gain.linearRampToValueAtTime(.00001,when+length);
  source.connect(g);g.connect(ctx.destination);const v={source,g,ui};voices.add(v);
  source.onended=()=>{voices.delete(v);source.disconnect();g.disconnect();};source.start(when,sample.offset,Math.max(.05,length)*rate);source.stop(when+length+.02);
 }
 function silence(fade=.35,all=false){if(!ctx)return;const t=ctx.currentTime;for(const v of voices){if(v.ui&&!all)continue;v.g.gain.cancelScheduledValues(t);v.g.gain.setTargetAtTime(.00001,t,Math.max(.01,fade/4));try{v.source.stop(t+fade);}catch{}}}
 async function unlock(){try{await context().resume();await load();}catch{} }
 async function startMusic(){
  if(on)return;const ticket=++request;on=true;status='loading';musicLevel();notify();
  unlock();
  try{await musicAudio.play();if(!on||ticket!==request){if(!on)musicAudio.pause();return;}status='playing';notify();}
  catch{if(ticket!==request)return;status='unavailable';on=false;notify();}
 }
 async function toggle(){
  if(on){musicChoice=false;++request;on=false;musicAudio.pause();status='off';notify();return;}
  musicChoice=true;return startMusic();
 }
 function begin(){if(musicChoice===false||on)return;return startMusic();}
 function setMood(nextMood){if(!(nextMood in musicLevels)||nextMood===requestedMood)return;requestedMood=nextMood;mood=nextMood;musicLevel();notify();}
 // Low recorded harp strings give actions weight without a synthetic tick.
 const cues={
  tap:{notes:[['harp',50,.012,.5,.055]]},
  open:{notes:[['harp',48,.012,.65,.052],['harp',55,.085,.55,.03]]},
  close:{notes:[['harp',50,.012,.5,.042]]},
  tab:{notes:[['harp',53,.012,.4,.042]]},
  inspect:{notes:[['harp',50,.012,.45,.04]]},
  listen:{notes:[['harp',48,.012,.6,.045],['harp',55,.095,.55,.025]]},
  decision:{notes:[['harp',43,.012,.8,.075],['harp',50,.085,.65,.045]]},
  save:{notes:[['harp',48,.012,.55,.045],['harp',55,.11,.6,.035]]},
  page:{notes:[['harp',50,.012,.45,.035]]}
 };
 function ui(kind='tap'){if(!sfx)return;if(!ctx||!buffer){unlock();return;}if(ctx.state==='suspended')ctx.resume().catch(()=>{});const t=ctx.currentTime+.005,cue=cues[kind]||cues.tap;
  for(const [instrument,midi,delay,duration,gain] of cue.notes)note(instrument,midi,t+delay,duration,gain,true);
 }
 function stopWorld(){worldRequest++;worldAudio.pause();worldAudio.currentTime=0;worldStatus='off';worldKey=null;worldKind=null;notify();}
 function world(kind,key){
  if(key===worldKey)return;
  stopWorld();worldKey=key;worldKind=kind||null;
  if(!worldEnabled||document.hidden||!['muster','battle','arrows'].includes(kind))return;
  const ticket=worldRequest;worldAudio.src='assets/audio/war-'+kind+'.mp3';worldAudio.volume=worldVolume;worldStatus='loading';notify();
  const p=worldAudio.play();if(p)p.then(()=>{if(ticket!==worldRequest)return;worldStatus='playing';notify();}).catch(()=>{if(ticket!==worldRequest)return;worldStatus='unavailable';notify();});
 }
 worldAudio.addEventListener('ended',()=>{worldStatus='off';notify();});
 function toggleWorld(){const kind=worldKind,key=worldKey;worldEnabled=!worldEnabled;stopWorld();if(worldEnabled&&kind)world(kind,key);else{worldKind=kind;worldKey=key;}save();notify();}
 function setWorldVolume(v){worldVolume=Math.max(0,Math.min(.5,v));worldAudio.volume=worldVolume;save();notify();}
 function setVolume(v){volume=Math.max(0,Math.min(.65,v));musicLevel();save();notify();}
 function toggleSfx(){sfx=!sfx;if(!sfx)paperAudio.pause();if(sfx)ui();save();notify();}
 musicAudio.addEventListener('error',()=>{if(on){on=false;status='unavailable';notify();}});
 document.addEventListener('visibilitychange',()=>{
  if(document.hidden){paperAudio.pause();stopWorld();musicAudio.pause();if(ctx){silence(.06,true);ctx.suspend().catch(()=>{});}}
  else if(on){const ticket=request;musicAudio.play().catch(()=>{if(ticket===request){on=false;status='unavailable';notify();}});if(ctx)ctx.resume().catch(()=>{});}
 });
 window.addEventListener('pagehide',()=>{paperAudio.pause();stopWorld();musicAudio.pause();silence(.02,true);if(ctx)ctx.suspend().catch(()=>{});});
 return {toggle,begin,unlock,ui,paper,world,stopWorld,toggleWorld,setWorldVolume,setMood,setVolume,toggleSfx,subscribe:f=>{listeners.add(f);notify();},getState:()=>({on,sfx,volume,mood,requestedMood,step,phrase,status,voices:voices.size,ready:!!buffer||musicAudio.readyState>=2,worldEnabled,worldVolume,worldStatus,worldKey,worldKind,musicTime:musicAudio.currentTime,track:'Enchanted Journey · Kevin MacLeod',worldTime:worldAudio.currentTime,worldPaused:worldAudio.paused})};
})();
