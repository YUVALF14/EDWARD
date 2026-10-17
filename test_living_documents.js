'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const x={};vm.createContext(x);vm.runInContext(fs.readFileSync('edward-reign-data.js','utf8')+'\n'+fs.readFileSync('edward-court.js','utf8')+'\n'+fs.readFileSync('edward-depth-data.js','utf8')+'\nthis.data={ACTS,SCENES,PEOPLE,DOCUMENTS};',x);
const {ACTS,SCENES,PEOPLE,DOCUMENTS}=x.data;
for(const id of ['cecily','anthony','margaretYork'])assert(PEOPLE[id].portrait, id+' has a portrait');
const scenes=SCENES.flat();assert.equal(scenes.length,272);
const required=['A widow’s petition','The price of splendour','A complaint under seal','Letters under watch','A letter from the queen','Your sister’s influence','Behind sanctuary walls'];
for(const title of required)assert(scenes.find(c=>c.title===title).documents.length,title+' delivers a document');
for(const c of scenes){
 for(const id of c.documents||[]){const d=DOCUMENTS[id];assert(d&&d.author&&d.origin&&d.delivery&&d.paragraphs.length);}
 if(c.place.includes('letter'))assert(c.courtPlace,'Correspondence has a physical court location');
}
assert.equal(scenes.find(c=>c.title==='Behind sanctuary walls').courtPlace,'Low Countries');
for(const d of Object.values(DOCUMENTS))for(const v of d.variants||[]){assert(scenes.some(c=>c.title===v.scene&&c.choices.some(o=>o.k===v.choice)),'Callback names an actual decision');}
for(const a of [...ACTS,...scenes.flatMap(c=>c.events||[])])if(a.art)assert(fs.existsSync(a.art),a.art);
console.log('PASS: portrait mappings, document coverage, real choice callbacks, court/origin separation and static art.');
