/* Real recorded instruments only. CC0 VCSL harp, tenor recorder, frame drum
   and woodblock. Original modal arrangements; no oscillator fallback. */
const CourtAudio=(()=>{
 let ctx,buffer,samples=[],loading=null,on=false,sfx=true,volume=.3,mood='court',requestedMood='court',timer=null,next=0,step=0,phrase=0,status='off',request=0;
 let worldEnabled=true,worldVolume=.28,worldStatus='off',worldKey=null,worldKind=null,worldRequest=0;
 const worldAudio=new Audio();worldAudio.preload='none';
 const paperAudio=new Audio('assets/audio/paper-open.mp3');paperAudio.preload='none';paperAudio.volume=.22;
 function paper(){if(!sfx||document.hidden)return;paperAudio.currentTime=0;const play=paperAudio.play();if(play)play.catch(()=>{});}
 const voices=new Set(),listeners=new Set();let suspendedByPage=false;
 const arrangements={
  court:{beat:.56,harp:.23,reed:.13,drum:.052,rest:.42},
  intimacy:{beat:.72,harp:.2,reed:.105,drum:.018,rest:.72},
  campaign:{beat:.48,harp:.2,reed:.12,drum:.085,rest:.32},
  instability:{beat:.53,harp:.18,reed:.11,drum:.07,rest:.52},
  reflection:{beat:.88,harp:.18,reed:.095,drum:.012,rest:1.05}
 };
 // A brighter, dance-like court score: short notes, clear pulse, and distinct
 // rising/falling phrases. All sound remains from the licensed real recordings.
 const phrases=[
  [74,71,74,null,79,76,74,71,69,null,71,74,76,74,null,null],
  [67,71,74,79,null,76,74,71,74,null,67,69,71,67,null,null],
  [76,79,81,79,76,null,74,71,74,76,79,null,76,74,null,null],
  [71,74,76,null,79,81,79,76,74,null,71,69,67,71,null,null],
  [79,76,74,71,null,74,76,79,81,79,76,null,74,71,null,null],
  [67,null,71,74,76,74,71,null,74,79,76,74,71,null,67,null],
  [74,76,79,null,81,79,76,74,71,74,null,76,79,74,null,null],
  [71,67,69,71,74,null,76,74,71,69,67,null,71,74,null,null]
 ];
 const notify=()=>listeners.forEach(f=>f({on,sfx,volume,mood,status,ready:!!buffer,worldEnabled,worldVolume,worldStatus}));
 try{const p=JSON.parse(localStorage.getItem('edward-audio-v3')||'null');if(p){sfx=p.sfx!==false;worldEnabled=p.worldEnabled!==false;if(Number.isFinite(p.worldVolume))worldVolume=Math.max(0,Math.min(.5,p.worldVolume));if(Number.isFinite(p.volume))volume=Math.max(0,Math.min(.65,p.volume));}}catch{}
 const save=()=>{try{localStorage.setItem('edward-audio-v3',JSON.stringify({sfx,volume,worldEnabled,worldVolume}));}catch{}};
 function context(){if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();return ctx;}
 async function load(){
  if(buffer)return;if(loading)return loading;
  status='loading';notify();
  loading=(async()=>{
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
   try{
    const [meta,res]=await Promise.all([fetch('assets/audio/court-samples.json',{signal:controller.signal}),fetch('assets/audio/court-samples.mp3',{signal:controller.signal})]);
    if(!meta.ok||!res.ok)throw Error('Audio download failed');
    const manifest=await meta.json();const decoded=await context().decodeAudioData(await res.arrayBuffer());
    if(!decoded.duration||!Array.isArray(manifest.samples)||manifest.samples.some(s=>s.offset+s.duration>decoded.duration+.1))throw Error('Audio sprite is incomplete');
    buffer=decoded;samples=manifest.samples;status=on?'playing':'off';
   }finally{clearTimeout(timeout);}
  })().catch(e=>{status='unavailable';on=false;throw e;}).finally(()=>{loading=null;notify();});return loading;
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
 function tick(){
  if(!on||!buffer||ctx.state!=='running'||document.hidden)return;
  if(next<ctx.currentTime-.3)next=ctx.currentTime+.12;
  while(next<ctx.currentTime+.32){
   // Change colour at a phrase boundary; scheduled notes keep their tails.
   if(step===0&&mood!==requestedMood){mood=requestedMood;notify();}
   const a=arrangements[mood];
   const p=phrases[phrase%phrases.length],n=p[step];
   const inflection=1+Math.sin((phrase*17+step*7)*1.31)*.075;
   if(n!==null){const t=next+Math.sin(step*3+phrase)*.012;
    note('harp',n,t,Math.min(a.beat*.92,.8),a.harp*inflection);
    // Recorder answers in alternate phrases, leaving audible breath between notes.
    if(a.reed&&phrase%3!==0&&step%3!==1)note('recorder',n,t+.055,Math.min(a.beat*1.35,.95),a.reed*inflection);
   }
   if(step%4===0&&step<13){const bass=(step===8&&phrase%2?55:50);note('harp',bass,next,1.15,a.harp*.68);if(step%8===0)note('harp',bass+7,next+.11,.82,a.harp*.42);}
   if(a.drum&&step%2===0&&phrase%3!==1)note(phrase%2?'drum2':'drum',0,next,a.beat*.7,a.drum);
   step++;next+=a.beat*(1+Math.sin(step+phrase)*.025);
   if(step>=p.length){step=0;phrase++;next+=a.rest+(phrase%3)*.25;}
  }
 }
 async function unlock(){try{await context().resume();await load();}catch{} }
 async function toggle(){
  const ticket=++request;
  if(on){on=false;clearInterval(timer);timer=null;silence(.8);status='off';notify();return;}
  on=true;status='loading';notify();
  try{await context().resume();await load();if(!on||ticket!==request)return;clearInterval(timer);next=ctx.currentTime+.15;step=0;status='playing';timer=setInterval(tick,120);tick();notify();}catch{if(ticket!==request)return;status='unavailable';on=false;notify();}
 }
 function setMood(nextMood){if(!(nextMood in arrangements)||nextMood===requestedMood)return;requestedMood=nextMood;if(!on)mood=requestedMood;notify();}
 function ui(kind='tap'){if(!sfx)return;if(!ctx||!buffer){unlock();return;}if(ctx.state==='suspended')ctx.resume().catch(()=>{});const t=ctx.currentTime+.005;note('click',0,t,.16,kind==='decision'?.13:.07,true);if(kind==='decision')note('harp',62,t+.035,.65,.09,true);}
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
 function setVolume(v){volume=Math.max(0,Math.min(.65,v));save();notify();}
 function toggleSfx(){sfx=!sfx;if(!sfx)paperAudio.pause();if(sfx)ui();save();notify();}
 document.addEventListener('visibilitychange',()=>{if(document.hidden){paperAudio.pause();stopWorld();}if(!ctx)return;if(document.hidden){suspendedByPage=on;silence(.06,true);ctx.suspend().catch(()=>{});}else if(suspendedByPage){suspendedByPage=false;ctx.resume().then(()=>{next=ctx.currentTime+.3;}).catch(()=>{});}});
 window.addEventListener('pagehide',()=>{paperAudio.pause();stopWorld();silence(.02,true);if(ctx)ctx.suspend().catch(()=>{});});
 return {toggle,unlock,ui,paper,world,stopWorld,toggleWorld,setWorldVolume,setMood,setVolume,toggleSfx,subscribe:f=>{listeners.add(f);notify();},getState:()=>({on,sfx,volume,mood,requestedMood,step,phrase,status,voices:voices.size,ready:!!buffer,worldEnabled,worldVolume,worldStatus,worldKey,worldKind,worldTime:worldAudio.currentTime,worldPaused:worldAudio.paused})};
})();
