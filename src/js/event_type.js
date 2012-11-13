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
