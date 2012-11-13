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
