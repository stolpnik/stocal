/*
* Calendar class
* @class Calendar
* @method next
* @method prev
*/

var Calendar, CalendarUtils, Month, _ref, _ref1;

Month = ((_ref = this.stocal) != null ? _ref.Month : void 0) || require("./month");

CalendarUtils = ((_ref1 = this.stocal) != null ? _ref1.CalendarUtils : void 0) || require("./calendar_utils");

Calendar = (function() {

  function Calendar(date, options) {
    this.date = date;
    this.events = [];
    this.month = new Month(date, options);
    this.options = options;
  }

  Calendar.prototype.month = null;

  Calendar.prototype.date = null;

  Calendar.prototype.options = null;

  Calendar.prototype.events = null;

  /*
  	* get nextMonth
  */


  Calendar.prototype.nextMonth = function() {
    var data;
    data = CalendarUtils.getNextMonthData(this.date);
    return new Calendar(data.year, data.month);
  };

  /*
  	* get prevMonth
  */


  Calendar.prototype.prevMonth = function() {
    var data;
    data = CalendarUtils.getPrevMonthData(this.date);
    return new Calendar(data.year, data.month);
  };

  return Calendar;

})();

this.stocal || (this.stocal = {});

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = Calendar;
} else {
  this.stocal.Calendar = Calendar;
}
