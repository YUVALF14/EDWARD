/* In-game acknowledgements and reading room. Presentation only: no world mutations. */
let edwardPendingDialog=false,edwardNoticeTimer=null;
function edwardConfirm(message,{title='Confirm your action',action='Confirm'}={}){
 if(edwardPendingDialog)return Promise.resolve(false);
 edwardPendingDialog=true;
 return new Promise(resolve=>{
  const previous=document.activeElement,backdrop=document.createElement('div');
  backdrop.id='royalDialog';backdrop.className='royal-dialog-backdrop';
  backdrop.innerHTML='<section class="royal-dialog" role="alertdialog" aria-modal="true" aria-labelledby="royalDialogTitle" aria-describedby="royalDialogText"><div class="eyebrow">EDWARD IV</div><h2 id="royalDialogTitle">'+E(title)+'</h2><p id="royalDialogText">'+E(message)+'</p><div class="royal-dialog-actions"><button type="button" class="home-btn secondary" data-dialog-cancel>Cancel</button><button type="button" class="home-btn primary" data-dialog-confirm>'+E(action)+'</button></div></section>';
  const surfaces=[app,overlay],oldInert=surfaces.map(x=>x.inert);surfaces.forEach(x=>x.inert=true);
  document.body.appendChild(backdrop);
  const cancel=backdrop.querySelector('[data-dialog-cancel]'),yes=backdrop.querySelector('[data-dialog-confirm]');
  const finish=value=>{document.removeEventListener('keydown',keys,true);backdrop.remove();surfaces.forEach((x,i)=>x.inert=oldInert[i]);edwardPendingDialog=false;if(previous?.isConnected)previous.focus();resolve(value);};
  const keys=e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();finish(false);}else if(e.key==='Tab'){e.preventDefault();e.stopPropagation();(document.activeElement===cancel?yes:cancel).focus();}else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))e.stopPropagation();};
  cancel.onclick=()=>finish(false);yes.onclick=()=>finish(true);backdrop.onclick=e=>{if(e.target===backdrop)finish(false);};document.addEventListener('keydown',keys,true);cancel.focus();
 });
}
function edwardNotify(title,text,{record=false}={}){
 clearTimeout(edwardNoticeTimer);document.getElementById('royalNotice')?.remove();
 const notice=document.createElement('aside');notice.id='royalNotice';notice.className='royal-notice';
 notice.innerHTML='<div class="royal-notice-copy" role="status" aria-live="polite"><strong>'+E(title)+'</strong><p>'+E(text)+'</p></div><button class="royal-notice-close" type="button" aria-label="Dismiss notification">×</button>'+(record?'<button class="royal-notice-record" type="button">View Chronicle</button>':'');
 notice.querySelector('.royal-notice-close').onclick=()=>notice.remove();
 if(record)notice.querySelector('.royal-notice-record').onclick=()=>{notice.remove();showChronicle();};
 document.body.appendChild(notice);edwardNoticeTimer=setTimeout(()=>notice.remove(),9000);
}
const _presentationDecide=decide;
decide=function(side){
 const card=current,choice=(arena?card?.[arena]:card)?.[side],before=world.chronicle.length;
 _presentationDecide(side);
 const e=choice?.effects,significant=card&&(card.priority>=90||card.storyInfo||card.caseInfo||card.lifeInfo||e?.offices||e?.obligations||e?.facts);
 const entry=world.chronicle.slice(before).find(x=>x.id===card?.id);
 if(significant&&entry)edwardNotify('Your decision is entered',entry.summary,{record:true});
};
function edwardTextPages(text,limit=(window.innerHeight<650||window.innerWidth<350)?42:65){
 const words=String(text||'').trim().split(/\s+/).filter(Boolean),pages=[];
 while(words.length){let count=Math.min(limit,words.length);if(count<words.length){for(let i=count-1;i>=Math.floor(limit*.55);i--){if(/[.!?][”’"']?$/.test(words[i])){count=i+1;break;}}}pages.push(words.splice(0,count).join(' '));}
 return pages;
}
function edwardOpenReader({pages,eyebrow='',doneLabel='Return to the court',onDone=()=>{},extraLabel='',onExtra=()=>{},closeLabel='Close reading'}={}){
 if(!pages?.length)return;let page=0;
 function leave(callback){closeSheet();callback();}
 function render(move=false){const p=pages[page],last=page===pages.length-1;
  openSheet('','<main class="reading-room" aria-labelledby="readerTitle"><header class="reader-top"><span>'+E(eyebrow)+'</span><button type="button" id="readerClose" aria-label="'+E(closeLabel)+'">×</button></header><article class="reader-leaf"><div class="reader-rule"></div><h1 id="readerTitle" tabindex="-1">'+E(p.title)+'</h1>'+p.html+'</article><footer class="reader-navigation"><p id="readerPosition" aria-live="polite">'+(page+1)+' / '+pages.length+'</p><div class="reader-buttons"><button class="home-btn secondary" id="readerBack" type="button" '+(page===0?'disabled':'')+'>Back</button><button class="home-btn primary" id="readerNext" type="button">'+E(last?doneLabel:'Next page')+'</button></div>'+(last&&extraLabel?'<button class="reader-extra" id="readerExtra" type="button">'+E(extraLabel)+'</button>':'')+'</footer></main>');
  overlay.classList.add('reading-fullscreen');sheet.scrollTop=0;sheet.setAttribute('aria-labelledby','readerTitle');
  document.getElementById('readerClose').onclick=()=>leave(()=>{});
  document.getElementById('readerBack').onclick=()=>{if(page){page--;render(true);}};
  document.getElementById('readerNext').onclick=()=>{if(last)leave(onDone);else{page++;render(true);}};
  const extra=document.getElementById('readerExtra');if(extra)extra.onclick=()=>leave(onExtra);
  sheet.onkeydown=e=>{if(e.key==='ArrowLeft'&&page){e.preventDefault();page--;render(true);}else if(e.key==='ArrowRight'&&!last){e.preventDefault();page++;render(true);}else if(e.key==='Tab'){const buttons=[...sheet.querySelectorAll('.reading-room button:not(:disabled)')],first=buttons[0],lastButton=buttons.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();lastButton.focus();}else if(!e.shiftKey&&document.activeElement===lastButton){e.preventDefault();first.focus();}}};
  if(move)document.getElementById('readerTitle').focus();else document.getElementById('readerNext').focus();
 }
 render();
}
const _presentationClose=closeSheet;
closeSheet=function(){overlay.classList.remove('reading-fullscreen');sheet.removeAttribute('aria-labelledby');sheet.onkeydown=null;_presentationClose();};
function edwardCardReader(){
 const d=edwardFocusData();if(!d)return;const pages=[];
 function section(title,text,quote=false){for(const part of edwardTextPages(text))pages.push({title,html:'<p class="'+(quote?'reader-quotation':'reader-prose')+'">'+(quote?'“':'')+E(part)+(quote?'”':'')+'</p>'});}
 section((arena?current[arena]?.who:current.who)||'At court',d.fullQuote,true);section('What Edward knows',d.fullContext);section('The decision before you',d.stake);
 section('Your first possible answer',d.original.left.label,true);section('Your other possible answer',d.original.right.label,true);if(current.wait&&!arena)section('Wait for more evidence',current.wait.label);
 edwardOpenReader({pages,eyebrow:current.where+' · '+current.when,doneLabel:'Return to the decision',extraLabel:'Context & sources',onExtra:edwardReadingMore});
}
const _presentationReadingMore=edwardReadingMore;
edwardReadingMore=function(){_presentationReadingMore();if(!current)return;const b=document.createElement('button');b.className='reader-launch';b.textContent='Read this scene in pages';b.onclick=edwardCardReader;sheet.querySelector('.reading-summary')?.after(b);};
