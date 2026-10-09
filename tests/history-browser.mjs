import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:1200,height:900}});
const commit={sha:'a'.repeat(40),commit:{message:'Primeira versão da Bancada',author:{date:'2026-10-09T20:15:00Z'}}};
const received=process.env.COMMITS_FIXTURE?JSON.parse(await readFile(process.env.COMMITS_FIXTURE,'utf8')):[commit];
let response=received,status=200;const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('https://api.github.com/repos/neillhidden/BANCADA.az/commits?*',route=>route.fulfill({status,contentType:'application/json',body:JSON.stringify(response)}));
try{
 await page.goto(process.env.HUB_TEST_URL||'http://127.0.0.1:4201/');
 await page.getByRole('link',{name:'Escolher projeto BANCADA.az'}).click();
 await page.getByRole('heading',{name:received[0].commit.message,exact:true}).waitFor();
 assert.equal(await page.getByRole('link',{name:'Ver código desta versão'}).first().getAttribute('href'),`https://github.com/neillhidden/BANCADA.az/tree/${received[0].sha}`);
 assert.equal(await page.getByRole('link',{name:'Ver alterações',exact:true}).first().getAttribute('href'),`https://github.com/neillhidden/BANCADA.az/commit/${received[0].sha}`);
 await page.getByLabel('Pesquisar commits carregados').fill('não existe');await page.getByText('Nenhum commit corresponde à pesquisa.').waitFor();
 await page.getByLabel('Pesquisar commits carregados').fill('');
 // Refresh sees newly pushed commits; text from GitHub is never interpreted as HTML.
 response=[{...commit,sha:'b'.repeat(40),commit:{...commit.commit,message:'<img src=x onerror=alert(1)> Versão nova'}},...received];
 await page.getByRole('button',{name:'Atualizar histórico'}).click();await page.getByRole('heading',{name:response[0].commit.message,exact:true}).waitFor();
 assert.equal(await page.locator('#commits img').count(),0);
 status=403;await page.getByRole('button',{name:'Atualizar histórico'}).click();await page.getByText(/limitou temporariamente/).waitFor();
 assert.equal(await page.locator('#commits article').count(),response.length);
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1),false);
 assert.deepEqual(errors,[]);
 console.log('Bancada commit listing, exact revision links, refresh, safe commit text, search, API fallback and mobile passed.');
}finally{await browser.close();}
