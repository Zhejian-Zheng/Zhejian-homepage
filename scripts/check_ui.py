from playwright.sync_api import sync_playwright
import json
import os

BASE_URL = os.environ.get("SITE_TEST_URL", "http://127.0.0.1:3000").rstrip("/")

def check() -> None:
 with sync_playwright() as p:
  browser=p.chromium.launch(channel='chrome',headless=True)
  context=browser.new_context(viewport={'width':1440,'height':1000},device_scale_factor=1)
  page=context.new_page()
  errors: list[str]=[]
  page.on('pageerror', lambda error: errors.append(str(error)))
  results=[]
  for lang in ['en','zh']:
   for path in ['/','/about','/blog','/contact','/blog/sidecar-gui-agent-harness']:
    response=page.goto(BASE_URL+path+'?lang='+lang,wait_until='networkidle')
    assert response and response.status==200,(path,response.status if response else None)
    assert page.locator('main').count()==1,path
    assert page.locator('html').get_attribute('lang')==('zh-CN' if lang=='zh' else 'en')
    canonical=page.locator('link[rel="canonical"]').get_attribute('href')
    assert canonical=='https://zhejian-homepage.vercel.app'+path+'?lang='+lang,(path,lang,canonical)
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),path
    if '/blog/sidecar' in path:
     assert page.locator('.article-language').count()==1
     body=page.locator('.article-language').inner_text()
     assert ('执行之前重新观察' in body)==(lang=='zh')
     assert ('Observe again before acting' in body)==(lang=='en')
     html=response.text()
     assert ('Observe again before acting' in html)==(lang=='en'), 'Inactive text leaked into RSC/HTML'
    if path in ['/','/about','/blog']:
     page.screenshot(path=f'/tmp/site-{path.strip("/") or "home"}-{lang}.png',full_page=True)
    results.append([path,lang,'passed'])
  page.goto(BASE_URL+'/?lang=en',wait_until='networkidle')
  page.keyboard.press('Tab')
  assert page.evaluate('document.activeElement.className')=='skip-link'
  page.keyboard.press('Enter')
  assert page.evaluate('document.activeElement.id')=='main-content'
  page.locator('nav.fixed').get_by_role('link',name='About',exact=True).click()
  page.wait_for_url('**/about')
  page.wait_for_timeout(400)
  assert page.evaluate('document.activeElement.id')=='main-content','route focus'
  assert page.locator('link[rel="canonical"]').count()==1
  assert page.locator('link[rel="canonical"]').get_attribute('href')=='https://zhejian-homepage.vercel.app/about?lang=en'
  page.get_by_role('button',name='Switch language to 中文').click()
  page.wait_for_url('**lang=zh')
  assert page.request.get(BASE_URL+'/about').text().find('<html lang="zh-CN"') >= 0
  portrait=page.locator('main header img').first
  image_response=page.request.get(portrait.evaluate('(img)=>img.currentSrc'))
  assert image_response.status==200 and len(image_response.body())<=200000
  print('About image bytes:',len(image_response.body()))
  assert page.locator('html').get_attribute('lang')=='zh-CN'
  for width in [390,320]:
   page.set_viewport_size({'width':width,'height':844})
   for path in ['/','/about','/blog','/contact','/blog/sidecar-gui-agent-harness']:
    page.goto(BASE_URL+path+'?lang=zh',wait_until='networkidle')
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'),(path,width)
    if width==390:page.screenshot(path=f'/tmp/site-mobile-{path.strip("/").replace("/","-") or "home"}.png',full_page=True)
  page.emulate_media(reduced_motion='reduce')
  page.goto(BASE_URL+'/',wait_until='networkidle')
  assert page.locator('.project-card').first.evaluate('(el)=>getComputedStyle(el).transform')=='none'
  page.get_by_role('button',name='打开导航').click()
  assert page.locator('#mobile-navigation').is_visible()
  page.keyboard.press('Escape')
  assert not page.locator('#mobile-navigation').is_visible()
  assert page.evaluate('document.activeElement.id')=='menu-toggle'
  assert not errors,errors
  print(json.dumps({'pages':results,'keyboard':'passed','route_focus':'passed','locale_switch':'passed','mobile':'320/390 passed','reduced_motion':'passed','errors':errors},ensure_ascii=False))
  browser.close()
check()
