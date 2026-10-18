/* Real recorded instruments only. CC0 VCSL harp, tenor recorder, frame drum
   and woodblock. Original modal arrangements; no oscillator fallback. */
const CourtAudio=(()=>{
 let ctx,buffer,samples=[],loading=null,on=false,musicChoice=null,sfx=true,volume=.3,mood='court',requestedMood='court',timer=null,next=0,step=0,phrase=0,status='off',request=0;
 let worldEnabled=true,worldVolume=.28,worldStatus='off',worldKey=null,worldKind=null,worldRequest=0;
 const worldAudio=new Audio();worldAudio.preload='none';
 const paperAudio=new Audio('assets/audio/paper-open.mp3');paperAudio.preload='none';paperAudio.volume=.22;
 function paper(){if(!sfx||document.hidden)return;paperAudio.currentTime=0;const play=paperAudio.play();if(play)play.catch(()=>{});}
 const voices=new Set(),listeners=new Set();let suspendedByPage=false;
 const arrangements={
  court:{beat:.58,harp:.15,reed:.17,drum:0,rest:.55},
  intimacy:{beat:.66,harp:.13,reed:.19,drum:0,rest:.72},
  campaign:{beat:.5,harp:.15,reed:.14,drum:0,rest:.4},
  instability:{beat:.56,harp:.12,reed:.14,drum:0,rest:.66},
  reflection:{beat:.72,harp:.12,reed:.16,drum:0,rest:.9}
 };
 // A soft D-Dorian recorder tune, answered by a simple folk-harp pattern.
 // Repeating, singable phrases replace the earlier disconnected note fragments.
 const motifs=[
  [69,null,67,null,64,67,null,69,72,null,69,null,67,64,null,62],
  [64,null,67,69,null,72,null,69,67,null,64,null,62,null,60,null],
  [62,null,64,67,null,69,null,67,64,null,62,null,60,null,62,null],
  [67,null,69,null,72,69,67,null,64,null,67,null,69,null,67,null],
  [72,null,69,67,null,69,null,72,69,null,67,64,null,62,null,60],
  [69,67,null,64,null,67,69,null,72,null,69,67,null,64,62,null],
  [64,null,62,64,null,67,null,69,72,null,69,67,null,64,null,62],
  [67,null,64,null,67,69,null,72,69,null,67,64,null,62,null,60]
 ];
 const harmony=[[50,53,57],[55,59,62],[60,64,67],[57,60,64]]; // Dm · G · C · Am
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
   const melody=motifs[phrase%motifs.length],lead=melody[step];
   const inflection=1+Math.sin((phrase*17+step*7)*1.31)*.035;
   const half=step<8?0:1,chord=harmony[(phrase*2+half)%harmony.length];
   if(lead!==null){
    const t=next+Math.sin(step*3+phrase)*.012;
    note('recorder',lead,t,Math.min(a.beat*1.75,1.25),a.reed*inflection);
   }
   // Root notes and quiet chord tones give the melody a recognizable home.
   if(step===0||step===8)note('harp',chord[0],next,1.65,a.harp*.38);
   if(step%4===2){const tone=chord[(step/4|0)%2+1];note('harp',tone,next+.05,Math.min(a.beat*1.35,.9),a.harp*.58);}
   step++;next+=a.beat*(1+Math.sin(step+phrase)*.025);
   if(step>=p.length){step=0;phrase++;next+=a.rest+(phrase%3)*.25;}
  }
 }
 async function unlock(){try{await context().resume();await load();}catch{} }
 async function startMusic(){
  if(on)return;const ticket=++request;on=true;status='loading';notify();
  try{await context().resume();await load();if(!on||ticket!==request)return;clearInterval(timer);next=ctx.currentTime+.15;step=0;status='playing';timer=setInterval(tick,120);tick();notify();}catch{if(ticket!==request)return;status='unavailable';on=false;notify();}
 }
 async function toggle(){
  if(on){musicChoice=false;++request;on=false;clearInterval(timer);timer=null;silence(.8);status='off';notify();return;}
  musicChoice=true;return startMusic();
 }
 function begin(){if(musicChoice===false||on)return;return startMusic();}
 function setMood(nextMood){if(!(nextMood in arrangements)||nextMood===requestedMood)return;requestedMood=nextMood;if(!on)mood=requestedMood;notify();}
 const cues={
  tap:{click:.024,notes:[['harp',69,.008,.22,.045]]},
  open:{click:.021,notes:[['harp',62,.008,.24,.044],['harp',71,.075,.27,.035]]},
  close:{click:.019,notes:[['harp',71,.008,.2,.04],['harp',62,.07,.22,.03]]},
  tab:{click:.018,notes:[['harp',66,.008,.2,.035]]},
  inspect:{click:.016,notes:[['harp',62,.008,.25,.032]]},
  listen:{click:.014,notes:[['recorder',67,.012,.27,.035],['harp',62,.035,.2,.024]]},
  decision:{click:.035,notes:[['harp',62,.008,.42,.07],['harp',69,.06,.34,.052]]},
  save:{click:.024,notes:[['harp',67,.008,.2,.04],['harp',74,.075,.24,.032]]},
  page:{click:.015,notes:[['harp',69,.008,.24,.03]]}
 };
 function ui(kind='tap'){if(!sfx)return;if(!ctx||!buffer){unlock();return;}if(ctx.state==='suspended')ctx.resume().catch(()=>{});const t=ctx.currentTime+.005,cue=cues[kind]||cues.tap;
  note('click',0,t,.12,cue.click,true);for(const [instrument,midi,delay,duration,gain] of cue.notes)note(instrument,midi,t+delay,duration,gain,true);
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
 function setVolume(v){volume=Math.max(0,Math.min(.65,v));save();notify();}
 function toggleSfx(){sfx=!sfx;if(!sfx)paperAudio.pause();if(sfx)ui();save();notify();}
 document.addEventListener('visibilitychange',()=>{if(document.hidden){paperAudio.pause();stopWorld();}if(!ctx)return;if(document.hidden){suspendedByPage=on;silence(.06,true);ctx.suspend().catch(()=>{});}else if(suspendedByPage){suspendedByPage=false;ctx.resume().then(()=>{next=ctx.currentTime+.3;}).catch(()=>{});}});
 window.addEventListener('pagehide',()=>{paperAudio.pause();stopWorld();silence(.02,true);if(ctx)ctx.suspend().catch(()=>{});});
 return {toggle,begin,unlock,ui,paper,world,stopWorld,toggleWorld,setWorldVolume,setMood,setVolume,toggleSfx,subscribe:f=>{listeners.add(f);notify();},getState:()=>({on,sfx,volume,mood,requestedMood,step,phrase,status,voices:voices.size,ready:!!buffer,worldEnabled,worldVolume,worldStatus,worldKey,worldKind,worldTime:worldAudio.currentTime,worldPaused:worldAudio.paused})};
})();
