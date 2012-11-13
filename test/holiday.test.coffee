chai              = require 'chai'
expect            = chai.expect
should            = chai.should()

Holiday = require "../src/coffee/holiday"

describe "Holiday class", ->
	describe "1月", ->
		it "2012/1/1は元旦", ->
			h = new Holiday( new Date(2012,0,1) )
			h.name.should.be.equal("元旦")
		it "2012/1/9は成人の日", ->
			h = new Holiday( new Date(2012,0,9) )
			h.name.should.be.equal("成人の日")
	describe "2月", ->
		it "2012/2/11は建国記念日", ->
			h = new Holiday( new Date(2012,1,11) )
			h.name.should.be.equal("建国記念日")
		it "2018/2/11は建国記念日", ->
			h = new Holiday( new Date(2018,1,11) )
			h.name.should.be.equal("建国記念日")
		it "2018/2/11は日曜日", ->
			h = new Holiday( new Date(2018,1,11) )
			h.date.getDay().should.be.equal(0)
		it "2018/2/12は振替休日", ->
			h = new Holiday( new Date(2018,1,12) )
			h.name.should.be.equal("振替休日")
	describe "3月", ->
		it "2015/3/20は春分の日", ->
			h = new Holiday( new Date(2012,2,20) )
			h.name.should.be.equal("春分の日")
		it "2015/3/21は春分の日", ->
			h = new Holiday( new Date(2015,2,21) )
			h.name.should.be.equal("春分の日")
		it "2016/3/20は春分の日", ->
			h = new Holiday( new Date(2016,2,20) )
			h.name.should.be.equal("春分の日")
		it "2016/3/20は日曜日", ->
			h = new Holiday( new Date(2016,2,20) )
			h.date.getDay().should.be.equal(0)
		it "2016/3/21は振替休日", ->
			h = new Holiday( new Date(2016,2,21) )
			h.name.should.be.equal("振替休日")
	describe "4月", ->
		it "2012/4/29は昭和の日", ->
			h = new Holiday( new Date(2012,3,29) )
			h.name.should.be.equal("昭和の日")
		it "2012/4/29は日曜日", ->
			h = new Holiday( new Date(2012,3,29) )
			h.date.getDay().should.be.equal(0)
		it "2012/4/30は振替休日", ->
			h = new Holiday( new Date(2012,3,30) )
			h.name.should.be.equal("振替休日")
	describe "5月", ->
		describe "憲法記念日", ->
			it "2012/5/3は憲法記念日", ->
				h = new Holiday( new Date(2012,4,3) )
				h.name.should.be.equal("憲法記念日")
			it "2015/5/3は憲法記念日", ->
				h = new Holiday( new Date(2015,4,3) )
				h.name.should.be.equal("憲法記念日")
			it "2015/5/3は日曜日", ->
				h = new Holiday( new Date(2015,4,3) )
				h.date.getDay().should.be.equal(0)
			it "2015/5/4はみどりの日", ->
				h = new Holiday( new Date(2015,4,4) )
				h.name.should.be.equal("みどりの日")
			it "2015/5/5はこどもの日", ->
				h = new Holiday( new Date(2015,4,5) )
				h.name.should.be.equal("こどもの日")
			it "2015/5/6は振替休日", ->
				h = new Holiday( new Date(2015,4,6) )
				h.name.should.be.equal("振替休日")
		describe "みどりの日", ->
			it "2012/5/4はみどりの日", ->
				h = new Holiday( new Date(2012,4,4) )
				h.name.should.be.equal("みどりの日")
			it "2014/5/4はみどりの日", ->
				h = new Holiday( new Date(2014,4,4) )
				h.name.should.be.equal("みどりの日")
			it "2014/5/4は日曜日", ->
				h = new Holiday( new Date(2014,4,4) )
				h.date.getDay().should.be.equal(0)
			it "2014/5/5はこどもの日", ->
				h = new Holiday( new Date(2014,4,5) )
				h.name.should.be.equal("こどもの日")
			it "2014/5/6は振替休日", ->
				h = new Holiday( new Date(2014,4,6) )
				h.name.should.be.equal("振替休日")
		describe "こどもの日", ->
			it "2012/5/5はこどもの日", ->
				h = new Holiday( new Date(2012,4,5) )
				h.name.should.be.equal("こどもの日")
			it "2013/5/5はこどもの日", ->
				h = new Holiday( new Date(2013,4,5) )
				h.name.should.be.equal("こどもの日")
			it "2013/5/5は日曜日", ->
				h = new Holiday( new Date(2013,4,5) )
				h.date.getDay().should.be.equal(0)
			it "2013/5/6は振替休日", ->
				h = new Holiday( new Date(2013,4,6) )
				h.name.should.be.equal("振替休日")
	describe "7月", ->
		it "2012/7/16は海の日", ->
			h = new Holiday( new Date(2012,6,16) )
			h.name.should.be.equal("海の日")
		it "2014/7/21は海の日", ->
			h = new Holiday( new Date(2014,6,21) )
			h.name.should.be.equal("海の日")
	describe "9月", ->
		it "2012/9/17は敬老の日", ->
			h = new Holiday( new Date(2012,8,17) )
			h.name.should.be.equal("敬老の日")
		it "2012/9/22は秋分の日", ->
			h = new Holiday( new Date(2012,8,22) )
			h.name.should.be.equal("秋分の日")
		it "2018/9/23は秋分の日", ->
			h = new Holiday( new Date(2018,8,23) )
			h.name.should.be.equal("秋分の日")
		it "2018/9/24は振替休日", ->
			h = new Holiday( new Date(2018,8,24) )
			h.name.should.be.equal("振替休日")
		it "2015/9/22は国民の休日", ->
			h = new Holiday( new Date(2015,8,22) )
			h.name.should.be.equal("国民の休日")
		it "2032/9/21は国民の休日", ->
			h = new Holiday( new Date(2032,8,21) )
			h.name.should.be.equal("国民の休日")
	describe "10月", ->
		it "2012/10/8は体育の日", ->
			h = new Holiday( new Date(2012,9,8) )
			h.name.should.be.equal("体育の日")
		it "2015/10/12は体育の日", ->
			h = new Holiday( new Date(2015,9,12) )
			h.name.should.be.equal("体育の日")
	describe "11月", ->
		it "2012/11/3は文化の日", ->
			h = new Holiday( new Date(2012,10,3) )
			h.name.should.be.equal("文化の日")
		it "2013/11/3は文化の日", ->
			h = new Holiday( new Date(2013,10,3) )
			h.name.should.be.equal("文化の日")
		it "2013/11/4は振替休日", ->
			h = new Holiday( new Date(2013,10,4) )
			h.name.should.be.equal("振替休日")
		it "2012/11/23は勤労感謝の日", ->
			h = new Holiday( new Date(2012,10,23) )
			h.name.should.be.equal("勤労感謝の日")
		it "2014/11/23は勤労感謝の日", ->
			h = new Holiday( new Date(2014,10,23) )
			h.name.should.be.equal("勤労感謝の日")
		it "2014/11/24は振替休日", ->
			h = new Holiday( new Date(2014,10,24) )
			h.name.should.be.equal("振替休日")
	describe "12月", ->
		it "2012/12/23は天皇誕生日", ->
			h = new Holiday( new Date(2012,11,23) )
			h.name.should.be.equal("天皇誕生日")
		it "2012/12/24は振替休日", ->
			h = new Holiday( new Date(2012,11,24) )
			h.name.should.be.equal("振替休日")
		it "2025/12/23は天皇誕生日", ->
			h = new Holiday( new Date(2025,11,23) )
			h.name.should.be.equal("天皇誕生日")