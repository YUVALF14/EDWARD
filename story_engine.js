/* EDWARD — INTERWOVEN CHRONICLES, an experimental rule-based narrative scheduler.
   The six arcs contain 36 distinct authored beats and conditional text variants.
   They compete for court time, cross-affect actors, and remember royal decisions.
   This is NOT an LLM or a documentary reconstruction of particular speeches.
*/
const SE_SUPPRESS_DOSSIERS=new Set(['queen','seal','caister','france','clarence','heirs']);
const _seNdCanStart=ndCanStart;
ndCanStart=function(s,key){return !SE_SUPPRESS_DOSSIERS.has(key)&&_seNdCanStart(s,key);};
function seInit(s){const sb=s.sandbox;if(sb.story){sb.story.crossovers||={};sb.story.crossJournal||=[];return sb.story;}
 // Migration from an older Living Chronicle save: do not replay 1465 events in 1478.
 const arcs={};for(const [id,def] of Object.entries(SE_STORIES)){
  const stage=sb.year>1465?Math.max(0,def.beats.findIndex(b=>b.year>=sb.year)):0;
  const migrated=sb.year>1465&&def.beats.every(b=>b.year<sb.year);
  arcs[id]={stage:migrated?def.beats.length:stage,dueYear:migrated?9999:Math.max(def.start,def.beats[stage].year),inFlight:false,lastChoice:null,lastYear:null,lastOutcome:null,heard:0};
 }
 sb.story={schema:1,arcs,crossovers:{},crossJournal:[],flags:{},journal:[],scheduledByYear:{},offscreen:[],causalLinks:[],property:{caister:{title:'disputed',possession:'paston',rents:'contested'},north:{title:'disputed',garrison:'local'}},storyChoices:0,deferrals:0};
 return sb.story;
}
function seVariant(s,id,beat,arc){const sb=s.sandbox,flags=seInit(s).flags;
 if(id==='neville'&&beat.id==='terms')return sb.actors.warwick.grievance>=4||flags.queenAccess==='direct'||flags.embassy==='private'?1:0;
 if(id==='neville'&&beat.id==='affinity')return sb.actors.warwick.grievance>=3?1:0;
 if(id==='diplomacy'&&beat.id==='embassy')return flags.foreignProcess==='private'||flags.tradeRoute==='burgundy'?1:0;
 if(id==='woodville'&&beat.id==='chamber')return flags.nevilleCommission==='refused'?1:0;
 if(id==='north'&&beat.id==='earldom')return flags.nevilleCommission==='refused'||sb.actors.percy.grievance>=3?1:0;
 if(id==='succession'&&beat.id==='charges')return flags.clarenceMarriage==='neville'||sb.actors.warwick.grievance>=4?1:0;
 if(id==='caister'&&beat.id==='gate')return flags.caisterPeace==='intervened'?0:1;
 if(id==='diplomacy'&&beat.id==='account')return flags.frenchSettlement==='payments'?0:1;
 return arc.lastChoice==='right'?1:0;
}
function seWhy(s,id,beat,arc){const st=seInit(s),sb=s.sandbox,parts=[];
 if(arc.lastOutcome)parts.push('Earlier royal order: '+arc.lastOutcome);
 const f=st.flags;
 if(id==='neville'&&f.queenAccess==='direct')parts.push('The queen’s kin have received direct royal patronage.');
 if(id==='neville'&&f.embassy==='private')parts.push('Warwick’s embassy was bypassed by confidential envoys.');
 if(id==='woodville'&&f.nevilleTerms==='ultimatum')parts.push('Warwick’s unresolved grievance makes the queen’s position more dangerous.');
 if(id==='north'&&f.nevilleTerms==='ultimatum')parts.push('The Neville settlement is politically unstable.');
 if(id==='caister'&&st.property.caister.possession==='norfolk')parts.push('A reported seizure has changed who physically holds the castle; the title remains contested.');
 if(id==='diplomacy'&&f.foreignProcess==='private')parts.push('Earlier royal instructions were sent without the Chancellor’s open endorsement.');
 if(id==='succession'&&f.queenWard==='united')parts.push('The queen’s household already holds concentrated guardianship in another dispute.');
 return parts.join(' ');
}
function seEffectiveBeat(s,id,beat){
 const sb=s.sandbox,f=seInit(s).flags;
 // Picquigny required an English expedition. Without military leverage,
 // 1475 brings a commercial question, not a free French royal pension.
 if(id==='diplomacy'&&beat.id==='picquigny'&&f.calaisPolicy!=='expedition'){
  return {...beat,who:'A Calais merchant envoy',role:'Channel customs and safe passage',where:'Calais',tag:'A TRUCE WITHOUT AN ARMY',alternative:'commercial',
   q:['No English army has crossed to France. The merchants nevertheless have two proposals: French safe-conduct for wool ships, or separate licences with Burgundy. Neither offers a royal pension. Which will you sign?',
      'The French offer lower tolls, not tribute. Burgundy asks that its old route remain protected. The Staple wants a written guarantee it can enforce.'],
   ctx:'In recorded history Picquigny followed Edward’s 1475 invasion. In this alternate reign no expedition was ordered, so the Crown may negotiate commerce, but cannot collect a campaign settlement it never won.',
   l:'Sign a witnessed commercial truce.',r:'Keep separate French and Burgundian licences.',
   le:{credit:1,authority:1,people:{burgundy:{grievance:1},london:{trust:1}},flags:{frenchSettlement:'trade-truce'},report:'Calais merchants receive written safe-conduct terms; no French pension is promised.'},
   re:{credit:0,authority:-1,people:{burgundy:{trust:1},london:{grievance:1}},flags:{frenchSettlement:'divided-trade'},report:'Separate licences continue. Merchants price in the uncertainty of two customs regimes.'}};
 }
 // Clarence was executed in 1478 in recorded history; a loyal brother
 // in an alternate reign must not be accused of treason on a fixed date.
 if(id==='succession'&&beat.id==='charges'&&f.clarenceMarriage!=='neville'&&sb.actors.warwick.grievance<3&&f.clarencePlace==='recorded'){
  return {...beat,who:'William Hastings',role:'A household account concerning Clarence',tag:'A BROTHER’S ACCOUNTS',alternative:'loyal-clarence',
   q:['The Duke of Clarence has kept the terms of his recorded allowance. His officers now ask whether the Crown will honour an older promise of rents. I have the accounts, not an accusation. Shall the Exchequer hear them?',
      'Your brother’s servants bring receipts for service. There is no sworn charge against him, but his household wants written security for next year. How much independence will you allow?'],
   ctx:'Clarence’s execution in 1478 was not inevitable. This alternative dispute concerns recorded royal obligations because the earlier marriage and patronage choices did not create a treason crisis.',
   l:'Audit the allowance and publish the finding.',r:'Renew his allowance with strict conditions.',
   le:{authority:1,credit:-1,people:{warwick:{trust:1}},flags:{clarenceCharge:'audit'},report:'The Exchequer enters Clarence’s claims and orders the receipts compared.'},
   re:{authority:1,people:{warwick:{grievance:1}},flags:{clarenceCharge:'conditional'},report:'Clarence accepts a limited renewal but his household asks for longer security.'}};
 }
 return beat;
}
function seSkipQuietBeats(s){const sb=s.sandbox,st=seInit(s),f=st.flags;
 st.quietClosures||=[];
 for(const [id,arc] of Object.entries(st.arcs)){
  if(arc.inFlight)continue;
  const def=SE_STORIES[id];let skipped=0;
  while(skipped<3){const beat=def.beats[arc.stage];if(!beat||sb.year<beat.year||sb.year<arc.dueYear)break;
   let reason='';
   if(id==='neville'&&beat.id==='affinity'&&f.clientSettlement==='published'&&f.foreignProcess==='council'&&sb.actors.warwick.grievance<2&&sb.unrest.Midlands<2)reason='No extraordinary muster followed the published fee roll and open diplomatic instruction.';
   if(id==='neville'&&['terms','reckoning'].includes(beat.id)&&sb.actors.warwick.grievance<=1&&sb.actors.warwick.trust>=2&&sb.unrest.Midlands<2)reason='The Earl remains in ordinary service; no extraordinary pardon or submission hearing is warranted.';
   if(id==='caister'&&beat.id==='muster'&&f.caisterTitle==='commission'&&f.caisterRents==='protected'&&sb.royalAuthority>=3){reason='A royal inquiry and protected rents removed the immediate grounds for an armed siege.';f.caisterPeace='prevented';}
   if(id==='caister'&&beat.id==='gate'&&f.caisterPeace==='prevented'){reason='No siege took place in this reign; the disputed gate did not require an emergency garrison.';f.caisterGate='peaceful';}
   if(id==='caister'&&beat.id==='widow'&&f.caisterPeace==='prevented'&&f.caisterRents==='protected'){reason='The family kept possession and rents while the title inquiry continued; no prolonged siege claim returned.';}
   if(id==='diplomacy'&&beat.id==='letters'&&f.foreignProcess==='council'&&f.embassy==='public'){reason='The public embassy and Chancellor’s instructions agreed; no duplicate secret assurances reached the merchants.';f.foreignLetters='single';}
   if(id==='north'&&beat.id==='castle'&&sb.unrest.North<=1&&sb.actors.percy.grievance<=1&&sb.actors.montagu.grievance<=1){reason='The northern settlement held without a disputed garrison transfer.';f.northGarrison='settled';}
   if(!reason)break;
   st.quietClosures.push({year:sb.year,arc:id,beat:beat.id,reason,previous:arc.lastOutcome||null});
   st.offscreen.push({year:sb.year,actor:def.lead,kind:'conditional non-event',description:reason});
   arc.stage++;arc.dueYear=def.beats[arc.stage]?Math.max(def.beats[arc.stage].year,sb.year+1):9999;
   skipped++;
  }
 }
}
function seScene(s,ev){const id=ev.story.arc,def=SE_STORIES[id],arc=seInit(s).arcs[id],beat=seEffectiveBeat(s,id,def.beats[ev.story.step]);let variant=seVariant(s,id,beat,arc);
 let quote=beat.q[variant];
 if(id==='succession'&&['heir','guardians'].includes(beat.id)&&s.sandbox.heir==='undecided'){
  quote=beat.id==='heir'?'There is no undisputed royal heir in the records before me. Each great household now asks whose claim will be heard first if Your Grace dies. Shall we name the procedure before the claimant?':'The succession remains unsettled. Several households have their own candidates and their own captains. Who may hold the treasury and summon the Council if the Crown falls vacant?';
 }
 if(id==='neville'&&beat.id==='reckoning'&&s.sandbox.actors.warwick.grievance>=6)quote='The Earl will not attend this Council. His captains send petitions for pardon but refuse to name what they have done. Some may be bargaining; others may be preparing to resist. Shall each answer separately?';
 if(id==='caister'&&beat.id==='patent'&&seInit(s).property.caister.possession==='paston')quote='We have held the gate through years of letters and lawsuits. The Norfolk claim has outlived its strongest patron. A royal patent now could end the quarrel, but only if the tenants believe it will be enforced.';
 const delay=ev.origin==='deferred'?' After the king postponed the hearing, rival parties prepared further testimony; the claims remain unverified.':'';
 return {def,beat,quote,context:beat.ctx+' '+seWhy(s,id,beat,arc)+delay};
}
function seMakeEvent(s,id){const sb=s.sandbox,st=seInit(s),arc=st.arcs[id],beat=SE_STORIES[id].beats[arc.stage];
 const ev={serial:++sb.serial,actor:SE_STORIES[id].lead,template:'petition',where:beat.where,year:sb.year,origin:'interwoven-story',sourceAction:'consequence of prior political choices',parent:arc.lastSerial||null,story:{arc:id,step:arc.stage}};
 arc.inFlight=true;return ev;
}
function seSchedule(s){const sb=s.sandbox,st=seInit(s),year=sb.year;
 if(sb.ended||year>1483)return;
 // Save/load and queue overflow recovery: no story may be permanently stuck inFlight.
 for(const [id,a] of Object.entries(st.arcs))if(a.inFlight){const exists=sb.events.some(ev=>ev.story?.arc===id&&ev.story.step===a.stage)||(sb.current?.story?.arc===id&&sb.current.story.step===a.stage);if(!exists)a.inFlight=false;}
 // Conditional collisions are not scheduled as fixed yearly events.
 for(const [id,x] of Object.entries(st.crossovers))if(x.inFlight){const exists=sb.events.some(ev=>ev.story?.crossover===id)||(sb.current?.story?.crossover===id);if(!exists)x.inFlight=false;}
 seSkipQuietBeats(s);
 const cap=2,already=st.scheduledByYear[year]||0;if(already>=cap)return;
 const crossing=Object.entries(SE_CROSSOVERS).filter(([id,x])=>year>=x.year&&year<=x.until&&!st.crossovers[id]?.heard&&!st.crossovers[id]?.inFlight&&x.requires(s,st.flags)).sort((a,b)=>a[1].year-b[1].year);
 let reserved=0;
 if(crossing.length){const id=crossing[0][0],cross=SE_CROSSOVERS[id];st.crossovers[id]={inFlight:true,heard:false};
  sb.events.unshift({serial:++sb.serial,actor:cross.actor,template:'petition',where:cross.where,year,origin:'story-crossover',sourceAction:'two prior political histories intersected',parent:null,story:{crossover:id}});reserved=1;
 }

 const eligible=Object.entries(SE_STORIES).filter(([id,def])=>{
  const a=st.arcs[id],beat=def.beats[a.stage];return !!beat&&!a.inFlight&&year>=Math.max(a.dueYear,beat.year)&&(!def.requires||def.requires(s));
 }).map(([id,def])=>{const a=st.arcs[id],beat=def.beats[a.stage],lateness=year-Math.max(a.dueYear,beat.year);
  const pressure=sb.actors[def.lead]?.grievance||0;
  return {id,score:lateness*6+Math.min(a.stage,4)*2+pressure+hashScore(s.seed,'story:'+id+':'+year,a.stage)%5};
 }).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 const take=eligible.slice(0,cap-already-reserved);
 // Place the first selected story first; the remaining world queue continues afterwards.
 for(let i=take.length-1;i>=0;i--)sb.events.unshift(seMakeEvent(s,take[i].id));
 st.scheduledByYear[year]=already+take.length+reserved;
}
const _seOldNdSchedule=ndSchedule;
ndSchedule=function(s){_seOldNdSchedule(s);seSchedule(s);};
const _seOldBuildCard=sbBuildCard;
sbBuildCard=function(s,ev){if(ev.story?.crossover)return seCrossCard(s,ev);if(!ev.story)return _seOldBuildCard(s,ev);
 const {def,beat,quote,context}=seScene(s,ev),id=ev.story.arc,stage=ev.story.step;
 function mk(side,arena){const isLeft=side==='left',effect=isLeft?beat.le:beat.re,label=isLeft?beat.l:beat.r;
  return {label,effects:function(w){seResolve(w,ev,side,arena);return {records:[`${def.title} · ${beat.tag}: ${label}`],facts:{last_interwoven_chronicle:id},obligations:(arena==='down'?[['edward',def.lead,`Private undertaking concerning ${def.title}`,'private']]:[])};}};
 }
 const card={id:'sb-'+ev.serial,where:beat.where,when:String(s.sandbox.year),who:beat.who,role:beat.role,tag:beat.tag,record:'politics',quote,context,left:mk('left','direct'),right:mk('right','direct'),dynamic:true,storyInfo:{id,title:def.title,step:stage+1,total:def.beats.length,trigger:seWhy(s,id,beat,seInit(s).arcs[id])},caseInfo:{title:def.title,anchor:def.anchor,source:def.source,stage:beat.id}};
 if(beat.alternative)card.insight={line:quote,stake:context};
 if(stage===1||stage===3)card.up={title:'Take formal counsel',who:'The King’s Council',role:'An open hearing with witnesses',quote:'The Chancellor will enter the testimony and your judgment into the rolls. The witnesses disagree about their interests; their oaths are not proof of everything they say.',left:mk('left','up'),right:mk('right','up')};
 if(stage===2||stage===4)card.down={title:'Hear a private witness',who:beat.who,role:'An audience without public witnesses',quote:'I will tell you what my household believes, Your Grace, but if you repeat my words before the Council I cannot promise that anyone will confirm them.',left:mk('left','down'),right:mk('right','down')};
 return card;
};
function seCrossCard(s,ev){const cross=SE_CROSSOVERS[ev.story.crossover];
 const mk=side=>({label:side==='left'?cross.l:cross.r,effects:w=>{
  seResolveCross(w,ev,side);return {records:[`${cross.title}: ${side==='left'?cross.l:cross.r}`],facts:{last_story_crossover:ev.story.crossover}};
 }});
 return {id:'sb-'+ev.serial,where:cross.where,when:String(s.sandbox.year),who:cross.who,role:cross.role,tag:cross.tag,record:'politics',quote:cross.q,context:cross.ctx,dynamic:true,left:mk('left'),right:mk('right'),storyInfo:{id:'cross:'+ev.story.crossover,title:cross.title,step:1,total:1},caseInfo:{title:cross.title,anchor:cross.anchor,source:cross.source,stage:'collision'}};
}
function seResolveCross(s,ev,side){const sb=s.sandbox,st=seInit(s),id=ev.story.crossover,cross=SE_CROSSOVERS[id],eff=side==='left'?cross.le:cross.re;
 if(st.crossovers[id]?.heard)throw Error('Crossover already resolved '+id);
 if(eff.authority)sb.royalAuthority=sbClamp(sb.royalAuthority+eff.authority,-8,8);
 if(eff.credit)sb.credit=sbClamp(sb.credit+eff.credit,-8,8);
 for(const [place,delta] of Object.entries(eff.unrest||{}))sb.unrest[place]=sbClamp((sb.unrest[place]||0)+delta,0,9);
 for(const [actor,change] of Object.entries(eff.people||{}))sbAdjust(sb,actor,change);
 Object.assign(st.flags,eff.flags||{});
 if(eff.report)scheduleReport(s,{id:'cross-'+ev.serial,from:cross.who,text:eff.report,delay:1,certainty:'reported'});
 dwFact(dwInit(s),'cross-order:'+ev.serial,`A royal order was made in ${cross.title}.`,cross.actor,true);
 const parents=id==='two_doors'?['woodville','diplomacy']:id==='northern_writ'?['north','neville']:id==='empty_chest'?['diplomacy','caister']:['woodville','succession'];
 for(const arc of parents){const serial=st.arcs[arc]?.lastSerial;if(serial)st.causalLinks.push({from:serial,to:ev.serial,kind:'cross-arc collision',arc});}
 const summary=side==='left'?cross.l:cross.r;
 st.crossovers[id]={inFlight:false,heard:true,year:sb.year,choice:side,summary};st.crossJournal.push({id,year:sb.year,summary,choice:side,reason:cross.ctx,report:eff.report,serial:ev.serial});
 sb.history.push({serial:ev.serial,year:sb.year,actor:cross.actor,template:'crossover:'+id,where:cross.where,origin:ev.origin==='deferred'?'deferred-crossover':'story-crossover',side,response:summary,storyCrossover:id});
 sb.yearTurn++;sb.reactiveCount++;if(sb.yearTurn>=sb.perYear)sbAdvanceYear(s);
}
function seApply(s,ev,side,arena){const sb=s.sandbox,st=seInit(s),arc=st.arcs[ev.story.arc],beat=seEffectiveBeat(s,ev.story.arc,SE_STORIES[ev.story.arc].beats[ev.story.step]),effect=side==='left'?beat.le:beat.re;
 if(effect.authority)sb.royalAuthority=sbClamp(sb.royalAuthority+effect.authority,-8,8);
 if(effect.credit)sb.credit=sbClamp(sb.credit+effect.credit,-8,8);
 if(effect.legitimacy)sb.legitimacy=sbClamp(sb.legitimacy+effect.legitimacy,-8,8);
 for(const [place,delta] of Object.entries(effect.unrest||{}))sb.unrest[place]=sbClamp((sb.unrest[place]||0)+delta,0,9);
 for(const [actor,change] of Object.entries(effect.people||{}))sbAdjust(sb,actor,change);
 for(const [key,value] of Object.entries(effect.flags||{}))st.flags[key]=value;
 if(arena==='up')sb.royalAuthority=sbClamp(sb.royalAuthority+1,-8,8);
 if(arena==='down')sbAdjust(sb,SE_STORIES[ev.story.arc].lead,{trust:1});
 // Cross-arc consequences: an award in one dispute becomes a grievance in another.
 if(ev.story.arc==='north'&&beat.id==='earldom'){
  if(side==='left'){sbAdjust(sb,'warwick',{grievance:1});const land=dwLand(dwInit(s),'fenwick');if(land&&land.holder!=='percy'){const d=dwInit(s),previous=land.holder;land.holder='percy';land.transfers.push({year:sb.year,from:previous,to:'percy',authority:'fictional illustration of northern title settlement',cause:ev.serial});d.landTransfers++;if(d.personal[previous])d.personal[previous].assets=d.personal[previous].assets.filter(x=>x!==land.id);if(d.personal.percy&&!d.personal.percy.assets.includes(land.id))d.personal.percy.assets.push(land.id);}}
  else sbAdjust(sb,'percy',{grievance:1});
 }
 if(ev.story.arc==='woodville'&&beat.id==='charter'&&side==='right'){
  const d=dwInit(s),land=dwLand(d,'ashcombe');if(land&&land.holder!=='woodville'){const previous=land.holder;land.holder='woodville';land.transfers.push({year:sb.year,from:previous,to:'woodville',authority:'royal favour in the fictional estate model',cause:ev.serial});d.landTransfers++;if(d.personal[previous])d.personal[previous].assets=d.personal[previous].assets.filter(x=>x!==land.id);if(d.personal.woodville&&!d.personal.woodville.assets.includes(land.id))d.personal.woodville.assets.push(land.id);}
 }
 if(ev.story.arc==='caister'){
  const prop=st.property.caister;
  if(beat.id==='rents')prop.rents=side==='left'?'protected':'seized';
  if(beat.id==='muster'&&side==='left')prop.possession='contested under royal protection';
  if(beat.id==='gate')prop.possession=side==='left'?'royal custody':'disputed possession';
  if(beat.id==='patent'){prop.title=side==='left'?'royal patent after inquest':'unresolved compromise';prop.possession=side==='left'?'paston':'shared';}
 }
 // A political relationship has memory outside the authored story. These
 // relations also affect the autonomous household dispute engine.
 const d=dwInit(s);
 function changeRelation(a,b,feud=0,regard=0){const rel=dwRel(d,a,b),rev=dwRel(d,b,a);for(const row of [rel,rev])if(row){row.feud=sbClamp(row.feud+feud,0,8);row.regard=sbClamp(row.regard+regard,-4,8);}}
 if(ev.story.arc==='woodville'&&beat.id==='petition')changeRelation('woodville','warwick',side==='left'?1:0,side==='right'?1:0);
 if(ev.story.arc==='neville'&&beat.id==='terms')changeRelation('warwick','hastings',side==='right'?2:-1,side==='left'?1:0);
 if(ev.story.arc==='north'&&beat.id==='earldom')changeRelation('montagu','percy',side==='left'?2:1,0);
 if(ev.story.arc==='diplomacy'&&beat.id==='embassy')changeRelation('warwick','burgundy',side==='right'?1:0,side==='left'?1:0);
 if(ev.story.arc==='succession'&&beat.id==='marriage'&&side==='left')d.bonds.push({kind:'Clarence–Isabel Neville marriage alliance (alternate chronology)',a:'warwick',b:'clarence',year:sb.year,public:true});
 if(ev.story.arc==='succession'&&beat.id==='guardians')sb.regency=side==='left'?'council':'household';
 if(effect.reaction){const {actor,rival,kind}=effect.reaction;if(sb.actors[actor]?.alive&&sb.actors[rival]?.alive){const reaction=dwEvent(s,actor,kind,rival,'retaliation',ev.serial);st.causalLinks.push({from:ev.serial,to:reaction.serial,kind:'household reaction',actor,rival});}}
 if(effect.report)scheduleReport(s,{id:'story-'+ev.serial,from:beat.who,text:effect.report,delay:1,certainty:'reported'});
 // The truth ledger is deliberately separate from what Edward has heard.
 dwFact(d,'story-order:'+ev.serial,`A royal order concerned ${SE_STORIES[ev.story.arc].title}: ${side==='left'?beat.l:beat.r}`,SE_STORIES[ev.story.arc].lead,arena!=='down');
 const summary=(side==='left'?beat.l:beat.r);return {summary,effect};
}
function seResolve(s,ev,side,arena){const sb=s.sandbox,st=seInit(s),id=ev.story.arc,arc=st.arcs[id],beat=seEffectiveBeat(s,id,SE_STORIES[id].beats[ev.story.step]);
 if(!beat||arc.stage!==ev.story.step)throw new Error('Story continuity mismatch '+id+': '+ev.story.step+'/'+arc.stage);
 const {summary}=seApply(s,ev,side,arena);
 st.journal.push({year:sb.year,arc:id,beat:beat.id,part:arc.stage+1,choice:side,arena,summary,serial:ev.serial,parent:arc.lastSerial||null,reason:arc.lastOutcome||'New political pressure',report:side==='left'?beat.le.report:beat.re.report});
 if(arc.lastSerial)st.causalLinks.push({from:arc.lastSerial,to:ev.serial,kind:'returning political case',arc:id});
 arc.lastSerial=ev.serial;arc.lastChoice=side;arc.lastYear=sb.year;arc.lastOutcome=summary;arc.stage++;arc.heard++;arc.inFlight=false;
 const next=SE_STORIES[id].beats[arc.stage];arc.dueYear=next?Math.max(next.year,sb.year+1):9999;
 st.storyChoices++;
 sb.history.push({serial:ev.serial,year:sb.year,actor:SE_STORIES[id].lead,template:'story:'+id+':'+beat.id,where:beat.where,origin:ev.origin==='deferred'?'deferred-story':'interwoven-story',side,arena,response:summary,parent:ev.parent||null,storyArc:id,storyBeat:beat.id});
 sb.feedback.push({year:sb.year,source:ev.serial,actor:SE_STORIES[id].lead,followup:sb.events.length,story:id});
 sb.reactiveCount++;sb.yearTurn++;
 if(sb.yearTurn>=sb.perYear)sbAdvanceYear(s);
}
function seAnnual(s){const sb=s.sandbox,st=seInit(s),f=st.flags,year=sb.year;
 // A private political move is not automatically presented as royal knowledge.
 if(year>=1469&&year<=1472&&sb.actors.warwick.grievance>=5&&f.nevilleTerms!=='negotiated'&&!f.nevilleContacts){
  f.nevilleContacts='suspected';st.offscreen.push({year,actor:'warwick',kind:'unverified approaches to rival households'});
  dwFact(dwInit(s),'secret-neville-'+year,'Neville servants approached rival households without a royal warrant.','warwick',false);
  scheduleReport(s,{id:'secret-neville-'+year,from:'A correspondent at Calais',text:'There are rumours of private Neville approaches to households beyond the Earl’s ordinary service. The names are not verified.',delay:3,certainty:'rumour'});
 }
 if(year>=1470&&f.caisterPeace==='abandoned'&&!f.caisterUnprotected){
  f.caisterUnprotected=true;st.property.caister.possession='norfolk';st.offscreen.push({year,actor:'norfolk',kind:'reported armed possession of Caister'});
  scheduleReport(s,{id:'caister-seizure-'+year,from:'A Norfolk messenger',text:'A messenger reports that the duke’s men now control Caister’s approaches. His figures are disputed.',delay:2,certainty:'reported'});
 }
 if(year>=1476&&f.frenchSettlement==='campaign'&&sb.credit<=-2&&!f.merchantPressure){
  f.merchantPressure=true;sbAdjust(sb,'london',{grievance:1});st.offscreen.push({year,actor:'london',kind:'merchants tighten credit'});
  scheduleReport(s,{id:'merchant-credit-'+year,from:'A London alderman',text:'Several merchants will renew the Crown’s credit only against named customs revenues.',delay:2,certainty:'reported'});
 }
}
const _seOldAdvanceYear=sbAdvanceYear;
sbAdvanceYear=function(s){const previous=s.sandbox.year;_seOldAdvanceYear(s);if(s.sandbox.year!==previous&&!s.sandbox.ended)seAnnual(s);};
const _seOldEnding=sbEnding;
sbEnding=function(sb,s){const result=_seOldEnding(sb,s),st=seInit(s),f=st.flags;
 const lines=[];
 if(f.nevilleSettlement==='pardon')lines.push('The Neville captains hold conditional pardons; reconciliation rests upon royal enforcement.');
 else if(f.nevilleTerms==='ultimatum'||f.nevilleContacts)lines.push('The Neville affinity has not accepted an enduring settlement, and the king’s old comrades remain a source of uncertainty.');
 else if(st.arcs.neville.heard)lines.push('The relationship with Warwick remains defined by bargaining over service, access and royal commissions.');
 if(f.northEarldom==='percy')lines.push('The Percy restoration has altered northern titles, while the Nevilles remember the compensation promised to them.');
 else if(f.northEarldom==='neville')lines.push('The Neville title remains in place, and Percy claims persist beneath the recorded settlement.');
 if(f.caisterOutcome==='patent')lines.push('At Caister a royal patent has settled recorded title, though possession must still be respected locally.');
 else if(f.caisterOutcome==='shared')lines.push('At Caister the claimants share rents under a fragile compromise rather than an uncontested title.');
 if(f.frenchSettlement==='payments')lines.push('A French settlement offers financial breathing room, with future instalments still dependent on diplomacy.');
 else if(f.frenchSettlement==='campaign')lines.push('The continental commitment has tested royal credit and the patience of English merchants.');
 if(f.successionInstrument==='council')lines.push('A witnessed Council settlement divides the guardianship and treasury, but its success depends on obedience after Edward.');
 else if(f.successionInstrument==='household')lines.push('A single household has been entrusted with broad succession powers; its rivals retain reasons to challenge it.');
 result.narrative+=' The unfinished chronicles of this reign: '+lines.join(' ');if(st.crossJournal.length)result.narrative+=' The reign also faced '+st.crossJournal.length+' crises where earlier political settlements collided.';
 if(st.quietClosures?.length)result.narrative+=' '+st.quietClosures.length+' potential crises did not occur because earlier settlements or orders removed their causes.';
 result.story={crossovers:st.crossJournal.map(x=>({id:x.id,year:x.year,choice:x.choice,summary:x.summary})),arcs:Object.fromEntries(Object.entries(st.arcs).map(([id,a])=>[id,{heard:a.heard,completed:a.stage>=SE_STORIES[id].beats.length,lastOutcome:a.lastOutcome}])),flags:{...f},authoredScenes:st.storyChoices,causalLinks:st.causalLinks.length,offscreenActions:st.offscreen.length,notes:lines};
 return result;
};
