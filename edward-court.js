/* Date-aware people and historical notes. A portrait is an interpretation,
   never evidence that a person is physically present in a scene. */
const PEOPLE={
 edward:{name:'Edward IV',short:'Edward',portrait:'edward',office:'King of England',bio:'Son of Richard, Duke of York, and Cecily Neville. Charismatic and politically perceptive, Edward enjoys company and the freedoms of kingship. He can also act before patience has caught up with judgment.'},
 warwick:{name:'Richard Neville',short:'Warwick',portrait:'warwick',office:'Earl of Warwick',bio:'An experienced political operator whose family, estates, retainers and diplomacy give him influence beyond any one office. He reads power keenly and takes pride in the alliances he built; exclusion can feel like a judgment on his service.'},
 hastings:{name:'William Hastings',short:'Hastings',portrait:'hastings',office:'Lord Hastings · Lord Chamberlain',bio:'A capable household servant and close friend, with a growing affinity in the Midlands. He is loyal to Edward while protecting his own access, standing and people; trust does not require him to agree with every royal decision.'},
 elizabeth:{name:'Elizabeth Woodville',short:'Elizabeth',portrait:'elizabeth',office:'Queen of England',bio:'Daughter of Richard Woodville and Jacquetta of Luxembourg; widow of Sir John Grey, with two sons from that marriage. Affectionate and politically alert, she protects a household of her own and weighs what royal favour will mean for her kin.'},
 jacquetta:{name:'Jacquetta of Luxembourg',short:'Jacquetta',portrait:'jacquetta',office:'Dowager Duchess of Bedford',bio:'Elizabeth’s mother. Her first marriage was to John, Duke of Bedford; her second to Richard Woodville. Connections to both royal causes shape her family’s position.'},
 gloucester:{name:'Richard Plantagenet',short:'Richard',portrait:'gloucester',birth:14521002,office:'Duke of Gloucester',bio:'Edward’s youngest surviving brother, born on 2 October 1452 to Richard, Duke of York, and Cecily Neville. Quietly observant and disciplined, he learns through service while building a judgment and following of his own.'},
 clarence:{name:'George of York',short:'Clarence',portrait:'clarence',office:'Duke of Clarence',bio:'Edward’s younger brother, born in October 1449. Charming and ambitious, he wants a place among the king’s trusted men as much as the authority his title promises. Attachment to Edward lives alongside resentment at dependence.'},
 cecily:{name:'Cecily Neville',short:'Cecily',portrait:'cecily',office:'Duchess of York · the king’s mother',bio:'Widow of Richard, Duke of York, and mother of Edward, George, Richard and Margaret. Her sons’ rivalries and her grandchildren’s futures are family matters she will not let the king reduce to policy.'},
 bourchier:{name:'Thomas Bourchier',short:'Bourchier',portrait:'bourchier',office:'Archbishop of Canterbury',bio:'A senior churchman whose authority reaches beyond the king’s household. Religious witness gives political settlements another kind of weight.'},
 anthony:{name:'Anthony Woodville',short:'Rivers',portrait:'anthony',office:'Earl Rivers',bio:'Elizabeth’s brother, a soldier and diplomatic servant. His closeness to the royal family does not erase the service on which his authority depends.'},
 margaretYork:{name:'Margaret of York',short:'Margaret',portrait:'margaret-york',office:'Duchess of Burgundy',bio:'Edward’s sister. Her marriage to Charles of Burgundy in 1468 links a personal bond to continental politics. Her husband’s interests remain his own.'},
 henry:{name:'Henry VI',short:'Henry VI',portrait:'henry',office:'King of the House of Lancaster',bio:'Edward’s rival for the throne, a father and a patron of religious learning. Henry founded Eton and King’s College, Cambridge. Serious illness has interrupted his ability to rule; it does not make every word or silence a symptom. His name gathers allegiance even when his freedom to act is constrained.'},
 percy:{name:'Henry Percy',short:'Northumberland',portrait:'henry_percy',office:'Earl of Northumberland',bio:'Restored to the earldom in 1470. His northern affinity is a separate interest from the king’s brother Gloucester, even when both serve Edward.'},
 montagu:{name:'John Neville',short:'John Neville',portrait:'montagu',office:'Lord Montagu',bio:'Warwick’s younger brother, an experienced northern commander with a household, wife and children of his own. Service to Edward and loyalty to his family do not always point the same way. He measures royal favour against the costs his own men carry.'},
 louis:{name:'Louis of France',short:'Louis',portrait:'louis',office:'Dauphin of France',bio:'A patient negotiator, devout patron and demanding master of servants. His quarrels with the great French princes and the security of his own dynasty shape his English policy. He values a useful correspondence without confusing it with friendship.'},
 burgundy:{name:'Charles of Burgundy',short:'Charles',portrait:'burgundy',office:'Count of Charolais',bio:'The son of Philip the Good, raised amid the ceremonies and practical business of the Burgundian court. Pride in his honour lives alongside concern for trade, territory and his daughter Mary’s future. Family alliances must serve lands and towns with their own interests.'},
 margaretAnjou:{name:'Margaret of Anjou',short:'Margaret of Anjou',portrait:'margaret',office:'Henry VI’s queen',bio:'Henry’s wife and Edward of Westminster’s mother. Years of displacement have made her dependent on allies with interests of their own. She can be resolute, suspicious, generous to those who stayed with her, and unwilling to treat her son’s inheritance as a matter Edward may settle for her.'},
 clerk:{name:'A royal clerk',short:'The clerk',initials:'RC',office:'The king’s writing office',bio:'A fictional officer speaking for the records, petitions and obligations that accompany the royal household.'},
 captain:{name:'A household captain',short:'The captain',initials:'HC',office:'Military service',bio:'A fictional captain. His men’s loyalty depends upon wages, supplies, honour and the expectations of their families.'},
 merchant:{name:'A London merchant',short:'The merchant',initials:'LM',office:'Trade and royal credit',bio:'A fictional creditor. Merchant networks can turn royal promises into ships, provisions and coin—at a price.'},
 messenger:{name:'A royal messenger',short:'The messenger',initials:'RM',office:'News on the road',bio:'A fictional messenger carrying reports or letters. The report locates the event; it does not mean its subjects have joined Edward’s court.'},
 sheriff:{name:'A northern sheriff',short:'The sheriff',initials:'NS',office:'Royal justice in the shires',bio:'A fictional local officer. He must make a royal order work among households with their own claims and armed followers.'},
 envoy:{name:'A diplomatic envoy',short:'The envoy',initials:'DE',office:'A message from another court',bio:'A fictional intermediary reporting the interests of the foreign court named in this scene. Offers are not guarantees of future loyalty.'},
 keeper:{name:'A keeper of the household',short:'The keeper',initials:'KH',office:'Custody and provision',bio:'A fictional officer charged with the practical terms of confinement, maintenance and guarded access.'},
 petitioner:{name:'A Neville petitioner',short:'The petitioner',initials:'NP',office:'A former servant of Warwick',bio:'A fictional member of a surviving affinity. The death of a patron leaves dependants, debts and unsettled claims.'},
 chaplain:{name:'A household chaplain',short:'The chaplain',initials:'HC',office:'Prayer and conscience',bio:'A fictional priest serving Edward’s household. The sacred obligations of kingship remain present in exile as well as at Westminster.'}
};
function personAt(id,date=S.date,flags=S.flags){
 const p={...(PEOPLE[id]||PEOPLE.clerk)},year=Math.floor(date/10000);p.id=id;p.alive=true;p.status='In royal service';
 if(p.birth)p.age=Math.floor((date-p.birth)/10000);
 if(id==='edward'){p.office=date>=14701001&&date<14710411?'King in exile · House of York':'King of England · House of York';p.status='The king you inhabit';}
 if(id==='hastings'){if(date<14610628)p.office='A trusted servant of Edward';else if(date<14610726)p.office='Chamberlain of the royal household';p.status=date>=14701001&&date<14710314?'With Edward in exile':'Household service and access';}
 if(id==='elizabeth'){
  if(date<14640515){p.office='Elizabeth Grey · a widowed gentlewoman';p.status='Outside the royal household';p.bio='Born Woodville; widow of Sir John Grey, who died fighting for Lancaster in 1461. She has two sons by him. She is not Edward’s wife or queen at this date.';}
  else if(date<14650526){p.office='Edward’s wife · coronation still ahead';p.status='Married in spring 1464';}
  else if(date>=14701001&&date<14710411){p.office='Edward’s queen · in sanctuary';p.status='At Westminster, apart from Edward';}
  else p.status='A distinct royal household around the queen';
 }
 if(id==='jacquetta'){p.status=date<14640515?'The Woodville family · outside the royal household':'The queen’s mother';if(date>=14690813)p.status='Widow of Richard Woodville · the queen’s mother';}
 if(id==='warwick'){p.status=date>=14690301?'A rival affinity; negotiations and opposition':date>=14670801?'An increasingly estranged ally':'An indispensable but independent ally';if(date>=14701001)p.status='Henry VI’s government · opposing Edward';if(date>=14710414){p.alive=false;p.status='Killed at Barnet · 14 April 1471';}}
 if(id==='gloucester'){
  p.name=date<14611101?'Richard Plantagenet':'Richard, Duke of Gloucester';
  p.office=(date<14611101?'Edward’s youngest brother':'Duke of Gloucester · Edward’s brother')+' · age '+p.age;
  if(year<1469){p.status=p.age<13?'A child in Edward’s family':'A young prince learning household service';p.bio+=' He is not yet available for military or northern command.';}
  else if(date<14710522)p.status='Edward’s brother and military companion';else p.status='A growing northern affinity';
 }
 if(id==='clarence'){
  if(date<14610628){p.office='George of York · the king’s younger brother';p.short='George';}
  p.status=year<1465?'A child in the royal family':'A prince seeking independent standing';
  if(date>=14690712){p.status='Married to Isabel Neville · allied to Warwick';p.bio+=' His marriage to Warwick’s daughter Isabel took place in July 1469.';}
  if(date>=14710404)p.status='Reconciled to Edward; his ambitions remain';
 }
 if(id==='anthony'){p.office=date<14690813?'Lord Scales · the queen’s brother':'Earl Rivers · the queen’s brother';p.short=date<14690813?'Scales':'Rivers';p.status='A servant and kinsman of the Crown';}
 if(id==='margaretYork'){p.office=date<14680701?'Margaret of York · the king’s sister':'Duchess of Burgundy';p.status='A family connection to a separate court';}
 if(id==='henry'){p.status=date<14650701?'A fugitive claimant; not yet in the Tower':date<14701001?'A prisoner in the Tower':date<14710411?'Restored King of England':'Again in Edward’s custody';if(date>=14710522){p.alive=false;p.status='Died in the Tower · May 1471';}}
 if(id==='montagu'){
  p.office=date<14640527?'Lord Montagu':date<14700325?'Earl of Northumberland':'Marquess of Montagu';
  p.status=date<14700325?'Warwick’s brother · a northern household':date<14700929?'The Percy restoration has cost him an earldom':'Committed to Henry’s restoration';
  if(date>=14710414){p.alive=false;p.status='Killed at Barnet · 14 April 1471';}
 }
 if(id==='louis'){if(date>=14610722){p.name='Louis XI';p.short='Louis XI';p.office='King of France';}p.status='The French court · a separate power';}
 if(id==='burgundy'){if(date>=14670615)p.office='Duke of Burgundy';p.status=date<14680703?'The Burgundian court · a separate power':'Margaret’s husband · Edward’s brother-in-law';}
 if(id==='margaretAnjou'){p.status=date<14710504?'The Lancastrian cause · Henry’s wife and the prince’s mother':'In custody after Tewkesbury · her son is dead';}
 return p;
}
function courtAt(date=S.date,flags=S.flags){
 const at=['hastings'],elsewhere=['montagu','louis','burgundy','margaretAnjou'],family=['cecily'];
 if(date>=14701001&&date<14710411){at.push('gloucester');elsewhere.push('elizabeth','jacquetta','margaretYork','anthony','warwick','clarence','henry');}
 else{
  at.push('bourchier');
  if(date<14690301)at.push('warwick');else if(date<14710414)elsewhere.push('warwick');
  if(date>=14640515){at.push('elizabeth');family.push('jacquetta');}
  if(date>=14650526)at.push('anthony');
  if(date>=14690101&&date<14710522)at.push('gloucester');else if(date>=14710522)elsewhere.push('gloucester');else family.push('gloucester');
  if(date<14690712)family.push('clarence');else if(date<14710404)elsewhere.push('clarence');else family.push('clarence');
  if(date>=14680701)elsewhere.push('margaretYork');else family.push('margaretYork');
  if(date>=14700327)elsewhere.push('percy');
  if(date<14710522)elsewhere.push('henry');
 }
 const living=ids=>[...new Set(ids)].filter(id=>personAt(id,date,flags).alive);
 return {at:living(at),family:living(family),elsewhere:living(elsewhere)};
}
const NOTES={
 tewkesbury:['4 May 1471','Tewkesbury','Edward defeated the army accompanying Margaret of Anjou. Her son Edward, Prince of Wales, died. Together with Barnet, the victory broke the military coalition that had restored Henry VI.','Historic England','https://historicengland.org.uk/content/docs/listing/battlefields/tewkesbury/'],
 towton:['29 March 1461','Towton','Edward’s victory broke the main Lancastrian army. Henry VI and Margaret fled north; resistance continued beyond the battlefield. Edward had already been proclaimed king before the battle.','Historic England','https://historicengland.org.uk/listing/the-list/list-entry/1000040'],
 coronation:['28 June 1461','Edward’s coronation','Edward was crowned in Westminster Abbey. The coronation gave religious and ceremonial expression to a kingship still being secured through force and allegiance.','Westminster Abbey','https://www.westminster-abbey.org/abbey-commemorations/royals/edward-iv'],
 marriage:['Spring 1464','The Woodville marriage','Edward married Elizabeth Woodville privately in 1464. The exact date is debated; 1 May is traditional. She was the widow of Sir John Grey, with two sons.','Queens’ College, Cambridge','https://history.queens.cam.ac.uk/people/foundresses-and-patronesses/elizabeth-woodville'],
 elizabethCoronation:['26 May 1465','Elizabeth’s coronation','Elizabeth was crowned in Westminster Abbey in May 1465. Her marriage had made her Edward’s consort in 1464; the coronation publicly affirmed her new standing.','Westminster Abbey','https://www.westminster-abbey.org/abbey-commemorations/commemorations/elizabeth-woodville'],
 magna:['1215; reissued thereafter','Magna Carta','The 1215 charter arose from conflict between King John and rebel barons. It was annulled and reissued in later forms. In Edward’s world it furnished precedents for lawful rule, not modern parliamentary democracy.','UK Parliament','https://www.parliament.uk/magnacarta/'],
 henry:['1461–1471','Henry VI’s changing position','Henry fled after Towton, was captured in 1465 and confined in the Tower. Warwick restored him in 1470. Edward’s return in 1471 ended that restoration; Henry died in custody that May.','The Royal Family','https://www.royal.uk/henry-vi'],
 rivers:['1466–1469','Two Earls Rivers','Elizabeth’s father Richard became Earl Rivers in 1466 and was executed in August 1469. His son Anthony, previously Lord Scales, inherited the title. The two men held the same title at different dates.','Milton Keynes Heritage Association','https://www.mkheritage.org.uk/grafton/people/anthonywoodville.html'],
 burgundy:['1468–1477','The Burgundian connection','Margaret of York married Charles of Burgundy in 1468. She supported Edward during his exile. The family connection remained important while Burgundy weighed its own interests against those of France.','Richard III Society · J. L. Laynesmith','https://richardiii.net/richard-iii-his-world/his-family/margaret-duchess-of-burgundy/'],
 harlech:['August 1468','The fall of Harlech','Harlech remained a Lancastrian stronghold long after Towton. Its surrender in 1468 removed a base of resistance without extinguishing the cause its defenders had served.','Cadw','https://cadw.gov.wales/visit/places-to-visit/harlech-castle'],
 clarenceMarriage:['July 1469','Clarence and Isabel','George, Duke of Clarence, married Isabel Neville, Warwick’s elder daughter, against Edward’s wishes. The marriage joined a royal brother to the most powerful affinity challenging the king.','Richard III Society','https://richardiii.net/george-duke-of-clarence-his-brother/'],
 edgcote:['26 July 1469','Edgcote and the king’s captivity','A royal army was defeated at Edgcote during a rising linked to Warwick. Edward was subsequently held in custody. Warwick could not govern securely through captivity; Edward regained freedom without being deposed in 1469.','Historic England','https://historicengland.org.uk/listing/the-list/list-entry/1413782'],
 jacquetta:['1415/16–1472','Jacquetta of Luxembourg','Elizabeth’s mother was widowed when Richard Woodville was executed in 1469. Accused of witchcraft during the political struggle, she was cleared. She died on 30 May 1472.','CNRS · Bibale','https://bibale.irht.cnrs.fr/5979'],
 readeption:['October 1470–April 1471','The Readeption','Warwick’s alliance with Margaret of Anjou restored Henry VI. Edward fled to the Low Countries. The episode was a change of regime, not a change of advisers within Edward’s court.','The Royal Family','https://www.royal.uk/henry-vi'],
 sanctuary:['1470–1471','Westminster sanctuary','Elizabeth and her children sought sanctuary at Westminster while Edward was in exile. Abbot Thomas Millyng sheltered them. Elizabeth left sanctuary in April 1471 after Edward regained London.','Westminster Abbey','https://www.westminster-abbey.org/abbey-commemorations/commemorations/elizabeth-woodville'],
 prince:['2 November 1470','A prince born in sanctuary','Edward, the king’s son, was born within Westminster sanctuary. The birth gave the Yorkist household a male heir while his father was in exile. He was created Prince of Wales after the restoration in 1471.','Westminster Abbey','https://www.westminster-abbey.org/abbey-commemorations/royals/edward-v-richard-duke-of-york/'],
 return:['March–April 1471','Edward’s return','Edward landed at Ravenspur in March 1471 and gathered support as he advanced. Clarence rejoined his brother before the decisive battles. The return depended upon personal affinities as well as military force.','English Heritage','https://www.english-heritage.org.uk/visit/places/kirby-muxloe-castle/history-unfinished-castle/'],
 barnet:['14 April; 4 May 1471','Barnet and Tewkesbury','Warwick was killed at Barnet. At Tewkesbury, the Lancastrian army was defeated and Henry VI’s son died. These victories restored Edward’s military supremacy; surviving loyalties still had to be governed.','Historic England','https://historicengland.org.uk/listing/the-list/list-entry/1000001'],
};

// Fictional household faces share one atlas; coordinates keep each identity fixed.
const HOUSEHOLD_FACES=['clerk','captain','merchant','messenger','sheriff','envoy','keeper','petitioner','chaplain'];
for(const [i,id] of HOUSEHOLD_FACES.entries()){
 PEOPLE[id].portrait='court-faces';PEOPLE[id].portraitCell=[(i%3)*512,Math.floor(i/3)*1024/3,512,1024/3];
 PEOPLE[id].portraitSheet=[1536,1024];
}
