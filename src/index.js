/**
 * jDate
 * @author Mofei<13761509829@163.com> 
 */

class jDate {
    constructor() {
        this.maps = {
            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            week: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        }

        this.date = new Date();
        this.doms = {};

        this.initDom();
        this.initEvent();
    }

    initDom() {
        // create calendar
        var calendar = this.calendar = document.createElement('div');
        calendar.className = 'jDate-calendar';

        // calendar
        this.initDomCalendar();

        // // timer
        // this._initDomTimer();

        // // target 
        // this._initDomTarget();


        // action button
        var actionDom = document.createElement('div');
        actionDom.className = 'jDate-calendar-action';
        actionDom.innerHTML = [
            '<span class="material-ani"><button class="jDate-calendar-cancel">cancel</button></span>',
            '<span class="material-ani"><button class="jDate-calendar-ok">ok</button></span>',
        ].join('');
        calendar.appendChild(actionDom);
        //
        document.body.appendChild(calendar);
    }

    initEvent() {
        this.initEventCalendar();

        // this._initEventTimer();

        // this._initEventTarget();

        // this._initEventSys();
    }

    initEventCalendar() {
        var self = this;
        var preview = self.doms.calendarPre;
        var next = self.doms.calendarNext;
        preview.addEventListener('mouseup', function () {
            self.setMonth(self.date.getMonth() - 1);
            setTimeout(function () {
                self.doms.calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner';
                self.doms.calendarCurrBoxInnder.style.left = '-400px';
                setTimeout(function () {
                    self.doms.calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner animate';
                    self.doms.calendarCurrBoxInnder.style.left = '-200px';
                }, 10);
            }, 0);
        });

        next.addEventListener('mouseup', function () {
            self.setMonth(self.date.getMonth() + 1);
            setTimeout(function () {
                self.doms.calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner';
                self.doms.calendarCurrBoxInnder.style.left = '0px';
                setTimeout(function () {
                    self.doms.calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner animate';
                    self.doms.calendarCurrBoxInnder.style.left = '-200px';
                }, 10)
            }, 0);
        });

        var movePos = {
            cursor: [0, 0],
            calendar: [0, 0],
            mousedown: false,
            canMove: true
        }

        this.calendar.addEventListener('mousedown', function (e) {
            movePos.cursor = [e.pageX, e.pageY];
            movePos.calendar = [parseInt(self.calendar.style.left), parseInt(self.calendar.style.top)];
            movePos.mousedown = true;
        });

        window.addEventListener('mousemove', function (e) {
            if (movePos.mousedown) {
                var dx = e.pageX - movePos.cursor[0];
                var dy = e.pageY - movePos.cursor[1];
                if (movePos.canMove || dx > 10 || dy > 10) {
                    movePos.canMove = true;
                    self.calendar.style.cursor = 'move';
                    e.preventDefault();
                    e.stopPropagation();
                    self.calendar.style.left = movePos.calendar[0] + dx + 'px';
                    self.calendar.style.top = movePos.calendar[1] + dy + 'px';
                }
                e.preventDefault();
                e.stopPropagation();
            }
        });

        window.addEventListener('mouseup', function () {
            movePos.mousedown = false;
            movePos.canMove = false;
            self.calendar.style.cursor = 'auto';
        });
    }

    initDomCalendar() {
        var calendar = this.calendar;
        var calendarDateDom = document.createElement('div');
        calendarDateDom.className = 'jDate-calendar-date';

        calendarDateDom.innerHTML = [
            '<div class="jDate-calendar-title">',
            '    <span class="jDate-calendar-pre material-ani">',
            '        <div class="material"></div>',
            '        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>',
            '    </span>',
            '    <span class="jDate-calendar-curr-box">',
            '        <span class="jDate-calendar-curr-box-inner">',
            '           <span class="jDate-calendar-curr-pre"></span>',
            '           <span class="jDate-calendar-curr"></span>',
            '           <span class="jDate-calendar-curr-next"></span>',
            '        </span>',
            '    </span>',
            '    <span class="jDate-calendar-next material-ani">',
            '        <div class="material"></div>',
            '        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>',
            '    </span>',
            '</div>',
            '<div class="jDate-calendar-table"></div>',
        ].join('');

        this.doms.calendarTable = calendarDateDom.querySelector('.jDate-calendar-table');
        this.doms.calendarPre = calendarDateDom.querySelector('.jDate-calendar-pre');
        this.doms.calendarNext = calendarDateDom.querySelector('.jDate-calendar-next');
        this.doms.calendarCurr = calendarDateDom.querySelector('.jDate-calendar-curr');
        this.doms.calendarCurrPre = calendarDateDom.querySelector('.jDate-calendar-curr-pre');
        this.doms.calendarCurrNext = calendarDateDom.querySelector('.jDate-calendar-curr-next');
        this.doms.calendarCurrBoxInnder = calendarDateDom.querySelector('.jDate-calendar-curr-box-inner');
        calendar.appendChild(calendarDateDom);
        // show month
        this.createMonthTable();
    }

    createMonthTable() {
        // get the first day of this month
        var date = new Date(Date.parse(this.date));
        date.setDate(1);
        var firstDayDay = date.getDay();

        // get the total Days of this month
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        var lastDayDate = date.getDate();
        var endNum = lastDayDate + firstDayDay;

        // crate the table
        var table = document.createElement('table');
        var tableHead = document.createElement('tr');
        var tableHeadStrs = this.maps.week;
        tableHead.innerHTML = '<th>' + tableHeadStrs.join('</th><th>') + '</th>';
        table.appendChild(tableHead);

        //
        // var choosedDate = this._data.choosed.date;
        // var dateType = this._data.config.date.type;
        // var maxTime = 0;
        // var minTime = 0;
        // if (dateType == 3 && choosedDate.length == 2) {
        //     minTime = Math.min(+choosedDate[0], +choosedDate[1]);
        //     maxTime = Math.max(+choosedDate[0], +choosedDate[1]);
        // }


        var dateDoms = [];
        // console.log(endNum);
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
                // for (var j in choosedDate) {
                //     var choosedStartTime = choosedDate[j];
                //     var yearEqual = _date.getFullYear() == choosedStartTime.getFullYear();
                //     var monthEqual = _date.getMonth() == choosedStartTime.getMonth();
                //     var dateEqual = _date.getDate() == choosedStartTime.getDate();

                //     if (yearEqual && monthEqual && dateEqual) {
                // numState = 'active';
                //         break;
                //     } else if (dateType == 3 && choosedDate.length == 2 && +_date > minTime && +_date < maxTime) {
                // numState = 'during';
                //     }
                // }
                //
                _td.className = numState;
                _td.innerHTML = ['<span>', '<div></div>', dateNum, '</span>'].join('');
                // _td.addEventListener('click', this._chooseDate.bind(self, dateNum));

                //
                dateDoms.push({
                    date: _date,
                    dom: _td
                });
            }
            _tr.appendChild(_td);
        }

        // this._data.sys.dateDoms = dateDoms;
        this.doms.calendarTable.innerHTML = '';
        this.doms.calendarTable.appendChild(table);

        // set current value
        date.setDate(1);
        var current = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
        this.doms.calendarCurr.innerHTML = current;
        date.setMonth(date.getMonth() - 1);
        var currentPre = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
        this.doms.calendarCurrPre.innerHTML = currentPre;
        date.setMonth(date.getMonth() + 2);
        var currentNext = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
        this.doms.calendarCurrNext.innerHTML = currentNext;
    }

    setMonth(month) {
        this.date.setMonth(month);
        this.createMonthTable();
    }
}

// for material animateion
require('./material');

module.exports = global.jDate = jDate;