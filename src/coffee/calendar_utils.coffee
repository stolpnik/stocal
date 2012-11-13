#= require ./calendar_settings
if module?.exports
	$ = $ || require "jquery"

###
* 与えられた配列に祝日情報を付与する
* @param year {Number}
* @param month {Number}
* @param dateMax {Number} 月の最大日数
* @param firstDay {Number} 月の最初の曜日
* @param days {Array} 祝日を付与する日付オブジェクトを格納した配列
* @return {Array}
###
###
_setHolidays = (year, month, dateMax, firstDay, days) ->
	#days = new Array(dateMax)
	#firstSunday = if firstDay is 0 then 1 else 8 - firstDay
	if firstDay is 0
		firstSunday = 1
	else if firstDay is 1
		firstSunday = 0
	else
		firstSunday = 8 - firstDay

	if firstDay is 1
		firstMonday = 1
	else if firstDay is 0
		firstMonday = 2
	else
		firstMonday = 9 - firstDay

	if month is 1
		days[1].holiday = { name : "元旦" }
		days[2].holiday = { name : "振替休日" } if firstSunday is 1
		days[firstMonday + 7].holiday = { name : "成人の日" }
	else if month is 2
		days[11].holiday = { name : "建国記念日" }
		days[12].holiday = { name : "振替休日" } if 11 % 7 is firstSunday
	else if month is 3
		date = Math.floor( 20.8431 + 0.242194 * ( year - 1980 )) - Math.floor( ( year - 1980 ) / 4 )
		days[ date ].holiday = { name : "春分の日" }
		days[date + 1].holiday = { name : "振替休日" } if date % 7 is firstSunday
	else if month is 4
		days[29].holiday = { name : "昭和の日" }
		days[30].holiday = { name : "振替休日" } if 29 % 7 is firstSunday
	else if month is 5
		days[3].holiday = { name : "憲法記念日" }
		days[4].holiday = { name : "みどりの日" }
		days[5].holiday = { name : "こどもの日" }
		days[6].holiday = { name : "振替休日" } if 3 % 7 is firstSunday or 4 % 7 is firstSunday or 5 % 7 is firstSunday
	else if month is 7
		days[firstMonday + 14].holiday = { name : "海の日" }
	else if month is 9
		days[firstMonday + 14].holiday = { name : "敬老の日" }
		date = Math.floor( 23.2488 + 0.242194 * ( year - 1980 )) - Math.floor( ( year - 1980 ) / 4 )
		days[ date ].holiday = { name : "秋分の日" }
		days[date + 1].holiday = { name : "振替休日" } if date % 7 is firstSunday
	else if month is 10
		days[firstMonday + 7].holiday = { name : "体育の日" }
	else if month is 11
		days[3].holiday = { name : "文化の日" }
		days[4].holiday = { name : "振替休日" } if 3 is firstSunday
		days[23].holiday = { name : "勤労感謝の日" }
		days[24].holiday = { name : "振替休日" } if 23 % 7 is firstSunday
	else if month is 12
		days[23].holiday = { name : "天皇誕生日" }
		days[24].holiday = { name : "振替休日" } if 23 % 7 is firstSunday
	return days
###

###*
* 閏年かどうかを判定する
* @param year {Number}
* @return {Boolean}
###
_isLeapYear = (year)->
	if( year % 4 != 0 )
		return false
	else if( year % 400 == 0 )
		return true
	else if( year % 100 == 0 )
		return false
	else
		return true

###*
* ある月の最後の日付を取得する
* @param date {Date}
* @return {Number} 1-31
###
_getDateMax = (date)->
	year = date.getFullYear()
	month = date.getMonth() + 1
	isLeapYear = _isLeapYear year
	if month is 2
		if isLeapYear
			dateMax = 29
		else
			dateMax = 28
	else if month is 2 or month is 4 or month is 6 or month is 9 or month is 11
		dateMax = 30
	else
		dateMax = 31
	return dateMax

###
* 与えられたオプションオブジェクトをデフォルトとマージして返す
* @param option {Object}
* @return {Object} マージしたオプションオブジェクト
###
_genOptions = ( options = null ) ->
	###
	return $.extend(
		mode : settings.mode
		dayStartInWeek : settings.dayStartInWeek
		showMore : settings.showMore
		showMax : settings.showMax
	, options )
	###
	settings = @stocal?.settings || require "./calendar_settings"

	return $.extend(
		settings
		,options
	)

###
* 月のデータを返す
* @param date {Date}
###
_getMonthData = ( date = new Date() )->
	firstOfMonth = new Date( date.getFullYear(), date.getMonth(), 1 )
	firstDay = firstOfMonth.getDay()
	year = date.getFullYear()
	month = date.getMonth() + 1
	isLeapYear = _isLeapYear year
	dateMax = _getDateMax date
	return {
	year        : year
	month       : month
	firstDay    : firstDay
	isLeapYear  : isLeapYear
	dateMax     : dateMax
	}

###
* 前月のデータを返す
* @param date {Date}
###

_getPrevMonthData = (date = new Date())->
	baseMonth = date.getMonth() + 1
	baseYear = date.getFullYear()
	month = if baseMonth is 1 then 12 else baseMonth - 1
	year = if baseMonth is 1 then baseYear - 1 else baseYear
	return _getMonthData new Date( year, month - 1 )

###
* 次月のデータを返す
* @param date {Date}
###
_getNextMonthData = (date = new Date)->
	baseMonth = date.getMonth() + 1
	baseYear = date.getFullYear()
	month = if baseMonth is 12 then 1 else baseMonth + 1
	year = if baseMonth is 12 then baseYear + 1 else baseYear
	return _getMonthData new Date( year, month - 1 )

###*
* _correctDate
* 渡された文字列がDateオブジェクトで取り扱えるかいろいろ試してみる
* @param date {String}
###
_correctDate = (date)->
	if date instanceof Date
		return date
	if new Date(date).getDate()
		return date
	date = date.replace(/(\+\d{1,2}):00/, "$100")
	if new Date(date).getDate()
		return date
	date = date.replace(/(\d{4,})-(\d{1,2})-(\d{1,2})/, "$1/$2/$3")
	return date

@stocal ||= {}

class CalendarUtils
	constructor : ->
		null

	###*
	* _correctDate
	* 渡された文字列がDateオブジェクトで取り扱えるかいろいろ試してみる
	* @param date {String}
	###
	@correctDate : _correctDate

	###*
	* isLeapYear
	* @param year {Number}
	* @return {Boolean}
	###
	@isLeapYear : _isLeapYear

	###*
	* setHolidays
	*
	* @param year {Number}
	* @param month {Number}
	* @param dateMax {Number}
	* @param firstDay {Number}
	* @return {Array}
	###
	#@setHolidays : _setHolidays

	###
	* _genOptions
	*
	###
	@genOptions : _genOptions

	@getDateMax : _getDateMax

	###
	* 月のデータを返す
	* @param date {Date}
	* @param options {Object}
	###
	@getMonthData : _getMonthData

	###
	* 前月のデータを返す
	* @param date {Date}
	###
	@getPrevMonthData : _getPrevMonthData

	###
	* 次月のデータを返す
	* @param date {Date}
	###
	@getNextMonthData : _getNextMonthData

if module?.exports  # Node.jsの場合
	module.exports = CalendarUtils
else  # ブラウザの場合
	@stocal.CalendarUtils = CalendarUtils