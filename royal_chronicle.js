/* The Chronicle is a readable record produced from the existing saved world.
   It presents evidence and later reports without inventing causal links. */
function chronicleChapterForEntry(entry){
 const year=Number(String(entry.chapter||'').match(/14\d\d/)?.[0])||Number(entry.year)||Number(world.sandbox?.year)||1461;
 return (window.EDWARD_CAMPAIGN?.forYear(year))||{number:'',title:'The Reign',from:1461,to:1483};
}
function chronicleThread(entry){
 const text=[entry.id,entry.place,entry.decision,entry.summary].join(' ').toLowerCase();
 if(/succession|heir|clarence|gloucester|marriage|wardship|inheritance|prince/.test(text))return 'Succession & households';
 if(/warwick|neville|woodville|hastings|council|office|appointment|chancellor/.test(text))return 'Court & council';
 if(/credit|loan|treasury|wage|custom|revenue|merchant|tax/.test(text))return 'Revenue & service';
 if(/france|burgundy|envoy|diplomac|treaty|calais|channel/.test(text))return 'Foreign relations';
 if(/battle|war|campaign|armed|rebellion|captain|prisoner|towton|hexham/.test(text))return 'War & security';
 if(/church|bishop|priest|sanctuary|parish|archbishop/.test(text))return 'Church & sanctuary';
 if(/north|york|caister|nibley|county|village|estate|manor|land/.test(text))return 'Places & local rule';
 return 'The Crown';
}
function chronicleRecordHTML(entry){
 const chapter=chronicleChapterForEntry(entry),thread=chronicleThread(entry);
 const source=entry.arena==='up'?'Council hearing':entry.arena==='down'?'Private audience':'The King’s decision';
 const date=entry.chapter||('Decision '+entry.turn);
 return '<article class="chronicle-entry" data-chronicle-thread="'+E(thread)+'"><div class="chronicle-meta"><span>'+E(date)+' · '+E(entry.place||'The royal court')+'</span><span>'+E(thread)+'</span></div><h3>'+E(entry.summary||entry.decision||'A royal act was entered in the record.')+'</h3><p><b>'+E(source)+':</b> '+E(entry.decision||'The record does not preserve the exact wording.')+'</p><div class="chronicle-seal">ROYAL RECORD · DECISION '+E(entry.turn)+'</div></article>';
}
function chronicleReportHTML(report){
 const certainty=String(report.certainty||'reported').replaceAll('_',' ');
 return '<article class="chronicle-report"><div class="chronicle-meta"><span>Received after decision '+E(report.turn??'—')+'</span><span>'+E(certainty)+'</span></div><h3>'+E(report.from||'A messenger')+'</h3><p>'+E(report.text)+'</p><small>This is information that reached the Crown, not an omniscient account.</small></article>';
}
function showChronicle(){
 const entries=(world.chronicle||[]).slice().reverse();
 const years=new Map();
 for(const entry of entries){const ch=chronicleChapterForEntry(entry),key=ch.id||ch.title;if(!years.has(key))years.set(key,{chapter:ch,entries:[]});years.get(key).entries.push(entry);}
 const folios=[...years.values()].map((folio,index)=>'<details class="chronicle-folio" '+(index===0?'open':'')+'><summary><span>PART '+E(folio.chapter.number||'')+' · '+E(folio.chapter.title)+'</span><small>'+folio.entries.length+' entries</small></summary><div class="chronicle-leaf">'+folio.entries.map(chronicleRecordHTML).join('')+'</div></details>').join('');
 const filters=['All entries','The Crown','Court & council','Revenue & service','Foreign relations','War & security','Church & sanctuary','Places & local rule','Succession & households'];
 const reports=(world.reports||[]).slice(-20).reverse();
 const dossiers=(world.sandbox?.narrative?.journal||[]).slice(-12).reverse();
 const dossierHTML=dossiers.map(j=>'<article class="chronicle-report"><div class="chronicle-meta"><span>'+E(j.year)+' · '+E(j.stage==='echo'?'A matter returned':'Dossier entered')+'</span><span>Historical context</span></div><h3>'+E(ND_CASES[j.key]?.title||j.key)+'</h3><p>'+E(j.summary)+'</p><small>Documented dispute; this reign’s encounter and outcome are reconstructed.</small></article>').join('');
 const incidents=(world.life?.journal||[]).filter(j=>j.stage==='resolved').slice(-8).reverse();
 const incidentHTML=incidents.map(j=>'<article class="chronicle-report"><div class="chronicle-meta"><span>'+E(j.year)+' · '+E(j.kind)+'</span><span>Life in the realm</span></div><p>'+E(j.text)+'</p><small>Generated incident shaped by local conditions and chance.</small></article>').join('');
 openSheet('The Royal Chronicle','<div class="chronicle-intro"><div class="eyebrow">A RECORD OF THIS REIGN</div><p>Orders, decisions and reports are entered as the court encounters them. Later reports are preserved here, but are not assigned a cause unless the record says so.</p></div><div class="chronicle-filters" role="group" aria-label="Filter Chronicle entries">'+filters.map((label,i)=>'<button type="button" data-chronicle-filter="'+E(label)+'" aria-pressed="'+(i===0?'true':'false')+'">'+E(label)+'</button>').join('')+'</div><div id="chronicleFolios">'+(folios||'<p>No royal act has yet entered the Chronicle.</p>')+'</div><section class="chronicle-section"><h3>Reports received by the Crown</h3><p class="chronicle-note">Each messenger speaks from a limited point of view. Certainty is shown as the game recorded it.</p>'+(reports.length?reports.map(chronicleReportHTML).join(''):'<p>No reports have yet reached the court.</p>')+'</section><section class="chronicle-section"><h3>Disputes and their returns</h3><p class="chronicle-note">Historical disputes are distinct from the fictional course of this reign.</p>'+(dossierHTML||'<p>No dossier has yet entered this reign.</p>')+'</section><section class="chronicle-section"><h3>Life beyond the council chamber</h3>'+(incidentHTML||'<p>No resolved life incident has yet been recorded.</p>')+'</section><button class="reset-link" id="newReign">Begin a new reign</button>');
 sheet.querySelectorAll('[data-chronicle-filter]').forEach(button=>button.onclick=()=>{
  const value=button.dataset.chronicleFilter;
  sheet.querySelectorAll('[data-chronicle-filter]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  sheet.querySelectorAll('.chronicle-entry').forEach(item=>item.hidden=value!=='All entries'&&item.dataset.chronicleThread!==value);
 });
 document.getElementById('newReign').onclick=()=>{if(confirm('Erase this reign and begin again?')){clearWorld();world=newWorld();current=null;arena=null;closeSheet();intro();}};
}
