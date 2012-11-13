should = chai.should();

describe( "index.js", function(){
	it( "stocal", function(){
		stocal.CalendarUtils.isLeapYear(2012).should.true;
	} );
} );