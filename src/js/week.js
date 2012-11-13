/*
* @class Week
* 週を表すクラス
* @param
*/

var Holiday, Week, settings, util, _ref, _ref1, _ref2;

settings = ((_ref = this.stocal) != null ? _ref.settings : void 0) || require("./calendar_settings");

util = ((_ref1 = this.stocal) != null ? _ref1.CalendarUtils : void 0) || require("./calendar_utils");

Holiday = ((_ref2 = this.stocal) != null ? _ref2.Holiday : void 0) || require("./holiday");

Week = (function() {

  Week.prototype.startDate = null;

  Week.prototype.endDate = null;

  Week.prototype.year = null;

  Week.prototype.month = null;

  Week.prototype.events = null;

  Week.prototype.options = null;

  Week.prototype.calendar = null;

  Week.prototype.start = null;

  Week.prototype.end = null;

  function Week(startDate, options) {
    var d, date, dateMax, day, dayCount, dayEvents, dayStartInWeek, endDate, event, eventData, events, firstDay, holiday, i, isLeapYear, m, month, prev, startOfWeek, wd, week, y, year, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _n, _ref3, _ref4, _ref5;
    if (startDate == null) {
      startDate = null;
    }
    if (options == null) {
      options = null;
    }
    if (startDate == null) {
      d = new Date();
    } else {
      d = startDate;
    }
    firstDay = d.getDay();
    date = d.getDate();
    year = d.getFullYear();
    month = d.getMonth() + 1;
    dayStartInWeek = settings.dayStartInWeek;
    if (firstDay === dayStartInWeek) {
      startOfWeek = date;
    } else {
      startOfWeek = date - (7 + firstDay - dayStartInWeek) % 7;
      if (startOfWeek < 1) {
        prev = util.getPrevMonthData(d);
        startOfWeek = prev.dateMax + startOfWeek;
        d = new Date(year, month - 2, startOfWeek);
      } else {
        d = new Date(year, month - 1, startOfWeek);
      }
    }
    startDate = d;
    firstDay = d.getDay();
    year = d.getFullYear();
    month = d.getMonth() + 1;
    date = d.getDate();
    isLeapYear = util.isLeapYear(year);
    if (month === 2) {
      if (isLeapYear) {
        dateMax = 29;
      } else {
        dateMax = 28;
      }
    } else if (month === 2 || month === 4 || month === 6 || month === 9 || month === 11) {
      dateMax = 30;
    } else {
      dateMax = 31;
    }
    dayCount = date;
    eventData = options != null ? options.events : void 0;
    week = [];
    for (dayCount = _i = 0; _i < 7; dayCount = ++_i) {
      date = startOfWeek + dayCount;
      if (date > dateMax) {
        date -= dateMax;
        if (month === 12) {
          m = 1;
          y = year + 1;
        } else {
          m = month + 1;
          y = year;
        }
        wd = new Date(y, m - 1, date);
      } else {
        y = year;
        m = month;
        wd = new Date(year, month - 1, date);
      }
      dayEvents = [];
      if (eventData) {
        for (i = _j = 0, _len = eventData.length; _j < _len; i = ++_j) {
          event = eventData[i];
          if ((event.start <= wd && wd <= event.end)) {
            dayEvents.push(event);
          }
        }
      }
      week.push({
        dayNum: date,
        date: wd,
        day: firstDay + dayCount,
        holiday: null,
        events: dayEvents
      });
    }
    endDate = week[6].date;
    events = [];
    if (eventData) {
      for (i = _k = 0, _len1 = eventData.length; _k < _len1; i = ++_k) {
        event = eventData[i];
        if ((startDate <= (_ref3 = event.start) && _ref3 <= endDate) || (startDate <= (_ref4 = event.end) && _ref4 <= endDate) || (event.start <= startDate && endDate <= event.end)) {
          events.push(event);
        }
      }
    }
    if (options != null ? options.holidays : void 0) {
      _ref5 = options.holidays;
      for (i = _l = 0, _len2 = _ref5.length; _l < _len2; i = ++_l) {
        holiday = _ref5[i];
        for (dayCount = _m = 0, _len3 = week.length; _m < _len3; dayCount = ++_m) {
          day = week[dayCount];
          if (day.date.getTime() === holiday.date.getTime()) {
            day.holiday = {
              name: holiday.name
            };
          }
        }
      }
    } else {
      null;
      for (dayCount = _n = 0, _len4 = week.length; _n < _len4; dayCount = ++_n) {
        day = week[dayCount];
        holiday = new Holiday(day.date);
        day.holiday = holiday.name ? holiday : null;
      }
    }
    this.d = d;
    this.startDate = startDate;
    this.endDate = endDate;
    this.start = startDate;
    this.end = endDate;
    this.year = year;
    this.month = month;
    this.events = events;
    this.options = options;
    this.calendar = week;
  }

  return Week;

})();

this.stocal || (this.stocal = {});

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = Week;
} else {
  this.stocal.Week = Week;
}
