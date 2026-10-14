extends Control

const INK := Color("#25251f")
const VELLUM := Color("#eadcc0")
const VELLUM_DARK := Color("#d8c7a2")
const RED := Color("#793b37")
const GOLD := Color("#b79a60")
const FOREST := Color("#202620")
const MUTED := Color("#bdb5a1")
const SAMPLE_RATE := 22050
const INTRO_PAGES := [
	{"heading":"The Crown After Towton", "body":"In March 1461, Edward of York won the crown on the bloodiest field of the Wars of the Roses. Victory gave him a title. It did not settle who would obey him, or what the crown owed the men who had won it."},
	{"heading":"A court is a balance of claims", "body":"Warwick can lend the king armies, offices and standing. The queen’s household can bind the dynasty to new kin. The Church, inheritance and royal power give the crown different kinds of meaning. Each alliance strengthens one claim and changes the others."},
	{"heading":"The court remembers", "body":"This is a study of rule through a repeating cycle of twenty decisions. The court carries earlier choices forward and reads them as precedent. In 1469 Edward may be challenged or deposed, but neither outcome is fixed. If he reaches 1483, his reign ends with his death."}
]
const PERIODS := [
	{"year":1461,"name":"The Crown After Towton","context":"The crown is won; the terms of rule remain open."},
	{"year":1465,"name":"A Court Takes Shape","context":"Marriage and offices draw new households into the king’s circle."},
	{"year":1469,"name":"The King Under Guard","context":"Warwick’s challenge gathers force. Edward’s fate remains unsettled."},
	{"year":1470,"name":"The Crown in Exile","context":"The balance turns; old loyalties acquire new costs."},
	{"year":1471,"name":"The Return of the King","context":"Edward returns to England with a claim that must be made real."},
	{"year":1475,"name":"The Price of Rule","context":"Victory has bought time. The settlement still requires care."},
	{"year":1483,"name":"The Last Inheritance","context":"The succession comes into view."}
]
const DECK := [
	{"title":"The Crown After Towton","speaker":"Richard Neville · Earl of Warwick","quote":"The field is yours. The northern roads are not. Give me men and I can pursue Henry’s party before it gathers strength.","context":"Warwick offers the speed of a powerful ally. The army is weary; pursuit costs coin and allegiance.","choices":[
		{"label":"Pursue Henry while the road is open","line":"Use Warwick’s strength now; the army and treasury bear the cost.","effect":{"authority":1,"order":-4,"warwick":8,"treasury":-5},"record":"Warwick leads the northern pursuit."},
		{"label":"Gather the army before moving north","line":"Protect the Crown’s command; give the fugitives time.","effect":{"authority":3,"order":5,"warwick":-2,"treasury":-2},"record":"The royal army is gathered before it moves."},
		{"label":"Send a smaller force under a royal captain","line":"Share the risk and keep the decision in Edward’s name.","effect":{"authority":2,"order":1,"warwick":2,"treasury":-3},"record":"A royal captain receives a limited commission."}]},
	{"title":"The Cost of Loyalty","speaker":"A captain from the shires","quote":"The men ask what their service earns. Land, wages and pardon cannot all be promised without limit.","context":"Rewards secure support now and create claims the Crown must answer later.","choices":[
		{"label":"Bind the answer to council and record","line":"Share responsibility; make a precedent.","effect":{"authority":2,"order":3,"succession":2,"warwick":1},"record":"Council witnesses the settlement of military claims."},
		{"label":"Decide directly in the king’s name","line":"Strengthen royal authority; concentrate blame.","effect":{"authority":6,"order":-2,"warwick":-2,"power":4},"record":"Edward answers the captains in his own name."},
		{"label":"Defer and hear another account","line":"Reduce immediate risk; delay can become grievance.","effect":{"authority":-2,"order":-3,"warwick":-1,"open_promises":1},"record":"The captains wait for a further hearing."}]},
	{"title":"A Queen’s Household","speaker":"Elizabeth Woodville · Queen of England","quote":"My kin ask for offices at court. They have served the Crown; your old friends say each place has already been promised.","context":"Royal marriage joins families to the dynasty. Office and access decide who can turn kinship into power.","choices":[
		{"label":"Admit the queen’s kin to measured offices","line":"Strengthen the royal household; unsettle Warwick’s affinity.","effect":{"woodville":8,"warwick":-3,"order":-1,"marriage":5},"record":"The queen’s household receives measured access to office."},
		{"label":"Keep the established servants in place","line":"Protect existing bonds; leave the queen’s kin outside power.","effect":{"warwick":5,"woodville":-5,"order":1},"record":"Existing servants retain their places."},
		{"label":"Divide offices and require joint service","line":"Make rival households answer to shared duties.","effect":{"warwick":2,"woodville":2,"order":4,"authority":1},"record":"Two households share a royal commission."}]},
	{"title":"A Warning from the North","speaker":"A royal clerk","quote":"Reports name armed gatherings and unpaid men. The letters disagree about who gave the first order.","context":"A swift accusation may restore obedience. A careful inquiry may preserve a useful lord.","choices":[
		{"label":"Send royal officers to investigate","line":"Establish the facts; risk appearing uncertain.","effect":{"authority":1,"order":3,"warwick":-1},"record":"Royal officers begin a formal inquiry."},
		{"label":"Summon the named lords to answer","line":"Make the Crown’s reach visible; harden opposition.","effect":{"authority":5,"order":-2,"warwick":-5,"power":4},"record":"The named lords are summoned before the king."},
		{"label":"Hear Warwick’s account first","line":"Use a powerful ally’s knowledge; deepen his influence.","effect":{"warwick":7,"authority":-1,"order":1},"record":"Warwick is asked to establish the facts."}]},
	{"title":"The King Under Guard","speaker":"A royal captain","quote":"The king’s household is under guard. Some lords ask whether Edward can still command; others are ready to accept a settlement.","context":"At this point Edward’s position depends on the same claims built across the court. Deposition is possible, but the crisis does not decide itself.","choices":[{"label":"Yield the seal and accept the lords’ judgment","line":"End Edward’s rule by deliberate settlement.","effect":{"authority":-12,"order":4,"warwick":8,"woodville":-8},"record":"Edward gives up the royal seal.","depose":true},{"label":"Call the lords who still hold faith","line":"Resist removal; make the strength of each bond visible.","effect":{"authority":5,"order":-2,"warwick":-5,"woodville":3,"power":3},"record":"Edward calls his remaining supporters to court."},{"label":"Negotiate a guarded settlement","line":"Buy time with shared terms; leave the Crown constrained.","effect":{"authority":-2,"order":5,"warwick":2,"woodville":2,"succession":3},"record":"A guarded settlement keeps Edward on the throne."}]},
	{"title":"A Warning at the Door","speaker":"A captain of the guard","quote":"Two armed men were seen asking after the king’s chamber. The guard asks whether to change the watch or leave the report alone.","context":"Plots become more likely when the Crown is exposed and rival households can act without trust. The warning is visible before the danger takes effect.","choices":[{"label":"Strengthen the king’s guard","line":"Spend authority and attention to reduce immediate exposure.","effect":{"authority":2,"order":1,"plot_exposure":-15},"record":"The king’s guard changes the watch."},{"label":"Question the captain before the council","line":"Test the report; the delay leaves the chamber exposed.","effect":{"authority":1,"order":-1,"plot_exposure":5},"record":"The captain is questioned before the council."},{"label":"Dismiss the report as factional noise","line":"Preserve the peace of court; risk a real breach.","effect":{"authority":-2,"order":-4,"plot_exposure":20},"record":"The warning is dismissed without inquiry."}]},
	{"title":"The Terms of Succession","speaker":"The Archbishop’s envoy","quote":"A marriage may bind a house to the Crown. An heir may give that bond a future, if the realm accepts the line.","context":"Dynastic security is made from marriage, inheritance and recognition. None can guarantee the others.","choices":[
		{"label":"Publish the heir’s place before the court","line":"Give the succession public shape; invite scrutiny.","effect":{"inheritance":8,"succession":2,"authority":2},"record":"The heir’s place is proclaimed before the court."},
		{"label":"Keep the settlement within the royal council","line":"Preserve room to negotiate; leave the claim less visible.","effect":{"succession":2,"authority":1,"order":1},"record":"Succession is reserved for a private council."},
		{"label":"Seek the Church’s witness","line":"Strengthen recognition; allow clerical authority a voice.","effect":{"faith":7,"succession":4,"authority":1},"record":"The Church witnesses the royal settlement."}]},
	{"title":"The Crown’s Due","speaker":"A keeper of the royal accounts","quote":"The treasury can meet the cost of one more campaign. It cannot do so without drawing upon the king’s future income.","context":"Revenue buys action. Repeated demands weaken trust in royal promises and make every later decision more expensive.","choices":[
		{"label":"Raise a levy for the Crown","line":"Secure immediate means; spend political credit.","effect":{"treasury":9,"authority":2,"order":-4,"power":3},"record":"A new levy fills the royal treasury."},
		{"label":"Ask Parliament to grant the funds","line":"Share the burden; accept a public condition.","effect":{"treasury":6,"authority":1,"order":2,"open_promises":1},"record":"The Crown seeks a grant through Parliament."},
		{"label":"Reduce the campaign and hold the reserve","line":"Preserve future choices; surrender speed now.","effect":{"treasury":2,"order":2,"warwick":-1},"record":"The campaign is reduced to preserve the reserve."}]}
]
var phase := "title"
var intro_index := 0
var decision_index := 0
var period_index := 0
var values := {"authority":52.0,"order":50.0,"succession":35.0,"warwick":38.0,"woodville":34.0,"faith":50.0,"marriage":50.0,"inheritance":45.0,"power":50.0,"treasury":48.0,"open_promises":0.0,"plot_exposure":0.0}
var history: Array[String] = []
var dead := false
var deposed := false
var page: VBoxContainer
var card_text: RichTextLabel
var card_heading: Label
var audio_player: AudioStreamPlayer
var sfx_player: AudioStreamPlayer
var music_on := false
var screen_layout := ""
var last_feedback := ""
var ambient_theme: Theme

func _ready() -> void:
	_build_shell()
	get_viewport().size_changed.connect(_on_viewport_changed)
	_show_title()

func _build_shell() -> void:
	var background := ColorRect.new()
	background.color = Color("#171a17")
	background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	background.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(background)
	var margin := MarginContainer.new()
	margin.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	margin.add_theme_constant_override("margin_left", 22)
	margin.add_theme_constant_override("margin_right", 22)
	margin.add_theme_constant_override("margin_top", 18)
	margin.add_theme_constant_override("margin_bottom", 18)
	add_child(margin)
	var scroll := ScrollContainer.new()
	scroll.size_flags_vertical = Control.SIZE_EXPAND_FILL
	scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	margin.add_child(scroll)
	page = VBoxContainer.new()
	page.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	page.size_flags_vertical = Control.SIZE_EXPAND_FILL
	page.add_theme_constant_override("separation", 12)
	scroll.add_child(page)
	ambient_theme = Theme.new()
	var serif := SystemFont.new()
	serif.font_names = PackedStringArray(["Georgia", "Palatino Linotype", "Book Antiqua", "serif"])
	ambient_theme.default_font = serif
	ambient_theme.default_font_size = 16
	theme = ambient_theme
	audio_player = AudioStreamPlayer.new()
	audio_player.bus = "Master"
	add_child(audio_player)
	audio_player.stream = _make_music()
	audio_player.finished.connect(_on_music_finished)
	sfx_player = AudioStreamPlayer.new()
	add_child(sfx_player)

func _on_music_finished() -> void:
	if music_on:
		audio_player.play()

func _clear_page() -> void:
	for child in page.get_children():
		page.remove_child(child)
		child.queue_free()

func _on_viewport_changed() -> void:
	var layout := "wide" if get_viewport_rect().size.x >= 920.0 else "narrow"
	if layout != screen_layout:
		screen_layout = layout
		if phase == "game":
			_show_game()

func _show_title() -> void:
	phase = "title"
	_clear_page()
	var spacer := Control.new()
	spacer.size_flags_vertical = Control.SIZE_EXPAND_FILL
	page.add_child(spacer)
	var crest := _panel(Color("#202620"), GOLD, 3)
	crest.custom_minimum_size = Vector2(0, 190)
	page.add_child(crest)
	var center := CenterContainer.new()
	crest.add_child(center)
	var stack := VBoxContainer.new()
	stack.alignment = BoxContainer.ALIGNMENT_CENTER
	stack.add_theme_constant_override("separation", 8)
	center.add_child(stack)
	stack.add_child(_label("EDWARD", 42, VELLUM, true, HORIZONTAL_ALIGNMENT_CENTER))
	stack.add_child(_label("THE LIVING COURT", 12, GOLD, false, HORIZONTAL_ALIGNMENT_CENTER))
	stack.add_child(_label("England · 1461", 15, MUTED, false, HORIZONTAL_ALIGNMENT_CENTER))
	var copy := _label("A king’s rule is made from claims, alliances and consequences.", 17, VELLUM, true, HORIZONTAL_ALIGNMENT_CENTER)
	copy.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	page.add_child(copy)
	var new_game := _button("New Game", "Begin Edward’s reign", false)
	new_game.pressed.connect(func() -> void:
		_play_sfx()
		_start_new_game()
	)
	page.add_child(new_game)
	var sound := _button(_music_button_label(), "A quiet instrumental drone and lyre motif", true)
	sound.pressed.connect(func() -> void:
		_play_sfx()
		_toggle_music()
		sound.text = _music_button_label()
	)
	page.add_child(sound)
	var footer := _label("A political reading of the reign, not a verdict on the king.", 11, MUTED, false, HORIZONTAL_ALIGNMENT_CENTER)
	page.add_child(footer)
	var bottom := Control.new()
	bottom.size_flags_vertical = Control.SIZE_EXPAND_FILL
	page.add_child(bottom)

func _start_new_game() -> void:
	values = {"authority":52.0,"order":50.0,"succession":35.0,"warwick":38.0,"woodville":34.0,"faith":50.0,"marriage":50.0,"inheritance":45.0,"power":50.0,"treasury":48.0,"open_promises":0.0,"plot_exposure":0.0}
	history.clear()
	decision_index = 0
	period_index = 0
	dead = false
	deposed = false
	_start_music()
	_show_intro()

func _show_intro() -> void:
	phase = "intro"
	_clear_page()
	_add_topline("THE CROWN AFTER TOWTON", "HISTORICAL PROLOGUE")
	var panel := _panel(Color("#e5d6b8"), Color("#8c774e"), 5)
	panel.size_flags_vertical = Control.SIZE_EXPAND_FILL
	page.add_child(panel)
	var margins := MarginContainer.new()
	margins.add_theme_constant_override("margin_left", 24)
	margins.add_theme_constant_override("margin_right", 24)
	margins.add_theme_constant_override("margin_top", 26)
	margins.add_theme_constant_override("margin_bottom", 26)
	panel.add_child(margins)
	var body := VBoxContainer.new()
	body.add_theme_constant_override("separation", 18)
	margins.add_child(body)
	var chapter := _label("1461 · A crown won in battle", 12, RED, false)
	body.add_child(chapter)
	var heading := _label(INTRO_PAGES[intro_index].heading, 32, INK, true)
	heading.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	body.add_child(heading)
	card_text = RichTextLabel.new()
	card_text.bbcode_enabled = false
	card_text.fit_content = true
	card_text.scroll_active = false
	card_text.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	card_text.add_theme_color_override("default_color", INK)
	card_text.add_theme_font_size_override("normal_font_size", 22)
	card_text.text = INTRO_PAGES[intro_index].body
	card_text.visible_ratio = 0.0
	body.add_child(card_text)
	var separator := HSeparator.new()
	body.add_child(separator)
	body.add_child(_label("The Wars of the Roses · Yorkist rule begins at Towton", 14, Color("#655b48"), false))
	var next := _button("Continue", "The account appears before the first decision", false)
	next.pressed.connect(func() -> void:
		_play_sfx()
		_advance_intro()
	)
	page.add_child(next)
	_add_footer("The history frames the choices; the court will remember what you make of them.")
	var tween := create_tween()
	tween.tween_property(card_text, "visible_ratio", 1.0, maxf(1.4, card_text.text.length() / 34.0))

func _advance_intro() -> void:
	if card_text.visible_ratio < 0.995:
		card_text.visible_ratio = 1.0
		return
	intro_index += 1
	if intro_index >= INTRO_PAGES.size():
		intro_index = 0
		_show_game()
	else:
		_show_intro()

func _show_game() -> void:
	phase = "game"
	_clear_page()
	var period: Dictionary = PERIODS[period_index]
	_add_topline("EDWARD · THE LIVING COURT", "ENGLAND · %d" % period.year)
	var progress := _label("%s     ·     Decision %02d / 20" % [period.name, decision_index + 1], 12, GOLD, false)
	page.add_child(progress)
	var layout := HBoxContainer.new() if get_viewport_rect().size.x >= 920.0 else VBoxContainer.new()
	layout.add_theme_constant_override("separation", 12)
	layout.size_flags_vertical = Control.SIZE_EXPAND_FILL
	page.add_child(layout)
	var map_panel := _build_map_panel()
	var card_panel := _build_card_panel(period)
	var court_panel := _build_court_panel()
	if layout is HBoxContainer:
		map_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		map_panel.size_flags_stretch_ratio = 0.9
		card_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		card_panel.size_flags_stretch_ratio = 1.5
		court_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		court_panel.size_flags_stretch_ratio = 0.9
		layout.add_child(map_panel)
		layout.add_child(card_panel)
		layout.add_child(court_panel)
	else:
		layout.add_child(_build_quick_state())
		layout.add_child(card_panel)
		layout.add_child(map_panel)
		layout.add_child(court_panel)
	if card_heading != null:
		card_heading.grab_focus()
	var scroll := page.get_parent() as ScrollContainer
	if scroll != null:
		scroll.scroll_vertical = 0
	var music := _button(_music_button_label(), "Instrumental ambience", true)
	music.pressed.connect(func() -> void:
		_play_sfx()
		_toggle_music()
		music.text = _music_button_label()
	)
	page.add_child(music)

func _build_map_panel() -> PanelContainer:
	var panel := _panel(Color("#202620"), Color("#675e47"), 1)
	var box := VBoxContainer.new()
	box.add_theme_constant_override("separation", 8)
	panel.add_child(_padded(box, 11))
	box.add_child(_label("THE REALM", 14, GOLD, true))
	var map := TextureRect.new()
	map.custom_minimum_size = Vector2(0, 205)
	map.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	map.size_flags_vertical = Control.SIZE_EXPAND_FILL
	map.expand_mode = TextureRect.EXPAND_FIT_WIDTH_PROPORTIONAL
	map.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	var map_texture = load("res://assets/england_map.svg")
	if map_texture:
		map.texture = map_texture
	box.add_child(map)
	box.add_child(_label(str(PERIODS[period_index].context), 12, MUTED, false))
	box.add_child(_label("OBJECTIVES OF THE CROWN", 13, GOLD, true))
	for entry in [["Keep the crown","authority"],["Keep the realm governable","order"],["Secure the succession","succession"]]:
		box.add_child(_stat_row(entry[0], entry[1]))
	return panel

func _build_quick_state() -> Control:
	var row := HBoxContainer.new()
	row.add_theme_constant_override("separation", 8)
	for entry in [["AUTHORITY","authority"],["ORDER","order"],["SUCCESSION","succession"]]:
		var box := VBoxContainer.new()
		box.add_theme_constant_override("separation", 3)
		var values_row := HBoxContainer.new()
		values_row.add_child(_label(entry[0], 10, MUTED, false))
		var spacer := Control.new()
		spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		values_row.add_child(spacer)
		values_row.add_child(_label(str(roundi(values[entry[1]])), 11, VELLUM, false))
		box.add_child(values_row)
		var bar := ProgressBar.new()
		bar.custom_minimum_size = Vector2(0, 4)
		_style_progress(bar)
		bar.show_percentage = false
		bar.max_value = 100
		bar.value = values[entry[1]]
		box.add_child(bar)
		box.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		row.add_child(box)
	return row

func _build_card_panel(period: Dictionary) -> PanelContainer:
	var panel := _panel(Color("#eadcc0"), Color("#8c774e"), 5)
	var box := VBoxContainer.new()
	box.add_theme_constant_override("separation", 11)
	panel.add_child(_padded(box, 18))
	var row := HBoxContainer.new()
	row.add_child(_label("I · %s" % period.name.to_upper(), 10, Color("#695f49"), false))
	var spacer := Control.new()
	spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	row.add_child(spacer)
	row.add_child(_label("%02d / 20" % (decision_index + 1), 10, Color("#695f49"), false))
	box.add_child(row)
	var available: Array[int] = []
	for card_index in range(DECK.size()):
		if DECK[card_index].title == "The King Under Guard" and period.year != 1469:
			continue
		available.append(card_index)
	var card: Dictionary = DECK[available[decision_index % available.size()]]
	var quote := _label(card.title, 28, INK, true)
	card_heading = quote
	quote.focus_mode = Control.FOCUS_ALL
	quote.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	box.add_child(quote)
	var speaker := _label(card.speaker, 13, Color("#6e634c"), false)
	box.add_child(speaker)
	var portrait := _portrait(card.speaker)
	if portrait:
		portrait.custom_minimum_size = Vector2(58,58)
		portrait.size = Vector2(58,58)
		portrait.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
		portrait.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
		portrait.position = Vector2.ZERO
		var portrait_row := HBoxContainer.new()
		portrait_row.add_child(speaker.duplicate())
		portrait_row.add_child(portrait)
		box.remove_child(speaker)
		portrait_row.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		box.add_child(portrait_row)
	box.add_child(HSeparator.new())
	var quote_text := _label(card.quote, 21, INK, true)
	quote_text.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	box.add_child(quote_text)
	var context := _label(card.context, 14, Color("#504b3e"), false)
	context.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	box.add_child(context)
	if not last_feedback.is_empty():
		var feedback := _label(last_feedback, 12, RED, true)
		feedback.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		box.add_child(feedback)
	var choices: Array = card.choices.duplicate(true)
	if choices.size() == 3 and (decision_index + period_index) % 2 == 0:
		choices = [choices[0], choices[1]]
	for option in choices:
		var effect_line := _effect_summary(option.effect)
		var button := _button("%s\n%s" % [option.label, effect_line], option.line, false)
		button.custom_minimum_size.y = 76
		button.pressed.connect(_on_option_selected.bind(option, card))
		box.add_child(button)
	var relation := _label("Court alignment · %s   |   Faction pressure · %s" % [_alignment_label(), roundi(_faction_pressure())], 11, Color("#6e634c"), false)
	relation.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	box.add_child(relation)
	return panel

func _build_court_panel() -> PanelContainer:
	var panel := _panel(Color("#202620"), Color("#675e47"), 1)
	var box := VBoxContainer.new()
	box.add_theme_constant_override("separation", 8)
	panel.add_child(_padded(box, 11))
	box.add_child(_label("EDWARD IV", 20, VELLUM, true, HORIZONTAL_ALIGNMENT_CENTER))
	var portrait := _portrait("Edward")
	if portrait:
		portrait.custom_minimum_size = Vector2(70,70)
		portrait.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
		portrait.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
		box.add_child(_centered(portrait))
	box.add_child(_label("SOURCES OF MEANING", 13, GOLD, true))
	for entry in [["Marriage","marriage"],["Inheritance","inheritance"],["Faith","faith"],["Royal power","power"]]:
		box.add_child(_stat_row(entry[0], entry[1]))
	box.add_child(_stat_row("Royal treasury", "treasury"))
	box.add_child(HSeparator.new())
	box.add_child(_label("POLITICAL MEMORY", 13, GOLD, true))
	box.add_child(_relation_row("Warwick’s affinity", "warwick"))
	box.add_child(_relation_row("Queen’s household", "woodville"))
	box.add_child(_label("Open promises · %d" % roundi(values.open_promises), 12, MUTED, false))
	box.add_child(_label("Threat to the king · %d" % roundi(values.plot_exposure), 12, MUTED, false))
	box.add_child(_label("Prior rulings · %d" % history.size(), 12, MUTED, false))
	var chron := _label(history.back() if not history.is_empty() else PERIODS[period_index].context, 12, Color("#d3c7ae"), false)
	chron.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	box.add_child(chron)
	return panel

func _on_option_selected(option: Dictionary, card: Dictionary) -> void:
	_play_sfx()
	_choose(option, card)

func _choose(option: Dictionary, card: Dictionary) -> void:
	var old_gap: float = absf(values.warwick - values.woodville)
	for key in option.effect:
		if values.has(key):
			values[key] = clampf(values[key] + float(option.effect[key]), 0.0 if key not in ["warwick","woodville"] else -100.0, 100.0)
	var new_gap: float = absf(values.warwick - values.woodville)
	var household_strain := maxf(0.0, new_gap - old_gap)
	values.order = clampf(values.order - household_strain * 0.055, 0.0, 100.0)
	var shared_affinity := minf(values.warwick, values.woodville)
	values.authority = clampf(values.authority + (shared_affinity - 36.0) * 0.018, 0.0, 100.0)
	values.succession = clampf(values.succession + (values.marriage - 50.0) * 0.018 + (values.inheritance - 45.0) * 0.022, 0.0, 100.0)
	values.authority = clampf(values.authority + (values.faith - 50.0) * 0.008, 0.0, 100.0)
	values.authority = clampf(values.authority + (values.power - 50.0) * 0.006 + (values.treasury - 48.0) * 0.012, 0.0, 100.0)
	values.order = clampf(values.order - maxf(0.0, values.power - 68.0) * 0.035, 0.0, 100.0)
	values.power = clampf(values.power + (values.authority - 50.0) * 0.01, 0.0, 100.0)
	decision_index += 1
	var consequence := _consequence(option, old_gap, new_gap, household_strain)
	last_feedback = consequence
	if option.get("depose", false) and PERIODS[period_index].year == 1469:
		deposed = true
		_finish("Edward Deposed · 1469", "The lords take the seal after a political settlement. Edward’s deposition follows the choices that made it possible; it was not the only outcome of the crisis.", 1469)
		return
	if PERIODS[period_index].year >= 1469 and values.plot_exposure >= 38.0 and _faction_pressure() >= 58.0:
		dead = true
		_finish("The King Is Killed", "A warning was dismissed while the rival households and the Crown were already in conflict. A plot reaches Edward before 1483.")
		return
	history.append("%s · %s" % [card.title, option.label])
	if history.size() > 6:
		history.pop_front()
	if decision_index >= 20:
		_advance_period()
		return
	_show_game()

func _consequence(option: Dictionary, old_gap: float, new_gap: float, strain: float) -> String:
	var lines: Array[String] = []
	lines.append(option.record)
	if values.plot_exposure >= 18.0:
		lines.append("The guard’s warning remains unresolved; the next breach could reach the king.")
	if new_gap > old_gap + 8.0:
		lines.append("The gap between Warwick and the queen’s household widens; local order pays part of the cost.")
	elif new_gap < old_gap - 8.0:
		lines.append("The rival households draw closer, easing pressure on the realm.")
	if values.authority < 30.0:
		lines.append("The Crown’s weakened reach makes a challenge more credible.")
	elif values.authority > 70.0 and values.order < 35.0:
		lines.append("Royal command is strong; obedience in the shires is becoming brittle.")
	if values.succession < 25.0:
		lines.append("The inheritance is uncertain enough to invite a rival claim.")
	elif values.succession > 70.0:
		lines.append("A recognised line gives the court a settlement to defend.")
	return " ".join(lines)

func _advance_period() -> void:
	decision_index = 0
	if period_index + 1 >= PERIODS.size() or PERIODS[period_index + 1].year >= 1483:
		_finish("Edward Dies · 1483", "If Edward survives earlier political violence, his death in 1483 closes the reign. The court’s offices, promises and alliances become the terms of succession.", 1483)
		return
	period_index += 1
	last_feedback = "Twenty rulings have entered the court’s memory. Earlier choices now shape the next period."
	if PERIODS[period_index].year == 1469 and _faction_pressure() > 72.0:
		last_feedback += " Warwick’s position makes deposition a live possibility, not an automatic result."
	_show_game()

func _finish(title: String, text: String, end_year: int = -1) -> void:
	phase = "end"
	_clear_page()
	var closing_year := PERIODS[period_index].year if end_year < 0 else end_year
	_add_topline("THE RECORD CLOSES", "ENGLAND · %d" % closing_year)
	var title_label := _label(title, 36, VELLUM, true, HORIZONTAL_ALIGNMENT_CENTER)
	page.add_child(title_label)
	var explanation := _label(text, 19, MUTED, false, HORIZONTAL_ALIGNMENT_CENTER)
	explanation.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	page.add_child(explanation)
	var profile := _label("Ruler’s signature · " + _ruler_signature(), 16, GOLD, true, HORIZONTAL_ALIGNMENT_CENTER)
	profile.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	page.add_child(profile)
	var again := _button("Begin another reign", "The court remembers a new set of twenty rulings", false)
	again.pressed.connect(func() -> void:
		_play_sfx()
		_start_new_game()
	)
	page.add_child(again)
	var scroll := page.get_parent() as ScrollContainer
	if scroll != null:
		scroll.scroll_vertical = 0

func _faction_pressure() -> float:
	var gap: float = absf(values.warwick - values.woodville)
	var weakness := (100.0 - values.authority) * 0.24 + (100.0 - values.order) * 0.22
	var succession_risk := (100.0 - values.succession) * 0.16
	var promise_risk := values.open_promises * 2.8
	var leverage := maxf(values.warwick, values.woodville) * 0.12
	return clampf(gap * 0.42 + weakness + succession_risk + promise_risk + leverage, 0.0, 100.0)

func _alignment_label() -> String:
	var gap: float = absf(values.warwick - values.woodville)
	if gap < 14.0: return "shared"
	if values.warwick > values.woodville: return "Warwick’s affinity leads"
	return "the queen’s household leads"

func _ruler_signature() -> String:
	if values.authority > 68.0 and values.order < 38.0: return "command secured through strained obedience"
	if values.warwick > values.woodville + 24.0: return "rule built through a powerful lieutenant"
	if values.woodville > values.warwick + 24.0: return "a court gathered around royal kin"
	if values.succession > 65.0 and values.faith > 60.0: return "a settlement anchored in inheritance and witness"
	return "authority held through changing coalitions"

func _effect_summary(effect: Dictionary) -> String:
	var names := {"authority":"Crown","order":"Order","succession":"Succession","warwick":"Warwick","woodville":"Queen’s house","faith":"Faith","marriage":"Marriage","inheritance":"Inheritance","power":"Power","treasury":"Treasury","open_promises":"Open promises"}
	var pieces: Array[String] = []
	for key in effect:
		pieces.append("%s %s%s" % [names.get(key,key), "+" if effect[key] >= 0 else "", str(effect[key])])
	return " · ".join(pieces)

func _stat_row(title: String, key: String) -> Control:
	var box := VBoxContainer.new()
	box.add_theme_constant_override("separation", 3)
	var line := HBoxContainer.new()
	line.add_child(_label(title, 12, VELLUM, false))
	var spacer := Control.new()
	spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	line.add_child(spacer)
	var value_label := _label(str(roundi(values[key])), 11, MUTED, false)
	line.add_child(value_label)
	box.add_child(line)
	var bar := ProgressBar.new()
	bar.show_percentage = false
	_style_progress(bar)
	bar.max_value = 100
	bar.value = values[key]
	bar.custom_minimum_size = Vector2(0, 4)
	box.add_child(bar)
	return box

func _style_progress(bar: ProgressBar) -> void:
	var background := StyleBoxFlat.new()
	background.bg_color = Color("#42473c")
	var fill := StyleBoxFlat.new()
	fill.bg_color = GOLD
	bar.add_theme_stylebox_override("background", background)
	bar.add_theme_stylebox_override("fill", fill)

func _relation_row(title: String, key: String) -> Control:
	var line := HBoxContainer.new()
	var name := _label(title, 12, VELLUM, false)
	name.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	line.add_child(name)
	line.add_child(_label(str(roundi(values[key])), 11, MUTED, false))
	return line

func _portrait(speaker: String) -> TextureRect:
	var filename := "warwick" if "Warwick" in speaker else ("elizabeth" if "Elizabeth" in speaker else "edward")
	var encoded := FileAccess.get_file_as_string("res://assets/portraits/%s.webp.b64" % filename)
	if encoded.is_empty(): return null
	var image := Image.new()
	var error := image.load_webp_from_buffer(Marshalls.base64_to_raw(encoded.strip_edges()))
	if error != OK: return null
	var texture := ImageTexture.create_from_image(image)
	var view := TextureRect.new()
	view.texture = texture
	view.custom_minimum_size = Vector2(56,56)
	return view

func _add_topline(title: String, date: String) -> void:
	var row := HBoxContainer.new()
	row.add_child(_label(title, 15, VELLUM, true))
	var spacer := Control.new()
	spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	row.add_child(spacer)
	row.add_child(_label(date, 11, MUTED, false, HORIZONTAL_ALIGNMENT_RIGHT))
	page.add_child(row)
	var rule := HSeparator.new()
	page.add_child(rule)

func _add_footer(text: String) -> void:
	var label := _label(text, 11, MUTED, false, HORIZONTAL_ALIGNMENT_CENTER)
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	page.add_child(label)

func _button(title: String, detail: String, secondary: bool) -> Button:
	var button := Button.new()
	button.text = title + ("\n" + detail if not detail.is_empty() else "")
	button.custom_minimum_size = Vector2(0, 58 if secondary else 76)
	button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	button.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	button.add_theme_font_size_override("font_size", 16 if not secondary else 13)
	button.add_theme_color_override("font_color", VELLUM if secondary else INK)
	var style := StyleBoxFlat.new()
	style.bg_color = Color("#2b3029") if secondary else Color("#f2e7cf")
	style.border_color = Color("#71674e") if secondary else Color("#78694a")
	style.set_border_width_all(1)
	style.set_content_margin_all(13)
	button.add_theme_stylebox_override("normal", style)
	var hover := style.duplicate()
	hover.bg_color = Color("#3a4036") if secondary else Color("#fff2d8")
	hover.border_color = RED
	button.add_theme_stylebox_override("hover", hover)
	button.add_theme_stylebox_override("pressed", hover)
	return button

func _label(text: String, size: int, color: Color, serif: bool, align: HorizontalAlignment = HORIZONTAL_ALIGNMENT_LEFT) -> Label:
	var label := Label.new()
	label.text = text
	label.horizontal_alignment = align
	label.add_theme_font_size_override("font_size", size)
	label.add_theme_color_override("font_color", color)
	label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	return label

func _panel(fill: Color, border: Color, width: int) -> PanelContainer:
	var panel := PanelContainer.new()
	var style := StyleBoxFlat.new()
	style.bg_color = fill
	style.border_color = border
	style.set_border_width_all(width)
	style.set_content_margin_all(0)
	panel.add_theme_stylebox_override("panel", style)
	return panel

func _padded(control: Control, padding: int) -> MarginContainer:
	var margin := MarginContainer.new()
	margin.add_theme_constant_override("margin_left", padding)
	margin.add_theme_constant_override("margin_right", padding)
	margin.add_theme_constant_override("margin_top", padding)
	margin.add_theme_constant_override("margin_bottom", padding)
	margin.add_child(control)
	return margin

func _centered(control: Control) -> CenterContainer:
	var container := CenterContainer.new()
	container.add_child(control)
	return container

func _toggle_music() -> void:
	music_on = not music_on
	if music_on:
		audio_player.play()
	else:
		audio_player.stop()

func _start_music() -> void:
	if not music_on:
		music_on = true
		audio_player.play()

func _music_button_label() -> String:
	return "♫ Ambience · On" if music_on else "♫ Ambience · Off"

func _make_music() -> AudioStreamWAV:
	var frames := SAMPLE_RATE * 12
	var data := PackedByteArray()
	data.resize(frames * 2)
	var notes := [293.66, 349.23, 392.0, 440.0, 392.0, 349.23, 329.63, 392.0]
	for i in range(frames):
		var t := float(i) / SAMPLE_RATE
		var beat := int(floor(t / 1.5)) % notes.size()
		var age := fposmod(t, 1.5)
		var f: float = notes[beat]
		var drone := sin(TAU * 73.42 * t) * 0.018 + sin(TAU * 110.0 * t) * 0.007
		var pluck := exp(-age * 2.8) * (sin(TAU * f * t) + sin(TAU * f * 2.0 * t) * 0.22 + sin(TAU * f * 3.0 * t) * 0.08) * 0.055
		var value := clampf(drone + pluck, -0.8, 0.8)
		data.encode_s16(i * 2, int(value * 32767.0))
	var stream := AudioStreamWAV.new()
	stream.format = AudioStreamWAV.FORMAT_16_BITS
	stream.mix_rate = SAMPLE_RATE
	stream.stereo = false
	stream.loop_mode = AudioStreamWAV.LOOP_FORWARD
	stream.loop_end = frames
	stream.data = data
	return stream

func _play_sfx() -> void:
	var rate := SAMPLE_RATE
	var frames := int(rate * 0.065)
	var data := PackedByteArray()
	data.resize(frames * 2)
	for i in range(frames):
		var t := float(i) / rate
		var value := sin(TAU * (620.0 - 230.0 * t) * t) * exp(-t * 40.0) * 0.12
		data.encode_s16(i * 2, int(value * 32767.0))
	var click := AudioStreamWAV.new()
	click.format = AudioStreamWAV.FORMAT_16_BITS
	click.mix_rate = rate
	click.stereo = false
	click.data = data
	sfx_player.stream = click
	sfx_player.play()
