class Holiday
	name : null
	date : null
	constructor : (date, name = null)->
		this.date = date
		this.name = null
		dayNum = date.getDate()
		monthDate = new Date( date.getFullYear(), date.getMonth() )
		firstDay = monthDate.getDay()
		year = date.getFullYear()
		month = date.getMonth() + 1

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
			switch dayNum
				when 1
					this.name = "元旦"
				when 2
					if firstSunday is 1
						this.name = "振替休日"
				when firstMonday + 7
					this.name = "成人の日"
		else if month is 2
			switch dayNum
				when 11
					this.name = "建国記念日"
				when 12
					if 11 % 7 is firstSunday
						this.name = "振替休日"
		else if month is 3
			syunbun = Math.floor( 20.8431 + 0.242194 * ( year - 1980 )) - Math.floor( ( year - 1980 ) / 4 )
			switch dayNum
				when syunbun
					this.name = "春分の日"
				when syunbun + 1
					if syunbun % 7 is firstSunday
						this.name = "振替休日"
		else if month is 4
			switch dayNum
				when 29
					this.name = "昭和の日"
				when 30
					if 29 % 7 is firstSunday
						this.name = "振替休日"
		else if month is 5
			switch dayNum
				when 3
					this.name = "憲法記念日"
				when 4
					this.name = "みどりの日"
				when 5
					this.name = "こどもの日"
				when 6
					if 3 % 7 is firstSunday or 4 % 7 is firstSunday or 5 % 7 is firstSunday
						this.name = "振替休日"
		else if month is 7
			if dayNum is firstMonday + 14
				this.name = "海の日"
		else if month is 9
			syubun = Math.floor( 23.2488 + 0.242194 * ( year - 1980 )) - Math.floor( ( year - 1980 ) / 4 )
			switch dayNum
				when firstMonday + 14
					this.name = "敬老の日"
				when syubun - 1
					if dayNum - 1 is firstMonday + 14
						this.name = "国民の休日"
				when syubun
					this.name = "秋分の日"
				when syubun + 1
					if syubun % 7 is firstSunday
						this.name = "振替休日"
		else if month is 10
			if dayNum is firstMonday + 7
				this.name ="体育の日"
		else if month is 11
			switch dayNum
				when 3
					this.name = "文化の日"
				when 4
					if 3 is firstSunday
						this.name = "振替休日"
				when 23
					this.name = "勤労感謝の日"
				when 24
					if 23 % 7 is firstSunday
						this.name = "振替休日"
		else if month is 12
			switch dayNum
				when 23
					this.name = "天皇誕生日"
				when 24
					if 23 % 7 is firstSunday
						this.name = "振替休日"

@stocal ||= {}
if module?.exports  # Node.jsの場合
	module.exports = Holiday
else  # ブラウザの場合
	@stocal.Holiday = Holiday