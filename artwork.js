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
 const bio=EDWARD_BIOS.find(b=>b.id===id),title=E(label||bio?.title||'Person at court');
 const asset=id==='percy'?'henry_percy':EDWARD_PORTRAIT_STYLES[id]?id:'edward';
 return `<img class="edward-portrait-svg" src="assets/art/portraits/${asset}.webp" alt="Illuminated portrait of ${title}" loading="lazy" decoding="async">`;
}
function edwardPortraitFor(name){const b=edwardBioFor(name);return b?edwardPortraitSvg(b.id,b.title):'';}
