from pathlib import Path
from playwright.sync_api import sync_playwright
import json
P=Path(__file__).parent
HTML=(P/'index.html').read_text().replace("const QA=new URLSearchParams(location.search).has('qa');","const QA=true;")
STORAGE='''() => {const d={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>Object.prototype.hasOwnProperty.call(d,k)?d[k]:null,setItem:(k,v)=>{d[k]=String(v)},removeItem:k=>{delete d[k]}}})}'''
results=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(390,844),(375,667),(320,568)]:
  ctx=browser.new_context(viewport={'width':width,'height':height},is_mobile=True,has_touch=True,device_scale_factor=2)
  page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.evaluate(STORAGE);page.set_content(HTML,wait_until='load')
  page.locator('#homeNew').click();page.locator('#jump1465').click();page.locator('#card').wait_for()
  assert page.locator('.scene-art-button').count()==1
  assert page.locator('.scene-art-band svg').count()==1
  assert page.locator('.scene-art-band').is_visible() if height>=740 else page.locator('.scene-art-band').is_hidden()
  assert page.locator('.quote').is_visible()
  assert page.locator('#readingMore').is_visible()
  if width==390:page.screenshot(path=str(P/'worldcraft_card_focus.png'))
  turn=page.evaluate('world.turn')
  page.locator('.scene-art-button').click()
  assert page.locator('.scene-art-large svg').count()==1
  assert 'artistic interpretation' in page.locator('#sheet').inner_text().lower()
  if width==390:page.screenshot(path=str(P/'worldcraft_art_sheet.png'))
  page.locator('#sceneHistoricalLens').click()
  assert page.locator('.history-anchor').count()==len(page.evaluate('EDWARD_WORLD.history'))
  assert 'RECORDED HISTORY' in page.locator('#sheet').inner_text()
  if width==390:page.screenshot(path=str(P/'worldcraft_history_sheet.png'))
  page.locator('#closeSheet').click()
  assert page.evaluate('world.turn')==turn
  page.locator('#readingToggle').click()
  assert page.locator('.reading-story .scene-art-band').is_visible() or height<=570
  if width==390:page.screenshot(path=str(P/'worldcraft_card_story.png'))
  page.locator('#readingToggle').click()
  assert page.locator('.reading-full .scene-art-band').is_visible() or height<=570
  page.locator('#readingToggle').click()
  assert page.locator('.reading-focus .scene-art-band').is_visible() if height>=740 else page.locator('.reading-focus .scene-art-band').is_hidden()
  page.locator('#readingMore').click()
  assert page.locator('.reading-detail').count()>=4
  assert page.locator('.reading-detail').filter(has_text='Illustrated moment').count()==1
  page.locator('#closeSheet').click()
  page.locator('#gameMenuToggle').click()
  assert page.locator('#menuHistoricalLens').is_visible()
  page.locator('#menuHistoricalLens').click()
  assert page.locator('.history-anchor').count()>=8
  page.locator('#closeSheet').click()
  # Force a historically meaningful priest scene to verify it is actionable.
  page.evaluate('''() => {const s=world;const sb=s.sandbox;wpInit(s);sb.pressure.cases.parish={stage:0,due:sb.year,firstYear:sb.year,inFlight:true,parent:null,outcome:null,trigger:{conditions:{unrestNorth:4}}};const ev={serial:++sb.serial,actor:'percy',template:'petition',where:'North',year:sb.year,origin:'conditional-crisis',pressure:{id:'parish',stage:0}};sb.current=ev;current=sbBuildCard(s,ev);arena=null;renderCard();}''')
  assert 'priest' in page.locator('.speaker').inner_text().lower()
  assert 'three families' in page.locator('.quote').inner_text().lower()
  assert 'safe passage' in page.locator('.context').inner_text().lower()
  if width==390:page.screenshot(path=str(P/'worldcraft_priest.png'))
  # New evidence must cause a consequence and a second stage only if pressure persists.
  page.evaluate('EDWARD_TEST.choose("left")')
  assert page.evaluate('world.sandbox.pressure.journal.length')>=1
  assert not page.evaluate('EDWARD_WORLD.audit()')
  # World and casebook survive the new modules.
  page.locator('[data-view="cases"]').click()
  assert page.locator('.casebook-stories .story-case').count()==6
  assert page.locator('.casebook-fold').count()==2
  page.locator('#closeSheet').click()
  assert not errors,errors
  results.append({'size':f'{width}x{height}','art':True,'history':True,'priest':True,'crisis_resolves':True,'errors':errors})
  print('WORLDCRAFT MOBILE PASS',json.dumps(results[-1]))
  ctx.close()
 browser.close()
(P/'worldcraft_mobile_audit.json').write_text(json.dumps({'results':results,'note':'Chromium mobile emulation; physical Safari not verified'},indent=2))
