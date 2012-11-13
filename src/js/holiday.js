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
