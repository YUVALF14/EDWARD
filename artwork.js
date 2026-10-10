/* EDWARD — Original manuscript-inspired vector portraits.
   Interpretive drawings only: not archival likenesses, not sourced paintings.
   SVGs are self-contained so they render in offline HTML and iOS Safari. */
const EDWARD_PORTRAIT_STYLES={
 edward:{coat:'#6c2530',cloak:'#a23d3b',trim:'#e4c480',hair:'#4c2f25',skin:'#d7a681',head:'crown',device:'sun'},
 warwick:{coat:'#253e46',cloak:'#435d62',trim:'#d4b879',hair:'#4a3227',skin:'#cda17f',head:'cap',device:'star'},
 elizabeth:{coat:'#355247',cloak:'#416958',trim:'#e4c987',hair:'#7a4b2b',skin:'#e2b69b',head:'veil',device:'rose'},
 george:{coat:'#4d2f47',cloak:'#71445b',trim:'#e0c891',hair:'#44302b',skin:'#d7ae8c',head:'mitre',device:'cross'},
 montagu:{coat:'#3b4955',cloak:'#526270',trim:'#d7c28c',hair:'#4d3025',skin:'#d2a37f',head:'helmet',device:'star'},
 hastings:{coat:'#4c3e4d',cloak:'#655167',trim:'#dbc191',hair:'#54392a',skin:'#d4a17f',head:'cap',device:'sun'},
 woodville:{coat:'#47604b',cloak:'#587859',trim:'#d9bd81',hair:'#59352b',skin:'#d9ac8b',head:'cap',device:'rose'},
 jacquetta:{coat:'#4e4b62',cloak:'#73718a',trim:'#e3c990',hair:'#69503e',skin:'#d4a68b',head:'veil',device:'rose'},
 somerset:{coat:'#733b3c',cloak:'#904a4a',trim:'#e0c98c',hair:'#47372a',skin:'#d3a181',head:'helmet',device:'fleur'},
 henry:{coat:'#654246',cloak:'#85505c',trim:'#d9bf85',hair:'#513b32',skin:'#d9ac8d',head:'crown',device:'fleur'},
 margaret_paston:{coat:'#494d60',cloak:'#5f6575',trim:'#dcc899',hair:'#5c3f2d',skin:'#dbb095',head:'veil',device:'quill'},
 henry_percy:{coat:'#4d4540',cloak:'#776050',trim:'#d6bd88',hair:'#57392a',skin:'#d5a784',head:'helmet',device:'star'},
 margaret:{coat:'#664057',cloak:'#92586b',trim:'#ead18d',hair:'#55382f',skin:'#dcae92',head:'veil',device:'fleur'},
 clarence:{coat:'#553d58',cloak:'#725076',trim:'#e4c58e',hair:'#503124',skin:'#d8a884',head:'cap',device:'sun'},
 gloucester:{coat:'#354a43',cloak:'#526b5b',trim:'#d9c28c',hair:'#382b28',skin:'#cda082',head:'helmet',device:'rose'},
 percy:{coat:'#4d4540',cloak:'#776050',trim:'#d6bd88',hair:'#57392a',skin:'#d5a784',head:'helmet',device:'star'},
 paston:{coat:'#494d60',cloak:'#5f6575',trim:'#dcc899',hair:'#5c3f2d',skin:'#dbb095',head:'cap',device:'quill'},
 norfolk:{coat:'#384d4d',cloak:'#4f6666',trim:'#e3c995',hair:'#543b31',skin:'#d6a88b',head:'cap',device:'shield'},
 berkeley:{coat:'#495441',cloak:'#667455',trim:'#d6c28c',hair:'#57382e',skin:'#d9ab8b',head:'cap',device:'shield'},
 talbot:{coat:'#474a60',cloak:'#616682',trim:'#dfc18c',hair:'#553b30',skin:'#d6a582',head:'helmet',device:'shield'},
 louis:{coat:'#46576a',cloak:'#63788e',trim:'#ead099',hair:'#49392d',skin:'#d8ad8b',head:'crown',device:'fleur'},
 burgundy:{coat:'#463e51',cloak:'#6b596a',trim:'#e4cb92',hair:'#51372b',skin:'#d5a583',head:'cap',device:'fleur'}
};
function edwardPortraitSvg(id,label){
 const cfg=EDWARD_PORTRAIT_STYLES[id]||EDWARD_PORTRAIT_STYLES.edward;
 const title=E(label||EDWARD_BIOS.find(b=>b.id===id)?.title||'A person at court');
 const female=cfg.head==='veil';
 const symbol={sun:'<circle cx="90" cy="40" r="15"/><path d="M90 15v10m0 30v10M65 40h10m30 0h10M73 23l7 7m20 20 7 7m0-34-7 7M80 50l-7 7"/>',star:'<path d="m90 18 8 16 18 2-13 12 3 18-16-9-16 9 3-18-13-12 18-2Z"/>',rose:'<path d="M90 20c-18-12-25 4-14 16-20-5-24 12-8 20-6 19 11 25 22 9 11 16 28 10 22-9 16-8 12-25-8-20 11-12 4-28-14-16Z"/><circle cx="90" cy="44" r="9"/>',cross:'<path d="M84 18h12v17h17v12H96v20H84V47H67V35h17Z"/>',fleur:'<path d="M90 17c-17 14-10 25-5 32-22-23-36 2-12 9l17 2 17-2c24-7 10-32-12-9 5-7 12-18-5-32Zm-19 49h38"/>',quill:'<path d="M64 64q35-49 53-42-3 39-47 47l33-28M66 72l-12 17"/>',shield:'<path d="M90 17 114 26v20q0 20-24 29-24-9-24-29V26Z"/>'}[cfg.device]||'';
 const hair=female?'<path d="M55 98q-8-55 35-61 43 6 35 61l-9 25-11-7V66Q90 46 75 67v50l-11 7Z" fill="'+cfg.hair+'"/>':'<path d="M57 89q-5-53 33-53 39 0 33 53-9-16-14-28-18 10-44 10l-8 18Z" fill="'+cfg.hair+'"/><path d="M56 90q-9 9-5 27l12 4-1-30Zm68 0q9 9 5 27l-12 4 1-30Z" fill="'+cfg.hair+'"/>';
 const headwear={
  crown:'<path d="M55 53 59 29 76 42 90 18 105 42 122 29 126 53 122 61H58Z" fill="'+cfg.trim+'" stroke="#48361f" stroke-width="2"/><circle cx="90" cy="49" r="5" fill="#9b383c"/><circle cx="63" cy="49" r="3" fill="#44645e"/><circle cx="117" cy="49" r="3" fill="#44645e"/>',
  veil:'<path d="M53 84Q43 33 89 26q46 7 38 58l-9 61-17-10 8-67Q90 49 71 69l7 66-17 10Z" fill="#e0d5b5" stroke="#a39b81" stroke-width="2"/><path d="M59 55q30-25 61 0" fill="none" stroke="'+cfg.trim+'" stroke-width="6"/>',
  mitre:'<path d="M57 61 90 12l33 49-3 18H60Z" fill="#d4c59e" stroke="'+cfg.trim+'" stroke-width="3"/><path d="M90 21v52m-22-21h44" stroke="#79523f" stroke-width="4"/><path d="M118 75q20 35 6 71" fill="none" stroke="#c3b27c" stroke-width="5"/>',
  helmet:'<path d="M52 81q-1-49 38-49 40 0 38 49H52Z" fill="#a9b2ae" stroke="#536463" stroke-width="3"/><path d="M50 80h80M89 33V20" stroke="#e0c99b" stroke-width="5"/><path d="M78 23q12-12 24 0" stroke="'+cfg.cloak+'" stroke-width="7" fill="none"/>',
  cap:'<path d="M53 61Q50 26 91 28q38 0 36 33-32-13-74 0Z" fill="'+cfg.coat+'" stroke="'+cfg.trim+'" stroke-width="3"/><path d="M50 61q42-16 80 0" stroke="'+cfg.trim+'" stroke-width="8" fill="none"/><circle cx="109" cy="37" r="6" fill="#e4c685"/>'
 }[cfg.head]||'';
 return '<svg class="edward-portrait-svg" viewBox="0 0 180 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustrated interpretation of '+title+'"><title>Illustrated interpretation of '+title+'</title>'+
 '<path d="M4 206V69Q4 4 90 4t86 65v137Z" fill="#202e2a" stroke="'+cfg.trim+'" stroke-width="4"/>'+
 '<path d="M12 200V69Q12 13 90 13t78 56v131Z" fill="#354c47"/>'+
 '<g opacity=".24" stroke="'+cfg.trim+'" fill="none" stroke-width="2">'+symbol+'</g>'+
 '<path d="M13 209q5-70 52-78l25-7 25 7q48 8 52 78Z" fill="'+cfg.cloak+'" stroke="#14211f" stroke-width="3"/>'+
 '<path d="M45 210q3-57 28-66l17 17 17-17q26 9 29 66Z" fill="'+cfg.coat+'"/>'+
 '<path d="M79 118v25l11 16 11-16v-25Z" fill="'+cfg.skin+'" stroke="#9a6b57" stroke-width="2"/>'+
 hair+
 '<ellipse cx="90" cy="94" rx="34" ry="46" fill="'+cfg.skin+'" stroke="#8b604f" stroke-width="2"/>'+
 '<path d="M70 90q8-4 14 0m12 0q8-4 14 0" stroke="#5c4038" stroke-width="2.5" fill="none"/>'+
 '<circle cx="78" cy="94" r="2.1" fill="#372c2b"/><circle cx="102" cy="94" r="2.1" fill="#372c2b"/>'+
 '<path d="M91 97l-3 13 6 1m-14 10q10 5 20 0" stroke="#925c50" stroke-width="2" fill="none" stroke-linecap="round"/>'+
 (female?'<path d="M55 92q-5 27 7 44l-11 15-9-42Z M125 92q5 27-7 44l11 15 9-42Z" fill="#d6c8ac"/>':'')+
 headwear+
 '<path d="M58 147 90 165l32-18" stroke="'+cfg.trim+'" stroke-width="4" fill="none"/>'+
 '<circle cx="90" cy="174" r="8" fill="'+cfg.trim+'"/><circle cx="90" cy="174" r="3" fill="#536d65"/>'+
 '<path d="M20 194h140" stroke="'+cfg.trim+'" stroke-opacity=".5" stroke-width="2"/>'+
 '</svg>';
}
function edwardPortraitFor(name){const b=edwardBioFor(name);return b?edwardPortraitSvg(b.id,b.title):'';}
