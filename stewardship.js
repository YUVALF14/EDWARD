/* Recovery is conditional, not an ending-threshold adjustment. Model units only. */
function stewardshipYear(s){const sb=s.sandbox;if(!sb||sb.ended||sb.stewardship?.lastYear===sb.year)return;
 sb.stewardship||={lastYear:null,journal:[],auditedYears:[]};const st=sb.stewardship;st.lastYear=sb.year;
 const cooled=[];
 for(const [region,n]of Object.entries(sb.unrest)){const recentForce=sb.history.some(h=>h.year===sb.year&&h.where===region&&['rebellion','retinue'].includes(h.template));const mobilised=sb.disturbances?.[region]===sb.year;
 if(n>0&&!recentForce&&!mobilised){sb.unrest[region]=Math.max(0,n-1);cooled.push(region);}}
 // Customs and estate receipts can restore credit, unless insecurity or an overseas campaign blocks them.
 const flags=sb.story?.flags||{},campaign=flags.frenchSettlement==='campaign'||(flags.calaisPolicy==='expedition'&&!flags.frenchSettlement);
 const receipts=sb.unrest.London<5&&!campaign?1:0,old=sb.credit;sb.credit=sbClamp(sb.credit+receipts,-8,8);
 for(const [id,a]of Object.entries(sb.actors)){const recentLoss=sb.history.some(h=>h.year===sb.year&&(h.actor===id||h.rival===id));if(!recentLoss&&a.grievance>0)a.grievance--;}
 const row={year:sb.year,cooled,credit:sb.credit-old,blocked:campaign?'campaign':sb.unrest.London>=5?'London insecurity':null};st.journal.push(row);
 scheduleReport(s,{id:'stewardship-'+sb.year,from:'The royal Exchequer',text:(row.credit?'Ordinary customs and estate receipts improved royal credit. ':'No further credit recovery was recorded. ')+(cooled.length?'Reports of local tension eased in '+cooled.join(', ')+'.':'Armed disputes and recent mobilisation limited local recovery.'),delay:1});
}
const _stewardAdvance=sbAdvanceYear;sbAdvanceYear=function(s){stewardshipYear(s);return _stewardAdvance(s);};
const _stewardRespond=lcRespond;lcRespond=function(s,id,move){const m=s.court?.audiences.find(x=>x.id===id&&x.status==='open');const finance=m?.topic==='accounts'&&m.target==='london'&&move==='settle';
 if(finance&&!m.evidence)throw Error('Examine the accounts before proposing a repayment schedule.');
 if(finance&&s.sandbox?.stewardship?.auditedYears?.includes(lcYear(s)))throw Error('This year’s repayment schedule is already recorded.');
 const a=finance?lcActor(s,'london'):null,accepted=finance&&a.trust+2+(s.sandbox?.royalAuthority??2)>=a.grievance;
 const before=finance?lifeSnapshot(s):null,result=_stewardRespond(s,id,move);
 if(accepted&&s.sandbox){s.sandbox.stewardship||={lastYear:null,journal:[],auditedYears:[]};s.sandbox.stewardship.auditedYears.push(lcYear(s));s.sandbox.credit=sbClamp(s.sandbox.credit+2,-8,8);lcLog(s,'A witnessed repayment schedule is entered with the London creditors. Royal credit improves; the debt is not erased.','london');lifeImpact(s,before,'Repayment terms agreed');saveWorld(s);}
 return result;
};
