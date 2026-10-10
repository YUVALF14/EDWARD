/* Readable causal histories. Never display hidden private acts in the public Casebook. */
const _seOldShowCases=showCases;
showCases=function(){_seOldShowCases();const st=world.sandbox?.story;
 if(!st){sheet.insertAdjacentHTML('beforeend','<div class="eyebrow">THE INTERWOVEN CHRONICLES</div><p>The six political chronicles open after 1464. Your early choices shape their starting conditions.</p>');return;}
 const arcs=Object.entries(SE_STORIES).map(([id,def])=>{
  const a=st.arcs[id],entries=st.journal.filter(j=>j.arc===id),count=def.beats.length;
  const label=a.stage>=count?(a.heard?'CONCLUDED':'EARLIER YEARS NOT IN SAVE'):a.inFlight?'BEFORE THE KING':a.heard?'DEVELOPING':a.stage?'STARTS MID-REIGN':'NOT YET HEARD';
  const latest=entries[entries.length-1],start=entries[0];
  const rows=entries.slice().reverse().map(j=>'<div class="story-beat"><div class="eyebrow">'+E(j.year)+' · PART '+E(j.part)+' · '+E(SE_STORIES[id].beats[j.part-1].tag)+'</div><div>'+E(j.summary)+'</div><small>'+E(j.report||'The decision entered the royal record.')+'</small></div>').join('');
  return '<details class="story-case" '+(id==='neville'&&entries.length?'open':'')+'><summary><span class="story-case-title">'+E(def.title)+'</span><span class="story-case-count">'+E(a.heard)+' / '+count+' · '+label+'</span></summary><div class="story-case-body">'+(latest?'<p>Last ruling: '+E(latest.summary)+'</p>':'<p>This story has not yet come before Edward.</p>')+'<p><small>Historical setting: '+E(def.anchor)+'</small></p>'+(rows||'')+'<a target="_blank" rel="noopener noreferrer" href="'+E(def.source)+'">Historical reference ↗</a></div></details>';
 }).join('');
 const cross=st.crossJournal.slice().reverse().map(x=>'<div class="row"><div class="eyebrow">'+E(x.year)+' · TWO STORIES COLLIDE</div><b>'+E(SE_CROSSOVERS[x.id].title)+'</b><span>'+E(x.reason)+'</span><span>Your ruling: '+E(x.summary)+'</span></div>').join('');
 sheet.insertAdjacentHTML('beforeend','<div class="eyebrow" style="margin-top:25px">SIX INTERWOVEN CHRONICLES</div><p>These are ongoing political histories, not a list of fixed quests. Some chapters may never be heard, and another household may act before the next hearing.</p>'+arcs+'<div class="eyebrow" style="margin-top:23px">WHEN TWO STORIES COLLIDE</div>'+(cross||'<p>No overlapping political crisis has reached the Council yet. Such cases appear only when two earlier choices create a shared problem.</p>')+'<p><small>The speeches and individual orders are fictional reconstructions. The casebook shows decisions and reports, not secret information held by other actors.</small></p>');
 edwardSheetNames();
};
const _seOldMapStatus=edwardMapStatus;
edwardMapStatus=function(id){const base=_seOldMapStatus(id),st=world.sandbox?.story;if(!st)return base;
 if(id==='caister'){const p=st.property.caister;return base+' In this reign: recorded possession '+p.possession+'; title '+p.title+'; rents '+p.rents+'.';}
 if(id==='north'||id==='york'){const v=st.flags.northEarldom;return base+(v?' The current northern title settlement favours '+(v==='percy'?'the Percies.':'the Nevilles.'):'');}
 if(id==='calais'){const v=st.flags.frenchSettlement;return base+(v?' Edward has pursued '+(v==='payments'?'a negotiated French payment settlement.':'a continued continental military commitment.'):'');}
 return base;
};
const _seOldShowChronicle=showChronicle;
showChronicle=function(){_seOldShowChronicle();const journal=world.sandbox?.story?.journal||[];if(!journal.length)return;
 const recent=journal.slice(-12).reverse().map(j=>'<div class="row"><div class="eyebrow">'+E(j.year)+' · '+E(SE_STORIES[j.arc].title)+' · PART '+E(j.part)+'</div><b>'+E(j.summary)+'</b><span>'+E(j.report||'A royal order entered the record.')+'</span></div>').join('');
 sheet.insertAdjacentHTML('beforeend','<div class="eyebrow" style="margin-top:25px">THE INTERWOVEN CHRONICLES · RECENT DECISIONS</div>'+recent);
};
