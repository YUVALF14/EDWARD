'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const manifest=JSON.parse(fs.readFileSync('assets/audio/court-samples.json','utf8'));
const started=[],played=[],timers=new Set();
const param=()=>({value:0,setValueAtTime(){},linearRampToValueAtTime(){},cancelScheduledValues(){},setTargetAtTime(){}});
class AudioMock{constructor(src=''){this.src=src;this.currentTime=0;this.volume=1;this.paused=true;this.readyState=4;this.listeners={};}play(){this.paused=false;played.push(this.src);return Promise.resolve();}pause(){this.paused=true;}addEventListener(k,f){this.listeners[k]=f;}}
class AudioContextMock{constructor(){this.currentTime=10;this.state='suspended';this.destination={};}async resume(){this.state='running';}async suspend(){this.state='suspended';}async decodeAudioData(){return {duration:120};}createGain(){return {gain:param(),connect(){},disconnect(){}};}createBufferSource(){return {playbackRate:param(),connect(){},disconnect(){},start(when,offset){started.push({when,offset});},stop(){}};}}
const x={console,Audio:AudioMock,AbortController,setTimeout,clearTimeout,setInterval(f){timers.add(f);return f;},clearInterval(f){timers.delete(f);},localStorage:{getItem(){return null;},setItem(){}},document:{hidden:false,addEventListener(){}},window:{AudioContext:AudioContextMock,addEventListener(){}},fetch:async url=>String(url).endsWith('.json')?{ok:true,json:async()=>manifest}:{ok:true,arrayBuffer:async()=>new ArrayBuffer(8)}};
vm.createContext(x);vm.runInContext(fs.readFileSync('edward-acoustic.js','utf8')+'\nthis.audio=CourtAudio;',x);
const kinds=offsets=>offsets.map(o=>manifest.samples.find(s=>s.offset===o)?.kind);
(async()=>{
 x.audio.ui('tap');await x.audio.unlock();await Promise.resolve();
 assert(started.length>0,'The first cold button tap is heard after its samples load');
 await x.audio.begin();await x.audio.unlock();assert.equal(x.audio.getState().status,'playing','music starts after a permitted gesture');
 started.length=0;x.audio.ui('tap');const tap=kinds(started.map(n=>n.offset));assert.deepEqual(tap,['harp']);assert(started.every(n=>manifest.samples.find(s=>s.offset===n.offset).midi<=55),'Tap uses the warm low register');
 started.length=0;x.audio.ui('decision');const decision=kinds(started.map(n=>n.offset));assert.equal(decision.filter(k=>k==='harp').length,2);assert(!decision.includes('click'));
 started.length=0;x.audio.ui('open');const open=started.map(n=>n.offset);started.length=0;x.audio.ui('close');const close=started.map(n=>n.offset);assert.notDeepEqual(open,close,'opening and closing use distinct short cues');
 started.length=0;x.audio.ui('listen');assert(kinds(started.map(n=>n.offset)).every(k=>k==='harp'));
 const music=played.filter(src=>src.includes('Enchanted%20Journey.mp3')).length;x.audio.setMood('instability');x.audio.setMood('court');assert.equal(played.filter(src=>src.includes('Enchanted%20Journey.mp3')).length,music,'Mood changes do not restart the composition');
 x.audio.paper();assert(played.some(src=>src.includes('paper-open.mp3')),'paper opening plays its recorded page sound');
 await x.audio.toggle();assert.equal(x.audio.getState().on,false);await x.audio.begin();await x.audio.unlock();assert.equal(x.audio.getState().on,false,'an explicit music-off choice is respected');
 started.length=0;x.audio.toggleSfx();x.audio.ui('decision');await Promise.resolve();assert.equal(started.length,0,'Interface mute silences button feedback independently of music');
 x.audio.toggleSfx();assert(started.length>0,'Re-enabling interface sounds provides feedback');
 for(const f of timers)clearInterval(f);console.log('PASS audio feedback: gesture-started continuous licensed harp score, low recorded strings, differentiated tap/open/close/listen/decision cues, paper sound, and explicit mute respected.');
})().catch(e=>{console.error(e);process.exitCode=1;});
