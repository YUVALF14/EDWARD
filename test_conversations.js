'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const x={};vm.createContext(x);vm.runInContext(['edward-court.js','edward-conversations.js'].map(p=>fs.readFileSync(p,'utf8')).join('\n')+'\nthis.api={COURT_TALKS,conversationAt,answerConversation};',x);
const {COURT_TALKS,conversationAt:at,answerConversation:answer}=x.api;
const state=(date=14610401)=>({date,flags:{},log:[],hastings:8,warwick:0,woodville:0,clarence:4,gloucester:0});
assert.equal(new Set(COURT_TALKS.map(c=>c.id)).size,COURT_TALKS.length);
for(const c of COURT_TALKS){
 assert(c.from<c.to);assert(c.beats.length===2);
 const v=state(c.from);const p=at(c.person,v,'London');assert(p.available,c.id);
 assert.equal(p.id,c.id,'No overlapping date-gated topics');
 for(const b of c.beats){assert(b.quote.length>20);assert(b.replies.length>=2&&b.replies.length<=3);for(const r of b.replies){assert(r.line&&r.answer);assert(Object.values(r.rel).every(n=>Math.abs(n)<=1));}}
}
assert(!at('henry',state(14620901),'London').available,'No invented meeting while Henry is a fugitive');
assert(!at('henry',state(14701104),'Bruges').available,'Edward cannot summon the restored king while in exile');
assert(!at('henry',state(14710522),'London').available,'The dead cannot answer');
assert(!at('warwick',state(14710414),'London').available,'Barnet remains an availability boundary');
assert.equal(at('gloucester',state(14610401),'York').id,'richard-child','Richard is a child in 1461');
assert.equal(at('clarence',state(14610401),'York').id,'george-child','George is a child in 1461');
assert.equal(at('henry',state(14660101),'York').mode,'keeper','The portrait cannot teleport Edward to the Tower');
assert.equal(at('henry',state(14660101),'London').mode,'custody');
assert.equal(at('henry',state(14710505),'London').id,'henry-lastnews','The son is not described as alive after Tewkesbury');
const h=state();assert(answer('hastings',0,h,'York'));assert.equal(h.hastings,9);assert.equal(h.log.length,0,'Private conversation does not consume a royal decision');
const saved=JSON.parse(JSON.stringify(h));assert.equal(at('hastings',saved,'York').stage,1,'Save/reload keeps the exact conversational turn');
assert(answer('hastings',0,saved,'York'));const standing=saved.hastings;assert(at('hastings',saved,'York').complete);assert(!answer('hastings',0,saved,'York'));assert.equal(saved.hastings,standing,'Reopening cannot farm affection');
const henry=state(14660101);assert(answer('henry',0,henry,'York'));assert(at('henry',henry,'York').pending);assert(!answer('henry',0,henry,'London'),'Travel cannot be bypassed by a different current location');
const travelled=JSON.parse(JSON.stringify(henry));travelled.log.push({});assert(!at('henry',travelled,'York').pending);assert(answer('henry',0,travelled,'York'));assert(at('henry',travelled,'York').pending);travelled.log.push({});assert(at('henry',travelled,'York').complete);assert(!at('henry',travelled,'York').pending);assert.equal(travelled.flags['personal:henryLetters'],1);
travelled.date=14710412;assert.match(at('henry',travelled,'London').memory,/book/,'Later custody remembers an earlier human action');
const distant=state(14701104);assert.equal(at('elizabeth',distant,'Bruges').mode,'letter');assert.equal(at('cecily',distant,'Bruges').mode,'letter');assert.equal(at('hastings',distant,'Bruges').mode,'private');
assert(Object.values(travelled.flags).every(Number.isFinite),'Conversation memory stays compatible with numeric save flags');
console.log('PASS:',COURT_TALKS.length,'two-turn court exchanges; chronology, remote delay, childhood, family memory, save round-trip and replay guard.');
