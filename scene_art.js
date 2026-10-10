/* EDWARD — ten original, self-contained illuminated-manuscript scene vignettes.
   They are interpretive illustrations of political situations, not records of
   a particular historical encounter or authenticated likenesses. */
const EDWARD_SCENE_LABELS={coronation:'The royal crown',battle:'The muster and the battlefield',castle:'A castle and its moat',diplomacy:'The Channel and the envoy',marriage:'A royal marriage alliance',council:'The king’s council',inheritance:'The disputed deed',parish:'A parish and the harvest road',succession:'The heir and the royal seal',treasury:'The Exchequer and the royal chest'};
function edwardSceneType(card){if(!card)return 'council';const text=[card.id,card.tag,card.where,card.storyInfo?.id,card.pressureInfo?.id].filter(Boolean).join(' ').toLowerCase();
 if(/coronation|crown|enthrone/.test(text))return 'coronation';
 if(/caister|castle|garrison|gatehouse|siege|keep/.test(text))return 'castle';
 if(/battle|towton|hedgeley|hexham|rebellion|muster|warwick|retinue|armed|bridge/.test(text))return 'battle';
 if(/priest|parish|sanctuary|abbot|meadow|truce/.test(text)||/priest|abbot/i.test(card.who))return 'parish';
 if(/picquigny|france|french|calais|burgund|treaty|envoy|channel|embassy|wool/.test(text))return 'diplomacy';
 if(/marriage|wedding|queen|woodville/.test(text))return 'marriage';
 if(/heir|succession|guardian|clarence|prince/.test(text))return 'succession';
 if(/credit|exchequer|treasury|customs|loan|chest/.test(text))return 'treasury';
 if(/estate|land|charter|inheritance|title|rents|paston|percy/.test(text))return 'inheritance';
 return 'council';
}
function edwardSceneFigure(x,y,coat='#6c3039',scale=1){return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M-15 0q-12 24-20 67h70Q26 22 15 0Z" fill="${coat}" stroke="#201f20" stroke-width="2"/><path d="M-8-9h16v20H-8Z" fill="#b88d6d"/><ellipse cy="-26" rx="17" ry="22" fill="#d2a782" stroke="#715345" stroke-width="2"/><path d="M-18-30q0-28 18-26 20 0 18 27-8-12-20-12-8 8-16 11" fill="#49352b"/><path d="M-28 64h56" stroke="#d6c38c" stroke-width="3"/></g>`;}
function edwardVignetteSvg(type='council',label=''){const gold='#c8a968',ivory='#e9d6a9',ink='#1a2624',red='#843b45',blue='#375b67',green='#385849',sky='#a8b4a0';
 const person=(x,y,c,scale=1)=>edwardSceneFigure(x,y,c,scale);
 const scroll=(x,y,w=90)=>`<g transform="translate(${x} ${y})"><path d="M0 0h${w}v49H0q-13-8 0-16V0" fill="#dfcda7" stroke="#7e684c" stroke-width="2"/><path d="M12 11h${w-26}m-${w-26} 10h${w-37}m-${w-37} 10h${w-32}" stroke="#978566" stroke-width="2"/><circle cx="${w-18}" cy="40" r="10" fill="#943f43" stroke="#d6aa7b" stroke-width="2"/></g>`;
 const castle=`<g stroke="#473a31" stroke-width="3"><path d="M106 164V84h46V65h42v18h36V58h52v28h38v78Z" fill="#9c6d58"/><path d="M102 84h55v-10h-10V63h-12v11h-12V63h-12v11h-9Zm91-1h48V72h-10V60h-12v12h-12V60h-14Zm38-25h60V46h-12V34h-12v12h-12V34h-12v12h-12Z" fill="#a47760"/><path d="M183 164v-41q15-20 29 0v41" fill="#292c2b"/><path d="M118 102h12v22h-12Zm140-1h12v24h-12Z" fill="#313638"/><path d="M84 172h255l-17 22H98Z" fill="#436a6e" stroke="#a3b2a0"/></g>`;
 const ship=`<g stroke="#3d3e36" stroke-width="3"><path d="M74 154h224l-30 35H115Z" fill="#734e3b"/><path d="M181 60v97"/><path d="M185 62v85h73Z" fill="#e5d4a9"/><path d="M174 68v76H110Z" fill="#c8b27e"/><path d="M98 172h196" stroke="#d5bc8d" stroke-width="2"/></g>`;
 const chapel=`<g stroke="#5b5141" stroke-width="3"><path d="M100 176V92l86-62 89 62v84Z" fill="#9b9980"/><path d="M90 93 186 24l99 69" fill="none" stroke="#d3c59a" stroke-width="7"/><path d="M163 176v-56q23-27 45 0v56" fill="#343e3a"/><path d="M179 49v45m-12-33h24" stroke="#d8bc7e" stroke-width="5"/><path d="M121 112h22v31h-22Zm108 0h22v31h-22Z" fill="#a8b8b1"/></g>`;
 const crown=`<g stroke="#684b2e" stroke-width="3"><path d="M141 114 153 56l28 25 30-48 28 48 30-25 12 58-13 19H154Z" fill="#d7b15d"/><path d="M149 112h126v22H149Z" fill="#b18a47"/><circle cx="211" cy="114" r="9" fill="#a04145"/><circle cx="167" cy="114" r="6" fill="#426b65"/><circle cx="255" cy="114" r="6" fill="#426b65"/></g>`;
 const scales=`<g stroke="#a98c53" stroke-width="5" fill="none"><path d="M220 49v107m-62-83h124m-62-19 0-16m-40 34-25 52m25-52 25 52m45-52-25 52m25-52 25 52"/><path d="M145 125q34 20 68 0M215 125q34 20 68 0" stroke-width="4"/><path d="M181 153h78"/></g>`;
 const scene={
 coronation:`<path d="M86 170V82q0-64 124-66 125 2 125 66v88" fill="#4a5144" stroke="#c8b580" stroke-width="5"/>${crown}<path d="M139 160h144" stroke="#d7c18b" stroke-width="9"/><path d="M156 160v25h111v-25" fill="#74464b"/>`,
 battle:`<path d="M40 182q89-35 168 0 89-35 176 0" fill="#63745c" stroke="#354b3c" stroke-width="4"/><path d="M110 170V47m-3 0 44 12-44 13m182 94V53m-3 0-48 14 48 14" stroke="#443d31" stroke-width="5" fill="${ivory}"/>${person(150,133,blue,.75)}${person(255,133,red,.75)}<path d="M190 124 167 55m62 72 25-70" stroke="#d6d2b7" stroke-width="6"/><path d="M165 55l-8 17m97-15 7 16" stroke="#c6c7b4" stroke-width="3"/>`,
 castle:castle+`<path d="M47 179h54m243 0h31" stroke="#c3ad79" stroke-width="5"/>`,
 diplomacy:ship+`<path d="M50 194q25-12 50 0t50 0 50 0 50 0 50 0 50 0" fill="none" stroke="#96afb0" stroke-width="4"/><path d="M285 64h47v36h-47Z" fill="#d4bd88" stroke="#9d804f" stroke-width="2"/><path d="M300 73h18m-18 8h14" stroke="#90764e" stroke-width="2"/><circle cx="313" cy="93" r="7" fill="#9c414a"/>`,
 marriage:chapel+`${person(157,137,red,.45)}${person(231,137,green,.45)}<path d="M178 156q17-8 31 0" stroke="#d6b178" stroke-width="5" fill="none"/><circle cx="196" cy="153" r="7" fill="none" stroke="#dcb86a" stroke-width="4"/>`,
 council:`<path d="M61 164h300v25H61Z" fill="#79533d" stroke="#d3b77d" stroke-width="4"/>${person(115,95,blue,.8)}${person(210,83,red,.88)}${person(309,95,green,.8)}${scroll(163,143,92)}`, 
 inheritance:`${scroll(70,87,145)}${scales}<path d="M92 171h229" stroke="#96764d" stroke-width="5"/>`,
 parish:chapel+`<path d="M47 188h330" stroke="#a9a46d" stroke-width="4"/><path d="M64 168h51v18H64Z" fill="#8b613f"/><circle cx="78" cy="188" r="11" fill="#443b2e"/><circle cx="105" cy="188" r="11" fill="#443b2e"/>${person(309,127,green,.54)}<path d="M289 127l-6 51" stroke="#d1bb8c" stroke-width="3"/>`,
 succession:`<path d="M123 172V97h173v75" fill="#6d3d4d" stroke="#c6a46b" stroke-width="5"/>${crown}<path d="M190 143h53v30h-53Z" fill="#c4b386" stroke="#654e3d" stroke-width="3"/><path d="M205 154h23" stroke="#9c4d4a" stroke-width="5"/>`,
 treasury:`<path d="M91 105h220v80H91Z" fill="#78503b" stroke="#d2b274" stroke-width="5"/><path d="M86 108q114-67 230 0" fill="#916d46" stroke="#d2b274" stroke-width="5"/><path d="M192 109v76m-93-45h204" stroke="#d3b67e" stroke-width="4"/><circle cx="207" cy="144" r="17" fill="#d5b15d" stroke="#9c7c3d" stroke-width="4"/><path d="M204 132v25m-8-21h19m-19 17h19" stroke="#876c39" stroke-width="3"/>`
 }[type]||'';
 const title=E(label||EDWARD_SCENE_LABELS[type]||'Illustrative medieval scene');
 return `<svg class="edward-scene-svg" viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interpretive illustration: ${title}"><title>Interpretive illustration: ${title}</title><defs><linearGradient id="sceneSky" x2="0" y2="1"><stop stop-color="#4b655e"/><stop offset="1" stop-color="#89907a"/></linearGradient><pattern id="sceneBorder" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M6 0 12 6 6 12 0 6Z" fill="none" stroke="#b9a371" stroke-opacity=".4" stroke-width="1"/></pattern></defs><rect x="1" y="1" width="418" height="218" rx="12" fill="#1d2925" stroke="#c6a96d" stroke-width="2"/><rect x="10" y="10" width="400" height="200" rx="8" fill="url(#sceneSky)"/><circle cx="328" cy="51" r="28" fill="#dfc48c" opacity=".67"/><path d="M10 158q82-47 170-8 78-42 151 0 44-13 79 8v52H10Z" fill="#536b55"/><path d="M10 183q96-28 190-2 116-28 210 1v28H10Z" fill="#435746"/>${scene}<rect x="12" y="12" width="396" height="196" rx="7" fill="none" stroke="#d2b981" stroke-width="2"/><path d="M25 25h38m-38 0v35m370-35h-38m38 0v35M25 195h38m-38 0v-35m370 35h-38m38 0v-35" stroke="#e3cc95" stroke-width="3" fill="none"/><rect x="5" y="5" width="410" height="210" rx="10" fill="url(#sceneBorder)" opacity=".3" pointer-events="none"/></svg>`;
}
function edwardOpenScene(){if(!current)return;const type=edwardSceneType(current);const label=EDWARD_SCENE_LABELS[type];
 openSheet('An Illustrated Moment','<div class="scene-art-large">'+edwardVignetteSvg(type,label)+'</div><div class="eyebrow">ILLUMINATED CHRONICLE · ARTISTIC INTERPRETATION</div><p>'+E(label)+'. This image evokes a fifteenth-century setting; it is not a documentary depiction of a specific event or a verified likeness.</p><div class="row"><b>Why this scene is here</b><span>'+E(current.insight?.stake||current.context||'The situation follows decisions and pressures in your reign.')+'</span></div><button class="reset-link" id="sceneHistoricalLens">Recorded history vs your reign →</button>');
 document.getElementById('sceneHistoricalLens').onclick=edwardHistoricalLens;
}
function edwardAddSceneToCard(){const card=document.getElementById('card');if(!card||!current||card.querySelector('.scene-art-band'))return;
 const type=edwardSceneType(current),rule=card.querySelector('.rule');if(!rule)return;
 const band=document.createElement('div');band.className='scene-art-band';band.setAttribute('aria-hidden','true');band.innerHTML=edwardVignetteSvg(type);rule.after(band);
 const tools=card.querySelector('.reading-tools');if(tools&&!tools.querySelector('.scene-art-button')){
  const btn=document.createElement('button');btn.className='scene-art-button';btn.type='button';btn.textContent='✦ Scene';btn.title='View a manuscript-inspired scene illustration';btn.addEventListener('pointerdown',e=>e.stopPropagation());btn.onclick=e=>{e.stopPropagation();edwardOpenScene();};tools.insertBefore(btn,tools.querySelector('.reading-level-btn'));
 }
}
const _sceneOldRenderCard=renderCard;
renderCard=function(){_sceneOldRenderCard();edwardAddSceneToCard();};
const _sceneOldReadingMore=edwardReadingMore;
edwardReadingMore=function(){_sceneOldReadingMore();if(!current)return;const type=edwardSceneType(current);const details=document.createElement('details');details.className='reading-detail';details.innerHTML='<summary>Illustrated moment <span>visual context, optional</span></summary><div class="reading-detail-body"><div class="scene-art-large">'+edwardVignetteSvg(type)+'</div><p><small>Original interpretive illustration. Not a documentary depiction of the event.</small></p></div>';const summary=sheet.querySelector('.reading-summary');if(summary)summary.after(details);};
