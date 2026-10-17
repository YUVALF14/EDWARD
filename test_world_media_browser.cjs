'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const server=http.createServer((q,r)=>{const file=path.join(__dirname,q.url==='/'?'index.html':q.url.split('?')[0]);try{r.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.mp3':'audio/mpeg','.json':'application/json'})[path.extname(file)]||'application/octet-stream');r.end(fs.readFileSync(file));}catch{r.writeHead(404);r.end();}});
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 try{
  const p=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'}),errors=[],missing=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  await p.goto(`http://127.0.0.1:${server.address().port}/`);await p.click('#newGame');await p.click('#beginReign');await p.click('#enterAct');
  const faces=await p.evaluate(async()=>{
   const missing=[];for(const [id,person] of Object.entries(PEOPLE)){
    for(const date of [14610401,14690402]){S.date=date;const markup=portrait(personAt(id));if(markup.includes('initials'))missing.push(id+date);}
    if(person.portraitCell){if(person.portraitCell.length!==4)throw Error('Atlas bounds');}
   }
   const assets=['portraits/court-faces','portraits/young-brothers','transitions/household-hall','transitions/channel-quay','transitions/barnet-mist'];
   for(const asset of assets){const img=new Image();img.src='assets/art/'+asset+'.webp';await img.decode();if(!img.naturalWidth)throw Error(asset);}
   return {missing,total:Object.keys(PEOPLE).length};
  });assert.deepEqual(faces.missing,[]);
  await p.evaluate(()=>{S.itinerary=null;S.cycle=3;S.n=SCENES[3].findIndex(c=>c.title==='The ships are ready');render();});await p.locator('#audienceArt').evaluate(img=>img.decode());assert.match(await p.locator('#audienceArt').getAttribute('src'),/channel-quay/);
  // The actual card and profile use the same representative face.
  await p.evaluate(()=>{S.itinerary=null;S.cycle=0;S.n=SCENES[0].findIndex(c=>c.thread==='kitchen'&&c.part===1);render();});
  await p.locator('#audienceArt').evaluate(img=>img.decode());assert(await p.locator('#audienceArt').isVisible());assert.equal(await p.locator('#portrait svg image').count(),1);
  await p.screenshot({path:'/tmp/edward-media-hall-mobile.png',fullPage:true});await p.click('#portrait');assert.match(await p.locator('#profileName').innerText(),/keeper/i);assert.equal(await p.locator('#profileEmblem svg image').count(),1);await p.keyboard.press('Escape');
  await p.evaluate(()=>{S.date=14610401;openProfile('gloucester');});assert.match(await p.locator('#profileEmblem image').getAttribute('href'),/young-brothers/);await p.screenshot({path:'/tmp/edward-media-young-richard.png',fullPage:true});await p.keyboard.press('Escape');
  const decoded=await p.evaluate(async()=>{const context=new AudioContext(),out={};for(const k of ['muster','battle','arrows']){const b=await (await fetch('assets/audio/war-'+k+'.mp3')).arrayBuffer(),a=await context.decodeAudioData(b);let peak=0;for(const n of a.getChannelData(0))peak=Math.max(peak,Math.abs(n));out[k]={duration:a.duration,peak};}await context.close();return out;});
  for(const a of Object.values(decoded)){assert(a.duration>=3&&a.duration<=12);assert(a.peak>.02&&a.peak<1);}
  await p.click('#menuButton');await p.click('#settingsButton');await p.click('#settingsMusic');await p.click('[data-close=settingsDialog]');await p.waitForFunction(()=>CourtAudio.getState().on&&CourtAudio.getState().ready);
  await p.evaluate(()=>showStories(SCENES.flat().find(c=>c.title==='The crown regained').events));
  await p.waitForFunction(()=>CourtAudio.getState().worldStatus==='playing');assert.match(await p.locator('#storyArt').getAttribute('src'),/barnet-mist/);
  await p.waitForTimeout(220);
  const stable=await p.evaluate(()=>{const before=CourtAudio.getState();CourtAudio.world('battle',before.worldKey);const after=CourtAudio.getState();return {before,after};});assert(stable.after.worldTime>=stable.before.worldTime);assert.equal(stable.after.phrase,stable.before.phrase);assert.equal(stable.after.step,stable.before.step);assert.equal(stable.after.on,true);
  await p.screenshot({path:'/tmp/edward-media-barnet-mobile.png',fullPage:true});await p.click('#storyNext');await p.waitForFunction(()=>CourtAudio.getState().worldKind==='arrows'&&CourtAudio.getState().worldStatus==='playing');await p.click('#storyNext');assert.equal(await p.evaluate(()=>CourtAudio.getState().worldPaused),true);
  await p.evaluate(()=>{CourtAudio.world('muster','test-mute');CourtAudio.toggleWorld();});assert.equal(await p.evaluate(()=>CourtAudio.getState().worldPaused),true);assert.equal(await p.evaluate(()=>CourtAudio.getState().on),true);
  await p.evaluate(()=>CourtAudio.toggleWorld());await p.waitForFunction(()=>CourtAudio.getState().worldStatus==='playing');await p.evaluate(()=>{CourtAudio.setWorldVolume(.12);window.dispatchEvent(new Event('pagehide'));});assert.equal(await p.evaluate(()=>CourtAudio.getState().worldPaused),true);
  // Failed effects stay quiet, and can be retried independently of music.
  await p.route('**/war-battle.mp3',r=>r.abort());await p.evaluate(()=>CourtAudio.world('battle','failed-media'));await p.waitForFunction(()=>CourtAudio.getState().worldStatus==='unavailable');await p.unroute('**/war-battle.mp3');await p.evaluate(()=>{CourtAudio.toggleWorld();CourtAudio.toggleWorld();});await p.waitForFunction(()=>CourtAudio.getState().worldStatus==='playing');
  for(const width of [320,375,390]){await p.setViewportSize({width,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
  await p.reload();assert.equal(await p.evaluate(()=>CourtAudio.getState().worldVolume),.12);assert.equal(await p.evaluate(()=>CourtAudio.getState().worldEnabled),true);
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log('PASS: all '+faces.total+' speakers have portraits, age-specific brothers, scene plates, three decoded non-silent CC0 cues, actual playback, continuous music, no replay on same cue, stop/mute/pagehide/retry, saved settings and mobile widths.',decoded);
 }finally{await browser.close();server.closeAllConnections();await new Promise(ok=>server.close(ok));}
})().catch(e=>{console.error(e);process.exit(1);});
