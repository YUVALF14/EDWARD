/* Experimental entry scenarios and factual ledger. No new historical presets.
   Later entries simulate an explicitly fictional prehistory through the existing engine. */
const REIGN_ENTRIES=[1461,1465,1469,1471,1475,1480];
function reignSnapshot(s){return {turn:s.turn,orders:s.court?.orders.length||0,lifeResolved:s.life?.journal.filter(x=>x.stage==='resolved').length||0,authority:s.sandbox?.royalAuthority??null,credit:s.sandbox?.credit??null,unrest:{...s.sandbox?.unrest},offices:{...s.offices}};}
function reignCreate(year,seed){
 if(!REIGN_ENTRIES.includes(year))throw Error('Unsupported entry year');
 const s=newWorld(seed);
 if(year>1461){s.chapterIndex=CHAPTERS.length;s.facts.marriage='elizabeth';s.facts.somerset_1464='rebels';s.facts.north_rising_1464='active';s.offices.northern_commission='warwick';s.offices.chamberlain='hastings';s.links.warwick=3;s.links.hastings=2;s.links.woodville=2;}
 // Suppress intermediate autosaves; publish only a complete entry state.
 const previousSave=saveWorld;saveWorld=function(){};
 try{let card=getNextSituation(s),guard=0;
 while(year>1465&&s.sandbox.year<year&&card&&guard++<400){const side=hashScore(s.seed,'entry-history',s.turn)%2?'left':'right';card=resolveChoice(s,card,side,null);}
 if(year>1465&&(s.finished||s.sandbox.year!==year))throw Error('Unable to prepare this entry');
 s.reign={schema:1,startYear:year,generatedTurns:s.turn,baseline:reignSnapshot(s),provenance:year===1461?'Full reign':year===1465?'Illustrative 1465 settlement':'Simulated alternate prehistory from 1465'};
 return s;
 }finally{saveWorld=previousSave;}
}
function reignFacts(s){const b=s.reign?.baseline,sb=s.sandbox,c=s.court;return {
 startYear:s.reign?.startYear??null,year:Math.min(1483,lcYear(s)),finished:!!s.finished,
 playerDecisions:b?s.turn-b.turn:null,totalDecisions:s.turn,generatedDecisions:s.reign?.generatedTurns??null,
 initiatives:b?(c?.orders.length||0)-b.orders:c?.orders.length||0,
 resolvedLife:b?(s.life?.journal.filter(x=>x.stage==='resolved').length||0)-b.lifeResolved:s.life?.journal.filter(x=>x.stage==='resolved').length||0,
 promises:{kept:c?.promises.filter(x=>x.status==='kept').length||0,broken:c?.promises.filter(x=>x.status==='broken').length||0,open:c?.promises.filter(x=>x.status==='open').length||0},
 authority:sb?.royalAuthority??null,credit:sb?.credit??null,unrest:{...sb?.unrest},offices:{...s.offices},
 ending:sb?.endings?.dimensions||null,baseline:b||null};}
