###
* Calendar settings
###

@stocal = @stocal || {}

BASE_CELL_HEIGHT = 128
BASE_CELL_WIDTH = 128

CATEGORY_CLASS = "category"
CATEGORY_TITLE_WIDTH = 250
CATEGORY_VERTICAL_MARGIN = 3

CELL_MARGIN_TOP = 30

#一つのセルに入る文字数の制限
CELL_MORE_CHARACTOR = "…"

#start day
#0 -> sunday, 1 -> monday ...
DAY_START_IN_WEEK = 1

DAY_CLASSES = [ "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday" ]
DAY_NAMES = [ "日", "月", "火", "水", "木", "金", "土" ]
DEFAULT_MODE = "month"

HOLIDAY_CLASS = "holiday"
WEEKDAY_CLASS = "weekday"

FORCE_SORT = true

GRAPH_HEIGHT = 20
GRAPH_MARGIN_TOP = 2
GRAPH_MARGIN_LEFT = 10
GRAPH_HEAD_WIDTH = 18
GRAPH_FOOT_WIDTH = 18
GRAPH_TIP_MARGIN_LEFT = 20
GRAPH_TYPES = [
	{ name : "shop", title : "ショップニュース情報", no : 1 }
	{ name : "event", title : "イベント情報", no : 2 }
	{ name : "info", title : "おしらせ", no : 3 }
	{ name : "renew", title : "店舗改装情報", no : 4 }
]
SHOW_MAX = 3
SHOW_MORE = false
SHOW_ALL_CATEGORY = true

settings = {
baseCellHeight          : BASE_CELL_HEIGHT
baseCellWidth           : BASE_CELL_WIDTH
categoryClass           : CATEGORY_CLASS
categoryTitleWidth      : CATEGORY_TITLE_WIDTH
categoryVerticalMargin  : CATEGORY_VERTICAL_MARGIN
cellMoreCharactor       : CELL_MORE_CHARACTOR
cellMarginTop           : CELL_MARGIN_TOP
dayClasses              : DAY_CLASSES
dayNames                : DAY_NAMES
dayStartInWeek          : DAY_START_IN_WEEK
graphHeight             : GRAPH_HEIGHT
graphMarginTop          : GRAPH_MARGIN_TOP
graphMarginLeft         : GRAPH_MARGIN_LEFT
graphHeadWidth          : GRAPH_HEAD_WIDTH
graphFootWidth          : GRAPH_FOOT_WIDTH
graphTipMarginLeft      : GRAPH_TIP_MARGIN_LEFT
graphTypes              : GRAPH_TYPES
holidayClass            : HOLIDAY_CLASS
mode                    : DEFAULT_MODE
showAllCategory         : SHOW_ALL_CATEGORY
showMax                 : SHOW_MAX
showMore                : SHOW_MORE
sort                    : FORCE_SORT
weekdayClass            : WEEKDAY_CLASS
}

if module?.exports  # Node.jsの場合
	module.exports = settings
else  # ブラウザの場合
	@stocal.settings = settings