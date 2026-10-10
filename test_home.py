from pathlib import Path
from playwright.sync_api import sync_playwright
import json
P=Path(__file__).parent
HTML=(P/'index.html').read_text().replace("const QA=new URLSearchParams(location.search).has('qa');","const QA=true;")
STORAGE='''(initial) => {let d=initial||{};window.__edwardStore=d;Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>Object.prototype.hasOwnProperty.call(d,k)?d[k]:null,setItem:(k,v)=>{d[k]=String(v)},removeItem:k=>{delete d[k]}}})}'''
results=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(390,844),(375,667),(320,568)]:
  ctx=browser.new_context(viewport={'width':width,'height':height},is_mobile=True,has_touch=True,device_scale_factor=2)
  page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.evaluate(STORAGE,{})
  page.set_content(HTML,wait_until='load');page.locator('#homeScreen').wait_for()
  assert page.locator('#homeContinue').is_disabled()
  assert page.locator('#homeNew').is_visible() and page.locator('#homeLoad').is_visible()
  assert page.locator('.home-portrait svg').count()==3
  assert page.evaluate('EDWARD_HOME.portraits')>=20
  assert page.evaluate('localStorage.getItem("edward_living_demo_save")') is None
  page.locator('#homeLoad').click()
  assert page.locator('[data-home-load]').count()==4
  assert page.locator('[data-home-load="auto"]').is_disabled()
  page.locator('#closeSheet').click()
  if width==390:page.screenshot(path=str(P/'home_screen_390.png'))
  page.locator('#homeNew').click()
  assert page.locator('#beginFull').is_visible() and page.locator('#jump1465').is_visible()
  page.locator('#beginFull').click()
  page.locator('#card').wait_for()
  assert page.evaluate('world.turn')==0
  assert page.locator('#gameMenuToggle').count()==1
  assert page.evaluate('EDWARD_HOME.autosave!==null')
  if width==390:page.screenshot(path=str(P/'home_card_390.png'))
  page.evaluate('EDWARD_TEST.choose("left")')
  assert page.evaluate('world.turn')==1
  page.locator('#saveToggle').click()
  page.locator('[data-save-slot="1"]').click()
  assert page.evaluate('EDWARD_EXTRAS.slots[0].world.turn')==1
  page.locator('#closeSheet').click()
  # Navigate to title without losing autosave.
  page.locator('#gameMenuToggle').click();page.locator('#menuHome').click()
  assert page.locator('#homeContinue').is_enabled()
  assert '1 decisions' in page.locator('.home-save-note').inner_text()
  # Reload still opens the title screen instead of bypassing it.
  store=page.evaluate('window.__edwardStore')
  page.close();page=ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
  page.evaluate(STORAGE,store);page.set_content(HTML,wait_until='load');page.locator('#homeScreen').wait_for()
  assert page.locator('#homeContinue').is_enabled()
  page.locator('#homeContinue').click()
  assert page.evaluate('world.turn')==1
  # New game requires confirmation, preserves manual slot.
  page.locator('#gameMenuToggle').click();page.locator('#menuNew').click()
  page.once('dialog',lambda d:d.accept())
  page.locator('#jump1465').click()
  assert page.evaluate('world.chapterIndex===CHAPTERS.length')
  assert page.evaluate('world.turn')==0
  assert page.evaluate('EDWARD_EXTRAS.slots[0].world.turn')==1
  assert page.locator('#card').count()==1
  # At least one historical figure in this run has a portrait.
  found=page.locator('.card-portrait').count()>0
  if not found:
   for i in range(15):
    page.evaluate('EDWARD_TEST.choose("left")')
    if page.locator('.card-portrait').count():found=True;break
  assert found,'No portrait appeared on cards'
  page.locator('.card-portrait').click()
  assert page.locator('#personPeek.open .portrait-feature svg').count()==1
  assert page.locator('#personPeek.open').count()==1
  page.locator('#peekClose').click()
  # Load manual slot via new explicit Load Game screen.
  page.locator('#gameMenuToggle').click();page.locator('#menuLoad').click()
  assert page.locator('[data-home-load="1"]').is_enabled()
  page.once('dialog',lambda d:d.accept())
  page.locator('[data-home-load="1"]').click()
  assert page.evaluate('world.turn')==1
  assert page.evaluate('world.chapterIndex!==CHAPTERS.length')
  # People panel uses portraits for historical named people.
  page.locator('[data-view="people"]').click()
  assert page.locator('.people-portrait svg').count()>=4
  page.locator('#closeSheet').click()
  # 1461 full-game still advances, autosave survives.
  for _ in range(10):page.evaluate('EDWARD_TEST.choose("left")')
  assert page.evaluate('world.turn')==11
  assert not errors,errors
  result={'size':f'{width}x{height}','menu':True,'new':True,'continue':True,'load':True,'slot_preserved':True,'portraits':True,'errors':errors}
  results.append(result);print('HOME PASS',json.dumps(result))
  ctx.close()
 browser.close()
(P/'home_audit.json').write_text(json.dumps({'results':results,'note':'Chromium mobile emulation, not physical Safari'},indent=2))
