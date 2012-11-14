/*
* Month
* @class 月を表すクラス
* @param date {Date} 月の初めの日を表すDateオブジェクト
* @param options {Object} オプション
*/

var $, EventType, Month, Week, settings, util, _ref, _ref1, _ref2, _ref3;

util = ((_ref = this.stocal) != null ? _ref.CalendarUtils : void 0) || require("./calendar_utils");

settings = ((_ref1 = this.stocal) != null ? _ref1.settings : void 0) || require("./calendar_settings");

Week = ((_ref2 = this.stocal) != null ? _ref2.Week : void 0) || require("./week");

EventType = ((_ref3 = this.stocal) != null ? _ref3.EventType : void 0) || require("./event_type");

$ = $ || require("jquery");

Month = (function() {

  function Month(date, options) {
    var calArray, d, dateMax, dates, day, dayCount, endDate, events, firstDay, isLeapYear, month, start, startDate, week, weekCount, weeks, year, _i, _j, _len, _len1, _ref4, _ref5;
    if (date == null) {
      date = null;
    }
    if (options == null) {
      options = null;
    }
    start = settings.dayStartInWeek;
    if (date == null) {
      d = new Date;
    } else {
      d = date;
    }
    year = d.getFullYear();
    month = d.getMonth() + 1;
    firstDay = new Date(year, month - 1).getDay();
    date = d.getDate();
    isLeapYear = util.isLeapYear(year);
    dateMax = util.getDateMax(d);
    events = (options != null ? options.events : void 0) || [];
    weeks = [];
    weekCount = 1;
    dayCount = 1;
    while (dayCount <= dateMax) {
      week = new Week(new Date(year, month - 1, dayCount), options);
      if (week.startDate.getMonth() + 1 === month) {
        dayCount += 7;
      } else {
        dayCount = week.endDate.getDate() + 1;
      }
      weeks.push(week);
    }
    startDate = new Date(year, month - 1, 1);
    endDate = new Date(year, month - 1, dateMax);
    calArray = [];
    dates = [];
    for (_i = 0, _len = weeks.length; _i < _len; _i++) {
      week = weeks[_i];
      _ref4 = week.calendar;
      for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
        day = _ref4[_j];
        if ((startDate <= (_ref5 = day.date) && _ref5 <= endDate)) {
          dates.push(day);
        }
        calArray.push(day);
      }
    }
    this.date = d;
    this.year = year;
    this.month = month;
    this.firstDay = firstDay;
    this.isLeapYear = isLeapYear;
    this.dateMax = dateMax;
    this.weeks = weeks;
    this.calendar = calArray;
    this.options = options;
    this.dates = dates;
    if (options != null ? options.events : void 0) {
      this.initEvents(options.events);
    }
  }

  Month.prototype.initEvents = function(events) {
    var categories, categoriesBase, category, categoryTitles, cats, endDate, event, eventType, i, startDate, _i, _j, _k, _len, _len1, _len2, _ref4, _ref5, _ref6, _ref7;
    cats = {};
    categoryTitles = [];
    categoriesBase = $.extend(true, [], settings.graphTypes);
    categories = [];
    this.events || (this.events = []);
    startDate = this.weeks[0].calendar[0].date;
    endDate = this.weeks[this.weeks.length - 1].calendar[6].date;
    for (i = _i = 0, _len = events.length; _i < _len; i = ++_i) {
      event = events[i];
      if ((startDate <= (_ref4 = event.start) && _ref4 <= endDate) || (startDate <= (_ref5 = event.end) && _ref5 <= endDate) || (event.start <= startDate && endDate <= event.end)) {
        this.events.push(event);
      }
    }
    for (_j = 0, _len1 = categoriesBase.length; _j < _len1; _j++) {
      category = categoriesBase[_j];
      eventType = new EventType(category);
      _ref6 = this.events;
      for (_k = 0, _len2 = _ref6.length; _k < _len2; _k++) {
        event = _ref6[_k];
        if (((_ref7 = event.category) != null ? _ref7.name : void 0) === category.name) {
          eventType.events.push(event);
        }
      }
      categories.push(eventType);
    }
    this.categories = categories;
  };

  return Month;

})();

this.stocal || (this.stocal = {});

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = Month;
} else {
  this.stocal.Month = Month;
}
