/* A genuine third course, offered only after deliberation in the 1465–1483 sandbox.
 * Delaying is not free: an actor's grievance rises, the Crown loses initiative,
 * and the unresolved case is re-queued with a causal link and a later report.
 * This also works for research-grounded dossier hearings, without fabricating outcomes.
 */
const EDWARD_DELAY_TESTIMONY={
 estate:'Additional charters have been produced, and the neighbouring household has begun calling witnesses of its own.',
 patronage:'The disputed officer has already begun exercising authority, while the displaced servant gathers signatures.',
 marriage:'The families have exchanged further private promises. A rival household has learned of the match.',
 retinue:'The retainers have not dispersed while the king deliberates; neighbouring men are watching them.',
 rumour:'A second messenger has arrived. His account contradicts part of the first report.',
 petition:'Other petitioners have come forward, fearing the first household will monopolize access to the Crown.',
 treaty:'The envoy returns with revised assurances, but no proof that his master can fulfil them.',
 garrison:'The captain has moved men without waiting for the royal warrant.',
 claim:'The claimant has circulated the petition among other households while awaiting judgment.',
 credit:'The lenders have begun to calculate the cost of further delay to the Crown.',
 succession:'Two households now claim to be acting for the heir, though neither has been formally appointed.'
};
const _edwardBeforeDeliberation=sbBuildCard;
sbBuildCard=function(s,ev){
 if(ev.origin==='deferred')ev.year=s.sandbox.year;
 const card=_edwardBeforeDeliberation(s,ev);
 if(ev.origin==='deferred'){
  const newEvidence=EDWARD_DELAY_TESTIMONY[ev.template]||'The parties have gathered additional testimony, and the political balance has shifted during the delay.';
  card.context='THE HEARING RETURNS · '+newEvidence+' '+card.context;
  if(!card.caseInfo)card.tag='THE POSTPONED PETITION';
 }
 if(ev.delayDepth||ev.template==='rebellion'||s.sandbox.year>=1483)return card;
 card.wait={label:'Delay judgment · seek testimony',effects:function(w){
  const sb=w.sandbox;
  sb.royalAuthority=sbClamp(sb.royalAuthority-1,-8,8);
  sbAdjust(sb,ev.actor,{grievance:1});
  sb.history.push({serial:ev.serial,year:sb.year,actor:ev.actor,template:ev.caseId?'dossier:'+ev.caseId:ev.template,where:ev.where,origin:'royal-delay',side:'wait',arena:'deliberation',response:'Judgment deferred while witnesses are sought.',parent:ev.parent||null});
  sb.feedback.push({year:sb.year,source:ev.serial,actor:ev.actor,delta:1,followup:sb.events.length+1});
  const returnEvent={...ev,serial:++sb.serial,year:sb.year,origin:'deferred',sourceAction:'the king requested further testimony',parent:ev.serial,delayDepth:1};
  // A fresh independent household act fills an otherwise empty docket first.
  // The postponed case therefore returns after the world has had time to move.
  if(sb.events.length===0)sbActorStep(w);
  sbQueue(sb,returnEvent);
  scheduleReport(w,{id:'testimony-'+ev.serial,from:'The royal secretariat',text:'The Crown has deferred a ruling in '+ev.where+'. The parties have begun preparing additional claims; neither side has accepted the delay as neutral.',delay:1,certainty:'reported'});
  sb.yearTurn++;sb.reactiveCount++;
  if(sb.yearTurn>=sb.perYear)sbAdvanceYear(w);
  return {records:['Edward deferred judgment in '+ev.where+' and requested further testimony. The parties did not remain idle.'],facts:{last_deferred_event:ev.template}};
 }};
 return card;
};
