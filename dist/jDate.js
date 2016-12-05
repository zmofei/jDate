/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * jDate
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Mofei<13761509829@163.com> 
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _tools = __webpack_require__(1);

	var _tools2 = _interopRequireDefault(_tools);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * jDate(tar,config)
	 */
	var jDate = function () {
	    function jDate(id) {
	        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, jDate);

	        var target = document.querySelector('#' + id);

	        this.maps = {
	            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	            week: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
	        };

	        this.date = new Date();
	        this.doms = {
	            target: target
	        };

	        // set default config
	        this.config = {};
	        for (var i in config) {
	            this.config[i] = config[i];
	        }

	        this.config.date = {
	            type: config.date || config.time ? config.date && config.date.type || jDate.Null : jDate.Single
	        };
	        this.config.time = {
	            type: config.date || config.time ? config.time && config.time.type || jDate.Null : jDate.Single,
	            step: 1
	        };

	        var toadyDate = _tools2.default.getDate(new Date());
	        var todayTime = _tools2.default.getTime(new Date());
	        this.datas = {
	            date: config.date && config.date.value || [new Date(toadyDate[0], toadyDate[1], toadyDate[2])],
	            time: config.time && config.time.value || [new Date(toadyDate[0], toadyDate[1], toadyDate[2], todayTime[0], todayTime[1]), new Date(toadyDate[0], toadyDate[1], toadyDate[2], 23, 59)]
	        };

	        this.initDom();
	        this.initEvent();
	    }

	    _createClass(jDate, [{
	        key: 'initDom',
	        value: function initDom() {
	            // create calendar
	            var calendar = this.calendar = document.createElement('div');
	            calendar.style.display = 'none';
	            calendar.className = 'jDate-calendar';
	            var tarOffset = _tools2.default.getOffset(this.doms.target);
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
	            actionDom.innerHTML = ['<span class="material-ani"><button class="jDate-calendar-cancel">cancel</button></span>', '<span class="material-ani"><button class="jDate-calendar-ok">ok</button></span>'].join('');
	            calendar.appendChild(actionDom);
	            document.body.appendChild(calendar);
	        }
	    }, {
	        key: 'initDomCalendar',
	        value: function initDomCalendar() {
	            var calendar = this.calendar;
	            var calendarDateDom = document.createElement('div');

	            calendarDateDom.className = 'jDate-calendar-date';
	            calendarDateDom.innerHTML = ['<div class="jDate-calendar-title">', '    <span class="jDate-calendar-pre material-ani">', '        <div class="material"></div>', '        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>', '    </span>', '    <span class="jDate-calendar-curr-box">', '        <span class="jDate-calendar-curr-box-inner">', '           <span class="jDate-calendar-curr-pre"></span>', '           <span class="jDate-calendar-curr"></span>', '           <span class="jDate-calendar-curr-next"></span>', '        </span>', '    </span>', '    <span class="jDate-calendar-next material-ani">', '        <div class="material"></div>', '        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>', '    </span>', '</div>', '<div class="jDate-calendar-table"></div>'].join('');

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
	    }, {
	        key: 'initDomTimer',
	        value: function initDomTimer() {
	            var self = this;
	            var calendar = this.calendar;
	            var calendarTimeDom = document.createElement('div');
	            calendarTimeDom.className = 'jDate-calendar-date';

	            var hoursDom = [];
	            var minuteDom = [];
	            for (var i = 0; i <= 24; i++) {
	                hoursDom.push('<span>' + (i < 10 ? '0' + i : i) + '</span>');
	            }

	            for (var _i = 0; _i <= 60; _i++) {
	                minuteDom.push('<span>' + (_i < 10 ? '0' + _i : _i) + '</span>');
	            }

	            var type = this.config.time.type;

	            calendarTimeDom.innerHTML = ['<div class="jDate-calendar-timer">',
	            // left input
	            '    <div class="jDate-timer-title ' + (type === jDate.Period ? 'jDate-timer-title-slot' : '') + ' jDate-timer-input ">', '        <input></input>', '    </div>', '    <div class="jDate-timer-title ' + (type === jDate.Period ? 'jDate-timer-title-slot' : '') + ' jDate-timer-title-show">', '        <span class="jDate-timer-hour">', '            <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>', '        </span>', '        <span> : </span>', '        <span class="jDate-timer-minute">', '            <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>', '        </span>', '    </div>',
	            // right input
	            '    <div class="jDate-timer-title ' + (type === jDate.Period ? 'jDate-timer-title-slot' : 'jDate-none') + ' jDate-timer-input ">', '        <input></input>', '    </div>', '    <div class="jDate-timer-title ' + (type === jDate.Period ? 'jDate-timer-title-slot' : 'jDate-none') + ' jDate-timer-title-show">', '        <span class="jDate-timer-hour">', '            <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>', '        </span>', '        <span> : </span>', '        <span class="jDate-timer-minute">', '            <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>', '        </span>', '    </div>',
	            //
	            '    <div class="jDate-timer-barbox">',
	            // left bar
	            '        <div class="jDate-timer-bar-handle animate">', '            <div class="jDate-timer-bar-handle-color"></div>', '            <div class="jDate-timer-bar-handle-ani"></div>', '        </div>',
	            // right bar
	            '        <div class="jDate-timer-bar-handle animate ' + (type === jDate.Period ? 'jDate-timer-bar-handle-slot' : 'jDate-none') + '" style="left:100%;">', '            <div class="jDate-timer-bar-handle-color"></div>', '            <div class="jDate-timer-bar-handle-ani"></div>', '        </div>',
	            // for period line
	            '       <div class="jDate-timer-period-line ' + (type === jDate.Period ? '' : 'jDate-none') + '"></div>',
	            //
	            '        <div class="jDate-timer-bar"></div>', '        <div class="jDate-timer-text">', '            <span style="left: 0;">00:00</span>', '            <span style="left: 25%;">06:00</span>', '            <span style="left: 50%;">12:00</span>', '            <span style="left: 75%;">18:00</span>', '            <span style="left: 100%;">23:59</span>', '        </div>', '    </div>', '</div>'].join('');

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
	    }, {
	        key: 'createMonthTable',
	        value: function createMonthTable() {
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
	                        var startTime = _tools2.default.getDate(new Date(Math.min(timeA, timeB)));
	                        var endTime = _tools2.default.getDate(new Date(Math.max(timeA, timeB)));
	                        startTime = new Date(startTime[0], startTime[1], startTime[2]);
	                        endTime = new Date(endTime[0], endTime[1], endTime[2]);
	                        choosedDate = {
	                            startTime: startTime,
	                            endTime: endTime
	                        };
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
	                var dateNum = i - firstDayDay + 1;
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
	                        choosedDate.forEach(function (theDate) {
	                            if (_tools2.default.dateEqual(theDate, _date)) {
	                                numState = 'active';
	                            }
	                        });
	                    }

	                    //
	                    _td.className = numState;
	                    _td.innerHTML = ['<span>', '<div></div>', dateNum, '</span>'].join('');
	                    _td.addEventListener('click', this.chooseDate.bind(this, _date));

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
	    }, {
	        key: 'initEvent',
	        value: function initEvent() {
	            if (this.config.date.type !== jDate.Null) {
	                this.initEventCalendar();
	            }

	            if (this.config.time.type !== jDate.Null) {
	                this.initEventTimer();
	            }

	            this.initEventSys();
	        }
	    }, {
	        key: 'initEventCalendar',
	        value: function initEventCalendar() {
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
	                    }, 10);
	                }, 0);
	            });
	        }
	    }, {
	        key: 'initEventTimer',
	        value: function initEventTimer() {
	            var self = this;

	            // quick select
	            self.doms.timerQuickText.addEventListener('click', function (e) {
	                if (e.target.tagName === 'SPAN') {
	                    var value = e.target.innerText;
	                    var values = value.split(':').map(function (item) {
	                        return parseInt(item);
	                    });

	                    self.updateTime([new Date(2016, 10, 27, values[0], values[1])]);
	                }
	            });
	            //

	            // change time 
	            var time = self.datas.time;
	            var inputDom = [].concat(_toConsumableArray(this.doms.timeInputs));
	            var isPeriod = this.config.time.type === jDate.Period && this.datas.time.length === 2;
	            inputDom.map(function (theInput, index) {
	                var input = theInput.querySelector('input');
	                self.doms.timerTitleShows[index].addEventListener('click', function () {
	                    self.doms.timerTitleShows[index].style.display = 'none';
	                    self.doms.timeInputs[index].style.display = isPeriod ? 'inline-block' : 'block';
	                    var hour = self.datas.time[index].getHours();
	                    hour = hour < 10 ? '0' + hour : hour;
	                    var minute = self.datas.time[index].getMinutes();
	                    minute = minute < 10 ? '0' + minute : minute;
	                    input.value = hour + ' : ' + minute;
	                    input.focus();
	                });

	                input.addEventListener('blur', function () {
	                    self.doms.timerTitleShows[index].style.display = isPeriod ? 'inline-block' : 'block';
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
	                var handle = self.doms.timerHandles[index];
	                var canMove = false;
	                var startCursor = void 0;
	                var startDom = void 0;
	                var tempTime = void 0;

	                handle.addEventListener('mousedown', function (e) {
	                    handle.className = 'jDate-timer-bar-handle active';
	                    startCursor = {
	                        x: e.pageX
	                    };

	                    var domStyle = getComputedStyle(handle);
	                    // console.log(handle);
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

	                    var step = self.config.time.step || 1;
	                    timeMin = Math.round(timeMin / step) * step;
	                    var hour = parseInt(timeMin / 60) || 0;
	                    var minute = timeMin % 60 || 0;
	                    if (hour >= 24) {
	                        hour = 23;
	                        minute = 59;
	                    }

	                    tempTime = [hour, minute];
	                    if (index === 0 && time[1]) {
	                        var otherHours = time[1].getHours();
	                        var otherMinute = time[1].getMinutes();
	                        if (otherHours * 100 + otherMinute < hour * 100 + minute) {
	                            tempTime = [otherHours, otherMinute];
	                        }
	                    }
	                    if (index === 1 && time[0]) {
	                        var _otherHours = time[0].getHours();
	                        var _otherMinute = time[0].getMinutes();
	                        if (_otherHours * 100 + _otherMinute > hour * 100 + minute) {
	                            tempTime = [_otherHours, _otherMinute];
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
	    }, {
	        key: 'initEventSys',
	        value: function initEventSys() {
	            var _this = this;

	            var self = this;

	            // drag the calendar box
	            var movePos = {
	                cursor: [0, 0],
	                calendar: [0, 0],
	                mousedown: false,
	                canMove: true
	            };

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

	            window.addEventListener('click', function (e) {
	                var dom = e.target;
	                var isFit = false;
	                while (dom) {
	                    if (dom === _this.doms.target || dom === _this.calendar) {
	                        isFit = true;
	                        break;
	                    }
	                    dom = dom.parentElement;
	                }
	                if (!isFit) {
	                    _this.calendar.style.display = 'none';
	                }
	            });

	            // cancel and ok button
	            var btns = this.calendar.querySelectorAll('.jDate-calendar-action button');
	            btns[0].addEventListener('click', function () {
	                _this.calendar.style.display = 'none';
	            });
	            btns[1].addEventListener('click', function () {
	                var timeStr = '';
	                var datas = _this.datas.date || [];
	                switch (_this.config.date.type) {
	                    case jDate.Single:
	                        timeStr += _tools2.default.getDate(datas[0]).join('/');
	                        break;
	                    case jDate.Multi:
	                        timeStr += _tools2.default.getDate(datas[0]).join('/') + ' (' + datas.length + ')';
	                        break;
	                    case jDate.Period:
	                        if (datas.length >= 2) {
	                            timeStr += _tools2.default.getDate(datas[0]).join('/');
	                            timeStr += ' - ';
	                            timeStr += _tools2.default.getDate(datas[datas.length - 1]).join('/');
	                        } else {
	                            timeStr += _tools2.default.getDate(datas[0]).join('/');
	                        }
	                        break;
	                    default:
	                }

	                var times = _this.datas.time || [];
	                timeStr += timeStr === '' ? '' : _this.config.time.type === jDate.Null ? '' : ' ';
	                switch (_this.config.time.type) {
	                    case jDate.Single:
	                        timeStr += _tools2.default.getTime(times[0]).join(':');
	                        break;
	                    case jDate.Multi:
	                        timeStr += _tools2.default.getTime(times[0]).join(':') + ' (' + times.length + ')';
	                        break;
	                    case jDate.Period:
	                        if (times.length >= 2) {
	                            timeStr += _tools2.default.getTime(times[0]).join(':');
	                            timeStr += ' - ';
	                            timeStr += _tools2.default.getTime(times[times.length - 1]).join(':');
	                        } else {
	                            timeStr += _tools2.default.getTime(times[0]).join(':');
	                        }
	                        break;
	                    default:
	                }

	                var target = _this.doms.target;
	                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
	                    target.value = timeStr;
	                } else {
	                    target.innerText = timeStr;
	                }
	                _this.calendar.style.display = 'none';
	            });

	            this.doms.target.addEventListener('click', function () {
	                if (_this.calendar.style.display === 'none') {
	                    var tarOffset = _tools2.default.getOffset(_this.doms.target);
	                    var tarHeight = _this.doms.target.offsetHeight;
	                    _this.calendar.style.top = tarOffset.top + tarHeight + 'px';
	                    _this.calendar.style.left = tarOffset.left + 'px';
	                    _this.calendar.style.display = 'block';
	                }
	            });
	        }
	    }, {
	        key: 'setMonth',
	        value: function setMonth(month) {
	            this.date.setMonth(month);
	            this.createMonthTable();
	        }
	    }, {
	        key: 'chooseDate',
	        value: function chooseDate(date) {
	            var _this2 = this;

	            var fitIndex = null;
	            var isFit = this.datas.date.some(function (theDate, index) {
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

	            setTimeout(function () {
	                _this2.createMonthTable();
	            });
	        }
	    }, {
	        key: 'updateTime',
	        value: function updateTime(times) {
	            var _this3 = this;

	            var type = this.config.time.type;
	            var theTime = this.datas.time;
	            times.forEach(function (time, index) {
	                var totalMin = time.getHours() * 60 + time.getMinutes();
	                var present = totalMin / (24 * 60);
	                _this3.doms.timerHandles[index].style.left = present * 100 + '%';

	                var minute = _this3.doms.timerMinutes[index].querySelector('.jDate-timer-minute-in');
	                var hour = _this3.doms.timerHouers[index].querySelector('.jDate-timer-hour-in');
	                hour.style.top = time.getHours() * -20 + 'px';
	                minute.style.top = time.getMinutes() * -20 + 'px';
	                theTime[index] = time;

	                if (type === jDate.Period) {
	                    // this.doms.timerLine
	                    if (index === 0) {
	                        _this3.doms.timerLine.style.left = present * 100 + '%';
	                    }

	                    if (index === 1) {
	                        _this3.doms.timerLine.style.right = (1 - present) * 100 + '%';
	                    }
	                }
	            });
	            this.datas.time = theTime;
	        }
	    }]);

	    return jDate;
	}();

	jDate.Null = 0;
	jDate.Single = 1;
	jDate.Multi = 2;
	jDate.Period = 3;

	// for material animateion
	__webpack_require__(2);

	module.exports = global.jDate = jDate;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var tools = {
	    getOffset: function getOffset(dom) {
	        var offset = {
	            left: 0,
	            top: 0
	        };
	        while (dom) {
	            offset.left += dom.offsetLeft;
	            offset.top += dom.offsetTop;
	            dom = dom.offsetParent;
	        }
	        return offset;
	    },
	    getDate: function getDate(date) {
	        return [date.getFullYear(), date.getMonth(), date.getDate()];
	    },
	    getTime: function getTime(date) {
	        return [date.getHours(), date.getMinutes()];
	    },
	    dateEqual: function dateEqual(paramA, paramB) {
	        if (paramA && paramB) {
	            return this.getDate(paramA).join(',') === this.getDate(paramB).join(',');
	        } else {
	            return false;
	        }
	    }
	};

	exports.default = tools;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Material = function () {
	    function Material(dom) {
	        _classCallCheck(this, Material);

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

	    _createClass(Material, [{
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

/***/ }
/******/ ]);