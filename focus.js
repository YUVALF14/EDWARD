/* EDWARD — Focused Reading (experimental accessibility layer).
 * 36 individually authored plain-language interpretations + 4 crossovers.
 * Original dialogue, context, sources, choice labels and simulation remain intact.
 * No story facts are inferred from hidden actor state.
 */
const EDWARD_FOCUS_SCENES={
 'neville:counsel':{
  line:'My men helped win your crown. Will you let me lead them in the North?',
  stake:'Warwick wants authority, not just thanks.',choices:['Give Warwick limited power','Keep control at court']},
 'neville:seal':{
  line:'France and Burgundy are hearing different promises. Which one speaks for you?',
  stake:'Your Chancellor is Warwick’s brother. He must sign the answer.',choices:['Set one public policy','Use your own envoys']},
 'neville:clients':{
  line:'Warwick and Hastings both want to appoint your officers. Someone will lose out.',
  stake:'Jobs and payments keep noble households loyal.',choices:['Protect existing officers','Let Hastings replace them']},
 'neville:affinity':{
  line:'Two armed groups claim to act for you. The market has shut in fear.',
  stake:'Local rivalries could become violence.',choices:['Make both sides answer','Let one household restore order']},
 'neville:terms':{
  line:'My followers fear they no longer have a place beside you. Can we make a deal?',
  stake:'Warwick’s loyalty depends on what you do next.',choices:['Negotiate with witnesses','Demand his submission']},
 'neville:reckoning':{
  line:'Warwick’s captains want their lands secured. How much can you forgive?',
  stake:'Peace today may limit your power tomorrow.',choices:['Offer conditional pardons','Judge each captain separately']},
 'woodville:petition':{
  line:'Must my family be punished simply because I am your queen?',
  stake:'Giving the queen’s kin power may anger other nobles.',choices:['Give Anthony a limited office','Send requests to the Council']},
 'woodville:marriage':{
  line:'A wealthy child is promised in marriage, but two families claim the right to decide.',
  stake:'Marriage can transfer land and create enemies.',choices:['Check the legal claim first','Allow the private marriage']},
 'woodville:chamber':{
  line:'Petitioners are going to the queen instead of your officials. Who speaks for the Crown?',
  stake:'Access to the king is a form of power.',choices:['Create one public register','Keep separate royal channels']},
 'woodville:charter':{
  line:'You have promised the same income to two people. The treasury cannot pay both.',
  stake:'One broken promise could cost you an ally.',choices:['Honour the older promise','Pay the queen’s family']},
 'woodville:wardship':{
  line:'A young heir needs protection. His family also wants control of his lands.',
  stake:'Caring for a child and taking his income are different powers.',choices:['Separate care from income','Give both to the queen']},
 'woodville:reckoning':{
  line:'My family has served you. Why are our rewards treated as crimes?',
  stake:'The queen’s family wants its position secured.',choices:['Review all royal grants','Protect the queen’s grants']},
 'north:title':{
  line:'My men kept the North safe. Now the Percys want their old lands back.',
  stake:'Two powerful families claim the same influence.',choices:['Investigate both claims','Back Montagu for now']},
 'north:rents':{
  line:'Two lords demand rent from the same farmers. They cannot pay twice.',
  stake:'Ordinary families are caught between rival nobles.',choices:['Stop payments and investigate','Let the current lord collect']},
 'north:earldom':{
  line:'Can the Percy family regain its old title without taking everything from Montagu?',
  stake:'Restoring one family may turn another against you.',choices:['Restore Percy, repay Montagu','Keep Montagu in place']},
 'north:castle':{
  line:'My soldiers obey you, but another lord pays them. Who should hold the castle?',
  stake:'Who pays the garrison may control the gate.',choices:['Pay the soldiers yourself','Leave the castle with its lord']},
 'north:oath':{
  line:'Villagers have sworn loyalty to rival houses. Whose promise should count?',
  stake:'A lasting peace needs rules people can trust.',choices:['Hold an open royal hearing','Let the nobles make a deal']},
 'north:legacy':{
  line:'The North is calmer. But who will command it when your heir takes the throne?',
  stake:'Today’s settlement will shape the next reign.',choices:['Keep royal control of sheriffs','Let noble houses choose']},
 'caister:will':{
  line:'My family inherited Caister Castle. The Duke of Norfolk says it belongs to him.',
  stake:'A will and an army offer different kinds of power.',choices:['Examine the documents','Let Norfolk settle the claim']},
 'caister:rents':{
  line:'The duke is taking our rents. We may soon be unable to feed the castle guards.',
  stake:'A legal dispute is becoming a fight for survival.',choices:['Protect the harvest','Let rent collection continue']},
 'caister:muster':{
  line:'Armed men are gathering outside Caister. Will you stop a siege?',
  stake:'The castle may be taken before a court can decide.',choices:['Send a royal peace force','Leave the rivals to settle it']},
 'caister:gate':{
  line:'Your order holds the castle for now. But the guards still need paying.',
  stake:'A royal command means little without money.',choices:['Pay a royal garrison','Make a quick compromise']},
 'caister:widow':{
  line:'We have spent years waiting for justice. How much longer must my family suffer?',
  stake:'Delay can ruin a family even without a battle.',choices:['Set a final deadline','Try private talks again']},
 'caister:patent':{
  line:'Norfolk is gone, but his heirs still claim the castle. Can you end the dispute?',
  stake:'A written settlement may finally secure the peace.',choices:['Issue a final royal ruling','Share the disputed income']},
 'diplomacy:wool':{
  line:'French merchants offer us a better route. Must trade suffer because kings disagree?',
  stake:'Calais brings England money and political leverage.',choices:['Keep the Burgundian route','Explore French trade']},
 'diplomacy:embassy':{
  line:'You sent me to speak with France. Why are other envoys making promises behind my back?',
  stake:'Warwick may feel that you no longer trust him.',choices:['Give Warwick clear limits','Use private envoys']},
 'diplomacy:letters':{
  line:'Two royal letters promise different things. Merchants do not know which to trust.',
  stake:'Contradictory promises weaken your authority.',choices:['Correct the letters openly','Withdraw the older promise']},
 'diplomacy:captains':{
  line:'Burgundy offers protection for soldiers. France offers safe passage for peaceful ships.',
  stake:'Your next voyage may choose a side in Europe.',choices:['Defend Calais and its trade','Prepare a military expedition']},
 'diplomacy:picquigny':{
  line:'France offers money and peace instead of another campaign. Will you accept?',
  stake:'Peace may strengthen the treasury; war may win prestige.',choices:['Negotiate payments and peace','Keep military pressure']},
 'diplomacy:account':{
  line:'We cannot pay every captain and give merchants the relief they want.',
  stake:'Past promises are coming due.',choices:['Pay verified debts openly','Keep money for royal allies']},
 'succession:brother':{
  line:'I am your brother. Do I have a place in your plans, or must I find my own allies?',
  stake:'Clarence is family—and a potential rival.',choices:['Give him a limited estate','Let him seek other allies']},
 'succession:marriage':{
  line:'I want to marry into the Neville family. Will you allow it?',
  stake:'Clarence’s marriage could shift the balance of power.',choices:['Approve with a loyalty oath','Offer another arrangement']},
 'succession:estates':{
  line:'Clarence and Gloucester both claim parts of the same inheritance.',
  stake:'A family dispute could become a political crisis.',choices:['Divide the land in court','Settle it by royal order']},
 'succession:charges':{
  line:'There are rumours Clarence is building his own following. We have no firm proof.',
  stake:'Accusation is not the same as guilt.',choices:['Investigate the rumours','Demand Clarence submit']},
 'succession:heir':{
  line:'Who should raise and protect the next ruler of England?',
  stake:'Control of the royal household may become control of the throne.',choices:['Share the responsibilities','Trust one household']},
 'succession:guardians':{
  line:'If you die, who will protect the throne—and control the treasury?',
  stake:'A succession plan must work after you are gone.',choices:['Agree on a Council plan','Trust one powerful household']},
 'cross:two_doors':{
  line:'The queen’s clerks and Warwick’s men give different answers in your name.',
  stake:'Two separate routes to the king have become one crisis.',choices:['Use one public register','Keep separate royal audiences']},
 'cross:northern_writ':{
  line:'Your order cannot reach the North without the help of a rival noble house.',
  stake:'A royal command needs someone willing to enforce it.',choices:['Send your own paid men','Ask Montagu to deliver it']},
 'cross:empty_chest':{
  line:'Two garrisons have your promise of wages. You can pay only one.',
  stake:'Earlier military commitments have emptied the treasury.',choices:['Pay the soldiers at home','Pay the Channel captains']},
 'cross:two_guardians':{
  line:'Two guardians have been given power over the same estate and its income.',
  stake:'Earlier promises now clash over a child’s future.',choices:['Separate the responsibilities','Keep one guardian in charge']}
};
const EDWARD_READING_LEVELS=['focus','story','full'];
const EDWARD_READING_KEY='edward_reading_level_v1';
let edwardReadingLevel='focus';
try{const value=localStorage.getItem(EDWARD_READING_KEY);if(EDWARD_READING_LEVELS.includes(value))edwardReadingLevel=value;}catch(e){}
function edwardSentenceSummary(raw,max=190){
 const text=String(raw||'').trim();if(text.length<=max)return text;
 const sentences=text.match(/[^.!?]+[.!?]+(?:["”']|$)?/g)||[];
 if(!sentences.length)return text.slice(0,max).replace(/\s+\S*$/,'').trim()+'…';
 const first=sentences[0].trim(),last=sentences[sentences.length-1].trim();
 if(first.length<=max*.67&&last!==first&&/[?]$/.test(last)&&first.length+last.length+1<=max)return first+' '+last;
 if(first.length<=max)return first;
 const split=first.match(/^.{60,170}?[;,]/);if(split)return split[0].replace(/[;,]$/,'')+'…';
 return first.slice(0,max).replace(/\s+\S*$/,'').trim()+'…';
}
function edwardFocusData(){if(!current)return null;const n=current,detail=arena?n[arena]:null;
 const key=n.storyInfo?(n.storyInfo.id.startsWith('cross:')?n.storyInfo.id:n.storyInfo.id+':'+(SE_STORIES[n.storyInfo.id]?.beats[n.storyInfo.step-1]?.id||'')):null;
 const authored=key?EDWARD_FOCUS_SCENES[key]:null;
 const fullQuote=String(detail?detail.quote:fmt(n.quote,world));
 const fullContext=String(detail?'You have changed who hears this matter. A decision is still required.':fmt(n.context,world));
 const latest=world.reports.slice(-1)[0];
 const original=detail||n;
 const focus=arena?edwardSentenceSummary(fullQuote,175):authored?.line||edwardSentenceSummary(fullQuote,175);
 const stake=arena?'This hearing changes who hears the case, not the decision you must make.':authored?.stake||edwardSentenceSummary(fullContext,145);
 return {key,authored,fullQuote,fullContext,focus,stake,latest,original};
}
function edwardLinkedOrEscaped(s){return typeof edwardLinkedText==='function'?edwardLinkedText(s):E(s);}
function edwardPlainRole(role){return String(role||'')
 .replace(/principal magnate/gi,'powerful noble ally')
 .replace(/the Great Seal/gi,'official royal documents')
 .replace(/Exchequer/gi,'royal treasury')
 .replace(/Chancery/gi,'royal records')
 .replace(/wardship/gi,'guardianship')
 .replace(/affinity/gi,'group of followers')
 .replace(/constable/gi,'castle commander')
 .replace(/justice of the peace/gi,'local judge')
 .replace(/royal commission/gi,'royal assignment');}

function edwardReadingRender(){
 const card=document.getElementById('card');if(!card||!current)return;
 const d=edwardFocusData();if(!d)return;
 const q=card.querySelector('.quote'),ctx=card.querySelector('.context'),bar=document.getElementById('tapActions'),roleNode=card.querySelector('.role');
 if(!q||!ctx)return;
 const isFocus=edwardReadingLevel==='focus',isFull=edwardReadingLevel==='full';
 const quote=isFocus?d.focus:d.fullQuote;
 if(roleNode){const role=arena&&current[arena]?current[arena].role:current.role;roleNode.textContent=isFocus?edwardPlainRole(role):role;}
 q.innerHTML='“'+edwardLinkedOrEscaped(quote)+'”';
 const context=isFull?d.fullContext:d.stake;
 const latest=isFull&&d.latest&&world.turn-d.latest.turn<=2?'<div class="quiet-report">LATEST REPORT · '+E(d.latest.from)+': '+E(d.latest.text)+'</div>':'';
 ctx.innerHTML='<b>'+(isFull?'What Edward knows':isFocus?'The stakes':'Why it matters')+'</b>'+edwardLinkedOrEscaped(context)+latest;
 card.classList.remove('reading-focus','reading-story','reading-full');card.classList.add('reading-'+edwardReadingLevel);
 let tools=card.querySelector('.reading-tools');if(!tools){tools=document.createElement('div');tools.className='reading-tools';tools.addEventListener('pointerdown',e=>e.stopPropagation());ctx.after(tools);}
 tools.innerHTML='<button type="button" id="readingMore" aria-label="Explore the full hearing and historical context">Read more <span aria-hidden="true">↗</span></button><button type="button" class="reading-level-btn" id="readingLevelBtn" aria-label="Switch reading level">'+E(edwardReadingLevel.toUpperCase())+' ▾</button>';
 tools.querySelector('#readingMore').onclick=e=>{e.preventDefault();e.stopPropagation();edwardReadingMore();};
 tools.querySelector('#readingLevelBtn').onclick=e=>{e.preventDefault();e.stopPropagation();edwardReadingCycle();};
 if(bar){const buttons=bar.querySelectorAll('[data-choice]');buttons.forEach(b=>{const side=b.dataset.choice;
  if((side==='left'||side==='right')&&isFocus&&d.authored&&!arena){b.textContent=(side==='left'?'← ':'')+d.authored.choices[side==='left'?0:1]+(side==='right'?' →':'');}
  else if(side==='left'||side==='right'){b.textContent=(side==='left'?'← ':'')+d.original[side].label+(side==='right'?' →':'');}
  else if(side==='wait'&&isFocus){b.textContent='⌛ Wait for evidence · costs time';}
 });}
 const header=app.querySelector('.header-actions');if(header){let btn=header.querySelector('#readingToggle');if(!btn){btn=document.createElement('button');btn.type='button';btn.id='readingToggle';btn.className='reading-toggle';btn.textContent='Aa';header.appendChild(btn);btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();edwardReadingCycle();});}
 btn.title='Reading: '+edwardReadingLevel+'. Tap for next level';btn.setAttribute('aria-label','Reading mode '+edwardReadingLevel+'. Switch reading level');btn.setAttribute('aria-pressed',isFull?'true':'false');}
}
function edwardReadingCycle(){const i=EDWARD_READING_LEVELS.indexOf(edwardReadingLevel);edwardReadingLevel=EDWARD_READING_LEVELS[(i+1)%EDWARD_READING_LEVELS.length];try{localStorage.setItem(EDWARD_READING_KEY,edwardReadingLevel);}catch(e){}edwardReadingRender();}
const EDWARD_GLOSSARY={
 'Great Seal':'The official seal used to authorize important royal documents.',
 'Chancellor':'The senior officer who oversees the king’s formal documents and seal.',
 'wardship':'The right to care for a young heir, often together with control of their property.',
 'patronage':'Jobs, land or favours granted to build political loyalty.',
 'affinity':'The network of servants and supporters attached to a powerful lord.',
 'commission':'A written order giving someone a defined task or authority.',
 'garrison':'Soldiers stationed to defend a castle or town.',
 'assize':'A formal court hearing held by royal judges.',
 'writ':'A formal written command issued under royal authority.',
 'Exchequer':'The part of government responsible for royal finances.',
 'regency':'Government carried out on behalf of a monarch who cannot rule personally.',
 'charter':'A formal document recording rights, grants or privileges.',
 'earldom':'The title, status and often lands of an earl.'
};
function edwardReadingMore(){const d=edwardFocusData();if(!d)return;
 const card=current;
 const triggers=card.storyInfo?.trigger;
 const glossary=Object.entries(EDWARD_GLOSSARY).filter(([word])=>new RegExp('\\b'+word+'\\b','i').test(d.fullQuote+' '+d.fullContext+' '+d.original.left.label+' '+d.original.right.label));
 const history=card.caseInfo;
 const source=history?.source?'<p><a href="'+E(history.source)+'" target="_blank" rel="noopener noreferrer">Historical reference ↗</a></p>':'';
 const background=history?.anchor?'<p>'+E(history.anchor)+'</p>':'<p>This is a dramatized situation drawn from the game’s historical and political simulation. The speech and alternatives are not archival quotations.</p>';
 const latest=d.latest&&world.turn-d.latest.turn<=2?'<div class="row"><b>Latest report</b><span>'+E(d.latest.from)+': '+E(d.latest.text)+'</span></div>':'';
 const why=triggers?'<div class="row"><b>Why this happened now</b><span>'+E(triggers)+'</span></div>':'';
 const originalChoices='<div class="row"><b>Choice A</b><span>'+E(d.original.left.label)+'</span></div><div class="row"><b>Choice B</b><span>'+E(d.original.right.label)+'</span></div>'+(card.wait&&!arena?'<div class="row"><b>Wait for more evidence</b><span>'+E(card.wait.label)+' · This choice appears later and has a political cost.</span></div>':'');
 const html='<div class="reading-summary"><div class="eyebrow">IN PLAIN LANGUAGE</div><p>'+edwardLinkedOrEscaped(d.focus)+'</p><div class="reading-stakes">'+edwardLinkedOrEscaped(d.stake)+'</div></div>'+
 '<details class="reading-detail" open><summary>Full testimony <span>the original dialogue</span></summary><div class="reading-detail-body"><p>“'+edwardLinkedOrEscaped(d.fullQuote)+'”</p>'+originalChoices+'</div></details>'+
 '<details class="reading-detail"><summary>Political context <span>what Edward knows</span></summary><div class="reading-detail-body"><p>'+edwardLinkedOrEscaped(d.fullContext)+'</p>'+why+latest+'</div></details>'+
 (glossary.length?'<details class="reading-detail"><summary>Unfamiliar terms <span>'+glossary.length+' explained</span></summary><div class="reading-detail-body">'+glossary.map(([term,definition])=>'<div class="row"><b>'+E(term)+'</b><span>'+E(definition)+'</span></div>').join('')+'</div></details>':'')+
 '<details class="reading-detail"><summary>Historical background <span>fact vs fiction</span></summary><div class="reading-detail-body">'+background+'<p><small>The conversation and possible decisions are reconstructed for the game; real events are not forced in this timeline.</small></p>'+source+'</div></details>';
 openSheet('Inside the decision',html);
}
/* Casebook: put the six readable story titles first; retain all original records
   behind optional sections. This changes presentation only, never the journal. */
const _focusShowCases=showCases;
showCases=function(){
 _focusShowCases();
 const head=sheet.querySelector('.sheethead');
 const arcs=Array.from(sheet.querySelectorAll(':scope > .story-case'));
 if(!head||!arcs.length)return;
 const children=Array.from(sheet.children),first=children.indexOf(arcs[0]),last=children.indexOf(arcs[arcs.length-1]);
 const earlier=children.slice(1,first),later=children.slice(last+1);
 const intro=document.createElement('p');intro.className='casebook-intro';intro.textContent='Six stories shape your reign. Open any one to follow the people, decisions and consequences.';
 const label=document.createElement('div');label.className='eyebrow';label.textContent='YOUR SIX STORIES';
 const list=document.createElement('div');list.className='casebook-stories';
 arcs.forEach(el=>{el.removeAttribute('open');list.appendChild(el);});
 function fold(title,sub,nodes){const box=document.createElement('details');box.className='reading-detail casebook-fold';
  const summary=document.createElement('summary');summary.textContent=title;const caption=document.createElement('span');caption.textContent=sub;summary.appendChild(caption);box.appendChild(summary);
  const body=document.createElement('div');body.className='reading-detail-body';nodes.forEach(node=>body.appendChild(node));box.appendChild(body);return box;}
 const cross=fold('When stories collide','Crises caused by earlier choices',later);
 const archive=fold('Historical dossiers','Research, evidence and reconstruction',earlier);
 sheet.replaceChildren(head,intro,label,list,cross,archive);
};
const _focusRenderCard=renderCard;
renderCard=function(){_focusRenderCard();edwardReadingRender();};
if(document.getElementById('card'))edwardReadingRender();
window.EDWARD_READING={get level(){return edwardReadingLevel;},set(level){if(!EDWARD_READING_LEVELS.includes(level))return false;edwardReadingLevel=level;try{localStorage.setItem(EDWARD_READING_KEY,level);}catch(e){}edwardReadingRender();return true;},get sceneCount(){return Object.keys(EDWARD_FOCUS_SCENES).length},more:edwardReadingMore,cycle:edwardReadingCycle};
