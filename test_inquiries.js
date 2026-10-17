'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const files=['edward-reign-data.js','edward-court.js','edward-depth-data.js'];
const sandbox={};vm.createContext(sandbox);vm.runInContext(files.map(f=>fs.readFileSync(f,'utf8')).join('\n')+';this.scenes=SCENES;',sandbox);
const source=fs.readFileSync('edward-reign.js','utf8'),block=source.match(/const INQUIRIES=(\{[\s\S]*?\n\});/);
assert(block,'The campaign has an authored hearing system');
const inquiries=vm.runInContext('('+block[1]+')',sandbox),all=sandbox.scenes.flat();
assert.equal(Object.keys(inquiries).length,10);
for(const [title,q] of Object.entries(inquiries)){
 assert(all.some(c=>c.title===title),'Hearing must belong to a real campaign card: '+title);
 assert(q.id&&q.name&&q.role&&q.text.length>80,'Hearing contains an identifiable, situated voice: '+title);
 assert(q.response.k&&q.response.t&&q.response.d&&q.response.result,'Heard evidence supports a distinct royal response: '+title);
 assert(q.response.effect&&Object.keys(q.response.effect).length,'The grounded response changes game state: '+title);
 assert(source.includes('S.flags[\'heard:\'+q.id]'),'Hearing is saved as campaign state');
}
assert(inquiries['At the roadside cross'].text.includes('bread'));
assert(inquiries['The king’s supper'].response.effect.coin<0,'Ordinary care uses household resources');
assert(inquiries['A shipmaster reads the terms'].response.effect.channel>0,'International negotiation changes readiness and diplomatic state');
assert(source.includes('q?.response.k===l.key&&q?.response.t===l.choice'),'Saved chronicles recognize evidence-unlocked choices');
assert.match(source,/if\(inquiry&&!S\.flags\['heard:'\+inquiry\.id\]\)return/,'Answers cannot bypass a required hearing');
console.log('PASS: ten authored hearings are tied to real scenes, preserve distinct voices, unlock consequential responses and remain save-compatible.');
