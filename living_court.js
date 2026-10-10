/* Living Court experimental extension. Fictional dialogue and causal model, not quotations.
   Save schema 10 is retained; court schema 1 migrates without discarding existing fields. */
const LC_PEOPLE={
 warwick:{name:'Richard Neville, Earl of Warwick',family:'Neville',kin:['george','montagu'],region:'North',goal:'Preserve his affinity and a voice in appointments',info:'Northern retainers and continental envoys',offices:['captain_calais','northern_commission'],rival:'hastings'},
 george:{name:'George Neville',family:'Neville',kin:['warwick','montagu'],region:'Court',goal:'Defend chancery procedure and Neville access',info:'Warrants, petitions and ecclesiastical contacts',offices:['chancellor'],rival:'stillington'},
 montagu:{name:'John Neville, Lord Montagu',family:'Neville',kin:['warwick','george'],region:'North',goal:'Secure northern service and landed rewards',info:'Garrisons and northern landholders',offices:['northern_commission'],rival:'percy'},
 hastings:{name:'William Hastings',family:'Household',kin:[],region:'Midlands',goal:'Keep direct access to the king and household patronage',info:'Petitioners, household officers and Calais contacts',offices:['chamberlain','captain_calais','northern_commission'],rival:'woodville'},
 woodville:{name:'Anthony Woodville',family:'Woodville',kin:['elizabeth'],region:'Court',goal:'Protect family standing and opportunities for service',info:'Family marriages and household petitions',offices:['chamberlain','captain_calais'],rival:'warwick'},
 stillington:{name:'Robert Stillington',family:'Clerical service',kin:[],region:'Court',goal:'Advance through royal clerical service',info:'Sealed correspondence and legal instruments',offices:['chancellor'],rival:'george'},
 percy:{name:'A Percy household representative',family:'Percy',kin:[],region:'North',goal:'Secure disputed estates and northern recognition',info:'Tenants and competing northern title claims',offices:[],rival:'montagu'},
 london:{name:'A London alderman',family:'City',kin:[],region:'London',goal:'Obtain credible repayment and secure commerce',info:'Loans, customs and merchants',offices:[],rival:'woodville'},
 burgundy:{name:'A Burgundian envoy',family:'Burgundy',kin:[],region:'Calais',goal:'Obtain useful English commitments without surrendering freedom',info:'Diplomatic instructions and trading interests',offices:[],rival:'warwick'}
};
const LC_OFFICES={chancellor:'Lord Chancellor',chamberlain:'Lord Chamberlain',captain_calais:'Captain of Calais',northern_commission:'Northern royal commission'};
const LC_ACTIONS={
 summon:{name:'Summon to court',weeks:1,cost:1,delay:2,topic:'service'},
 audience:{name:'Request a private audience',weeks:1,cost:1,delay:1,topic:'confidence'},
 council:{name:'Convene the Royal Council',weeks:1,cost:1,delay:0,topic:'council'},
 messenger:{name:'Send a royal messenger',weeks:1,cost:1,delay:1,topic:'service'},
 investigate:{name:'Commission an investigation',weeks:2,cost:2,delay:3,topic:'evidence'},
 intelligence:{name:'Request intelligence',weeks:1,cost:1,delay:2,topic:'evidence'},
 mediate:{name:'Negotiate a family settlement',weeks:2,cost:2,delay:2,topic:'settlement'},
 patronage:{name:'Offer patronage or a grant',weeks:1,cost:2,delay:1,topic:'patronage'},
 diplomacy:{name:'Send a diplomatic envoy',weeks:2,cost:2,delay:3,topic:'diplomacy'},
 alliance:{name:'Propose a political alliance',weeks:2,cost:2,delay:2,topic:'alliance'},
 intervene:{name:'Intervene in a regional dispute',weeks:2,cost:2,delay:2,topic:'settlement'}
};
function lcYear(s){return s.sandbox?.year||(s.chapterIndex>=CHAPTERS.length?1465:null)||Number(String(CHAPTERS[s.chapterIndex]?.date||1461).match(/14\d\d/)?.[0]||1461);}
function lcInit(s){
 if(!s.court)s.court={schema:1,clock:0,serial:0,spent:{},purse:12,people:{},orders:[],audiences:[],promises:[],journal:[],invited:[],excluded:[],lastIncome:lcYear(s),spoken:[]};
 const c=s.court;
 for(const id of Object.keys(LC_PEOPLE))c.people[id]||={trust:Math.max(-6,Math.min(7,s.links[id]||0)),grievance:0,influence:2,memory:[],lastMove:-10};
 const year=lcYear(s);if(year>c.lastIncome){c.purse=Math.min(18,c.purse+(year-c.lastIncome)*5);c.lastIncome=year;}
 if(year>=1476)c.excluded=[...new Set([...c.excluded,'george'])];
 return c;
}
function lcAlive(s,id){if(!LC_PEOPLE[id])return false;if(id==='george'&&lcYear(s)>=1476)return false;return s.sandbox?.actors[id]?.alive!==false&&!s.facts['dead_'+id];}
function lcActor(s,id){const c=lcInit(s);if(!s.sandbox&&Object.hasOwn(s.links,id))c.people[id].trust=Math.max(-6,Math.min(7,s.links[id]));return s.sandbox?.actors[id]||c.people[id];}
function lcChange(s,id,d){if(!id||!LC_PEOPLE[id])return;const c=lcInit(s),a=lcActor(s,id);for(const k of ['trust','grievance','influence'])if(d[k])a[k]=Math.max(k==='trust'?-6:0,Math.min(k==='trust'?7:10,a[k]+d[k]));if(d.trust&&Object.hasOwn(s.links,id))s.links[id]+=d.trust;}
function lcRemember(s,id,text){const c=lcInit(s);c.people[id].memory.push({clock:c.clock,year:lcYear(s),text});s.characterMemory[id]||=[];s.characterMemory[id].push({id:'court-'+c.serial,decision:text,turn:s.turn});}
function lcLog(s,text,actor='edward'){const c=lcInit(s);c.journal.push({clock:c.clock,year:lcYear(s),actor,text});s.chronicle.push({turn:s.turn,chapter:String(lcYear(s)),id:'court-'+(++c.serial),place:'Royal court',summary:text,decision:text,arena:'court'});}
function lcMembers(s){const c=lcInit(s);return [...new Set([...Object.values(s.offices).map(x=>x==='warwick_bounded'?'warwick':x),...c.invited])].filter(id=>LC_PEOPLE[id]&&lcAlive(s,id)&&!c.excluded.includes(id));}
function lcBudget(s,weeks,cost){const c=lcInit(s);return !s.finished&&(c.spent[lcYear(s)]||0)+weeks<=8&&c.purse>=cost;}
function lcCharge(s,weeks,cost){if(!lcBudget(s,weeks,cost))throw Error('Insufficient court time or funds. Continue the reign to the next year.');const c=lcInit(s);c.spent[lcYear(s)]=(c.spent[lcYear(s)]||0)+weeks;c.purse-=cost;c.clock+=weeks;if(s.sandbox&&cost)s.sandbox.credit=sbClamp(s.sandbox.credit-1,-8,8);}
function lcIssue(s,kind,target,topic){const spec=LC_ACTIONS[kind];if(!spec)throw Error('Unknown initiative');lcInit(s);if(kind!=='council'&&!lcAlive(s,target))throw Error('That person is unavailable.');if(kind==='council'&&!lcMembers(s).length)throw Error('Appoint or invite a councillor first.');lcCharge(s,spec.weeks,spec.cost);const c=s.court;
 const id='order-'+(++c.serial),region=LC_PEOPLE[target]?.region||'Court';const travel=['North','Calais','Wales'].includes(region)?1:0;
 c.orders.push({id,kind,target:kind==='council'?null:target,topic:topic||spec.topic,due:c.clock+spec.delay+travel,status:'travelling',year:lcYear(s),private:kind==='audience',attempt:0});
 lcLog(s,spec.name+(kind==='council'?'':': '+LC_PEOPLE[target].name)+'. Instructions dispatched.');lcProcess(s);saveWorld(s);return id;
}
function lcCouncilView(s,topic){const members=lcMembers(s);return members.map(id=>{const p=LC_PEOPLE[id],a=lcActor(s,id),kinAffected=topic==='appointments'&&p.family==='Neville';let view;
 if(a.grievance>=3)view='I require my earlier grievance to be heard before I endorse another commission.';
 else if(id==='george'||id==='stillington')view='Let the terms be entered under seal. A council order cannot extinguish another man’s title.';
 else if(id==='hastings')view='Use officers who answer directly to you. Your servants must not wait on a rival household.';
 else if(kinAffected||id==='warwick')view='My followers will serve, but their lawful commissions must be respected.';
 else view='I will support a settlement that safeguards my household’s service and claims.';
 return {id,text:view,info:p.info};});}
function lcProcess(s){const c=lcInit(s);
 for(const o of c.orders.filter(x=>x.status==='travelling'&&x.due<=c.clock)){
  if(o.target&&!lcAlive(s,o.target)){o.status='closed';lcLog(s,'The instructions to '+LC_PEOPLE[o.target].name+' cannot be completed: the recipient is unavailable.');continue;}
  const a=o.target?lcActor(s,o.target):null;
  if(a&&a.grievance>=5&&a.influence>=4&&o.kind!=='investigate'&&o.kind!=='intelligence'){
   o.status='refused';lcChange(s,o.target,{grievance:1});lcLog(s,LC_PEOPLE[o.target].name+' declines the approach and asks that his grievance be heard first.',o.target);continue;
  }
  if(a&&a.trust<0&&o.attempt===0){o.attempt++;o.due=c.clock+2;lcLog(s,LC_PEOPLE[o.target].name+' delays a reply while consulting his household.',o.target);continue;}
  o.status='audience';const independent=lcMembers(s).some(id=>['george','stillington'].includes(id)&&LC_PEOPLE[id].family!==LC_PEOPLE[o.target]?.family);const hidden=a&&(a.trust<1||a.grievance>=3)&&!(o.kind==='investigate'&&independent);
  const m={id:o.id,target:o.target,topic:o.topic,kind:o.kind,private:o.private,status:'open',stage:0,evidence:false,created:c.clock,transcript:[],views:o.kind==='council'?lcCouncilView(s,o.topic):[]};
  if(['intelligence','investigate'].includes(o.kind)){m.evidence=true;m.report=hidden?'The clerk produces a partial account. The household has withheld its correspondence; suspicion alone does not establish an offence.':'The clerk brings a witnessed account of household commissions and service. It can support a hearing, but is not a judgment of title.';addKnowledge(s,'edward',{id:o.id,kind:'court-inquiry',turn:s.turn,heard:m.report,source:'commissioned clerk',certainty:hidden?'partial':'corroborated'});}
  c.audiences.push(m);lcLog(s,o.kind==='council'?'The councillors assemble with differing recommendations.':LC_PEOPLE[o.target].name+': a reply is ready for the king.',o.target||'council');
 }
 for(const p of c.promises.filter(p=>p.status==='open'&&p.due<c.clock)){
  p.status='broken';lcChange(s,p.target,{trust:-2,grievance:2});lcRemember(s,p.target,'The king failed to honour his promised hearing.');lcLog(s,'An unfulfilled promise to '+LC_PEOPLE[p.target].name+' has become a grievance.',p.target);
 }
 // Initiative follows opportunity and interests, not an unconditional random event chain.
 for(const id of Object.keys(LC_PEOPLE).filter(id=>lcAlive(s,id))){const a=lcActor(s,id),p=c.people[id];if(c.clock-p.lastMove<6)continue;
  if(a.grievance>=4&&a.influence>=3){p.lastMove=c.clock;a.influence=Math.min(10,a.influence+1);const rival=LC_PEOPLE[id].rival;
   if(rival&&lcAlive(s,rival))lcChange(s,rival,{grievance:1});
   if(s.sandbox){const region=LC_PEOPLE[id].region;s.sandbox.unrest[region]=Math.min(9,(s.sandbox.unrest[region]||0)+1);}
   scheduleReport(s,{id:'court-coalition-'+id+'-'+c.clock,from:'A household correspondent',text:LC_PEOPLE[id].name+' is seeking support for a complaint against the Crown. The terms remain uncertain.',delay:2,certainty:'rumour'});
   s.agentActions.push({id:'court-move-'+c.clock+'-'+id,actor:id,outcome:'gathered support over grievance',turn:s.turn});
  }
 }
}
function lcMeeting(s,id){const c=lcInit(s),m=c.audiences.find(m=>m.id===id);if(!m)return null;const a=m.target?lcActor(s,m.target):null,p=m.target?LC_PEOPLE[m.target]:null;
 const promises=c.promises.filter(x=>x.target===m.target&&x.status==='broken').length;
 const openings={appointments:'A disputed commission cannot serve two masters. Whose warrant will you recognise?',settlement:'My neighbours dispute the terms. Who will stand surety if they break the peace?',patronage:'What service do you require in return for this grant?',land:'Show me the Crown’s title and the terms of the lease before I bind my household.',privilege:'Will your safe-conduct protect my servants as well as myself?',diplomacy:'My instructions permit talks, not an unconditional treaty. What undertaking will you give?',alliance:'What assistance do you promise if my interests come under attack?',evidence:'The accounts I bring may not contain every private undertaking.'};
 let line=m.report||(!p?'Your councillors await a ruling.':promises?'Your earlier promise was not kept. Why should I bind my household again?':a.grievance>=3?'My followers have lost ground while others prosper. What terms do you offer us?':a.trust>=3?'I have served you faithfully. Give me terms I can carry to my followers.':'I have come to hear your purpose. My household will expect something in return.');
 if(openings[m.topic]&&!m.report)line+=' '+openings[m.topic];
 if(m.evidence&&!m.report)line+=' I can produce my warrants, but my private correspondents will not thank me for naming them.';
 return {...m,line,goal:p?.goal,memories:p?c.people[m.target].memory.slice(-3):[],strength:a?a.influence-(s.sandbox?.royalAuthority||2):0};}
function lcRespond(s,id,move){const c=lcInit(s),m=c.audiences.find(x=>x.id===id&&x.status==='open');if(!m)throw Error('This audience has ended.');if(!['question','reassure','threaten','promise','settle','dismiss','record','delegate'].includes(move))throw Error('Unknown response');if(m.kind==='council'&&!['record','delegate','dismiss'].includes(move))throw Error('Choose a council ruling.');if(m.kind!=='council'&&['record','delegate'].includes(move))throw Error('This requires a council meeting.');if(move==='question'&&m.evidence)throw Error('The available evidence has already been requested.');lcCharge(s,move==='dismiss'?0:1,move==='settle'?2:0);
 const target=m.target,a=target?lcActor(s,target):null;let text;
 if(move==='question'){m.evidence=true;text='I will hear the witnesses and examine the warrants.';}
 if(move==='reassure'){text='Your lawful service has not lost my regard.';lcChange(s,target,{trust:1,grievance:-1});m.status='closed';}
 if(move==='threaten'){text='I require obedience to my commission. You will answer for defiance.';const obey=a&&((s.sandbox?.royalAuthority||2)+2>=a.influence);lcChange(s,target,{trust:-2,grievance:obey?1:2});if(s.sandbox)s.sandbox.royalAuthority=sbClamp(s.sandbox.royalAuthority+(obey?1:-1),-8,8);text+=obey?' He submits reluctantly.':' He refuses to give an undertaking.';m.status='closed';}
 if(move==='promise'){text='I pledge to hear your claim before another grant is made.';c.promises.push({id:'pledge-'+(++c.serial),target,topic:m.topic,status:'open',due:c.clock+5});lcChange(s,target,{trust:1});m.status='closed';}
 if(move==='settle'){
  const accepted=a&&(a.trust+(m.evidence?2:0)+(s.sandbox?.royalAuthority||2)>=a.grievance);
  text=accepted?'I will have these terms witnessed and entered. Both households shall be heard.':'I offer witnessed terms. He withholds assent and asks for stronger guarantees.';
  if(accepted){lcChange(s,target,{trust:1,grievance:-2});const rival=LC_PEOPLE[target].rival;lcChange(s,rival,{grievance:-1});if(s.sandbox){const region=LC_PEOPLE[target].region;s.sandbox.unrest[region]=Math.max(0,(s.sandbox.unrest[region]||0)-1);if(s.sandbox.deep?.relationships&&s.sandbox.actors[target]&&s.sandbox.actors[rival]){const rel=dwRel(s.sandbox.deep,target,rival);rel.feud=Math.max(0,rel.feud-1);}}
   for(const p of c.promises.filter(p=>p.target===target&&p.status==='open')){p.status='kept';lcChange(s,target,{trust:1});}
   if(s.sandbox&&['diplomacy','alliance'].includes(m.topic)){s.facts['court_'+m.topic+'_'+target]='witnessed terms';lcChange(s,target,{influence:1});}
   if(m.topic==='land'){if(c.demesneLease){text+=' No uncommitted Crown lease remains; no land grant is made.';}else{c.demesneLease={holder:target,year:lcYear(s),name:'A Crown demesne lease (fictional)',term:'during royal pleasure, existing tenant rights reserved'};s.facts.court_demesne_lessee=target;lcChange(s,target,{influence:1});text+=' A lease of uncommitted Crown demesne is sealed, reserving existing tenants’ rights.';}}
   if(m.topic==='privilege'){s.facts['court_safeconduct_'+target]=true;lcChange(s,target,{trust:1});text+=' I grant safe-conduct for your named servants, subject to keeping the peace.';}
   if(m.topic==='patronage'){s.facts['court_patronage_'+target]='royal household stipend';lcChange(s,target,{influence:1});text+=' A household stipend is granted; disputed land remains subject to title proceedings.';}
  }m.status='closed';
 }
 if(move==='dismiss'){text='We shall speak again when there is more to consider.';m.status='closed';}
 if(move==='record'||move==='delegate'){if(m.kind!=='council')throw Error('This requires a council meeting.');text=move==='record'?'Let every dissent and warrant be entered. I reserve judgment.':'Let the senior officer examine this matter and return with terms.';
  for(const v of m.views)lcRemember(s,v.id,text);
  if(s.sandbox){s.sandbox.royalAuthority=sbClamp(s.sandbox.royalAuthority+(move==='record'?1:-1),-8,8);if(move==='delegate'&&m.views[0])lcChange(s,m.views[0].id,{influence:1,trust:1});}if(move==='delegate'&&m.views[0])c.orders.push({id:'council-inquiry-'+(++c.serial),kind:'investigate',target:m.views[0].id,topic:'evidence',due:c.clock+3,status:'travelling',year:lcYear(s),private:false,attempt:0});m.status='closed';}
 m.transcript.push({clock:c.clock,move,text});m.stage++;if(target)lcRemember(s,target,text);lcLog(s,text,target||'council');lcProcess(s);saveWorld(s);return lcMeeting(s,id);
}
function lcAppoint(s,office,id){const c=lcInit(s);if(!LC_OFFICES[office]||!lcAlive(s,id)||!LC_PEOPLE[id].offices.includes(office))throw Error('This candidate is not eligible for that office.');if(s.offices[office]===id)throw Error('This person already holds the office.');lcCharge(s,1,1);const old=s.offices[office];for(const p of c.promises.filter(p=>p.status==='open'&&p.topic==='appointments')){p.status='broken';lcChange(s,p.target,{trust:-2,grievance:2});lcRemember(s,p.target,'The king granted an office before the promised hearing.');}s.offices[office]=id;c.excluded=c.excluded.filter(x=>x!==id);lcChange(s,id,{trust:1,influence:1});if(LC_PEOPLE[old]){lcChange(s,old,{trust:-1,grievance:2});lcRemember(s,old,'The king replaced me as '+LC_OFFICES[office]+'.');}lcLog(s,'I entrust the office of '+LC_OFFICES[office]+' to '+LC_PEOPLE[id].name+'.');lcProcess(s);saveWorld(s);}
function lcDismiss(s,office){if(!LC_OFFICES[office]||!LC_PEOPLE[s.offices[office]])throw Error('There is no serving officer to dismiss.');lcCharge(s,1,0);const id=s.offices[office];s.offices[office]='unassigned';lcChange(s,id,{trust:-1,grievance:2});lcRemember(s,id,'The king dismissed me as '+LC_OFFICES[office]+'.');lcLog(s,'I discharge '+LC_PEOPLE[id].name+' from the office of '+LC_OFFICES[office]+'.');lcProcess(s);saveWorld(s);}
function lcSeat(s,id,invite){if(!lcAlive(s,id)||!LC_PEOPLE[id].offices.length)throw Error('Only eligible royal servants can be seated.');lcCharge(s,1,0);const c=lcInit(s);if(invite){c.excluded=c.excluded.filter(x=>x!==id);c.invited=[...new Set([...c.invited,id])];}else{c.invited=c.invited.filter(x=>x!==id);c.excluded=[...new Set([...c.excluded,id])];}lcChange(s,id,{trust:invite?1:-1,grievance:invite?-1:1});lcLog(s,LC_PEOPLE[id].name+(invite?' is called to the king’s counsel.':' is excluded from the king’s counsel; any office remains a separate appointment.'));saveWorld(s);}
const LC_VOICE={Support:'I shall support',Reject:'I reject',Give:'I grant',Keep:'I shall keep',Order:'I order',Offer:'I offer',Demand:'I require',Send:'I shall send',Confirm:'I confirm',Suspend:'I suspend',Recognise:'I recognise',Withhold:'I withhold',Authorise:'I authorise',Wait:'I shall wait',Accept:'I accept',Require:'I require',Ratify:'I ratify',Disavow:'I disavow',Supply:'I shall supply',Limit:'I shall limit',Honour:'I shall honour',Name:'I shall name',Protect:'I will protect',Negotiate:'I shall negotiate',Judge:'I shall judge',Appoint:'I appoint',Dismiss:'I dismiss',Pay:'I shall pay',Refuse:'I refuse',Grant:'I grant',Hear:'I shall hear',Allow:'I permit',Choose:'I choose',Take:'I shall take',Investigate:'I shall investigate',Seek:'I shall seek',Set:'I shall set',Use:'I shall use',Make:'I shall make',Register:'I shall register',Arrange:'I shall arrange',Renew:'I renew',Return:'I shall return',Leave:'I shall leave',Put:'I shall put',Hold:'I shall hold',Reconcile:'I shall reconcile',Forgive:'I forgive',Trust:'I shall trust',Secure:'I shall secure',Review:'I shall review',Examine:'I shall examine'};
Object.assign(LC_VOICE,{Pursue:'I shall pursue',Reserve:'I reserve',Refer:'I shall refer',Permit:'I permit',Place:'I shall place',Build:'I shall build',Receive:'I shall receive',Issue:'I shall issue',Promise:'I pledge',Record:'I shall record',Proceed:'I shall proceed',Pass:'I assent to',Apply:'I shall apply',Delegate:'I delegate',Seal:'I shall seal',Write:'I shall write',Strengthen:'I shall strengthen',Compensate:'I shall compensate',Treat:'I shall treat',Reinforce:'I shall reinforce',Enforce:'I shall enforce',Act:'I shall act',Question:'I shall question',Pardon:'I pardon',Restore:'I restore',Prepare:'I shall prepare',Continue:'I shall continue',Marry:'I shall marry',Distinguish:'I shall distinguish',Invite:'I invite',Commission:'I commission',Delay:'I shall delay',Restrict:'I shall restrict',License:'I license',Maintain:'I shall maintain',Consent:'I consent',Publish:'I shall publish',Summon:'I summon',Fund:'I shall fund',Audit:'I shall audit',Settle:'I shall settle',Command:'I command',Entrust:'I entrust',Divide:'I shall divide',Concentrate:'I shall concentrate',Bind:'I shall bind',Respect:'I shall respect',Watch:'I shall watch',Separate:'I shall separate',Defend:'I shall defend',Route:'I shall route',Approve:'I approve',Establish:'I establish',Renegotiate:'I shall renegotiate',Sign:'I shall sign'});
function lcVoice(label){const t=String(label||'').trim().replace(/Edward’s own/g,'my own').replace(/the king’s/g,'my').replace(/before you/g,'before me').replace(/your word/g,'my word');if(!t)return t;if(/^(I |We |Let |Tell |My |Our |You |“)/.test(t))return t;const word=t.match(/^[A-Za-z]+/)?.[0];if(LC_VOICE[word])return LC_VOICE[word]+t.slice(word.length).replace(/\.$/,'')+'.';return t.replace(/\.$/,'')+'.';}
function lcVoiceCard(card){if(!card)return card;const copy={...card};for(const k of ['left','right','wait'])if(card[k])copy[k]={...card[k],mechanicalLabel:card[k].mechanicalLabel||card[k].label,label:lcVoice(card[k].label)};for(const ar of ['up','down'])if(card[ar])copy[ar]=lcVoiceCard(card[ar]);return copy;}
const _lcNext=getNextSituation;getNextSituation=function(s){lcInit(s);return lcVoiceCard(_lcNext(s));};
const _lcResolve=resolveChoice;resolveChoice=function(s,card,side,arena){const c=lcInit(s),selected=(arena?card[arena]:card)?.[side];const witnesses=publicOrPrivateWitnesses(s,card,arena);c.spoken.push({id:card.id,year:lcYear(s),text:selected?.label,register:arena==='down'?'private remark':arena==='up'?'council order':card.tag==='DIPLOMACY'?'diplomatic instruction':'royal declaration',witnesses});c.clock+=2;lcProcess(s);return _lcResolve(s,card,side,arena);};

const _lcSandboxInit=sbInit;sbInit=function(s){const existed=!!s.sandbox;const sb=_lcSandboxInit(s);if(!existed&&s.court){for(const [id,p] of Object.entries(s.court.people)){if(sb.actors[id]){sb.actors[id].grievance=Math.max(sb.actors[id].grievance,p.grievance);sb.actors[id].influence=sbClamp(sb.actors[id].influence+Math.max(0,p.influence-2),0,10);}}}return sb;};
