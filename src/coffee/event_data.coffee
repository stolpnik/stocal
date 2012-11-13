#= require ./calendar_utils

###*
* EventData class
* @class EventData
* @param eventData {Object} イベントのオブジェクト
###

util = @stocal?.CalendarUtils || require "./calendar_utils"
settings = @stocal?.settings || require "./calendar_settings"

class EventData
	id : null
	data : null
	category : null
	start : null
	totalStart : null
	end : null
	totalEnd : null
	title : null
	text :null
	url : null

	###* @constructs ###
	constructor : (eventData)->
		this.id = EventData.id++
		this.data = eventData
		categoryName = eventData.category
		category = null
		if categoryName
			for event_type, i in settings.graphTypes
				if categoryName is event_type.name
					category = event_type
					break
		eventData.end ||= eventData.start
		this.url = eventData.url
		this.start = new Date( util.correctDate( eventData.start ) )
		this.totalStart = "#{this.start.getMonth() + 1}/#{this.start.getDate()}"
		this.end = new Date( util.correctDate( eventData.end ) )
		this.totalEnd = "#{this.end.getMonth() + 1}/#{this.end.getDate()}"
		this.title = eventData.title
		this.text = eventData.text
		this.category = category

	@id : 0

@stocal ||= {}
if module?.exports  # Node.jsの場合
	module.exports = EventData
else  # ブラウザの場合
	@stocal.EventData = EventData