chai              = require 'chai'
expect            = chai.expect
chai.should()

settings = require "../src/coffee/calendar_settings"
EventData = require "../src/coffee/event_data"

eventData1 = null
eventData2 = null
date = new Date( 2012, 10, 21 )
data1 =
	start:new Date( 2012, 10, 20 )
	end: new Date( 2012, 10, 30 )
	title : "test1"
	text : "test1です。"
	url : "http://www.yahoo.co.jp/"
	category : "test"

describe "EventDataについて", ->
	beforeEach ->
		EventData.id = 0
		eventData1 = new EventData(data1)
		settings.graphTypes = [
			{ name : "test", title : "テスト", no : 1 }
		]

	describe "propeties", ->

		it "eventData1のidは0", ->
			eventData1.should.have.property("id").with.equal(0)

		it "eventDataのdataはdata1", ->
			eventData1.should.have.property("data").with.equal(data1)

		it "eventData1のurlはhttp://www.yahoo.co.jp/", ->
			eventData1.should.have.property("url").with.equal("http://www.yahoo.co.jp/")

		it "eventData1のstartはdateオブジェクトでeventData1.start - data1.start is 0", ->
			eventData1.should.have.property("start").with.be.a("date")
			(eventData1.start - data1.start).should.equal(0)

		it "eventData1のendはdateオブジェクトでeventData1.end - data1.end is 0", ->
			eventData1.should.have.property("end").with.be.a("date")
			(eventData1.end - data1.end).should.equal(0)

		it "eventData1のtotalStartはstringで11/20", ->
			eventData1.should.have.property("totalStart").with.be.a("string")
			(eventData1.totalStart).should.equal("11/20")

		it "eventData1のtotalEndはstringで11/30", ->
			eventData1.should.have.property("totalEnd").with.be.a("string")
			(eventData1.totalEnd).should.equal("11/30")

		it "eventData1のtitleはstringでtest1", ->
			eventData1.should.have.property("title").with.be.a("string")
			(eventData1.title).should.equal("test1")

		it "eventData1のtextはstringでtest1です。", ->
			eventData1.should.have.property("text").with.be.a("string")
			(eventData1.text).should.equal("test1です。")

		it "eventData1のcategoryはobjectで‘テスト’です。", ->
			eventData1.should.have.property("category").with.be.a("object")
			eventData1.category.should.have.property("title").with.equal("テスト")
