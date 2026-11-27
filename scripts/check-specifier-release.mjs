import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const read=(p)=>JSON.parse(fs.readFileSync(p,'utf8'));
const hash=(p)=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const textHash=(p)=>crypto.createHash('sha256').update(fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n')).digest('hex');
const data=read('lib/specifier-resources.json');
const manifest=read('lib/specifier-downloads.json');
const approval=read('lib/specifier-approval.json');
assert.equal(manifest.revision,data.revision);
assert.equal(manifest.date,data.date);
assert.equal(approval.revision,data.revision);
assert.equal(manifest.contentSha256,textHash('lib/specifier-resources.json'),'Content changed: regenerate and review downloads');
assert.equal(manifest.files.length,7);
for(const file of manifest.files){
  assert.equal(file.revision,data.revision);assert.equal(file.date,data.date);
  assert.ok(data.resources.some(r=>r.id===file.reference));
  assert.equal(file.sha256,hash('public'+file.href),'Unreviewed artifact: '+file.href);
  assert.equal(file.bytes,fs.statSync('public'+file.href).size);
  assert.ok(file.format==='TXT'?file.pages===null:Number.isInteger(file.pages)&&file.pages>0);
}
const sourceReview=read('docs/specifier-review/source-verification.json');
assert.equal(sourceReview.sources.length,data.sources.length);
for(const source of data.sources){
  const checked=sourceReview.sources.find(s=>s.id===source.id);
  assert.ok(checked?.unchanged&&checked.isPdf&&checked.listedOn.length);
  assert.equal(source.sha256,checked.sha256);assert.equal(source.url,checked.url);
}
console.log('Draft integrity passed: 7 downloads, metadata and 9 official source fingerprints.');
if(process.argv.includes('--public-issue')){
  const digest=textHash('lib/specifier-downloads.json');
  const pending=[];
  for(const key of ['installationAndCommissioningScope','supplierDimensionalReview']){
    if(approval[key].status!=='confirmed'||!approval[key].evidence)pending.push(key);
  }
  for(const key of ['apexTechnicalApproval','publicIssueApproval']){
    const record=approval[key];
    if(record.status!=='approved'||!record.approver||!record.date||!record.evidence||record.manifestSha256!==digest)pending.push(key);
  }
  if(pending.length){console.error('PUBLIC ISSUE BLOCKED: '+pending.join(', '));process.exitCode=1;}
  else console.log('Approval evidence recorded for this exact manifest. Manual review and PR approval remain required.');
}
