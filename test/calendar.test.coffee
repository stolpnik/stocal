chai              = require 'chai'
expect            = chai.expect
should            = chai.should()

Calendar          = require "../src/coffee/calendar"
Month             = require "../src/coffee/month"
settings          = require "../src/coffee/calendar_settings"
EventData         = require "../src/coffee/event_data"

describe "Calendar", ->
	describe "properties", ->
		cal = null
		options = null
		date = null
		before ->
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
			settings.graphTypes =[
				name : "test"
				title : "てすと"
				no : 1
			]
			date = new Date(2012,10,12)
			cal = new Calendar( date, options )

		it "has a month data", ->
			cal.should.have.property("month").be.an.instanceof( Month )
		it "has a optional data", ->
			cal.should.have.property("options").be.a( "object" ).with.equal( options )
		it "has a date", ->
			cal.should.have.property("date").be.equal( date )