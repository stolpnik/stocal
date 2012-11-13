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
