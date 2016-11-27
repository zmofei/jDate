/**
 * jDate
 * @author Mofei<13761509829@163.com> 
 */

import Tools from './tools';

class jDate {
    constructor(id, config = {}) {
        this.maps = {
            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            week: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        }

        this.date = new Date();
        this.doms = {
            target: document.querySelector('#' + id)
        };

        this.config = {
            date: {
                type: (config.date && config.date.type) || jDate.Single
            },
            time: {
                type: (config.time && config.time.type) || jDate.Single
            }
        }

        var toadyDate = Tools.getDate(new Date());
        var todayTime = Tools.getTime(new Date());
        // TODO: if use time as the value, time could change follow the real time.
        this.datas = {
            date: [new Date(toadyDate[0], toadyDate[1], toadyDate[2])],
            time: [new Date(toadyDate[0], toadyDate[1], toadyDate[2], todayTime[0], todayTime[1])]
        }

        this.initDom();
        this.initEvent();
    }

    initDom() {
        // create calendar
        var calendar = this.calendar = document.createElement('div');
        calendar.className = 'jDate-calendar';
        var tarOffset = Tools.getOffset(this.doms.target);
        var tarHeight = this.doms.target.offsetHeight;
        calendar.style.top = tarOffset.top + tarHeight + 'px';
        calendar.style.left = tarOffset.left + 'px';

        // calendar
        this.initDomCalendar();

        // // timer
        this.initDomTimer();

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
        document.body.appendChild(calendar);
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

    initDomTimer() {
        var self = this;
        var calendar = this.calendar;
        var calendarTimeDom = document.createElement('div');
        calendarTimeDom.className = 'jDate-calendar-date';

        var hoursDom = [];
        var minuteDom = [];
        for (let i = 0; i <= 24; i++) {
            hoursDom.push('<span>' + (i < 10 ? '0' + i : i) + '</span>');
        }

        for (let i = 0; i <= 60; i++) {
            minuteDom.push('<span>' + (i < 10 ? '0' + i : i) + '</span>');
        }

        var type = 1;

        calendarTimeDom.innerHTML = [
            '<div class="jDate-calendar-timer">',
            '    <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : '') + ' jDate-timer-input ">',
            '        <input></input>',
            '    </div>',
            '    <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : '') + ' jDate-timer-title-show">',
            '        <span class="jDate-timer-hour">',
            '            <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>',
            '        </span>',
            '        <span> : </span>',
            '        <span class="jDate-timer-minute">',
            '            <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>',
            '        </span>',
            '    </div>',
            '    <div class="jDate-timer-barbox">',
            '        <div class="jDate-timer-bar-handle animate">',
            '            <div class="jDate-timer-bar-handle-color"></div>',
            '            <div class="jDate-timer-bar-handle-ani"></div>',
            '        </div>',
            '        <div class="jDate-timer-bar"></div>',
            '        <div class="jDate-timer-text">',
            '            <span style="left: 0;">00:00</span>',
            '            <span style="left: 25%;">06:00</span>',
            '            <span style="left: 50%;">12:00</span>',
            '            <span style="left: 75%;">18:00</span>',
            '            <span style="left: 100%;">24:00</span>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join('');

        //
        this.doms.timerHandle = calendarTimeDom.querySelectorAll('.jDate-timer-bar-handle')[0];
        this.doms.timerMinute = calendarTimeDom.querySelectorAll('.jDate-timer-minute')[0];
        this.doms.timerHouer = calendarTimeDom.querySelectorAll('.jDate-timer-hour')[0];

        // init time
        setTimeout(function () {
            self.updateTime(self.datas.time);
        }, 100);
        //
        calendar.appendChild(calendarTimeDom);
    }

    createMonthTable() {
        var self = this;
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
        var choosedDate = [];
        switch (this.config.date.type) {
            case jDate.Multi:
                choosedDate = this.datas.date;
                break;
            case jDate.Period:
                choosedDate = this.datas.date.slice(0, 2);
                if (choosedDate.length === 2) {
                    var timeA = choosedDate[0];
                    var timeB = choosedDate[1];
                    var startTime = Tools.getDate(new Date(Math.min(timeA, timeB)));
                    var endTime = Tools.getDate(new Date(Math.max(timeA, timeB)));
                    startTime = new Date(startTime[0], startTime[1], startTime[2]);
                    endTime = new Date(endTime[0], endTime[1], endTime[2]);
                    choosedDate = {
                        startTime,
                        endTime
                    }
                }
                break;
            default:
                choosedDate.push(this.datas.date[0]);
        }


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
                var numState = '';

                if (this.config.date.type === jDate.Period && choosedDate.length === undefined) {
                    if (+choosedDate.startTime === +_date || +choosedDate.endTime === +_date) {
                        numState = 'active';
                    }
                    if (choosedDate.startTime < _date && choosedDate.endTime > _date) {
                        numState = 'during';
                    }
                } else {
                    choosedDate.forEach((theDate) => {
                        if (Tools.dateEqual(theDate, _date)) {
                            numState = 'active';
                        }
                    });
                }

                //
                _td.className = numState;
                _td.innerHTML = ['<span>', '<div></div>', dateNum, '</span>'].join('');
                _td.addEventListener('click', this.chooseDate.bind(self, _date));

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

    initEvent() {
        this.initEventCalendar();

        // this._initEventTimer();

        // this._initEventTarget();

        // this._initEventSys();
    }

    initEventCalendar() {
        var self = this;
        // next or preview month btn
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

        // drag the calendar box
        var movePos = {
            cursor: [0, 0],
            calendar: [0, 0],
            mousedown: false,
            canMove: true
        }

        this.calendar.addEventListener('mousedown', function (e) {
            movePos.cursor = [e.pageX, e.pageY];
            var pos = getComputedStyle(self.calendar);
            movePos.calendar = [parseInt(pos.left) || 0, parseInt(pos.top) || 0];
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

    setMonth(month) {
        this.date.setMonth(month);
        this.createMonthTable();
    }

    chooseDate(date) {
        var fitIndex = null;
        var isFit = this.datas.date.some((theDate, index) => {
            if (+theDate === +date) {
                fitIndex = index;
                return true;
            } else {
                return false;
            }
        });
        if (isFit) {
            this.datas.date.splice(fitIndex, 1);
        } else {
            switch (this.config.date.type) {
                case jDate.Multi:
                    this.datas.date.push(date);
                    break;
                case jDate.Period:
                    this.datas.date.push(date);
                    this.datas.date = this.datas.date.slice(-2);
                    break;
                default:
                    this.datas.date = [date];
                    break;
            }
        }

        this.createMonthTable();
    }

    updateTime(time) {
        var theTime = this.datas.time;
        if (time[0]) {
            var _time = time[0];
            //
            var totalMin = _time.getHours() * 60 + _time.getMinutes();
            var present = totalMin / (24 * 60);
            this.doms.timerHandle.style.left = present * 100 + '%';
            //
            var minute = this.doms.timerMinute.querySelector('.jDate-timer-minute-in');
            var hour = this.doms.timerHouer.querySelector('.jDate-timer-hour-in');
            hour.style.top = _time.getHours() * -20 + 'px';
            minute.style.top = _time.getMinutes() * -20 + 'px';
            theTime[0] = time[0];
        }
        this.datas.time = theTime;
    }
}

jDate.Single = 0;
jDate.Multi = 1;
jDate.Period = 2;

// for material animateion
require('./material');

module.exports = global.jDate = jDate;