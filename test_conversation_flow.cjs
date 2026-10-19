'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const {JSDOM}=require('jsdom');
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{url:'https://edward.test/',runScripts:'outside-only',pretendToBeVisual:true});const w=dom.window;
w.matchMedia=q=>({matches:q.includes('reduced-motion'),addListener(){},removeListener(){}});w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};
w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
class Media{constructor(src=''){this.src=src;this.currentTime=0;this.readyState=4;this.paused=true;this.volume=.3;}play(){this.paused=false;return Promise.resolve();}pause(){this.paused=true;}addEventListener(){}}
const param=()=>({setValueAtTime(){},linearRampToValueAtTime(){},cancelScheduledValues(){},setTargetAtTime(){}});
class Context{constructor(){this.currentTime=1;this.state='running';this.destination={};}resume(){return Promise.resolve();}suspend(){return Promise.resolve();}decodeAudioData(){return Promise.resolve({duration:120});}createGain(){return {gain:param(),connect(){},disconnect(){}};}createBufferSource(){return {playbackRate:{value:1},connect(){},disconnect(){},start(){},stop(){if(this.onended)this.onended();}};}}
w.Audio=Media;w.AudioContext=Context;w.fetch=async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync('assets/audio/court-samples.json')),arrayBuffer:async()=>new ArrayBuffer(8)});
const ctx=dom.getInternalVMContext();for(const f of ['edward-reign-data.js','edward-court.js','edward-depth-data.js','edward-depth.js','edward-conversations.js','edward-acoustic.js','edward-reign.js'])vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const run=s=>vm.runInContext(s,ctx);
(async()=>{
 w.document.getElementById('newGame').click();assert.equal(run('S.n'),0);assert.equal(w.document.querySelectorAll('dialog[open]').length,0,'One start click reaches the first audience');
 w.document.querySelector('[data-person="hastings"]').click();assert(w.document.getElementById('personDialog').open);assert.equal(w.document.querySelectorAll('[data-talk-reply]').length,2);w.document.querySelector('[data-talk-reply="0"]').click();assert.match(w.document.getElementById('talkReply').textContent,/stool/);assert(run('validSave(getSaved())'),'Talking preserves a valid campaign save');
 run('closeDialog("personDialog");loadAct();openProfile("hastings");');assert.equal(run('conversationAt("hastings",S,"York").stage'),1,'Reload returns to the same conversational turn');
 w.document.querySelector('[data-talk-reply="0"]').click();assert.equal(w.document.querySelectorAll('[data-talk-reply]').length,0);run('closeDialog("personDialog")');
 const routes=[];
 for(const style of ['mercy','command','listening']){
  run('startNew()');let count=0,henrySeen=false;while(!run('S.ended')&&count<130){
   const date=run('S.date');
   if(!henrySeen&&date>=14650701&&date<14701001){
    run('openProfile("henry")');assert(w.document.querySelectorAll('[data-talk-reply]').length>=2);w.document.querySelector('[data-talk-reply="0"]').click();assert(run('validSave(getSaved())'));run('closeDialog("personDialog")');henrySeen=true;
   }
   await run(`(async()=>{const q=INQUIRIES[scene().title];if(q&&!S.flags['heard:'+q.id])hearInquiry();const opts=getChoices();let i=0;const pref=${JSON.stringify(style==='mercy'?['pardon','faith','joint','hold','bounded','investigate','pay']:style==='command'?['assert','direct','execute','mobilize','hastings','gloucester','pay']:['investigate','council','joint','bounded','pay','hold'])};let rank=99;opts.forEach((o,j)=>{const n=pref.indexOf(o.k);if(n>=0&&n<rank){rank=n;i=j;}});if(scene().title==='A loose watch')i=opts.findIndex(o=>o.k==='investigate');if(scene().title==='The crown under guard')i=opts.findIndex(o=>o.k==='settle');await choose(Math.max(0,i));while($('storyDialog').open)$('storyNext').click();if($('actDialog').open)$('enterAct').click();})()`);
   count++;if(!run('S.ended'))assert(run('validSave(getSaved())'),'Valid save after audience '+count+' / '+style);
  }
  assert(run('S.ended'));assert(henrySeen);assert(run('S.date>=14710522'));assert(!run('S.dead||S.deposed'));assert(run('S.log.length===decisionsBefore(3,S)+actLength(3,S)'));
  routes.push({style,count,signature:run('$("signature").textContent')});
 }
 assert(new Set(routes.map(r=>r.signature)).size>1,'Alternative decisions produce different final political signatures');
 // An old save without conversation fields remains loadable.
 run('startNew();for(const k of Object.keys(S.flags))if(k.startsWith("talk:"))delete S.flags[k];persistAct(true);loadAct()');assert(run('validSave(getSaved())'));
 console.log('PASS actual DOM clicks, portrait conversation, persistent turns, old saves, and three complete generated campaigns:',routes.map(r=>r.style+' '+r.count).join(', '));
 dom.window.close();
})().catch(e=>{console.error(e);dom.window.close();process.exitCode=1;});
