chai              = require 'chai'
expect            = chai.expect
should            = chai.should()

CalendarUtils     = require "../src/coffee/calendar_utils"
settings          = require "../src/coffee/calendar_settings"

describe "CalendarUtils", ->
	describe "correctData", ->
		it "if date supplied is date object, return data should be date object", ->
			date = new Date()
			CalendarUtils.correctDate( date ).should.be.a("date").with.equal( date )
		it "if a date object created from date supplied has method getDate, return data should be date supplied data", ->
			CalendarUtils.correctDate( "2012/12/10").should.be.a("string").with.equal( "2012/12/10" )
		it "if a date supplied like 2012/12/10+10:00, return 2012/12/10+1000", ->
			CalendarUtils.correctDate( "2012/12/10+10:00").should.be.a("string").with.equal( "2012/12/10+1000" )
		it "if a date supplied like 2012-12-10+10:00, return 2012/12/10+1000", ->
			CalendarUtils.correctDate( "2012-12-10+10:00").should.be.a("string").with.equal( "2012/12/10+1000" )

	describe "isLeapYear", ->
		it "2012 is a LeapYear", ->
			CalendarUtils.isLeapYear(2012).should.be.true
		it "2013 is not a LeapYear", ->
			CalendarUtils.isLeapYear(2013).should.be.false
		it "2000 is a LeapYear", ->
			CalendarUtils.isLeapYear(2000).should.be.true
		it "2100 is not a LeapYear", ->
			CalendarUtils.isLeapYear(2100).should.be.false
	describe "genOptions", ->
		options = null
		it "if no option supplied, return default value", ->
			options = null
			o = CalendarUtils.genOptions options
			o.should.be.equal settings
		it "update options", ->
			o = CalendarUtils.genOptions { mode : "month" }
			o.mode.should.be.equal "month"
		it "add new options", ->
			should.equal( settings.someNewOptions, undefined )
			o = CalendarUtils.genOptions { someNewOptions : "yes" }
			o.someNewOptions.should.be.equal settings.someNewOptions
	describe "getDateMax", ->
		describe "if leap year : ex) 2012", ->
			year = 2012
			month = 0
			days = [31,29,31,30,31,30,31,31,30,31,30,31]
			for i in [0...12]
				it "#{year}/#{i+1} has #{days[i]} days", ->
					dnum = days[month]
					CalendarUtils.getDateMax(new Date(year, month)).should.be.equal(dnum)
					month += 1
		describe "if not leap year : ex ) 2013", ->
			year = 2013
			month = 0
			days = [31,28,31,30,31,30,31,31,30,31,30,31]
			for i in [0...12]
				it "#{year}/#{i+1} has #{days[i]} days", ->
					dnum = days[month]
					CalendarUtils.getDateMax(new Date(year, month)).should.be.equal(dnum)
					month += 1
	describe "getMonthData", ->
		it "return a object", ->
			CalendarUtils.getMonthData().should.be.a("object")
		describe "about return data", ->
			dates = [
				new Date( 2012, 11, 10 )
				new Date( 2012, 1, 10 )
				new Date( 2011, 1, 8 )
				new Date( 2013, 10, 10 )
			]
			dateMaxes = [
				31
				29
				28
				30
			]
			firstDays = [
				6
				3
				2
				5
			]
			isLeapYears = [
				true
				true
				false
				false
			]
			date = null
			cdata = null
			dateMax = null
			firstDay = null
			isLeapYear = null
			count = 0
			for i in [0...dates.length]
				date = dates[i]
				describe "#{date.toString()}", ->
					before ->
						date = dates[count]
						dateMax = dateMaxes[count]
						firstDay = firstDays[count]
						isLeapYear = isLeapYears[count]
						cdata = CalendarUtils.getMonthData date
						count++
					it "has a year", ->
						cdata.should.have.property("year").with.be.equal(date.getFullYear())
					it "has a month", ->
						cdata.should.have.property("month").with.be.equal(date.getMonth()+1)
					it "has a firstDay", ->
						cdata.should.have.property("firstDay").with.be.equal(firstDay)
					it "has a isLeapYear", ->
						cdata.should.have.property("isLeapYear").with.be.equal(isLeapYear)
					it "has a dateMax", ->
						cdata.should.have.property("dateMax").with.be.equal(dateMax)
	describe "getPrevMonthData", ->
		it "return a object", ->
			CalendarUtils.getPrevMonthData().should.be.a("object")
		describe "about return data", ->
			dates = [
				new Date( 2013, 0, 10 )
				new Date( 2012, 2, 10 )
				new Date( 2011, 2, 8 )
				new Date( 2013, 11, 10 )
			]
			years = [
				2012
				2012
				2011
				2013
			]
			months = [
				12
				2
				2
				11
			]
			dateMaxes = [
				31
				29
				28
				30
			]
			firstDays = [
				6
				3
				2
				5
			]
			isLeapYears = [
				true
				true
				false
				false
			]
			year = null
			month = null
			date = null
			cdata = null
			dateMax = null
			firstDay = null
			isLeapYear = null
			count = 0
			for i in [0...dates.length]
				date = dates[i]
				describe "#{date.toString()}", ->
					before ->
						year = years[count]
						month = months[count]
						date = dates[count]
						dateMax = dateMaxes[count]
						firstDay = firstDays[count]
						isLeapYear = isLeapYears[count]
						cdata = CalendarUtils.getPrevMonthData date
						count++
					it "has a year", ->
						cdata.should.have.property("year").with.be.equal(year)
					it "has a month", ->
						cdata.should.have.property("month").with.be.equal(month)
					it "has a firstDay", ->
						cdata.should.have.property("firstDay").with.be.equal(firstDay)
					it "has a isLeapYear", ->
						cdata.should.have.property("isLeapYear").with.be.equal(isLeapYear)
					it "has a dateMax", ->
						cdata.should.have.property("dateMax").with.be.equal(dateMax)
	describe "getNextMonthData", ->
		it "return a object", ->
			CalendarUtils.getNextMonthData().should.be.a("object")
		describe "about return data", ->
			dates = [
				new Date( 2012, 11, 10 )
				new Date( 2012, 0, 10 )
				new Date( 2011, 0, 8 )
				new Date( 2013, 9, 10 )
			]
			years = [
				2013
				2012
				2011
				2013
			]
			months = [
				1
				2
				2
				11
			]
			dateMaxes = [
				31
				29
				28
				30
			]
			firstDays = [
				2
				3
				2
				5
			]
			isLeapYears = [
				false
				true
				false
				false
			]
			year = null
			month = null
			date = null
			cdata = null
			dateMax = null
			firstDay = null
			isLeapYear = null
			count = 0
			for i in [0...dates.length]
				date = dates[i]
				describe "#{date.toString()}", ->
					before ->
						year = years[count]
						month = months[count]
						date = dates[count]
						dateMax = dateMaxes[count]
						firstDay = firstDays[count]
						isLeapYear = isLeapYears[count]
						cdata = CalendarUtils.getNextMonthData date
						count++
					it "has a year", ->
						cdata.should.have.property("year").with.be.equal(year)
					it "has a month", ->
						cdata.should.have.property("month").with.be.equal(month)
					it "has a firstDay", ->
						cdata.should.have.property("firstDay").with.be.equal(firstDay)
					it "has a isLeapYear", ->
						cdata.should.have.property("isLeapYear").with.be.equal(isLeapYear)
					it "has a dateMax", ->
						cdata.should.have.property("dateMax").with.be.equal(dateMax)