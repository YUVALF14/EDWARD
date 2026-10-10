/* EDWARD — information-value pass. A card must bring a new warrant,
   witness, material cost, deadline, or causal consequence, not restate mood. */
const EDWARD_BRIEFS={
 north_local_reconciliation:{line:'A priest brings two sworn truces, but three tenant families cannot reach the market.',stake:'New evidence: two sworn promises. The dispute is now about safe passage and meadow rents.'},
 forfeiture_witness:{line:'A forfeited manor includes the right to appoint the NEXT rector. The current priest fears removal.',stake:'The right to nominate a successor is not the right to expel the current rector.'},
 captains_dispute:{line:'Two captains disagree over who may collect the levy after Towton.',stake:'The king must identify the warrant, not merely take sides in a quarrel.'}
};
const EDWARD_PRESSURE_FOCUS={
 warwick:['Warwick’s captains return your summons unopened. Two officers offer to testify under safe conduct.','Armed retainers block a crossing. The sheriff can name both commanders.'],
 north:['Two noble households issue levies against the same tenants. Neither warrant has been cancelled.','Three receipts bear a seal that neither lord now admits. Collectors threaten to seize livestock.'],
 parish:['A priest brings two sworn promises of peace. Three families still cannot reach the market.','A collector seized a tenant’s ox despite the truce. The priest has a named witness.'],
 treasury:['Two genuine royal warrants promise the same wool customs to different creditors.','Merchants offer another loan, but only against a witnessed repayment schedule.']
};
const EDWARD_EVENT_EVIDENCE={
 patronage:(s,e,p)=>({line:`${p.name} has put a dependent into office. The dismissed officer holds a second royal warrant.`,stake:'Two officers claim one appointment. A public register may expose which promise was authorised.'}),
 estate:(s,e,p)=>({line:`${p.name} asks for a disputed estate. The current tenant has a charter naming another lord.`,stake:'Granting title changes who collects rents; a hearing delays possession.'}),
 marriage:(s,e,p)=>({line:`${p.name} asks leave for a marriage alliance. A rival household claims a prior guardianship right.`,stake:'Marriage changes property and service networks, not just family ties.'}),
 retinue:(s,e,p)=>({line:`${p.name} has gathered armed followers. Neighbours report that they now block the road.`,stake:'The muster already exists. Royal licence may restrain it—or give it legitimacy.'}),
 rumour:(s,e,p)=>({line:`Two letters disagree about ${p.name}. Their senders refuse to identify the same witness.`,stake:'A rumour can be tested. Acting on it before testimony may punish an innocent household.'}),
 petition:(s,e,p)=>({line:`Petitioners are reaching ${p.name} before the king’s clerks. Two requests now seek the same favour.`,stake:'Control of access can decide whose claim the king hears first.'}),
 treaty:(s,e,p)=>({line:`${p.name} reports a foreign assurance. No sealed copy has reached the royal chancery.`,stake:'A private promise is not yet an enforceable royal treaty.'}),
 garrison:(s,e,p)=>({line:`A captain serving ${p.name} has requested wages. Tenants say his men are taking supplies.`,stake:'Unpaid soldiers may live off the countryside; payment costs the Crown.'}),
 claim:(s,e,p)=>({line:`${p.name} revives a claim. Two witnesses will testify only if safe conduct is granted.`,stake:'A hearing may turn a dynastic rumour into a documented dispute.'}),
 credit:(s,e,p)=>({line:`${p.name} presents a loan receipt. The royal clerk records a different sum against the same customs.`,stake:'Paying one account protects credit; refusing it may provoke the creditor.'}),
 succession:(s,e,p)=>({line:`${p.name} asks to guard the heir. A second household already holds a claim to the revenues.`,stake:'Custody of the child and control of the inheritance need not be granted together.'}),
 rebellion:(s,e,p)=>({line:`A royal summons to ${p.name} has been refused. The local sheriff reports armed men at the crossing.`,stake:'The refusal is documented. Negotiation buys time; armed enforcement risks wider unrest.'})
};
function edwardEvidenceFor(s,ev){const sb=s.sandbox;
 if(ev.pressure){const def=WP_CASES[ev.pressure.id],scene=def.scenes[ev.pressure.stage];return {line:EDWARD_PRESSURE_FOCUS[ev.pressure.id]?.[ev.pressure.stage]||scene.quote,stake:scene.stake.replace(/^NEW EVIDENCE: /,'')};}
 if(ev.deep){const d=sb.deep,k=ev.deep.kind,a=SANDBOX_ACTORS[ev.actor]?.name||ev.actor,b=SANDBOX_ACTORS[ev.deep.rival]?.name||ev.deep.rival,land=dwLand(d,ev.deep.landId),name=land?.name||'the contested holding';
  if(k==='estate')return {line:`${a} disputes ${b}’s claim to ${name}. The tenants have two incompatible instructions.`,stake:`${name} is a fictional test estate. The ruling changes possession, revenue and the rival household’s grievance.`};
  if(k==='office')return {line:`${a} challenges ${b} over an appointment linked to ${name}.`,stake:'A royal warrant will decide who may collect fees and command local officers.'};
  if(k==='debt')return {line:`${a} seeks repayment. ${b} disputes the revenue pledged as security.`,stake:'A verified payment costs the treasury; delay threatens future credit.'};
  if(k==='intelligence')return {line:`${a} alleges that ${b} held a secret meeting. No independent witness has yet been heard.`,stake:'The accusation is not proof. An inquiry may expose a false source.'};
  if(k==='retinue')return {line:`${a} has armed men near ${name}; ${b} says local tenants are threatened.`,stake:'The armed followers are already present. A settlement must be enforced on the ground.'};
  if(k==='wardship'||k==='succession')return {line:`${a} and ${b} disagree over a young heir’s custody and revenues.`,stake:'Guardianship, inheritance and command of a household are separate powers.'};
  if(k==='marriage')return {line:`${a} proposes a marriage that changes ${b}’s claims to service and property.`,stake:'A marriage alliance gives the two households new obligations, not guaranteed loyalty.'};
 }
 const person=SANDBOX_ACTORS[ev.actor];if(!person)return null;
 const base=EDWARD_EVENT_EVIDENCE[ev.template]?.(s,ev,person);if(!base)return null;
 const parent=ev.parent?sb.history.find(x=>x.serial===ev.parent):null;
 if(parent){base.stake=`After your earlier order (${parent.response}), a new claimant or demand has emerged. ${base.stake}`;}
 return base;
}
const _substanceOldBuildCard=sbBuildCard;
sbBuildCard=function(s,ev){const card=_substanceOldBuildCard(s,ev);if(!card)return card;
 if(ev.story?.arc){if(card.insight)card.insight.line=edwardSentenceSummary(card.insight.line,185);return card;}
 if(ev.story?.crossover||ev.caseId)return card;
 const evidence=edwardEvidenceFor(s,ev);if(!evidence)return card;
 card.insight={line:evidence.line,stake:evidence.stake};
 if(!ev.deep&&!ev.pressure){
  card.quote=evidence.line+' '+(ev.parent?'The order follows an earlier royal decision.':'The clerk asks for a ruling before the next court sitting.');
  card.context=evidence.stake+' This is a reconstructed case from the political simulation, not a documented speech.';
 }
 return card;
};

/* Concrete trade-offs replace mood-setting filler in the 40 Focus scenes.
   These are based on the two authored effects, not invented hidden information. */
const EDWARD_STAKE_UPGRADES={
 'neville:counsel':'A written commission wins Warwick’s service; refusing it shifts appointments to the king’s household.',
 'neville:seal':'A public diplomatic instruction binds the Council; private envoys increase Warwick’s grievance.',
 'neville:clients':'Publishing the fee roll costs revenue but protects existing service; replacements favour Hastings.',
 'neville:affinity':'Sureties bind both armed groups; letting one police the other transfers control of the roads.',
 'neville:terms':'Witnessed guarantees may lower Warwick’s grievance; an ultimatum risks another armed muster.',
 'neville:reckoning':'Conditional pardons can settle the captains; separate inquiries may expose new offences.',
 'woodville:petition':'A bounded appointment raises Woodville influence; Council review keeps the queen’s kin accountable.',
 'woodville:marriage':'Checking the guardian’s legal right may prevent an unlawful transfer of a child’s inheritance.',
 'woodville:chamber':'One register makes petitioners visible to the Crown; private channels give the queen more control.',
 'woodville:charter':'Two claimants hold royal promises to the same income. One will leave with an enforceable claim.',
 'woodville:wardship':'Custody of the child and income from the estate can be separated, or entrusted to one household.',
 'woodville:reckoning':'An open audit risks exposing bad grants; broad protection strengthens the queen’s family.',
 'north:title':'An inquest preserves both claims; confirming Montagu now strengthens him and angers the Percies.',
 'north:rents':'A temporary halt costs the treasury but protects tenants; collection now may increase unrest.',
 'north:earldom':'Restoring Percy displaces Montagu and requires compensation; keeping Montagu leaves a rival claim alive.',
 'north:castle':'Direct royal custody costs two units of credit; local control preserves funds but empowers a lord.',
 'north:oath':'Public testimony costs the Crown but can reduce unrest; a private pact hides its terms from tenants.',
 'north:legacy':'Royal sheriffs preserve central authority; noble nominations turn today’s peace into future influence.',
 'caister:will':'Independent examiners may establish title; Norfolk’s arbitration gives one claimant control of the hearing.',
 'caister:rents':'Protecting the harvest feeds the garrison but costs revenue; continued collection weakens the Pastons.',
 'caister:muster':'A royal peace commission may prevent a siege; leaving the armies alone risks armed seizure.',
 'caister:gate':'A paid royal garrison enforces the writ; a compromise saves money but may leave possession disputed.',
 'caister:widow':'A final deadline forces a legal answer; another negotiation extends the family’s costs.',
 'caister:patent':'A final patent settles recorded title; shared rents buy peace without settling ownership.',
 'diplomacy:wool':'Burgundian routes preserve one alliance; French licences create another but may alienate Burgundy.',
 'diplomacy:embassy':'A public mandate keeps Warwick answerable; secret envoys may make his promises unreliable.',
 'diplomacy:letters':'One Chancery instruction costs concessions; recalling a letter may damage the king’s credit.',
 'diplomacy:captains':'Defending Calais saves credit; preparing an expedition pledges wages before a campaign exists.',
 'diplomacy:picquigny':'Only a prepared expedition can produce a military peace payment; continuing war drains credit.',
 'diplomacy:account':'Publishing accounts limits hidden spending; keeping a reserve may leave merchants unpaid.',
 'succession:brother':'A recorded allowance costs revenue but limits Clarence’s independence; refusal drives him to other patrons.',
 'succession:marriage':'A Neville marriage could give Clarence allies independent of the Crown; another match limits that link.',
 'succession:estates':'A surveyed partition costs money but clarifies rights; royal discretion leaves competing claims.',
 'succession:charges':'Independent witnesses may test the allegation; a summons risks treating rumour as guilt.',
 'succession:heir':'Separate custody and revenue checks a guardian’s power; one household gains both under a united grant.',
 'succession:guardians':'A Council settlement distributes command; one household may control the treasury after Edward.',
 'cross:two_doors':'A public register reveals who promised what; separate audiences let rival households claim royal backing.',
 'cross:northern_writ':'Royal escorts cost credit but enforce the writ; local escorts give Montagu leverage over Percy.',
 'cross:empty_chest':'Paying one garrison leaves the other in arrears; the unpaid captain may abandon his post.',
 'cross:two_guardians':'Separate custody from rents to remove duplicate warrants; concentrating both preserves a future dispute.'
};
const _substanceOldFocus=edwardFocusData;
edwardFocusData=function(){const d=_substanceOldFocus();if(!d||!current||arena)return d;
 const manual=EDWARD_BRIEFS[current.id],insight=current.insight||manual;
 if(d.key&&EDWARD_STAKE_UPGRADES[d.key])d.stake=EDWARD_STAKE_UPGRADES[d.key];
 if(insight){d.focus=edwardSentenceSummary(insight.line,195);d.stake=edwardSentenceSummary(insight.stake,155);if(current.insight&&current.storyInfo)d.authored=null;}
 return d;
};
