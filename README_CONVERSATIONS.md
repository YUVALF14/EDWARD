# The Living Court · 1.10.0

This increment builds on release 1.9.3. The active entry is still
`edward-loop-demo.html`, assembled to `index.html` by `build.py`.

Click a court portrait to enter a short, authored exchange. Twenty-two topics
cover household humour, family obligations, wounded pride, independent clients,
and Henry VI's circumstances. Each topic has two turns, persists in the existing
numeric save flags, and cannot award the same relationship change twice.
Letters and questions through a keeper wait for another royal audience before
revealing the reply. Direct conversation does not advance the historical card.

Henry cannot be interviewed while a fugitive or summoned by Edward during the
Readeption. Custody conversations are imagined, not documented meetings. Henry's
illness does not stand in for his personality. His son is not described as alive
after Tewkesbury. Historical anchors, childhood, deaths and existing saves remain
constraints. Reference: https://www.royal.uk/henry-vi and
https://www.hrp.org.uk/tower-of-london/history-and-stories/henry-vi/ .

A new reign now reaches the first audience immediately. Explanations and chapter
art remain in the menu. Later historical transitions keep their chapter folios.
The card's obsolete fixed 540px width has been removed.

The main score is the complete harp composition “Enchanted Journey” by Kevin
MacLeod, CC BY 4.0. It streams unmodified from the composer's official site,
requires a network connection, and continues through cards, profiles and letters.
Low CC0 VCSL harp strings supply the interface cues. Credits and source URLs are
in `assets/audio/ATTRIBUTION.txt` and the game's settings. This is modern
atmospheric music, not a reconstruction of a court performance.

## Checks

`npm ci` installs the test-only JSDOM dependency; the browser game has no npm
runtime dependency. `npm test` checks the campaign reserve, conversation dates,
remote delays, persistent turns, repeat guards, sound controls, actual DOM click
handlers and complete campaigns under three decision policies. The DOM check
uses mock media and is not a browser rendering or listening test.

`python3 build.py` checks and hashes every local runtime asset. The streaming
music is credited separately and is not represented as an offline local asset.

Physical iPhone Safari and listening impressions remain a separate playtest.
Further work should make selected private exchanges feed later interpersonal
scenes, rather than multiply interchangeable conversation topics.


## 1.10.1 — clear choices and the character of the reign

Heard testimony now refines a copied scene. It never appends into the authored
reserve, so repeated renders, profiles and save validation cannot multiply an
answer. Similar hearing answers replace the corresponding original response;
all ten hearings retain two or three distinct choices. Existing selected answers
remain valid in saves.

The court identifies Richard Plantagenet as Edward’s brother and computes his
age from 2 October 1452. His childhood illustration ends at thirteen, followed
by the existing youthful portrait and a transitional conversation before adult
command. The stray caption below the court is removed; an actual previous
charge is kept within Richard’s own profile.

John Neville, Louis XI, Charles of Burgundy and Margaret of Anjou join the outer
court with existing artwork. Titles, deaths and letters follow date boundaries.
New letters are reconstructed dialogue, never asserted surviving quotations.
They wait for the next audience; selected answers enter later political contexts.
Richard’s childhood and title: Westminster Abbey and Richard III Society media
kit; John Neville’s titles and Barnet: James Tait, Dictionary of National Biography,
“Neville, John (d.1471)”; Margaret’s final campaign: Historic England’s
Tewkesbury battlefield report; French/Burgundian context: the Society’s Wars of
the Roses chronology and Château d’Amboise’s account of Louis XI.

“The character of your rule” reads decisions, promises, resources, order and
competing affinities already in the saved reign. It gives grounded observations
about conscience, means and the craft of rule, citing an actual decision. It is
available within the household record and at the ending; loop recaps consider
the means left behind. It adds no morality meter, rewards or player diagnosis.

All enabled buttons now have interface feedback. Existing decision/open/close
cues take precedence over a single fallback tap. The first cold tap waits briefly
for recorded samples instead of being discarded. Harp feedback is 8 dB stronger;
the continuous composition and its music volume are unchanged. Interface mute
remains independent.

`npm test` includes the repeated-hearing regression, all ten hearing answer sets,
DOM cue counts, dated identities and foreign letters, grounded judgments, saves,
and three complete alternative campaigns. DOM media is mocked; physical iPhone
Safari, speaker balance and touch feel remain separate live playtests.


## 1.10.2 — Edward’s answer

Audience buttons show only the action or Edward’s spoken reply. Descriptions
and predicted stat effects are no longer rendered below them or exposed in a
button’s accessible name. Seven opening, marriage and diplomatic answers have
short reconstructed spoken lines. The established action text remains the
chronicle entry and save identity, preserving existing saves. Actual effects,
requirements and consequences are unchanged. Button spacing is reduced while
retaining 60px desktop and 64px mobile touch targets.
