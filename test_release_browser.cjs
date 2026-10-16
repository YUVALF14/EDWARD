'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
let playwright;try{playwright=require('playwright');}catch{playwright=require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules','playwright'));}
const ROOT=__dirname;
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.woff':'font/woff','.json':'application/json','.mp3':'audio/mpeg'};
async function main(){
 const server=http.createServer((q,r)=>{const pathname=decodeURIComponent(q.url.split('?')[0]);const file=path.resolve(ROOT,'.'+pathname);if(!file.startsWith(ROOT+path.sep)){r.writeHead(403);r.end();return;}try{r.setHeader('Content-Type',mime[path.extname(file)]||'text/plain');r.end(fs.readFileSync(file));}catch{r.writeHead(404);r.end();}});
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const browser=await playwright.chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--use-gl=angle','--use-angle=swiftshader']});
 const base=process.env.EDWARD_TEST_URL||`http://127.0.0.1:${server.address().port}/edward-loop-demo.html`;
 const errors=[],failed=[],out=process.env.EDWARD_SCREENSHOTS||'/tmp/edward-qa';fs.mkdirSync(out,{recursive:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.status()+' '+r.url());});
 async function begin(p){await p.click('#newGame');if(await p.locator('#newDialog').isVisible())await p.click('#confirmNew');await p.click('#beginReign');await p.click('#enterAct');}
 async function advanceStories(p){while(await p.locator('#storyDialog').isVisible())await p.click('#storyNext');}
 async function choiceIndex(p,mode){return p.evaluate(mode=>{const opts=getChoices();if(scene().title==='A loose watch')return opts.findIndex(o=>o.k==='investigate');if(scene().title==='The crown under guard')return opts.findIndex(o=>o.k==='settle');const preferences=mode==='mercy'?['pardon','faith','queen','joint','settle','bounded','hold','pay','investigate']:['direct','assert','mobilize','execute','hastings','gloucester','commission','pursue','pay'];let best=0,rank=1000;opts.forEach((o,i)=>{const n=preferences.indexOf(o.k);if(n>=0&&n<rank){best=i;rank=n;}});return best;},mode);}
 await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(out,'desktop-title.png')});await begin(page);
 await page.screenshot({path:path.join(out,'desktop-audience.png'),fullPage:true});
 assert(!await page.locator('#allies').innerText().then(t=>t.includes('Elizabeth')),'No queen in 1461 court');
 await page.click('#portrait');assert.match(await page.locator('#profileName').innerText(),/Richard Neville/);await page.keyboard.press('Escape');assert(!await page.locator('#personDialog').isVisible());
 await page.click('#historyLink');assert.match(await page.locator('#historyPopupTitle').innerText(),/Towton/);await page.keyboard.press('Escape');
 // Real clicks through all four acts, with every card rendered in the browser.
 let count=0;for(let a=0;a<4;a++){
  for(let n=0;n<60;n++){const i=await choiceIndex(page,'mercy');await page.locator('#choices .choice').nth(i).click();await advanceStories(page);count++;}
  if(a<3){assert(await page.locator('#actDialog').isVisible());const save=await page.evaluate(()=>getSaved());assert.equal(save.n,0);assert.equal(save.cycle,a+1);await page.screenshot({path:path.join(out,`act-${a+2}.png`)});await page.click('#enterAct');}
  console.log('Played act',a+1,'/',4);
 }
 assert.equal(count,240);assert.match(await page.locator('#endTitle').innerText(),/regained/g);
 await page.screenshot({path:path.join(out,'ending-1471.png'),fullPage:true});const mercySignature=await page.locator('#signature').innerText();
 // Replay with a different political style through the same public decision seam.
 await page.evaluate(()=>{startNew();document.getElementById('enterAct').click();});
 for(let k=0;k<240;k++){const i=await choiceIndex(page,'command');await page.evaluate(i=>{choose(i);if(document.getElementById('actDialog').open)document.getElementById('enterAct').click();while(document.getElementById('storyDialog').open)document.getElementById('storyNext').click();},i);}
 assert.match(await page.locator('#endTitle').innerText(),/regained/g);
 const command=await page.evaluate(()=>({a:S.authority,o:S.order,s:S.succession,log:S.log.length,signature:document.getElementById('signature').textContent}));assert.equal(command.log,240);assert.notEqual(command.signature,mercySignature,'Different governing styles leave different signatures');
 // Reach the early endings from actual starting decisions, not edited states.
 const early=await page.evaluate(()=>{
  function run(kind){startNew();document.getElementById('enterAct').click();let limit=0;
   while(!S.ended&&limit++<240){const opts=getChoices();let i=0;
    if(scene().title==='A loose watch')i=opts.findIndex(o=>o.k=== (kind==='death'?'plot':'investigate'));
    else if(scene().title==='The crown under guard')i=opts.findIndex(o=>o.k==='depose');
    else{const want=['promise','pursue','direct','assert','execute','defer','queen','land','mobilize'];let best=99;opts.forEach((o,j)=>{const r=want.indexOf(o.k);if(r>=0&&r<best){best=r;i=j;}});}
    choose(i);if(document.getElementById('actDialog').open)document.getElementById('enterAct').click();while(document.getElementById('storyDialog').open)document.getElementById('storyNext').click();}
   return {dead:S.dead,deposed:S.deposed,title:document.getElementById('endTitle').textContent,count:S.log.length};}
  return {death:run('death'),deposed:run('deposed')};
 });assert(early.death.dead,'King death is reachable');assert(early.deposed.deposed,'Voluntary deposition is reachable');console.log('Endings',early,command);

 // The escape gamble must have both outcomes from reachable decision histories.
 const escapes=await page.evaluate(()=>{
  const clone=v=>JSON.parse(JSON.stringify(v));let beam=[{s:fresh(),path:[]}];
  for(let k=0;k<179;k++){const next=[];for(const run of beam){Object.assign(S,clone(run.s));const count=getChoices().length;for(let i=0;i<count;i++){Object.assign(S,clone(run.s));const c=scene(),o=getChoices()[i];if(['plot','depose','escape'].includes(o.k))continue;applyChoice(o,c);S.n++;if(S.n===60){S.n=0;S.cycle++;}updateDate();next.push({s:clone(S),path:[...run.path,i],score:(100-S.order)*.32+(100-S.authority)*.28+S.broken*2+(50-S.realm.readiness)*.16-(S.realm.intelligence-40)*.08});}}next.sort((a,b)=>b.score-a.score);beam=next.slice(0,24);}
  function enter(){startNew();document.getElementById('enterAct').click();}
  function advance(i){choose(i);if(document.getElementById('actDialog').open)document.getElementById('enterAct').click();while(document.getElementById('storyDialog').open)document.getElementById('storyNext').click();}
  enter();for(const i of beam[0].path)advance(i);advance(getChoices().findIndex(o=>o.k==='escape'));const weakDead=S.dead;
  enter();for(let k=0;k<179;k++){const prefer=['investigate','hold','pay','hastings','pardon','faith','bounded','joint','settle','council','queen','direct'];let i=0,best=99;getChoices().forEach((o,j)=>{const rank=prefer.indexOf(o.k);if(rank>=0&&rank<best){best=rank;i=j;}});advance(i);}advance(getChoices().findIndex(o=>o.k==='escape'));return {weakDead,strongAlive:!S.dead&&S.flags.escaped===true};
 });assert(escapes.weakDead&&escapes.strongAlive,'Escape depends on the household built through earlier decisions');console.log('Escape outcomes',escapes);
 // Save/load remains an act-boundary operation, with failed/corrupt storage safe.
 await page.evaluate(()=>{startNew();document.getElementById('enterAct').click();});await page.locator('.choice').first().click();
 assert(await page.locator('#saveAct').isEnabled());await page.evaluate(()=>loadAct());assert.equal(await page.evaluate(()=>S.n),1);
 await page.reload();assert(await page.locator('#gameGate').isVisible());assert(await page.locator('#resumeGame').isVisible());await page.click('#resumeGame');
 await page.evaluate(()=>localStorage.setItem(SAVE_KEY,'{bad'));await page.reload();assert(await page.locator('#resumeGame').isHidden());
 // Audio download/decode, activity, scene transitions, pause, volume, sound setting.
 await page.click('#titleMusic');await page.waitForFunction(()=>CourtAudio.getState().ready&&CourtAudio.getState().on);await page.waitForFunction(()=>CourtAudio.getState().voices>0);const audio=await page.evaluate(()=>CourtAudio.getState());
 await begin(page);assert.equal(await page.evaluate(()=>CourtAudio.getState().requestedMood),'court');await page.locator('.choice').first().click();assert.equal(await page.evaluate(()=>CourtAudio.getState().requestedMood),'court');
 await page.click('#menuButton');await page.click('#settingsButton');await page.locator('#volume').fill('15');assert.equal(await page.evaluate(()=>CourtAudio.getState().volume),.15);await page.click('#soundToggle');assert.equal(await page.evaluate(()=>CourtAudio.getState().sfx),false);await page.click('#settingsMusic');assert.equal(await page.evaluate(()=>CourtAudio.getState().on),false);await page.keyboard.press('Escape');
 console.log('Audio decoded and played',audio);
 const conditional=await page.evaluate(()=>{function reachCommission(trust){startNew();document.getElementById('enterAct').click();let limit=0;while(scene().title!=='A commission in the North'&&limit++<60){const opts=getChoices();let i=0;if(scene().title==='The chamber door')i=opts.findIndex(o=>o.k===(trust?'hastings':'council'));choose(i);}return getChoices().length;}return {without:reachCommission(false),withTrust:reachCommission(true)};});assert.equal(conditional.without,2);assert.equal(conditional.withTrust,3,'An earlier favour opens the commission response');
 // Every authored response uses a valid action and leaves finite bounded state.
 const responseCount=await page.evaluate(()=>{let n=0;for(let act=0;act<SCENES.length;act++)for(let i=0;i<60;i++)for(const o of SCENES[act][i].choices){Object.assign(S,fresh());S.cycle=act;S.n=i;updateDate();applyChoice(o,scene());for(const k of ['authority','order','succession'])if(!Number.isFinite(S[k])||S[k]<0||S[k]>100)throw Error('Invalid '+k);n++;}return n;});console.log('Verified authored responses',responseCount);
 // A network failure is recoverable and cannot silently enable a substitute score.
 const offlinePage=await context.newPage();await offlinePage.route('**/assets/audio/court-samples.mp3',r=>r.abort());await offlinePage.goto(base);await offlinePage.click('#titleMusic');await offlinePage.waitForFunction(()=>CourtAudio.getState().status==='unavailable');assert.equal(await offlinePage.evaluate(()=>CourtAudio.getState().on),false);await offlinePage.unroute('**/assets/audio/court-samples.mp3');await offlinePage.click('#titleMusic');await offlinePage.waitForFunction(()=>CourtAudio.getState().ready&&CourtAudio.getState().on);await offlinePage.close();console.log('Audio failure/retry passed');

 // Mobile widths, native dialogs, scroll and swipe on a small touch surface.
 for(const width of [390,375,320]){
  const mobile=await browser.newContext({viewport:{width,height:width===320?568:844},isMobile:true,hasTouch:true,deviceScaleFactor:1,reducedMotion:'reduce'});const p=await mobile.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(base);await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(out,`mobile-${width}-title.png`),fullPage:true});await begin(p);
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No horizontal overflow');await p.screenshot({path:path.join(out,`mobile-${width}-audience.png`),fullPage:true});
  await p.click('[data-view-button=court]');assert(await p.locator('#court').isVisible());assert(!await p.locator('#audience').isVisible());await p.locator('.ally').first().click();assert(await p.locator('#personDialog').isVisible());await p.click('[data-close=personDialog]');await p.screenshot({path:path.join(out,`mobile-${width}-court.png`),fullPage:true});
  await p.click('[data-view-button=realm]');assert(await p.locator('#realm').isVisible());await p.click('[data-view-button=audience]');
  await p.locator('#sealRail').scrollIntoViewIfNeeded();let rect=await p.locator('#sealRail').boundingBox();const cdp=await mobile.newCDPSession(p);
  async function touch(type,x,y){await cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y}]});}
  let tx=rect.x+rect.width/2,ty=rect.y+15;await touch('touchStart',tx,ty);await touch('touchMove',tx-80,ty);await touch('touchEnd');assert.equal(await p.evaluate(()=>S.n),1,'Horizontal swipe selects exactly once');
  await p.locator('#sealRail').scrollIntoViewIfNeeded();rect=await p.locator('#sealRail').boundingBox();tx=rect.x+rect.width/2;ty=rect.y+10;await touch('touchStart',tx,ty);await touch('touchMove',tx+5,ty-100);await touch('touchEnd');assert.equal(await p.evaluate(()=>S.n),1,'Vertical scrolling cannot make a decision');
  await p.locator('#quote').scrollIntoViewIfNeeded();rect=await p.locator('#quote').boundingBox();tx=rect.x+rect.width/2;ty=rect.y+rect.height/2;await touch('touchStart',tx,ty);await touch('touchMove',tx+80,ty);await touch('touchEnd');assert.equal(await p.evaluate(()=>S.n),2,'A card swipe selects the second response exactly once');
  await mobile.close();console.log('Mobile passed',width);
 }
 assert.deepEqual(errors,[],'No browser exceptions');assert.deepEqual(failed,[],'No missing local assets');
 await browser.close();server.closeAllConnections();await new Promise(ok=>server.close(ok));
 console.log('PASS: complete 1461–1471 campaign, different governing styles, three endings, story transitions, saves, title/menu/pop-ups, acoustic playback, desktop and three mobile viewports.');
}
main().catch(e=>{console.error(e);process.exit(1);});
