from pathlib import Path
from playwright.sync_api import sync_playwright
import json
P=Path(__file__).parent
HTML=(P/'index.html').read_text().replace("const QA=new URLSearchParams(location.search).has('qa');","const QA=true;")
STORAGE='''() => {const store={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}}})}'''
with sync_playwright() as pw:
 b=pw.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width,height in [(390,844),(375,667),(320,568)]:
  page=b.new_page(viewport={'width':width,'height':height},is_mobile=True,has_touch=True,device_scale_factor=2)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.evaluate(STORAGE);page.set_content(HTML,wait_until='load')
  page.locator('#homeNew').click();page.locator('#jump1465').click();page.locator('.reading-focus').wait_for()
  assert page.evaluate('EDWARD_READING.level')=='focus'
  assert page.evaluate('EDWARD_READING.sceneCount')==40
  assert page.locator('#readingToggle').count()==1
  assert page.locator('#readingMore').count()==1
  assert page.locator('.speaker [data-person]').count()>0
  assert page.evaluate('edwardFocusData().focus') in page.locator('.quote').inner_text()
  assert page.evaluate('edwardFocusData().fullContext') not in page.locator('.context').text_content()
  assert page.evaluate('edwardFocusData().authored.choices[0]') in page.locator('[data-choice="left"]').inner_text()
  full_original=page.evaluate('current.quote')
  # Open the complete hearing without advancing the decision.
  turn=page.evaluate('world.turn')
  page.locator('#readingMore').click()
  assert page.locator('#sheet .reading-detail').count()>=3
  assert full_original in page.locator('#sheet').text_content()
  assert page.evaluate('edwardFocusData().fullContext') in page.locator('#sheet').text_content()
  assert page.evaluate('world.turn')==turn
  if width==390:page.screenshot(path=str(P/'focus_more_390.png'))
  page.locator('#closeSheet').click()
  # Three reading levels; switching does not reset the 10s timer or decision.
  start=page.evaluate('lockStart')
  page.locator('#readingToggle').click()
  assert page.evaluate('EDWARD_READING.level')=='story'
  assert page.locator('.reading-story').count()==1
  assert full_original in page.locator('.quote').inner_text()
  assert page.evaluate('edwardFocusData().fullContext') not in page.locator('.context').text_content()
  page.locator('#readingToggle').click()
  assert page.evaluate('EDWARD_READING.level')=='full'
  assert page.evaluate('edwardFocusData().fullContext') in page.locator('.context').text_content()
  page.locator('#readingToggle').click()
  assert page.evaluate('EDWARD_READING.level')=='focus'
  assert page.evaluate('lockStart')==start
  assert page.evaluate('world.turn')==turn
  if width==390:page.screenshot(path=str(P/'focus_card_390.png'))
  # Casebook: stories first; the historical background remains accessible.
  page.locator('[data-view="cases"]').click()
  assert page.locator('.casebook-stories .story-case').count()==6
  assert page.locator('.casebook-fold').count()==2
  assert page.locator('.casebook-stories .story-case[open]').count()==0
  assert page.locator('.casebook-fold[open]').count()==0
  page.locator('.casebook-stories .story-case').first.locator('summary').click()
  assert page.locator('.casebook-stories .story-case[open]').count()==1
  if width==390:page.screenshot(path=str(P/'focus_cases_390.png'))
  page.locator('#closeSheet').click()
  # All controls remain visible and don't overlap bottom navigation.
  nav=page.locator('.nav').bounding_box();buttons=page.locator('#tapActions').bounding_box()
  assert buttons['y']+buttons['height']<=nav['y']+1,(buttons,nav)
  assert page.locator('#readingMore').is_visible()
  assert page.locator('.quote').is_visible()
  # Original game choice and save slots still work.
  page.evaluate('window.EDWARD_TEST.choose("left")')
  assert page.evaluate('world.turn')==turn+1
  assert page.evaluate('EDWARD_READING.level')=='focus'
  page.locator('#saveToggle').click();page.locator('[data-save-slot="1"]').click();page.locator('#closeSheet').click()
  assert page.evaluate('EDWARD_EXTRAS.slots[0] !== null')
  # Complete game without JS errors.
  for i in range(90):
   if page.locator('#outro').count():break
   page.evaluate('window.EDWARD_TEST.choose("left")')
  assert page.locator('#outro').count()==1
  assert not errors,errors
  print('FOCUS MOBILE PASS',json.dumps({'size':f'{width}x{height}','turns':page.evaluate('world.turn'),'errors':errors}))
  page.close()
 b.close()
