chai              = require 'chai'
expect            = chai.expect
should            = chai.should()

Week = require "../src/coffee/week"
settings = require "../src/coffee/calendar_settings"
EventData = require "../src/coffee/event_data"
EventData.id = 0 #for test, initializing id...

week = null
date = new Date( 2012, 10, 21 )
options =
	holidays : [
		date : new Date( 2012, 10, 23 ),
		name : "勤労感謝の日"
	]
	events : [
		new EventData
			start : new Date( 2012, 10, 21 )
			end : new Date( 2012, 10, 21 )
			title : "AAAAA"
			text : "BBBBB"
			category : "info",
		new EventData
			start : new Date( 2012, 10, 10 )
			end : new Date( 2012, 10, 10 )
			title : "XXXXX"
			text : "YYYYY"
			category : "news",
		new EventData
			start : new Date( 2012, 10, 10 )
			end : new Date( 2012, 11, 30 )
			title : "ABCABC"
			text : "XYZXYZ"
			category : "info"
	]

describe 'week.coffee', ->
	before ->
		EventData.id = 0
		settings.graphTypes = [
			name : "info"
			title : "インフォメーション"
			no : 1,
			name : "news"
			title : "ニュース"
			no : 2
		]
		week = new Week( date, options );

	describe "date", ->
		it "startDateはDateオブジェクト", ->
			week.startDate.should.be.a("date")
		it "startDateは2012年10月19日", ->
			d = week.startDate
			d.getFullYear().should.equal(2012)
			d.getMonth().should.equal(10)
			d.getDate().should.equal(19)
		it "startDateは月曜日", ->
			week.startDate.getDay().should.equal(settings.dayStartInWeek)
		it "endDataはDateオブジェクト", ->
			week.endDate.should.be.a("date")
		it "endDateは2012年10月26日", ->
			d = week.endDate
			d.getFullYear().should.equal(2012)
			d.getMonth().should.equal(10)
			d.getDate().should.equal(25)
		it "endDateは日曜日", ->
			week.endDate.getDay().should.equal( ( settings.dayStartInWeek + 6 ) % 7)
		it "yearは2012", ->
			week.should.have.property("year").with.equal(2012)
		it "monthは11", ->
			week.should.have.property("month").with.equal(11)

	describe "events", ->
		it "eventsはイベントを持つ", ->
			week.should.have.property("events")
		it "eventsは2つ", ->
			week.events.should.length(2)

	describe "calendar", ->
		it "calendarの長さは7", ->
			week.calendar.should.length(7)
		describe "calendar[0]", ->
			it "カレンダーの日付は19", ->
				week.calendar[0].dayNum.should.equal(19)
			it "カレンダーの日付は2012年11月19日", ->
				week.calendar[0].date.getFullYear().should.equal(2012)
				week.calendar[0].date.getMonth().should.equal(10)
				week.calendar[0].date.getDate().should.equal(19)
			it "祝日はnull", ->
				should.equal( week.calendar[0].holiday, null )
			it "イベントの長さは1", ->
				week.calendar[0].events.should.length(1)
		describe "calendar[3]", ->
			it "イベントの長さは2", ->
				week.calendar[2].events.should.length(2)
		describe "calendar[5]", ->
			it "祝日は‘勤労感謝の日’", ->
				week.calendar[4].holiday.name.should.equal("勤労感謝の日")
			describe "event", ->
				it "イベントの長さは1", ->
					week.calendar[4].events.should.length(1)
				it "イベントのtitleはABCABC", ->
					week.calendar[4].events[0].title.should.equal("ABCABC")
				it "イベントのtextはXYZXYZ", ->
					week.calendar[4].events[0].text.should.equal("XYZXYZ")
				it "イベントのcategoryのnameはinfo", ->
					week.calendar[4].events[0].category.name.should.equal("info")
				it "イベントのcategoryのtitleは’おしらせ’", ->
					week.calendar[4].events[0].category.title.should.equal("おしらせ")

describe "week.coffee 祝日を内部処理で行う場合", ->
	before ->
		options =
			events : [
				new EventData
					start : new Date( 2012, 10, 21 )
					end : new Date( 2012, 10, 21 )
					title : "AAAAA"
					text : "BBBBB"
					category : "info",
				new EventData
					start : new Date( 2012, 10, 10 )
					end : new Date( 2012, 10, 10 )
					title : "XXXXX"
					text : "YYYYY"
					category : "news",
				new EventData
					start : new Date( 2012, 10, 10 )
					end : new Date( 2012, 11, 30 )
					title : "ABCABC"
					text : "XYZXYZ"
					category : "info"
			]
		week = new Week( date, options );

	describe "calendar", ->
		describe "calendar[0]", ->
			it "祝日ではない", ->
				should.equal( week.calendar[0].holiday, null )
		describe "calendar[4]", ->
			it "祝日がある", ->
				week.calendar[4].holiday.should.not.be.null
			it "祝日の名前は勤労感謝の日", ->
				week.calendar[4].holiday.name.should.be.equal("勤労感謝の日")