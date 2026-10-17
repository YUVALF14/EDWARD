/* Connected state belongs to the active campaign, never the archived simulator. */
const REALM_KEYS=['coin','debt','credit','readiness','intelligence'];
const REGIONS={
 north:{label:'The North',description:'York, northern castles and the roads toward Scotland. Neville and Percy followings overlap royal authority.',xy:[263,270]},
 midlands:{label:'The Midlands',description:'Road junctions, household affinities and the routes joining northern armies to London.',xy:[263,322]},
 wales:{label:'Wales & the Marches',description:'Harlech and the western approaches. Local knowledge, garrisons and supply bind the frontier to the Crown.',xy:[216,329]},
 london:{label:'London & Westminster',description:'The city’s credit, the Tower, the royal household and Westminster sanctuary are close together, but are distinct centres of authority.',xy:[284,359]},
 channel:{label:'The Channel & Calais',description:'Calais is an English-held port on the continental coast. Sea passage depends on ships, weather, crews and political permission.',xy:[329,394]},
 france:{label:'France · Louis XI',description:'A separate royal court across the Channel. French and Burgundian interests compete; courtesy is not a binding alliance.',xy:[348,429]},
 burgundy:{label:'Burgundian lands',description:'The dukes govern the duchy and scattered territories, including lands in the Low Countries. Bruges is within this wider political world; Burgundy is not a single compact modern country.',xy:[367,370]}
};
function depthFresh(){return {routeVersion:3,itinerary:[null,null,null,null],coreItinerary:[null,null,null,null],loopLengths:[null,null,null,null],realm:{coin:36,debt:0,credit:55,readiness:50,intelligence:40},regions:{north:45,midlands:50,wales:40,london:50,channel:40},council:[],ledger:[],journey:null};}
// Each new historical period closes after 9 anchor audiences plus 3–5 complete
// living stories. The next route responds to the court left by the last one.
const REIGN_ANCHORS=[['road','parliament'],['marriagefleet','brothers'],['gloucester1469','isabel'],['clarencereturn','familyreturn']];
const REIGN_COLOUR=[['kitchen','hunt','chamber','familytable','frenchpromise'],['scales','nursery','householdvoices','nevillewoodville','scaleschannel'],['rumour','guardroom','fear','brotherstogether','frenchchannel'],['departure','sanctuaryhouse','barnetafter','margaretshand','louisandmargaret']];
const REIGN_CORE_ANCHORS=[
 ['After Towton','The prisoners','An oath before the altar','A commission in the North','Henry beyond reach','The law beneath the crown','A marriage in private','A widow’s petition'],
 ['The queen in public','Henry brought to the Tower','A daughter in the nursery','Rivers enters higher company','A public encounter','A sister leaves England','Harlech yields','The price of splendour'],
 ['Complaints from Yorkshire','A complaint under seal','Marriage at Calais','A campaign on credit','News from Edgcote','Letters under watch','A loose watch','A letter from the queen','The crown under guard'],
 ['A borrowed chamber','Your sister’s influence','Behind sanctuary walls','A son in sanctuary','Henry’s government','The ships are ready','England underfoot','A brother returns','The crown regained']
];
function campaignScenes(a=S.cycle,v=S){
 const ids=v.itinerary?.[a],core=v.coreItinerary?.[a];
 if(Array.isArray(core))return SCENES[a].filter(c=>c.thread?ids?.includes(c.thread):core.includes(c.title));
 return ids?SCENES[a].filter(c=>!c.thread||ids.includes(c.thread)):SCENES[a];
}
function actLength(a=S.cycle,v=S){return campaignScenes(a,v).length;}
function decisionsBefore(a,v=S){return SCENES.slice(0,a).reduce((n,_,i)=>n+actLength(i,v),0);}
function loopPressure(v){
 const mean=(keys,source)=>keys.reduce((n,k)=>n+(Number(source?.[k])||0),0)/keys.length;
 const stability=mean(['authority','order','succession'],v);
 const f=v.factions||{},crown=Number(f.crown)||50,opposition=Math.max(...['neville','queen','brothers','lancastrian'].map(k=>Number(f[k])||0));
 const relations=['warwick','woodville','hastings','gloucester','clarence'].map(k=>Number(v[k])||0);
 const pairs=[[0,1],[2,3],[3,4]];const strain=pairs.reduce((n,[a,b])=>n+Math.abs(relations[a]-relations[b]),0)/pairs.length/1.2;
 const obligation=Math.min(100,Math.max(0,(Number(v.open)||0)*7+(Number(v.broken)||0)*18));
 return Math.max(0,Math.min(100,.4*(100-stability)+.25*Math.max(0,opposition-crown)+.25*strain+.1*obligation));
}
function loopThreadCount(v){const pressure=loopPressure(v);return 3+(pressure>=20?1:0)+(pressure>=48?1:0);}
function reserveWeight(t,v){
 let w=1;
 if(v.regions[t.region]<45)w+=2;
 if(['merchant','captain','messenger'].includes(t.person)){
  const stat={merchant:'credit',captain:'readiness',messenger:'intelligence'}[t.person];
  if(v.realm[stat]<50)w+=2;
 }
 if(t.person==='hastings'&&v.hastings>=10)w+=2;
 if(t.id==='margaret'&&v.flags['thread:marriagefleet']===0)w+=3;
 if(t.id==='aftercustody'&&v.gloucester>=10)w+=3;
 const recent=(v.log||[]).slice(-25);
 const f=v.factions||{},flags=v.flags||{};
 if(t.id==='frenchpromise'&&(v.warwick>=12||f.neville>=60))w+=3;
 if(t.id==='familytable'&&f.brothers>=24)w+=3;
 if(t.id==='nevillewoodville'&&(Math.abs((v.warwick||0)-(v.woodville||0))>=14||f.queen>=40))w+=3;
 if(t.id==='scaleschannel'&&recent.some(l=>['burgundy','queen'].includes(l.key)))w+=2;
 if(t.id==='brotherstogether'&&(f.brothers>=35||(v.clarence||0)<-10))w+=3;
 if(t.id==='frenchchannel'&&recent.some(l=>['warwick','burgundy','defer'].includes(l.key)))w+=3;
 if(t.id==='margaretshand'&&flags['thread:departure']!==undefined)w+=3;
 if(t.id==='louisandmargaret'&&(recent.some(l=>['burgundy','settle'].includes(l.key))||f.lancastrian>=50))w+=3;
 if(t.person==='hastings'&&recent.some(l=>['hastings','commission'].includes(l.key)))w+=2;
 if(t.person==='elizabeth'&&recent.some(l=>['queen','joint'].includes(l.key)))w+=2;
 if(['brothers','aftercustody'].includes(t.id)&&recent.some(l=>['gloucester','clarence','settle'].includes(l.key)))w+=2;
 if(['french','margaret'].includes(t.id)&&recent.some(l=>['burgundy','defer'].includes(l.key)))w+=2;
 if(['rumour','captivevoice','news'].includes(t.id)&&recent.some(l=>['investigate','council'].includes(l.key)))w+=2;
 return w;
}
function selectReserve(a,v,random=Math.random,target=6){
 const chosen=[...REIGN_ANCHORS[a]],pool=THREADS.filter(t=>t.act===a);
 function draw(candidates){
  const total=candidates.reduce((n,t)=>n+reserveWeight(t,v),0);
  let roll=random()*total,selected=candidates.at(-1);
  for(const t of candidates){roll-=reserveWeight(t,v);if(roll<0){selected=t;break;}}
  chosen.push(selected.id);
 }
 // A human interlude always sits beside history; extra stories are earned by pressure.
 draw(pool.filter(t=>REIGN_COLOUR[a].includes(t.id)));
 if(chosen.length<target)draw(pool.filter(t=>!chosen.includes(t.id)&&!REIGN_COLOUR[a].includes(t.id)));
 while(chosen.length<target)draw(pool.filter(t=>!chosen.includes(t.id)));
 return chosen;
}
function selectCoreReserve(a,v,random=Math.random){
 const pool=SCENES[a].filter(c=>!c.thread),chosen=[...REIGN_CORE_ANCHORS[a]];
 if(chosen.length<7||chosen.length>9||chosen.some(title=>!pool.some(c=>c.title===title)))throw Error('Invalid historical route anchors for act '+a);
 const weight=c=>{
  let w=1;
  if(c.region&&v.regions?.[c.region]<45)w+=2;
  if(c.person==='merchant'&&v.realm?.credit<50)w+=2;
  if(c.person==='captain'&&v.realm?.readiness<50)w+=2;
  if(c.person==='messenger'&&v.realm?.intelligence<50)w+=2;
  if(c.person==='hastings'&&v.hastings>=8)w+=2;
  if(c.person==='elizabeth'&&v.woodville>=5)w+=2;
  return w;
 };
 while(chosen.length<9){
  const candidates=pool.filter(c=>!chosen.includes(c.title)),total=candidates.reduce((n,c)=>n+weight(c),0);
  let roll=random()*total,selected=candidates.at(-1);
  for(const c of candidates){roll-=weight(c);if(roll<0){selected=c;break;}}
  chosen.push(selected.title);
 }
 return chosen;
}
function prepareAct(a=S.cycle,v=S,random=Math.random){
 if(!v.itinerary)return;
 if(v.routeVersion===1){if(!v.itinerary[a])v.itinerary[a]=selectReserve(a,v,random,6);return;}
 if(!v.itinerary[a]){
  const count=v.routeVersion===3?loopThreadCount(v):4;
  v.itinerary[a]=selectReserve(a,v,random,count);
  if(v.routeVersion===3){v.loopLengths??=[null,null,null,null];v.loopLengths[a]=9+4*count;}
 }
 if(v.coreItinerary&&!v.coreItinerary[a])v.coreItinerary[a]=selectCoreReserve(a,v,random);
}
function validItinerary(v){
 // Existing v4 saves retain their complete original route and receipt indices.
 if(v.itinerary===undefined||v.itinerary===null)return true;
 if(!Array.isArray(v.itinerary)||v.itinerary.length!==4)return false;
 const modern=v.routeVersion===2||v.routeVersion===3,adaptive=v.routeVersion===3;
 return v.itinerary.every((ids,a)=>{
  if(a>v.cycle)return ids===null&&(!modern||v.coreItinerary?.[a]===null)&&(!adaptive||v.loopLengths?.[a]===null);
  const count=adaptive?ids?.length:modern?4:6;
  const validThreads=Array.isArray(ids)&&ids.length===count&&(!adaptive||count>=3&&count<=5)&&new Set(ids).size===count&&
   ids.every(id=>THREADS.some(t=>t.act===a&&t.id===id))&&REIGN_ANCHORS[a].every(id=>ids.includes(id))&&REIGN_COLOUR[a].some(id=>ids.includes(id));
  if(!validThreads)return false;
  if(!modern)return true;
  const core=v.coreItinerary?.[a],pool=SCENES[a].filter(c=>!c.thread).map(c=>c.title);
  return Array.isArray(core)&&core.length===9&&new Set(core).size===9&&core.every(id=>pool.includes(id))&&REIGN_CORE_ANCHORS[a].every(id=>core.includes(id))&&(!adaptive||Array.isArray(v.loopLengths)&&v.loopLengths[a]===9+4*count);
 });
}
function depthScene(c){
 const result={...c};
 if(c.branches){const route=S.flags['thread:'+c.thread];if(Number.isInteger(route))result.context+=' '+c.branches[route];}
 const memory=CROSS_COURT_MEMORY[c.title];if(memory&&Number.isInteger(S.flags[memory.flag]))result.context+=' '+memory.lines[S.flags[memory.flag]];
 // Remote speakers remain correspondence; the portrait never asserts presence.
 if(S.cycle===2&&c.thread==='aftercustody'){result.courtPlace='Middleham';result.place='Middleham · Richard’s correspondence';}
 return result;
}
function choiceAllowed(o){
 if(o.requires&&(o.requires.stat==='faith'?S.meaning.faith:S[o.requires.stat])<o.requires.min)return false;
 if(o.requiresRealm&&S.realm[o.requiresRealm.stat]<o.requiresRealm.min)return false;
 if(o.requiresFlag&&S.flags[o.requiresFlag.key]!==o.requiresFlag.value)return false;
 return true;
}
const ECONOMY={pay:{coin:-2,credit:1},land:{coin:1,credit:-1},promise:{credit:-1},defer:{credit:-1},burgundy:{credit:1},mobilize:{coin:-1,readiness:1},pursue:{readiness:-1},hold:{readiness:1},investigate:{intelligence:1},secure:{readiness:1},oath:{credit:-1}};
const EFFECT_LABELS={coin:'the royal purse',debt:'the Crown’s debt',credit:'confidence in the Crown',readiness:'the army’s preparation',intelligence:'what the Crown knows',north:'support in the North',midlands:'support in the Midlands',wales:'support in Wales',london:'support in London',channel:'the crossing’s prospects'};
function choiceEffect(o){return o.effect||ECONOMY[o.k]||{};}
function effectText(e){return Object.entries(e).map(([k,v])=>{
 const words={coin:v>0?'Adds to the royal purse':'Spends from the royal purse',debt:v>0?'Adds to the Crown’s debt':'Pays down the Crown’s debt',credit:v>0?'Builds confidence in the Crown':'Strains confidence in the Crown',readiness:v>0?'Prepares the army':'Leaves the army less prepared',intelligence:v>0?'Improves the Crown’s reports':'Leaves the king less informed',channel:v>0?'Improves the crossing’s prospects':'Weakens prospects for the crossing'};
 if(words[k])return words[k];
 const place=(EFFECT_LABELS[k]||k).replace(/^support in /,'');return (v>0?'Wins support in ':'Weakens support in ')+place;
 }).join(' · ');}
function changeRealm(e,cause){
 const changes=[];
 for(const [k,v] of Object.entries(e)){
  const target=REALM_KEYS.includes(k)?S.realm:S.regions;if(!(k in target)||!Number.isFinite(v))continue;
  const before=target[k];target[k]=clamp(before+v);changes.push(EFFECT_LABELS[k]+' '+(v>0?'+':'')+Math.round(target[k]-before));
 }
 // The automatic bridge is debt, explicitly recorded. Empty reserves never
 // silently grant free supplies, and a poor credit record raises its cost.
 if(e.coin<0&&S.realm.coin===0){const shortage=Math.max(0,-e.coin-(S._reserveBefore||0));if(shortage){S.realm.debt=clamp(S.realm.debt+shortage);S.realm.credit=clamp(S.realm.credit-1);changes.push('unfunded cost: debt +'+shortage);}}
 if(changes.length){S.ledger.push({cause,date:S.date,changes:changes.join(' · ')});S.ledger=S.ledger.slice(-30);}
}
function depthApply(o,c){
 S._reserveBefore=S.realm.coin;changeRealm(choiceEffect(o),c.title+' — '+o.t);delete S._reserveBefore;
 if(c.part===4){
  const fulfilled=S.flags['thread:'+c.thread+':2']===2;
  if(fulfilled){S._reserveBefore=S.realm.coin;changeRealm({credit:1},'An arrangement followed through: '+c.title);delete S._reserveBefore;}
 }
 // Revenues and maintenance are calendrical, not payment for clicking cards.
 const month=Math.floor(S.date/100);
 if(S.flags.revenueMonth!==month){
  S.flags.revenueMonth=month;
  // Reports age, equipment wears, and the household must be maintained.
  S.realm.intelligence=clamp(S.realm.intelligence+(40-S.realm.intelligence)*.08);
  S.realm.readiness=clamp(S.realm.readiness-1);
  S.realm.credit=clamp(S.realm.credit+(50-S.realm.credit)*.025);
  S._reserveBefore=S.realm.coin;changeRealm({coin:-2},'Household maintenance this month');delete S._reserveBefore;
  if(!(S.date>=14701001&&S.date<14710411)){
   const income=S.realm.credit>=45?3:2;S._reserveBefore=S.realm.coin;changeRealm({coin:income},'Receipts available this month');delete S._reserveBefore;
   if(S.realm.debt>0){const amount=Math.min(1,S.realm.debt,S.realm.coin);S.realm.coin-=amount;S.realm.debt-=amount;S.ledger.push({cause:'Debt service from receipts',date:S.date,changes:'reserve −'+amount+' · debt −'+amount});}
  }
 }
 // Preparation has concrete political uses; it is not another decorative bar.
 if(c.person==='merchant'&&S.realm.credit<30)S.order=clamp(S.order-.5);
 if(c.region&&S.regions[c.region]<25)S.order=clamp(S.order-.3);
}
function depthContext(c){
 const r=S.realm;
 if(c.person==='merchant')return r.credit<35?'Earlier unpaid obligations have made the city require stronger guarantees.':r.credit>65?'A record of payment gives you room to negotiate terms.':'';
 if(c.person==='captain')return r.readiness<35?'The army is short of practical preparation; a command alone will not supply it.':r.readiness>65?'Paid preparation gives the captain room to act.':'';
 if(c.person==='messenger'&&r.intelligence>60)return 'Your network can compare this report with independent accounts.';
 return '';
}
const GENERAL_OBJECTIVES=[
 ['Keep royal commands effective',()=>S.authority>=40&&S.order>=40,()=>Math.round(S.authority)+' authority · '+Math.round(S.order)+' order; keep both at least 40'],
 ['Maintain usable royal credit',()=>S.realm.credit>=45&&S.realm.debt<25,()=>Math.round(S.realm.credit)+' credit · '+Math.round(S.realm.debt)+' debt; seek credit 45 or more and debt below 25'],
 ['Prepare a household that can act',()=>S.realm.readiness>=50,()=>Math.round(S.realm.readiness)+' readiness; seek at least 50']
];
const ACT_OBJECTIVES=[
 [['Make service more than a promise',()=>S.log.some(l=>l.key==='pay'),()=> 'Settle at least one payment'],['Hear beyond the household',()=>S.log.some(l=>['merchant','messenger','captain'].includes(l.person)),()=> 'Hear a merchant, messenger or captain']],
 [['Give the new household a place',()=>S.woodville>=5,()=> 'Build a working relationship with Elizabeth’s household'],['Keep diplomacy informed',()=>S.realm.intelligence>=50,()=> 'Information at least 50']],
 [['Keep a route out of custody',()=>S.hastings>=15||S.gloucester>=10||S.meaning.faith>=60,()=> 'Build trusted service or religious mediation'],['Know more than the rumour',()=>S.realm.intelligence>=55,()=> 'Information at least 55']],
 [['Prepare the crossing and the army',()=>S.realm.readiness>=55,()=> 'Readiness at least 55'],['Give restoration a workable settlement',()=>S.realm.credit>=45&&S.open<8,()=> 'Credit at least 45 · fewer than 8 outstanding promises']]
];
function objectiveMarkup(list){return list.map(([title,done,detail])=>'<li class="'+(done()?'met':'pending')+'"><b>'+esc(title)+'</b><span>'+esc((done()?'Holding · ':'At risk · ')+detail())+'</span></li>').join('');}
function paintDepth(c){
 text('currentCharge',c.thread?THREADS.find(t=>t.id===c.thread).brief:ACTS[S.cycle].goal);
 text('threadLabel',c.thread?'Living story · '+c.part+' / 4':'The king’s audience');
 $('realmAccounts').innerHTML=REALM_KEYS.map(k=>'<div><span>'+esc({coin:'Available reserve',debt:'Committed debt',credit:'Royal credit',readiness:'Army readiness',intelligence:'Information'}[k])+'</span><b>'+Math.round(S.realm[k])+'</b></div>').join('');
 $('realmLedger').innerHTML=S.ledger.slice(-5).reverse().map(l=>'<li><b>'+esc(l.cause)+'</b><span>'+esc(l.changes)+'</span></li>').join('')||'<li>The first account has not yet been entered.</li>';
 $('generalObjectives').innerHTML=objectiveMarkup(GENERAL_OBJECTIVES);
 $('actObjectives').innerHTML=objectiveMarkup(ACT_OBJECTIVES[S.cycle]);
 $('reignTimeline').innerHTML=ACTS.map((a,i)=>'<li class="'+(i===S.cycle?'current':'')+'"><b>'+esc(a.years)+'</b><span>'+esc(a.title)+(i===S.cycle?' · '+(S.n+1)+' / '+actLength():'')+'</span></li>').join('');
 const last=S.log.filter(l=>l.person==='gloucester').at(-1);text('richardRecord',last?'Richard remembers: '+last.choice:'Richard’s household and responsibilities change with his age.');
 const route=S.flags['thread:road'];text('routeMemory',route===0?'Your first progress used the provisioned road.':route===1?'Your first progress passed former enemy villages.':'Your household has not yet set its first route.');
 paintRegions();
 if(S.journey)paintJourney();
}
function paintRegions(){
 $('mapRegions').innerHTML=Object.entries(REGIONS).map(([id,r])=>'<button class="region-button" data-region="'+id+'">'+esc(r.label)+(id in S.regions?'<span>'+Math.round(S.regions[id])+' cooperation</span>':'')+'</button>').join('');
 $('mapRegions').querySelectorAll('button').forEach(b=>b.onclick=()=>{
  const r=REGIONS[b.dataset.region];text('regionTitle',r.label);text('regionDescription',r.description);
  text('regionState',b.dataset.region in S.regions?'Cooperation '+Math.round(S.regions[b.dataset.region])+' / 100. '+(S.regions[b.dataset.region]<35?'Royal instructions need stronger local support.':'There is a working route for local cooperation.'):'A separate political power; no claim of direct English control.');
  const records=S.ledger.filter(l=>l.changes.includes(EFFECT_LABELS[b.dataset.region])).slice(-3);$('regionRecord').innerHTML=records.map(l=>'<li>'+esc(l.cause)+'<span>'+esc(l.changes)+'</span></li>').join('')||'<li>No recent recorded change.</li>';openDialog('regionDialog');
 });
}
const INITIATIVES=[
 {id:'audit',title:'Call for the revenue accounts',cost:{coin:-1,intelligence:4,credit:2},description:'Have the writing office compare receipts and obligations. Answers arrive in the household account.',result:'The clerks distinguish money promised from money received. You can now see which claims compete for the same revenue.'},
 {id:'muster',title:'Inspect the household muster',cost:{coin:-3,readiness:6},description:'Inspect men, equipment and posts. Pay for deficiencies that a larger paper roll would conceal.',result:'A named return replaces an impressive total. The paid deficiencies are made good before the next call.'},
 {id:'petitions',title:'Reserve an audience for direct petitions',cost:{coin:-1,credit:3,london:2},description:'Spend the king’s time hearing voices beyond the usual sponsors.',result:'A servant without a powerful sponsor is heard. Hastings now has a record of a request that would otherwise have stopped at the door.'},
 {id:'messengers',title:'Send independent messengers',cost:{coin:-2,intelligence:6},description:'Pay for two reports travelling through different connections.',result:'The reports disagree in useful ways. Your clerk separates what the bearers saw from what their hosts wished you to hear.'},
 {id:'debts',title:'Settle a part of the household debt',cost:{coin:-4,debt:-4,credit:4},description:'Pay recorded arrears. Credit improves because a claimant has actually received something.',result:'The payment is receipted. The creditor releases a claim and is willing to discuss another advance.'},
 {id:'progress',title:'Make a short progress from your lodging',cost:{coin:-2,readiness:1},description:'Ride out, receive a local welcome and return. Choose how the king is seen beyond the audience chamber.',result:'A small royal progress makes your presence visible beyond the chamber.'}
];
function inCustody(){return S.cycle===2&&S.date>=14690801;}
function councilUsed(){return S.council.filter(l=>l.act===S.cycle).length;}
function initiativeCost(i){if(i.id!=='debts')return i.cost;const amount=Math.min(4,S.realm.debt);return {coin:-amount,debt:-amount,credit:amount};}
function canInitiate(i){return !S.ended&&councilUsed()<2&&!S.council.some(l=>l.act===S.cycle&&l.id===i.id)&&S.realm.coin>=-(initiativeCost(i).coin||0)&&!(inCustody()&&['progress','muster'].includes(i.id))&&!(i.id==='debts'&&S.realm.debt===0);}
function paintCouncil(){
 text('councilAllowance',inCustody()?'Under guard: you can seek information and arrange papers; you cannot ride out. '+(2-councilUsed())+' initiatives remain.':(2-councilUsed())+' initiatives remain in this act. Each takes royal time and resources.');
 $('councilOptions').innerHTML=INITIATIVES.map(i=>'<button class="council-option" data-initiative="'+i.id+'" '+(!canInitiate(i)?'disabled':'')+'><b>'+esc(i.title)+'</b><span>'+esc(i.description)+'</span><small>'+esc(effectText(initiativeCost(i)))+'</small></button>').join('');
 $('councilOptions').querySelectorAll('button').forEach(b=>b.onclick=()=>takeInitiative(b.dataset.initiative));
 $('councilRecord').innerHTML=S.council.filter(l=>l.act===S.cycle).map(l=>'<li><b>'+esc(l.title)+'</b><span>'+esc(l.result)+'</span></li>').join('');
}
function openCouncil(){paintCouncil();openDialog('councilDialog');}
function takeInitiative(id){
 const i=INITIATIVES.find(i=>i.id===id);if(!i||!canInitiate(i))return;
 S._reserveBefore=S.realm.coin;changeRealm(initiativeCost(i),i.title);delete S._reserveBefore;
 if(id==='debts'&&S.open)S.open--;
 S.council.push({act:S.cycle,id,title:i.title,date:S.date,result:i.result});CourtAudio.ui('decision');paintCouncil();paintDepth(scene());
 if(id==='progress'){closeDialog('councilDialog');S.journey={step:0,origin:courtLocation(scene()),route:null};paintJourney();openDialog('journeyDialog');}else persistAct(true);
}
function paintJourney(){
 if(!S.journey)return;const j=S.journey;
 const exiled=S.date>=14701001&&S.date<14710411;
 const beats=[
 ['Beyond the chamber','The horses are ready outside '+j.origin+'. The steward asks whether you will ride through the busy streets or take the quieter road by the fields.'],
 ['The king passes by',j.route==='town'?'A child waves before his mother can pull his arm down. The local officer waits to learn whether the procession will stop.':'The horse settles into an easy pace. A farmer stands beside the track with a cap in his hands. He had not expected the king today.'],
 ['Returning before the lamps are lit','The lodging at '+j.origin+' comes into view. For an hour the kingdom was faces, a road and the weight of a saddle. The waiting papers are still there.']
 ];
 text('journeyTitle',beats[j.step][0]);text('journeyText',beats[j.step][1]);text('journeyLocation',j.origin+' · a short local progress'+(exiled?' in exile':''));
 paintIllustration('journeyArt',exiled?'assets/art/transitions/channel-exile.webp':S.cycle===0?'assets/art/transitions/northern-aftermath.webp':'assets/art/transitions/queens-household.webp','An existing campaign illustration accompanying the local progress.');
 const choices=j.step===0?[['town','Ride through the town'],['fields','Take the open road']]:j.step===1?[['stop','Stop and hear the people'],['ride','Greet them and keep the procession moving']]:[['return','Return to the royal audience']];
 $('journeyChoices').innerHTML=choices.map(([key,label])=>'<button class="quiet" data-journey="'+key+'">'+esc(label)+'</button>').join('');
 $('journeyChoices').querySelectorAll('button').forEach(b=>b.onclick=()=>{
  const key=b.dataset.journey;
  if(j.step===0)j.route=key;
  if(j.step===1){const region=exiled?'channel':S.cycle===0?'north':'london';S._reserveBefore=S.realm.coin;changeRealm(key==='stop'?{[region]:3,intelligence:1}:{readiness:2},'The short progress — '+(key==='stop'?'a hearing on the road':'a visible royal greeting'));delete S._reserveBefore;}
  CourtAudio.ui();if(j.step===2){S.journey=null;closeDialog('journeyDialog');render();persistAct(true);focusAudience();}else{j.step++;paintJourney();}
 });
}
function initDepth(){
 $('expandMap').onclick=()=>{const svg=document.querySelector('.map').cloneNode(true);svg.removeAttribute('class');svg.removeAttribute('id');svg.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));$('largeMap').replaceChildren(svg);openDialog('mapDialog');};
 $('journeyDialog').addEventListener('cancel',e=>{e.preventDefault();});
}
function depthEnding(){
 const style=S.realm.credit>=60?'Your word can still purchase service without an immediate guarantee.':S.realm.credit<35?'The next reign begins with creditors asking for guarantees before they trust your name.':'Your promises will still be tested against payment.';
 const army=S.realm.readiness<35?'The companies return exhausted; victory has not prepared them for another campaign.':S.realm.readiness>65?'The paid and prepared companies give you room to govern the peace.':'The companies need provision and rest before another command.';
 const brothers=S.flags['thread:gloucester1469']===0?' Richard has learned command through the responsibility you let him carry.':' Richard has learned government beside you, watching the distance between an order and its execution.';
 const custody=S.flags['thread:familyreturn:2']===0?'You have distinguished the child’s care from command in his name. The men who fill those duties will have to live with the distinction.':'You have entrusted named servants with the child’s future. Their loyalty will have a meaning beyond service to you.';
 return style+' '+army+brothers+' '+custody;
}
