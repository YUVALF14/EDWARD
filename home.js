/* EDWARD — Main menu, explicit new game / continue / load, and in-context
   manuscript-style portraits. Does not alter simulation decisions or saves. */
function edwardAutosave(){const saved=loadWorld();return saved&&edwardValidSave(saved)?saved:null;}
function edwardStopForMenu(){
 cancelAnimationFrame(lockRAF);
 if(typeof edwardActionTimer!=='undefined'&&edwardActionTimer){clearInterval(edwardActionTimer);edwardActionTimer=null;}
 current=null;arena=null;activePointer=null;locked=true;closing=false;
 if(typeof edwardClosePeek==='function')edwardClosePeek();
 closeSheet();
}
function edwardStartNew(year){
 const saved=edwardAutosave();
 if(saved&&(saved.turn>0||saved.currentId||saved.finished)&&!confirm('Start a new reign? Your current autosave will be replaced. Manual save slots will stay safe.'))return;
 edwardStopForMenu();clearWorld();world=newWorld();
 if(year===1465){
  world.chapterIndex=CHAPTERS.length;
  world.facts.marriage='elizabeth';world.facts.somerset_1464='rebels';world.facts.north_rising_1464='active';
  world.offices.northern_commission='warwick';world.offices.chamberlain='hastings';
  world.links.warwick=3;world.links.hastings=2;world.links.woodville=2;
 }
 saveWorld(world);begin();
}
function edwardContinue(){const saved=edwardAutosave();if(!saved)return;edwardStopForMenu();edwardLoadSnapshot(saved);}
function edwardTitleScreen(){
 edwardStopForMenu();edwardSetMood('court');
 const saved=edwardAutosave();
 const year=saved?edwardYear(saved):null;
 const art=[['warwick','Warwick'],['edward','Edward IV'],['elizabeth','Elizabeth']].map(([id,label])=>'<div class="home-portrait">'+edwardPortraitSvg(id,label)+'<span class="home-portrait-caption">'+E(label)+'</span></div>').join('');
 app.innerHTML='<main class="home-screen" id="homeScreen">'+
 '<div class="home-kicker">THE WARS OF THE ROSES · AN INTERACTIVE CHRONICLE</div>'+
 '<h1 class="home-title">EDWARD<span> IV</span></h1><p class="home-subtitle">A crown is won. A kingdom must be ruled.</p>'+
 '<div class="home-portraits" aria-label="Illustrated portraits of Warwick, Edward IV and Elizabeth Woodville">'+art+'</div>'+
 '<p class="home-copy">England, 1461. Every promise has a price. Every family remembers.</p>'+
 '<div class="home-actions">'+
 '<button class="home-btn '+(saved?'primary':'secondary')+'" id="homeContinue" '+(!saved?'disabled':'')+'>'+(saved?(saved.finished?'Read your ending':'Continue reign'):'Continue reign')+'</button>'+
 '<button class="home-btn '+(saved?'secondary':'primary')+'" id="homeNew">New game</button>'+
 '<button class="home-btn tertiary" id="homeLoad">Load game</button>'+
 (saved?'<div class="home-save-note">Autosave · '+E(year)+' · '+E(saved.turn)+' decisions</div>':'<div class="home-save-note">Your story begins in 1461</div>')+
 '</div><div class="home-utility"><button id="homeMusic" type="button" data-audio-toggle="1" aria-pressed="false">♪ Music</button><button id="homeHow" type="button">How to play</button></div>'+
 '<p class="home-disclaimer">Historical foundations · fictional dialogue and alternate outcomes. Portraits are artistic interpretations, not historical likenesses.</p></main>';
 document.getElementById('homeContinue').onclick=edwardContinue;
 document.getElementById('homeNew').onclick=edwardNewGameMenu;
 document.getElementById('homeLoad').onclick=edwardLoadGameMenu;
 document.getElementById('homeMusic').onclick=edwardToggleMusic;
 document.getElementById('homeHow').onclick=()=>openSheet('How to play','<div class="reading-summary"><div class="eyebrow">A CROWN, MANY CHOICES</div><p>Read the request. Choose how Edward responds. Your decisions change people, promises and later events.</p></div><div class="row"><b>Decide</b><span>Swipe left or right, or tap a choice. A brief pause gives you time to read.</span></div><div class="row"><b>Explore</b><span>Tap a character portrait or name to learn more. Choose Focus, Story or Full to control how much you read.</span></div><div class="row"><b>Keep your reign</b><span>Progress saves automatically. You can also save to three manual slots or export a JSON file.</span></div><div class="row"><b>Historical fiction</b><span>Events are based on history, but dialogue and alternate decisions are dramatized. The story can change.</span></div>');
 edwardSyncAudioButtons();
}
function edwardNewGameMenu(){
 const saved=edwardAutosave();
 openSheet('Begin a New Reign','<div class="eyebrow">CHOOSE WHERE YOUR STORY BEGINS</div>'+
 '<div class="menu-summary">A new game replaces the current <strong>autosave</strong>. Your three manual save slots will remain untouched.'+(saved?' Current autosave: '+E(edwardYear(saved))+' · '+E(saved.turn)+' decisions.':'')+'</div>'+
 '<button class="menu-choice important" id="beginFull"><span class="menu-choice-copy">Begin in 1461<small>The full rise of Edward IV, from victory to government.</small></span><span>→</span></button>'+
 '<button class="menu-choice" id="jump1465"><span class="menu-choice-copy">Jump to 1465<small>Start in the living world with an illustrative Yorkist settlement.</small></span><span>→</span></button>'+
 '<p class="menu-caption">The 1465 shortcut begins with a preset political history; it does not recreate decisions you would have made from 1461.</p>');
 document.getElementById('beginFull').onclick=()=>edwardStartNew(1461);
 document.getElementById('jump1465').onclick=()=>edwardStartNew(1465);
}
function edwardLoadGameMenu(){
 const autosave=edwardAutosave();
 const slots=[1,2,3].map(i=>({i,save:edwardReadSlot(i)}));
 const row=(name,save,key)=>'<div class="save-row"><div><div class="save-title">'+E(name)+'</div><div class="save-detail">'+(save?E(edwardYear(save.world||save))+' · '+E((save.world||save).turn)+' decisions':'Empty — no saved reign')+'</div></div><div class="save-buttons"><button data-home-load="'+key+'" '+(!save?'disabled':'')+'>Load →</button></div></div>';
 const html='<div class="eyebrow">CHOOSE A CHRONICLE TO RESTORE</div><p class="menu-caption">Loading a reign replaces the current autosave, but does not erase the three manual slots.</p>'+
 row('Autosave',autosave,'auto')+
 slots.map(({i,save})=>row('Manual save '+i,save,String(i))).join('')+
 '<div class="menu-divider"></div><div class="save-tools"><label for="homeImport">↑ Import a saved reign<input id="homeImport" type="file" accept="application/json,.json"></label></div><div id="saveNotice" class="save-notice" role="status"></div>'+
 '<p class="menu-caption">Saves are stored in this browser. Export from the in-game save menu to keep a backup outside Safari.</p>';
 openSheet('Load Game',html);
 sheet.querySelectorAll('[data-home-load]').forEach(btn=>btn.onclick=()=>{
  const key=btn.dataset.homeLoad;
  const data=key==='auto'?edwardAutosave():edwardReadSlot(Number(key))?.world;
  if(!data){edwardNotice('That save is no longer available.');return;}
  if(!confirm('Load this reign? Current unsaved progress will be replaced.'))return;
  edwardStopForMenu();edwardLoadSnapshot(data);
 });
 document.getElementById('homeImport').addEventListener('change',edwardImport);
}
function edwardGameMenu(){
 openSheet('Game Menu','<div class="eyebrow">EDWARD IV · YOUR REIGN</div><div class="menu-summary">'+E(edwardYear(world))+' · '+E(world.turn)+' decisions · Progress autosaves after each decision.</div>'+
 '<button class="menu-choice" id="menuResume">Return to the court <span>→</span></button>'+
 '<button class="menu-choice" id="menuSave">Save to a slot / export <span>▣</span></button>'+
 '<button class="menu-choice" id="menuLoad">Load another reign <span>↗</span></button>'+
 '<div class="menu-divider"></div><button class="menu-choice" id="menuHome">Return to title screen <span>⌂</span></button>'+
 '<button class="menu-choice danger" id="menuNew">Start a new game <span>↻</span></button>');
 document.getElementById('menuResume').onclick=closeSheet;
 document.getElementById('menuSave').onclick=edwardSaveMenu;
 document.getElementById('menuLoad').onclick=edwardLoadGameMenu;
 document.getElementById('menuHome').onclick=edwardTitleScreen;
 document.getElementById('menuNew').onclick=edwardNewGameMenu;
}
function edwardInstallMenuButton(){const bar=app.querySelector('.header-actions');if(!bar||bar.querySelector('#gameMenuToggle'))return;
 const b=document.createElement('button');b.id='gameMenuToggle';b.type='button';b.title='Game menu · new game · load';b.setAttribute('aria-label','Game menu, new game or load');b.textContent='☰';b.onclick=edwardGameMenu;bar.appendChild(b);
}
function edwardInstallCardPortrait(){
 const card=document.getElementById('card');if(!card||card.querySelector('.card-identity'))return;
 const who=arena&&current?.[arena]?current[arena].who:current?.who;
 const bio=edwardBioFor(who);
 if(!bio)return;
 const speaker=card.querySelector('.speaker'),role=card.querySelector('.role');if(!speaker||!role)return;
 const identity=document.createElement('div');identity.className='card-identity';
 const copy=document.createElement('div');copy.className='card-identity-copy';
 speaker.parentNode.insertBefore(identity,speaker);identity.appendChild(copy);copy.append(speaker,role);
 const portrait=document.createElement('button');portrait.className='card-portrait';portrait.type='button';portrait.setAttribute('aria-label','Learn about '+bio.title);portrait.innerHTML=edwardPortraitSvg(bio.id,bio.title);
 portrait.addEventListener('pointerdown',e=>e.stopPropagation());portrait.onclick=e=>{e.stopPropagation();edwardPeek(bio.names[0]);};
 identity.appendChild(portrait);
}
function edwardInstallPeekPortrait(){const panel=document.querySelector('#personPeek .person-panel');if(!panel||panel.querySelector('.portrait-feature'))return;
 const title=panel.querySelector('h2')?.textContent||'';const bio=EDWARD_BIOS.find(b=>b.title===title)||edwardBioFor(title);
 if(!bio)return;
 const feature=document.createElement('div');feature.className='portrait-feature';feature.innerHTML=edwardPortraitSvg(bio.id,bio.title);
 const top=panel.querySelector('.peek-top');if(top)top.after(feature);
}
function edwardInstallPeoplePortraits(){
 if(!sheet.querySelector('.network-svg'))return;
 sheet.querySelectorAll('.row').forEach(row=>{
  const b=row.querySelector('b');if(!b||row.querySelector('.people-portrait'))return;
  const label=b.textContent.trim();const bio=edwardBioFor(label);if(!bio)return;
  const art=document.createElement('div');art.className='people-portrait';art.innerHTML=edwardPortraitSvg(bio.id,bio.title);
  row.classList.add('people-portrait-row');row.prepend(art);
 });
}
/* Integrate after the existing extras and progressive reading modules. */
intro=edwardTitleScreen;
const _edwardHomeRenderCard=renderCard;
renderCard=function(){_edwardHomeRenderCard();edwardInstallMenuButton();edwardInstallCardPortrait();};
const _edwardHomePeek=edwardPeek;
edwardPeek=function(name){_edwardHomePeek(name);edwardInstallPeekPortrait();};
const _edwardHomeShowPeople=showPeople;
showPeople=function(){_edwardHomeShowPeople();edwardInstallPeoplePortraits();};
const _edwardHomeEnding=ending;
ending=function(){_edwardHomeEnding();const out=document.getElementById('outro');if(!out)return;out.onclick=null;out.querySelector('.enter')?.remove();
 const buttons=document.createElement('div');buttons.className='home-actions';buttons.style.marginTop='15px';buttons.innerHTML='<button type="button" class="home-btn primary" id="endingNew">New game</button><button type="button" class="home-btn secondary" id="endingHome">Main menu</button><button type="button" class="home-btn tertiary" id="endingLoad">Load another reign</button>';
 out.appendChild(buttons);document.getElementById('endingNew').onclick=edwardNewGameMenu;document.getElementById('endingHome').onclick=edwardTitleScreen;document.getElementById('endingLoad').onclick=edwardLoadGameMenu;
};
/* Override the older Chronicle reset flow so manual saves are preserved and
   the user chooses the starting year explicitly. */
const _edwardHomeShowChronicle=showChronicle;
showChronicle=function(){_edwardHomeShowChronicle();const b=document.getElementById('newReign');if(b){b.textContent='New game / main menu';b.onclick=edwardGameMenu;}};
/* A title screen always appears on launch, even when an autosave exists. */
edwardTitleScreen();
window.EDWARD_HOME={open:edwardTitleScreen,newGame:edwardNewGameMenu,load:edwardLoadGameMenu,gameMenu:edwardGameMenu,start:edwardStartNew,continue:edwardContinue,get autosave(){return edwardAutosave()},portraits:Object.keys(EDWARD_PORTRAIT_STYLES).length};
