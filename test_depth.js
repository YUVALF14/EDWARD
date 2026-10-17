'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const x={};vm.createContext(x);
vm.runInContext(['edward-reign-data.js','edward-court.js','edward-depth-data.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n')+'\nthis.content={SCENES,THREADS,PEOPLE,NOTES,DOCUMENTS};',x);
const {SCENES,THREADS,PEOPLE,NOTES,DOCUMENTS}=x.content;
assert.equal(SCENES.flat().length,272,'The authored reserve includes eight additional relationship stories');
assert.equal(THREADS.length,48);assert.equal(new Set(SCENES.flat().map(c=>c.title)).size,272);
let date=0;
for(const act of SCENES){assert.equal(act.length,68);for(const c of act){
 assert(c.date>=date);date=c.date;assert(PEOPLE[c.person]);assert(!c.history||NOTES[c.history]);
 assert(c.choices.length>=2&&c.choices.length<=3);assert(c.quote.length>35);
 for(const id of c.documents||[])assert(DOCUMENTS[id]);
}}
for(const t of THREADS){const scenes=SCENES[t.act].filter(c=>c.thread===t.id);assert.equal(scenes.length,4);assert(scenes[3].branches,'A later scene remembers the opening choice');}
assert(SCENES[2].filter(c=>c.person==='gloucester').length>=4,'Gloucester participates in 1469');
assert(Object.keys(DOCUMENTS).length>=30,'World papers, not just decision prose');
for(const id of ['edward','warwick','elizabeth','hastings','clarence','gloucester','cecily'])assert(PEOPLE[id].bio.length>130,'Distinctive profile for '+id);
const reunion=SCENES[3].find(c=>c.title==='Richard and George at one table'),men=SCENES[3].find(c=>c.title==='The men he has brought');
assert.match(reunion.quote,/answers the old suspicion/i,'The brothers can misunderstand one another');
assert.equal(men.choices.length,3,'A personal question gives the king a third response');
assert(men.choices.some(o=>o.k==='clarence'&&/name the men/i.test(o.t)),'George takes responsibility for his own following');
const html=fs.readFileSync('edward-loop-demo.html','utf8');
assert(!html.includes('id="royalCouncil"')&&!html.includes('id="councilDialog"'),'The world presents business through audience cards');
assert(!html.includes('id="step"'),'Card numbers are hidden');
assert(html.includes('21, 25, or 29 audiences'),'The opening explains that loops have variable lengths');
assert(html.includes('edward-reign.js?v=1.5.0'),'Release modules use a new cache key');
const route={};vm.createContext(route);vm.runInContext(['edward-reign-data.js','edward-court.js','edward-depth-data.js','edward-depth.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n')+'\nthis.route={depthFresh,prepareAct,validItinerary,campaignScenes,selectReserve,selectCoreReserve,REIGN_CORE_ANCHORS,loopPressure,loopThreadCount};',route);
const R=route.route,variants=new Set(),seen=new Set();
const concise=R.depthFresh();Object.assign(concise,{authority:85,order:85,succession:85,warwick:0,woodville:0,hastings:0,gloucester:0,clarence:0,factions:{crown:70,neville:50,queen:50,brothers:40,lancastrian:30},open:0,broken:0});
const strained=R.depthFresh();Object.assign(strained,{authority:20,order:20,succession:20,warwick:50,woodville:-40,hastings:-30,gloucester:35,clarence:-45,factions:{crown:25,neville:80,queen:60,brothers:70,lancastrian:70},open:8,broken:4});
assert(R.loopThreadCount(concise)<R.loopThreadCount(strained),'A troubled court draws more linked stories into the next loop');
for(let seed=1;seed<=120;seed++){
 let value=seed,v=R.depthFresh();v.flags={};v.log=[];Object.assign(v,{authority:52,order:50,succession:35,warwick:0,woodville:0,hastings:8,gloucester:0,clarence:4,open:0,broken:0,factions:{crown:56,neville:55,queen:0,brothers:8,lancastrian:32}});
 let n=0;const random=()=>Math.abs(Math.sin((seed*17+(++n)*29)*12.9898)*43758.5453)%1;
 for(let a=0;a<4;a++){
  v.cycle=a;R.prepareAct(a,v,random);assert(R.validItinerary(v));const cards=R.campaignScenes(a,v);
  assert([21,25,29].includes(cards.length),'Loop length is mathematically chosen from the previous court state');assert.equal(cards.length,v.loopLengths[a]);assert.equal(cards.filter(c=>!c.thread).length,9);
  assert(v.itinerary[a].length>=3&&v.itinerary[a].length<=5);assert.equal(v.coreItinerary[a].length,9);
  assert(R.REIGN_CORE_ANCHORS[a].every(title=>v.coreItinerary[a].includes(title)),'Historical route anchors remain present');
  for(const id of v.itinerary[a]){seen.add(id);assert.equal(cards.filter(c=>c.thread===id).length,4,'Selected stories stay complete');}
  assert(cards.every((c,i)=>!i||c.date>=cards[i-1].date),'Generated route stays chronological');
  if(a<3){
   v.log.push(...Array.from({length:cards.length},(_,i)=>({key:['queen','hastings','burgundy','investigate'][i%4]})));
   if((seed+a)%3===0)Object.assign(v,{authority:82,order:78,succession:74,warwick:4,woodville:3,hastings:2,gloucester:2,clarence:1,open:0,broken:0,factions:{crown:70,neville:52,queen:45,brothers:35,lancastrian:25}});
   else if((seed+a)%3===1)Object.assign(v,{authority:28,order:30,succession:32,warwick:38,woodville:-32,hastings:-12,gloucester:20,clarence:-28,open:7,broken:2,factions:{crown:32,neville:75,queen:68,brothers:64,lancastrian:58}});
   else Object.assign(v,{authority:52,order:50,succession:46,warwick:10,woodville:-8,hastings:3,gloucester:7,clarence:-4,open:2,broken:0,factions:{crown:54,neville:59,queen:40,brothers:32,lancastrian:33}});
  }
 }
 variants.add(JSON.stringify([v.itinerary,v.coreItinerary]));
 const restored=JSON.parse(JSON.stringify(v));assert.deepEqual(Array.from(R.campaignScenes(0,restored),c=>c.title),Array.from(R.campaignScenes(0,v),c=>c.title),'Saving preserves the generated route');
}
assert(variants.size>100,'New reigns vary their chosen cards');assert.equal(seen.size,48,'All reserve stories can appear across replays');
const old=R.depthFresh();old.cycle=0;delete old.routeVersion;delete old.coreItinerary;old.itinerary[0]=R.selectReserve(0,old,()=>0.31,6);assert(R.validItinerary(old));assert.equal(R.campaignScenes(0,old).length,44,'Existing v4 saves retain their original act length');
const previous=R.depthFresh();previous.routeVersion=2;previous.cycle=0;R.prepareAct(0,previous,()=>0.3);assert(R.validItinerary(previous));assert.equal(R.campaignScenes(0,previous).length,25,'Existing adaptive-version saves keep their saved fixed route length');
console.log('PASS: 272-card reserve, 21/25/29 decision loops, historical anchors, pressure-weighted stories, route persistence and legacy save routes.');
