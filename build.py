from pathlib import Path
p=Path(__file__).parent
s=(p/'index.template.html').read_text().replace('__ATMOSPHERE_CSS__',(p/'atmosphere.css').read_text()).replace('__FOCUS_CSS__',(p/'focus.css').read_text()).replace('__HOME_CSS__',(p/'home.css').read_text()).replace('__SCENE_ART_CSS__',(p/'scene_art.css').read_text())
s=s.replace('__COURT_CSS__',(p/'court.css').read_text())
for tag,filename in [('__DATA_JS__','data.js'),('__REACTIVE_JS__','reactive.js'),('__EMERGENT_JS__','emergent.js'),('__SANDBOX_JS__','sandbox.js'),('__DEEPWORLD_JS__','deepworld.js'),('__NARRATIVE_JS__','narrative.js'),('__STORY_SCENES_JS__','story_scenes.js'),('__STORY_CROSSOVERS_JS__','story_crossovers.js'),('__STORY_ENGINE_JS__','story_engine.js'),('__DELAYED_JS__','delayed.js'),('__ENGINE_JS__','engine.js'),('__UI_JS__','ui.js'),('__MAP_DATA_JS__','map_data.js'),('__EXTRAS_JS__','extras.js'),('__STORY_UI_JS__','story_ui.js'),('__FOCUS_JS__','focus.js'),('__ARTWORK_JS__','artwork.js'),('__HOME_JS__','home.js'),('__WORLD_PRESSURE_JS__','world_pressure.js'),('__HISTORICAL_WORLD_JS__','historical_world.js'),('__SUBSTANCE_JS__','substance.js'),('__SCENE_ART_JS__','scene_art.js'),('__INTEGRATION_JS__','integration.js'),('__LIVING_COURT_JS__','living_court.js'),('__COURT_UI_JS__','court_ui.js')]:
 s=s.replace(tag,(p/filename).read_text())
(p/'index.html').write_text(s)
print('Built',p/'index.html',len(s),'bytes')
