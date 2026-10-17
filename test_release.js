'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const x={};vm.createContext(x);vm.runInContext(fs.readFileSync('edward-reign-data.js','utf8')+'\n'+fs.readFileSync('edward-court.js','utf8')+'\n'+fs.readFileSync('edward-depth-data.js','utf8')+'\nthis.data={ACTS,SCENES,PEOPLE,NOTES,personAt,courtAt};',x);
const {ACTS,SCENES,PEOPLE,NOTES,personAt,courtAt}=x.data;
assert.equal(ACTS.length,4);assert.equal(SCENES.flat().length,272);assert.equal(new Set(SCENES.flat().map(c=>c.title)).size,272);
const actionSource=fs.readFileSync('edward-reign.js','utf8').match(/const ACTION=(\{[\s\S]*?\});\nfunction getChoices/);
assert(actionSource,'The active campaign has a choice-effect table');
const actionKeys=new Set(vm.runInNewContext('Object.keys('+actionSource[1]+')'));
let date=0;
for(const [act,scenes] of SCENES.entries()){
 assert.equal(scenes.length,68,'Each act has sixty-eight authored reserve scenes');
 for(const c of scenes){
  assert(c.date>=date,'Chronology never runs backward');date=c.date;
  assert(PEOPLE[c.person],'Speaker has an identity');assert(personAt(c.person,c.date,{}).alive,'A living speaker is required');
  assert(c.choices.length>=2&&c.choices.length<=3,'Two or three legible responses');assert(new Set(c.choices.map(o=>o.t)).size===c.choices.length);
  for(const o of c.choices)assert(actionKeys.has(o.k),'Every choice has an implemented political effect: '+o.k+' · '+c.title);
  assert(!c.history||NOTES[c.history],'Every historical pop-up has content');
  for(const group of Object.values(courtAt(c.date,{})))for(const id of group)assert(personAt(id,c.date,{}).alive,'Dead people do not remain in the active network');
 }
}
const ids=(date,flags={})=>Object.values(courtAt(date,flags)).flat();
assert(!ids(14610401).includes('elizabeth'));assert(!ids(14610401).includes('jacquetta'));
assert.match(personAt('elizabeth',14610401,{}).office,/widowed/);
assert.match(personAt('elizabeth',14640515,{}).office,/coronation still ahead/);
assert.equal(personAt('elizabeth',14650526,{}).office,'Queen of England');
assert(!courtAt(14701001,{}).at.includes('warwick'));assert(courtAt(14701001,{}).at.includes('gloucester'));
assert(!ids(14710522).includes('warwick'));assert(!ids(14710522).includes('henry'));
assert(date<=14711231,'The release ends within 1471');assert(ids(14710522).includes('clarence'));assert(ids(14710522).includes('jacquetta'));
assert.match(personAt('anthony',14670601,{}).office,/Lord Scales/);assert.match(personAt('anthony',14690813,{}).office,/Earl Rivers/);
const manifest=JSON.parse(fs.readFileSync('assets/audio/court-samples.json','utf8'));
assert(manifest.samples.length>=20);assert.equal(manifest.license,'CC0-1.0');assert(fs.statSync('assets/audio/court-samples.mp3').size<1500000);
for(const p of Object.values(PEOPLE))if(p.portrait)assert(fs.existsSync('assets/art/portraits/'+p.portrait+'.webp'));
console.log('PASS: 4 periods, 272 distinct scenes, monotonic chronology, living speakers, era-specific courts, marriage/title transitions, recorded audio bank, portraits.');
