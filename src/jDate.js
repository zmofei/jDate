class jDate {
    constructor() {

        this.maps = {
            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }

        this._date = new Date();

        this._data = {
            config: {
                date: {
                    type: 3, // 0:disable, 1: single day, 2: multi time, 3:time slot 
                    max: 3 // for multi
                },
                time: {
                    type: 0 // 0:disable
                }
            },
            choosed: {
                date: [new Date(2016, 6, 20)],
                time: [{
                    hour: 10,
                    minute: 54
                }]
            },
            sys: {
                dateDoms: [],
            }
        }
        console.log(this._data)

        // crate dom
        this._initDom();
        // init Event
        this._initEvent();

        // show month
        this._createMonthTable();
    }

    _initDom() {
        // create calendar
        var calendar = this.calendar = document.createElement('div');
        calendar.className = 'jDate-calendar';
        calendar.innerHTML = [
            '<div>',
            '   <div class="jDate-calendar-title">',
            '       <span class="jDate-calendar-pre">',
            '           <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>',
            '       </span>',
            '       <span class="jDate-calendar-curr"></span>',
            '       <span class="jDate-calendar-next">',
            '           <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>',
            '       </span>',
            '   </div>',
            '   <div class="jDate-calendar-table"></div>',
            '   <div class="jDate-calendar-action">',
            '       <button class="jDate-calendar-cancel">cancel</button>',
            '       <button class="jDate-calendar-ok">ok</button>',
            '   </div>',
            '</div>'
        ].join('');

        this._calendarTable = calendar.querySelector('.jDate-calendar-table');
        this._calendarPre = calendar.querySelector('.jDate-calendar-pre');
        this._calendarNext = calendar.querySelector('.jDate-calendar-next');
        this._calendarCurr = calendar.querySelector('.jDate-calendar-curr');
        document.body.appendChild(calendar);
    }

    _initEvent() {
        var self = this;
        self._calendarPre.addEventListener('mousedown', function(e) {
            self.setMonth(self._date.getMonth() - 1);
            e.preventDefault();
            e.stopPropagation();
        });

        self._calendarNext.addEventListener('mousedown', function(e) {
            self.setMonth(self._date.getMonth() + 1);
            e.preventDefault();
            e.stopPropagation();
        });
    }

    // show month table
    _createMonthTable() {
        var self = this;
        // get the first day of this month
        var date = new Date(Date.parse(this._date));
        date.setDate(1);
        var firstDayDay = date.getDay();

        // get the total Days of this month
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        var lastDayDate = date.getDate();
        var deltaDay = lastDayDate % 7;
        var endNum = lastDayDate + (deltaDay == 0 ? 0 : (7 - deltaDay));

        // crate the table
        var table = document.createElement('table');
        var tableHead = document.createElement('tr');
        var tableHeadStrs = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        tableHead.innerHTML = '<th>' + tableHeadStrs.join('</th><th>') + '</th>';
        table.appendChild(tableHead);

        //
        var choosedDate = this._data.choosed.date;


        var dateType = this._data.config.date.type;
        var maxTime = 0;
        var minTime = 0;
        if (dateType == 3 && choosedDate.length == 2) {
            minTime = Math.min(+choosedDate[0], +choosedDate[1]);
            maxTime = Math.max(+choosedDate[0], +choosedDate[1]);
        }


        var dateDoms = [];
        for (var i = 0; i < endNum; i++) {
            if (i % 7 == 0) {
                var _tr = document.createElement('tr');
                table.appendChild(_tr);
            }
            var dateNum = (i - firstDayDay + 1);
            dateNum = dateNum < 1 ? '' : dateNum;
            dateNum = dateNum > lastDayDate ? '' : dateNum;

            var _td = document.createElement('td');


            if (dateNum !== '') {
                // date for the day;
                var _date = new Date(date.getFullYear(), date.getMonth(), dateNum);
                //
                var numState = '';
                for (var j in choosedDate) {
                    var choosedStartTime = choosedDate[j];
                    if (+_date == +choosedStartTime) {
                        numState = 'active';
                        break;
                    } else if (dateType == 3 && choosedDate.length == 2 && +_date > minTime && +_date < maxTime) {
                        numState = 'during';
                    }
                }
                //
                _td.className = numState;
                _td.innerHTML = ['<span>', '<div></div>', dateNum, '</span>'].join('');
                _td.addEventListener('click', this._chooseDate.bind(self, dateNum));

                //
                dateDoms.push({
                    date: _date,
                    dom: _td
                });
            }
            _tr.appendChild(_td);
        };
        this._data.sys.dateDoms = dateDoms;
        this._calendarTable.innerHTML = '';
        this._calendarTable.appendChild(table);

        // set current value
        var current = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
        this._calendarCurr.innerHTML = current;
    }

    //
    _updateMonthTable() {
        var dates = this._data.choosed.date;
        // console.log(dates);
        var dateType = this._data.config.date.type;
        var doms = this._data.sys.dateDoms;
        switch (parseInt(dateType)) {
            case 1:
            case 2:
            case 3:
        }

        var maxTime = 0;
        var minTime = 0;
        if (dateType == 3 && dates.length == 2) {
            minTime = Math.min(+dates[0], +dates[1]);
            maxTime = Math.max(+dates[0], +dates[1]);
        }

        doms.map(function(dom) {
            if (dates.length <= 0) {
                dom.dom.className = '';
            } else {
                for (var i in dates) {
                    var data = dates[i];
                    if (+dom.date == +data) {
                        dom.dom.className = 'active';
                        break;
                    } else if (dateType == 3 && dates.length == 2 && dom.date > minTime && dom.date < maxTime) {
                        // console.log(minTime, maxTime)
                        dom.dom.className = 'during';
                        // break;
                    } else {
                        dom.dom.className = '';
                    }
                }
            }
        })
    }

    _chooseDate(date) {
        // console.log(date);
        var self = this;
        var dateType = this._data.config.date.type;
        var add = true;
        var year = this._date.getFullYear();
        var month = this._date.getMonth();
        switch (parseInt(dateType)) {
            //0:disable, 1: single day, 2: multi time, 3:time slot 
            case 1:
                this._data.choosed.date = [];
                break;
            case 2:
            case 3:
                // in case 3 , time slot only can choose 2(a start time & a end time);
                // in case 2 , max is the user config or Infinity;
                var max = dateType == 3 ? 2 : (this._data.config.date.max || Infinity);
                this._data.choosed.date = this._data.choosed.date.filter(function(value, index) {
                    if (year == value.year && month == value.month && date == value.date) {
                        add = false;
                        return false;
                    }
                    return true;
                });
                if (self._data.choosed.date.length == max) {
                    this._data.choosed.date.shift();
                }
                break;

        }

        add && this._data.choosed.date.push(new Date(year, month, date));

        this._updateMonthTable();
    }

    set(time) {}
    setYear(year) {}
    setMonth(month) {
        // month;
        this._date.setMonth(month);
        this._createMonthTable();
    }
    setDate(date) {}
}

window.jDate = jDate;