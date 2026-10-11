/* A save-backed learning journey. Reading advice never spends funds or issues orders. */
function guideInit(s){return s.guidance||(s.guidance={schema:1,seen:{},muted:false});}
function guidePlayerTurns(s){return s.turn-(s.reign?.baseline?.turn||0);}
function guideStage(s,card){const g=guideInit(s);if(g.muted||s.finished)return null;const n=guidePlayerTurns(s),orders=s.court?.orders||[],audiences=s.court?.audiences||[];
 if(n===0&&!g.seen.first)return 'first';
 if(n>=1&&!g.seen.consequence)return 'consequence';
 if(card&&(card.up||card.down)&&!g.seen.hearing)return 'hearing';
 if(n>=3&&!g.seen.reading)return 'reading';
 if(n>=6&&!orders.length&&!g.seen.initiative)return 'initiative';
 if(orders.length&&audiences.some(m=>m.status==='open')&&!g.seen.reply)return 'reply';
 if(orders.some(o=>o.status==='travelling')&&!g.seen.travel)return 'travel';
 if(audiences.some(m=>m.status==='closed'&&m.transcript.length)&&!g.seen.effects)return 'effects';
 if((s.court?.promises||[]).some(p=>p.status==='open')&&!g.seen.promise)return 'promise';
 if(n>=12&&!g.seen.council)return 'council';
 if(s.sandbox?.credit<0&&!g.seen.accounts)return 'accounts';
 if(s.sandbox?.year>=1475&&!g.seen.succession)return 'succession';
 return null;}
const GUIDE_LESSONS={
 first:{title:'Your first royal decision',text:'A speaker has brought you a political question. Read the speaker’s request and The stakes, then choose the words you want Edward to say. The two main buttons commit a decision after the five-second reading pause.',action:'Return to the card',target:'card'},
 consequence:{title:'See what your words did',text:'Open the Chronicle and read your latest decision. Early decisions change recorded facts, offices and personal ties before the regional model begins in 1465. Effects may return through another speaker rather than a score popup.',action:'Open my latest record',target:'chronicle'},
 hearing:{title:'Listen before deciding',text:'The smaller counsel and private-audience buttons open another hearing. They do not commit a choice. Read the new testimony, then decide there or return to the original hearing. Private words have different witnesses.',action:'Show this hearing',target:'hearing'},
 reading:{title:'Control the amount of text',text:'Read more keeps the complete testimony, political background and historical source. Focus keeps the immediate problem visible; Story and Full expand it. Tap a name to see who is speaking.',action:'Explore this decision',target:'reading'},
 initiative:{title:'Send your first instruction',text:'Try a private audience with Hastings about his service. The next button prepares the form; you still choose whether to send it. Dispatch costs 1 court week and 1 household fund. A reply takes time and may be delayed or refused.',action:'Prepare an audience',target:'initiative'},
 travel:{title:'Let the messenger travel',text:'Your order is saved. Close royal business and decide ordinary cases to advance court time. Do not send duplicates while waiting. A ready reply will be marked on Royal Initiative; a refusal is recorded in correspondence.',action:'Check my dispatch',target:'business'},
 reply:{title:'Hear the answer',text:'A reply is waiting. In the audience, asking about witnesses costs a week and reveals evidence; reassurance or a threat changes the relationship. A witnessed settlement costs 2 funds and needs assent. You choose the response.',action:'Open the waiting reply',target:'reply'},
 effects:{title:'Follow the consequence',text:'What changed shows measured effects of your most recent royal business. The correspondence record preserves what was actually said. Use both: an order can matter later even if no relationship changed immediately.',action:'Read the court record',target:'ledger'},
 promise:{title:'A promise needs a second action',text:'Promising a hearing closes this audience. Arrange another audience with that person, then offer witnessed terms before the deadline shown in the ledger. Sending a message alone does not fulfil the promise. Assent is not guaranteed.',action:'Check the promise deadline',target:'ledger'},
 council:{title:'An appointment moves power',text:'Open the Council to see who holds each office. Appointing a replacement costs time and funds and can anger the displaced officer. Opening the screen changes nothing. A dismissal removes an office, not hereditary land.',action:'Inspect the Council',target:'council'},
 accounts:{title:'Repair royal credit',text:'Request an investigation with the London alderman and choose Audit and repayment terms. Examine the evidence, then offer a witnessed settlement. Accepted terms improve credit once per year. Ordinary receipts also help when London is secure and no campaign blocks recovery.',action:'Prepare an accounts inquiry',target:'accounts'},
 succession:{title:'Think beyond your lifetime',text:'The final assessment uses living royal children, guardianship, household power, unrest and credit. Follow succession cases and examine the Realm and Chronicle. A strong king can still leave a fragile succession.',action:'Inspect the kingdom',target:'realm'}
};
