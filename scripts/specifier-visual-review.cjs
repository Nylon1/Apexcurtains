const { chromium }=require('playwright');
const fs=require('fs');
const path=require('path');
const assert=require('assert/strict');
const base=process.env.SPECIFIER_BASE||'http://localhost:3100';
const out='docs/specifier-review';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const route='/professionals/specifier-resources';
 const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200);
 await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.querySelectorAll('main img')){i.loading='eager';await i.decode().catch(()=>{});}});
 const meta=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,h1:document.querySelectorAll('h1').length}));
 assert.equal(meta.canonical,'https://www.apexcurtains.com'+route);assert.equal(meta.h1,1);
 const anchors=['geometry-and-operation','track-and-support','textile-specification','delivery-and-care','project-record','questions'];for(const a of anchors)assert.equal(await page.locator('#'+a).count(),1,a);
 const stages=['Concept design','Design development','Technical design','Procurement','Construction','Installation','Handover'];
 for(const s of stages){await page.getByRole('button',{name:new RegExp(s+'$')}).click();assert.ok(await page.locator('.resource-stage-result li').count());assert.equal(await page.getByRole('button',{name:new RegExp(s+'$')}).getAttribute('aria-pressed'),'true');}
 await page.getByRole('button',{name:/Concept design$/}).click();
 await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0)});await page.screenshot({path:out+'/library-desktop.png',fullPage:true});
 await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0)});await page.screenshot({path:out+'/desktop-opening.png'});
 await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
 const accessibility=[];accessibility.push({viewport:'desktop',...(await page.evaluate(async()=>{const r=await axe.run('main',{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))};}))});
 for(const d of await page.locator('.resource-document-content').all()){await d.locator('summary').click();assert.equal(await d.getAttribute('open'),'');}
 const allDrawings=await page.locator('.resource-reader .resource-drawing').count();assert.equal(allDrawings,8);
 accessibility.push({viewport:'desktop-expanded',...(await page.evaluate(async()=>{const r=await axe.run('main',{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))};}))});
 for(const d of await page.locator('.resource-document-content').all())await d.locator('summary').click();
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo(0,0)});await page.screenshot({path:out+'/library-mobile.png',fullPage:true});await page.screenshot({path:out+'/mobile-opening.png'});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);assert.equal(overflow,false);
 await page.locator('.resource-document-content').first().locator('summary').click();await page.locator('.resource-reader').first().screenshot({path:out+'/mobile-document.png',style:'.site-header { visibility: hidden !important; }'});
 accessibility.push({viewport:'mobile-expanded',...(await page.evaluate(async()=>{const r=await axe.run('main',{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))};}))});
 const links=await page.locator('main a').evaluateAll(a=>[...new Set(a.map(a=>a.getAttribute('href')).filter(h=>h?.startsWith('/')&&!h.startsWith('//')))]);
 const linkResults=[];for(const href of links){const r=await page.request.get(base+href);linkResults.push({href,status:r.status(),type:r.headers()['content-type']});assert.ok(r.status()<400,href+' '+r.status());}
 await page.goto(base+'/professionals/specifier-resources/project-information-checklist',{waitUntil:'domcontentloaded'});assert.equal(await page.locator('input[type=checkbox]').count(),33);await page.locator('input[type=checkbox]').first().check();assert.ok(await page.locator('input[type=checkbox]').first().isChecked());
 await page.goto(base+'/professionals/workspace/login',{waitUntil:'domcontentloaded'});assert.match(await page.locator('h1').innerText(),/Sign in/);
 assert.equal(errors.length,0);for(const scan of accessibility)assert.equal(scan.violations.length,0,scan.viewport);
 const result={base,meta,stages:7,drawings:allDrawings,overflow,errors,accessibility,links:linkResults,checklist:33,workspace:'public login renders; no authentication or private exports exercised'};
 fs.writeFileSync(out+'/verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify({meta,errors,accessibility,links:linkResults.length,overflow},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
