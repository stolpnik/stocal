###
* Calendar class
* @class Calendar
* @method next
* @method prev
###

Month = @stocal?.Month || require "./month"
CalendarUtils = @stocal?.CalendarUtils || require "./calendar_utils"

class Calendar
	constructor : ( date, options )->
		this.date = date
		this.events = []
		this.month = new Month( date, options )
		this.options = options

	month     : null
	date      : null
	options   : null
	events    : null

	###
	* get nextMonth
	###
	nextMonth : ->
		data = CalendarUtils.getNextMonthData this.date
		return new Calendar data.year, data.month

	###
	* get prevMonth
	###
	prevMonth : ->
		data = CalendarUtils.getPrevMonthData this.date
		return new Calendar data.year, data.month

@stocal ||= {}
if module?.exports  # Node.jsの場合
	module.exports = Calendar
else  # ブラウザの場合
	@stocal.Calendar = Calendar