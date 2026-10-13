const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const ids=['edward','warwick','elizabeth','george','montagu','hastings','woodville','jacquetta','somerset','henry','margaret_paston','henry_percy','margaret','clarence','gloucester','percy','paston','norfolk','berkeley','talbot','louis','burgundy'];
const bios=ids.map(id=>({id,title:id.replaceAll('_',' ')}));
const context={EDWARD_BIOS:bios,E:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'artwork.js'),'utf8'),context);
for(const id of ids){const markup=context.edwardPortraitSvg(id,'A test portrait');assert(markup.includes('<img '));assert(markup.includes('alt="Illuminated portrait of A test portrait"'));const asset=id==='percy'?'henry_percy':id;assert(fs.existsSync(path.join(__dirname,'assets/art/portraits',asset+'.webp')),`portrait asset missing: ${id}`);}
assert(!context.edwardPortraitSvg('unknown','<unknown>').includes('src="assets/art/portraits/undefined.webp"'));
console.log(`PASS ${ids.length} character portrait mappings resolve to local artwork with accessible descriptions.`);
