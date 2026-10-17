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
console.log('PASS: 240 distinct decisions, 40 four-part threads, dated profiles, a three-way human choice, world-led audiences, historical notes and papers.');
