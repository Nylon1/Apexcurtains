/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS QA runner resolves optional local Playwright/axe through NODE_PATH. */
// Run against a built local server or reviewed preview. Every write is mocked;
// this verifies the UI and payload contract, never sends a customer enquiry.
// NODE_PATH may point to an existing Playwright/axe installation.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.BASE_URL || 'http://localhost:3100';
const out = process.env.REVIEW_OUT || 'C:/Users/hamza/Apex-Review/quotation-implementation-2026-11-28';
fs.mkdirSync(out,{recursive:true});
const results=[];
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j3ioAAAAASUVORK5CYII=','base64');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try {
 for (const [mode,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
  const ctx=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{window.dataLayer=[]});
  let responseMode='fail';const leads=[],counts=[];const pageErrors=[];
  await ctx.route('**/*',async route=>{
   const req=route.request(); if(['GET','HEAD'].includes(req.method()))return route.continue();
   if(req.url().includes('/api/enquiry-count/')){counts.push(req.url().split('/').pop());return route.fulfill({status:204});}
   if(req.url().endsWith('/api/send-lead')){
    const data=await new Response(req.postDataBuffer(),{headers:{'content-type':req.headers()['content-type']}}).formData();
    leads.push({key:req.headers()['idempotency-key'],fields:Object.fromEntries([...data].map(([k,v])=>[k,typeof v==='string'?v:{name:v.name,size:v.size}])),fileCount:data.getAll('projectFiles').length});
    if(responseMode==='abort')return route.abort('failed');
    if(responseMode==='malformed')return route.fulfill({status:200,contentType:'application/json',body:'not-json'});
    if(responseMode==='field')return route.fulfill({status:400,contentType:'application/json',body:JSON.stringify({ok:false,field:'postcode',error:'Check the project postcode field and try again.'})});
    return route.fulfill({status:responseMode==='success'?200:502,contentType:'application/json',body:JSON.stringify(responseMode==='success'?{ok:true}:{ok:false,error:'Your enquiry could not be sent. Please try again or contact Apex directly.'})});
   }
   return route.abort();
  });
  const p=await ctx.newPage();p.on('pageerror',e=>pageErrors.push(e.message));
  // Optional temporary preview share URL; never persist its access cookie or token.
  if(process.env.REVIEW_ACCESS_URL)await p.goto(process.env.REVIEW_ACCESS_URL,{waitUntil:'networkidle'});
  async function shot(name){const y=await p.evaluate(()=>scrollY);await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:path.join(out,`${name}-${mode}.png`),fullPage:true});await p.evaluate(y=>scrollTo(0,y),y);await p.screenshot({path:path.join(out,`${name}-${mode}-viewport.png`)});}
  async function check(name){
   await p.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const state=await p.evaluate(async()=>({overflow:document.documentElement.scrollWidth>innerWidth,violations:(await axe.run(document.querySelector('main'))).violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))}));
   results.push({name,mode,...state});assert.equal(state.overflow,false);assert.deepEqual(state.violations,[]);
  }
  const click=label=>p.getByRole('button',{name:label,exact:true}).click();
  // Unconsented start must not send counts.
  await p.goto(base+'/start-designing',{waitUntil:'networkidle'});
  assert.equal(new URL(p.url()).origin,new URL(base).origin,'Preview access must reach the application, not an authentication page.');
  await check('guided-plain-opening');await shot('guided-plain-opening');await click('Continue without a photo');assert.deepEqual(counts,[]);
  await p.goto(base+'/start-designing?windowType=apex&room=bedroom&priority=privacy&suggestedHeading=wave&recommendationTitle=Example%20recommendation&photoName=Original%20photo%20note&visualiserRoom=tall-living-room&visualiserColour=linen',{waitUntil:'networkidle'});
  await check('guided-opening');await shot('guided-opening');
  const headingTop=await p.locator('h1').evaluate(el=>el.getBoundingClientRect().top);assert.ok(headingTop>=68);
  await p.getByRole('checkbox').check();
  await p.locator('#window-photo').setInputFiles({name:'phone.heic',mimeType:'image/heic',buffer:Buffer.from('x')});
  await p.locator('main').getByRole('alert').waitFor();assert.match(await p.locator('main').getByRole('alert').innerText(),/JPG, PNG or WebP/);
  await p.locator('#window-photo').setInputFiles({name:'window.png',mimeType:'image/png',buffer:png});
  await p.getByText('window.png — ready to include').waitFor();await click('Continue');
  assert.equal(counts.filter(x=>x==='guided-start').length,1);
  assert.equal(await p.locator('[name=windowType]').inputValue(),'Apex');
  assert.equal(await p.locator('[name=roomType]').inputValue(),'Bedroom');
  await click('Continue');await click('I’d like advice on all three');await click('Continue');
  await click('Continue');assert.equal(await p.locator('[name=name]').getAttribute('aria-invalid'),'true');
  for(const [key,value] of Object.entries({name:'Journey QA',email:'qa@example.invalid',phone:'07000000000',postcode:'SW1A 1AA'}))await p.locator(`[name=${key}]`).fill(value);
  await p.locator('[name=contactTime]').selectOption('Anytime');await check('guided-contact');await shot('guided-contact');await click('Continue');
  await check('guided-review');await shot('guided-review');
  await p.getByRole('button',{name:'Edit curtain preferences'}).click();await p.locator('[name=liningType]').selectOption('Blackout');await click('Return to review');
  assert.match(await p.locator('.quote-review').innerText(),/Blackout/);
  assert.match(await p.locator('.quote-review').innerText(),/Journey QA/);
  await click('Send enquiry');await p.locator('main').getByRole('alert').waitFor();await check('guided-error');await shot('guided-error');
  responseMode='malformed';await click('Try again');await p.getByText(/couldn’t confirm your enquiry/).waitFor();
  responseMode='abort';await click('Try again');await p.getByText(/couldn’t confirm your enquiry/).waitFor();
  assert.equal(new Set(leads.map(l=>l.key)).size,1);assert.ok(leads[0].key);
  await p.getByRole('button',{name:'Edit contact details'}).click();await p.locator('[name=name]').fill('Updated QA');await click('Return to review');
  responseMode='success';const beforeDouble=leads.length;await p.locator('form').evaluate(form=>{form.requestSubmit();form.requestSubmit()});await p.getByRole('heading',{name:'Your enquiry has been sent',exact:true}).waitFor();
  assert.equal(leads.length,beforeDouble+1);assert.notEqual(leads.at(-1).key,leads[0].key);
  assert.equal(leads.at(-1).fields.imageFile.name,'window.png');
  assert.equal(leads.at(-1).fields.recommendationTitle,'Example recommendation');
  assert.equal(leads.at(-1).fields.photoName,'Original photo note');
  assert.equal(leads.at(-1).fields.visualiserRoom,'tall-living-room');
  assert.equal(leads.at(-1).fields.name,'Updated QA');
  assert.equal(counts.filter(x=>x==='guided-complete').length,1);
  await check('guided-success');await shot('guided-success');
  assert.ok(await p.locator('h1').evaluate(el=>el===document.activeElement));
  // Planner required fields and trade conditionals remain intact.
  responseMode='fail';const guidedCount=leads.length;
  await p.goto(base+'/architectural-curtain-project-planner?type=trade',{waitUntil:'networkidle'});
  await click('Continue');assert.equal(await p.evaluate(()=>document.activeElement.name),'property');
  await p.locator('[name=property]').selectOption('House');await p.locator('[name=shape]').selectOption('Apex or gable');await p.locator('[name=postcode]').fill('SW1A 1AA');
  await click('Continue');assert.equal(await p.evaluate(()=>document.activeElement.name),'company');
  await p.locator('[name=company]').fill('Example Workroom');await p.locator('[name=tradeScope]').selectOption('Scope to discuss');
  await p.getByRole('checkbox').check();await check('planner-project');await shot('planner-project');await click('Continue');
  await p.locator('[name=installation]').selectOption('To be agreed');await p.locator('[name=operation]').selectOption('Motorised');await p.locator('[name=controls]').fill('Remote control, details to discuss');
  await check('planner-fitting');await shot('planner-fitting');await click('Continue');
  await p.locator('[name=name]').fill('Planner QA');await p.locator('[name=email]').fill('planner@example.invalid');
  await p.locator('[name=projectFiles]').setInputFiles([{name:'window.png',mimeType:'image/png',buffer:png},{name:'large.png',mimeType:'image/png',buffer:Buffer.alloc(4*1024*1024)}]);
  await p.locator('main').getByRole('alert').waitFor();await shot('planner-upload-error');
  assert.equal(await p.locator('.arch-files li').count(),1);
  await click('Continue with accepted files');
  await p.locator('.arch-brief-check').evaluate(el=>{el.open=true});
  await click('Edit project details');await p.locator('[name=postcode]').fill('SW1A 2AA');await click('Return to final check');
  await p.locator('.arch-brief-check').evaluate(el=>{el.open=true});
  assert.match(await p.locator('.arch-brief-check').innerText(),/SW1A 2AA/);
  await check('planner-contact');await shot('planner-contact');
  responseMode='field';await click('Send project enquiry');await p.locator('main').getByRole('alert').waitFor();
  assert.equal(await p.locator('[name=postcode]').isVisible(),true);assert.equal(await p.locator('[name=postcode]').getAttribute('aria-invalid'),'true');
  await p.locator('[name=postcode]').fill('SW1A 3AA');await click('Continue');await click('Continue');
  responseMode='fail';await click('Send project enquiry');await p.locator('main').getByRole('alert').waitFor();await check('planner-error');await shot('planner-error');
  const retryKey=leads.at(-1).key;
  responseMode='success';await click('Try again');await p.getByRole('heading',{name:'Your enquiry has been sent.',exact:true}).waitFor();
  assert.equal(leads.at(-1).key,retryKey);assert.equal(leads.at(-1).fileCount,1);
  assert.equal(leads.at(-1).fields.phone,'');assert.equal(leads.at(-1).fields.company,'Example Workroom');assert.equal(leads.at(-1).fields.controls,'Remote control, details to discuss');
  assert.equal(counts.filter(x=>x==='planner-start').length,1);assert.equal(counts.filter(x=>x==='planner-complete').length,1);
  await check('planner-success');await shot('planner-success');
  assert.equal(pageErrors.length,0);
  results.push({mode,guidedRequests:guidedCount,plannerRequests:leads.length-guidedCount,counts,pageErrors,allWritesMocked:true});
  fs.writeFileSync(path.join(out,'browser-check.json'),JSON.stringify(results,null,2));await ctx.close();console.log(mode,'passed');
 }
 } finally { await browser.close(); }
})().catch(error=>{fs.writeFileSync(path.join(out,'browser-check.json'),JSON.stringify(results,null,2));console.error(error);process.exitCode=1});
