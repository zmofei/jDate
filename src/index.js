/**
 * jDate
 * @author Mofei<13761509829@163.com> 
 */
import "babel-polyfill";
import Tools from './tools';


/**
 * jDate(tar,config)
 */
class jDate {
    constructor(id, config = {}) {
        let target;
        if (id instanceof HTMLElement) {
            target = id;
        } else {
            target = document.querySelector('#' + id);
        }


        this.maps = {
            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            week: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        }

        this.date = new Date();
        this.doms = {
            target
        };

        // set default config
        this.config = {};
        for (var i in config) {
            this.config[i] = config[i];
        }
        this.config.date = this.config.date || {};
        this.config.date.type = (config.date || config.time) ? (config.date && config.date.type) || jDate.Null : jDate.Single;

        this.config.time = this.config.time || {};
        this.config.time.type = (config.date || config.time) ? (config.time && config.time.type) || jDate.Null : jDate.Single;
        this.config.time.step = 1;


        var toadyDate = Tools.getDate(new Date());
        var todayTime = Tools.getTime(new Date());
        this.datas = {
            date: (config.date && config.date.value) || [new Date(toadyDate[0], toadyDate[1], toadyDate[2])],
            time: (config.time && config.time.value) || [new Date(toadyDate[0], toadyDate[1], toadyDate[2], todayTime[0], todayTime[1]), new Date(toadyDate[0], toadyDate[1], toadyDate[2], 23, 59)]
        }

        this.initDom();
        this.initEvent();

        // 
        const isDateData = config.date && config.date.value && config.date.value.length > 0;
        const isTimeData = config.time && config.time.value && config.time.value.length > 0;
        if (isDateData || isTimeData) {
            this.updateText();
        }
    }

    initDom() {
        // create calendar
        var calendar = this.calendar = document.createElement('div');
        calendar.style.display = 'none';
        calendar.className = 'jDate-calendar';
        var tarOffset = Tools.getOffset(this.doms.target);
        var tarHeight = this.doms.target.offsetHeight;
        calendar.style.top = tarOffset.top + tarHeight + 'px';
        calendar.style.left = tarOffset.left + 'px';

        // calendar
        if (this.config.date.type !== jDate.Null) {
            this.initDomCalendar();
        }

        // timer
        if (this.config.time.type !== jDate.Null) {
            this.initDomTimer();
        }

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

        var type = this.config.time.type;

        calendarTimeDom.innerHTML = [
            '<div class="jDate-calendar-timer">',
            // left input
            '    <div class="jDate-timer-title ' + (type === jDate.Period ? 'jDate-timer-title-slot' : '') + ' jDate-timer-input ">',
            '        <input></input>',
            '    </div>',
            '    <div class="jDate-timer-title ' + (type === jDate.Period ? 'jDate-timer-title-slot' : '') + ' jDate-timer-title-show">',
            '        <span class="jDate-timer-hour">',
            '            <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>',
            '        </span>',
            '        <span> : </span>',
            '        <span class="jDate-timer-minute">',
            '            <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>',
            '        </span>',
            '    </div>',
            // right input
            '    <div class="jDate-timer-title ' + (type === jDate.Period ? 'jDate-timer-title-slot' : 'jDate-none') + ' jDate-timer-input ">',
            '        <input></input>',
            '    </div>',
            '    <div class="jDate-timer-title ' + (type === jDate.Period ? 'jDate-timer-title-slot' : 'jDate-none') + ' jDate-timer-title-show">',
            '        <span class="jDate-timer-hour">',
            '            <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>',
            '        </span>',
            '        <span> : </span>',
            '        <span class="jDate-timer-minute">',
            '            <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>',
            '        </span>',
            '    </div>',
            //
            '    <div class="jDate-timer-barbox">',
            // left bar
            '        <div class="jDate-timer-bar-handle animate">',
            '            <div class="jDate-timer-bar-handle-color"></div>',
            '            <div class="jDate-timer-bar-handle-ani"></div>',
            '        </div>',
            // right bar
            '        <div class="jDate-timer-bar-handle animate ' + (type === jDate.Period ? 'jDate-timer-bar-handle-slot' : 'jDate-none') + '" style="left:100%;">',
            '            <div class="jDate-timer-bar-handle-color"></div>',
            '            <div class="jDate-timer-bar-handle-ani"></div>',
            '        </div>',
            // for period line
            '       <div class="jDate-timer-period-line ' + (type === jDate.Period ? '' : 'jDate-none') + '"></div>',
            //
            '        <div class="jDate-timer-bar"></div>',
            '        <div class="jDate-timer-text">',
            '            <span style="left: 0;">00:00</span>',
            '            <span style="left: 25%;">06:00</span>',
            '            <span style="left: 50%;">12:00</span>',
            '            <span style="left: 75%;">18:00</span>',
            '            <span style="left: 100%;">23:59</span>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join('');

        //
        this.doms.timerHandles = calendarTimeDom.querySelectorAll('.jDate-timer-bar-handle');
        this.doms.timerMinutes = calendarTimeDom.querySelectorAll('.jDate-timer-minute');
        this.doms.timerHouers = calendarTimeDom.querySelectorAll('.jDate-timer-hour');
        this.doms.timerQuickText = calendarTimeDom.querySelector('.jDate-timer-text');
        this.doms.timeInputs = calendarTimeDom.querySelectorAll('.jDate-timer-input');
        this.doms.timerTitleShows = calendarTimeDom.querySelectorAll('.jDate-timer-title-show');
        this.doms.timerLine = calendarTimeDom.querySelector('.jDate-timer-period-line ');

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

                // check for disable?
                var disable = false;

                if (this.config.date.start) {
                    disable = (Tools.dateEqual(this.config.date.start, _date)) > 0;
                }

                if (this.config.date.end) {
                    disable = disable || ((Tools.dateEqual(this.config.date.end, _date)) < 0);
                }

                if (this.config.date.disable) {
                    this.config.date.disable.forEach((disableDate) => {
                        if (Tools.dateEqual(disableDate, _date) === 0) {
                            disable = true;
                        }
                    });
                }

                //
                if (disable) {
                    numState = 'disable';
                } else if (this.config.date.type === jDate.Period && choosedDate.length === undefined) {
                    if (+choosedDate.startTime === +_date || +choosedDate.endTime === +_date) {
                        numState = 'active';
                    }
                    if (choosedDate.startTime < _date && choosedDate.endTime > _date) {
                        numState = 'during';
                    }
                } else {
                    choosedDate.forEach((theDate) => {
                        if (Tools.dateEqual(theDate, _date) === 0) {
                            numState = 'active';
                        }
                    });
                }
                //

                //
                _td.className = numState;
                _td.innerHTML = ['<span>', '<div></div>', dateNum, '</span>'].join('');
                if (!disable) {
                    _td.addEventListener('click', this.chooseDate.bind(this, _date));
                }

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
        if (this.config.date.type !== jDate.Null) {
            this.initEventCalendar();
        }

        if (this.config.time.type !== jDate.Null) {
            this.initEventTimer();
        }

        this.initEventSys();
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
    }

    initEventTimer() {
        var self = this;

        // quick select
        self.doms.timerQuickText.addEventListener('click', function (e) {
            if (e.target.tagName === 'SPAN') {
                var value = e.target.innerText;
                var values = value.split(':').map(function (item) {
                    return parseInt(item);
                });

                self.updateTime([
                    new Date(2016, 10, 27, values[0], values[1])
                ]);
            }
        });
        //

        // change time 
        var time = self.datas.time;
        var inputDom = [...this.doms.timeInputs];
        var isPeriod = (this.config.time.type === jDate.Period) && this.datas.time.length === 2;
        inputDom.map((theInput, index) => {
            let input = theInput.querySelector('input');
            self.doms.timerTitleShows[index].addEventListener('click', function () {
                self.doms.timerTitleShows[index].style.display = 'none';
                self.doms.timeInputs[index].style.display = (isPeriod ? 'inline-block' : 'block');
                var hour = self.datas.time[index].getHours();
                hour = hour < 10 ? '0' + hour : hour;
                var minute = self.datas.time[index].getMinutes();
                minute = minute < 10 ? '0' + minute : minute;
                input.value = hour + ' : ' + minute;
                input.focus();
            });

            input.addEventListener('blur', function () {
                self.doms.timerTitleShows[index].style.display = (isPeriod ? 'inline-block' : 'block');
                self.doms.timeInputs[index].style.display = 'none';
            });

            input.addEventListener('keyup', function (e) {
                var value = this.value;
                var values = value.split(':').map(function (item) {
                    return parseInt(item);
                });

                var hour = values[0] || 0;
                var minute = values[1] || 0;
                hour = Math.max(0, hour);
                hour = Math.min(23, hour);
                minute = Math.max(0, minute);
                minute = Math.min(59, minute);

                time[index] = new Date(2016, 10, 27, hour, minute);
                self.updateTime(time);

                if (e.keyCode == '13') {
                    input.blur();
                }
            });

            //
            let handle = self.doms.timerHandles[index];
            let canMove = false;
            let startCursor;
            let startDom;
            let tempTime;

            handle.addEventListener('mousedown', function (e) {
                handle.className = 'jDate-timer-bar-handle active';
                startCursor = {
                    x: e.pageX
                }

                let domStyle = getComputedStyle(handle);
                // console.log(handle);
                startDom = {
                    x: parseInt(domStyle.left)
                }
                canMove = true;
            });

            document.addEventListener('mousemove', function (e) {
                if (!canMove) return false;
                let delta = {
                    x: e.pageX - startCursor.x,
                };
                let left = startDom.x + delta.x;
                left = Math.max(0, left);
                left = Math.min(270, left);
                handle.style.left = left + 'px';
                e.preventDefault();
                e.stopPropagation();
                let timeMin = parseInt(left / 270 * (24 * 60));

                let step = self.config.time.step || 1;
                timeMin = Math.round(timeMin / step) * step;
                let hour = parseInt(timeMin / 60) || 0;
                let minute = timeMin % 60 || 0;
                if (hour >= 24) {
                    hour = 23;
                    minute = 59;
                }

                tempTime = [hour, minute];
                if (index === 0 && time[1]) {
                    let otherHours = time[1].getHours();
                    let otherMinute = time[1].getMinutes();
                    if ((otherHours * 100 + otherMinute) < (hour * 100 + minute)) {
                        tempTime = [otherHours, otherMinute];
                    }
                }
                if (index === 1 && time[0]) {
                    let otherHours = time[0].getHours();
                    let otherMinute = time[0].getMinutes();
                    if ((otherHours * 100 + otherMinute) > (hour * 100 + minute)) {
                        tempTime = [otherHours, otherMinute];
                    }
                }
                time[index] = new Date(2016, 10, 27, tempTime[0], tempTime[1]);

                self.updateTime(time);
            });

            document.addEventListener('mouseup', function () {
                if (!canMove) return false;
                handle.className = 'jDate-timer-bar-handle animate';
                startCursor = startDom = null;
                canMove = false;
            });
        });
    }

    initEventSys() {
        let self = this;

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

        window.addEventListener('click', (e) => {
            let dom = e.target;
            let isFit = false;
            while (dom) {
                if (dom === this.doms.target || dom === this.calendar) {
                    isFit = true;
                    break;
                }
                dom = dom.parentElement;
            }
            if (!isFit) {
                this.calendar.style.display = 'none';
            }
        });

        // cancel and ok button
        let btns = this.calendar.querySelectorAll('.jDate-calendar-action button');
        btns[0].addEventListener('click', () => {
            this.calendar.style.display = 'none';
        });
        btns[1].addEventListener('click', () => {
            this.updateText();
            this.calendar.style.display = 'none';
        });

        this.doms.target.addEventListener('click', (e) => {
            if (this.calendar.style.display === 'none') {
                // fit the position
                var tarOffset = Tools.getOffset(this.doms.target);
                var tarHeight = this.doms.target.offsetHeight;
                var top = tarOffset.top + tarHeight;
                var left = tarOffset.left;
                this.calendar.style.top = top + 'px';
                this.calendar.style.left = left + 'px';
                this.calendar.style.display = 'block';
                // 
                var totalHeight = top + this.calendar.offsetHeight;
                var visibleScreenHeight = document.body.scrollTop + Math.max(document.body.clientHeight || 0, document.documentElement.clientHeight || 0);
                if (totalHeight > visibleScreenHeight) {
                    top = tarOffset.top - this.calendar.offsetHeight;
                    this.calendar.style.top = top + 'px';
                }
                var totalWidth = left + this.calendar.offsetWidth;
                if (totalWidth > document.body.clientWidth) {
                    left = left - (totalWidth - document.body.clientWidth);
                    this.calendar.style.left = left + 'px';
                }
            }
            this.doms.target.edit = {
                has: false,
                val: e.target.value
            };
        });

        this.doms.target.addEventListener('input', (e) => {
            let value = e.target.value;
            if (this.config.date.type === jDate.Single) {
                if (/\d{4}\/\d{1,2}\/\d{1,2}(?!\d)/.test(value)) {
                    var date = value.slice(0, 10);
                    date = date.split('/');
                    this.datas.date = [new Date(date[0], date[1], date[2])];
                    this.createMonthTable();
                }
            }

            if (this.config.date.type === jDate.Period) {
                if (/\d{4}\/\d{1,2}\/\d{1,2}\s\-\s\d{4}\/\d{1,2}\/\d{1,2}(?!\d)/.test(value)) {
                    var date = value.slice(0, 23);
                    date = date.split(' - ');
                    for (var i in date) {
                        date[i] = date[i].split('/');
                    }
                    var start = new Date(date[0][0], date[0][1], date[0][2]);
                    var end = new Date(date[1][0], date[1][1], date[1][2])
                    this.datas.date = [start, end];
                    this.createMonthTable();
                }
            }

            if (this.config.time.type === jDate.Single) {
                var times = value.match(/(\d{1,2})\:(\d{1,2})(?!\d)/);
                if (times) {
                    var hour = times[1];
                    var min = times[2];
                    this.updateTime([
                        new Date(2016, 10, 27, hour, min)
                    ]);
                }
            }

            if (this.config.time.type === jDate.Period) {
                var times = value.match(/(\d{1,2})\:(\d{1,2})\s\-\s(\d{1,2})\:(\d{1,2})(?!\d)/);
                if (times) {
                    var shour = times[1];
                    var smin = times[2];
                    var ehour = times[3];
                    var emin = times[4];
                    var finalTimes = [
                        new Date(2016, 10, 27, shour, smin),
                        new Date(2016, 10, 27, ehour, emin)
                    ];
                    finalTimes.sort((a, b) => {
                        return a - b
                    })
                    this.updateTime(finalTimes);
                }
            }

            if (value !== this.doms.target.edit.val) {
                this.doms.target.edit.has = true;
            }
        });

        this.doms.target.addEventListener('blur', (e) => {
            if (this.doms.target.edit.has) {
                this.updateText();
            }
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

        setTimeout(() => {
            this.createMonthTable();
        });
    }

    updateTime(times) {
        var type = this.config.time.type;
        var theTime = this.datas.time;
        times.forEach((time, index) => {
            let totalMin = time.getHours() * 60 + time.getMinutes();
            let present = totalMin / (24 * 60);
            this.doms.timerHandles[index].style.left = present * 100 + '%';

            let minute = this.doms.timerMinutes[index].querySelector('.jDate-timer-minute-in');
            let hour = this.doms.timerHouers[index].querySelector('.jDate-timer-hour-in');
            hour.style.top = time.getHours() * -20 + 'px';
            minute.style.top = time.getMinutes() * -20 + 'px';
            theTime[index] = time;

            if (type === jDate.Period) {
                // this.doms.timerLine
                if (index === 0) {
                    this.doms.timerLine.style.left = present * 100 + '%';
                }

                if (index === 1) {
                    this.doms.timerLine.style.right = (1 - present) * 100 + '%';
                }
            }
        });
        this.datas.time = theTime;
    }

    updateText() {
        var timeStr = '';
        var datas = this.datas.date || [];
        var retData = {};
        var retTime = {};

        var firstTime = Tools.getDate(datas[0]);
        firstTime[1] = parseInt(firstTime[1], 10) + 1;
        switch (this.config.date.type) {
            case jDate.Single:
                timeStr += firstTime.join('/');
                retData = datas[0];
                break;
            case jDate.Multi:
                timeStr += firstTime.join('/') + ' (' + datas.length + ')';
                retData = datas;
                break;
            case jDate.Period:
                if (datas.length >= 2) {
                    var secondTime = Tools.getDate(datas[datas.length - 1]);
                    secondTime[1] = parseInt(secondTime[1], 10) + 1;

                    if (datas[0] <= datas[datas.length - 1]) {
                        timeStr += firstTime.join('/');
                        timeStr += ' - ';
                        timeStr += secondTime.join('/');
                        retData.data = {
                            start: datas[0],
                            end: datas[datas.length - 1]
                        };
                    } else {
                        timeStr += secondTime.join('/');
                        timeStr += ' - ';
                        timeStr += firstTime.join('/');
                        retData.data = {
                            start: datas[datas.length - 1],
                            end: datas[0]
                        };
                    }
                } else {
                    timeStr += firstTime.join('/');
                    retData = {
                        start: datas[0],
                        end: datas[0]
                    };
                }
                break;
            default:
        }

        var times = this.datas.time || [];
        timeStr += timeStr === '' ? '' : this.config.time.type === jDate.Null ? '' : ' ';
        switch (this.config.time.type) {
            case jDate.Single:
                timeStr += Tools.getTime(times[0]).join(':');
                retTime = times[0];
                break;
            case jDate.Multi:
                timeStr += Tools.getTime(times[0]).join(':') + ' (' + times.length + ')';
                retTime = times;
                break;
            case jDate.Period:
                var isSameTime = (times[0].getHours() * 100 + times[0].getMinutes()) === (times[1].getHours() * 100 + times[1].getMinutes())
                if (times.length >= 2 && !isSameTime) {
                    timeStr += Tools.getTime(times[0]).join(':');
                    timeStr += ' - ';
                    timeStr += Tools.getTime(times[times.length - 1]).join(':');
                    retTime = {
                        start: times[0],
                        end: times[1]
                    }
                } else {
                    timeStr += Tools.getTime(times[0]).join(':');
                    retTime = {
                        start: times[0],
                        end: times[0]
                    }
                }
                break;
            default:
        }


        var target = this.doms.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            target.value = timeStr;
        } else {
            target.innerText = timeStr;
        }


        if (this.config.change) {
            this.config.change({
                text: timeStr,
                date: retData,
                time: retTime
            });
        }
    }
}

jDate.Null = 0;
jDate.Single = 1;
jDate.Multi = 2;
jDate.Period = 3;

// for material animateion
require('./material');

module.exports = global.jDatev2 = global.jDate = jDate;