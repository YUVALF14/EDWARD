/* Authored, reconstructed exchanges. These are not historical quotations.
   Conversations use existing numeric flags, so older campaign saves need no reset. */
const courtReply=(line,answer,rel={},set={})=>({line,answer,rel,set});
const courtBeat=(quote,replies)=>({quote,replies});
const courtTalk=(id,person,from,to,title,setting,beats)=>({id,person,from,to,title,setting,beats});
const COURT_TALKS=[
 courtTalk('hastings-companion','hastings',14610101,14650101,'The supper you missed','Hastings has taken off his formal gown. There is a wine stain on the cuff.',[
  courtBeat('You promised supper. I told the cook you had been detained by affairs of state. He said the affairs of state could eat it cold.',[
   courtReply('Then sit. We will both disappoint him together.','He laughs and draws up a stool. For a moment he speaks about a horse he cannot sell, rather than a man he hopes to place.',{hastings:1}),
   courtReply('You might have sent a reminder.','“To the chamberlain, or to my friend?” He says it lightly, but waits for you to answer.')]),
  courtBeat('There is a man of mine asking for an office. I think him able. I also know him better than the other candidates.',[
   courtReply('Bring his name. I will hear the others too.','“Fair enough. Let him win it without borrowing my face.” He stays for supper.',{hastings:1},{'personal:hastingsHearing':1}),
   courtReply('Tonight, leave the office outside the door.','He sets the folded paper aside. “Gladly. You can be a difficult man to dine with.”')])]),
 courtTalk('hastings-distance','hastings',14650101,14830101,'A friend at the door','Hastings has spent the morning separating two servants’ accounts of the same quarrel.',[
  courtBeat('The queen’s man thinks I dislike him. I dislike being told I have already agreed to his request. There is a difference.',[
   courtReply('Tell me what he actually asked.','“A place for his cousin. A small place, until someone else has to give it up.” He is irritated, and aware that he is not innocent of the habit.'),
   courtReply('You have cousins too, William.','“Yes. Mine are exceptionally deserving.” His smile returns before his defence does.',{hastings:1})]),
  courtBeat('Must I always come to you through the chamberlain’s door?',[
   courtReply('Come as my friend when you need to.','He nods without making a ceremony of it. You have offered access, not agreement.',{hastings:1}),
   courtReply('Some days I need you to be the chamberlain.','“Then tell me which days. Do not make me guess at the latch.”')])]),
 courtTalk('warwick-table','warwick',14610101,14650101,'Another household’s table','Warwick is reading a letter from his own steward. Your business is not the only business before him.',[
  courtBeat('George asked to sit with my men. He likes their stories better than his lessons. I was much the same, though I shall deny it before his tutor.',[
   courtReply('Keep him away from your worst storytellers.','“Then he would have to dine alone.” Warwick folds the letter, amused.'),
   courtReply('I would rather he learned from men who served us.','“Let him learn what service costs them as well.” He is pleased by the trust.',{warwick:1})]),
  courtBeat('My steward says one widow has waited three weeks for an answer. I have answered three ambassadors in that time.',[
   courtReply('Write to her before we continue.','He looks at you, then reaches for the pen. The king’s papers wait a little.',{warwick:1}),
   courtReply('We both have more callers than hours.','“A useful defence. I fear she has heard it already.” He keeps the letter on top of his papers.')])]),
 courtTalk('warwick-pride','warwick',14650101,14710414,'The names omitted','Warwick’s courtesy is exact. He has had time to rehearse it.',[
  courtBeat('I heard of the appointment at dinner. The man beside me assumed I had advised it. I was obliged to explain that I had not.',[
   courtReply('I should have told you myself.','“Yes.” He lets the word stand. An apology does not restore an office, but he has heard it.',{warwick:1}),
   courtReply('I cannot ask your leave for every appointment.','“Nor did I ask you to. You are very quick to hear a command where I offer a grievance.”',{warwick:-1})]),
  courtBeat('My brother says I take these things too much to heart. He is seldom the man left explaining them.',[
   courtReply('Tell me which part of the settlement you can still defend.','He names a limited point of agreement. It is less than friendship and more than a refusal.',{warwick:1}),
   courtReply('Let us leave the appointments until tomorrow.','“Tomorrow, then.” He does not mistake a pause for a settlement.')])]),
 courtTalk('elizabeth-room','elizabeth',14640515,14701001,'A room of her own','Elizabeth has a small pile of family letters beside the household accounts.',[
  courtBeat('My mother wants an answer, my brother wants an introduction, and my son wants to know whether you will come and see his dog. Only one of them has asked twice.',[
   courtReply('The dog first. He has the strongest claim.','She laughs. “I shall inform my mother that she has been outranked.”',{woodville:1}),
   courtReply('Which request is troubling you?','“The introduction. Anthony can serve, but I am tired of every kindness becoming evidence against us.”')]),
  courtBeat('I can love you and still think you have handled my family badly.',[
   courtReply('Then tell me as my wife, before anyone tells me as king.','She takes your hand, then tells you plainly. The account is not wholly flattering.',{woodville:1}),
   courtReply('And I can love you without granting every request.','“Of course. But answer the request I make, not the one you fear my brothers will make.”')])]),
 courtTalk('elizabeth-sanctuary','elizabeth',14701001,14710411,'A household behind sanctuary walls','A guarded letter can reach Westminster. No messenger can promise when an answer will return.',[
  courtBeat('The children have learned which footsteps belong to the abbot. They run to the door as though every visitor carries you inside his cloak.',[
   courtReply('Tell them I remember their games. Tell me yours.','Her reply describes a small argument over a wooden animal. She has spared you neither the silliness nor the pleasure.',{woodville:1}),
   courtReply('Tell me what the household is short of.','She names fuel, cloth and dependable news. Then, at the foot of the page, she asks whether you are sleeping.')]),
  courtBeat('Do not send only promises of victory. Send something I can read to them tonight.',[
   courtReply('Write a story from when you were children together.','The next packet is addressed to the children in your own words. Elizabeth keeps the sheet after she reads it.',{woodville:1}),
   courtReply('Tell her plainly that you are afraid too.','Her answer is brief: “I know. You need not be king in every line.”')])]),
 courtTalk('elizabeth-return','elizabeth',14710411,14830101,'After the doors open','Elizabeth is sorting what the household carried into sanctuary and what it left behind.',[
  courtBeat('They keep asking how we endured it. Yesterday someone wanted the tale while I was trying to settle two children and a missing sleeve.',[
   courtReply('Then today nobody will ask you for the tale.','“You may have to tell the chamberlain that twice.” She passes you the small garment.',{woodville:1}),
   courtReply('I would like to hear it, when you are ready.','She nods. “Not all of it will be about waiting for you.”')]),
  courtBeat('Some of the people who kept us have no place in your victory speeches.',[
   courtReply('Give me their names, and what they actually did.','She remembers a cook, an attendant and a man who brought fuel without asking who would pay.',{woodville:1},{'personal:sanctuaryNames':1}),
   courtReply('Let us thank them in the household first.','She approves of the smaller room. “They will know whether we mean it.”')])]),
 courtTalk('george-child','clarence',14610101,14650101,'An elder brother’s horse','George has been watching the horses being brought out.',[
  courtBeat('They say yours is too much horse for me. They said it before I had even put my hand on the bridle.',[
   courtReply('They say it about me as well. Walk with me.','He is delighted until he suspects you are teasing him. Then he laughs anyway.',{clarence:1}),
   courtReply('Perhaps you should listen to the groom.','“I did listen. I wanted him to listen back.” He keeps looking at the horse.')]),
  courtBeat('When you are finished being king, will you come and watch me ride?',[
   courtReply('I can watch before the next audience.','He calls for the groom at once, before another petitioner can find you.',{clarence:1}),
   courtReply('Not today. I will not promise what I cannot keep.','“You always have another day waiting.” He goes to the groom without you.')])]),
 courtTalk('george-standing','clarence',14650101,14710404,'A place that is his','George has been charming to everyone at supper. Alone, he looks tired of it.',[
  courtBeat('Richard is praised for saying little. I am told I speak too much. It must be a comfort to discover virtue in whatever your brother happens to do.',[
   courtReply('You are not Richard. Tell me what you want.','“A charge that is mine. Men who need not ask whether I speak for you.”',{clarence:1}),
   courtReply('I hear ambition more clearly than injury.','“You have the better seat for distinguishing them.” The charm goes out of his voice.',{clarence:-1})]),
  courtBeat('Would you trust me if Warwick had never taken an interest in me?',[
   courtReply('I would still ask you to answer for your own men.','He looks displeased, then relieved to have something definite to dispute.',{clarence:1}),
   courtReply('I would find it easier. That is the truth.','“Then at least we have stopped speaking about Richard.” He does not thank you for the answer.')])]),
 courtTalk('george-return','clarence',14710404,14830101,'Brothers after the bargain','George has returned. Neither of you has found an easy way to be alone together.',[
  courtBeat('Everyone watches us embrace. Nobody wishes to be in the room afterwards.',[
   courtReply('Stay. There is no audience here to applaud us.','He sits down slowly. “That is what makes it difficult.”',{clarence:1}),
   courtReply('We have both given them reason to watch.','“Yes.” He does not try to make the fault equal.')]),
  courtBeat('I cannot promise never to resent you. I can answer for what I do.',[
   courtReply('Then begin with the men who followed you.','He names them individually. Reconciliation acquires people and obligations.',{clarence:1}),
   courtReply('Tonight I would rather have my brother at supper.','He agrees, awkwardly. Supper settles nothing, but it happens.')])]),
 courtTalk('richard-child','gloucester',14610101,14651002,'What the boy notices','Richard has a book open, though he has been listening to the men outside.',[
  courtBeat('The captain says the horse belongs to the king. The groom says it belongs to him until somebody feeds it. Which one is right?',[
   courtReply('The groom, until somebody feeds it.','Richard smiles as though you have confirmed a suspicion he did not dare voice.'),
   courtReply('Both. That is why they are arguing.','He considers that answer, then asks whether it helps the horse.')]),
  courtBeat('Will you come and see the new foal? George says you will be too busy.',[
   courtReply('Show me.','He shuts the book carefully, marking his place before he runs ahead.'),
   courtReply('Tell me about it while I finish this letter.','He does, with surprising precision. You have to ask him twice about the colour.')])]),
 courtTalk('richard-learning','gloucester',14651002,14690101,'Waiting to be useful','Richard has stayed after the older men have left. He has a question he would not ask in front of them.',[
  courtBeat('They tell me to listen. When I ask how an order is carried out, they tell me to wait until I have a command.',[
   courtReply('Sit with the clerk who has to write it.','He asks which clerk, and whether the man will be told he may correct him.',{}, {'personal:richardLearning':1}),
   courtReply('Come with me when the officers report.','He is pleased, then tries to conceal it. He asks if he may question them afterwards.',{}, {'personal:richardLearning':2})]),
  courtBeat('George says you trust me because I make fewer demands. I do have demands. I am slower at saying them.',[
   courtReply('Then take your time. I am listening.','He begins with a small request for his own attendant. The speech he prepared is soon forgotten.'),
   courtReply('Write them down if that is easier.','He says that will make them look like a petition. After a pause, he asks for paper.')])]),
 courtTalk('richard-command','gloucester',14690101,14830101,'A name beneath the order','Richard has been checking an account himself. The clerk has corrected two of his figures.',[
  courtBeat('Hastings says I should let the clerks earn their wages. I think he means I should let them tell me when I am wrong.',[
   courtReply('He has had plenty of practice with me.','Richard’s smile is brief, but unguarded.',{gloucester:1}),
   courtReply('What did they find?','“A payment entered twice. Mine was the first signature.” He has not crossed his name out.')]),
  courtBeat('If you give me a charge, let the men know where my authority ends. I do not want to discover it in front of them.',[
   courtReply('I will set the limits with you before the order goes out.','He asks a precise question about appeal to the king. His loyalty does not prevent him wanting a workable command.',{gloucester:1},{'personal:richardLimits':1}),
   courtReply('You must learn to judge the limits yourself.','“Then allow me to make a mistake without calling it disobedience.”')])]),
 courtTalk('cecily-family','cecily',14610101,14830101,'Your mother’s names','Cecily’s attendant has put aside a place for you, without asking how long you can stay.',[
  courtBeat('I hear how my sons are spoken of. The king, the duke, the younger brother. I knew all three before anyone needed those distinctions.',[
   courtReply('What do you hear that nobody tells me?','“George wants to be wanted. Richard wants to be useful. You want them to understand how much you carry.” She leaves you to consider the last part.'),
   courtReply('You make it sound as though we are still children.','“Only when you insist on proving it.” She pours for you before you can answer.')]),
  courtBeat('Margaret wrote about a servant’s illness before she wrote about Burgundy. I thought you should know that.',[
   courtReply('Tell me about the servant.','Cecily remembers the woman’s family. The conversation takes a direction no envoy would have chosen.'),
   courtReply('I ought to send Margaret a letter of my own.','“Then send one with something in it besides a request.”',{}, {'personal:motherLetter':1})])]),
 courtTalk('jacquetta-family','jacquetta',14640515,14830101,'What a mother keeps','Jacquetta has kept a letter that the rest of the household considers settled business.',[
  courtBeat('Elizabeth says you remember every face in a room. Do you remember them when the room is empty?',[
   courtReply('Some of them more clearly then.','She studies your answer, then tells you about an old servant who has asked to leave.'),
   courtReply('That sounds like a question with a name attached.','“It has several. I shall begin with the one who cannot ask you himself.”')]),
  courtBeat('He wishes to go home before his wife grows too ill to know him. He is afraid that asking will look like desertion.',[
   courtReply('Let him leave with thanks and his wages.','Jacquetta says she will tell him herself. This kindness will first belong to his wife.'),
   courtReply('Find someone to take his duties, then release him.','She accepts the condition. “I will not let the search become an excuse to keep him.”')])]),
 courtTalk('anthony-reading','anthony',14650526,14830101,'The unfinished page','Anthony has brought a book and no request for an office.',[
  courtBeat('My sister says I leave books in every chamber. I tell her it is an inexpensive way of claiming territory.',[
   courtReply('Then I should confiscate this one before you advance.','“Read it first. You may surrender the chamber willingly.”'),
   courtReply('What has kept you reading?','He shows you a passage about obligation. His interest is real; so is his pleasure in explaining it.')]),
  courtBeat('Would you have me read a little, or have you had enough counsel for one evening?',[
   courtReply('Read. Leave the lesson for me to find.','He begins again at the top of the page, more quietly.'),
   courtReply('Tell me something you disagreed with in it.','That pleases him more than your praise would have done.')])]),
 courtTalk('margaret-before','margaretYork',14610101,14680701,'The last easy supper','Margaret is choosing what to take when the household next moves.',[
  courtBeat('My brothers can travel with an army and call it necessity. If I want another chest, everyone discovers the weight of things.',[
   courtReply('I shall ask the captain to weigh George’s vanity.','“There is not a cart in England equal to it.” She laughs before asking you not to repeat her.'),
   courtReply('Which things would you least like to leave?','She names a familiar book, a small piece of household silver, and a woman who has served her for years.')]),
  courtBeat('When they speak of a marriage for me, remember there will be people on both sides of it.',[
   courtReply('Tell me whom you would want beside you.','She gives you names. An alliance begins to acquire a household.'),
   courtReply('I cannot promise you will like every part of it.','“Then promise you will hear which parts I do not.”')])]),
 courtTalk('margaret-burgundy','margaretYork',14680701,14830101,'A sister across the water','Margaret’s letter has passed through another household’s hands before reaching yours.',[
  courtBeat('Charles asks what England intends. I ask whether my brothers are well. Your last letter answered his question very handsomely.',[
   courtReply('Then this answer is for my sister.','She replies with family questions too pointed for a council secretary to have written.'),
   courtReply('Tell Charles I cannot bind England to every quarrel.','Her reply is courteous: “He will not bind his lands to all of yours either. Now, about George?”')]),
  courtBeat('I can speak for you here. I cannot make my husband’s interests disappear.',[
   courtReply('Tell me where his consent ends.','She gives you a boundary rather than a comforting assurance.',{}, {'personal:burgundyLimits':1}),
   courtReply('For once, send me news that asks for nothing.','The next sheet describes a household celebration and a quarrel over seating. You can hear her amusement through the careful handwriting.')])]),
 courtTalk('bourchier-hush','bourchier',14610101,14830101,'A quieter obligation','The archbishop has dismissed the clerk who came with him.',[
  courtBeat('You have heard many men promise to die for you. Fewer will sit patiently while you consider an answer.',[
   courtReply('You appear to have volunteered.','“For a little while. My own petitioners are less patient than I sound.”'),
   courtReply('Is there a petition hidden in that observation?','“There usually is. Today I thought you might prefer a moment without it.”')]),
  courtBeat('Shall we keep a little silence before the next man comes in?',[
   courtReply('Yes. Stay.','He says nothing further. The silence is not a test.'),
   courtReply('Not today. Tell me how the chapel fares.','He tells you of a singer losing his voice. It is an ordinary worry, and he treats it seriously.')])]),
 courtTalk('percy-name','percy',14700301,14830101,'A name in the North','Percy’s message is formal, with a personal addition below the signature.',[
  courtBeat('Men in the North remember who stood beside their fathers. A new patent does not teach them to forget.',[
   courtReply('Nor does it settle what their sons owe each other.','He agrees to name a local grievance rather than speak of loyalty in general.'),
   courtReply('Tell me whose memory is obstructing whose claim.','His answer contains two names. Neither belongs to a man easily dismissed.')]),
  courtBeat('Your brother has his following. I have mine. We shall have to meet after your messenger has gone.',[
   courtReply('Then give each other terms you can keep without me.','The next account is less flattering to either household, and more useful.',{}, {'personal:northernTerms':1}),
   courtReply('Send both accounts to the same hearing.','He accepts the hearing. Acceptance is not affection.')])]),
 courtTalk('henry-captive','henry',14650701,14701001,'The book by the window','Henry’s keeper describes a service book with a damaged binding. A guarded exchange is possible; freedom is not.',[
  courtBeat('They have left me the book. One of the leaves is loose. I keep putting it back in the wrong place.',[
   courtReply('Have the binding mended, and bring what he needs to read.','Henry thanks the person carrying the book before he thanks you.',{}, {'personal:henryBooks':1}),
   courtReply('Ask whether he is being properly served.','He names an attendant who has been patient with him. “He is afraid to ask for his wages. That is not a fault of his.”'),
   courtReply('The guards remain. Make that plain.','“I hear them every morning. You need not make them louder.”')]),
  courtBeat('May I receive news of my wife and my son? I do not ask you to call him what I call him.',[
   courtReply('Permit personal letters, read by the keeper.','The keeper receives a narrow instruction: family news may pass under inspection. It grants no political correspondence.',{}, {'personal:henryLetters':1}),
   courtReply('Only news brought through the chaplain.','A controlled channel is named. Henry asks the chaplain to remember the question.',{}, {'personal:henryLetters':2})])]),
 courtTalk('henry-return','henry',14710411,14710504,'A son beyond the walls','Henry is again in custody. His son and Margaret still have an army in the field.',[
  courtBeat('Your men ask whether I shall command them. I have no men here. I have asked for news of my son.',[
   courtReply('Tell him what is known, without promising safety.','Henry listens to the account and asks which parts the messenger has seen himself.'),
   courtReply('He is still in the field. I can promise nothing.','“Neither can I.” He does not offer the renunciation your servants hope to hear.')]),
  courtBeat('Leave me someone who will answer a plain question plainly.',[
   courtReply('Name a chaplain and a keeper responsible for his care.','The officers receive their duties in writing. Kindness now has people who must carry it out.',{}, {'personal:henryCare':1}),
   courtReply('Keep his care within the existing watch.','The keeper remains answerable for the room, the food and what news is allowed through.',{}, {'personal:henryCare':2})])]),
 courtTalk('french-security','louis',14610722,14710523,'What the seal promises','A French secretary’s packet offers a channel for correspondence. The words attributed to Louis have passed through his officers.',[
  courtBeat('My merchants ask whether their goods will reach the other shore. Your lords ask what I intend. I can answer the merchants more precisely.',[
   courtReply('Begin with safe conduct for merchants and their goods.','The secretary returns a narrow draft with named ports. A small agreement can be checked.',{}, {'personal:frenchTerms':1}),
   courtReply('First name the Englishmen with whom your court is negotiating.','The answer gives offices, not confidences. Louis has kept the channel open and the names to himself.',{}, {'personal:frenchTerms':2})]),
  courtBeat('A letter may reach a king before his ministers have decided whether he ought to receive it.',[
   courtReply('Keep a named messenger on this route.','The secretary asks who will meet him and who may break the seal. The channel now depends on particular servants.'),
   courtReply('Let the formal embassy carry the answer.','The packet returns through the embassy. More people see the terms; fewer can claim a private understanding.')])]),
 courtTalk('burgundy-security','burgundy',14670615,14710523,'His own inheritance','A Burgundian officer carries Charles’s answer. Ceremony surrounds a practical question about ships, credit and security.',[
  courtBeat('A merchant who lends to an English king still has to answer to his partners. My favour cannot make his losses disappear.',[
   courtReply('Name what security your merchants would accept.','The next sheet separates a private loan from a ducal undertaking. Charles has made no gift of his treasury.',{}, {'personal:burgundySecurity':1}),
   courtReply('Ask what your friendship is worth in practical aid.','The officer returns a carefully limited offer. Charles wishes to be seen helping on terms he can defend.',{}, {'personal:burgundySecurity':2})]),
  courtBeat('I have a daughter whose inheritance must survive my quarrels. You will understand why I cannot spend every advantage on yours.',[
   courtReply('Then let us agree where our interests meet.','The answer is shorter and more useful. His family’s future remains his responsibility.'),
   courtReply('A useful ally must sometimes accept a risk.','The officer copies that sentence accurately. The next reply asks what risk Edward will accept in return.')])]),
 courtTalk('montagu-service','montagu',14610401,14700929,'A brother’s own men','John Neville’s letter comes from his own household. Warwick has neither signed it nor sent an explanation.',[
  courtBeat('My brother will tell you what the North requires. I can tell you which men are still waiting for the wages of the last requirement.',[
   courtReply('Send their names and the sums still owed.','He supplies a short account. These men now have a claim in their own names, beyond Warwick’s general request.',{}, {'personal:montaguNames':1}),
   courtReply('Let Warwick bring both accounts together.','John agrees to send the papers. At the foot of the page he asks that his own signature remain on them.',{}, {'personal:montaguNames':2})]),
  courtBeat('When my children hear of service, they hear of honour. My steward hears of another winter’s provision.',[
   courtReply('Tell me what your household can actually sustain.','He gives a smaller figure than the one expected of his name. It is a useful answer and an uncomfortable one.'),
   courtReply('I need the strength already promised.','He does not withdraw the promise. His next letter gives you the costs beside it.')])]),
 courtTalk('anjou-households','margaretAnjou',14610401,14710504,'The people she carries','An intermediary brings a message from Margaret’s party. He can carry an answer about dependants; he has no authority to settle the crown.',[
  courtBeat('There are women and children travelling under names your officers call treason. A child does not choose the badge on his father’s sleeve.',[
   courtReply('Offer named dependants safe conduct without an oath.','The intermediary asks for the names of the officers who must honour it. Margaret’s people will judge the passage, not the courtesy of your answer.',{}, {'personal:anjouHouseholds':1}),
   courtReply('Ask for the names before offering any passage.','A guarded list returns. Several families do not wish their whereabouts entered in a Yorkist account.',{}, {'personal:anjouHouseholds':2})]),
  courtBeat('Do not ask me to call my son’s inheritance a favour in your gift.',[
   courtReply('Keep the question of passage separate from his claim.','Her answer accepts the distinction for this business. Her son’s claim remains exactly where it was.'),
   courtReply('There will be no settlement without recognition of my crown.','The intermediary can take that answer back. He cannot bring you her submission.')])]),
 courtTalk('henry-lastnews','henry',14710504,14710522,'News no one brings','After Tewkesbury, the keeper’s report is brief. Henry’s son is dead. The men at the door are waiting for someone else to carry the news.',[
  courtBeat('He has asked again. Each officer thinks the telling belongs to another man.',[
   courtReply('Have the chaplain tell him, and remain with him.','The order names who must stay after the words are spoken. The report that returns is about a father, not a claimant.',{}, {'personal:henryTruth':1}),
   courtReply('Tell the keeper to find a private, truthful way.','The keeper can no longer pass the task to the next watch. He asks the chaplain to go with him.',{}, {'personal:henryTruth':2})]),
  courtBeat('Later, the keeper reports that Henry has asked for quiet. There is no further request for Edward to answer.',[
   courtReply('Leave him that quiet.','The report is folded away. Nothing about the succession has become simpler.'),
   courtReply('Ask the chaplain to remain within call.','The chaplain waits beyond the room. There is no royal audience to witness it.')])])
];
function conversationAt(id,v,place=''){
 const p=personAt(id,v.date,v.flags),f=v.flags||{};
 if(!p.alive||v.ended)return {available:false,notice:'There can be no further exchange. What passed between you belongs to the reign’s memory.'};
 if(id==='henry'&&v.date<14650701)return {available:false,notice:'Henry is beyond your household’s reach. Reports can find you; a private conversation cannot yet be arranged.'};
 if(id==='henry'&&v.date>=14701001&&v.date<14710411)return {available:false,notice:'Henry has been restored in England while you are outside its government. His proclamations reach you through reports; his household does not answer to you.'};
 const c=COURT_TALKS.find(t=>t.person===id&&v.date>=t.from&&v.date<t.to);
 if(!c)return {available:false,notice:'Their present business is in the audience before you. There is no private exchange to add just now.'};
 const away=courtAt(v.date,f).elsewhere.includes(id)||(v.date>=14701001&&v.date<14710411&&!['hastings','gloucester'].includes(id));
 const mode=id==='henry'?(['London','Westminster'].includes(place)?'custody':'keeper'):away?'letter':'private';
 const prefix='talk:'+c.id+':';let stage=0;const transcript=[];
 for(const [i,b] of c.beats.entries()){
  const chosen=f[prefix+i];if(!Number.isInteger(chosen)||!b.replies[chosen-1])break;
  transcript.push({quote:b.quote,...b.replies[chosen-1]});stage++;
 }
 const pending=Number.isInteger(f[prefix+'sent'])&&f[prefix+'sent']>=(v.log||[]).length;
 let memory='';
 if(id==='henry'&&c.id!=='henry-captive'&&f['personal:henryBooks']===1)memory='The keeper still lists the repaired service book among Henry’s few possessions.';
 if(id==='elizabeth'&&c.id==='elizabeth-return'&&f['talk:elizabeth-sanctuary:0'])memory='One of the letters you sent into sanctuary has been kept with her papers.';
 if(id==='gloucester'&&c.id==='richard-command'&&f['talk:richard-child:0'])memory='For a moment you remember the boy who asked who would feed the king’s horse.';
 if(id==='gloucester'&&c.id==='richard-command'&&f['personal:richardLearning'])memory='You remember the younger Richard asking how an order was actually carried out. He is now responsible for answers of his own.';
 return {...c,available:true,mode,prefix,stage,transcript,pending,complete:stage===c.beats.length,memory};
}
function answerConversation(id,index,v,place=''){
 const c=conversationAt(id,v,place);if(!c.available||c.pending||c.complete)return false;
 const r=c.beats[c.stage].replies[index];if(!r)return false;
 v.flags[c.prefix+c.stage]=index+1;
 for(const [key,n] of Object.entries(r.rel))if(Number.isFinite(v[key]))v[key]=Math.max(-60,Math.min(60,v[key]+n));
 Object.assign(v.flags,r.set);
 if(c.mode==='letter'||c.mode==='keeper')v.flags[c.prefix+'sent']=(v.log||[]).length;
 return true;
}
