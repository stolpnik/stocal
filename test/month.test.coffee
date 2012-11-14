chai              = require 'chai'
expect            = chai.expect
chai.should()

Month = require "../src/coffee/month"
settings = require "../src/coffee/calendar_settings"
month = null
date = new Date( 2012, 10, 20 )
options = {}

describe "Monthについて", ->
	describe "2012/10", ->
		before ->
			month = new Month( date, options )
		it "dateはDateオブジェクト", ->
			month.should.have.property("date").with.equal( date ).with.be.a("date")
		it "yearは2012", ->
			month.should.have.property("year").with.equal( 2012 )
		it "monthは11", ->
			month.should.have.property("month").with.equal( 11 )
		it "isLeapYearはtrue", ->
			month.should.have.property("isLeapYear").with.be.true
		it "firstDayは4", ->
			month.should.have.property("firstDay").with.equal( 4 )
		it "dateMaxは30", ->
			month.should.have.property("dateMax").with.equal( 30 )
		it "weeksの長さは5", ->
			month.should.have.property("weeks").with.length(5)
		it "calendarの長さは35", ->
			month.should.have.property("calendar").with.length(month.weeks.length * 7)
		it "datesの長さは30", ->
			month.should.have.property("dates").length(30)
		it "optionsはoptions", ->
			month.should.have.property("options").with.equal(options)
	describe "2012/2", ->
		settings.graphTypes =[
			name : "test"
			title : "てすと"
			no : 1
		]
		EventData = require "../src/coffee/event_data"

		before ->
			date = new Date(2012, 1)
			options =
				events :
					[new EventData(
						title     : "AAAAA"
						text      : "AAAAAAAAAAです"
						url       : "http://google.com/"
						category  : "test"
						start     : new Date(2012, 1, 10)
						end       : new Date(2012, 1, 15)
					),
					new EventData(
						title     : "BBBBB"
						text      : "BBBBBBBBBです"
						url       : "http://google.com/"
						category  : "test"
						start     : new Date(2012, 1, 10)
						end       : new Date(2012, 3, 15)
					),
					new EventData(
						title     : "CCCCC"
						text      : "CCCCCCCCCCです"
						url       : "http://www.yahoo.com/"
						category  : "test"
						start     : new Date(2012, 1, 10)
						end       : new Date(2012, 1, 10)
					),
					new EventData(
						title     : "DDDDD"
						text      : "DDDDDDDDDDです"
						url       : "http://www.yahoo.com/"
						category  : "test"
						start     : new Date(2012, 0, 10)
						end       : new Date(2012, 0, 28)
					)]
			month = new Month( date, options )
		it "dateはDateオブジェクト", ->
			month.should.have.property("date").with.equal( date ).with.be.a("date")
		it "yearは2012", ->
			month.should.have.property("year").with.equal( 2012 )
		it "monthは11", ->
			month.should.have.property("month").with.equal( 2 )
		it "isLeapYearはtrue", ->
			month.should.have.property("isLeapYear").with.be.true
		it "firstDayは4", ->
			month.should.have.property("firstDay").with.equal( 3 )
		it "dateMaxは29", ->
			month.should.have.property("dateMax").with.equal( 29 )
		it "weeksの長さは5", ->
			month.should.have.property("weeks").with.length(5)
		it "calendarの長さは35", ->
			month.should.have.property("calendar").with.length(month.weeks.length * 7)
		it "datesの長さは29", ->
			month.should.have.property("dates").length(29)
		it "optionsはoptions", ->
			month.should.have.property("options").with.equal(options)
		describe "events", ->
			it "イベントの数は3", ->
				month.should.have.property("events").with.length(3)
			it "カテゴリーの数は1", ->
				month.should.have.property("categories").with.length(1)
			it "categories[0]のイベントの数は3", ->
				month.categories[0].events.should.length(3)