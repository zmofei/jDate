class jDate {
    constructor(config, data) {
        this.maps = {
            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }

        this._date = new Date(+((data && data.current) || new Date()));

        this._data = {
            config: {
                date: {
                    type: 0, // 0:disable, 1: single day, 2: multi time, 3:time slot 
                    // max: 3 // for multi
                },
                time: {
                    type: 0, // 0:disable, 1: single time,  3:time slot 
                    // step: 60 //
                }
            },
            choosed: {
                date: [
                    new Date(this._date.getFullYear(), this._date.getMonth(), this._date.getDate()),
                    new Date(this._date.getFullYear(), this._date.getMonth(), this._date.getDate())
                ],
                time: [
                    [0, 0],
                    [23, 59]
                ]
            },
            sys: {
                dateDoms: [],
            }
        };

        if (config) {
            for (var i in config) {
                this._data.config[i] = config[i]
            }
        }

        if (data) {
            for (var i in data) {
                this._data.choosed[i] = data[i]
            }
        }
        // crate dom
        this._initDom();
        // init Event
        this._initEvent();
    }

    _initDom() {
        // create calendar
        var calendar = this.calendar = document.createElement('div');
        calendar.className = (this._data.config.target ? 'jDate-calendar-target' : '') + ' jDate-calendar';

        // calendar
        if (this._data.config.date.type != 0) {
            this._initDomCalendar();
        }

        // timer
        if (this._data.config.time.type != 0) {
            this._initDomTimer();
        }

        // target 
        if (this._data.config.target) {
            this._initDomTarget();
        }

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

    _initDomCalendar() {
        var calendar = this.calendar;
        var calendarDateDom = document.createElement('div');
        calendarDateDom.className = 'jDate-calendar-date';

        calendarDateDom.innerHTML = [
            '   <div class="jDate-calendar-title">',
            '       <span class="jDate-calendar-pre material-ani">',
            '           <div class="material"></div>',
            '           <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>',
            '       </span>',
            '       <span class="jDate-calendar-curr-box">',
            '           <span class="jDate-calendar-curr-box-inner">',
            '              <span class="jDate-calendar-curr-pre"></span>',
            '              <span class="jDate-calendar-curr"></span>',
            '              <span class="jDate-calendar-curr-next"></span>',
            '           </span>',
            '       </span>',
            '       <span class="jDate-calendar-next material-ani">',
            '           <div class="material"></div>',
            '           <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>',
            '       </span>',
            '   </div>',
            '   <div class="jDate-calendar-table"></div>',
        ].join('');

        this._calendarTable = calendarDateDom.querySelector('.jDate-calendar-table');
        this._calendarPre = calendarDateDom.querySelector('.jDate-calendar-pre');
        this._calendarNext = calendarDateDom.querySelector('.jDate-calendar-next');
        this._calendarCurr = calendarDateDom.querySelector('.jDate-calendar-curr');
        this._calendarCurrPre = calendarDateDom.querySelector('.jDate-calendar-curr-pre');
        this._calendarCurrNext = calendarDateDom.querySelector('.jDate-calendar-curr-next');
        this._calendarCurrBoxInnder = calendarDateDom.querySelector('.jDate-calendar-curr-box-inner');
        calendar.appendChild(calendarDateDom);
        // show month
        this._createMonthTable();
    }

    _initDomTimer() {
        var self = this;
        var calendar = this.calendar;
        var calendarTimeDom = document.createElement('div');
        calendarTimeDom.className = 'jDate-calendar-date';

        var hoursDom = [];
        var minuteDom = [];
        for (var i = 0; i <= 24; i++) {
            hoursDom.push('<span>' + (i < 10 ? '0' + i : i) + '</span>');
        }

        for (var i = 0; i <= 60; i++) {
            minuteDom.push('<span>' + (i < 10 ? '0' + i : i) + '</span>');
        }

        var type = this._data.config.time.type;

        calendarTimeDom.innerHTML = [
            // time title
            '   <div class="jDate-calendar-timer" style="' + (self._data.config.date.type == 0 ? 'border-top:none' : '') + '">',
            '       <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : '') + ' jDate-timer-input ">',
            '           <input></input>',
            '       </div>',
            '       <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : '') + ' jDate-timer-title-show">',
            '           <span class="jDate-timer-hour">',
            '               <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>',
            '           </span>',
            '           <span> : </span>',
            '           <span class="jDate-timer-minute">',
            '               <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>',
            '           </span>',
            '       </div>',
            // time title
            '       <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : 'jDate-timer-hide') + ' jDate-timer-input">',
            '           <input></input>',
            '       </div>',
            '       <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : 'jDate-timer-hide') + ' jDate-timer-title-show">',
            '           <span class="jDate-timer-hour">',
            '               <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>',
            '           </span>',
            '           <span> : </span>',
            '           <span class="jDate-timer-minute">',
            '               <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>',
            '           </span>',
            '       </div>',
            //
            '       <div class="jDate-timer-barbox">',
            // bar-ball
            '           <div class="jDate-timer-bar-handle animate">',
            '	            <div class="jDate-timer-bar-handle-color"></div>',
            '	            <div class="jDate-timer-bar-handle-ani"></div>',
            '           </div>',
            // bar-ball
            '           <div class="jDate-timer-bar-handle animate ' + (type === 3 ? 'jDate-timer-bar-handle-slot' : 'jDate-timer-hide') + '">',
            '	            <div class="jDate-timer-bar-handle-color"></div>',
            '	            <div class="jDate-timer-bar-handle-ani"></div>',
            '           </div>',
            //
            '           <div class="jDate-timer-bar"></div>',
            '           <div class="jDate-timer-text">',
            '               <span style="left: 0;">00:00</span>',
            '               <span style="left: 25%;">06:00</span>',
            '               <span style="left: 50%;">12:00</span>',
            '               <span style="left: 75%;">18:00</span>',
            '               <span style="left: 100%;">24:00</span>',
            '           </div>',
            '       </div>',
            '   </div>',
        ].join('');

        var barHandle = calendarTimeDom.querySelectorAll('.jDate-timer-bar-handle');
        this._timerHandle = barHandle[0];
        this._timerHandleSlot = barHandle[1];
        var minute = calendarTimeDom.querySelectorAll('.jDate-timer-minute');
        this._timerMinute = minute[0];
        this._timerMinuteSlot = minute[1];
        var hour = calendarTimeDom.querySelectorAll('.jDate-timer-hour');
        this._timerHour = hour[0];
        this._timerHourSlot = hour[1];
        var titleShow = calendarTimeDom.querySelectorAll('.jDate-timer-title-show');
        this._timerTitleShow = titleShow[0];
        this._timerTitleShowSlot = titleShow[1];
        var timeInput = calendarTimeDom.querySelectorAll('.jDate-timer-input');
        this._timerTitleInput = timeInput[0];
        this._timerTitleInputSlot = timeInput[1];

        this._timerQuickText = calendarTimeDom.querySelector('.jDate-timer-text');

        // init time
        setTimeout(function () {
            self._updateTime(self._data.choosed.time);
        }, 100);
        //
        calendar.appendChild(calendarTimeDom);
    }

    _initDomTarget() {
        var target = this._data.config.target;
        target.className = 'jDate-target';
        target.value = this._formatTime();
    }

    _formatTime() {
        var date = this._data.choosed.date;
        var dateType = this._data.config.date.type;
        var time = this._data.choosed.time;
        var timeType = this._data.config.time.type;
        var retStr = '';
        // date 
        if (date.length >= 1 && dateType !== 0) {
            if (dateType === 3) {
                date.sort(function (a, b) {
                    return a - b;
                });

                var _ret = [];
                date.forEach(function (date) {
                    var month = date.getMonth() + 1;
                    month = month < 10 ? '0' + month : month;
                    var _date = date.getDate();
                    _date = _date < 10 ? '0' + _date : _date;
                    _ret.push(date.getFullYear() + '/' + month + '/' + _date);
                });
                retStr += _ret.join('-');
            } else {
                var month = date[0].getMonth() + 1;
                month = month < 10 ? '0' + month : month;
                var _date = date[0].getDate();
                _date = _date < 10 ? '0' + _date : _date;
                retStr += date[0].getFullYear() + '/' + month + '/' + _date;
            }
        }
        // time 
        if (time.length >= 1 && timeType !== 0) {
            if (timeType !== 3) {
                time = time[0];
                var hour = time[0] < 10 ? '0' + time[0] : time[0];
                var minute = time[1] < 10 ? '0' + time[1] : time[1];
                retStr += (retStr == '' ? '' : ' ') + hour + ':' + minute;
            } else {
                time = time.sort(function (a, b) {
                    return (a[0] * 100 + a[1]) - (b[0] * 100 + b[1]);
                });
                var theTimeTemp = [];
                var theTime = time[0];
                var hour = theTime[0] < 10 ? '0' + theTime[0] : theTime[0];
                var minute = theTime[1] < 10 ? '0' + theTime[1] : theTime[1];
                theTimeTemp.push((retStr == '' ? '' : ' ') + hour + ':' + minute);

                theTime = time[1];
                var hour = theTime[0] < 10 ? '0' + theTime[0] : theTime[0];
                var minute = theTime[1] < 10 ? '0' + theTime[1] : theTime[1];
                theTimeTemp.push((retStr == '' ? '' : ' ') + hour + ':' + minute);

                retStr = theTimeTemp.join('-');
            }
        }
        return retStr;
    }

    _initEvent() {
        if (this._data.config.date.type != 0) {
            this._initEventCalendar();
        }
        if (this._data.config.time.type != 0) {
            this._initEventTimer();
        }
        if (this._data.config.target) {
            this._initEventTarget();
        }
        this._initEventSys();
    }

    _initEventCalendar() {
        var self = this;
        var preview = self._calendarPre;
        var next = self._calendarNext;
        preview.addEventListener('mouseup', function (e) {
            self.setMonth(self._date.getMonth() - 1);

            setTimeout(function () {
                self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner';
                self._calendarCurrBoxInnder.style.left = '-400px';
            }, 0)
            setTimeout(function () {
                self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner animate';
                self._calendarCurrBoxInnder.style.left = '-200px';
            }, 10)
        });
        next.addEventListener('mouseup', function (e) {
            // console.log('2-2', self._data.choosed.date);
            self.setMonth(self._date.getMonth() + 1);
            // console.log('2-3', self._data.choosed.date);
            setTimeout(function () {
                self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner';
                self._calendarCurrBoxInnder.style.left = '0px';
            }, 0)
            setTimeout(function () {
                self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner animate';
                self._calendarCurrBoxInnder.style.left = '-200px';
            }, 10)
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

    _initEventTimer() {
        var self = this;

        // quick select
        self._timerQuickText.addEventListener('click', function (e) {
            if (e.target.tagName == 'SPAN') {
                var value = e.target.innerText;
                var values = value.split(':').map(function (item) {
                    return parseInt(item);
                });
                self._updateTime([
                    values
                ]);
            }
        });
        //

        // input 
        var input = self._timerTitleInput.querySelector('input');
        self._timerTitleShow.addEventListener('click', function () {
            self._timerTitleShow.style.display = 'none';
            self._timerTitleInput.style.display = 'inline-block';
            var hour = self._data.choosed.time[0][0];
            hour = hour < 10 ? '0' + hour : hour;
            var minute = self._data.choosed.time[0][1];
            minute = minute < 10 ? '0' + minute : minute;
            input.value = hour + ' : ' + minute;
            input.focus();
        });

        input.addEventListener('blur', function () {
            self._timerTitleShow.style.display = 'inline-block';
            self._timerTitleInput.style.display = 'none';
        });

        input.addEventListener('keyup', function (e) {
            var value = this.value;
            var values = value.split(':').map(function (item) {
                return parseInt(item);
            });

            var hour = values[0] || 0;
            var minute = values[1] || 0;
            hour = Math.max(0, hour);
            hour = Math.min(24, hour);
            minute = Math.max(0, minute);
            minute = Math.min(59, minute);
            if (hour == 24) {
                minute = 0;
            };
            self._updateTime([
                [hour, minute]
            ]);

            if (e.keyCode == '13') {
                self._timerTitleShow.style.display = 'block';
                self._timerTitleInput.style.display = 'none';
                self._updateTime([
                    [hour, minute]
                ]);
            }
        });

        // input slot
        var inputSlot = self._timerTitleInputSlot.querySelector('input');
        self._timerTitleShowSlot.addEventListener('click', function () {
            self._timerTitleShowSlot.style.display = 'none';
            self._timerTitleInputSlot.style.display = 'inline-block';
            var hour = self._data.choosed.time[1][0];
            hour = hour < 10 ? '0' + hour : hour;
            var minute = self._data.choosed.time[1][1];
            minute = minute < 10 ? '0' + minute : minute;
            inputSlot.value = hour + ' : ' + minute;
            inputSlot.focus();
        });

        inputSlot.addEventListener('blur', function () {
            self._timerTitleShowSlot.style.display = 'inline-block';
            self._timerTitleInputSlot.style.display = 'none';
        });

        inputSlot.addEventListener('keyup', function (e) {
            // console.log()
            var theTime = [
                self._data.choosed.time[0],
                []
            ];

            var value = this.value;
            var values = value.split(':').map(function (item) {
                return parseInt(item);
            });

            var hour = values[0] || 0;
            var minute = values[1] || 0;
            hour = Math.max(0, hour);
            hour = Math.min(24, hour);
            minute = Math.max(0, minute);
            minute = Math.min(59, minute);
            if (hour == 24) {
                minute = 0;
            };

            theTime[1] = [hour, minute];
            self._updateTime(theTime);

            if (e.keyCode == '13') {
                self._timerTitleShowSlot.style.display = 'block';
                self._timerTitleInputSlot.style.display = 'none';
                self._updateTime(theTime);
            }
        });

        //
        ;
        (function () {
            var handle = self._timerHandle;
            var canMove = false;
            var startCursor;
            var startDom;
            var tempTime;

            handle.addEventListener('mousedown', function (e) {
                handle.className = 'jDate-timer-bar-handle active';
                startCursor = {
                    x: e.pageX,
                }

                var domStyle = getComputedStyle(handle);
                startDom = {
                    x: parseInt(domStyle.left)
                }
                canMove = true;
            });

            document.addEventListener('mousemove', function (e) {
                if (!canMove) return false;
                var delta = {
                    x: e.pageX - startCursor.x,
                };
                var left = startDom.x + delta.x;
                left = Math.max(0, left);
                left = Math.min(270, left);
                handle.style.left = left + 'px';
                e.preventDefault();
                e.stopPropagation();
                var timeMin = parseInt(left / 270 * (24 * 60));
                var step = self._data.config.time.step || 1;
                timeMin = Math.round(timeMin / step) * step;
                var time = tempTime = [parseInt(timeMin / 60), timeMin % 60];
                self._updateTime([time], true);
            });

            document.addEventListener('mouseup', function (e) {
                if (!canMove) return false;
                handle.className = 'jDate-timer-bar-handle animate';
                self._updateTime([tempTime]);
                startCursor = startDom = null;
                canMove = false;
            });
        })();

        //
        ;
        (function () {
            var handle = self._timerHandleSlot;
            var canMove = false;
            var startCursor;
            var startDom;
            var tempTime;

            handle.addEventListener('mousedown', function (e) {
                handle.className = 'jDate-timer-bar-handle active';
                startCursor = {
                    x: e.pageX,
                }

                var domStyle = getComputedStyle(handle);
                startDom = {
                    x: parseInt(domStyle.left)
                }
                canMove = true;
            });

            document.addEventListener('mousemove', function (e) {
                if (!canMove) return false;
                var delta = {
                    x: e.pageX - startCursor.x,
                };
                var left = startDom.x + delta.x;
                left = Math.max(0, left);
                left = Math.min(270, left);
                handle.style.left = left + 'px';
                e.preventDefault();
                e.stopPropagation();
                var timeMin = parseInt(left / 270 * (24 * 60));
                var step = self._data.config.time.step || 1;
                timeMin = Math.round(timeMin / step) * step;
                var time = tempTime = [parseInt(timeMin / 60), timeMin % 60];
                var theTime = self._data.choosed.time;
                theTime[1] = time;
                self._updateTime(theTime, true);
            });

            document.addEventListener('mouseup', function (e) {
                if (!canMove) return false;
                handle.className = 'jDate-timer-bar-handle animate';
                var theTime = self._data.choosed.time;
                theTime[1] = tempTime;
                self._updateTime(theTime);
                startCursor = startDom = null;
                canMove = false;
            });
        })();

    }

    _initEventTarget() {
        // console.log(1)
        var self = this;
        var target = this._data.config.target;
        target.addEventListener('mousedown', function (e) {
            // e.preventDefault();
        });
        target.addEventListener('click', function (e) {
            if (self.calendar.style.display !== 'block') {
                self._show();
            }
        });
    }

    _initEventSys() {
        var self = this;
        this.calendar.querySelector('.jDate-calendar-cancel').addEventListener('click', function () {
            self._data.choosed = self._data.sys.lastShowChoosed;
            self._hide();
            config.change && config.change();
        });

        this.calendar.querySelector('.jDate-calendar-ok').addEventListener('click', function () {
            self._freshTarget();
            self._hide();
            console.log(config.change)
            config.change && config.change();
        });

        // console.log('initsys')
        this._data.config.target && window.addEventListener('click', function (e) {
            var target = e.target;
            var find = false;
            while (target) {
                if (target == self.calendar || target == self._data.config.target) {
                    find = true;
                    break;
                }
                target = target.parentNode;
            }
            if (!find) {
                self._hide();
            }
        });

        this._data.config.target.addEventListener('keyup', function (e) {
            if (e.keyCode == 13) {
                self._hide();
                this.blur();
            } else {
                try {
                    var date = new Date(this.value);
                    if (date.getDate() < 40) {
                        self._data.choosed.date[0] = date;
                        self._data.choosed.time[0] = [date.getHours(), date.getMinutes()];
                        self._updateMonthTable();
                        self._updateTime(self._data.choosed.time);
                    }
                } catch (e) {

                }
            }
        });

        this._data.config.target.addEventListener('blur', function () {
            self._freshTarget()
        });
    }

    _show() {
        this._freshCalendar();
        var calendar = this.calendar;
        var target = this._data.config.target;
        // target.blur();

        calendar.style.display = 'block';

        var top = this._getOffset(target).top + target.offsetHeight;
        var left = this._getOffset(target).left;
        left = ((left + calendar.offsetWidth) > document.body.offsetWidth) ? document.body.offsetWidth - calendar.offsetWidth : left;
        top = ((top + calendar.offsetHeight) > (document.body.clientHeight + document.body.scrollTop)) ? document.body.clientHeight + document.body.scrollTop - calendar.offsetHeight : top;

        calendar.style.top = top + 1 + 'px';
        calendar.style.left = left + 'px';
        this._data.sys.lastShowChoosed = this._deepCopy(this._data.choosed);
    }

    _hide() {
        var calendar = this.calendar;
        calendar.style.display = 'none';
    }

    _getOffset(tar) {
        var _tar = tar;
        var top = 0;
        var left = 0;
        while (_tar) {
            top += _tar.offsetTop;
            left += _tar.offsetLeft;
            _tar = _tar.offsetParent;
        }
        return {
            top: top,
            left: left
        }
    }

    _deepCopy(obj) {
        var newObj = obj;
        if (typeof obj == 'object' && !(obj instanceof Date)) {
            newObj = obj instanceof Array ? [] : {};
            for (var i in obj) {
                newObj[i] = this._deepCopy(obj[i]);
            }
        }
        return newObj;
    }

    _freshTarget() {
        var target = this._data.config.target;
        target.value = this._formatTime();
    }
    _freshCalendar() {
        this._updateMonthTable();
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

        var endNum = lastDayDate + firstDayDay;
        // console.log(lastDayDate, deltaDay, date)

        // crate the table
        var table = document.createElement('table');
        var tableHead = document.createElement('tr');
        var tableHeadStrs = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        tableHead.innerHTML = '<th>' + tableHeadStrs.join('</th><th>') + '</th>';
        table.appendChild(tableHead);

        //
        var choosedDate = this._data.choosed.date;
        // console.log('2', this._data.choosed.date);


        var dateType = this._data.config.date.type;
        var maxTime = 0;
        var minTime = 0;
        if (dateType == 3 && choosedDate.length == 2) {
            minTime = Math.min(+choosedDate[0], +choosedDate[1]);
            maxTime = Math.max(+choosedDate[0], +choosedDate[1]);
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
                //
                var numState = '';
                for (var j in choosedDate) {
                    var choosedStartTime = choosedDate[j];
                    var yearEqual = _date.getFullYear() == choosedStartTime.getFullYear();
                    var monthEqual = _date.getMonth() == choosedStartTime.getMonth();
                    var dateEqual = _date.getDate() == choosedStartTime.getDate();

                    if (yearEqual && monthEqual && dateEqual) {
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
        date.setDate(1);
        var current = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
        this._calendarCurr.innerHTML = current;
        date.setMonth(date.getMonth() - 1);
        var currentPre = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
        this._calendarCurrPre.innerHTML = currentPre;
        date.setMonth(date.getMonth() + 2);
        var currentNext = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
        this._calendarCurrNext.innerHTML = currentNext;
    }

    //
    _updateMonthTable() {
        // console.log(this)
        var dates = this._data.choosed.date;
        // console.log('_updateMonthTable', dates);
        // console.log(dates);
        var dateType = this._data.config.date.type;
        var doms = this._data.sys.dateDoms;

        var maxTime = 0;
        var minTime = 0;
        if (dateType == 3 && dates.length == 2) {
            minTime = Math.min(+dates[0], +dates[1]);
            maxTime = Math.max(+dates[0], +dates[1]);
        }

        doms.map(function (dom) {
            if (dates.length <= 0) {
                dom.dom.className = '';
            } else {
                for (var i in dates) {
                    var data = dates[i];
                    var yearEqual = dom.date.getFullYear() == data.getFullYear();
                    var monthEqual = dom.date.getMonth() == data.getMonth();
                    var dateEqual = dom.date.getDate() == data.getDate();
                    if (yearEqual && monthEqual && dateEqual) {
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
                this._data.choosed.date = this._data.choosed.date.filter(function (value, index) {
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

    _updateTime(time, withoutBar) {
        var theTime = this._data.choosed.time;


        if (time[0]) {
            var _time = time[0];
            if (!withoutBar) {
                var totalMin = _time[0] * 60 + _time[1];
                var present = totalMin / (24 * 60);
                this._timerHandle.style.left = present * 100 + '%';
            }
            var minute = this._timerMinute.querySelector('.jDate-timer-minute-in');
            var hour = this._timerHour.querySelector('.jDate-timer-hour-in');
            hour.style.top = _time[0] * -20 + 'px';
            minute.style.top = _time[1] * -20 + 'px';
            theTime[0] = time[0];
        }

        if (time[1]) {
            var _time = time[1];
            if (!withoutBar) {
                var totalMin = _time[0] * 60 + _time[1];
                var present = totalMin / (24 * 60);
                this._timerHandleSlot.style.left = present * 100 + '%';
            }
            var minute = this._timerMinuteSlot.querySelector('.jDate-timer-minute-in');
            var hour = this._timerHourSlot.querySelector('.jDate-timer-hour-in');
            hour.style.top = _time[0] * -20 + 'px';
            minute.style.top = _time[1] * -20 + 'px';
            theTime[1] = time[1];
        }

        // if (theTime.length === 2) {
        //     theTime.sort(function (a, b) {
        //         return (a[0] * 100 + a[1]) - (b[0] * 100 + b[1]);
        //     });
        // };

        this._data.choosed.time = theTime;

    }

    remove() {
        this.calendar.remove();
    }

    set(time) {}
    setYear(year) {}
    setMonth(month) {
        this._date.setMonth(month);
        this._createMonthTable();
    }
    setDate(date) {
        // this._date = date;
    }

    setChoosed(date) {
        // TODO: what if we set multi date
        this._data.choosed.date[0] = date;
        this._data.choosed.time[0] = [date.getHours(), date.getMinutes()];
        this._freshTarget();
    }

}


class Material {
    constructor(dom) {
        var self = this;
        self.dom = dom;

        // box
        var box = this.materialBox = document.createElement('div');
        box.className = 'material-box';
        var boxWidth = Math.max(dom.clientHeight, dom.clientWidth);
        box.style.width = box.style.height = boxWidth + 'px';
        box.style.width = box.style.height = boxWidth + 'px';
        box.style.margin = -boxWidth / 2 + 'px';

        //div
        var div = this.material = document.createElement('div');
        box.appendChild(this.material);
        self.canHide = true;
        self.doHide = false;
        div.className = 'material';
        dom.appendChild(box);

        //
        setTimeout(function () {
            self.canHide = false;
            self.show();
            setTimeout(function () {
                self.canHide = true;
                if (self.doHide) {
                    self.hide();
                }
            }, 300);
        });
    }

    show() {
        this.material.className = 'material active';
    }

    hide() {
        if (this.canHide == false) {
            this.doHide = true;
            return;
        }
        var self = this;
        this.material.className = 'material finished';
        setTimeout(function () {
            self.materialBox.remove();
        }, 300);
    }
}

// for animate
var amimates = [];
document.addEventListener('mousedown', function (e) {
    var dom = e.target;
    while (dom) {
        if (/material-ani/.test(dom.className)) {
            amimates.push(new Material(dom));
            break;
        }
        dom = dom.parentElement;
    }
});

window.addEventListener('mouseup', function (e) {
    for (var i in amimates) {
        amimates[i].hide();
    }
});

window.jDate = jDate;