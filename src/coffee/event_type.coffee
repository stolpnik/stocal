class EventType
	constructor : ( @category )->
		this.events = []

	category  : null
	events    : null

@stocal ||= {}
if module?.exports  # Node.jsの場合
	module.exports = EventType
else  # ブラウザの場合
	@stocal.EventType = EventType