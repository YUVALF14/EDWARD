/* Real recorded instruments only. CC0 VCSL harp, tenor recorder, frame drum
   and woodblock. Original modal arrangements; no oscillator fallback. */
const CourtAudio=(()=>{
 let ctx,buffer,samples=[],loading=null,on=false,sfx=true,volume=.3,mood='court',timer=null,next=0,step=0,phrase=0,status='off',request=0;
 const voices=new Set(),listeners=new Set();let suspendedByPage=false;
 const arrangements={
  court:{beat:.88,harp:.22,reed:.105,drum:0,rest:3.6},
  intimacy:{beat:1.12,harp:.19,reed:0,drum:0,rest:5.4},
  campaign:{beat:.73,harp:.18,reed:.105,drum:.07,rest:2.8},
  instability:{beat:1.02,harp:.15,reed:.075,drum:.035,rest:5},
  reflection:{beat:1.34,harp:.16,reed:.055,drum:0,rest:6.4}
 };
 // Eight related phrases, with varied lengths, cadences and answering voices.
 const phrases=[
  [62,null,65,67,69,null,67,65,64,null,62,null,60,62,null,null],
  [69,67,null,65,64,62,null,64,65,null,67,64,62,null,null,null],
  [62,null,64,65,67,null,65,null,69,67,65,64,62,null,null,null],
  [65,64,62,null,60,null,62,64,65,null,64,60,62,null,null,null],
  [69,null,72,69,67,65,null,64,62,null,65,64,62,null,null,null],
  [62,65,null,69,67,null,65,64,60,null,64,65,62,null,null,null],
  [67,null,69,67,65,64,null,62,64,65,67,null,62,null,null,null],
  [65,null,64,62,60,62,null,65,64,null,60,null,62,null,null,null]
 ];
 const notify=()=>listeners.forEach(f=>f({on,sfx,volume,mood,status,ready:!!buffer}));
 try{const p=JSON.parse(localStorage.getItem('edward-audio-v3')||'null');if(p){sfx=p.sfx!==false;if(Number.isFinite(p.volume))volume=Math.max(0,Math.min(.65,p.volume));}}catch{}
 const save=()=>{try{localStorage.setItem('edward-audio-v3',JSON.stringify({sfx,volume}));}catch{}};
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
  const a=arrangements[mood];
  while(next<ctx.currentTime+.32){
   const p=phrases[phrase%phrases.length],n=p[step];
   const inflection=1+Math.sin((phrase*17+step*7)*1.31)*.075;
   if(n!==null){const t=next+Math.sin(step*3+phrase)*.012;
    note('harp',n,t,3.9,a.harp*inflection);
    // Recorder answers in alternate phrases, leaving audible breath between notes.
    if(a.reed&&phrase%3!==0&&step%3!==1)note('recorder',n,t+.055,Math.min(a.beat*1.7,2.6),a.reed*inflection);
   }
   if(step%4===0&&step<13){const bass=(step===8&&phrase%2?48:50);note('harp',bass,next,4.9,a.harp*.72);if(step%8===0)note('harp',bass+7,next+.13,4.2,a.harp*.44);}
   if(a.drum&&step%4===0&&phrase%3!==1)note(phrase%2?'drum2':'drum',0,next,1.2,a.drum);
   step++;next+=a.beat*(1+Math.sin(step+phrase)*.025);
   if(step>=p.length){step=0;phrase++;next+=a.rest+(phrase%3)*1.15;}
  }
 }
 async function unlock(){try{await context().resume();await load();}catch{} }
 async function toggle(){
  const ticket=++request;
  if(on){on=false;clearInterval(timer);timer=null;silence(.8);status='off';notify();return;}
  on=true;status='loading';notify();
  try{await context().resume();await load();if(!on||ticket!==request)return;clearInterval(timer);next=ctx.currentTime+.15;step=0;status='playing';timer=setInterval(tick,120);tick();notify();}catch{if(ticket!==request)return;status='unavailable';on=false;notify();}
 }
 function setMood(nextMood){if(!(nextMood in arrangements)||nextMood===mood)return;mood=nextMood;if(on&&ctx){silence(1.4);step=0;phrase++;next=ctx.currentTime+1.6;}notify();}
 function ui(kind='tap'){if(!sfx)return;if(!ctx||!buffer){unlock();return;}if(ctx.state==='suspended')ctx.resume().catch(()=>{});const t=ctx.currentTime+.005;note('click',0,t,.16,kind==='decision'?.13:.07,true);if(kind==='decision')note('harp',62,t+.035,.65,.09,true);}
 function setVolume(v){volume=Math.max(0,Math.min(.65,v));save();notify();}
 function toggleSfx(){sfx=!sfx;if(sfx)ui();save();notify();}
 document.addEventListener('visibilitychange',()=>{if(!ctx)return;if(document.hidden){suspendedByPage=on;silence(.06,true);ctx.suspend().catch(()=>{});}else if(suspendedByPage){suspendedByPage=false;ctx.resume().then(()=>{next=ctx.currentTime+.3;}).catch(()=>{});}});
 window.addEventListener('pagehide',()=>{silence(.02,true);if(ctx)ctx.suspend().catch(()=>{});});
 return {toggle,unlock,ui,setMood,setVolume,toggleSfx,subscribe:f=>{listeners.add(f);notify();},getState:()=>({on,sfx,volume,mood,status,voices:voices.size,ready:!!buffer})};
})();
