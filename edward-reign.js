'use strict';
const $=id=>document.getElementById(id),clamp=n=>Math.max(0,Math.min(100,n)),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SAVE_KEY='edward-living-court-depth-v4',VERSION=5;
// Selected audiences pause for another voice before Edward answers. Each
// hearing is a specific person with something at stake and can open a response
// the king could not responsibly make before listening.
const INQUIRIES={
 'At the roadside cross':{id:'roadside',name:'A woman from the village',role:'Among those who brought the bread',text:'“We brought what we could spare. My eldest is under the earth at Towton; my youngest still asks when the soldiers will leave the road. We have no oath ready, sire. We have bread.”',response:{k:'bounded',t:'Ask what the village needs before the household rides on',d:'Hear the immediate need and make a small provision from the royal stores.',effect:{north:2,coin:-1},result:'The village names its need plainly. A little provision goes ahead of the royal household.'}},
 'A wheel in the mud':{id:'farmer',name:'The farmer with the oxen',role:'A tenant on the road',text:'“They took the team last summer and called it service. The oxen came back thin; the promise of payment did not. I will lend them, my lord, if your clerk writes what is owed.”',response:{k:'pay',t:'Hire the oxen and have the clerk witness the price',d:'Pay for the delay and leave the farmer with an enforceable account.',effect:{coin:-1,north:2,readiness:1},result:'The farmer lends the team against a witnessed price. The baggage moves, and the household leaves an account behind.'}},
 'The king’s supper':{id:'lower-table',name:'A kitchen boy',role:'Serving the lower tables',text:'“The high table has not yet been served, sire. The men below have been waiting since the gates opened. There is bread enough if the first trenchers go down now.”',response:{k:'pay',t:'Send bread to the waiting tables before the next course',d:'Spend from the household reserve; servants see whose hunger the king noticed.',effect:{coin:-1,credit:2},result:'Bread reaches the lower tables before another course is sent upstairs.'}},
 'Protection at the market':{id:'toll-keeper',name:'The toll keeper',role:'The man struck beneath the royal badge',text:'“I asked the king’s man for the lawful toll. He answered that the sun on his sleeve had already paid it. When I disputed him, he struck me. I want the fee and an answer for the blow.”',response:{k:'investigate',t:'Hear the keeper’s claim beside the badge-bearer’s',d:'Let neither royal livery nor local office settle the testimony alone.',effect:{credit:2,north:1},result:'The keeper’s account enters the same record as the badge-bearer’s. Neither man is dismissed unheard.'}},
 'A widow’s petition':{id:'widow',name:'The petitioner herself',role:'A widow seeking redress',text:'“The steward says my husband’s holding is forfeit. His men took the seed before the court heard my claim. I ask you to keep them from taking the next sowing.”',response:{k:'council',t:'Stay the seizure until her claim is heard',d:'Give the widow time to bring witnesses; the estate yields no immediate revenue.',effect:{midlands:2,coin:-1},result:'The seizure pauses until the widow’s witnesses are heard. Her case has a date, not merely a promise.'}},
 'A crowd that will not disperse':{id:'gathering',name:'A woman from one of the gathered households',role:'Travelling with the northern gathering',text:'“My husband followed the captain because the collector took our grain twice. I brought our children and the last sack. We came together; we did not come to burn the town.”',response:{k:'pardon',t:'Offer safe return to the households before judging their captains',d:'Separate frightened families from the armed men directing the gathering.',effect:{north:3,credit:1},result:'The families are offered a safe road home. Their captains must answer for the armed gathering separately.'}},
 'A shipmaster reads the terms':{id:'shipmaster',name:'The shipmaster',role:'A master asked to carry Edward’s company',text:'“I can put men aboard, sire. I cannot feed them on the word of a crown in exile. Name who pays if you do not reach England, and I can tell you which vessel I can risk.”',response:{k:'bounded',t:'Name a limited guarantee and sail with a smaller company',d:'Accept a smaller crossing backed by people who know the risk.',effect:{channel:2,credit:2,readiness:1},result:'The shipmaster accepts a smaller company under named guarantees. His risk has a limit and an answerable name.'}},
 'A sister’s attendant':{id:'margaret-attendant',name:'Margaret’s attendant',role:'A familiar face from your sister’s household',text:'“The Duchess asked me first whether you were eating and sleeping. She has council papers enough already. Let me take her a brother’s answer before another request for ships.”',response:{k:'burgundy',t:'Send your sister a private answer before the council request',d:'Keep affection between you alive while the political negotiation continues.',effect:{credit:2,channel:1},result:'Margaret receives a personal answer in her own household. The council request follows by a separate hand.'}},
 'A joke nobody finishes':{id:'unfinished-joke',name:'A young courtier',role:'Present at the interrupted jest',text:'“They were laughing at the new appointments, sire. One man said the old doors have not shut; they have only learned to open from the other side. I thought it a clever jest until Hastings stopped smiling.”',response:{k:'joint',t:'Ask the company to name one door they fear has closed',d:'Hear a specific grievance in the room; invite candour without promising redress.',effect:{intelligence:2,credit:1},result:'One neglected household names the office it can no longer reach. The jest has become a grievance you can answer.'}},
 'Who crossed with you?':{id:'missing-servant',name:'The harbour porter',role:'The last man to see your missing servant',text:'“He was carrying the queen’s small chest, not a sword. I saw him go back when the second boat pushed off. I cannot swear he reached the landing.”',response:{k:'investigate',t:'Pay the porter to search the landing and ask after the servant',d:'Spend on a person with no office and learn whether he came ashore.',effect:{coin:-1,intelligence:2,channel:1},result:'The porter searches the landing under payment. The missing servant has a name in the harbour inquiry.'}}
};
const fresh=()=>({...depthFresh(),version:VERSION,n:0,cycle:0,date:14610401,year:1461,authority:52,order:50,succession:35,warwick:0,woodville:0,hastings:8,gloucester:0,clarence:4,factions:{crown:56,neville:55,queen:0,brothers:8,lancastrian:32},meaning:{bond:50,dynasty:50,faith:50,power:50},open:0,broken:0,harsh:0,executions:0,risk:0,dead:false,deposed:false,ended:false,flags:{},mem:[],log:[],documents:[],last:null,actStart:{authority:52,order:50,succession:35}});
const S=fresh();let started=false,choosing=false,activeView='audience',saveError=false;
function text(id,v){$(id).textContent=v;}
function scene(){
 const c=depthScene(campaignScenes()[S.n]),q=INQUIRIES[c.title];
 if(q&&S.flags['heard:'+q.id])c.choices.push({...q.response,heardFrom:q.name});
 return c;
}

// Receipt is separate from reading. Snapshot prose and context before the next
// choice can change the state; archive views never regenerate correspondence.
function courtLocation(c){return c.courtPlace||c.place.split(' · ')[0];}
function receiveDocuments(c=scene()){
 for(const id of c.documents||[]){
  if(S.documents.some(d=>d.id===id))continue;
  const source=DOCUMENTS[id],copy=JSON.parse(JSON.stringify(source));
  copy.paragraphs.push(...(source.variants||[]).filter(v=>S.log.some(l=>l.title===v.scene&&l.key===v.choice)).map(v=>v.text));
  delete copy.variants;
  S.documents.push({...copy,id,receivedDate:S.date,act:S.cycle,scene:S.n,sceneTitle:c.title,court:courtLocation(c)});
 }
}
const DOCUMENT_TYPES={letter:'Letter',petition:'Petition',account:'Account',appeal:'Religious appeal',dispatch:'Military dispatch',memorandum:'Memorandum',extract:'Chronicle extract'};
function paintDocuments(c){
 const received=S.documents.filter(d=>(c.documents||[]).includes(d.id));
 $('documentDelivery').hidden=!received.length;
 $('documentDelivery').innerHTML=received.map(d=>'<p>'+esc(d.delivery)+'</p><button class="document-link" data-document="'+d.id+'" aria-haspopup="dialog"><span>'+esc(DOCUMENT_TYPES[d.type])+'</span>'+esc(d.title)+'<small>'+esc(d.sealed?'Open the folded letter':'Read the paper')+'</small></button>').join('');
 $('documentArchive').innerHTML=S.documents.length?S.documents.slice().reverse().map(d=>'<li><button class="archive-letter" data-document="'+d.id+'" aria-haspopup="dialog"><small>'+dateLabel(d.receivedDate)+' · '+esc(d.origin)+'</small><b>'+esc(d.title)+'</b><span>'+esc(d.author)+'</span></button></li>').join(''):'<li class="small">Letters and papers received will be kept here.</li>';
 for(const container of [$('documentDelivery'),$('documentArchive')])container.querySelectorAll('[data-document]').forEach(b=>b.onclick=()=>openDocument(b.dataset.document));
}
function sealMarkup(seal){
 if(!seal)return '';
 // Schematic devices identify the issuer, not facsimiles of surviving matrices.
 const paths={shield:'M17 12H43V29Q42 40 30 47Q18 40 17 29Z M30 15V42 M20 25H40',lozenge:'M30 10L45 29L30 48L15 29Z M30 17V41 M21 29H39',cross:'M26 13H34V24H42V32H34V45H26V32H18V24H26Z',crown:'M15 22L23 29L30 17L37 29L45 22L41 40H19Z M20 44H40'};
 return '<div class="document-seal" data-seal="'+esc(seal.kind)+'"><svg viewBox="0 0 60 60" aria-hidden="true"><path d="'+(paths[seal.device]||paths.shield)+'"/></svg><span>'+esc(seal.label)+'</span></div>';
}
let activeDocument=null;const unfoldedDocuments=new Set();
function openDocument(id){
 const d=S.documents.find(d=>d.id===id);if(!d)return;activeDocument=id;
 $('documentDialog').dataset.form=d.type;
 text('documentType',DOCUMENT_TYPES[d.type]);text('documentTitle',d.title);text('documentAuthor',d.author);
 text('documentOrigin','From '+d.origin);text('documentReceipt','Received '+dateLabel(d.receivedDate)+' · Edward at '+d.court);
 text('documentRoute',d.delivery);text('documentMaterial',d.material);
 $('documentSeal').innerHTML=sealMarkup(d.seal);
 text('documentSalutation',d.salutation);
 $('documentParagraphs').innerHTML=d.paragraphs.map(p=>'<p>'+esc(p)+'</p>').join('');
 $('documentAccount').hidden=!d.rows;
 $('documentAccount').innerHTML=d.rows?'<caption>Delivered to the household</caption><thead><tr><th scope="col">Particulars</th><th scope="col">Charge</th></tr></thead><tbody>'+d.rows.map(r=>'<tr'+(r[2]?' class="corrected"':'')+'><td>'+esc(r[0])+(r[2]?'<span class="sr-only"> (cancelled)</span>':'')+'</td><td>'+esc(r[1])+'</td></tr>').join('')+'</tbody>':'';
 $('documentMore').hidden=!d.extra?.length;$('documentMore').open=false;
 $('documentExtra').innerHTML=(d.extra||[]).map(p=>'<p>'+esc(p)+'</p>').join('');
 text('documentClosing',d.closing);text('documentResponse',d.response?'Your answer: '+d.response:d.noReply?'Kept among the household papers.':'Your answer belongs to the audience.');
 const folded=d.sealed&&!unfoldedDocuments.has(id);$('documentFold').hidden=!folded;$('documentContents').hidden=folded;
 openDialog('documentDialog',false);$('documentDialog').scrollTop=0;
 if(!folded)CourtAudio.paper();
}
function unfoldDocument(){if(!activeDocument)return;unfoldedDocuments.add(activeDocument);$('documentFold').hidden=true;$('documentContents').hidden=false;CourtAudio.paper();$('documentSalutation').focus({preventScroll:true});}
function paintIllustration(id,art,alt){const img=$(id);img.hidden=!art;img.onerror=()=>{img.hidden=true;};if(art){img.alt=alt||'';img.src=art;}else{img.removeAttribute('src');img.alt='';}}
function validDocumentHistory(v){
 if(!Array.isArray(v.documents))return false;
 const str=x=>typeof x==='string'&&x.length<12000;
 const strings=x=>Array.isArray(x)&&x.length<=20&&x.every(str);
 return Array.isArray(v.documents)&&v.documents.length<=Object.keys(DOCUMENTS).length&&new Set(v.documents.map(d=>d?.id)).size===v.documents.length&&v.documents.every(d=>
  d&&Object.hasOwn(DOCUMENTS,d.id)&&Object.hasOwn(DOCUMENT_TYPES,d.type)&&['title','author','origin','delivery','material','salutation','closing','sceneTitle','court'].every(k=>str(d[k]))&&strings(d.paragraphs)&&
  (!d.extra||strings(d.extra))&&(!d.rows||Array.isArray(d.rows)&&d.rows.length<=20&&d.rows.every(r=>Array.isArray(r)&&str(r[0])&&str(r[1])&&(r[2]===undefined||typeof r[2]==='boolean')))&&
  (!d.seal||['kind','label','device'].every(k=>str(d.seal[k])))&&(d.response===undefined||str(d.response))&&
  Number.isInteger(d.act)&&d.act>=0&&d.act<=v.cycle&&Number.isInteger(d.scene)&&d.scene>=0&&d.scene<actLength(d.act,v)&&decisionsBefore(d.act,v)+d.scene<=decisionsBefore(v.cycle,v)+v.n&&
  campaignScenes(d.act,v)[d.scene].documents?.includes(d.id)&&d.receivedDate===campaignScenes(d.act,v)[d.scene].date);
}

function dateLabel(date){const y=Math.floor(date/10000),m=Math.floor(date/100)%100;return ['Winter','Winter','Spring','Spring','Spring','Summer','Summer','Summer','Autumn','Autumn','Autumn','Winter'][m-1]+' '+y;}
function roman(i){return ['I','II','III','IV','V','VI','VII'][i];}
function portrait(p,small=false){
 const young=(p.id==='gloucester'&&S.date<14690101)||(p.id==='clarence'&&S.date<14650101);
 let art=p.portrait,cell=p.portraitCell,sheet=p.portraitSheet;
 if(young){art='young-brothers';cell=[p.id==='gloucester'?0:768,0,768,1024];sheet=[1536,1024];}
 if(cell)return '<svg class="portrait-atlas" viewBox="'+cell.join(' ')+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><image href="assets/art/portraits/'+art+'.webp" width="'+sheet[0]+'" height="'+sheet[1]+'"/></svg>';
 return art?'<img src="assets/art/portraits/'+art+'.webp" alt="" '+(small?'loading="lazy"':'')+'>':'<span class="initials" aria-hidden="true">'+esc(p.initials||p.short.slice(0,2).toUpperCase())+'</span>';
}
function relation(value){return value>28?'powerful, expectant':value< -18?'trust is strained':value>10?'trusted, with claims':'loyalty still negotiated';}
function updateDate(){const old=S.date;S.date=campaignScenes()[S.n].date;S.year=Math.floor(S.date/10000);
 if(old<14640515&&S.date>=14640515){S.factions.queen=22;S.woodville=Math.max(0,S.woodville);}
 if(old<14650526&&S.date>=14650526)S.factions.queen=clamp(S.factions.queen+8);
 if(old<14690101&&S.date>=14690101)S.factions.brothers=Math.max(24,S.factions.brothers);
 if(old<14701001&&S.date>=14701001){S.factions.lancastrian=clamp(S.factions.lancastrian+18);S.authority=clamp(S.authority-12);S.order=clamp(S.order-7);}
 if(old<14710522&&S.date>=14710522){S.factions.neville=Math.max(12,S.factions.neville*.52);S.factions.lancastrian=Math.max(12,S.factions.lancastrian*.5);S.authority=clamp(S.authority+12);}
}
function stability(){const m=S.meaning,meaning=Math.pow(Math.max(1,m.bond*m.dynasty*m.faith*m.power),.25);return Math.pow(Math.max(1,S.authority*S.order*S.succession*meaning),.25);}
// The existing authority/order/succession and four sources of meaning remain.
// Every course has a cost; benefits weaken when the same instrument is overused.
const ACTION={
 pursue:{a:2,o:-3,r:3,f:{neville:2}},hold:{a:-1,o:3,p:-1},bounded:{a:1,o:1,p:-1,f:{crown:1}},
 pay:{a:-2,o:4,s:1},land:{a:1,o:2,s:-3,d:-2},promise:{a:-1,o:1,open:1},
 pardon:{a:-2,o:3,s:1,b:1,f:{lancastrian:2}},execute:{a:3,o:-1,s:-5,b:-2,d:-3,h:-3,p:2,r:2,f:{lancastrian:3}},secure:{a:2,o:-1,s:-1,p:1,r:1},
 faith:{a:-1,o:1,h:4,p:-1},council:{a:-1,o:2,s:1,p:-1,f:{crown:1}},direct:{a:3,o:-1,p:2,f:{crown:2}},
 investigate:{a:0,o:1,s:1,p:-1},defer:{a:-2,o:-1,open:1,r:1},
 commission:{a:-1,o:3,rel:{warwick:5},f:{neville:4,crown:-1}},warwick:{a:-1,o:2,rel:{warwick:5},f:{neville:3}},clarence:{a:1,o:-1,s:1,rel:{clarence:5},f:{brothers:3,crown:-1}},
 queen:{a:0,o:-1,s:2,b:3,rel:{woodville:5,warwick:-2},f:{queen:4,neville:-1}},court:{a:1,o:2,b:-2,rel:{woodville:-3},f:{queen:-2,crown:1}},
 joint:{a:-1,o:2,s:1,b:1,f:{crown:1,queen:1}},hastings:{a:1,o:2,rel:{hastings:5},f:{crown:3}},gloucester:{a:1,o:2,s:-1,rel:{gloucester:5},f:{brothers:4}},
 burgundy:{a:1,o:0,s:1,open:1},mobilize:{a:3,o:1,s:-2,r:2},oath:{a:1,o:1,s:-1,b:-1},assert:{a:3,o:-2,b:-1,p:2},
 settle:{a:-2,o:3,s:1,b:1,p:-1,open:1},plot:{a:1,o:-4,r:24,p:2},escape:{a:2,o:-4,r:10,p:2},depose:{a:0}
};
function getChoices(){return scene().choices.filter(choiceAllowed).map(o=>({...o}));}
function hearInquiry(){
 const c=scene(),q=INQUIRIES[c.title];if(!q||S.flags['heard:'+q.id])return;
 S.flags['heard:'+q.id]=true;CourtAudio.ui();persistAct(true);render();$('inquiryQuote').focus({preventScroll:true});
}
function applyChoice(o,c){
 const before={authority:S.authority,order:S.order,succession:S.succession};
 const source=ACTION[o.k];if(!source)throw Error('Unknown decision '+o.k);
 // Normalise political drift to the selected act length; legacy full routes
 // retain their original balance.
 const weight=20/actLength(),a=Object.fromEntries(Object.entries(source).map(([k,v])=>[k,typeof v==='number'&&!['open','r'].includes(k)?v*weight:v]));
 const streak=S.log.slice(-3).filter(x=>x.key===o.k).length,scale=1-streak*.12;
 for(const [short,key] of [['a','authority'],['o','order'],['s','succession']]){const delta=a[short]||0;S[key]+=delta>0?delta*scale*(.45+.55*(1-S[key]/100)):delta;}
 for(const [short,key] of [['b','bond'],['d','dynasty'],['h','faith'],['p','power']])S.meaning[key]=clamp(S.meaning[key]+(a[short]||0));
 for(const [key,delta] of Object.entries(a.rel||{})){
  if(key==='warwick'&&S.date>=14710414)continue;
  S[key]=Math.max(-60,Math.min(60,S[key]+delta*weight));
 }
 for(const [key,delta] of Object.entries(a.f||{}))if(key!=='queen'||S.date>=14640515)S.factions[key]=clamp(S.factions[key]+delta*weight*(delta>0?(100-S.factions[key])/100:S.factions[key]/100));
 S.open+=a.open||0;S.risk+=a.r||0;
 if(o.k==='execute'){S.harsh++;S.executions++;}
 if(o.k==='pay'&&S.open){S.open--;S.mem.push('a promise paid');}
 // Neglected obligations can become grievances. A balanced source of legitimacy
 // buffers political pressure; a dominant affinity increases dependence.
 if(S.open>=5){S.broken++;S.open-=3;S.order-=2;}
 const f=S.factions,gap=Math.max(0,Math.max(f.neville,f.queen,f.brothers,f.lancastrian)-f.crown-15);
 const rivalry=S.date<14710414?Math.abs(S.warwick-S.woodville)/80:Math.abs(S.hastings-S.gloucester)/110;
 S.order+=((stability()-52)*.018-gap*.018-rivalry*.22-.25)*weight;
 S.authority-=.15*weight;
 // Government requires maintenance: a high position gradually loses its edge,
 // while low standing can recover. This prevents every successful reign from
 // reaching three perfect bars regardless of its political choices.
 for(const key of ['authority','order','succession'])S[key]+=(50-S[key])*.012*weight;
 for(const key of ['authority','order','succession'])S[key]=clamp(S[key]);
 S.risk=Math.max(0,S.risk-(o.k==='investigate'?7:o.k==='secure'?3:o.k==='faith'?1:0));
 Object.assign(S.flags,o.set||{});
 if(o.k==='depose')S.deposed=true;
 if(o.k==='plot'){
  const danger=S.risk+(100-S.order)*.13+(100-S.authority)*.12+S.broken*2;
  if(danger>=42)S.dead=true;
 }
 if(o.k==='escape'){
  const danger=(100-S.order)*.32+(100-S.authority)*.28+Math.max(0,-S.hastings)*.5+S.broken*2+(50-S.realm.readiness)*.16-(S.realm.intelligence-40)*.08;
  if(danger>40)S.dead=true;else{S.authority=clamp(S.authority+4);S.flags.escaped=true;}
 }
 depthApply(o,c);
 const change=Object.fromEntries(Object.keys(before).map(k=>[k,Math.round(S[k]-before[k])]));
 for(const d of S.documents)if(d.act===S.cycle&&d.scene===S.n&&!d.noReply)d.response=o.t;
 const entry={date:S.date,year:S.year,title:c.title,choice:o.t,key:o.k,person:c.person,change,result:o.result||''};S.log.push(entry);S.last=entry;
 S.mem.push(o.k);S.mem=S.mem.slice(-20);
}
function consequence(){if(!S.last)return '';const l=S.last;
 if(l.result)return l.result;
 if(l.key==='plot')return 'The untested opening has put your household’s security in doubt.';
 if(l.key==='escape')return 'Your household has brought you out alive. Their service will be remembered.';
 if(l.key==='promise')return S.broken?'Another promise has outlasted its patience. A grievance remains.':'The promise is recorded. Payment will still be expected.';
 if(l.key==='execute')return 'The sentence is carried out. The dead man’s household survives it.';
 if(l.key==='pay')return 'Payment reaches the men who waited. The Crown has less in reserve.';
 if(l.key==='queen')return 'The queen’s household has gained your backing. Other servants have noticed.';
 if(l.key==='hastings')return 'Hastings can act with greater confidence—and a stronger following.';
 if(l.key==='gloucester')return 'Richard receives the charge. More men will now look to him.';
 if(l.key==='commission'||l.key==='warwick')return 'Warwick has your answer. Service has gained another claim.';
 if(l.key==='faith')return 'A sacred obligation now stands beside the royal command.';
 if(l.key==='council'||l.key==='joint')return 'The answer is witnessed. Its authority is shared with those who heard it.';
 if(l.key==='direct'||l.key==='assert')return 'The order leaves in your name. Its consequences will return to you.';
 if(l.key==='pardon')return 'The terms are accepted. Former enemies have a path into your peace.';
 if(l.key==='investigate')return 'Witnesses are summoned. The claim remains open until it is heard.';
 if(l.key==='settle')return 'The terms buy room to govern. They leave obligations for another day.';
 return 'Your answer is entered in the household record.';
}
function reactiveContext(c){
 if(c.person==='warwick'&&S.warwick< -12)return 'His trust has been worn down by earlier refusals.';
 if(c.person==='warwick'&&S.warwick>24)return 'Earlier concessions have made his expectation harder to refuse.';
 if(c.person==='elizabeth'&&S.woodville>24)return 'Your earlier favour has made her household a stronger claimant.';
 if(c.person==='elizabeth'&&S.woodville< -10)return 'Earlier exclusions have made this a question of personal trust.';
 if(c.person==='hastings'&&S.hastings>30)return 'You have given him the following that makes this offer possible.';
 if(c.person==='gloucester'&&S.gloucester>28)return 'Your commissions have given Richard a growing power of his own.';
 if(c.person==='merchant'&&S.broken>0)return 'Your broken promises make the creditor harder to reassure.';
 if(c.person==='captain'&&S.order<35)return 'Disorder in your household makes the command harder to carry out.';
 return '';
}
function setView(view){activeView=view;document.body.dataset.view=view;document.querySelectorAll('[data-view-button]').forEach(b=>{const active=b.dataset.viewButton===view;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});}
function paintCourt(){
 const groups=courtAt(),labels={at:S.date>=14701001&&S.date<14710411?'With Edward in exile':'Household & counsel',family:'The royal family',elsewhere:'Beyond the household'};
 $('allies').innerHTML=Object.entries(groups).map(([key,ids])=>'<div class="court-group"><h3>'+labels[key]+'</h3><div class="ally-grid">'+ids.map(id=>{const p=personAt(id);return '<button type="button" class="ally" data-person="'+id+'">'+portrait(p,true)+'<span><b>'+esc(p.short)+'</b><small>'+esc(p.office.replace(' · ',' / '))+'</small></span></button>';}).join('')+'</div></div>').join('');
 $('allies').querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>openProfile(b.dataset.person));
}
function factionLabels(){return {crown:'Royal household',neville:S.date>=14710414?'Former Neville affinity':'Neville affinity',queen:'Queen’s household',brothers:'Royal brothers',lancastrian:S.date>=14710522?'Lancastrian loyalties':'Lancastrian cause'};}
function paintFactions(){const labels=factionLabels(),active=Object.keys(labels).filter(k=>k!=='queen'||S.date>=14640515);
 $('factions').innerHTML=active.map(k=>'<div class="faction-row"><div><span>'+labels[k]+'</span><b>'+Math.round(S.factions[k])+'</b></div><div class="faction-meter" role="meter" aria-label="'+labels[k]+' reach" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+Math.round(S.factions[k])+'"><i style="width:'+S.factions[k]+'%"></i></div></div>').join('');
 const rival=active.filter(k=>k!=='crown').sort((a,b)=>S.factions[b]-S.factions[a])[0];text('factionBalance',S.factions[rival]>S.factions.crown+12?labels[rival]+' can rival the Crown’s reach.':'The Crown can still mediate between these interests.');
}
function paintMap(c){const where=courtLocation(c),coords={York:[263,270],Westminster:[284,359],London:[284,359],Grafton:[273,338],Reading:[272,361],Nottingham:[270,319],Middleham:[251,263],'Low Countries':[376,338],Aire:[340,391],Bruges:[358,370],Ravenspur:[286,278],Coventry:[260,335],Ludlow:[229,340],Calais:[334,397],Amiens:[347,436],Picquigny:[344,437],Windsor:[277,361]};
 const xy=coords[where]||[284,359];$('courtPin').setAttribute('cx',xy[0]);$('courtPin').setAttribute('cy',xy[1]);text('mapLocation',where);const origins=(c.documents||[]).map(id=>DOCUMENTS[id].origin).filter(origin=>origin!==where);text('mapNote','The household’s present horizon: '+where+'.'+(origins.length?' Papers received from '+origins.join(' and ')+'.':''));
}
function render(){
 if(S.ended||S.dead||S.deposed)return finish();
 updateDate();const c=scene(),p=personAt(c.person),act=ACTS[S.cycle];receiveDocuments(c);
 document.body.dataset.place=courtLocation(c).toLowerCase().replaceAll(' ','-');document.body.dataset.mood=c.mood;document.body.dataset.season=dateLabel(S.date).split(' ')[0].toLowerCase();CourtAudio.setMood(ACTS[S.cycle].tone);
 text('date',dateLabel(S.date));text('chapter','LOOP '+roman(S.cycle));text('actName',act.title);text('kicker',c.place);text('heading',c.title);text('role',p.name+' · '+p.office);paintIllustration('audienceArt',c.art,c.artAlt);CourtAudio.world(c.worldSound,'audience:'+S.cycle+':'+S.n);text('quote',c.quote);
 $('portrait').innerHTML=portrait(p);$('portrait').dataset.person=c.person;$('portrait').setAttribute('aria-label','Who is '+p.name+'?');
 const reactive=reactiveContext(c);text('context',c.context+(reactive?' '+reactive:'')+' '+depthContext(c));
 $('historyLink').hidden=!c.history;if(c.history){$('historyLink').textContent=NOTES[c.history][1];$('historyLink').onclick=()=>openHistory(c.history);}
 const inquiry=INQUIRIES[c.title],heard=!!(inquiry&&S.flags['heard:'+inquiry.id]),waiting=!!(inquiry&&!heard);
 $('inquiryStep').hidden=!inquiry;$('listenButton').hidden=heard;$('listenButton').textContent=inquiry?'Hear from '+inquiry.name:'';$('listenButton').onclick=hearInquiry;
 $('inquiryQuote').hidden=!heard;$('inquiryQuote').textContent=heard?'“'+inquiry.text.replace(/^“|”$/g,'')+'”':'';$('inquiryRole').hidden=!heard;$('inquiryRole').textContent=heard?inquiry.name+' · '+inquiry.role:'';
 $('choices').hidden=waiting;$('sealRail').hidden=waiting;
 $('choices').innerHTML=waiting?'':getChoices().map((o,j)=>'<button class="choice" type="button" data-choice="'+j+'"><span class="choice-number" aria-hidden="true">'+(j+1)+'</span><span class="choice-title">'+esc(o.t)+'</span><em>'+esc(o.d)+(Object.keys(choiceEffect(o)).length?'<small class="choice-impact">'+esc(effectText(choiceEffect(o)))+'</small>':'')+'</em></button>').join('');
 $('choices').querySelectorAll('button').forEach(b=>b.onclick=()=>choose(Number(b.dataset.choice)));
 text('objective',act.goal);text('mood',S.date>=14701001&&S.date<14710411?'An exiled household; a crown to recover.':S.authority<30?'Your authority is fragile.':S.order<30?'Orders travel farther than obedience.':'Authority held through personal bonds.');
 for(const [key,id] of [['authority','Authority'],['order','Order'],['succession','Succession']]){const n=Math.round(S[key]);text('quick'+id,n);$('quick'+id+'Bar').style.width=S[key]+'%';$('quick'+id+'Meter').setAttribute('aria-valuenow',n);}
 for(const [key,id] of [['bond','mBond'],['dynasty','mDynasty'],['faith','mFaith'],['power','mPower']]){$(id).style.width=S.meaning[key]+'%';text(id+'N',Math.round(S.meaning[key]));}
 text('promises',S.open+' awaiting fulfilment · '+S.broken+' broken');text('cycleText',S.n+' / '+actLength()+' audiences in this loop');$('cycleBar').style.width=(S.n/actLength()*100)+'%';
 $('chronicle').innerHTML=S.log.slice(-8).reverse().map(x=>'<li><small>'+dateLabel(x.date)+'</small><b>'+esc(x.title)+'</b><span>'+esc(x.choice)+'</span></li>').join('')||'<li>The first page has yet to be written.</li>';
 text('lastDecision',consequence());$('lastDecision').hidden=!S.last;
 paintCourt();paintFactions();paintMap(c);paintDocuments(c);paintDepth(c);syncSaveControls();
 $('card').classList.remove('arriving');void $('card').offsetWidth;$('card').classList.add('arriving');
}
async function choose(index){
 if(choosing||S.ended||document.querySelector('dialog[open]')||!started)return;
 const current=scene(),inquiry=INQUIRIES[current.title];if(inquiry&&!S.flags['heard:'+inquiry.id])return;
 const c=current,o=getChoices()[index];if(!o)return;choosing=true;CourtAudio.ui('decision');
 const selected=$('choices').querySelector('[data-choice="'+index+'"]');if(selected){selected.classList.add('chosen');$('choices').querySelectorAll('button').forEach(b=>b.disabled=true);}
 await new Promise(resolve=>setTimeout(resolve,matchMedia('(prefers-reduced-motion: reduce)').matches?80:460));
 applyChoice(o,c);
 if(S.dead||S.deposed){S.ended=true;finish();choosing=false;return;}
 S.n++;
 if(S.n===actLength()){
  if(S.cycle===ACTS.length-1){S.date=Math.max(14710522,S.date);S.year=1471;S.ended=true;finish();choosing=false;return;}
  const recap=makeRecap();S.cycle++;S.n=0;prepareAct();updateDate();receiveDocuments();S.actStart={authority:S.authority,order:S.order,succession:S.succession};persistAct(true);render();showAct(recap);
 }else{render();persistAct(true);if(scene().events)showStories(scene().events);else focusAudience();}
 choosing=false;
}
function focusAudience(){setView('audience');$('heading').focus({preventScroll:true});if(matchMedia('(max-width:800px)').matches)$('audience').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}
function makeRecap(){const completed=actLength(),recent=S.log.slice(-completed),keys=['authority','order','succession'],labels={authority:'authority',order:'order',succession:'succession'};
 const shifts=keys.map(k=>({k,d:S[k]-S.actStart[k]})).sort((a,b)=>Math.abs(b.d)-Math.abs(a.d));const shift=shifts[0],trend=Math.abs(shift.d)<3?'The Crown’s position remains closely balanced.':'Your '+labels[shift.k]+' has '+(shift.d>0?'strengthened':'weakened')+' through this period.';
 const key=recent.filter(x=>['queen','warwick','hastings','gloucester','clarence','execute','promise'].includes(x.key)).at(-1);const stories=loopThreadCount(S);return 'This loop closes after '+completed+' audiences. '+trend+' '+(key?'The court remembers: “'+key.choice+'.”':'The obligations you accepted carry into the next court.')+(S.open?' '+S.open+' promises still await fulfilment.':'')+' The next loop will draw '+stories+' connected stories from the tensions and loyalties you leave behind.';
}
function showAct(recap=''){const a=ACTS[S.cycle];paintIllustration('actArt',a.art,a.artAlt);$('actBanner').hidden=!!a.art;text('actEyebrow','COURT LOOP '+roman(S.cycle)+' · '+a.years);text('actTitle',a.title);text('actIntro',a.intro);text('actGoal',a.goal);text('actRecap',recap);$('actRecap').hidden=!recap;$('actChanges').innerHTML=a.changes.map(s=>'<li>'+esc(s)+'</li>').join('');const saved=getSaved();text('actSaveStatus',saveError?'Saving is unavailable. Keep this page open to continue.':saved?.cycle===S.cycle?'This audience is saved.':'Save this loop’s opening before entering.');openDialog('actDialog');CourtAudio.setMood(a.tone);}
let storyQueue=[];
function showStories(events){storyQueue=events.map(e=>({...e}));paintStory();openDialog('storyDialog');}
function paintStory(){const c=storyQueue[0];paintIllustration('storyArt',c.art,c.artAlt);CourtAudio.setMood(ACTS[S.cycle].tone);CourtAudio.world(c.worldSound,'story:'+c.title);text('storyDate',c.date);text('storyTitle',c.title);text('storyText',c.text);$('storyNext').textContent=storyQueue.length>1?'Continue':'Return to the audience';$('storyNote').hidden=!c.history;$('storyNote').onclick=()=>openHistory(c.history);}
function openDialog(id,sound=true){const dialog=$(id);dialog.returnFocus=document.activeElement;dialog.showModal();if(sound)CourtAudio.ui();}
function closeDialog(id){$(id).close();if(id!=='documentDialog')CourtAudio.ui();}
function openProfile(id){const p=personAt(id);$('profileEmblem').innerHTML=portrait(p);text('profileOffice',p.office);text('profileName',p.name);text('profileText',p.bio);let standing=p.status;
 const key={warwick:'warwick',elizabeth:'woodville',hastings:'hastings',gloucester:'gloucester',clarence:'clarence'}[id];if(key&&p.alive&&!(id==='elizabeth'&&S.date<14640515)&&!(id==='gloucester'&&S.date<14690101))standing+=' · '+relation(S[key]);text('profileStanding',standing);openDialog('personDialog');}
function openHistory(id){const h=NOTES[id];text('historyPopupDate',h[0]);text('historyPopupTitle',h[1]);text('historyPopupText',h[2]);text('historyPopupSource','Read the source · '+h[3]);$('historyPopupSource').href=h[4];openDialog('historyDialog');}
function validSave(v){
 const scores=['authority','order','succession'],meaning=['bond','dynasty','faith','power'],factions=['crown','neville','queen','brothers','lancastrian'];
 const within=n=>Number.isFinite(n)&&n>=0&&n<=100,str=x=>typeof x==='string'&&x.length<12000;
 if(!v||v.version!==VERSION||!Number.isInteger(v.cycle)||v.cycle<0||v.cycle>=ACTS.length||!Number.isInteger(v.n)||v.n<0||!validItinerary(v)||v.n>=actLength(v.cycle,v))return false;
 const count=decisionsBefore(v.cycle,v)+v.n;
 return !!(v.date===campaignScenes(v.cycle,v)[v.n].date&&v.year===Math.floor(v.date/10000)&&!v.dead&&!v.deposed&&!v.ended&&
  scores.every(k=>within(v[k]))&&v.meaning&&meaning.every(k=>within(v.meaning[k]))&&v.factions&&factions.every(k=>within(v.factions[k]))&&
  ['warwick','woodville','hastings','gloucester','clarence'].every(k=>Number.isFinite(v[k])&&Math.abs(v[k])<=60)&&['open','broken','harsh','executions','risk'].every(k=>Number.isFinite(v[k])&&v[k]>=0)&&
  Array.isArray(v.log)&&v.log.length===count&&v.log.every((l,i)=>{const c=SCENES.flatMap((_,a)=>campaignScenes(a,v))[i],q=INQUIRIES[c.title];return l&&l.date===c.date&&l.title===c.title&&str(l.choice)&&ACTION[l.key]&&(c.choices.some(o=>o.k===l.key&&o.t===l.choice)||q?.response.k===l.key&&q?.response.t===l.choice);})&&
  v.flags&&typeof v.flags==='object'&&!Array.isArray(v.flags)&&Object.keys(v.flags).length<400&&Object.values(v.flags).every(x=>typeof x==='boolean'||Number.isFinite(x))&&
  v.actStart&&scores.every(k=>within(v.actStart[k]))&&validDocumentHistory(v)&&
  v.realm&&REALM_KEYS.every(k=>within(v.realm[k]))&&v.regions&&['north','midlands','wales','london','channel'].every(k=>within(v.regions[k]))&&
  v.journey===null&&Array.isArray(v.council)&&v.council.length<=8&&v.council.every(l=>l&&Number.isInteger(l.act)&&l.act>=0&&l.act<=v.cycle&&INITIATIVES.some(i=>i.id===l.id)&&str(l.title)&&str(l.result))&&
  Array.isArray(v.ledger)&&v.ledger.length<=40&&v.ledger.every(l=>l&&str(l.cause)&&str(l.changes)&&Number.isInteger(l.date)));
}
function getSaved(){try{const v=JSON.parse(localStorage.getItem(SAVE_KEY));if(v?.version===4)v.version=5;if(v&&v.clarence===undefined)v.clarence=4;return validSave(v)?v:null;}catch{return null;}}
function persistAct(silent=false){if(S.ended||S.journey)return false;try{localStorage.setItem(SAVE_KEY,JSON.stringify(S));saveError=false;syncSaveControls();text('saveStatus','Reign saved · '+dateLabel(S.date)+' · '+(S.n+1)+' / '+actLength());text('actSaveStatus','This audience is saved.');return true;}catch{saveError=true;text('saveStatus','Storage is unavailable in this browser.');text('actSaveStatus','Storage is unavailable. Keep this page open to continue.');return false;}}
function syncSaveControls(){const saved=getSaved();$('saveAct').disabled=S.ended;$('loadAct').disabled=!saved;$('resumeGame').hidden=!saved;if(saved)$('resumeGame').textContent='Load loop '+roman(saved.cycle)+' · '+ACTS[saved.cycle].years;text('saveStatus',saveError?'Storage unavailable; keep this page open.':'Autosaved after each decision. Manual save keeps this audience.');}
function loadAct(){const saved=getSaved();if(!saved)return;Object.assign(S,fresh(),saved,{documents:saved.documents||[],itinerary:saved.itinerary||null});if(saved.routeVersion!==2&&saved.routeVersion!==3){S.routeVersion=1;S.coreItinerary=null;}unfoldedDocuments.clear();started=true;enterGame();render();if(S.n===0)showAct('You return to the saved opening of this loop.');else{if(scene().events)showStories(scene().events);else focusAudience();}}
function enterGame(){$('gameGate').hidden=true;$('gameWrap').hidden=false;$('end').hidden=true;$('game').hidden=false;$('liveReturn').hidden=false;setView('audience');}
function startNew(){Object.assign(S,fresh());prepareAct();unfoldedDocuments.clear();started=true;enterGame();render();persistAct(true);showAct();}
function returnToTitle(){CourtAudio.stopWorld();$('gameWrap').hidden=true;$('gameGate').hidden=false;$('liveReturn').hidden=!started;syncSaveControls();$('liveReturn').hidden=!started;$('newGame').focus();}
function finish(){CourtAudio.stopWorld();
 $('game').hidden=true;$('end').hidden=false;setView('audience');
 const dead=S.dead,deposed=S.deposed;const title=dead?'The king is killed':deposed?'A crown surrendered':'The crown regained';
 const desc=dead?'The untested opening has ended Edward’s life. His household survives him with the debts, loyalties and quarrels of this reign.':deposed?'Edward accepts safe conduct and yields the throne in 1469. The king lives; the authority you inhabited passes to other hands.':'May 1471. You have returned from exile and recovered your crown. Warwick and Henry VI are dead. Your son lives, your household gathers again, and the people who served you bring their claims into the peace.';
 text('endTitle',title);text('endText',desc);text('endDate',dead||deposed?dateLabel(S.date):'WESTMINSTER · MAY 1471');
 const labels=factionLabels(),lead=Object.keys(S.factions).sort((a,b)=>S.factions[b]-S.factions[a])[0];
 const count=keys=>S.log.filter(l=>keys.includes(l.key)).length;
 const signatures=[
  [count(['queen'])*1.15,'A king who made family a centre of government.'],
  [count(['hastings','commission','warwick'])*1.25,'A king who governed through powerful personal servants.'],
  [count(['gloucester'])*1.5,'A king who entrusted power to his blood.'],
  [count(['direct','assert','mobilize']),'A king who made his own command the centre of rule.'],
  [count(['council','joint','investigate'])+count(['faith'])*.4,'A king who bound decisions to witnesses and shared obligations.']
 ].sort((a,b)=>b[0]-a[0]);
 const style=S.harsh>=5?'A king whose commands carried fear.':S.broken>=4?'A king whose promises outgrew their means.':signatures[0][1];
 text('signature',style+' '+labels[lead]+' held the greatest reach at the close.');text('endLegacy',S.flags.escaped?'You escaped confinement through a household you had helped to build. The return has given that service a lasting claim.':S.open?'The crown is restored. '+S.open+' promises still wait to be fulfilled. A second reign begins with the obligations of the first.':'The crown is restored. The loyalties you cultivated will now have to sustain its peace. A second reign begins.');
 if(!dead&&!deposed)text('endLegacy',depthEnding());
 $('endRecord').innerHTML=S.log.slice(-5).map(l=>'<li><b>'+esc(l.title)+'</b><span>'+esc(l.choice)+'</span></li>').join('');CourtAudio.setMood('reflection');$('endTitle').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
}
// Horizontal swipes are optional; vertical movement belongs to page scrolling.
let drag=null;
function resetDrag(){drag=null;$('sealKnob').style.transform='';$('card').style.transform='';}
function bindSwipe(surface,moveCard=false){
 surface.addEventListener('pointerdown',e=>{if(e.button!==0||moveCard&&e.target.closest('button,a,input,summary,#sealRail'))return;drag={x:e.clientX,y:e.clientY,id:e.pointerId,surface};if(moveCard)$('card').classList.remove('arriving');surface.setPointerCapture(e.pointerId);});
 surface.addEventListener('pointermove',e=>{if(!drag||drag.surface!==surface)return;const dx=e.clientX-drag.x;if(Math.abs(e.clientY-drag.y)>30){resetDrag();return;}if(moveCard)$('card').style.transform='translateX('+Math.max(-24,Math.min(24,dx/4))+'px) rotate('+Math.max(-1,Math.min(1,dx/100))+'deg)';else $('sealKnob').style.transform='translateX('+Math.max(-75,Math.min(75,dx))+'px)';});
 surface.addEventListener('pointerup',e=>{if(!drag||drag.surface!==surface)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;resetDrag();if(Math.abs(dx)>65&&Math.abs(dy)<30)choose(dx<0?0:1);});
 surface.addEventListener('pointercancel',resetDrag);
}
bindSwipe($('sealRail'));bindSwipe($('card'),true);
$('card').addEventListener('animationend',()=>$('card').classList.remove('arriving'));
document.querySelectorAll('[data-view-button]').forEach(b=>b.onclick=()=>{CourtAudio.ui();setView(b.dataset.viewButton);});
document.querySelector('[role=tablist]').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const views=['audience','realm','court'],i=views.indexOf(activeView);setView(views[(i+(e.key==='ArrowRight'?1:2))%3]);document.querySelector('[aria-selected=true]').focus();});
document.addEventListener('keydown',e=>{if(e.repeat||e.altKey||e.ctrlKey||e.metaKey||document.querySelector('dialog[open]')||$('gameWrap').hidden||S.ended)return;if(/^[123]$/.test(e.key)&&!['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))choose(Number(e.key)-1);});
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('close',()=>{if(d.returnFocus?.isConnected&&!d.returnFocus.closest('[hidden]'))d.returnFocus.focus({preventScroll:true});}));
$('documentUnfold').onclick=unfoldDocument;
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closeDialog(b.dataset.close));
$('storyNext').onclick=()=>{CourtAudio.ui();storyQueue.shift();if(storyQueue.length)paintStory();else{CourtAudio.stopWorld();closeDialog('storyDialog');CourtAudio.setMood(ACTS[S.cycle].tone);focusAudience();}};
$('storyDialog').addEventListener('cancel',e=>{e.preventDefault();$('storyNext').click();});
$('portrait').onclick=()=>openProfile($('portrait').dataset.person);
$('listenButton').onclick=hearInquiry;
$('newGame').onclick=()=>{CourtAudio.unlock();if(started||getSaved())openDialog('newDialog');else openDialog('introDialog');};
$('confirmNew').onclick=()=>{closeDialog('newDialog');openDialog('introDialog');};
$('beginReign').onclick=()=>{closeDialog('introDialog');startNew();};
$('enterAct').onclick=()=>{closeDialog('actDialog');CourtAudio.setMood(ACTS[S.cycle].tone);focusAudience();};
$('actDialog').addEventListener('cancel',()=>{CourtAudio.setMood(ACTS[S.cycle].tone);setTimeout(focusAudience,0);});
$('actSave').onclick=()=>{persistAct();CourtAudio.ui('decision');};
$('saveAct').onclick=()=>{persistAct();CourtAudio.ui('decision');};
$('loadAct').onclick=()=>{text('loadWarning','Return to your most recent saved audience? Unsaved council business will be lost.');openDialog('loadDialog');};
$('confirmLoad').onclick=()=>{closeDialog('loadDialog');loadAct();};
$('resumeGame').onclick=()=>{CourtAudio.unlock();loadAct();};
$('liveReturn').onclick=()=>{enterGame();if(S.ended)finish();else render();};
$('menuButton').onclick=()=>openDialog('menuDialog');
$('brandMark').onclick=e=>{e.preventDefault();returnToTitle();};
$('titleButton').onclick=()=>{closeDialog('menuDialog');returnToTitle();};
$('restart').onclick=()=>{closeDialog('menuDialog');openDialog('newDialog');};
$('again').onclick=()=>openDialog('newDialog');
$('musicToggle').onclick=()=>CourtAudio.toggle();$('titleMusic').onclick=()=>CourtAudio.toggle();$('settingsMusic').onclick=()=>CourtAudio.toggle();
$('worldSoundToggle').onclick=()=>CourtAudio.toggleWorld();$('worldVolume').oninput=e=>CourtAudio.setWorldVolume(Number(e.target.value)/100);
$('soundToggle').onclick=()=>CourtAudio.toggleSfx();$('volume').oninput=e=>CourtAudio.setVolume(Number(e.target.value)/100);
$('settingsButton').onclick=()=>{closeDialog('menuDialog');openDialog('settingsDialog');};$('titleSettings').onclick=()=>openDialog('settingsDialog');
CourtAudio.subscribe(a=>{for(const id of ['musicToggle','titleMusic','settingsMusic']){$(id).textContent=a.status==='loading'?'Loading music…':a.status==='unavailable'?'Retry music':a.on?'Music on':'Music off';$(id).setAttribute('aria-pressed',String(a.on));}text('worldSoundToggle',a.worldEnabled?'Battle & world sounds on':'Battle & world sounds off');$('worldSoundToggle').setAttribute('aria-pressed',String(a.worldEnabled));$('worldVolume').value=Math.round(a.worldVolume*100);text('worldAudioStatus',a.worldStatus==='unavailable'?'World sounds could not load. Toggle them off and on to retry.':'Recorded battle and muster effects · separate from music and interface sounds.');text('soundToggle',a.sfx?'Interface sounds on':'Interface sounds off');$('soundToggle').setAttribute('aria-pressed',String(a.sfx));$('volume').value=Math.round(a.volume*100);text('audioStatus',a.status==='unavailable'?'The acoustic recordings could not load. Check your connection and retry.':a.status==='loading'?'Loading the acoustic recordings…':a.on?'Acoustic harp · recorder · frame drum':'Music waits for you.');});
syncSaveControls();$('newGame').focus();

initDepth();
