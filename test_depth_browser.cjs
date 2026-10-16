'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const server=http.createServer((q,r)=>{const p=path.join(__dirname,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);try{r.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.json':'application/json','.mp3':'audio/mpeg'})[path.extname(p)]||'application/octet-stream');r.end(fs.readFileSync(p));}catch{r.writeHead(404);r.end();}});
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1050},reducedMotion:'reduce'}),p=await context.newPage(),errors=[],failed=[];
 p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)failed.push(r.url());});
 await p.addInitScript(()=>{Math.random=()=>0.42;});
 await p.goto(`http://127.0.0.1:${server.address().port}/`);
 await p.evaluate(()=>localStorage.setItem('edward-living-court-act-v3','earlier-save-untouched'));await p.click('#newGame');await p.click('#beginReign');await p.click('#enterAct');
 const reserve=await p.evaluate(()=>{
  const signatures=new Set(),seen=new Set();
  for(let seed=1;seed<=100;seed++){
   let value=seed;const random=()=>{value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967296;};
   const v=fresh();
   for(let a=0;a<4;a++){
    v.cycle=a;v.itinerary[a]=selectReserve(a,v,random);
    if(!validItinerary(v))throw Error('Invalid selected route');
    const cards=campaignScenes(a,v);if(cards.length!==44)throw Error('Wrong route length');
    if(cards.filter(c=>!c.thread).length!==20)throw Error('A central card was lost');
    for(const id of v.itinerary[a]){seen.add(id);if(cards.filter(c=>c.thread===id).length!==4)throw Error('Broken story');}
    if(cards.some((c,i)=>i&&c.date<cards[i-1].date))throw Error('Chronology');
   }
   signatures.add(JSON.stringify(v.itinerary));
  }
  const poor=fresh(),prepared=fresh();poor.realm.readiness=10;prepared.realm.readiness=90;
  const t=THREADS.find(t=>t.id==='harlech');
  return {variants:signatures.size,seen:seen.size,poor:reserveWeight(t,poor),prepared:reserveWeight(t,prepared)};
 });
 assert(reserve.variants>90);assert.equal(reserve.seen,40);assert(reserve.poor>reserve.prepared);
 await p.evaluate(()=>{
  const saved=structuredClone(S),bad=structuredClone(S);
  bad.itinerary[0][2]=bad.itinerary[0][0];if(validSave(bad))throw Error('Duplicate story accepted');
  bad.itinerary[0]=['missing'];if(validSave(bad))throw Error('Unknown story accepted');
  const legacy=structuredClone(saved);delete legacy.itinerary;
  if(!validSave(legacy))throw Error('Old v4 save rejected');
  localStorage.setItem(SAVE_KEY,JSON.stringify(legacy));loadAct();$('enterAct').click();
  if(S.itinerary!==null||actLength()!==60)throw Error('Old route changed on load');
  Object.assign(S,saved);persistAct(true);render();
 });
 const initialRoute=await p.evaluate(()=>JSON.stringify(S.itinerary));
 const n=await p.evaluate(()=>S.n);
 await p.click('#royalCouncil');await p.click('[data-initiative=progress]');
 assert(await p.locator('#journeyDialog').isVisible());await p.keyboard.press('Escape');assert(await p.locator('#journeyDialog').isVisible(),'A progress cannot be abandoned and replayed for rewards');
 await p.click('[data-journey=town]');assert.match(await p.locator('#journeyText').innerText(),/child waves/);await p.click('[data-journey=stop]');await p.click('[data-journey=return]');
 assert.equal(await p.evaluate(()=>S.n),n,'A local progress does not consume or skip the authored audience');
 const afterProgress=await p.evaluate(()=>({council:S.council.length,region:S.regions.north,saved:getSaved().council.length}));assert.equal(afterProgress.council,1);assert.equal(afterProgress.region,48);assert.equal(afterProgress.saved,1);
 await p.click('#royalCouncil');await p.click('[data-initiative=messengers]');assert.equal(await p.locator('#councilOptions button:not([disabled])').count(),0,'Exactly two initiatives per act');await p.keyboard.press('Escape');
 await p.reload();await p.click('#resumeGame');await p.click('#enterAct');assert.equal(await p.evaluate(()=>JSON.stringify(S.itinerary)),initialRoute,'Reload retains exact reserve selection');assert.equal(await p.evaluate(()=>S.council.length),2,'Council actions persist across reload');
 await p.evaluate(()=>setView('realm'));await p.click('#expandMap');assert.equal(await p.locator('#largeMap svg').count(),1);assert.equal(await p.locator('#courtPin').count(),1);await p.keyboard.press('Escape');await p.locator('summary').filter({hasText:'Places & powers'}).click();await p.click('[data-region=france]');assert.match(await p.locator('#regionTitle').innerText(),/Louis XI/);await p.keyboard.press('Escape');
 await p.locator('summary').filter({hasText:'Your objectives'}).click();assert.equal(await p.locator('#generalObjectives li').count(),3);await p.screenshot({path:'/tmp/edward-depth-realm.png',fullPage:true});
 await p.evaluate(()=>setView('audience'));
 const branches=await p.evaluate(()=>{
  function run(first){startNew();$('enterAct').click();let n=0;while(!(scene().thread==='road'&&scene().part===3)&&n++<20){choose(scene().thread==='road'&&scene().part===1?first:0);while($('storyDialog').open)$('storyNext').click();}const choices=getChoices().length;choose(0);return {context:scene().context,choices};}
  return {a:run(0),b:run(1)};
 });assert.equal(branches.a.choices,3);assert.equal(branches.b.choices,2);assert.notEqual(branches.a.context,branches.b.context,'The earlier route changes a later audience and response');
 // Audio continuity through public calls: a mood request cannot restart the phrase.
 await p.click('#musicToggle');await p.waitForFunction(()=>CourtAudio.getState().ready&&CourtAudio.getState().on);
 const continuity=await p.evaluate(()=>{const before=CourtAudio.getState();CourtAudio.setMood('instability');const after=CourtAudio.getState();return {before,after};});
 assert.equal(continuity.before.step,continuity.after.step);assert.equal(continuity.before.phrase,continuity.after.phrase);assert.equal(continuity.after.requestedMood,'instability');
 const stable=await p.evaluate(()=>{CourtAudio.setMood(ACTS[S.cycle].tone);const before=CourtAudio.getState();render();render();openProfile('hastings');closeDialog('personDialog');const after=CourtAudio.getState();return {before,after};});assert.equal(stable.before.phrase,stable.after.phrase);assert.equal(stable.before.step,stable.after.step);
 // All campaign saves are loadable after every audience, not only at act openings.
 const saves=await p.evaluate(()=>{
  startNew();$('enterAct').click();let tested=0;
  while(!S.ended&&tested<240){const options=getChoices();let i=options.findIndex(o=>o.k==='investigate');if(scene().title==='The crown under guard')i=options.findIndex(o=>o.k==='settle');if(i<0)i=options.findIndex(o=>!['plot','escape','depose'].includes(o.k));choose(i);while($('storyDialog').open)$('storyNext').click();if($('actDialog').open)$('enterAct').click();tested++;if(!S.ended&&!validSave(JSON.parse(localStorage.getItem(SAVE_KEY))))throw Error('Invalid autosave at '+scene().title);}
  return {tested,documents:S.documents.length,stories:THREADS.filter(t=>S.flags['thread:'+t.id+':3']!==undefined).length,date:S.date};
 });assert.equal(saves.tested,176);assert.equal(saves.stories,24);assert.equal(saves.documents,36);assert(saves.date<=14711231);
 // Gloucester has a visible working portrait in his own 1469 audience.
 await p.evaluate(()=>{startNew();$('enterAct').click();while(scene().title!=='Your youngest brother stands'){choose(0);while($('storyDialog').open)$('storyNext').click();if($('actDialog').open)$('enterAct').click();}});
 assert.equal(await p.locator('#portrait img').count(),1);assert(await p.locator('#portrait img').evaluate(img=>img.complete&&img.naturalWidth>0));await p.screenshot({path:'/tmp/edward-depth-gloucester.png',fullPage:true});
 // Costs without reserves become debt, and high information changes the escape hazard.
 const unlocked=await p.evaluate(()=>{const saved=structuredClone(S);S.cycle=2;S.n=campaignScenes(2).findIndex(c=>c.title==='A campaign on credit');S.realm.credit=40;const low=getChoices().length;S.realm.credit=65;const high=getChoices().length;Object.assign(S,saved);return {low,high};});assert.equal(unlocked.low,2);assert.equal(unlocked.high,3,'Established credit opens a specific supply course');
 const economy=await p.evaluate(()=>{const saved=structuredClone(S);S.realm.coin=0;S.realm.debt=0;S._reserveBefore=0;changeRealm({coin:-3},'Unfunded provisions');delete S._reserveBefore;const debt=S.realm.debt;Object.assign(S,saved);return debt;});assert.equal(economy,3);
 for(const width of [390,375,320]){await p.setViewportSize({width,height:844});await p.evaluate(()=>setView('audience'));assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.click('#royalCouncil');assert(await p.evaluate(()=>$('councilDialog').scrollWidth<=$('councilDialog').clientWidth+1));await p.screenshot({path:`/tmp/edward-depth-council-${width}.png`,fullPage:true});await p.keyboard.press('Escape');}
 assert.equal(await p.evaluate(()=>localStorage.getItem('edward-living-court-act-v3')),'earlier-save-untouched');assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);console.log('PASS: initiatives/caps, local progress, persistent council, continental map, objectives, actual branching, uninterrupted audio scheduling, 176 validated autosaves, Gloucester portrait and three mobile widths.',saves);
 }finally{await browser.close();server.closeAllConnections();await new Promise(ok=>server.close(ok));}
})().catch(e=>{console.error(e);process.exit(1);});
