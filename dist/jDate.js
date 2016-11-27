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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
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

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * jDate
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Mofei<13761509829@163.com> 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _tools = __webpack_require__(2);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var jDate = function () {
    function jDate(id) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, jDate);

        this.maps = {
            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            week: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        };

        this.date = new Date();
        this.doms = {
            target: document.querySelector('#' + id)
        };

        this.config = {
            date: {
                type: config.date && config.date.type || jDate.Single
            },
            time: {
                type: config.time && config.time.type || jDate.Single
            }
        };

        this.datas = {
            date: [new Date()],
            time: []
        };

        this.initDom();
        this.initEvent();
    }

    _createClass(jDate, [{
        key: 'initDom',
        value: function initDom() {
            // create calendar
            var calendar = this.calendar = document.createElement('div');
            calendar.className = 'jDate-calendar';
            var tarOffset = _tools2.default.getOffset(this.doms.target);
            var tarHeight = this.doms.target.offsetHeight;
            calendar.style.top = tarOffset.top + tarHeight + 'px';
            calendar.style.left = tarOffset.left + 'px';

            // calendar
            this.initDomCalendar();

            // // timer
            // this._initDomTimer();

            // // target 
            // this._initDomTarget();


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
    }, {
        key: 'initEvent',
        value: function initEvent() {
            this.initEventCalendar();

            // this._initEventTimer();

            // this._initEventTarget();

            // this._initEventSys();
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

            this.createMonthTable();
        }
    }]);

    return jDate;
}();

jDate.Single = 0;
jDate.Multi = 1;
jDate.Period = 2;

// for material animateion
__webpack_require__(1);

module.exports = global.jDate = jDate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }
/******/ ]);