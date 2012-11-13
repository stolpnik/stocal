###
* @class Week
* 週を表すクラス
* @param
###

settings = @stocal?.settings || require "./calendar_settings"
util = @stocal?.CalendarUtils || require "./calendar_utils"
Holiday = @stocal?.Holiday || require "./holiday"

class Week
	startDate : null
	endDate : null
	year : null
	month : null
	events : null
	options : null
	calendar : null
	start : null
	end : null

	constructor : ( startDate = null, options = null )->
		unless startDate?
			d = new Date()
		else
			d = startDate

		firstDay = d.getDay()
		date = d.getDate()
		year = d.getFullYear()
		month = d.getMonth() + 1

		dayStartInWeek = settings.dayStartInWeek

		if firstDay is dayStartInWeek
			startOfWeek = date
		else
			startOfWeek = date - ( 7 + firstDay - dayStartInWeek ) % 7
			if startOfWeek < 1
				prev = util.getPrevMonthData d
				startOfWeek = prev.dateMax + startOfWeek
				d = new Date( year, month - 2, startOfWeek )
			else
				d = new Date( year, month - 1, startOfWeek )

		startDate = d
		firstDay = d.getDay()
		year = d.getFullYear()
		month = d.getMonth() + 1
		date = d.getDate()
		isLeapYear = util.isLeapYear year
		if month is 2
			if isLeapYear
				dateMax = 29
			else
				dateMax = 28
		else if month is 2 or month is 4 or month is 6 or month is 9 or month is 11
			dateMax = 30
		else
			dateMax = 31

		dayCount = date
		eventData = options?.events

		week = []
		for dayCount in [0...7]
			date = startOfWeek + dayCount
			if date > dateMax
				date -= dateMax
				if month is 12
					m = 1
					y = year + 1
				else
					m = month + 1
					y = year
				wd = new Date(y, m - 1, date)
			else
				y = year
				m = month
				wd = new Date(year, month - 1, date)

			#events
			dayEvents = []
			if eventData
				for event, i in eventData
					if event.start <= wd <= event.end
						dayEvents.push event

			week.push {
				dayNum : date
				date : wd
				day : firstDay + dayCount
				holiday : null
				events : dayEvents
			}

		endDate = week[6].date

		#イベント設定
		events = []
		if eventData
			for event, i in eventData
				if startDate <= event.start <= endDate || startDate <= event.end <= endDate || ( event.start <= startDate && endDate <= event.end )
					events.push event

		#祝日設定
		if options?.holidays
			for holiday, i in options.holidays
				for day, dayCount in week
					if day.date.getTime() is holiday.date.getTime()
						day.holiday = { name : holiday.name }
		else
			null
			#calArray = _setHolidays year, month, dateMax, firstDay, calArray
			for day, dayCount in week
				holiday = new Holiday( day.date )
				day.holiday = if holiday.name then holiday else null

		this.d = d
		this.startDate = startDate
		this.endDate = endDate
		this.start = startDate
		this.end = endDate
		this.year = year
		this.month = month
		this.events = events
		this.options = options
		this.calendar = week

@stocal ||= {}
if module?.exports  # Node.jsの場合
	module.exports = Week
else  # ブラウザの場合
	@stocal.Week = Week