/* EDWARD — DEEP WORLD LAB. All local incidents, letters, and speech are simulated fiction.
   Research scaffold: local jurisdiction, title, service, marriage, inheritance and patronage.
   World truth / private actor knowledge / reports to Edward are kept distinct. */
const DW_HOUSES={warwick:'Neville',montagu:'Neville',hastings:'Household',woodville:'Woodville',percy:'Percy',lancaster:'Lancaster',burgundy:'Burgundy',london:'City'};
const DW_LANDS=[
 {id:'moorfield',name:'Moorfield Manor',region:'North',holder:'percy',claimant:'montagu',revenue:2,source:'fictional estate used for simulation'},
 {id:'ashcombe',name:'Ashcombe Manor',region:'Midlands',holder:'hastings',claimant:'woodville',revenue:2,source:'fictional estate used for simulation'},
 {id:'fenwick',name:'Fenwick Tenement',region:'North',holder:'montagu',claimant:'percy',revenue:1,source:'fictional estate used for simulation'},
 {id:'bracken',name:'Bracken Hall',region:'Wales',holder:'lancaster',claimant:'hastings',revenue:2,source:'fictional estate used for simulation'},
 {id:'eastmere',name:'Eastmere Lands',region:'Midlands',holder:'hastings',claimant:'warwick',revenue:3,source:'fictional estate used for simulation'},
 {id:'dockward',name:'Dockward Rents',region:'London',holder:'london',claimant:'woodville',revenue:2,source:'fictional estate used for simulation'}
];
const DW_GOALS={
 warwick:{rank:4,household:4,independence:5,security:3},
 montagu:{rank:3,household:4,independence:2,security:5},
 hastings:{rank:3,household:4,independence:2,security:4},
 woodville:{rank:4,household:5,independence:3,security:3},
 percy:{rank:3,household:5,independence:4,security:3},
 lancaster:{rank:5,household:3,independence:4,security:2},
 burgundy:{rank:2,household:2,independence:3,security:4},
 london:{rank:2,household:3,independence:4,security:4}
};
const DW_TONE={
 estate:{petition:'A competing household produces a different title to the same land.',law:'The chancery clerk says both charters have witnesses, but neither settles possession.',private:'The claimant asks for an undertaking without making the dispute public.'},
 office:{petition:'An office has been promised twice, and both claimants now have followers waiting.',law:'A commission can inquire who was empowered to make the appointment.',private:'One household offers to withdraw quietly if another office can be found.'},
 marriage:{petition:'A proposed marriage would link households whose interests have not previously aligned.',law:'The council asks whether the arrangement affects a wardship or inheritance.',private:'A relative admits the match is intended to secure a contested estate.'},
 succession:{petition:'The future of a minor heir has become a present question of custody and access.',law:'The council distinguishes guardianship of the person from custody of the inheritance.',private:'A household offers personal protection in return for a place near the heir.'},
 intelligence:{petition:'Two correspondents give different accounts of the same gathering.',law:'An examination may establish who sent the letters, but not what they truly intended.',private:'A messenger admits he omitted a name because he feared his patron.'},
 retinue:{petition:'Armed retainers have appeared near a disputed manor. Each side says the other moved first.',law:'A commission can require sureties for the peace from both households.',private:'A household offers to dismiss its men if the rival does so first.'},
 wardship:{law:'The court can separate custody of the child from custody of the lands.',private:'A household offers a personal guarantee for the young heir.'},
 debt:{law:'An audit can identify the warrants but will delay repayment.',private:'The lender offers to extend credit in exchange for future customs revenue.'}
};
function dwHash(s,word,mod){return hashScore(s.seed,'deep:'+word,s.sandbox?.serial||0)%mod;}
function dwInit(s){const sb=s.sandbox;if(sb.deep)return sb.deep;
 const lands=DW_LANDS.map(x=>({...x,disputed:false,transfers:[],lastPetition:0}));
 const knowledge={};const personal={};const relationships={};
 for(const id of Object.keys(sb.actors)){
  knowledge[id]=[];personal[id]={security:3,standing:3,access:2,assets:lands.filter(x=>x.holder===id).map(x=>x.id),grievances:[],promises:[],contacts:[]};
 }
 for(const id of Object.keys(sb.actors))for(const other of Object.keys(sb.actors))if(id!==other){relationships[id+'>'+other]={regard:DW_HOUSES[id]===DW_HOUSES[other]?3:0,debt:0,feud:0};}
 const heirs={};
 sb.deep={lands,knowledge,personal,relationships,heirs,minority:'unsettled',truth:[],knownToEdward:[],privateActions:[],rumours:[],disputes:[],chains:[],actedPairs:{},cycle:0,officeClaims:{},bonds:[],actionKinds:{},narrativeKeys:[],causalLinks:0,landTransfers:0,privateRevelations:0};
 return sb.deep;
}
function dwRel(d,a,b){return d.relationships[a+'>'+b];}
function dwLearn(d,person,id,claim,certainty='witnessed',source='direct'){
 if(!d.knowledge[person])d.knowledge[person]=[];
 if(!d.knowledge[person].some(x=>x.id===id))d.knowledge[person].push({id,claim,certainty,source});
}
function dwFact(d,id,text,who,publicly=false){d.truth.push({id,text,who,publicly});dwLearn(d,who,id,text,'witnessed');if(publicly)for(const p of Object.keys(d.knowledge))dwLearn(d,p,id,text,'reported','public');}
function dwLand(d,id){return d.lands.find(x=>x.id===id);}
function dwPickLand(s,actor){const d=s.sandbox.deep;const pool=d.lands.filter(x=>x.holder===actor||x.claimant===actor);return pool[dwHash(s,'land:'+actor+':'+s.sandbox.year,pool.length||1)]||d.lands[0];}
function dwPairScore(d,actor,rival){const r=dwRel(d,actor,rival),a=d.personal[actor];return (r?.feud||0)*3-(r?.regard||0)+(a?.grievances.length||0);}
function dwPickRival(s,actor){const sb=s.sandbox,d=sb.deep,ids=Object.keys(sb.actors).filter(x=>x!==actor&&sb.actors[x].alive&&x!=='burgundy');
 ids.sort((a,b)=>dwPairScore(d,actor,b)-dwPairScore(d,actor,a)||a.localeCompare(b));
 const n=Math.min(3,ids.length);return ids[dwHash(s,'rival:'+actor+':'+sb.year,n)];
}
function dwTypeFor(s,actor,rival){const sb=s.sandbox,d=sb.deep,p=d.personal[actor],goals=DW_GOALS[actor];
 const land=d.lands.find(x=>x.holder===rival&&x.claimant===actor);
 if(land)return 'estate';
 if(actor==='london'&&sb.credit<2)return 'debt';
 if(sb.year>=1472&&Object.values(d.heirs).some(x=>x.status==='living')&&['woodville','hastings','warwick'].includes(actor)&&dwHash(s,'ward:'+actor+sb.year,3)===0)return 'wardship';
 if(sb.year>=1473&&['woodville','hastings','warwick'].includes(actor)&&sb.heir!=='undecided'&&dwHash(s,'heirscene:'+actor+sb.year,3)===0)return 'succession';
 if(dwRel(d,actor,rival).feud>=2&&p.security<=4)return 'retinue';
 if(goals.household>=4&&p.standing<6)return dwHash(s,'family:'+actor+sb.year,3)===0?'marriage':'office';
 return ['intelligence','office','marriage'][dwHash(s,'other:'+actor+sb.year,3)];
}
function dwEvent(s,actor,kind,rival,origin='independent',parent=null){const sb=s.sandbox,d=sb.deep,land=(kind==='estate'?d.lands.find(x=>x.holder===rival&&x.claimant===actor):null)||dwPickLand(s,actor);const ev={serial:++sb.serial,actor,template:kind==='office'?'patronage':kind==='intelligence'?'rumour':kind,where:land?.region||SANDBOX_ACTORS[actor].place,year:sb.year,origin,sourceAction:'inter-household initiative',parent,deep:{kind,rival,landId:land.id,phase:origin==='retaliation'?'retaliation':'first',cause:parent,createdBy:actor}};
 d.privateActions.push({year:sb.year,actor,rival,kind,serial:ev.serial,landId:land.id});d.actionKinds[kind]=(d.actionKinds[kind]||0)+1;
 dwFact(d,'initiative:'+ev.serial,`${SANDBOX_ACTORS[actor].name} approached ${SANDBOX_ACTORS[rival].name} concerning ${kind}.`,actor,false);
 dwLearn(d,rival,'initiative:'+ev.serial,'A rival household has begun a political initiative.','witnessed',actor);
 sb.actions.push({year:sb.year,actor,template:ev.template,rival,reason:'own interests',serial:ev.serial});sb.autonomousCount++;
 // Do not send an omniscient report. Only the petition is presented to Edward.
 sbQueue(sb,ev);return ev;
}
const _dwOldInit=sbInit;
sbInit=function(s){const sb=_dwOldInit(s);dwInit(s);return sb;};
const _dwOldActorStep=sbActorStep;
sbActorStep=function(s){const sb=s.sandbox,d=dwInit(s);d.cycle++;
 // Actors move against other actors. Each initiative changes the world before Edward learns of it.
 const ids=Object.keys(sb.actors).filter(id=>sb.actors[id].alive&&id!=='burgundy');
 const ranked=ids.map(id=>({id,score:sb.actors[id].grievance*2+sb.actors[id].influence+DW_GOALS[id].household+dwHash(s,'initiative:'+id+':'+sb.year,7)})).sort((a,b)=>b.score-a.score);
 const count=2+(dwHash(s,'extra:'+sb.year,3)===0?1:0);
 for(const {id} of ranked.slice(0,count)){
  const rival=dwPickRival(s,id),kind=dwTypeFor(s,id,rival),ev=dwEvent(s,id,kind,rival);
  if(kind==='estate'){const l=dwLand(d,ev.deep.landId);l.disputed=true;d.disputes.push({land:l.id,claimant:id,holder:l.holder,year:sb.year,serial:ev.serial});}
  if(kind==='retinue'){sb.unrest[ev.where]=sbClamp((sb.unrest[ev.where]||0)+1,0,9);d.personal[id].security=Math.min(8,d.personal[id].security+1);}
  if(kind==='office'){d.personal[id].standing=Math.min(8,d.personal[id].standing+1);}
  dwRel(d,id,rival).feud=Math.min(8,dwRel(d,id,rival).feud+1);
  if(sb.actors[rival])sb.actors[rival].grievance=Math.min(8,sb.actors[rival].grievance+1);
 }
 // Succession is contingent on the royal marriage, not a universal 1470 trigger.
 if(sb.marriage==='elizabeth'){
  if(sb.year>=1466&&!d.heirs.elizabeth)d.heirs.elizabeth={born:1466,house:'York',mother:'woodville',sex:'female',status:'living',historical:true};
  if(sb.year>=1466&&d.heirs.elizabeth?.status==='expected')d.heirs.elizabeth.status='living';
  if(sb.year>=1470&&!d.heirs.edward&&dwHash(s,'birth:edward:'+sb.year,4)!==0){d.heirs.edward={born:sb.year,house:'York',mother:'woodville',sex:'male',status:'living',historical:sb.year===1470};sb.heir='woodville';}
 } else if(sb.marriage==='foreign'&&sb.year>=1470&&!Object.keys(d.heirs).length&&dwHash(s,'foreignheir:'+sb.year,4)===0){d.heirs.alternative={born:sb.year,house:'York',mother:'foreign',sex:dwHash(s,'sex:'+sb.year,2)?'male':'female',status:'living',historical:false};sb.heir='other';}
};
const _dwOldBuildCard=sbBuildCard;
sbBuildCard=function(s,ev){if(!ev.deep)return _dwOldBuildCard(s,ev);
 const sb=s.sandbox,d=dwInit(s),k=ev.deep.kind,actor=ev.actor,rival=ev.deep.rival,land=dwLand(d,ev.deep.landId);
 const a=SANDBOX_ACTORS[actor],b=SANDBOX_ACTORS[rival];const known=d.knowledge.edward||[];
 const previous=d.chains.filter(x=>x.actor===actor||x.rival===actor).slice(-2);
 const prev=previous.length?`Earlier: ${previous.map(x=>x.summary).join(' ')}`:'No earlier royal ruling on this particular dispute is in the Chronicle.';
 const facts={
 estate:[`${a.name} challenges ${b.name}'s possession of ${land.name}.`,`${a.name} produces a charter and asks you to confirm the claim. ${b.name} maintains that possession was lawfully obtained.`, `Possession: ${b.name}. Claimant: ${a.name}. The charters cannot both be decisive.`],
 office:[`${a.name} has promised an office to a dependent.`,`${b.name} says the same office was promised earlier through another household. Both men have begun gathering supporters.`,`An appointment is being treated as a private reward. The Crown must decide whose authority can bind it.`],
 marriage:[`${a.name} proposes a marriage alliance.`,`${b.name} says the match will combine two affinities and make a contested inheritance harder to challenge.`,`Marriage carries property, access and future guardianship. Neither household describes all its interests.`],
 intelligence:[`${a.name} sends a warning about ${b.name}.`,`The report alleges private meetings with armed followers. The source will not give evidence in public.`,`A report is not proof. You know who sent it, not whether its allegation is true.`],
 retinue:[`${a.name} gathers retainers near ${land.name}.`,`${b.name} says the armed men threaten local tenants. ${a.name} insists they protect lawful rights.`,`The muster has already happened. Both sides claim to be defending the king's peace.`],
 succession:[`${a.name} seeks a place in the heir's household.`,`${b.name} warns that custody of a young heir could become control of the next reign.`,`Guardianship, offices and inheritance are distinct powers. A promise now may be remembered after Edward dies.`]
 };
 facts.wardship=[`${a.name} seeks custody of a young heir.`,`${b.name} argues that wardship would give the rival household both the child's person and the income of the inheritance.`,`The heir is not a political agent yet. Guardianship and control of revenue can be separated.`];
 facts.debt=[`${a.name} calls in a royal debt.`,`${b.name} says the payment was promised against revenues that are already pledged elsewhere.`,`The two accounts cannot both be satisfied from the same receipt. The Crown's credit depends on what it actually pays.`];
 // Situation-specific narrative: old rulings change the problem, not merely the adjectives.
 if(k==='estate'&&land.transfers.length){
  const old=land.transfers[land.transfers.length-1];
  facts.estate[1]=`${a.name} asks you to revisit the transfer of ${land.name} made in ${old.year}. ${b.name} says the Crown cannot keep changing possession whenever another petitioner arrives.`;
  facts.estate[2]=`A previous royal decision moved this estate from ${SANDBOX_ACTORS[old.from]?.name||old.from} to ${SANDBOX_ACTORS[old.to]?.name||old.to}. Both sides remember the precedent.`;
 }
 if(k==='estate'&&d.officeClaims[land.id]==='pending judgment'){
  facts.estate[1]=`The promised hearing over ${land.name} has still not settled possession. ${a.name} demands a date; ${b.name} asks why the royal order has not been enforced.`;
 }
 if(k==='office'&&d.officeClaims[land.id]){
  facts.office[1]=`${a.name} challenges the earlier warrant concerning ${land.name}. ${b.name} says the King's officers have already acted upon it.`;
  facts.office[2]=`The previous appointment is on record. Undoing it will affect people who relied on the Crown's word.`;
 }
 if(k==='marriage'&&d.bonds.some(x=>x.kind==='marriage'&&(x.a===actor||x.b===actor))){
  facts.marriage[1]=`${a.name} proposes a further household marriage. ${b.name} warns that the earlier match has already changed who controls access and inheritance.`;
 }
 if(k==='intelligence'&&d.personal[actor].promises.length){
  facts.intelligence[1]=`${a.name} brings an allegation about ${b.name}, but asks that the earlier private undertaking be remembered. The messenger will not name his informant.`;
 }
 if(k==='retinue'&&(sb.unrest[ev.where]||0)>=4){
  facts.retinue[1]=`${a.name} has gathered men near ${land.name}. ${b.name} has done the same. Tenants now avoid the road, and local officers say a royal order may arrive too late.`;
 }
 if((k==='succession'||k==='wardship')&&d.minority!=='unsettled'){
  facts[k][1]=`${a.name} challenges the guardianship previously entrusted to ${SANDBOX_ACTORS[d.minority]?.name||d.minority}. ${b.name} warns that the child's household could be divided by competing royal promises.`;
 }
 const entry=facts[k]||facts.estate;
 const choices={
 estate:['Confirm the claimant after hearing both titles.','Maintain possession until a formal judgment.'],
 office:['Recognise the appointment, with a royal warrant.','Suspend both appointments pending inquiry.'],
 marriage:['Consent, subject to recorded terms.','Refuse royal approval of the match.'],
 intelligence:['Order an inquiry into the allegation.','Demand a named witness before acting.'],
 retinue:['Accept sureties and order both musters reduced.','Command both households to disperse at once.'],
 succession:['Grant limited guardianship under supervision.','Reserve guardianship to the royal household.'],
 wardship:['Entrust the heir, but reserve estate revenues.','Keep custody and inheritance under royal officers.'],
 debt:['Pay the verified portion now.','Demand a full audit before payment.']
 };
 const c=choices[k]||choices.estate;
 const mk=(side,arena)=>({label:c[side==='left'?0:1],effects:(world)=>{dwResolve(world,ev,side,arena);return {records:[`${a.name} and ${b.name}: ${side==='left'?c[0]:c[1]} (${sb.year}).`],facts:{last_dynamic_event:k},obligations:(side==='left'&&['estate','marriage','succession','office'].includes(k))?[['edward',actor,`${k} decision affecting ${b.name}`,arena==='down'?'private':'public']]:[]};}});
 const context=`${entry[2]} ${prev} Reconstructed fictional case; the political institutions and pressures are historical, not the dialogue.`;
 const card={id:'dw-'+ev.serial,where:land?.region||ev.where,when:String(sb.year),who:a.name,role:a.role,tag:'A DISPUTE BETWEEN HOUSEHOLDS',record:'politics',quote:entry[1],context,left:mk('left','direct'),right:mk('right','direct'),dynamic:true};
 if(['estate','office','intelligence','succession','wardship','debt'].includes(k))card.up={title:'Submit the matter to formal process',who:'The Chancellor',role:'Royal Council',quote:`${(DW_TONE[k]||DW_TONE.estate).law} A public record will outlive this audience.`,left:mk('left','up'),right:mk('right','up')};
 if(['estate','marriage','intelligence','retinue','succession','wardship','debt'].includes(k))card.down={title:'Speak without the Council',who:a.name,role:'Private audience',quote:`${(DW_TONE[k]||DW_TONE.estate).private} The undertaking may not be witnessed.`,left:mk('left','down'),right:mk('right','down')};
 return card;
};
function dwResolve(s,ev,side,arena){const sb=s.sandbox,d=sb.deep,k=ev.deep.kind,actor=ev.actor,rival=ev.deep.rival,land=dwLand(d,ev.deep.landId),yes=side==='left';
 const pre=land.holder;const r=dwRel(d,actor,rival),rr=dwRel(d,rival,actor);
 if(k==='estate'){
  if(yes&&land.holder!==actor){land.holder=actor;land.transfers.push({year:sb.year,from:pre,to:actor,authority:arena==='up'?'formal hearing':'royal grant',cause:ev.serial});d.landTransfers++;d.personal[actor].assets.push(land.id);d.personal[rival].assets=d.personal[rival].assets.filter(x=>x!==land.id);rr.feud=Math.min(8,rr.feud+2);}
  else if(!yes){land.disputed=true;d.officeClaims[land.id]='pending judgment';}
 }
 if(k==='office'){if(yes)d.officeClaims[land.id]={appointee:actor,year:sb.year};else d.officeClaims[land.id]={appointee:null,year:sb.year,review:true};}
 if(k==='marriage'&&yes){d.bonds.push({kind:'marriage',a:actor,b:rival,year:sb.year,public:arena!=='down'});r.regard=Math.min(8,r.regard+2);rr.regard=Math.min(8,rr.regard+2);}
 if(k==='intelligence'){
  const id='allegation:'+ev.serial;dwFact(d,id,`${actor} alleges ${rival} has held a secret meeting.`,actor,false);
  dwLearn(d,'edward',id,`${SANDBOX_ACTORS[actor].name} alleges a private meeting involving ${SANDBOX_ACTORS[rival].name}.`,yes?'unverified':'unconfirmed',actor);
  if(yes){d.privateRevelations++;d.personal[rival].security=Math.max(0,d.personal[rival].security-1);}
 }
 if(k==='retinue'){sb.unrest[ev.where]=sbClamp(sb.unrest[ev.where]+(yes?-1:-2),0,9);d.personal[actor].security=Math.max(0,d.personal[actor].security-1);d.personal[rival].security=Math.max(0,d.personal[rival].security-1);}
 if(k==='succession'||k==='wardship'){d.minority=yes?actor:'crown';sb.regency=yes?actor:'crown';}
 if(k==='debt'){sb.credit=sbClamp(sb.credit+(yes?-1:1),-8,8);d.personal[actor].standing=Math.max(0,d.personal[actor].standing+(yes?1:-1));}
 if(yes){sbAdjust(sb,actor,{trust:1,influence:1});sbAdjust(sb,rival,{grievance:1,trust:-1});r.debt=Math.min(8,r.debt+1);}
 else{sbAdjust(sb,actor,{grievance:1,trust:-1});sbAdjust(sb,rival,{trust:1});}
 if(arena==='up'){sb.royalAuthority=sbClamp(sb.royalAuthority+1,-8,8);d.bonds.push({kind:'recorded precedent',a:actor,b:rival,year:sb.year});}
 if(arena==='down'){d.personal[actor].promises.push({year:sb.year,kind:k,private:true,against:rival});dwLearn(d,actor,'private:'+ev.serial,'A private undertaking was given.','witnessed','Edward');}
 const summary=`${SANDBOX_ACTORS[actor].name} challenged ${SANDBOX_ACTORS[rival].name} over ${k}${k==='estate'?' at '+land.name:''}; Edward ${yes?'accepted a limited claim':'withheld approval'}.`;
 d.chains.push({id:ev.serial,year:sb.year,actor,rival,kind:k,land:land.id,decision:side,arena,summary,parent:ev.parent});
 d.causalLinks+=ev.parent?1:0;
 // Response is addressed to BOTH parties, and one may act against the other next year.
 const resentment=sb.actors[rival].grievance;
 if(yes&&resentment>=2&&d.chains.filter(x=>x.actor===rival&&x.rival===actor).length<3){
  const validTitle=d.lands.some(x=>x.holder===actor&&x.claimant===rival);const retaliation=(validTitle?['estate','retinue','intelligence']:['retinue','intelligence'])[dwHash(s,'retaliate:'+ev.serial,validTitle?3:2)];
  const next=dwEvent(s,rival,retaliation,actor,'retaliation',ev.serial);next.where=land.region;next.deep.landId=land.id;
 }
 sb.history.push({serial:ev.serial,year:sb.year,actor,template:k,where:land.region,origin:ev.origin,side,arena,response:yes?'Recognised claim':'Withheld claim',parent:ev.parent,rival,land:land.id});
 sb.reactiveCount++;sb.yearTurn++;
 sb.feedback.push({year:sb.year,source:ev.serial,actor,followup:sb.events.length});
 if(sb.yearTurn>=sb.perYear)sbAdvanceYear(s);
}
const _dwOldEnding=sbEnding;
sbEnding=function(sb,s){const out=_dwOldEnding(sb,s),d=dwInit(s);const landholders={};for(const l of d.lands)landholders[l.holder]=(landholders[l.holder]||0)+l.revenue;
 const top=Object.entries(landholders).sort((a,b)=>b[1]-a[1])[0]?.[0]||'unknown';const successor=d.heirs.edward?'male heir of Edward':d.heirs.alternative?'alternative royal child':d.heirs.elizabeth?'daughter of Edward':'succession uncertain';
 out.dimensions.landDominance=top;out.dimensions.guardianship=d.minority;out.dimensions.heirs=Object.keys(d.heirs).length;
 out.key+='|'+top+'|'+d.minority+'|'+successor;
 out.narrative+=` In the local estates model, ${SANDBOX_ACTORS[top]?.name||top} holds the largest recorded landed revenue. Guardianship is ${d.minority}; the recorded dynastic position is ${successor}.`;
 out.deep={landTransfers:d.landTransfers,distinctLands:d.lands.map(l=>({id:l.id,holder:l.holder,transfers:l.transfers.length})),relationships:d.relationships,heirs:d.heirs,knowledgeClaims:Object.fromEntries(Object.entries(d.knowledge).map(([k,v])=>[k,v.length])),chains:d.chains.length,retaliations:d.privateActions.filter(x=>sb.history.some(y=>y.serial===x.serial&&y.origin==='retaliation')).length,privateRevelations:d.privateRevelations,actionKinds:d.actionKinds};
 return out;
};
