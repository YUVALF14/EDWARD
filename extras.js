/* EDWARD — The Living Chronicle: biographies, atlas, save slots, timed choices,
 * atmospheric artwork and optional original Web Audio score. All self-contained.
 * This file intentionally extends the existing UI without replacing the simulation.
 */
const EDWARD_BIOS=[
 {id:'edward',names:['Edward IV','King Edward','Edward'],title:'Edward IV · King of England',house:'House of York',summary:'Victorious at Towton in 1461, Edward must turn battlefield success into a government. His authority depends on households, offices, revenues and the willingness of local men to obey.',stakes:'Royal legitimacy, reliable servants, money for government, and a secure succession.'},
 {id:'warwick',names:['Richard Neville','Earl of Warwick','Warwick'],title:'Richard Neville · Earl of Warwick',house:'House of Neville',summary:'A powerful magnate, captain of Calais and a principal architect of Edward’s early regime. His affinity spans northern landholding, royal service and continental diplomacy.',stakes:'Authority to reward followers, influence over diplomacy, and protection of Neville standing.'},
 {id:'george',names:['George Neville','Archbishop Neville'],title:'George Neville · Archbishop of York',house:'House of Neville',summary:'Warwick’s brother, a senior churchman and Edward’s early Lord Chancellor. The Great Seal makes his office central to government.',stakes:'Chancery authority, ecclesiastical influence, and the reputation of his family.'},
 {id:'montagu',names:['John Neville','Lord Montagu','Montagu'],title:'John Neville · Lord Montagu',house:'House of Neville',summary:'Warwick’s brother and an experienced northern commander. His responsibilities on the frontier can bring him into conflict with older northern affinities.',stakes:'Northern security, military service and recognition of his landed position.'},
 {id:'hastings',names:['William Hastings','Lord Hastings','Hastings'],title:'William Hastings · Royal servant',house:'The King’s household',summary:'A close associate of Edward whose access to the king offers a different route to office and patronage from the great Neville network.',stakes:'Personal trust, chamberlainship, appointments and a dependable royal household.'},
 {id:'elizabeth',names:['Elizabeth Woodville','Queen Elizabeth','Elizabeth'],title:'Elizabeth Woodville',house:'House of Woodville',summary:'A widow from a well-connected gentry family. In recorded history she married Edward privately in 1464; the outcome of marriage politics can differ in this simulation.',stakes:'The status of her children, her kin’s security and access to royal favour.'},
 {id:'woodville',names:['Anthony Woodville','Earl Rivers','Rivers'],title:'Anthony Woodville · later Earl Rivers',house:'House of Woodville',summary:'Elizabeth Woodville’s brother, a courtly soldier and member of a family whose rise can change access to royal offices and marriages.',stakes:'Household patronage, the queen’s relatives and their standing at court.'},
 {id:'jacquetta',names:['Jacquetta of Luxembourg','Jacquetta'],title:'Jacquetta of Luxembourg',house:'Woodville kin',summary:'Duchess of Bedford and Elizabeth Woodville’s mother, with experience of high politics and an extensive family network.',stakes:'The position and security of her family.'},
 {id:'somerset',names:['Henry Beaufort','Duke of Somerset','Somerset'],title:'Henry Beaufort · Duke of Somerset',house:'House of Lancaster',summary:'A prominent Lancastrian magnate who was historically pardoned by Edward before returning to rebellion. The game allows a different result if reconciliation holds.',stakes:'Restoration of honour, lands and the survival of Lancastrian connections.'},
 {id:'henry',names:['Henry VI','King Henry','Henry of Lancaster'],title:'Henry VI · Lancastrian king',house:'House of Lancaster',summary:'The deposed king remains a living dynastic claim. His person, treatment and custody affect the legitimacy of Edward’s settlement.',stakes:'Custody, legitimacy and the loyalties of former Lancastrian servants.'},
 {id:'margaret_paston',names:['Margaret Paston'],title:'Margaret Paston · Norfolk correspondent',house:'The Paston family',summary:'Her surviving family letters are a remarkable window into the legal, financial and personal strain of the Caister inheritance dispute. The royal audiences in this game are fictional.',stakes:'Protection of the family’s title, rents, household and sons.'},
 {id:'henry_percy',names:['Henry Percy'],title:'Henry Percy · Northumberland claimant',house:'House of Percy',summary:'The Percy family’s hereditary claims and the Nevilles’ northern power shaped the Yorkist settlement. Henry Percy recovered the earldom in 1470 in recorded history; the game permits a different outcome.',stakes:'Northern inheritance, tenants, service and title.'},
 {id:'margaret',names:['Margaret of Anjou','Margaret'],title:'Margaret of Anjou',house:'House of Lancaster',summary:'Queen consort to Henry VI and a formidable political organizer whose cause survives military defeat.',stakes:'Her family’s claim, French and Scottish contacts, and the protection of her son.'},
 {id:'clarence',names:['George, Duke of Clarence','Duke of Clarence','Clarence','George Plantagenet'],title:'George Plantagenet · Duke of Clarence',house:'House of York',summary:'Edward’s younger brother. As a prince of the blood he has claims to status and lands that make his private choices a matter of state.',stakes:'His rank, estates, marriage and place in the succession.'},
 {id:'gloucester',names:['Richard, Duke of Gloucester','Duke of Gloucester','Gloucester'],title:'Richard · Duke of Gloucester',house:'House of York',summary:'Edward’s younger brother and a major royal figure in northern government in the later reign.',stakes:'Royal service, northern influence and dynastic stability.'},
 {id:'percy',names:['House of Percy','Percy','Percy retainer'],title:'The Percy affinity',house:'Northern magnate household',summary:'The Percy family held extensive northern interests and contested Neville influence. In the sandbox, a “Percy retainer” is a composite representative, not a documented individual.',stakes:'Hereditary lands, frontier offices and protection from rivals.'},
 {id:'paston',names:['John Paston','Paston family','Pastons','Paston'],title:'The Paston family',house:'Norfolk gentry',summary:'A historically documented family whose letters reveal the fragility of property rights, local patronage and royal protection.',stakes:'Legal title and effective possession of Caister Castle.'},
 {id:'norfolk',names:['Duke of Norfolk','Norfolk'],title:'John Mowbray · Duke of Norfolk',house:'House of Mowbray',summary:'A powerful magnate whose men seized Caister Castle in 1469 amid a dispute with the Pastons. He died in 1476 in recorded history.',stakes:'Control of disputed property and the authority of a great household.'},
 {id:'berkeley',names:['Lord Berkeley','Berkeley'],title:'William Berkeley',house:'House of Berkeley',summary:'A landed nobleman involved in the Berkeley–Talbot inheritance conflict that led to fighting at Nibley Green in 1470.',stakes:'Inheritance, legal title and the service of armed retainers.'},
 {id:'talbot',names:['Lord Lisle','Talbot'],title:'Thomas Talbot · Viscount Lisle',house:'House of Talbot',summary:'A rival claimant in the inheritance dispute with Berkeley. The conflict illustrates how a legal quarrel could become a private war.',stakes:'An inherited claim, honour and the ability to enforce it.'},
 {id:'louis',names:['Louis XI','King Louis','Louis'],title:'Louis XI · King of France',house:'Valois monarchy',summary:'The French king sought to advance his interests through negotiation as well as war. The 1475 settlement with Edward is a historical reference point, not a forced outcome.',stakes:'Security of France, influence over Burgundy and the cost of English intervention.'},
 {id:'burgundy',names:['Duke of Burgundy','Charles the Bold','Burgundian envoy'],title:'The Burgundian connection',house:'Duchy of Burgundy',summary:'Burgundy was a major diplomatic and commercial partner. A generic envoy in this simulation represents an office, not a specific historical messenger.',stakes:'Continental alliances, trade and military commitments.'}
];
const EDWARD_ALIASES=EDWARD_BIOS.flatMap(b=>b.names.map(name=>({name,id:b.id}))).sort((a,b)=>b.name.length-a.name.length);
const EDWARD_NAME_REGEX=new RegExp('\\b('+EDWARD_ALIASES.map(x=>x.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')\\b','gi');
function edwardBioFor(name){const text=String(name||'').toLowerCase();return EDWARD_BIOS.find(b=>b.names.some(alias=>alias.toLowerCase()===text))||EDWARD_BIOS.find(b=>b.names.some(alias=>alias.length>=5&&text.includes(alias.toLowerCase())))||null;}
function edwardLinkedText(raw){const text=String(raw==null?'':raw);let result='',last=0;EDWARD_NAME_REGEX.lastIndex=0;let match;
 while((match=EDWARD_NAME_REGEX.exec(text))!==null){result+=E(text.slice(last,match.index));result+='<button type="button" class="person-link" data-person="'+E(match[0])+'" aria-label="About '+E(match[0])+'">'+E(match[0])+'</button>';last=match.index+match[0].length;}
 return result+E(text.slice(last));
}
function edwardPeek(name){const bio=edwardBioFor(name),label=bio?bio.title:name;const desc=bio?bio.summary:'This person or representative appears in the present petition. Their exact motives and private agreements may not be known to the Crown.';
 const family=bio?bio.house:(current?.role||'Court or local representative');const stakes=bio?bio.stakes:'The immediate petition and access to royal judgment.';
 const sb=world.sandbox;const matching=sb?Object.entries(SANDBOX_ACTORS).find(([id,a])=>bio&&(id===bio.id||a.name.toLowerCase().includes(bio.names[0].toLowerCase()))):null;
 const actorId=matching?.[0]||bio?.id;const bonds=sb?.deep?.bonds?.filter(x=>x.public&&(x.a===actorId||x.b===actorId)).slice(-2).map(x=>`${SANDBOX_ACTORS[x.a]?.name||x.a} and ${SANDBOX_ACTORS[x.b]?.name||x.b}: ${x.kind} (${x.year})`)||[];
 const reports=world.reports.filter(r=>bio?bio.names.some(n=>n.length>=5&&(String(r.from||'')+' '+String(r.text||'')).toLowerCase().includes(n.toLowerCase())):String(r.from||'').includes(name)).slice(-2).reverse();
 let node=document.getElementById('personPeek');if(!node){node=document.createElement('div');node.id='personPeek';node.className='person-peek';node.setAttribute('role','dialog');node.setAttribute('aria-modal','true');document.body.appendChild(node);}
 node.innerHTML='<div class="person-panel"><div class="peek-top"><div><div class="eyebrow">A PERSON IN THE REIGN</div><h2>'+E(label)+'</h2><div class="muted">'+E(family)+'</div></div><button class="peek-close" id="peekClose" aria-label="Close">×</button></div><p>'+E(desc)+'</p><div class="person-bond"><strong>Interests:</strong> '+E(stakes)+'</div>'+(bonds.length?'<div class="person-bond"><strong>Public ties in your reign</strong><br>'+bonds.map(E).join('<br>')+'</div>':'')+(reports.length?'<div class="person-bond"><strong>What has reached Edward</strong><br>'+reports.map(r=>E(r.text)).join('<br>')+'</div>':'<div class="person-bond">No recent report on this person has reached the Crown.</div>')+'<p class="muted">Biographical background is historical; this person’s actions in your timeline may differ. Private knowledge is not shown.</p></div>';
 node.classList.add('open');document.getElementById('peekClose').onclick=edwardClosePeek;document.getElementById('peekClose').focus();
}
function edwardClosePeek(){document.getElementById('personPeek')?.classList.remove('open');}
function edwardCardNames(){const card=document.getElementById('card');if(!card||!current)return;const detail=arena?current[arena]:null;const who=detail?detail.who:current.who;const quote=detail?detail.quote:fmt(current.quote,world);const context=detail?'You have changed who hears this matter. A decision is still required.':fmt(current.context,world);
 const sp=card.querySelector('.speaker');if(sp){let markup=edwardLinkedText(who);if(!markup.includes('data-person='))markup='<button type="button" class="person-link" data-person="'+E(who)+'">'+E(who)+'</button>';sp.innerHTML=markup;}
 const q=card.querySelector('.quote');if(q)q.innerHTML='“'+edwardLinkedText(quote)+'”';
 const ctx=card.querySelector('.context');if(ctx){const textNode=Array.from(ctx.childNodes).find(x=>x.nodeType===3&&x.textContent.trim());if(textNode){const span=document.createElement('span');span.innerHTML=edwardLinkedText(context);textNode.replaceWith(span);}}
}
function edwardSheetNames(){sheet.querySelectorAll('.row b').forEach(el=>{if(el.querySelector('button'))return;const b=edwardBioFor(el.textContent);if(b)el.innerHTML=edwardLinkedText(el.textContent);});
 sheet.querySelectorAll('.network-svg text').forEach(el=>{const b=edwardBioFor(el.textContent);if(b){el.setAttribute('data-person',b.names[0]);el.setAttribute('role','button');el.setAttribute('tabindex','0');el.style.cursor='pointer';}});
}
document.addEventListener('pointerdown',function(e){if(e.target.closest('[data-person]'))e.stopPropagation();},true);
document.addEventListener('click',function(e){const p=e.target.closest('[data-person]');if(p){e.preventDefault();e.stopPropagation();edwardPeek(p.dataset.person);return;}
 if(e.target.id==='personPeek'){edwardClosePeek();return;}
 const place=e.target.closest('[data-atlas-place]');if(place){e.preventDefault();edwardMapSelect(place.dataset.atlasPlace);}
},true);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&document.getElementById('personPeek')?.classList.contains('open')){edwardClosePeek();e.stopImmediatePropagation();return;}
 if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-person]')){e.preventDefault();edwardPeek(e.target.dataset.person);}
 if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-atlas-place]')){e.preventDefault();edwardMapSelect(e.target.dataset.atlasPlace);}
},true);
/* ATLAS: geographical coastlines are real; political control and historical sites are schematic. */
const EDWARD_ATLAS_SITES=[
 {id:'edinburgh',name:'Scotland',label:'Edinburgh',dx:8,dy:-10},
 {id:'north',name:'Northumberland',label:'North',dx:11,dy:-7},
 {id:'york',name:'York',label:'York',dx:10,dy:13},
 {id:'wales',name:'Wales',label:'Wales',dx:-45,dy:5},
 {id:'london',name:'London / Westminster',label:'London',dx:-47,dy:19},
 {id:'caister',name:'Caister Castle',label:'Caister',dx:11,dy:3},
 {id:'nibley',name:'Nibley Green',label:'Nibley',dx:-46,dy:-8},
 {id:'calais',name:'Calais',label:'Calais',dx:10,dy:15}
];
function edwardMapStatus(id){const f=world.facts,notes=world.sandbox?.narrative?.journal||[],last=(key)=>notes.filter(j=>j.key===key).slice(-1)[0];
 if(id==='edinburgh')return 'The Kingdom of Scotland is independent. Scottish diplomacy and the northern frontier matter to English royal security; the Scottish court is not simulated as a full agent.';
 if(id==='north')return f.north_rising_1464==='averted'?'A negotiated northern settlement prevented the expected 1464 campaign in this timeline. Later loyalties remain contingent.':world.visited.includes('hexham')?'The campaign around Hexham has been fought. Restoring everyday authority remains a separate problem.':'Northern magnates, border fortresses and Lancastrian connections remain unsettled. Edward knows only what messengers have reported.';
 if(id==='york')return 'York is a symbolic centre of northern royal authority. The king’s name on a writ does not by itself secure every local allegiance.';
 if(id==='wales')return 'The Welsh Marches contain strongholds, claims and routes of communication important to both Yorkist and Lancastrian interests. This map does not reveal unreported plots.';
 if(id==='london')return 'Westminster is the seat of royal government; London merchants and officers supply credit, petitions and political information. '+(world.offices.chamberlain==='hastings'?'Hastings has been appointed chamberlain in this reign.':'The king’s household remains a contested channel of access.');
 if(id==='caister')return last('caister')?'Your record: '+last('caister').summary:'Caister Castle, Norfolk. Historically disputed between the Paston family and the Duke of Norfolk, with armed seizure in 1469. The case may develop differently here.';
 if(id==='nibley')return last('nibley')?'Your record: '+last('nibley').summary:'Nibley Green, Gloucestershire. A Berkeley–Talbot inheritance dispute led to a private battle in 1470; a royal settlement can change the course of this case.';
 if(id==='calais')return last('france')?'Your record: '+last('france').summary:'Calais was an English possession across the Channel and a vital diplomatic and military foothold. Warwick’s captaincy gives him influence beyond England.';
 return 'No detailed dispatch has reached the Crown.';
}
function edwardMapSVG(){const p=EDWARD_MAP_POINTS;const region=(name,x,y)=>'<text class="atlas-region" x="'+x+'" y="'+y+'" text-anchor="middle">'+name+'</text>';
 const sites=EDWARD_ATLAS_SITES.map(x=>{const [cx,cy]=p[x.id];return '<g class="atlas-spot" data-atlas-place="'+x.id+'" role="button" tabindex="0" aria-label="'+E(x.name)+'"><title>'+E(x.name)+'</title><circle cx="'+cx+'" cy="'+cy+'" r="4.1"/><circle class="hit" cx="'+cx+'" cy="'+cy+'" r="15"/><text class="atlas-city" x="'+(cx+x.dx)+'" y="'+(cy+x.dy)+'">'+E(x.label)+'</text></g>';}).join('');
 return '<div class="atlas-wrap"><svg viewBox="0 0 400 490" role="img" aria-label="Interactive historical atlas of Britain, Ireland and Calais"><defs><linearGradient id="seaTint" x2="1" y2="1"><stop stop-color="#29454a"/><stop offset="1" stop-color="#15252a"/></linearGradient><linearGradient id="landTint" x2=".6" y2="1"><stop stop-color="#687358"/><stop offset=".55" stop-color="#455743"/><stop offset="1" stop-color="#3b4b3b"/></linearGradient><radialGradient id="lightTint"><stop stop-color="#b9b38a" stop-opacity=".22"/><stop offset="1" stop-color="#b9b38a" stop-opacity="0"/></radialGradient></defs><rect width="400" height="490" fill="url(#seaTint)"/><rect width="400" height="490" fill="url(#lightTint)"/><path d="'+EDWARD_MAP_LAND+'" fill="url(#landTint)" stroke="#c6bd91" stroke-width=".9"/><path d="'+EDWARD_MAP_COAST+'" fill="none" stroke="#d0c8a2" stroke-width=".65" opacity=".75"/><path d="M'+p.border0.join(',')+' Q'+p.border1.join(',')+' '+p.border2.join(',')+'" fill="none" stroke="#e6d8a7" stroke-dasharray="4 4" opacity=".55"/>'+region('SCOTLAND',p.scotland[0],p.scotland[1])+region('IRELAND',p.ireland[0],p.ireland[1])+region('ENGLAND',p.england[0],p.england[1])+'<text class="atlas-sea" x="355" y="208" transform="rotate(90 355 208)">NORTH SEA</text><text class="atlas-sea" x="152" y="325" transform="rotate(-42 152 325)">IRISH SEA</text>'+sites+'<g transform="translate(45 52)" opacity=".7"><path d="M0 -23 L5 -5 0 0 -5 -5Z M0 23 L5 5 0 0 -5 5Z M-23 0 L-5 -5 0 0 -5 5Z M23 0 L5 -5 0 0 5 5Z" fill="#e0ce98"/><circle r="5" fill="none" stroke="#e0ce98"/><text x="-4" y="-30" fill="#e0ce98" font-size="12">N</text></g><rect x="5" y="5" width="390" height="480" rx="8" fill="none" stroke="#ad9e70" opacity=".6"/></svg><div class="atlas-detail" id="atlasDetail"><h3>Atlas of the Reign</h3><p>Tap a gold marker to see the place’s historical context and what Edward can reasonably know.</p></div></div><p class="atlas-caption">Coastlines are geographic; labels, borders and political notes are illustrative, not a territorial survey of the fifteenth century. Calais lies across the Channel.</p>';
}
function edwardMapSelect(id){const site=EDWARD_ATLAS_SITES.find(x=>x.id===id);const box=document.getElementById('atlasDetail');if(!box||!site)return;box.innerHTML='<h3>'+E(site.name)+'</h3><p>'+E(edwardMapStatus(id))+'</p>';document.querySelectorAll('.atlas-spot').forEach(el=>el.classList.toggle('active',el.dataset.atlasPlace===id));}
/* SAVE SYSTEM — three independent local slots, plus the existing autosave.
 * Export/import are important because Safari can clear site storage.
 */
const EDWARD_SLOT_PREFIX='edward_manual_reign_';
function edwardValidSave(w){return !!(w&&w.version===10&&Array.isArray(w.visited)&&Array.isArray(w.chronicle)&&w.facts&&w.offices&&Number.isFinite(w.turn)&&w.turn>=0&&w.turn<5000);}
function edwardReadSlot(i){try{const obj=JSON.parse(localStorage.getItem(EDWARD_SLOT_PREFIX+i));return obj&&edwardValidSave(obj.world)?obj:null;}catch(e){return null;}}
function edwardYear(w){return w.sandbox?String(w.sandbox.year):(CHAPTERS[w.chapterIndex]?.date||'1461');}
function edwardSlotMarkup(){return [1,2,3].map(i=>{const obj=edwardReadSlot(i),w=obj?.world;
 return '<div class="save-row"><div><div class="save-title">'+(obj?'Reign '+i+' · '+E(edwardYear(w)):'Empty slot '+i)+'</div><div class="save-detail">'+(obj?E(w.turn)+' decisions · '+E(new Date(obj.savedAt).toLocaleDateString())+' · '+E(obj.name||'Edward IV'):'No reign saved here')+'</div></div><div class="save-buttons"><button data-save-slot="'+i+'">Save</button><button data-load-slot="'+i+'" '+(!obj?'disabled':'')+'>Load</button><button data-delete-slot="'+i+'" '+(!obj?'disabled':'')+'>×</button></div></div>';
 }).join('');}
function edwardSaveMenu(){openSheet('Save your Reign','<div class="eyebrow">AUTOSAVE + THREE MANUAL CHRONICLES</div><p>The current game saves automatically in this browser. Manual slots let you preserve different timelines. Export a file to keep a copy outside Safari.</p><div id="saveSlots">'+edwardSlotMarkup()+'</div><div class="save-tools"><button id="exportReign">↓ Export current reign</button><label for="importReign">↑ Import a saved reign<input id="importReign" type="file" accept="application/json,.json"></label></div><div class="save-notice" id="saveNotice" role="status"></div><p><small>Browser saves are local to this device and website. They are not synchronized between devices. Importing or loading replaces the current autosave, not the other manual slots.</small></p>');
 sheet.querySelectorAll('[data-save-slot]').forEach(b=>b.onclick=()=>{const i=b.dataset.saveSlot;const prev=edwardReadSlot(i);if(prev&&!confirm('Overwrite saved reign '+i+'?'))return;
  try{localStorage.setItem(EDWARD_SLOT_PREFIX+i,JSON.stringify({schema:1,savedAt:new Date().toISOString(),name:'Edward IV',world:world}));edwardSaveMenu();edwardNotice('Reign '+i+' saved.');}catch(e){edwardNotice('Storage unavailable. Export your reign as a file instead.');}
 });
 sheet.querySelectorAll('[data-load-slot]').forEach(b=>b.onclick=()=>{const i=b.dataset.loadSlot,obj=edwardReadSlot(i);if(!obj)return;if(!confirm('Load reign '+i+'? Your current unsaved progress will be replaced.'))return;edwardLoadSnapshot(obj.world);});
 sheet.querySelectorAll('[data-delete-slot]').forEach(b=>b.onclick=()=>{const i=b.dataset.deleteSlot;if(!confirm('Delete saved reign '+i+'?'))return;try{localStorage.removeItem(EDWARD_SLOT_PREFIX+i);}catch(e){}edwardSaveMenu();edwardNotice('Slot '+i+' cleared.');});
 document.getElementById('exportReign').onclick=edwardExport;
 document.getElementById('importReign').addEventListener('change',edwardImport);
}
function edwardNotice(s){const el=document.getElementById('saveNotice');if(el)el.textContent=s;}
function edwardLoadSnapshot(w){if(!edwardValidSave(w)){edwardNotice('This file does not contain a compatible EDWARD reign.');return;}
 try{world=JSON.parse(JSON.stringify(w));saveWorld(world);current=null;arena=null;closing=false;activePointer=null;edwardClosePeek();closeSheet();if(world.finished)ending();else begin();}catch(e){edwardNotice('Could not load this reign.');console.error(e);}
}
function edwardExport(){try{const payload=JSON.stringify({app:'EDWARD IV',format:1,exportedAt:new Date().toISOString(),world:world},null,2);const blob=new Blob([payload],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='EDWARD-reign-'+edwardYear(world).replace(/[^0-9a-z-]/gi,'-')+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),20000);edwardNotice('Save file prepared. Keep it in Files or another safe location.');}catch(e){edwardNotice('Export failed: '+e.message);}}
function edwardImport(e){const file=e.target.files?.[0];if(!file)return;if(file.size>6*1024*1024){edwardNotice('Save file too large.');return;}const reader=new FileReader();reader.onload=()=>{try{const data=JSON.parse(reader.result);if(!edwardValidSave(data.world)){edwardNotice('Incompatible or invalid save file.');return;}if(!confirm('Import this reign and replace your current autosave?'))return;edwardLoadSnapshot(data.world);}catch(err){edwardNotice('Could not read the JSON save file.');}};reader.onerror=()=>edwardNotice('File could not be read.');reader.readAsText(file);}
/* Original adaptive, opt-in score. No audio files or external streaming.
 * Safari requires a direct user gesture to create/resume AudioContext.
 */
const EDWARD_SCORE={ctx:null,bus:null,on:false,mood:'court',timer:null,step:0,next:0};
const EDWARD_MODES={court:[0,3,5,7,10,12,15],battle:[0,1,3,5,7,8,10],north:[0,3,5,7,10,12,14],sea:[0,2,5,7,9,12,14],manor:[0,3,5,7,10,12,15],succession:[0,1,3,7,8,10,12]};
function edwardTone(freq,when,duration,loud,type){const a=EDWARD_SCORE,ctx=a.ctx;if(!ctx||!a.bus)return;const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=type||'sine';osc.frequency.setValueAtTime(freq,when);gain.gain.setValueAtTime(.00001,when);gain.gain.exponentialRampToValueAtTime(Math.max(.00002,loud),when+.065);gain.gain.exponentialRampToValueAtTime(.00001,when+duration);osc.connect(gain);gain.connect(a.bus);osc.start(when);osc.stop(when+duration+.06);}
function edwardScoreTick(){const a=EDWARD_SCORE;if(!a.on||!a.ctx)return;const ctx=a.ctx;if(a.next<ctx.currentTime)a.next=ctx.currentTime+.07;const scale=EDWARD_MODES[a.mood]||EDWARD_MODES.court;while(a.next<ctx.currentTime+.8){const n=a.step,degree=scale[[0,2,4,1,5,3,2,6][n%8]],base=a.mood==='battle'?110:a.mood==='sea'?146.83:130.81;
 const f=base*Math.pow(2,degree/12);edwardTone(f,a.next,1.3,a.mood==='battle'?.022:.014,'triangle');if(n%4===0){edwardTone(base/2,a.next,4.6,.017,'sine');edwardTone(base*Math.pow(2,7/12)/2,a.next+.08,4.5,.009,'sine');}
 if(n%3===1)edwardTone(f*2,a.next+.25,1.4,.006,'sine');a.step++;a.next+=1.06;}}
async function edwardToggleMusic(){const a=EDWARD_SCORE;try{if(a.on){a.on=false;clearInterval(a.timer);a.timer=null;if(a.ctx&&a.ctx.state==='running')await a.ctx.suspend();}else{if(!a.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw new Error('Audio is not supported here');a.ctx=new AC();a.bus=a.ctx.createGain();a.bus.gain.value=.38;a.bus.connect(a.ctx.destination);}await a.ctx.resume();a.on=true;a.next=a.ctx.currentTime+.07;a.timer=setInterval(edwardScoreTick,380);edwardScoreTick();}edwardSyncAudioButtons();}catch(e){a.on=false;edwardSyncAudioButtons();alert('Music could not start in this browser: '+e.message);}}
function edwardSyncAudioButtons(){document.querySelectorAll('[data-audio-toggle]').forEach(b=>{b.setAttribute('aria-pressed',EDWARD_SCORE.on?'true':'false');b.title=EDWARD_SCORE.on?'Turn music off':'Turn music on';b.setAttribute('aria-label',b.title);b.textContent=EDWARD_SCORE.on?'♫':'♪';});}
function edwardMusicAccent(side){if(!EDWARD_SCORE.on||!EDWARD_SCORE.ctx)return;const t=EDWARD_SCORE.ctx.currentTime+.04;edwardTone(side==='wait'?196:side==='left'?261.6:293.66,t,.5,.018,'triangle');}
document.addEventListener('visibilitychange',()=>{const a=EDWARD_SCORE;if(!a.ctx||!a.on)return;if(document.hidden)a.ctx.suspend().catch(()=>{});else a.ctx.resume().then(()=>{a.next=a.ctx.currentTime+.06;}).catch(()=>{});});
/* Ink-style scene silhouettes: faint by design so the historical prose stays legible. */
function edwardMoodFor(card){if(!card)return 'court';const text=[card.where,card.tag,card.caseInfo?.title,card.role].join(' ').toLowerCase();if(/towton|battle|armed|rebellion|campaign|prisoner|captain/.test(text))return 'battle';if(/calais|france|burgund|envoy|treaty|channel/.test(text))return 'sea';if(/north|york|border|march|hexham|scot/.test(text))return 'north';if(/estate|manor|caister|nibley|land|inheritance|paston/.test(text))return 'manor';if(/heir|succession|nursery|clarence|prince|brother/.test(text))return 'succession';return 'court';}
function edwardSceneSvg(mood){const palace='<g fill="#b9a981" opacity=".65"><path d="M35 780V375h70v-65l40-58 40 58v65h52V220l68-92 68 92v155h60v-64l42-62 42 62v64h68v405Z"/><path d="M273 260v-36l32-48 32 48v36Z" fill="#1b2824"/><path d="M290 315v-60h30v60Z M120 410v-58h45v58Z M460 410v-58h45v58Z" fill="#1b2824"/><path d="M277 780V560q29-70 58 0v220Z" fill="#1b2824"/></g>';
 const battle='<g opacity=".65"><path d="M0 720Q130 590 255 678T580 680V900H0Z" fill="#a89a7b"/><path d="M45 680l10-235 6 235m-6-225 95 35-95 23M198 675l10-285 5 285m-5-274 83 47-83 20M390 690l11-260 5 260m-5-255 92 41-92 27" stroke="#e2cfa0" stroke-width="8" fill="none"/><path d="M0 745Q160 690 270 748T580 742V900H0Z" fill="#28342e"/></g>';
 const north='<g opacity=".65"><path d="M0 590L110 385 198 530 318 315 440 518 520 398 600 580V900H0Z" fill="#8a9a8a"/><path d="M0 670Q140 540 230 620T600 605V900H0Z" fill="#4a6259"/><path d="M335 670V440h40v-28h25v28h42v230Z M345 435v-40h16v40m18 0v-40h16v40" fill="#d6c69a"/></g>';
 const sea='<g opacity=".65"><path d="M0 620Q75 585 150 620T300 620T450 620T600 620V900H0Z" fill="#6b9197"/><path d="M100 680h370l-55 85H155Z" fill="#b6a583"/><path d="M280 310v370" stroke="#c6bc9d" stroke-width="12"/><path d="M270 340L130 615h140Z M300 355l135 245H300Z" fill="#e0d1b3"/><path d="M0 795Q150 740 300 795T600 795V900H0Z" fill="#324e56"/></g>';
 const manor='<g opacity=".65"><path d="M0 725l105-170 115 170 95-135 100 135 120-190 75 190V900H0Z" fill="#8a866a"/><path d="M130 770V465l145-95 145 95v305Z" fill="#b9aa82"/><path d="M108 475l170-132 163 132" stroke="#ded0a2" stroke-width="20" fill="none"/><path d="M245 770V610q32-45 65 0v160Z M164 525h40v70h-40Z M344 525h40v70h-40Z" fill="#27352b"/></g>';
 const succession='<g opacity=".65"><path d="M90 900V300q190-310 390 0v600Z" fill="#a08c92"/><path d="M155 900V335q120-200 260 0v565Z" fill="#352f3d"/><path d="M285 335v-170m-140 245h270" stroke="#d9c3a0" stroke-width="14"/><path d="M195 620l35-150 35 150M320 620l35-150 35 150" stroke="#dbc4a0" stroke-width="9" fill="none"/><ellipse cx="230" cy="457" rx="13" ry="26" fill="#f3c57d"/><ellipse cx="355" cy="457" rx="13" ry="26" fill="#f3c57d"/></g>';
 const motif={court:palace,battle,north,sea,manor,succession}[mood]||palace;
 return '<svg viewBox="0 0 600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="sceneGlow"><stop stop-color="#d5b889" stop-opacity=".45"/><stop offset="1" stop-color="#d5b889" stop-opacity="0"/></radialGradient></defs><circle cx="300" cy="260" r="280" fill="url(#sceneGlow)"/><path d="M0 760Q300 650 600 760V900H0Z" fill="#151e1b" opacity=".6"/>'+motif+'</svg>';
}
function edwardSetMood(mood){document.body.dataset.mood=mood;EDWARD_SCORE.mood=mood;let art=document.getElementById('sceneArt');if(!art){art=document.createElement('div');art.id='sceneArt';art.setAttribute('aria-hidden','true');document.body.insertBefore(art,app);}if(art.dataset.scene!==mood){art.innerHTML=edwardSceneSvg(mood);art.dataset.scene=mood;}}
/* UI integration. We preserve original swipe mechanics and the ten-second lock. */
let edwardActionTimer=null;
function edwardInstallHeader(){const header=app.querySelector('.header');if(!header||header.querySelector('.header-actions'))return;
 const actions=document.createElement('div');actions.className='header-actions';
 const history=header.querySelector('#historyIcon');if(history)actions.appendChild(history);
 const music=document.createElement('button');music.id='musicToggle';music.dataset.audioToggle='1';music.textContent='♪';music.title='Turn music on';music.setAttribute('aria-label','Turn music on');music.onclick=edwardToggleMusic;
 const saves=document.createElement('button');saves.id='saveToggle';saves.textContent='▣';saves.title='Save or load a reign';saves.setAttribute('aria-label','Save or load a reign');saves.onclick=edwardSaveMenu;
 actions.append(music,saves);header.appendChild(actions);edwardSyncAudioButtons();
}
function edwardTapControls(){if(edwardActionTimer){clearInterval(edwardActionTimer);edwardActionTimer=null;}
 const help=document.getElementById('help');if(!help||!current)return;
 const choices=arena&&current[arena]?current[arena]:current;
 const bar=document.createElement('div');bar.className='tap-actions';bar.id='tapActions';
 const make=(side,label,extra)=>{const b=document.createElement('button');b.type='button';b.dataset.choice=side;b.textContent=(side==='left'?'← ':side==='right'?'':'↑ ')+label+(side==='right'?' →':'');if(extra)b.classList.add('extra');if(side==='wait'){b.classList.add('delayed');b.hidden=true;b.textContent='⌛ '+label;}b.disabled=true;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(locked||closing||overlay.classList.contains('open'))return;if(side==='wait'&&performance.now()-lockStart<LOCK_MS+(QA?220:7000))return;if(side==='up'||side==='down')enterArena(side);else decide(side);});bar.appendChild(b);return b;};
 make('left',choices.left.label,false);make('right',choices.right.label,false);
 if(!arena&&current.up)make('up',current.up.title,true);
 if(!arena&&current.down)make('down',current.down.title,true);
 const waitBtn=(!arena&&current.wait)?make('wait',current.wait.label,true):null;
 help.parentNode.insertBefore(bar,help);
 const cardId=current.id;
 function update(){if(!bar.isConnected||!current||current.id!==cardId){clearInterval(edwardActionTimer);edwardActionTimer=null;return;}
  const elapsed=performance.now()-lockStart;const ready=!locked&&!closing&&!overlay.classList.contains('open');
  for(const b of bar.querySelectorAll('button'))b.disabled=!ready;
  if(waitBtn){const delay=LOCK_MS+(QA?220:7000);const remaining=Math.max(0,Math.ceil((delay-elapsed)/1000));waitBtn.hidden=elapsed<delay;waitBtn.disabled=!ready||elapsed<delay;
   if(!locked&&!closing)help.textContent=remaining?'SWIPE OR TAP · ANOTHER COURSE IN '+remaining+'s':'ANOTHER COURSE HAS OPENED · DELAY HAS A COST';
  }else if(!locked&&!closing)help.textContent='SWIPE OR TAP TO DECIDE';
 }
 update();edwardActionTimer=setInterval(update,120);
}
function edwardDecorateCard(){edwardClosePeek();edwardInstallHeader();edwardCardNames();edwardTapControls();edwardSetMood(edwardMoodFor(current));}
function edwardDecorateIntro(){edwardSetMood('court');const introNode=document.getElementById('intro');if(!introNode||introNode.querySelector('.intro-tools'))return;
 const tools=document.createElement('div');tools.className='intro-tools';tools.innerHTML='<button type="button" id="introSaves">▣ Save slots</button><button type="button" id="introMusic" data-audio-toggle="1" aria-pressed="false">♪</button>';
 const small=introNode.querySelector('small');if(small){small.textContent='A living historical demo · 1461–1483 · No two reigns need end alike.';small.before(tools);}else introNode.appendChild(tools);
 document.getElementById('introSaves').onclick=e=>{e.stopPropagation();edwardSaveMenu();};document.getElementById('introMusic').onclick=e=>{e.stopPropagation();edwardToggleMusic();};edwardSyncAudioButtons();
}
function edwardDecorateEnding(){edwardSetMood('succession');const out=document.getElementById('outro');if(!out||out.querySelector('.intro-tools'))return;const tools=document.createElement('div');tools.className='intro-tools';tools.innerHTML='<button type="button" id="endSave">▣ Save ending</button><button type="button" id="endExport">↓ Export Chronicle</button>';out.appendChild(tools);
 document.getElementById('endSave').onclick=e=>{e.stopPropagation();edwardSaveMenu();};document.getElementById('endExport').onclick=e=>{e.stopPropagation();edwardExport();};
}
const _edwardOriginalRenderCard=renderCard;
renderCard=function(){_edwardOriginalRenderCard();edwardDecorateCard();};
const _edwardOriginalIntro=intro;
intro=function(){_edwardOriginalIntro();edwardDecorateIntro();};
const _edwardOriginalEnding=ending;
ending=function(){_edwardOriginalEnding();edwardDecorateEnding();};
const _edwardOriginalDecide=decide;
decide=function(side){edwardMusicAccent(side);_edwardOriginalDecide(side);};
const _edwardOriginalOpenSheet=openSheet;
openSheet=function(title,body){_edwardOriginalOpenSheet(title,body);edwardSheetNames();};
const _edwardOriginalRealm=showRealm;
showRealm=function(){_edwardOriginalRealm();const old=sheet.querySelector('.map-svg');if(old)old.outerHTML=edwardMapSVG();edwardSheetNames();};
const _edwardOriginalPeople=showPeople;
showPeople=function(){_edwardOriginalPeople();edwardSheetNames();};
const _edwardOriginalCouncil=showCouncil;
showCouncil=function(){_edwardOriginalCouncil();edwardSheetNames();};
const _edwardOriginalCases=showCases;
showCases=function(){_edwardOriginalCases();edwardSheetNames();};
window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='w'&&current?.wait&&!arena&&!locked&&!closing&&!overlay.classList.contains('open')&&performance.now()-lockStart>=LOCK_MS+(QA?220:7000)){e.preventDefault();decide('wait');}},true);
/* Initial render happened at the end of ui.js, before this enhancement module loaded. */
if(document.getElementById('card'))edwardDecorateCard();else if(document.getElementById('intro'))edwardDecorateIntro();else if(document.getElementById('outro'))edwardDecorateEnding();
window.EDWARD_EXTRAS={version:'Living Chronicle demo',get musicOn(){return EDWARD_SCORE.on},openSaves:edwardSaveMenu,selectPlace:edwardMapSelect,openPerson:edwardPeek,get slots(){return [1,2,3].map(edwardReadSlot)}};
