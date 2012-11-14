#= require ./calendar_utils
#= require ./event_type

###
* Month
* @class 月を表すクラス
* @param date {Date} 月の初めの日を表すDateオブジェクト
* @param options {Object} オプション
###

util = @stocal?.CalendarUtils || require "./calendar_utils"
settings = @stocal?.settings || require "./calendar_settings"
Week = @stocal?.Week || require "./week"
EventType = @stocal?.EventType || require "./event_type"
$ = $ || require "jquery"

class Month
	constructor : ( date = null, options = null ) ->
		start = settings.dayStartInWeek
		unless date?
			d = new Date
		else
			d = date
		year = d.getFullYear()
		month = d.getMonth() + 1
		firstDay = new Date(year, month - 1).getDay()
		date = d.getDate()
		isLeapYear = util.isLeapYear year
		dateMax = util.getDateMax d
		events = options?.events || []
		#weeks
		weeks = []
		weekCount = 1
		dayCount = 1
		while( dayCount <= dateMax )
			week = new Week( new Date( year, month - 1, dayCount ), options )
			if week.startDate.getMonth() + 1 is month
				dayCount += 7
			else
				dayCount = week.endDate.getDate() + 1
			weeks.push week

		startDate = new Date( year, month - 1, 1 )
		endDate = new Date( year, month - 1, dateMax )

		calArray = []
		dates = []
		for week in weeks
			for day in week.calendar
				if startDate <= day.date <= endDate
					dates.push day
				calArray.push day

		this.date = d
		this.year = year
		this.month = month
		this.firstDay = firstDay
		this.isLeapYear = isLeapYear
		this.dateMax = dateMax
		this.weeks = weeks
		this.calendar = calArray
		this.options = options
		this.dates = dates

		if options?.events
			this.initEvents options.events

	initEvents : ( events )->
		cats = {}
		categoryTitles = []
		categoriesBase = $.extend( true, [], settings.graphTypes )
		categories = []
		this.events ||= []

		startDate = this.weeks[0].calendar[0].date
		endDate = this.weeks[this.weeks.length - 1].calendar[6].date

		for event, i in events
			if startDate <= event.start <= endDate || startDate <= event.end <= endDate || ( event.start <= startDate && endDate <= event.end )
				this.events.push event

		for category in categoriesBase
			eventType = new EventType( category )
			for event in this.events
				if event.category?.name is category.name
					eventType.events.push event
			categories.push eventType

		this.categories = categories
		return

@stocal ||= {}
if module?.exports  # Node.jsの場合
	module.exports = Month
else  # ブラウザの場合
	@stocal.Month = Month