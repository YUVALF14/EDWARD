'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const x={};vm.createContext(x);
vm.runInContext(['edward-reign-data.js','edward-court.js','edward-depth-data.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n')+'\nthis.content={SCENES,THREADS,PEOPLE,NOTES,DOCUMENTS};',x);
const {SCENES,THREADS,PEOPLE,NOTES,DOCUMENTS}=x.content;
assert.equal(SCENES.flat().length,240,'Triple the original authored campaign');
assert.equal(THREADS.length,40);assert.equal(new Set(SCENES.flat().map(c=>c.title)).size,240);
let date=0;
for(const act of SCENES){assert.equal(act.length,60);for(const c of act){
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
assert(html.includes('edward-reign.js?v=1.3.2'),'Release modules use a new cache key');
const route={};vm.createContext(route);vm.runInContext(['edward-reign-data.js','edward-court.js','edward-depth-data.js','edward-depth.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n')+'\nthis.route={depthFresh,prepareAct,validItinerary,campaignScenes,selectReserve,selectCoreReserve,REIGN_CORE_ANCHORS};',route);
const R=route.route,variants=new Set(),seen=new Set();
for(let seed=1;seed<=120;seed++){
 let value=seed,v=R.depthFresh();v.flags={};v.log=[];v.warwick=0;v.hastings=8;v.gloucester=0;v.woodville=0;
 let n=0;const random=()=>Math.abs(Math.sin((seed*17+(++n)*29)*12.9898)*43758.5453)%1;
 for(let a=0;a<4;a++){
  v.cycle=a;R.prepareAct(a,v,random);assert(R.validItinerary(v));const cards=R.campaignScenes(a,v);
  assert.equal(cards.length,25,'New acts contain exactly twenty-five decisions');assert.equal(cards.filter(c=>!c.thread).length,9);
  assert.equal(v.itinerary[a].length,4);assert.equal(v.coreItinerary[a].length,9);
  assert(R.REIGN_CORE_ANCHORS[a].every(title=>v.coreItinerary[a].includes(title)),'Historical route anchors remain present');
  for(const id of v.itinerary[a]){seen.add(id);assert.equal(cards.filter(c=>c.thread===id).length,4,'Selected stories stay complete');}
  assert(cards.every((c,i)=>!i||c.date>=cards[i-1].date),'Generated route stays chronological');
  if(a<3)v.log.push(...Array.from({length:25},(_,i)=>({key:['queen','hastings','burgundy','investigate'][i%4]})));
 }
 variants.add(JSON.stringify([v.itinerary,v.coreItinerary]));
 const restored=JSON.parse(JSON.stringify(v));assert.deepEqual(Array.from(R.campaignScenes(0,restored),c=>c.title),Array.from(R.campaignScenes(0,v),c=>c.title),'Saving preserves the generated route');
}
assert(variants.size>100,'New reigns vary their chosen cards');assert.equal(seen.size,40,'All reserve stories can appear across replays');
const old=R.depthFresh();old.cycle=0;delete old.routeVersion;delete old.coreItinerary;old.itinerary[0]=R.selectReserve(0,old,()=>0.31,6);assert(R.validItinerary(old));assert.equal(R.campaignScenes(0,old).length,44,'Existing v4 saves retain their original act length');
console.log('PASS: 240-card reserve, 25 decisions per new act, historical anchors, weighted learning loop, varied complete stories and legacy save routes.');
