const fs=require('fs'),vm=require('vm');const c={console,Math,EDWARD_SIMULATION:true,localStorage:{getItem(){return null},setItem(){},removeItem(){}}};vm.createContext(c);
for(const f of ['data.js','reactive.js','emergent.js','sandbox.js','deepworld.js','narrative.js','story_scenes.js','story_crossovers.js','story_engine.js','delayed.js','engine.js','world_pressure.js','historical_world.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c,{filename:f});
vm.runInContext('this.API={newWorld,getNextSituation,resolveChoice,CHAPTERS,edwardHistoryAudit,WP_CASES}',c);const {newWorld,getNextSituation,resolveChoice,CHAPTERS,edwardHistoryAudit,WP_CASES}=c.API;
function rng(seed){let x=seed>>>0;return()=>{x^=x<<13;x^=x>>>17;x^=x<<5;return(x>>>0)/4294967296;};}
function start(seed,shortcut=true){const s=newWorld(seed);if(shortcut){s.chapterIndex=CHAPTERS.length;s.facts.marriage=seed%4===0?'foreign':'elizabeth';s.facts.somerset_1464='rebels';s.facts.north_rising_1464=seed%3===0?'averted':'active';s.offices.northern_commission='warwick';s.offices.chamberlain='hastings';s.links.warwick=3;s.links.hastings=2;s.links.woodville=2;}return s;}
function run(seed,policy='mixed',flip=null){const r=rng(seed*173+91),s=start(seed,seed%3!==0);let card=getNextSituation(s),turns=0,seen=[],snap47=null;
 while(card&&turns<290){let side=policy==='left'?'left':policy==='right'?'right':r()<.5?'left':'right';let arena=null;
  if(flip!==null&&card.storyInfo?.id==='neville'&&card.storyInfo.step===1)side=flip;
  if(policy==='mixed'&&card.wait&&r()<.035)side='wait';
  if(policy==='mixed'&&side!=='wait'&&card.up&&r()<.03)arena='up';
  if(turns===46)snap47={id:card.id,year:card.when,who:card.who,tag:card.tag,quote:typeof card.quote==='string'?card.quote:'(function)',context:typeof card.context==='string'?card.context:'(function)'};
  seen.push((card.pressureInfo?'P:'+card.pressureInfo.id+':'+card.pressureInfo.stage:card.storyInfo?'S:'+card.storyInfo.id+':'+card.storyInfo.step:card.dynamic?'D:'+card.tag:'A:'+card.id)+'/'+side);
  card=resolveChoice(s,card,side,arena);turns++;
 }
 if(card||!s.finished||!s.sandbox?.endings)throw Error('Game incomplete '+seed+' '+turns);
 const problems=edwardHistoryAudit(s);if(problems.length)throw Error('History invariant '+seed+': '+problems.join('; '));
 if(s.offices.chancellor==='george'||!s.facts.george_neville_death_recorded)throw Error('George Neville incorrectly serving after 1476 '+seed);
 const st=s.sandbox.story,p=s.sandbox.pressure||{journal:[],cases:{}};
 const heard=new Set(st.journal.map(j=>j.arc+':'+j.beat));for(const q of st.quietClosures||[])if(heard.has(q.arc+':'+q.beat))throw Error('Skipped scene was played '+q.arc+':'+q.beat);
 return {s,turns,seen,snap47,quiet:st.quietClosures?.length||0,pressure:p.journal.length,triggered:Object.keys(p.cases||{}),french:st.flags.frenchSettlement||null,crisis:p.journal.map(j=>j.id+':'+j.stage),story:st.journal.length};
}
const N=Number(process.argv[2]||1000);const out={runs:0,failures:[],avgTurns:0,avgStory:0,avgQuiet:0,avgCrises:0,triggerCounts:{},crisisCounts:{},frenchSettlement:{},examples:[],turn47:[],differentSequences:0};
for(let i=0;i<N;i++)try{const seed=34000+i,mode=['mixed','left','right'][i%3],a=run(seed,mode);out.runs++;out.avgTurns+=a.turns;out.avgStory+=a.story;out.avgQuiet+=a.quiet;out.avgCrises+=a.pressure;for(const id of a.triggered)out.triggerCounts[id]=(out.triggerCounts[id]||0)+1;for(const id of a.crisis)out.crisisCounts[id]=(out.crisisCounts[id]||0)+1;out.frenchSettlement[a.french||'none']=(out.frenchSettlement[a.french||'none']||0)+1;if(i<4)out.examples.push({seed,turns:a.turns,quiet:a.quiet,crises:a.crisis,ending:a.s.sandbox.endings.key});if(i<5)out.turn47.push({seed,card:a.snap47});if(i<120){const b=run(seed,mode==='mixed'?'left':'right');if(a.seen.join('|')!==b.seen.join('|'))out.differentSequences++;}}
 catch(e){out.failures.push({i,error:String(e.stack||e)});if(out.failures.length>=8)break;}
for(const k of ['avgTurns','avgStory','avgQuiet','avgCrises'])out[k]=+(out[k]/Math.max(1,out.runs)).toFixed(2);
fs.writeFileSync('worldcraft_audit.json',JSON.stringify(out,null,2));console.log(JSON.stringify({...out,examples:out.examples,turn47:out.turn47},null,2));if(out.failures.length)process.exitCode=1;
