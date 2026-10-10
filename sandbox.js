/* EDWARD — THE LIVING REIGN. Experimental continuation 1465–1483.
 * All generated petitions and character dialogue are counterfactual reconstructions.
 * This is a rule-based sandbox, NOT a historical prediction or a language model.
 * Actors have private intentions. Their autonomous actions produce situations.
 * Player choices feed back into relationships, property, unrest and future actions.
 */
const SANDBOX_ACTORS={
 warwick:{name:'Richard Neville',role:'Earl of Warwick',family:'Neville',place:'North',goal:'influence',method:'delegation'},
 hastings:{name:'William Hastings',role:'Royal chamberlain',family:'Household',place:'Midlands',goal:'access',method:'petition'},
 woodville:{name:'Anthony Woodville',role:'Elizabeth Woodville’s brother',family:'Woodville',place:'Court',goal:'patronage',method:'marriage'},
 montagu:{name:'John Neville',role:'Lord Montagu',family:'Neville',place:'North',goal:'security',method:'garrison'},
 percy:{name:'A Percy retainer',role:'Northern household representative',family:'Percy',place:'North',goal:'estates',method:'claim'},
 lancaster:{name:'A Lancastrian correspondent',role:'Political exile (composite)',family:'Lancaster',place:'Wales',goal:'claim',method:'rumour'},
 burgundy:{name:'A Burgundian envoy',role:'Diplomatic representative (composite)',family:'Burgundy',place:'Calais',goal:'trade',method:'treaty'},
 london:{name:'A London alderman',role:'City representative (composite)',family:'City',place:'London',goal:'credit',method:'petition'}
};
const SB_PLACES=['North','Court','Midlands','East Anglia','West Country','Wales','Calais','London'];
const SB_TEMPLATES={
 patronage:{tag:'PATRONAGE',action:'places a household dependent in a disputed office',question:'A new officeholder claims to act in your name. The former holder demands to see the warrant.',
  left:'Confirm the appointment.',right:'Suspend it pending review.',up:'Call the Council',down:'Hear the petitioner alone'},
 estate:{tag:'LAND AND TITLE',action:'backs a claim to an estate whose title is contested',question:'Two households present incompatible charters. One now invokes a promise made by your government.',
  left:'Recognise the new claimant.',right:'Order an independent hearing.',up:'Refer the matter to judges',down:'Make a private settlement'},
 marriage:{tag:'KINSHIP',action:'negotiates a marriage between two political households',question:'A proposed marriage will join two networks of service. A rival household fears losing access to you.',
  left:'Give royal approval.',right:'Withhold royal approval.',up:'Hear the marriage council',down:'Speak privately to the family'},
 retinue:{tag:'ARMED SERVICE',action:'gathers retainers and claims they are needed for local security',question:'The muster is said to defend the peace, but neighbouring households have begun arming too.',
  left:'Authorise the muster.',right:'Order the men dispersed.',up:'Ask for muster rolls',down:'Offer a private guarantee'},
 rumour:{tag:'INFORMATION',action:'sends conflicting intelligence about a rival household',question:'Your messengers disagree about the source. No witness can yet be questioned in person.',
  left:'Act on the warning.',right:'Wait for corroboration.',up:'Examine the reports',down:'Question the messenger alone'},
 petition:{tag:'ACCESS',action:'organises petitioners seeking the king’s attention',question:'Several petitioners now approach this household instead of your ordinary officers.',
  left:'Accept this channel.',right:'Require formal registration.',up:'Bring the petitions to chancery',down:'Hear one petitioner privately'},
 treaty:{tag:'DIPLOMACY',action:'opens a channel to a foreign or border interest',question:'An envoy asks whether the assurances offered by your servant bind the Crown.',
  left:'Ratify the assurance.',right:'Disavow it.',up:'Take advice on the terms',down:'Send a private instruction'},
 garrison:{tag:'BORDER SECURITY',action:'changes the garrison of a disputed stronghold',question:'The captain asks for men and money. Local landholders say his soldiers have burdened the countryside.',
  left:'Supply the garrison.',right:'Limit the captain’s authority.',up:'Audit the command',down:'Meet the captain privately'},
 claim:{tag:'DYNASTIC PRESSURE',action:'revives a disputed claim to service and inheritance',question:'The claim is old, but men are now repeating it in taverns and household halls.',
  left:'Offer terms of reconciliation.',right:'Demand public submission.',up:'Seek legal advice',down:'Offer a private safe-conduct'},
 credit:{tag:'THE KING’S CREDIT',action:'questions the terms of a royal loan',question:'The Crown’s promise is remembered differently by the merchant and the royal clerk.',
  left:'Honour the creditor’s account.',right:'Require written proof.',up:'Examine the accounts',down:'Negotiate privately'},
 succession:{tag:'THE SUCCESSION',action:'asks which household will safeguard the next reign',question:'An heir’s security is becoming a political question. Those who ask for reassurance also ask for influence.',
  left:'Name a formal protector.',right:'Keep the decision with the Crown.',up:'Convene a succession council',down:'Seek a private undertaking'},
 rebellion:{tag:'BREAK IN THE PEACE',action:'defies an order and calls supporters to resist',question:'A local official has withdrawn from your obedience. Several households are watching whether you negotiate or send force.',
  left:'Offer a negotiated pardon.',right:'Authorise an armed response.',up:'Summon a formal commission',down:'Send a secret emissary'}
};
const SB_ALLOWED={
 warwick:['patronage','estate','marriage','retinue','treaty','petition','rumour','claim','rebellion'],
 hastings:['patronage','estate','petition','marriage','rumour','succession'],
 woodville:['marriage','estate','petition','patronage','succession','rumour'],
 montagu:['garrison','retinue','estate','claim','rumour','rebellion'],
 percy:['estate','retinue','claim','petition','rebellion'],
 lancaster:['claim','rumour','treaty','rebellion'],
 burgundy:['treaty','rumour','credit'],
 london:['credit','petition','rumour']
};
const SB_METHOD_TO_TEMPLATE={delegation:'patronage',petition:'petition',marriage:'marriage',garrison:'garrison',claim:'estate',rumour:'rumour',treaty:'treaty'};
function sbClamp(n,min=-5,max=8){return Math.max(min,Math.min(max,n));}
function sbRandom(s,key,mod){return hashScore(s.seed,'sandbox:'+key,s.sandbox.serial)%mod;}
function sbInit(s){if(s.sandbox)return s.sandbox;
 const marriage=s.facts.marriage;
 const actors={};for(const [id,src] of Object.entries(SANDBOX_ACTORS)){
  const existing=(id==='warwick'?s.links.warwick:id==='hastings'?s.links.hastings:id==='woodville'?s.links.woodville:0)||0;
  actors[id]={influence:sbClamp(2+Math.round(existing/3),0,8),trust:sbClamp(Math.round(existing/2),-5,6),grievance:0,network:src.family,alive:true,lastAct:0};
 }
 if(marriage!=='elizabeth')actors.woodville.influence=2;
 if(s.facts.somerset_1464==='stays')actors.lancaster.trust=1;
 s.sandbox={year:1465,yearTurn:0,perYear:4,serial:0,actors,unrest:{North:s.facts.north_rising_1464==='active'?3:0,Court:0,Midlands:0,'East Anglia':0,'West Country':0,Wales:1,Calais:0,London:0},legitimacy:2,royalAuthority:2,credit:2,heir:'undecided',marriage:marriage||'unsettled',claims:[],events:[],history:[],actions:[],feedback:[],reactiveCount:0,autonomousCount:0,yearSummaries:[],endings:null,ended:false,regency:'unsettled',phase:'reign',knownRebellions:0};
 s.facts.sandbox_open=true;
 scheduleReport(s,{id:'sb-first-year',from:'The royal household',text:'The Crown is no longer occupied solely with conquest. Households now compete over offices, marriages, land and access.',delay:0});
 return s.sandbox;
}
function sbAdjust(sb,id,{influence=0,trust=0,grievance=0}={}){const a=sb.actors[id];if(!a)return;a.influence=sbClamp(a.influence+influence,0,10);a.trust=sbClamp(a.trust+trust,-6,7);a.grievance=sbClamp(a.grievance+grievance,0,8);}
function sbQueue(sb,evt){if(sb.events.length>15)sb.events.shift();sb.events.push(evt);}
function sbChooseAction(s,id){const sb=s.sandbox,a=sb.actors[id],info=SANDBOX_ACTORS[id];
 // Motivation is state-dependent: agents who lose influence seek allies; grievances raise risk.
 const upset=a.grievance>=3||a.trust<=-3;
 if(upset&&SB_ALLOWED[id].includes('rebellion')&&a.influence>=3&&sbRandom(s,id+'resist'+sb.year,5)<2)return 'rebellion';
 if(upset&&SB_ALLOWED[id].includes('claim')&&sbRandom(s,id+'claim'+sb.year,3)===0)return 'claim';
 if(id==='lancaster'&&sb.unrest.Wales>=3)return 'claim';
 if(id==='woodville'&&sb.marriage!=='elizabeth')return sbRandom(s,'wood'+sb.year,2)?'estate':'petition';
 if(id==='warwick'&&sb.actors.hastings.influence>a.influence+1)return 'retinue';
 if(id==='hastings'&&sb.actors.warwick.influence>a.influence+2)return 'patronage';
 if(id==='london'&&sb.credit<0)return 'credit';
 if(id==='montagu'&&sb.unrest.North>=3)return 'garrison';
 if(sb.year>=1475&&id==='woodville'&&sb.heir==='woodville')return sbRandom(s,'heir'+sb.year,2)?'succession':'marriage';
 const options=SB_ALLOWED[id].filter(x=>x!=='rebellion');return options[sbRandom(s,id+':action:'+sb.year,options.length)];
}
function sbActorStep(s){const sb=s.sandbox;
 const ids=Object.keys(sb.actors).filter(id=>sb.actors[id].alive);
 // Each year, two autonomous actors pursue goals even if Edward does nothing.
 const ranked=ids.map(id=>({id,score:sb.actors[id].grievance*4+sb.actors[id].influence+sbRandom(s,id+':initiative:'+sb.year,9)})).sort((a,b)=>b.score-a.score);
 for(const {id} of ranked.slice(0,2)){
  const a=sb.actors[id],template=sbChooseAction(s,id),where=SANDBOX_ACTORS[id].place;
  const ev={serial:++sb.serial,actor:id,template,where,year:sb.year,origin:'autonomous',sourceAction:'yearly initiative',parent:null};
  sbQueue(sb,ev);sb.autonomousCount++;a.lastAct=sb.year;
  if(template==='rebellion'){sb.unrest[where]=sbClamp(sb.unrest[where]+2,0,9);sb.knownRebellions++;}
  else if(template==='patronage'||template==='marriage')a.influence=sbClamp(a.influence+1,0,10);
  sb.actions.push({year:sb.year,actor:id,template,reason:'autonomous initiative',serial:ev.serial});
  // Some acts are known immediately only to their agent. Edward receives a delayed report.
  scheduleReport(s,{id:'sb-actor-'+ev.serial,from:SANDBOX_ACTORS[id].name,text:`A correspondent reports that ${SANDBOX_ACTORS[id].name} ${SB_TEMPLATES[template].action}.`,delay:1+sbRandom(s,'report:'+ev.serial,2),certainty:'reported'});
 }
 // Long-run pressure, not a compulsory historical event.
 const rival=sb.actors.warwick.grievance+sb.actors.warwick.influence-sb.royalAuthority;
 if(rival>9&&sbRandom(s,'rival'+sb.year,3)===0){sbQueue(sb,{serial:++sb.serial,actor:'warwick',template:'claim',where:'Court',year:sb.year,origin:'pressure',sourceAction:'unresolved magnate influence'});}
 if(sb.year>=1470&&sb.year%3===0){sbQueue(sb,{serial:++sb.serial,actor:'lancaster',template:'claim',where:'Wales',year:sb.year,origin:'structural',sourceAction:'continuing dynastic claim'});}
 if(sb.year>=1476&&sb.year%4===0){sbQueue(sb,{serial:++sb.serial,actor:'hastings',template:'succession',where:'Court',year:sb.year,origin:'structural',sourceAction:'uncertainty about succession'});}
}
function sbAdvanceYear(s){const sb=s.sandbox;
 sb.yearSummaries.push({year:sb.year,unrest:Object.values(sb.unrest).reduce((a,b)=>a+b,0),leading:sbLeader(sb),events:sb.history.filter(x=>x.year===sb.year).length});
 sb.year++;sb.yearTurn=0;
 if(sb.year>1483){sb.ended=true;sb.endings=sbEnding(sb,s);s.finished=true;return;}
 // Annual effects are structural, not a historical replay.
 for(const id of Object.keys(sb.actors)){const a=sb.actors[id];if(a.grievance>0&&sbRandom(s,'grievance:'+id+':'+sb.year,3)===0)a.grievance--;}
 if(sb.credit<-2)sb.unrest.London=sbClamp(sb.unrest.London+1,0,9);
 if(sb.unrest.North>=6)sb.legitimacy=sbClamp(sb.legitimacy-1,-8,8);
 if(sb.year===1470&&sb.heir==='undecided'&&sb.marriage==='elizabeth'&&sbRandom(s,'royal-child:'+sb.year,3)!==0)sb.heir='woodville';
 if(sb.year>=1472&&sb.heir==='undecided'&&sb.marriage==='foreign'&&sbRandom(s,'foreign-child:'+sb.year,4)===0)sb.heir='other';
 if(sb.year>=1470&&sb.heir==='undecided'&&sbRandom(s,'heirpress:'+sb.year,3)===0)sb.legitimacy=sbClamp(sb.legitimacy-1,-8,8);
 sbActorStep(s);
}
function sbLeader(sb){return Object.entries(sb.actors).filter(([,v])=>v.alive).sort((a,b)=>b[1].influence-a[1].influence)[0][0];}
function sbEvent(s){const sb=sbInit(s);
 if(sb.ended)return null;
 // There is no scripted sequence: the queue is produced by autonomous actors and consequences.
 if(sb.events.length===0)sbActorStep(s);
 if(sb.events.length===0)sbQueue(sb,{serial:++sb.serial,actor:'london',template:'credit',where:'London',year:sb.year,origin:'structural',sourceAction:'royal credit'});
 const ev=sb.events.shift();sb.current=ev;
 return sbBuildCard(s,ev);
}
function sbBuildCard(s,ev){const sb=s.sandbox,t=SB_TEMPLATES[ev.template],person=SANDBOX_ACTORS[ev.actor],a=sb.actors[ev.actor];
 const motive=a.grievance>=3?'This household has reason to resent earlier royal decisions.':a.trust>=3?'This household has often cooperated with the Crown.':'The Crown cannot know every private undertaking behind this request.';
 const original=ev.parent?sb.history.find(x=>x.serial===ev.parent):null;
 const memory=original?`This dispute follows your earlier decision: ${original.response}.`:sb.history.some(x=>x.actor===ev.actor)?`You have dealt with this household before; its previous requests remain part of the record.`:'';
 const description=`${person.name} ${t.action}. ${t.question}`;
 const record=(side,arena)=>({records:[`${person.name}: ${side==='left'?t.left:t.right} (${ev.where}, ${ev.year}).`],facts:{last_dynamic_event:ev.template},obligations:(side==='left'&&['patronage','estate','marriage','claim','succession'].includes(ev.template))?[['edward',ev.actor,`Royal assent to ${ev.template} in ${ev.year}`,arena==='down'?'private':'public']]:[]});
 const choice=(side,arena)=>({label:side==='left'?t.left:t.right,effects:(world)=>{sbResolve(world,ev,side,arena);return record(side,arena);}});
 const card={id:'sb-'+ev.serial,where:ev.where,when:String(ev.year),who:ev.origin==='reaction'?person.name:'A royal messenger',role:ev.origin==='reaction'?person.role:'Report concerning '+person.name,tag:ev.origin==='autonomous'?'A HOUSEHOLD ACTS':t.tag,record:'politics',quote:description,context:`${motive}${memory?' '+memory:''} Reported political situation; dialogue is reconstructed.`,left:choice('left','direct'),right:choice('right','direct'),dynamic:true};
 if(ev.serial%3===0)card.up={title:t.up,who:'The royal Council',role:'An institutional hearing',quote:`${t.question} The Chancellor warns that a formal ruling will become a precedent.`,left:choice('left','up'),right:choice('right','up')};
 if(ev.serial%4===0)card.down={title:t.down,who:person.name,role:'A private audience',quote:`${t.question} A private undertaking could settle this without witnesses, but may later be denied.`,left:choice('left','down'),right:choice('right','down')};
 return card;
}
function sbResolve(s,ev,side,arena){const sb=s.sandbox,who=ev.actor,a=sb.actors[who],where=ev.where,yes=side==='left';
 const before={trust:a.trust,influence:a.influence,grievance:a.grievance,unrest:sb.unrest[where],credit:sb.credit};
 const t=ev.template;
 if(['patronage','estate','marriage','petition','treaty','claim','succession'].includes(t)){
  sbAdjust(sb,who,{trust:yes?1:-1,grievance:yes?-1:1,influence:yes?1:0});
  if(yes)sb.royalAuthority=sbClamp(sb.royalAuthority-1,-8,8);
  else sb.royalAuthority=sbClamp(sb.royalAuthority+1,-8,8);
 }
 if(t==='retinue'||t==='garrison'||t==='rebellion'){
  sb.unrest[where]=sbClamp(sb.unrest[where]+(yes?-1:1),0,9);
  sbAdjust(sb,who,{trust:yes?1:-2,grievance:yes?-1:2});
  if(!yes)sb.royalAuthority=sbClamp(sb.royalAuthority+1,-8,8);
 }
 if(t==='credit'){sb.credit=sbClamp(sb.credit+(yes?-1:1),-8,8);sbAdjust(sb,who,{trust:yes?2:-1,grievance:yes?-1:1});}
 if(t==='rumour'){if(yes){sb.unrest[where]=sbClamp(sb.unrest[where]+1,0,9);sb.legitimacy=sbClamp(sb.legitimacy-1,-8,8);}else sb.royalAuthority=sbClamp(sb.royalAuthority+1,-8,8);}
 if(t==='succession'){sb.regency=yes?who:'crown';if(yes&&who==='woodville')sb.heir='woodville';if(!yes)sb.royalAuthority=sbClamp(sb.royalAuthority+1,-8,8);}
 if(t==='marriage'&&yes&&who==='woodville'&&sb.marriage==='elizabeth')sb.heir='woodville';
 if(arena==='up'){sb.royalAuthority=sbClamp(sb.royalAuthority+1,-8,8);sb.credit=sbClamp(sb.credit-1,-8,8);}
 if(arena==='down'){sbAdjust(sb,who,{trust:1});sb.royalAuthority=sbClamp(sb.royalAuthority-1,-8,8);}
 sb.history.push({serial:ev.serial,year:sb.year,actor:who,template:t,where,origin:ev.origin,side,arena,response:yes?SB_TEMPLATES[t].left:SB_TEMPLATES[t].right,before,after:{trust:a.trust,influence:a.influence,grievance:a.grievance,unrest:sb.unrest[where],credit:sb.credit}});
 sb.yearTurn++;sb.reactiveCount++;
 // Feedback: a rebuffed magnate may mobilize, a rewarded one brings dependents.
 const delta=a.grievance-before.grievance;
 if(delta>0&&a.grievance>=3){const follow= a.influence>=4&&SB_ALLOWED[who].includes('retinue')?'retinue':SB_ALLOWED[who].includes('claim')?'claim':'rumour';sbQueue(sb,{serial:++sb.serial,actor:who,template:follow,where,year:sb.year,origin:'reaction',sourceAction:'rejection by the Crown',parent:ev.serial});}
 else if(yes&&a.influence>=5&&['patronage','estate','marriage'].includes(t)){
  sbQueue(sb,{serial:++sb.serial,actor:who,template:'petition',where,year:sb.year,origin:'reaction',sourceAction:'newly empowered household',parent:ev.serial});
 }
 // A rival household can react to a grant: the same decision produces a different petitioner.
 if(yes&&['estate','patronage','marriage'].includes(t)){
  const rivals=Object.keys(sb.actors).filter(id=>id!==who&&id!=='london'&&sb.actors[id].alive);
  const rival=rivals[hashScore(s.seed,'rival:'+ev.serial,sb.year)%rivals.length];
  if(sb.actors[rival].influence>=3){sbAdjust(sb,rival,{grievance:1});if(sb.actors[rival].grievance>=3)sbQueue(sb,{serial:++sb.serial,actor:rival,template:SB_ALLOWED[rival].includes('estate')?'estate':'rumour',where:SANDBOX_ACTORS[rival].place,year:sb.year,origin:'reaction',sourceAction:'rival displaced by grant',parent:ev.serial});}
 }
 sb.feedback.push({year:sb.year,source:ev.serial,actor:who,delta,followup:sb.events.length});
 if(sb.yearTurn>=sb.perYear){ // keep events queued; they may be addressed next year.
  sbAdvanceYear(s);
 }
}
function sbEnding(sb,s){
 const unrest=Object.values(sb.unrest).reduce((a,b)=>a+b,0),ranked=Object.entries(sb.actors).sort((a,b)=>b[1].influence-a[1].influence);
 const strongest=ranked[0][0],second=ranked[1][0];
 const crown=sb.royalAuthority>=4?'central':sb.royalAuthority>=0?'negotiated':'delegated';
 const peace=unrest>=16?'fractured':unrest>=8?'uneasy':'settled';
 const dynasty=sb.heir==='woodville'?'woodville':sb.heir==='undecided'?'unsettled':'other';
 const foreign=sb.credit>=3?'creditworthy':sb.credit>=-2?'strained':'indebted';
 const key=[strongest,second,crown,peace,dynasty,foreign].join('|');
 const label=`${crown==='central'?'The King’s Officers':crown==='delegated'?'The Great Households':'A Bargained Crown'} · ${peace==='settled'?'A Quiet Realm':peace==='fractured'?'A Fractured Realm':'An Uneasy Peace'}`;
 const afterworld=sbAfterEdward(sb,s);
 const narrative=`In 1483, ${SANDBOX_ACTORS[strongest].name} commands the strongest household network; ${SANDBOX_ACTORS[second].name} remains a significant rival. Royal authority is ${crown}, the realm is ${peace}, and succession is ${dynasty}. Credit is ${foreign}. These conditions—not a fixed historical ending—shape what follows Edward. ${afterworld.map(x=>x.text).join(' ')}`;
 return {key,label,narrative,dimensions:{strongest,second,crown,peace,dynasty,foreign},unrest,actors:ranked.map(([id,a])=>({id,influence:a.influence,trust:a.trust,grievance:a.grievance})),historyCount:sb.history.length,autonomousCount:sb.autonomousCount,afterworld};
}

/* Two autonomous years after Edward's death: player input is disabled.
   The aftermath is conditional on the world left behind, never a forced Tudor ending. */
function sbAfterEdward(sb,s){
 const rows=[];const leading=Object.entries(sb.actors).sort((a,b)=>b[1].influence-a[1].influence);
 const first=leading[0],second=leading[1];
 const claimants=sb.heir==='undecided'?'the succession is openly disputed':sb.heir==='woodville'?'the queen’s household claims guardianship of the heir':'a different dynastic settlement is asserted';
 rows.push({year:1484,text:`With Edward gone, ${claimants}. ${SANDBOX_ACTORS[first[0]].name} commands the largest political network.`});
 const rivalry=first[1].influence-second[1].influence<=2||second[1].grievance>=3;
 const violent=rivalry&&(Object.values(sb.unrest).reduce((a,b)=>a+b,0)>=10||sb.legitimacy<0);
 if(violent)rows.push({year:1485,text:`Competing households refuse a common settlement. ${SANDBOX_ACTORS[second[0]].name} rallies supporters; the succession remains vulnerable to armed intervention.`});
 else if(rivalry)rows.push({year:1485,text:`The strongest households bargain over offices and protection. No decisive confrontation is yet reported.`});
 else rows.push({year:1485,text:`The dominant household manages a provisional settlement. Lesser rivals remain, but no immediate coalition can overturn it.`});
 return rows;
}
