'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('node:assert/strict');
let playwright;try{playwright=require('playwright');}catch{playwright=require(path.join(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||'/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules','playwright'));}
const {chromium}=playwright;
const out=process.env.EDWARD_SCREENSHOTS||'/tmp/edward-documents-qa';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const server=http.createServer((q,r)=>{const p=path.join(__dirname,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);try{r.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.mp3':'audio/mpeg'})[path.extname(p)]||'application/octet-stream');r.end(fs.readFileSync(p));}catch{r.writeHead(404);r.end();}});
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const errors=[];const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:${server.address().port}/`);
 await page.evaluate(()=>{startNew();$('enterAct').click();});
 async function advanceTo(title){await page.evaluate(title=>{let limit=0;while(scene().title!==title&&limit++<240&&!S.ended){let i=getChoices().findIndex(o=>o.k==='investigate');if(scene().title==='The crown under guard')i=getChoices().findIndex(o=>o.k==='settle');choose(i<0?0:i);if($('actDialog').open)$('enterAct').click();while($('storyDialog').open)$('storyNext').click();}if(scene().title!==title)throw Error('Unreachable '+title);},title);}
 await advanceTo('A widow’s petition');
 const before=await page.evaluate(()=>JSON.stringify(S));
 await page.click('#documentDelivery button');assert.match(await page.locator('#documentAuthor').innerText(),/Elizabeth Grey/);
 await page.keyboard.press('1');await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>JSON.stringify(S)),before,'Reading has absolutely no state effects');
 await page.click('#documentDelivery button');await page.locator('[data-close=documentDialog]').last().click();
 assert.equal(await page.evaluate(()=>JSON.stringify(S)),before,'Reopening is also inert');
 await advanceTo('The queen in public');
 assert(await page.evaluate(()=>getSaved().documents.some(d=>d.id==='widow-petition'&&d.response)),'Act save retains document and answer');
 const saved=await page.evaluate(()=>JSON.stringify(getSaved().documents));
 await page.evaluate(()=>{loadAct();$('enterAct').click();});assert.equal(await page.evaluate(()=>JSON.stringify(S.documents)),saved);
 await advanceTo('The price of splendour');await page.click('#documentDelivery button');await page.click('#documentMore summary');
 assert.equal(await page.locator('#documentAccount tbody tr').count(),5);
 assert(await page.evaluate(()=>$('documentDialog').scrollWidth<=$('documentDialog').clientWidth+1));
 await page.screenshot({path:path.join(out,'document-account-mobile.png'),fullPage:true});await page.keyboard.press('Escape');
 await advanceTo('A complaint under seal');const sealedBefore=await page.evaluate(()=>JSON.stringify(S));await page.click('#documentDelivery button');
 assert(await page.locator('#documentContents').isHidden());await page.click('#documentUnfold');assert(await page.locator('#documentContents').isVisible());
 // Reading uses recorded foley without adding UI controls.
 await page.screenshot({path:path.join(out,'document-seal-mobile.png'),fullPage:true});
 const cdp=await page.context().newCDPSession(page);const box=await page.locator('#documentDialog').boundingBox();const tx=box.x+box.width/2,ty=box.y+box.height*.7;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:tx,y:ty}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:tx+3,y:ty-120}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await page.keyboard.press('Escape');
 assert.equal(await page.evaluate(()=>JSON.stringify(S)),sealedBefore,'Unfolding cannot apply a decision');
 await advanceTo('A letter from the queen');
 const wording=await page.evaluate(()=>JSON.stringify(S.documents.find(d=>d.id==='queen-middleham')));
 await page.evaluate(()=>{S.woodville=-55;render();});assert.equal(await page.evaluate(()=>JSON.stringify(S.documents.find(d=>d.id==='queen-middleham'))),wording,'Receipt wording does not track subsequent relationships');
 await advanceTo('A borrowed chamber');assert(await page.evaluate(()=>getSaved().documents.some(d=>d.id==='queen-middleham')));
 await page.reload();await page.click('#resumeGame');if(await page.locator('#actDialog').isVisible())await page.click('#enterAct');
 assert(await page.evaluate(()=>S.documents.some(d=>d.id==='queen-middleham')),'Archive survives reload');
 await advanceTo('Behind sanctuary walls');assert.equal(await page.locator('#mapLocation').innerText(),'Low Countries');
 await page.click('#documentDelivery button');assert.match(await page.locator('#documentOrigin').innerText(),/Westminster/);assert.match(await page.locator('#documentReceipt').innerText(),/Low Countries/);await page.keyboard.press('Escape');
 await page.click('[data-view-button=court]');await page.getByText('The household record',{exact:true}).click();await page.locator('#documentArchive [data-document=widow-petition]').click();assert.match(await page.locator('#documentAuthor').innerText(),/Elizabeth Grey/);await page.keyboard.press('Escape');
 const callbacks=await page.evaluate(()=>{const saved=JSON.parse(JSON.stringify(S));function receipt(key){Object.assign(S,fresh());S.cycle=3;S.n=SCENES[3].findIndex(c=>c.title==='Your sister’s influence');updateDate();S.log=[{title:'A sister leaves England',key}];receiveDocuments();return S.documents[0].paragraphs.join(' ');}const a=receipt('burgundy'),b=receipt('pay'),none=receipt('other');Object.assign(S,saved);return {a,b,none};});
 assert.match(callbacks.a,/correspondence you arranged/);assert.match(callbacks.b,/provided generously/);assert(!callbacks.none.includes('correspondence you arranged'));
 const old=await page.evaluate(()=>{const v=getSaved();delete v.documents;localStorage.setItem(SAVE_KEY,JSON.stringify(v));return getSaved();});assert.equal(old,null,'Invalid current saves are rejected; v3 saves stay under their own key');
 const portraits=await page.evaluate(()=>{S.date=14610401;return {young:portrait(personAt('clarence'))+portrait(personAt('gloucester')),new:['cecily','anthony','margaretYork'].map(id=>portrait(personAt(id)))};});assert(!portraits.young.includes('<img'));assert(portraits.new.every(s=>s.includes('<img')));
 for(const width of [320,375,390]){await page.setViewportSize({width,height:700});await page.evaluate(()=>{S.cycle=1;S.n=SCENES[1].findIndex(c=>c.title==='The price of splendour');render();openDocument('silk-account');});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1&&$('documentDialog').scrollWidth<=$('documentDialog').clientWidth+1));await page.keyboard.press('Escape');}
 const recording=await page.evaluate(async()=>{const bytes=await (await fetch('assets/audio/paper-open.mp3')).arrayBuffer();const ctx=new AudioContext();const b=await ctx.decodeAudioData(bytes);await ctx.close();return b.duration;});assert(recording>0.1,'Recorded paper sound decodes');
 await page.evaluate(()=>{window.paperPlays=0;const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.paperPlays++;return play.call(this);};});
 await page.route('**/paper-open.mp3',r=>r.abort());await page.evaluate(()=>CourtAudio.paper());const plays=await page.evaluate(()=>window.paperPlays);await page.evaluate(()=>{CourtAudio.toggleSfx();CourtAudio.paper();});assert.equal(await page.evaluate(()=>window.paperPlays),plays,'Sound off prevents paper playback');
 assert.deepEqual(errors,[]);await browser.close();server.closeAllConnections();await new Promise(ok=>server.close(ok));console.log('PASS: inert reading/unsealing, account expansion, immutable receipts, actual-choice callbacks, archive/reload/old saves, court location, young portraits, 320/375/390px folios, quiet audio failure.');
})().catch(e=>{console.error(e);process.exit(1);});
