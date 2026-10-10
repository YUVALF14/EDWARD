/* EDWARD v0.9: contingent Chronicle Engine with autonomous actors and historical pressure. */
const EDWARD_STORAGE='edward_living_demo_save';
const WORLD_PEOPLE={
 edward:{name:'Edward IV',title:'King of England',group:'Crown',kin:[]},
 warwick:{name:'Richard Neville',title:'Earl of Warwick',group:'Neville',kin:['george','montagu']},
 george:{name:'George Neville',title:'Chancellor',group:'Neville',kin:['warwick','montagu']},
 montagu:{name:'John Neville',title:'Lord Montagu',group:'Neville',kin:['warwick','george']},
 hastings:{name:'William Hastings',title:'Royal household',group:'Household',kin:[]},
 elizabeth:{name:'Elizabeth Woodville',title:'Widow of Sir John Grey',group:'Woodville',kin:['jacquetta']},
 jacquetta:{name:'Jacquetta of Luxembourg',title:'Duchess of Bedford',group:'Woodville',kin:['elizabeth']},
 somerset:{name:'Henry Beaufort',title:'Duke of Somerset',group:'Lancaster',kin:[]},
 henry:{name:'Henry VI',title:'Lancastrian claimant',group:'Lancaster',kin:[]},
 robert:{name:'Sir Robert',title:'Composite Yorkist veteran',group:'Yorkist',kin:[]},
 thomas:{name:'Thomas of Yorkshire',title:'Composite northern landholder',group:'North',kin:[]},
 percy:{name:'Percy affinity',title:'Northern landed network',group:'North',kin:[]}
};
const CHARACTER_NAMES={warwick:['Richard Neville','Warwick'],george:['George Neville'],montagu:['John Neville','Montagu'],hastings:['William Hastings','Hastings'],elizabeth:['Elizabeth Woodville'],jacquetta:['Jacquetta'],somerset:['Henry Beaufort','Somerset']};
function newWorld(seed){return {version:10,seed:seed===undefined?Math.floor(Math.random()*1000000):seed,chapterIndex:0,chapterCount:0,turn:0,visited:[],facts:{woodville_preexisting:true},offices:{chancellor:'george',captain_calais:'warwick',chamberlain:'unassigned',northern_commission:'unassigned'},links:{warwick:0,george:0,montagu:0,hastings:0,woodville:0},obligations:[],precedents:[],chronicle:[],characterMemory:{},knowledge:{edward:[],warwick:[],george:[],montagu:[],hastings:[],elizabeth:[],jacquetta:[],somerset:[]},reports:[],pending:[],rumours:[],autonomousActs:[],agentActions:[],agentKnowledge:[],currentId:null,finished:false};}
function fmt(x,s){return typeof x==='function'?x(s):x;}
function findSituation(id){return SITUATIONS.find(x=>x.id===id)||null;}
function saveWorld(s){if(typeof EDWARD_SIMULATION!=='undefined'&&EDWARD_SIMULATION)return;try{localStorage.setItem(EDWARD_STORAGE,JSON.stringify(s))}catch(e){}}
function loadWorld(){try{let s=JSON.parse(localStorage.getItem(EDWARD_STORAGE));if(s&&s.version===10&&Array.isArray(s.visited)&&s.facts&&s.chronicle){s.pending||=[];s.rumours||=[];s.autonomousActs||=[];s.agentActions||=[];s.agentKnowledge||=[];return s;}}catch(e){}return null;}
function clearWorld(){try{localStorage.removeItem(EDWARD_STORAGE)}catch(e){}}
function addEffect(s,e){if(!e)return;
 for(const [k,v] of Object.entries(e.facts||{}))s.facts[k]=v;
 for(const [k,v] of Object.entries(e.offices||{}))s.offices[k]=v;
 for(const [k,v] of Object.entries(e.links||{}))s.links[k]=(s.links[k]||0)+v;
 for(const row of e.obligations||[])s.obligations.push({from:row[0],to:row[1],reason:row[2],visibility:row[3]||'public',turn:s.turn});
 for(const item of e.precedents||[])s.precedents.push({text:item,turn:s.turn});
 for(const item of e.delayed||[])s.pending.push({due:s.turn+(item.delay||2),to:item.to||'edward',from:item.from||'messenger',text:item.text,certainty:item.certainty||'reported',id:item.id||'delayed-'+s.turn});
}
function hashScore(seed,id,turn){let h=(seed|0)^Math.imul(turn+1,2654435761);for(let i=0;i<id.length;i++){h^=id.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0;}
function addKnowledge(s,who,item){s.knowledge[who]||=[];if(!s.knowledge[who].some(k=>k.id===item.id&&k.kind===item.kind))s.knowledge[who].push(item);}
function scheduleReport(s,{id,from,to='edward',text,delay=2,certainty='reported'}){
 if(s.pending.some(p=>p.id===id&&p.to===to)||s.rumours.some(p=>p.id===id&&p.to===to))return;
 s.pending.push({id,from,to,text,due:s.turn+delay,certainty});
}
function deliverReports(s){const ready=s.pending.filter(x=>x.due<=s.turn);s.pending=s.pending.filter(x=>x.due>s.turn);
 for(const packet of ready){const r={...packet,turn:s.turn};s.rumours.push(r);addKnowledge(s,packet.to,{id:packet.id,kind:'report',turn:s.turn,heard:packet.text,source:packet.from,certainty:packet.certainty});if(packet.to==='edward')s.reports.push(r);}
}
function publicOrPrivateWitnesses(s,card,arena){const people=['edward'];const names=card.who+' '+(arena&&card[arena]?card[arena].who:'');
 for(const [id,labels] of Object.entries(CHARACTER_NAMES))if(labels.some(label=>names.includes(label)))people.push(id);
 if(arena==='up'){people.push('george');if(s.offices.chamberlain==='hastings')people.push('hastings');}
 return [...new Set(people)];}
function propagateKnowledge(s,card,arena,logText,witnesses){const privateMatter=arena==='down'||(card.id==='marriage_choice'&&s.facts.marriage==='elizabeth');
 const item={id:card.id,kind:'decision',turn:s.turn,heard:logText,source:'witnessed',certainty:'witnessed',arena:arena||'direct'};
 for(const person of witnesses){addKnowledge(s,person,item);if(person!=='edward'){s.characterMemory[person]||=[];s.characterMemory[person].push({id:card.id,decision:logText,turn:s.turn});}}
 if(privateMatter){ // Only people present know immediately. Leakage is a possibility, not a universal reveal.
  const speaker=witnesses.find(p=>p!=='edward');if(speaker&&WORLD_PEOPLE[speaker]){
   const kin=WORLD_PEOPLE[speaker].kin||[];
   if(kin.length&&hashScore(s.seed,card.id,s.turn)%3===0)scheduleReport(s,{id:'private-echo-'+card.id,from:speaker,to:kin[0],text:'A private understanding with the king is being discussed, without a reliable account of its terms.',delay:3,certainty:'rumour'});
  }
 }else{
  const toGroups=new Set();for(const person of witnesses)for(const kin of WORLD_PEOPLE[person]?.kin||[])if(!witnesses.includes(kin))toGroups.add(kin);
  for(const person of toGroups)scheduleReport(s,{id:'kin-'+card.id+'-'+person,from:'household correspondence',to:person,text:logText,delay:2,certainty:'reported'});
 }
}
function autonomousWorld(s){ // Local agents act without Edward. These are structural consequences, not invented historical facts.
 if(s.turn>=8&&!s.autonomousActs.includes('northern-agent')){
  s.autonomousActs.push('northern-agent');const commission=s.offices.northern_commission;
  if(commission==='warwick'||commission==='warwick_bounded'){
   s.facts.northern_agent_action='settled';s.facts.warwick_clients='growing';
   scheduleReport(s,{id:'north-agent',from:'Warwick’s northern officers',text:'Several northern households have submitted under Warwick’s commission. Their terms are being circulated locally.',delay:2});
  }else{
   s.facts.northern_agent_action='waiting';
   scheduleReport(s,{id:'north-agent',from:'A northern sheriff',text:'Two households have postponed their submission while the terms of royal authority are clarified.',delay:2});
  }
 }
 if(s.turn>=22&&!s.autonomousActs.includes('household-agent')){
  s.autonomousActs.push('household-agent');
  if(s.facts.household_recruitment==='direct'||s.facts.council_review==='household'){
   s.facts.hastings_household='expanding';
   scheduleReport(s,{id:'household-agent',from:'A royal usher',text:'Petitioners have begun approaching Hastings’s household rather than waiting for Neville intermediaries.',delay:2});
  }else{
   s.facts.neville_counsel='entrenched';
   scheduleReport(s,{id:'household-agent',from:'A chancery clerk',text:'Many petitions continue to reach Edward through the Chancellor and Neville connections.',delay:2});
  }
 }
 if(s.turn>=39&&!s.autonomousActs.includes('woodville-agent')){
  s.autonomousActs.push('woodville-agent');
  if(s.facts.marriage==='elizabeth'){
   s.facts.woodville_royal_access='expanded';
   scheduleReport(s,{id:'woodville-agent',from:'A court usher',text:'More suitors have begun seeking introductions through the queen’s family.',delay:1});
  }else{
   s.facts.woodville_royal_access='independent';
   scheduleReport(s,{id:'woodville-agent',from:'A court usher',text:'The Woodvilles continue to appear in petitions, though they hold no new royal family position.',delay:1});
  }
 }
}
/* Autonomous actors make one-time decisions when their opportunity becomes available.
   Their decisions can be unknown to Edward until a courier arrives. The event engine can
   then surface authored consequences only when the resulting state exists. */
function actorAct(s,id,actor,outcome,report,delay=2,certainty='reported'){
 if(s.autonomousActs.includes(id))return;
 s.autonomousActs.push(id);
 s.agentActions.push({id,actor,outcome,turn:s.turn});
 if(report)scheduleReport(s,{id:'agent-'+id,from:actor,text:report,delay,certainty});
}
function politicalAgents(s){const f=s.facts,seen=id=>s.visited.includes(id);
 if(seen('north_command')&&!s.autonomousActs.includes('north-political')){
  const independent=s.offices.northern_commission==='warwick'||s.offices.northern_commission==='warwick_bounded';
  f.agent_north=independent?'warwick_settlement':'petition_delayed';
  actorAct(s,'north-political',independent?'warwick':'northern landholders',f.agent_north,independent?
   'Warwick’s officers have negotiated terms with northern landholders. Some now claim the earl as their patron.':
   'Several northern families have withheld their oaths pending a binding royal commission.',2);
  addKnowledge(s,'warwick',{id:'north-private-knowledge',kind:'agent',turn:s.turn,heard:'Warwick’s local agents have made their own calculations about land and service.',source:'northern officers',certainty:'witnessed'});
 }
 if(seen('chancellor')&&!s.autonomousActs.includes('chancery-political')){
  const kin=s.facts.seal_policy!=='king'||s.links.george>=1||s.links.warwick>=2;
  f.agent_chancery=kin?'kin_preference':'royal_review';
  actorAct(s,'chancery-political','George Neville',f.agent_chancery,kin?
   'A Neville-related petition has received attention through chancery. Its precise terms remain to be examined.':
   'The Chancellor is sending disputed warrants back for royal examination.',2);
 }
 if(seen('hastings')&&!s.autonomousActs.includes('hastings-political')){
  f.agent_hastings=s.offices.chamberlain==='hastings'?'petition_circle':'limited_household';
  actorAct(s,'hastings-political','William Hastings',f.agent_hastings,f.agent_hastings==='petition_circle'?
   'Household servants report a growing queue of petitioners seeking Hastings’s help.':
   'Hastings continues to serve Edward, but cannot formally receive the petitions directed to the chamberlain.',3);
 }
 if(seen('city_credit')&&!s.autonomousActs.includes('credit-political')){
  const kept=['warrant','repaid','audited'].includes(f.london_credit)||f.credit_priority==='repay';
  f.agent_credit=kept?'trust_earned':'payment_disputed';
  actorAct(s,'credit-political','London creditors',f.agent_credit,kept?
   'City merchants say that royal officers have honoured their promises.':
   'London creditors disagree over whether an outstanding royal payment has been honoured.',2);
 }
 if(seen('percy_return')&&!s.autonomousActs.includes('percy-political')){
  f.agent_percy=f.percy_policy==='reconcile'?'retinue_growing':'displaced_followers';
  actorAct(s,'percy-political','Percy retainers',f.agent_percy,f.agent_percy==='retinue_growing'?
   'Men associated with the Percy household are gathering again around its restored connections.':
   'Displaced Percy tenants and retainers are disputing the demands of new landholders.',2);
 }
 if(seen('scots_border')&&!s.autonomousActs.includes('border-political')){
  f.agent_border='conflicting_reports';
  actorAct(s,'border-political','Border correspondents','conflicting_reports',
   'Two border messengers offer contradictory accounts of the same garrison.',1,'uncertain');
 }
 if(seen('castle_garrison')&&!s.autonomousActs.includes('garrison-political')){
  f.agent_garrison=f.garrison_pay==='paid'?'funded':'unpaid';
  actorAct(s,'garrison-political','Northern garrison',f.agent_garrison,f.agent_garrison==='unpaid'?
   'A northern captain warns that his men may not remain without wages.':
   'The garrison has acknowledged payment.',2);
 }
 if(seen('somerset_pardon')&&!s.autonomousActs.includes('somerset-political')){
  f.agent_somerset=f.somerset==='excluded'?'excluded_contacts':(f.somerset==='conditional'?'watched':'old_contacts');
  // Knowledge stays with the agent. Edward hears a rumour, not a proven secret.
  addKnowledge(s,'somerset',{id:'somerset-network',kind:'agent',turn:s.turn,heard:'Former Lancastrian companions are still in contact.',source:'personal',certainty:'witnessed'});
  actorAct(s,'somerset-political','Northern informant',f.agent_somerset,
   f.agent_somerset==='old_contacts'?'A correspondent reports that Somerset may still receive letters from old companions. No letter has been produced.':
   'Somerset’s former associates remain outside the court’s direct knowledge.',3,'rumour');
 }
 if(seen('french_match')&&!s.autonomousActs.includes('warwick-diplomacy')){
  f.agent_warwick=f.warwick_diplomacy==='french'?'diplomatic_promise':'open_channel';
  actorAct(s,'warwick-diplomacy','Warwick’s envoys',f.agent_warwick,f.agent_warwick==='diplomatic_promise'?
   'Warwick’s envoys have spoken abroad about a possible royal marriage.':
   'Foreign courts await clearer instructions on Edward’s marriage.',2);
 }
 if(seen('marriage_choice')&&!s.autonomousActs.includes('woodville-political')){
  f.agent_woodville=f.marriage==='elizabeth'?'kin_matches':'independent_network';
  actorAct(s,'woodville-political','Woodville household',f.agent_woodville,f.agent_woodville==='kin_matches'?
   'Petitioners are seeking introductions through the new queen’s family.':
   'The Woodville family continues to advance its interests without a new royal marriage.',1);
 }
}
function deriveChapterFacts(s){
 if(CHAPTERS[s.chapterIndex]?.id!=='year64')return;
 // Historical events are pressures, not compulsory scripts. Loyalty depends on multiple
 // observable commitments; the small seeded uncertainty is the uncertainty of other people.
 const f=s.facts;
 const welcomed=f.somerset==='pardoned'||f.somerset==='conditional';
 let support=0;
 if(f.somerset==='pardoned')support+=2;
 if(f.somerset==='conditional')support+=1;
 if(f.somerset_court==='public')support++;
 if(f.somerset_estates==='review')support++;
 if(['public','court','private'].includes(f.somerset_surety))support++;
 if(['private_trust','quiet'].includes(f.somerset_inquiry))support++;
 if(f.somerset_outreach==='terms')support++;
 if(f.somerset_clients==='hearing')support++;
 if(f.somerset_inquiry==='open')support--;
 if(f.somerset_clients==='separated')support--;
 if(f.somerset_estates==='grantees')support--;
 if(f.agent_somerset==='old_contacts')support--;
 const uncertainty=(hashScore(s.seed,'somerset-decision',s.turn)%3)-1;
 f.somerset_1464=welcomed&&support+uncertainty>=3?'stays':'rebels';
 // The rising itself can sometimes be averted; this requires converging independent
 // settlements, not one mercy card. These conditions are fictional counterfactual modelling.
 let pacification=0;
 if(f.somerset_1464==='stays')pacification+=2;
 else pacification-=2;
 if(f.percy_policy==='reconcile')pacification++;
 if(f.north_safeconduct==='sent'||f.north_1462==='safeconduct')pacification++;
 if(f.local_truce==='confirmed')pacification++;
 if(['talks','written'].includes(f.border_truce))pacification++;
 if(f.percy_grants==='compromise'||f.percy_grants==='compensation')pacification++;
 if(f.northern_policy==='ratified'||f.warwick_1462==='ratify')pacification++;
 if(f.northern_1464==='force')pacification--;
 if(f.agent_percy==='displaced_followers')pacification--;
 f.north_rising_1464=pacification>=4?'averted':'active';
}
function situationPriority(s,x){let p=x.priority;
 if(x.id==='warwick_reply'&&s.facts.warwick_grant==='rejected')p+=8;
 if(x.id==='percy_petition'&&s.facts.percy_policy==='reconcile')p+=7;
 if(x.id==='dispossessed_yorkist'&&s.facts.somerset==='pardoned')p+=6;
 if(x.id==='northern_discretion'&&s.facts.northern_agent_action==='waiting')p+=5;
 if(x.id==='somerset_oath_echo'&&s.facts.somerset_1464==='stays')p+=6;
 if(['towton','coronation','parliament','somerset_pardon','marriage_choice','percy_return','first_messenger','henry_scotland','wardship','border_truce','percy_petition','sanctuary','hastings_clients','retinue_wages','retinue_pay_dispute'].includes(x.id))p+=45;
 if(x.id==='somerset_defection'&&s.facts.north_rising_1464==='averted')p-=100;
 return p;
}
function chronologyAllowed(s,x){
 // The documented chronology matters even when the political outcome changes:
 // Hedgeley Moor (25 April) precedes the marriage decision (1 May), and
 // Hexham (15 May) follows it. Autumn court business comes later.
 if(x.id==='hexham'&&!s.visited.includes('marriage_choice'))return false;
 const late1464=['woodville_network','queen_suitors','queen_kin_arrangements','foreign_betrothal','foreign_envoy_reaction','woodville_family_petitions','unmarried_crown','court_petition_routes'];
 if(late1464.includes(x.id)&&s.facts.north_rising_1464==='active'&&!s.visited.includes('hexham'))return false;
 return true;
}
function getNextSituation(s){if(s.finished)return null;
 if(s.currentId){if(s.currentId.startsWith('sb-')&&s.sandbox?.current)return sbBuildCard(s,s.sandbox.current);const existing=findSituation(s.currentId);if(existing&&!s.visited.includes(existing.id))return existing;s.currentId=null;}
 while(s.chapterIndex<CHAPTERS.length){const ch=CHAPTERS[s.chapterIndex];
  if(s.chapterCount>=ch.limit){s.chapterIndex++;s.chapterCount=0;deriveChapterFacts(s);continue;}
  const candidates=SITUATIONS.filter(x=>x.ch===ch.id&&!s.visited.includes(x.id)&&(!x.after||x.after.every(id=>s.visited.includes(id)))&&(!x.requires||x.requires(s))&&chronologyAllowed(s,x)&&!(s.facts.north_rising_1464==='averted'&&['somerset_defection','hedgeley','hexham'].includes(x.id)));
  if(candidates.length){candidates.sort((a,b)=>situationPriority(s,b)-situationPriority(s,a)||(hashScore(s.seed,a.id,s.turn)-hashScore(s.seed,b.id,s.turn)));
   s.currentId=candidates[0].id;saveWorld(s);return candidates[0];}
  s.chapterIndex++;s.chapterCount=0;deriveChapterFacts(s);
 }
 if(!s.sandbox)sbInit(s);if(s.sandbox.ended){s.finished=true;saveWorld(s);return null;}const generated=sbEvent(s);if(generated){s.currentId=generated.id;saveWorld(s);return generated;}s.finished=true;saveWorld(s);return null;
}
function resolveChoice(s,card,option,arena){const selected=arena?card[arena]?.[option]:card[option];if(!selected)throw new Error('Missing choice '+option+' for '+card.id);
 const decisionYear=card.dynamic?String(s.sandbox.year):CHAPTERS[s.chapterIndex].date;
 s.turn++;const effect=fmt(selected.effects,s);addEffect(s,effect);
 const logText=(effect&&effect.records&&effect.records[0])||selected.label;
 s.visited.push(card.id);s.chronicle.push({turn:s.turn,chapter:decisionYear,id:card.id,place:card.where,decision:selected.label,summary:logText,arena:arena||'direct'});
 const witnesses=publicOrPrivateWitnesses(s,card,arena);propagateKnowledge(s,card,arena,logText,witnesses);
 autonomousWorld(s);politicalAgents(s);deliverReports(s);
 if(!card.dynamic)s.chapterCount++;s.currentId=null;if(card.dynamic&&s.sandbox)s.sandbox.current=null;saveWorld(s);return getNextSituation(s);
}
function politicalNetworks(s){const nv=s.links.warwick+s.links.george+s.links.montagu+(s.offices.northern_commission.includes('warwick')?3:0)+(s.facts.neville_counsel==='entrenched'?2:0)+(s.facts.warwick_clients==='growing'?2:0);
 const hh=s.links.hastings+(s.offices.chamberlain==='hastings'?2:0)+(s.facts.hastings_household==='expanding'?3:0)+(s.facts.council_review==='household'?2:0);
 const wv=s.links.woodville+(s.facts.marriage==='elizabeth'?4:0)+(s.facts.woodville_royal_access==='expanded'?2:0)+(s.facts.woodville_access==='family'?2:0);
 return {Neville:{score:nv,description:nv>=7?'Widely relied upon for offices and northern settlements':nv>=3?'Active through kinship, offices and service':'Present through kinship and existing offices'},Household:{score:hh,description:hh>=6?'An expanding direct channel to the king':hh>=3?'Growing access through royal service':'A smaller circle around the king'},Woodville:{score:wv,description:s.facts.marriage==='elizabeth'?'Royal access amplifies an existing family network':'Established connections without the queen’s royal access'}};
}
function chapterOutcome(s){const p=politicalNetworks(s);const nv=p.Neville.score,hh=p.Household.score,wv=p.Woodville.score;
 if(s.facts.marriage==='elizabeth'&&wv>=nv-1&&hh>=2)return {title:'A Court of Rival Households',text:'The Woodvilles now have royal access, but Neville connections and the king’s servants still carry petitions. The Crown has more than one political centre.'};
 if(nv>hh+2&&nv>wv+1)return {title:'The Neville Settlement',text:'Edward’s early reign runs through Warwick and the Neville network. Their effectiveness is real, and so is the Crown’s dependence upon it.'};
 return {title:'The King’s Own Household',text:'Edward’s immediate servants and royal procedure have become important routes to power. The king controls more appointments personally, though distant authority remains negotiated.'};
}
