import fs from 'node:fs';
import path from 'node:path';
const routes = ['index.html','404.html',...['en','ru','tk'].flatMap(l=>[`${l}/index.html`,`${l}/contact/index.html`])];
const failures=[];
for(const route of routes){
 const filename=path.join('out',route);if(!fs.existsSync(filename)){failures.push(`Missing route: ${route}`);continue;}
 const html=fs.readFileSync(filename,'utf8');
 if(/Lorem ipsum|Sed do eiusmod|Duis aute irure/.test(html)) failures.push(`Placeholder text: ${route}`);
 for(const match of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)){
  const target=path.join('out',decodeURIComponent(match[1].split(/[?#]/)[0]));
  if(!fs.existsSync(target)&&!fs.existsSync(path.join(target,'index.html'))) failures.push(`${route}: missing ${match[1]}`);
 }
}
const messages=['en','ru','tk'].map(l=>JSON.parse(fs.readFileSync(`src/messages/${l}.json`)));
const keys=o=>Object.entries(o).flatMap(([k,v])=>v&&typeof v==='object'&&!Array.isArray(v)?keys(v).map(s=>`${k}.${s}`):[k]).sort();
if(messages.some(m=>keys(m).join('\n')!==keys(messages[0]).join('\n')))failures.push('Translation keys differ');
if(failures.length){console.error(failures.join('\n'));process.exit(1);}console.log(`Checked ${routes.length} routes, local links/assets and three locale dictionaries.`);
