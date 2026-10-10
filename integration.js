/* EDWARD — history lens and conditional-crisis casebook. */
const _worldOldGameMenu=edwardGameMenu;
edwardGameMenu=function(){_worldOldGameMenu();const before=sheet.querySelector('.menu-divider');if(!before)return;
 const btn=document.createElement('button');btn.className='menu-choice';btn.type='button';btn.id='menuHistoricalLens';btn.innerHTML='History &amp; your reign <span>⌛</span>';btn.onclick=edwardHistoricalLens;before.before(btn);
};
const _worldOldShowHistory=showHistory;
showHistory=function(){_worldOldShowHistory();const p=document.createElement('p');p.innerHTML='<button class="reset-link" type="button" id="historyLensFromCard">Compare with recorded history →</button>';sheet.appendChild(p);document.getElementById('historyLensFromCard').onclick=edwardHistoricalLens;};
const _worldOldShowCases=showCases;
showCases=function(){_worldOldShowCases();const sb=world.sandbox;if(!sb)return;
 const fold=sheet.querySelector('.casebook-fold');if(!fold)return;
 const body=fold.querySelector('.reading-detail-body');if(!body)return;
 const pressure=sb.pressure?.journal||[],quiet=sb.story?.quietClosures||[];
 const heard=pressure.slice(-9).reverse().map(j=>'<div class="row"><div class="eyebrow">'+E(j.year)+' · '+E(j.stage==='resolved-offscreen'?'RESOLVED WITHOUT A HEARING':'A CONDITIONAL CRISIS')+'</div><b>'+E(WP_CASES[j.id]?.name||j.id)+'</b><span>'+E(j.outcome)+'</span></div>').join('');
 const avoided=quiet.slice(-6).reverse().map(j=>'<div class="row"><div class="eyebrow">'+E(j.year)+' · DID NOT OCCUR</div><b>'+E(SE_STORIES[j.arc]?.title||j.arc)+'</b><span>'+E(j.reason)+'</span></div>').join('');
 body.insertAdjacentHTML('beforeend','<div class="eyebrow" style="margin:15px 0 8px">WORLD-GENERATED CRISES</div>'+(heard||'<p>No major conditional crisis has reached the court.</p>')+'<div class="eyebrow" style="margin:15px 0 8px">CONFLICTS PREVENTED BY EARLIER ORDERS</div>'+(avoided||'<p>No prevented confrontation recorded yet.</p>'));
 const summary=fold.querySelector('summary');if(summary){const title=summary.firstChild;if(title&&title.nodeType===3)title.textContent='Emergent crises and intersections';}
};
const _worldOldShowChronicle=showChronicle;
showChronicle=function(){_worldOldShowChronicle();const journal=world.sandbox?.pressure?.journal||[];if(!journal.length)return;
 sheet.insertAdjacentHTML('beforeend','<div class="eyebrow" style="margin-top:24px">CONDITIONAL CRISES · THE WORLD REACTS</div>'+journal.slice(-8).reverse().map(j=>'<div class="row"><div class="eyebrow">'+E(j.year)+' · '+E(WP_CASES[j.id]?.name||j.id)+'</div><b>'+E(j.outcome)+'</b><span>Created by prior political conditions; not a fixed historical event.</span></div>').join(''));
};
const _worldOldMapStatus=edwardMapStatus;
edwardMapStatus=function(id){const base=_worldOldMapStatus(id),f=world.sandbox?.story?.flags||{};
 if(id==='calais'&&['trade-truce','divided-trade'].includes(f.frenchSettlement))return base.replace(/Edward has pursued a continued continental military commitment\./,'In this reign Edward pursued commercial terms without an English invasion.');
 if(id==='caister'&&f.caisterPeace==='prevented')return base+' In this reign an earlier royal intervention prevented the siege that occurred in recorded history.';
 return base;
};
// Existing saves retain their original schema and slots; missing geography is migrated lazily.
const _worldOldSbInit=sbInit;
sbInit=function(s){const sb=_worldOldSbInit(s);if(sb.unrest['East Anglia']===undefined)sb.unrest['East Anglia']=0;if(sb.unrest['West Country']===undefined)sb.unrest['West Country']=0;return sb;};
window.EDWARD_WORLD={history:EDWARD_HISTORY_ANCHORS,crises:WP_CASES,openHistory:edwardHistoricalLens,audit:()=>edwardHistoryAudit(world),get pressure(){return world.sandbox?.pressure||null},get quiet(){return world.sandbox?.story?.quietClosures||[]}};
