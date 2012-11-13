(function($){

/*
* Calendar settings
*/

var BASE_CELL_HEIGHT, BASE_CELL_WIDTH, CATEGORY_CLASS, CATEGORY_TITLE_WIDTH, CATEGORY_VERTICAL_MARGIN, CELL_MARGIN_TOP, CELL_MORE_CHARACTOR, DAY_CLASSES, DAY_NAMES, DAY_START_IN_WEEK, DEFAULT_MODE, FORCE_SORT, GRAPH_FOOT_WIDTH, GRAPH_HEAD_WIDTH, GRAPH_HEIGHT, GRAPH_MARGIN_LEFT, GRAPH_MARGIN_TOP, GRAPH_TIP_MARGIN_LEFT, GRAPH_TYPES, HOLIDAY_CLASS, SHOW_ALL_CATEGORY, SHOW_MAX, SHOW_MORE, WEEKDAY_CLASS, settings;

this.stocal = this.stocal || {};

BASE_CELL_HEIGHT = 128;

BASE_CELL_WIDTH = 128;

CATEGORY_CLASS = "category";

CATEGORY_TITLE_WIDTH = 250;

CATEGORY_VERTICAL_MARGIN = 3;

CELL_MARGIN_TOP = 30;

CELL_MORE_CHARACTOR = "…";

DAY_START_IN_WEEK = 1;

DAY_CLASSES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

DAY_NAMES = ["日", "月", "火", "水", "木", "金", "土"];

DEFAULT_MODE = "month";

HOLIDAY_CLASS = "holiday";

WEEKDAY_CLASS = "weekday";

FORCE_SORT = true;

GRAPH_HEIGHT = 20;

GRAPH_MARGIN_TOP = 2;

GRAPH_MARGIN_LEFT = 10;

GRAPH_HEAD_WIDTH = 18;

GRAPH_FOOT_WIDTH = 18;

GRAPH_TIP_MARGIN_LEFT = 20;

GRAPH_TYPES = [
  {
    name: "shop",
    title: "ショップニュース情報",
    no: 1
  }, {
    name: "event",
    title: "イベント情報",
    no: 2
  }, {
    name: "info",
    title: "おしらせ",
    no: 3
  }, {
    name: "renew",
    title: "店舗改装情報",
    no: 4
  }
];

SHOW_MAX = 3;

SHOW_MORE = false;

SHOW_ALL_CATEGORY = true;

settings = {
  baseCellHeight: BASE_CELL_HEIGHT,
  baseCellWidth: BASE_CELL_WIDTH,
  categoryClass: CATEGORY_CLASS,
  categoryTitleWidth: CATEGORY_TITLE_WIDTH,
  categoryVerticalMargin: CATEGORY_VERTICAL_MARGIN,
  cellMoreCharactor: CELL_MORE_CHARACTOR,
  cellMarginTop: CELL_MARGIN_TOP,
  dayClasses: DAY_CLASSES,
  dayNames: DAY_NAMES,
  dayStartInWeek: DAY_START_IN_WEEK,
  graphHeight: GRAPH_HEIGHT,
  graphMarginTop: GRAPH_MARGIN_TOP,
  graphMarginLeft: GRAPH_MARGIN_LEFT,
  graphHeadWidth: GRAPH_HEAD_WIDTH,
  graphFootWidth: GRAPH_FOOT_WIDTH,
  graphTipMarginLeft: GRAPH_TIP_MARGIN_LEFT,
  graphTypes: GRAPH_TYPES,
  holidayClass: HOLIDAY_CLASS,
  mode: DEFAULT_MODE,
  showAllCategory: SHOW_ALL_CATEGORY,
  showMax: SHOW_MAX,
  showMore: SHOW_MORE,
  sort: FORCE_SORT,
  weekdayClass: WEEKDAY_CLASS
};

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = settings;
} else {
  this.stocal.settings = settings;
}

var $, CalendarUtils, _correctDate, _genOptions, _getDateMax, _getMonthData, _getNextMonthData, _getPrevMonthData, _isLeapYear;

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  $ = $ || require("jquery");
}

/*
* 与えられた配列に祝日情報を付与する
* @param year {Number}
* @param month {Number}
* @param dateMax {Number} 月の最大日数
* @param firstDay {Number} 月の最初の曜日
* @param days {Array} 祝日を付与する日付オブジェクトを格納した配列
* @return {Array}
*/


/*
_setHolidays = (year, month, dateMax, firstDay, days) ->
	#days = new Array(dateMax)
	#firstSunday = if firstDay is 0 then 1 else 8 - firstDay
	if firstDay is 0
		firstSunday = 1
	else if firstDay is 1
		firstSunday = 0
	else
		firstSunday = 8 - firstDay

	if firstDay is 1
		firstMonday = 1
	else if firstDay is 0
		firstMonday = 2
	else
		firstMonday = 9 - firstDay

	if month is 1
		days[1].holiday = { name : "元旦" }
		days[2].holiday = { name : "振替休日" } if firstSunday is 1
		days[firstMonday + 7].holiday = { name : "成人の日" }
	else if month is 2
		days[11].holiday = { name : "建国記念日" }
		days[12].holiday = { name : "振替休日" } if 11 % 7 is firstSunday
	else if month is 3
		date = Math.floor( 20.8431 + 0.242194 * ( year - 1980 )) - Math.floor( ( year - 1980 ) / 4 )
		days[ date ].holiday = { name : "春分の日" }
		days[date + 1].holiday = { name : "振替休日" } if date % 7 is firstSunday
	else if month is 4
		days[29].holiday = { name : "昭和の日" }
		days[30].holiday = { name : "振替休日" } if 29 % 7 is firstSunday
	else if month is 5
		days[3].holiday = { name : "憲法記念日" }
		days[4].holiday = { name : "みどりの日" }
		days[5].holiday = { name : "こどもの日" }
		days[6].holiday = { name : "振替休日" } if 3 % 7 is firstSunday or 4 % 7 is firstSunday or 5 % 7 is firstSunday
	else if month is 7
		days[firstMonday + 14].holiday = { name : "海の日" }
	else if month is 9
		days[firstMonday + 14].holiday = { name : "敬老の日" }
		date = Math.floor( 23.2488 + 0.242194 * ( year - 1980 )) - Math.floor( ( year - 1980 ) / 4 )
		days[ date ].holiday = { name : "秋分の日" }
		days[date + 1].holiday = { name : "振替休日" } if date % 7 is firstSunday
	else if month is 10
		days[firstMonday + 7].holiday = { name : "体育の日" }
	else if month is 11
		days[3].holiday = { name : "文化の日" }
		days[4].holiday = { name : "振替休日" } if 3 is firstSunday
		days[23].holiday = { name : "勤労感謝の日" }
		days[24].holiday = { name : "振替休日" } if 23 % 7 is firstSunday
	else if month is 12
		days[23].holiday = { name : "天皇誕生日" }
		days[24].holiday = { name : "振替休日" } if 23 % 7 is firstSunday
	return days
*/


/**
* 閏年かどうかを判定する
* @param year {Number}
* @return {Boolean}
*/


_isLeapYear = function(year) {
  if (year % 4 !== 0) {
    return false;
  } else if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else {
    return true;
  }
};

/**
* ある月の最後の日付を取得する
* @param date {Date}
* @return {Number} 1-31
*/


_getDateMax = function(date) {
  var dateMax, isLeapYear, month, year;
  year = date.getFullYear();
  month = date.getMonth() + 1;
  isLeapYear = _isLeapYear(year);
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
  return dateMax;
};

/*
* 与えられたオプションオブジェクトをデフォルトとマージして返す
* @param option {Object}
* @return {Object} マージしたオプションオブジェクト
*/


_genOptions = function(options) {
  var settings, _ref;
  if (options == null) {
    options = null;
  }
  /*
  	return $.extend(
  		mode : settings.mode
  		dayStartInWeek : settings.dayStartInWeek
  		showMore : settings.showMore
  		showMax : settings.showMax
  	, options )
  */

  settings = ((_ref = this.stocal) != null ? _ref.settings : void 0) || require("./calendar_settings");
  return $.extend(settings, options);
};

/*
* 月のデータを返す
* @param date {Date}
*/


_getMonthData = function(date) {
  var dateMax, firstDay, firstOfMonth, isLeapYear, month, year;
  if (date == null) {
    date = new Date();
  }
  firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay = firstOfMonth.getDay();
  year = date.getFullYear();
  month = date.getMonth() + 1;
  isLeapYear = _isLeapYear(year);
  dateMax = _getDateMax(date);
  return {
    year: year,
    month: month,
    firstDay: firstDay,
    isLeapYear: isLeapYear,
    dateMax: dateMax
  };
};

/*
* 前月のデータを返す
* @param date {Date}
*/


_getPrevMonthData = function(date) {
  var baseMonth, baseYear, month, year;
  if (date == null) {
    date = new Date();
  }
  baseMonth = date.getMonth() + 1;
  baseYear = date.getFullYear();
  month = baseMonth === 1 ? 12 : baseMonth - 1;
  year = baseMonth === 1 ? baseYear - 1 : baseYear;
  return _getMonthData(new Date(year, month - 1));
};

/*
* 次月のデータを返す
* @param date {Date}
*/


_getNextMonthData = function(date) {
  var baseMonth, baseYear, month, year;
  if (date == null) {
    date = new Date;
  }
  baseMonth = date.getMonth() + 1;
  baseYear = date.getFullYear();
  month = baseMonth === 12 ? 1 : baseMonth + 1;
  year = baseMonth === 12 ? baseYear + 1 : baseYear;
  return _getMonthData(new Date(year, month - 1));
};

/**
* _correctDate
* 渡された文字列がDateオブジェクトで取り扱えるかいろいろ試してみる
* @param date {String}
*/


_correctDate = function(date) {
  if (date instanceof Date) {
    return date;
  }
  if (new Date(date).getDate()) {
    return date;
  }
  date = date.replace(/(\+\d{1,2}):00/, "$100");
  if (new Date(date).getDate()) {
    return date;
  }
  date = date.replace(/(\d{4,})-(\d{1,2})-(\d{1,2})/, "$1/$2/$3");
  return date;
};

this.stocal || (this.stocal = {});

CalendarUtils = (function() {

  function CalendarUtils() {
    null;
  }

  /**
  	* _correctDate
  	* 渡された文字列がDateオブジェクトで取り扱えるかいろいろ試してみる
  	* @param date {String}
  */


  CalendarUtils.correctDate = _correctDate;

  /**
  	* isLeapYear
  	* @param year {Number}
  	* @return {Boolean}
  */


  CalendarUtils.isLeapYear = _isLeapYear;

  /**
  	* setHolidays
  	*
  	* @param year {Number}
  	* @param month {Number}
  	* @param dateMax {Number}
  	* @param firstDay {Number}
  	* @return {Array}
  */


  /*
  	* _genOptions
  	*
  */


  CalendarUtils.genOptions = _genOptions;

  CalendarUtils.getDateMax = _getDateMax;

  /*
  	* 月のデータを返す
  	* @param date {Date}
  	* @param options {Object}
  */


  CalendarUtils.getMonthData = _getMonthData;

  /*
  	* 前月のデータを返す
  	* @param date {Date}
  */


  CalendarUtils.getPrevMonthData = _getPrevMonthData;

  /*
  	* 次月のデータを返す
  	* @param date {Date}
  */


  CalendarUtils.getNextMonthData = _getNextMonthData;

  return CalendarUtils;

})();

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = CalendarUtils;
} else {
  this.stocal.CalendarUtils = CalendarUtils;
}

/**
* EventData class
* @class EventData
* @param eventData {Object} イベントのオブジェクト
*/

var EventData, settings, util, _ref, _ref1;

util = ((_ref = this.stocal) != null ? _ref.CalendarUtils : void 0) || require("./calendar_utils");

settings = ((_ref1 = this.stocal) != null ? _ref1.settings : void 0) || require("./calendar_settings");

EventData = (function() {

  EventData.prototype.id = null;

  EventData.prototype.data = null;

  EventData.prototype.category = null;

  EventData.prototype.start = null;

  EventData.prototype.totalStart = null;

  EventData.prototype.end = null;

  EventData.prototype.totalEnd = null;

  EventData.prototype.title = null;

  EventData.prototype.text = null;

  EventData.prototype.url = null;

  /** @constructs
  */


  function EventData(eventData) {
    var category, categoryName, event_type, i, _i, _len, _ref2;
    this.id = EventData.id++;
    this.data = eventData;
    categoryName = eventData.category;
    category = null;
    if (categoryName) {
      _ref2 = settings.graphTypes;
      for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
        event_type = _ref2[i];
        if (categoryName === event_type.name) {
          category = event_type;
          break;
        }
      }
    }
    eventData.end || (eventData.end = eventData.start);
    this.url = eventData.url;
    this.start = new Date(util.correctDate(eventData.start));
    this.totalStart = "" + (this.start.getMonth() + 1) + "/" + (this.start.getDate());
    this.end = new Date(util.correctDate(eventData.end));
    this.totalEnd = "" + (this.end.getMonth() + 1) + "/" + (this.end.getDate());
    this.title = eventData.title;
    this.text = eventData.text;
    this.category = category;
  }

  EventData.id = 0;

  return EventData;

})();

this.stocal || (this.stocal = {});

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = EventData;
} else {
  this.stocal.EventData = EventData;
}

var EventType;

EventType = (function() {

  function EventType(category) {
    this.category = category;
    this.events = [];
  }

  EventType.prototype.category = null;

  EventType.prototype.events = null;

  return EventType;

})();

this.stocal || (this.stocal = {});

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = EventType;
} else {
  this.stocal.EventType = EventType;
}

var Holiday;

Holiday = (function() {

  Holiday.prototype.name = null;

  Holiday.prototype.date = null;

  function Holiday(date, name) {
    var dayNum, firstDay, firstMonday, firstSunday, month, monthDate, syubun, syunbun, year;
    if (name == null) {
      name = null;
    }
    this.date = date;
    this.name = null;
    dayNum = date.getDate();
    monthDate = new Date(date.getFullYear(), date.getMonth());
    firstDay = monthDate.getDay();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    if (firstDay === 0) {
      firstSunday = 1;
    } else if (firstDay === 1) {
      firstSunday = 0;
    } else {
      firstSunday = 8 - firstDay;
    }
    if (firstDay === 1) {
      firstMonday = 1;
    } else if (firstDay === 0) {
      firstMonday = 2;
    } else {
      firstMonday = 9 - firstDay;
    }
    if (month === 1) {
      switch (dayNum) {
        case 1:
          this.name = "元旦";
          break;
        case 2:
          if (firstSunday === 1) {
            this.name = "振替休日";
          }
          break;
        case firstMonday + 7:
          this.name = "成人の日";
      }
    } else if (month === 2) {
      switch (dayNum) {
        case 11:
          this.name = "建国記念日";
          break;
        case 12:
          if (11 % 7 === firstSunday) {
            this.name = "振替休日";
          }
      }
    } else if (month === 3) {
      syunbun = Math.floor(20.8431 + 0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4);
      switch (dayNum) {
        case syunbun:
          this.name = "春分の日";
          break;
        case syunbun + 1:
          if (syunbun % 7 === firstSunday) {
            this.name = "振替休日";
          }
      }
    } else if (month === 4) {
      switch (dayNum) {
        case 29:
          this.name = "昭和の日";
          break;
        case 30:
          if (29 % 7 === firstSunday) {
            this.name = "振替休日";
          }
      }
    } else if (month === 5) {
      switch (dayNum) {
        case 3:
          this.name = "憲法記念日";
          break;
        case 4:
          this.name = "みどりの日";
          break;
        case 5:
          this.name = "こどもの日";
          break;
        case 6:
          if (3 % 7 === firstSunday || 4 % 7 === firstSunday || 5 % 7 === firstSunday) {
            this.name = "振替休日";
          }
      }
    } else if (month === 7) {
      if (dayNum === firstMonday + 14) {
        this.name = "海の日";
      }
    } else if (month === 9) {
      syubun = Math.floor(23.2488 + 0.242194 * (year - 1980)) - Math.floor((year - 1980) / 4);
      switch (dayNum) {
        case firstMonday + 14:
          this.name = "敬老の日";
          break;
        case syubun - 1:
          if (dayNum - 1 === firstMonday + 14) {
            this.name = "国民の休日";
          }
          break;
        case syubun:
          this.name = "秋分の日";
          break;
        case syubun + 1:
          if (syubun % 7 === firstSunday) {
            this.name = "振替休日";
          }
      }
    } else if (month === 10) {
      if (dayNum === firstMonday + 7) {
        this.name = "体育の日";
      }
    } else if (month === 11) {
      switch (dayNum) {
        case 3:
          this.name = "文化の日";
          break;
        case 4:
          if (3 === firstSunday) {
            this.name = "振替休日";
          }
          break;
        case 23:
          this.name = "勤労感謝の日";
          break;
        case 24:
          if (23 % 7 === firstSunday) {
            this.name = "振替休日";
          }
      }
    } else if (month === 12) {
      switch (dayNum) {
        case 23:
          this.name = "天皇誕生日";
          break;
        case 24:
          if (23 % 7 === firstSunday) {
            this.name = "振替休日";
          }
      }
    }
  }

  return Holiday;

})();

this.stocal || (this.stocal = {});

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = Holiday;
} else {
  this.stocal.Holiday = Holiday;
}

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
    var calArray, d, dateMax, day, dayCount, events, firstDay, isLeapYear, month, start, week, weekCount, weeks, year, _i, _j, _len, _len1, _ref4;
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
    calArray = [];
    for (_i = 0, _len = weeks.length; _i < _len; _i++) {
      week = weeks[_i];
      _ref4 = week.calendar;
      for (_j = 0, _len1 = _ref4.length; _j < _len1; _j++) {
        day = _ref4[_j];
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

}).call( this, jQuery );