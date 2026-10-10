/* EDWARD — state-triggered crises, not dated cutscenes.
   A crisis exists only after agents, royal orders, debt, or local unrest create it.
   All dialogue and named local testimony are fictional composites. */
const WP_CASES={
 warwick:{name:'THE CAPTAINS’ SUMMONS',year:1469,last:1474,actor:'warwick',where:'Midlands',source:'https://www.royal.uk/edward-iv',anchor:'Warwick turned against Edward in recorded history in 1470 and died at Barnet in 1471. Here a confrontation requires a generated grievance; neither betrayal nor death is preordained.',
  eligible:s=>{const a=s.sandbox.actors.warwick;return a.alive&&a.grievance>=5&&a.trust<=-1&&a.influence>=3;},
  still:s=>s.sandbox.actors.warwick.grievance>=3||s.sandbox.unrest.Midlands>=4,
  scenes:[
   {who:'A royal pursuivant',role:'A returned summons · Warwickshire',tag:'A SUMMONS RETURNED',quote:'The Earl’s captains have returned your summons unopened. A sheriff reports that armed men now guard the road to their hall. I have the names of two captains willing to swear safe conduct—but not in front of the Earl’s servants.',stake:'NEW EVIDENCE: a rejected royal summons and two captains offering sworn testimony. A hearing may divide the retinue; force may unite it.',l:'Offer safe conduct and examine the captains.',r:'Summon the retinue under threat of force.',le:{credit:-1,authority:1,people:{warwick:{trust:2,grievance:-3}},unrest:{Midlands:-1}},re:{authority:1,people:{warwick:{grievance:2,trust:-2}},unrest:{Midlands:2}}},
   {who:'A sheriff of Warwickshire',role:'Armed followers · disputed obedience',tag:'THE BRIDGE AND THE OATH',quote:'Two bands face one another at the river crossing. One carries the king’s writ; the other insists it protects its lord against unlawful arrest. The sheriff can name the men on both sides. Neither band will disarm first.',stake:'NEW EVIDENCE: rival armed parties block the crossing. The king can pay to enforce his writ or bargain for mutual disarmament.',l:'Fund a royal force to clear the crossing.',r:'Negotiate mutual disarmament with sureties.',le:{credit:-2,authority:2,people:{warwick:{influence:-2,grievance:1}},unrest:{Midlands:-2}},re:{authority:-1,people:{warwick:{trust:1,grievance:-2}},unrest:{Midlands:-2}}}
  ]},
 north:{name:'THE TWO SHERIFFS',year:1467,last:1481,actor:'montagu',where:'North',source:'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/',anchor:'The Percy–Neville rivalry and contested royal authority in northern England were historical. These two sheriffs and their conflicting orders are invented for this simulation.',
  eligible:s=>s.sandbox.unrest.North>=5&&(s.sandbox.actors.percy.grievance>=2||s.sandbox.actors.montagu.grievance>=2),
  still:s=>s.sandbox.unrest.North>=4,
  scenes:[
   {who:'A northern county clerk',role:'Two sealed orders · the northern shires',tag:'THE SAME TAX, TWICE',quote:'I hold two warrants for the same winter levy. One bears the Neville seal, the other a Percy officer’s. Tenants have paid neither, fearing that the other lord will collect again. The sheriff asks whose receipt will protect them.',stake:'NEW EVIDENCE: incompatible levies threaten the same tenants. A royal audit costs money; a noble collector gains power.',l:'Audit both warrants and protect paid tenants.',r:'Recognise one lord’s collection rights.',le:{credit:-1,authority:2,unrest:{North:-2},people:{percy:{grievance:1},montagu:{grievance:1}}},re:{authority:-1,unrest:{North:1},people:{montagu:{influence:1},percy:{grievance:1}}}},
   {who:'A reeve from the northern shires',role:'A witnessed rent account',tag:'THE RECEIPT THAT FAILED',quote:'I brought the tenants’ receipts to the assize. Three bear a seal neither lord now admits. The collectors threaten distraint before harvest. Shall we seize the false seal, or postpone collection until witnesses can be heard?',stake:'NEW EVIDENCE: disputed receipts, not merely rival opinions. Enforcement now determines whether tenants lose their livestock.',l:'Suspend distraint; examine the seal.',r:'Enforce the recognised levy immediately.',le:{credit:-1,authority:1,unrest:{North:-2}},re:{authority:1,unrest:{North:2},people:{percy:{grievance:1}}}}
  ]},
 parish:{name:'THE PRIEST’S TWO OATHS',year:1465,last:1481,actor:'percy',where:'North',source:'https://www.nationalarchives.gov.uk/explore-the-collection/explore-by-time-period/medieval/the-wars-of-the-roses/',anchor:'Clergy sometimes mediated local disputes. This priest, the two oaths and the tenants are fictional examples of how a local truce might affect property and safety.',
  eligible:s=>s.sandbox.unrest.North>=3&&s.sandbox.story?.arcs?.north?.heard>=1&&(s.sandbox.actors.percy.grievance>=2||s.sandbox.actors.montagu.grievance>=2),
  still:s=>s.sandbox.unrest.North>=3,
  scenes:[
   {who:'A Northumberland parish priest',role:'Two sworn sureties · a disputed meadow',tag:'A PEACE WITH NO RENT',quote:'I have the marks of two captains who promise not to raid until harvest. Yet their stewards demand the same meadow rent, and three families will not cross the road to market. Give them safe passage now, or let the deed decide everything first?',stake:'NEW EVIDENCE: two sworn pledges, three families unable to trade. The tenants need safe passage before a court can decide title.',l:'Protect the road; reserve the land claim.',r:'Examine the deeds before sealing peace.',le:{authority:1,unrest:{North:-2},credit:-1},re:{authority:1,unrest:{North:1}}},
   {who:'The same parish priest',role:'A harvest report · sworn testimony',tag:'THE OATH AT HARVEST',quote:'The autumn carts have returned, but one rent collector broke the peace and seized a tenant’s ox. The two captains blame one another. I can name the collector and the witness; the village asks for a remedy, not another promise.',stake:'NEW EVIDENCE: an identifiable seizure after the truce. Restitution costs the offending patron; an inquest costs the Crown.',l:'Order restitution and sworn sureties.',r:'Send a royal justice to hear the seizure.',le:{authority:1,unrest:{North:-1},people:{percy:{grievance:1}}},re:{credit:-1,authority:2,unrest:{North:-2}}}
  ]},
 treasury:{name:'THE CUSTOMS PLEDGE',year:1474,last:1482,actor:'london',where:'London',source:'https://www.royal.uk/edward-iv',anchor:'Edward IV relied on crown revenue, merchants and customs receipts. This duplicated customs pledge is an invented fiscal crisis that occurs only when the simulated treasury is in severe debt.',
  eligible:s=>s.sandbox.credit<=-4&&(s.sandbox.story?.flags?.frenchSettlement==='campaign'||s.sandbox.story?.flags?.northGarrison==='crown'||s.sandbox.year>=1477),
  still:s=>s.sandbox.credit<=-2,
  scenes:[
   {who:'A London customs officer',role:'The royal Exchequer · a sealed account',tag:'ONE RECEIPT, TWO CREDITORS',quote:'I have two signed warrants against next year’s wool customs. One promises wages to the captains; the other secures a merchant’s loan. Both are genuine. If I pay either, the other will call the Crown a defaulter.',stake:'NEW EVIDENCE: two authentic warrants pledge the same customs revenue. The king must renegotiate debt or cut military spending.',l:'Renegotiate both debts in public.',r:'Suspend the military warrant first.',le:{credit:2,authority:1,people:{london:{trust:1}},unrest:{Calais:1}},re:{credit:2,authority:-1,unrest:{Calais:2},people:{burgundy:{grievance:1}}}},
   {who:'A merchant of the London Staple',role:'A letter of credit · unpaid balances',tag:'THE MERCHANT’S SECURITY',quote:'The merchants will advance silver again, but only if a named customs officer witnesses the new terms. The captain offers his men as security. I have brought both parties to your court. Shall their bargain be public?',stake:'NEW EVIDENCE: credit is available on enforceable terms. A private arrangement may be faster but will be harder to audit.',l:'Register a witnessed repayment schedule.',r:'Arrange a private extension of credit.',le:{credit:2,authority:1,people:{london:{trust:1}}},re:{credit:1,authority:-1,people:{london:{influence:1}}}}
  ]}
};
function wpDocumentDeath(s){const sb=s.sandbox;if(!sb||sb.year<1476||s.facts.george_neville_death_recorded)return;
 s.facts.george_neville_death_recorded=true;
 if(s.offices.chancellor==='george')s.offices.chancellor='unassigned';
 sb.story?.offscreen.push({year:1476,actor:'george',kind:'documented death',description:'George Neville, Archbishop of York, died in 1476; he cannot remain Chancellor.'});
 scheduleReport(s,{id:'george-neville-death-1476',from:'The royal household',text:'News reaches the court of the death of George Neville, Archbishop of York. The Great Seal must be entrusted to a living officer.',delay:0,certainty:'reported'});
}
function wpInit(s){const sb=s.sandbox;wpDocumentDeath(s);if(!sb.pressure)sb.pressure={schema:1,cases:{},journal:[],triggers:[],causal:[]};
 if(sb.unrest['East Anglia']===undefined)sb.unrest['East Anglia']=0;if(sb.unrest['West Country']===undefined)sb.unrest['West Country']=0;
 return sb.pressure;
}
function wpQueue(s,id,stage){const sb=s.sandbox,st=wpInit(s),caseState=st.cases[id],def=WP_CASES[id];
 const ev={serial:++sb.serial,actor:def.actor,template:'petition',where:def.where,year:sb.year,origin:'conditional-crisis',sourceAction:'a threshold crossed in the simulated world',pressure:{id,stage},parent:caseState?.parent||null};
 sb.events.unshift(ev);caseState.inFlight=true;return ev;
}
function wpSchedule(s){const sb=s.sandbox;if(sb.ended)return;const st=wpInit(s);const year=sb.year;
 if(st.lastScheduledYear===year)return;
 // Save/load recovery: a scheduled event may be the current card, not in the queue.
 for(const [id,row] of Object.entries(st.cases))if(row.inFlight&&!sb.events.some(e=>e.pressure?.id===id)&&sb.current?.pressure?.id!==id)row.inFlight=false;
 const due=Object.entries(st.cases).filter(([id,row])=>row.stage===1&&!row.inFlight&&row.due<=year&&WP_CASES[id].still(s));
 if(due.length){const [id]=due[0];wpQueue(s,id,1);st.lastScheduledYear=year;return;}
 // Cases that resolved themselves off-screen do not produce an empty recap card.
 for(const [id,row] of Object.entries(st.cases))if(row.stage===1&&!row.inFlight&&row.due<=year&&!WP_CASES[id].still(s)){row.stage=2;row.outcome='Pressure subsided after other decisions';st.journal.push({id,year,stage:'resolved-offscreen',cause:'Changed world conditions',outcome:row.outcome});}
 const candidates=Object.entries(WP_CASES).filter(([id,def])=>!st.cases[id]&&year>=def.year&&year<=def.last&&def.eligible(s)).map(([id,def])=>({id,score:(sb.actors[def.actor]?.grievance||0)*3+(id==='treasury'?-sb.credit:0)+hashScore(s.seed,'world-pressure:'+id,year)%5})).sort((a,b)=>b.score-a.score);
 if(candidates.length){const id=candidates[0].id,def=WP_CASES[id];const trigger={year,id,conditions:{unrestNorth:sb.unrest.North,warwickGrievance:sb.actors.warwick.grievance,warwickTrust:sb.actors.warwick.trust,credit:sb.credit}};st.triggers.push(trigger);st.cases[id]={stage:0,due:year,firstYear:year,inFlight:false,parent:null,outcome:null,trigger};wpQueue(s,id,0);}
 st.lastScheduledYear=year;
}
const _wpOldNdSchedule=ndSchedule;
ndSchedule=function(s){_wpOldNdSchedule(s);wpSchedule(s);};
const _wpOldBuildCard=sbBuildCard;
sbBuildCard=function(s,ev){if(!ev.pressure)return _wpOldBuildCard(s,ev);
 const def=WP_CASES[ev.pressure.id],scene=def.scenes[ev.pressure.stage];
 const mk=side=>({label:side==='left'?scene.l:scene.r,effects:w=>{wpResolve(w,ev,side);return {records:[def.name+': '+(side==='left'?scene.l:scene.r)],facts:{last_conditional_crisis:ev.pressure.id}};}});
 return {id:'sb-'+ev.serial,where:def.where,when:String(s.sandbox.year),who:scene.who,role:scene.role,tag:scene.tag,record:'politics',quote:scene.quote,context:scene.stake,dynamic:true,left:mk('left'),right:mk('right'),insight:{line:scene.quote,stake:scene.stake.replace('NEW EVIDENCE: ','')},caseInfo:{title:def.name,anchor:def.anchor,source:def.source,stage:'conditional'},pressureInfo:{id:ev.pressure.id,stage:ev.pressure.stage,why:stReason(s,ev.pressure.id)}};
};
function stReason(s,id){const p=wpInit(s).cases[id]?.trigger?.conditions;if(!p)return 'Consequences of earlier decisions';
 if(id==='warwick')return `Warwick’s grievance reached ${p.warwickGrievance} and trust fell to ${p.warwickTrust}.`;
 if(id==='treasury')return `Royal credit fell to ${p.credit}.`;
 return `Northern unrest reached ${p.unrestNorth}, with rival claims still unresolved.`;
}
function wpResolve(s,ev,side){const sb=s.sandbox,st=wpInit(s),id=ev.pressure.id,row=st.cases[id],def=WP_CASES[id],scene=def.scenes[ev.pressure.stage],effect=side==='left'?scene.le:scene.re;
 if(row.stage!==ev.pressure.stage)throw Error('Crisis stage mismatch '+id);
 if(effect.credit)sb.credit=sbClamp(sb.credit+effect.credit,-8,8);
 if(effect.authority)sb.royalAuthority=sbClamp(sb.royalAuthority+effect.authority,-8,8);
 for(const [region,delta] of Object.entries(effect.unrest||{}))sb.unrest[region]=sbClamp((sb.unrest[region]||0)+delta,0,9);
 for(const [actor,delta] of Object.entries(effect.people||{}))sbAdjust(sb,actor,delta);
 const summary=side==='left'?scene.l:scene.r;
 st.journal.push({id,year:sb.year,stage:row.stage,choice:side,outcome:summary,serial:ev.serial,cause:row.stage===0?stReason(s,id):row.firstOutcome});
 sb.history.push({serial:ev.serial,year:sb.year,actor:def.actor,template:'world-pressure:'+id,where:def.where,origin:'conditional-crisis',side,response:summary,parent:row.parent});
 if(row.parent)st.causal.push({from:row.parent,to:ev.serial,id});
 if(row.stage===0){row.stage=1;row.parent=ev.serial;row.firstOutcome=summary;row.due=sb.year+1;row.inFlight=false;}
 else {row.stage=2;row.inFlight=false;row.outcome=summary;}
 scheduleReport(s,{id:'world-crisis-'+ev.serial,from:scene.who,text:id==='parish'?(side==='left'?'The sheriff has received the names of tenants needing safe passage.':'The parish records the disputed rent and requests a hearing.'):'The officers report that the Crown’s latest order has been received; compliance remains to be verified.',delay:2,certainty:'reported'});
 sb.reactiveCount++;sb.yearTurn++;if(sb.yearTurn>=sb.perYear)sbAdvanceYear(s);
}

const _wpOldAdvanceYear=sbAdvanceYear;
sbAdvanceYear=function(s){_wpOldAdvanceYear(s);wpDocumentDeath(s);};
