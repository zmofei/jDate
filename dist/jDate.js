var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var jDate = function () {
    function jDate() {
        classCallCheck(this, jDate);


        this.maps = {
            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        };

        this._date = new Date();

        this._data = {
            config: {
                date: {
                    type: 3, // 0:disable, 1: single day, 2: multi time, 3:time slot 
                    max: 3 // for multi
                },
                time: {
                    type: 1 }
            },
            choosed: {
                date: [new Date(2016, 6, 14)],
                time: [[12, 59]]
            },
            sys: {
                dateDoms: []
            }
        };
        console.log(this._data);

        // crate dom
        this._initDom();
        // init Event
        this._initEvent();

        // show month
        this._createMonthTable();
    }

    createClass(jDate, [{
        key: '_initDom',
        value: function _initDom() {
            // create calendar
            var calendar = this.calendar = document.createElement('div');
            calendar.className = 'jDate-calendar';

            // calendar
            this._initDomCalendar();

            // timer
            this._initDomTimer();

            // action button
            var actionDom = document.createElement('div');
            actionDom.className = 'jDate-calendar-action';
            actionDom.innerHTML = ['<span class="material-ani"><button class="jDate-calendar-cancel">cancel</button></span>', '<span class="material-ani"><button class="jDate-calendar-ok">ok</button></span>'].join('');
            calendar.appendChild(actionDom);

            //
            document.body.appendChild(calendar);
        }
    }, {
        key: '_initDomCalendar',
        value: function _initDomCalendar() {
            var calendar = this.calendar;
            var calendarDateDom = document.createElement('div');
            calendarDateDom.className = 'jDate-calendar-date';

            calendarDateDom.innerHTML = ['   <div class="jDate-calendar-title">', '       <span class="jDate-calendar-pre material-ani">', '           <div class="material"></div>', '           <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>', '       </span>', '       <span class="jDate-calendar-curr-box">', '           <span class="jDate-calendar-curr-box-inner">', '              <span class="jDate-calendar-curr-pre"></span>', '              <span class="jDate-calendar-curr"></span>', '              <span class="jDate-calendar-curr-next"></span>', '           </span>', '       </span>', '       <span class="jDate-calendar-next material-ani">', '           <div class="material"></div>', '           <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>', '       </span>', '   </div>', '   <div class="jDate-calendar-table"></div>', '   <div class="jDate-calendar-action">', '   </div>'].join('');

            this._calendarTable = calendarDateDom.querySelector('.jDate-calendar-table');
            this._calendarPre = calendarDateDom.querySelector('.jDate-calendar-pre');
            this._calendarNext = calendarDateDom.querySelector('.jDate-calendar-next');
            this._calendarCurr = calendarDateDom.querySelector('.jDate-calendar-curr');
            this._calendarCurrPre = calendarDateDom.querySelector('.jDate-calendar-curr-pre');
            this._calendarCurrNext = calendarDateDom.querySelector('.jDate-calendar-curr-next');
            this._calendarCurrBoxInnder = calendarDateDom.querySelector('.jDate-calendar-curr-box-inner');
            calendar.appendChild(calendarDateDom);
        }
    }, {
        key: '_initDomTimer',
        value: function _initDomTimer() {
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

            calendarTimeDom.innerHTML = ['   <div class="jDate-calendar-timer">', '       <div class="jDate-timer-title jDate-timer-input">', '           <input></input>', '       </div>', '       <div class="jDate-timer-title jDate-timer-title-show">', '           <span class="jDate-timer-hour">', '               <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>', '           </span>', '           <span> : </span>', '           <span class="jDate-timer-minute">', '               <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>', '           </span>', '       </div>', '       <div class="jDate-timer-barbox">', '           <div class="jDate-timer-bar-handle animate">', '	            <div class="jDate-timer-bar-handle-color"></div>', '	            <div class="jDate-timer-bar-handle-ani"></div>', '           </div>', '           <div class="jDate-timer-bar"></div>', '           <div class="jDate-timer-text">', '               <span style="left: 0;">00:00</span>', '               <span style="left: 25%;">06:00</span>', '               <span style="left: 50%;">12:00</span>', '               <span style="left: 75%;">18:00</span>', '               <span style="left: 100%;">24:00</span>', '           </div>', '       </div>', '   </div>'].join('');

            this._timerHandle = calendarTimeDom.querySelector('.jDate-timer-bar-handle');
            this._timerMinute = calendarTimeDom.querySelector('.jDate-timer-minute');
            this._timerHour = calendarTimeDom.querySelector('.jDate-timer-hour');
            this._timerTitleShow = calendarTimeDom.querySelector('.jDate-timer-title-show');
            this._timerTitleInput = calendarTimeDom.querySelector('.jDate-timer-input');
            this._timerQuickText = calendarTimeDom.querySelector('.jDate-timer-text');

            // init time
            setTimeout(function () {
                self._updateTime(self._data.choosed.time);
            }, 100);
            //
            calendar.appendChild(calendarTimeDom);
        }
    }, {
        key: '_initEvent',
        value: function _initEvent() {
            this._initEventCalendar();
            this._initEventTimer();

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
        }
    }, {
        key: '_initEventCalendar',
        value: function _initEventCalendar() {
            var self = this;
            var preview = self._calendarPre;
            var next = self._calendarNext;
            preview.addEventListener('mouseup', function (e) {
                self.setMonth(self._date.getMonth() - 1);

                setTimeout(function () {
                    self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner';
                    self._calendarCurrBoxInnder.style.left = '-400px';
                }, 0);
                setTimeout(function () {
                    self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner animate';
                    self._calendarCurrBoxInnder.style.left = '-200px';
                }, 10);
            });
            next.addEventListener('mouseup', function (e) {
                self.setMonth(self._date.getMonth() + 1);

                setTimeout(function () {
                    self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner';
                    self._calendarCurrBoxInnder.style.left = '0px';
                }, 0);
                setTimeout(function () {
                    self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner animate';
                    self._calendarCurrBoxInnder.style.left = '-200px';
                }, 10);
            });
        }
    }, {
        key: '_initEventTimer',
        value: function _initEventTimer() {
            var self = this;
            var handle = self._timerHandle;

            //
            self._timerQuickText.addEventListener('click', function (e) {
                if (e.target.tagName == 'SPAN') {
                    var value = e.target.innerText;
                    var values = value.split(':').map(function (item) {
                        return parseInt(item);
                    });
                    self._updateTime([values]);
                }
            });
            //

            var input = self._timerTitleInput.querySelector('input');
            self._timerTitleShow.addEventListener('click', function () {
                self._timerTitleShow.style.display = 'none';
                self._timerTitleInput.style.display = 'block';
                var hour = self._data.choosed.time[0][0];
                hour = hour < 10 ? '0' + hour : hour;
                var minute = self._data.choosed.time[0][1];
                minute = minute < 10 ? '0' + minute : minute;
                input.value = hour + ' : ' + minute;
                input.focus();
            });

            input.addEventListener('blur', function () {
                self._timerTitleShow.style.display = 'block';
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
                self._updateTime([[hour, minute]]);

                if (e.keyCode == '13') {
                    self._timerTitleShow.style.display = 'block';
                    self._timerTitleInput.style.display = 'none';
                    self._updateTime([[hour, minute]]);
                }
            });

            var canMove = false;
            var startCursor;
            var startDom;
            var tempTime;

            handle.addEventListener('mousedown', function (e) {
                handle.className = 'jDate-timer-bar-handle active';
                startCursor = {
                    x: e.pageX
                };

                var domStyle = getComputedStyle(handle);
                startDom = {
                    x: parseInt(domStyle.left)
                };
                canMove = true;
            });

            document.addEventListener('mousemove', function (e) {
                if (!canMove) return false;
                var delta = {
                    x: e.pageX - startCursor.x
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
        }

        // show month table

    }, {
        key: '_createMonthTable',
        value: function _createMonthTable() {
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
            var endNum = lastDayDate + (deltaDay == 0 ? 0 : 7 - deltaDay);

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
                var dateNum = i - firstDayDay + 1;
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
            date.setDate(1);
            var current = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
            this._calendarCurr.innerHTML = current;
            date.setMonth(date.getMonth() - 1);
            var currentPre = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
            console.log(currentPre);
            this._calendarCurrPre.innerHTML = currentPre;
            date.setMonth(date.getMonth() + 2);
            var currentNext = this.maps.month[date.getMonth()] + ' ' + date.getFullYear();
            this._calendarCurrNext.innerHTML = currentNext;
        }

        //

    }, {
        key: '_updateMonthTable',
        value: function _updateMonthTable() {
            var dates = this._data.choosed.date;
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
            });
        }
    }, {
        key: '_chooseDate',
        value: function _chooseDate(date) {
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
                    var max = dateType == 3 ? 2 : this._data.config.date.max || Infinity;
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
    }, {
        key: '_updateTime',
        value: function _updateTime(time, withoutBar) {
            var time = time[0];
            // console.log(time)
            if (!withoutBar) {
                var totalMin = time[0] * 60 + time[1];
                var present = totalMin / (24 * 60);
                this._timerHandle.style.left = present * 100 + '%';
            }

            var minute = this._timerMinute.querySelector('.jDate-timer-minute-in');
            var hour = this._timerHour.querySelector('.jDate-timer-hour-in');
            hour.style.top = time[0] * -20 + 'px';
            minute.style.top = time[1] * -20 + 'px';

            this._data.choosed.time = [time];
        }
    }, {
        key: 'set',
        value: function set(time) {}
    }, {
        key: 'setYear',
        value: function setYear(year) {}
    }, {
        key: 'setMonth',
        value: function setMonth(month) {
            // month;
            this._date.setMonth(month);
            this._createMonthTable();
        }
    }, {
        key: 'setDate',
        value: function setDate(date) {}
    }]);
    return jDate;
}();

var Material = function () {
    function Material(dom) {
        classCallCheck(this, Material);

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

    createClass(Material, [{
        key: 'show',
        value: function show() {
            this.material.className = 'material active';
        }
    }, {
        key: 'hide',
        value: function hide() {
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
    }]);
    return Material;
}();

window.jDate = jDate;