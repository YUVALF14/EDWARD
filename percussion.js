/* A quiet frame-drum accompaniment, synthesized locally. No sample download.
   An interpretive score: neither this drum nor the piano is a surviving court performance. */
const EDWARD_DRUM={voices:new Set(),noise:null,context:null};
let scorePercussion=true;try{scorePercussion=localStorage.getItem('edward_percussion_v1')!=='off';}catch(e){}
function edwardDrumStop(){for(const node of [...EDWARD_DRUM.voices]){try{node.stop();}catch(e){}node.disconnect();}EDWARD_DRUM.voices.clear();}
function edwardFrameDrum(when,level=.05,slap=false){
 const a=EDWARD_SCORE;if(!a.on||!a.ctx||!scorePercussion)return;edwardScoreGraph();const ctx=a.ctx;
 if(EDWARD_DRUM.context!==ctx){const buffer=ctx.createBuffer(1,Math.floor(ctx.sampleRate*.22),ctx.sampleRate),data=buffer.getChannelData(0);let seed=7941;for(let i=0;i<data.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;data[i]=(seed/4294967296*2-1)*Math.exp(-i/(ctx.sampleRate*.065));}EDWARD_DRUM.noise=buffer;EDWARD_DRUM.context=ctx;}
 const body=ctx.createOscillator(),bodyGain=ctx.createGain(),skin=ctx.createBufferSource(),skinGain=ctx.createGain(),filter=ctx.createBiquadFilter();
 body.type='sine';body.frequency.setValueAtTime(slap?145:104,when);body.frequency.exponentialRampToValueAtTime(slap?88:61,when+.11);
 bodyGain.gain.setValueAtTime(.00001,when);bodyGain.gain.linearRampToValueAtTime(level,when+.006);bodyGain.gain.exponentialRampToValueAtTime(.00001,when+.5);
 skin.buffer=EDWARD_DRUM.noise;filter.type='bandpass';filter.frequency.setValueAtTime(slap?1500:700,when);filter.Q.value=.7;
 skinGain.gain.setValueAtTime(.00001,when);skinGain.gain.linearRampToValueAtTime(level*(slap?1.4:.7),when+.003);skinGain.gain.exponentialRampToValueAtTime(.00001,when+.2);
 body.connect(bodyGain);skin.connect(filter);filter.connect(skinGain);bodyGain.connect(a.instrumentBus);skinGain.connect(a.instrumentBus);skinGain.connect(a.room);
 for(const node of [body,skin])EDWARD_DRUM.voices.add(node);
 body.onended=()=>{EDWARD_DRUM.voices.delete(body);body.disconnect();bodyGain.disconnect();};skin.onended=()=>{EDWARD_DRUM.voices.delete(skin);skin.disconnect();filter.disconnect();skinGain.disconnect();};
 body.start(when);body.stop(when+.52);skin.start(when);skin.stop(when+.22);
}
function edwardPercussionBeat(step,when,mood,tension){
 if(!scorePercussion)return;const urgent=mood==='battle'||tension>.65;
 if(step%(mood==='succession'?8:4)===0)edwardFrameDrum(when,urgent?.075:.042);
 else if(urgent&&step%4===2)edwardFrameDrum(when,.03,true);
 else if(mood==='sea'&&step%8===6)edwardFrameDrum(when,.024,true);
}
function edwardSetPercussion(on){scorePercussion=!!on;try{localStorage.setItem('edward_percussion_v1',on?'on':'off');}catch(e){}if(!on)edwardDrumStop();edwardSyncAudioButtons();}
