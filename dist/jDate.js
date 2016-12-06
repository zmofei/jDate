<<<<<<< HEAD
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





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







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var jDate = function () {
    function jDate(config, data) {
        classCallCheck(this, jDate);

        this.maps = {
            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        };

        this._date = new Date(+(data && data.current || new Date()));

        this._data = {
            config: {
                date: {
                    type: 0 },
                time: {
                    type: 0 }
            },
            choosed: {
                date: [new Date(this._date.getFullYear(), this._date.getMonth(), this._date.getDate()), new Date(this._date.getFullYear(), this._date.getMonth(), this._date.getDate())],
                time: [[0, 0], [23, 59]]
            },
            sys: {
                dateDoms: []
            }
        };

        if (config) {
            for (var i in config) {
                this._data.config[i] = config[i];
            }
        }

        if (data) {
            for (var i in data) {
                this._data.choosed[i] = data[i];
            }
        }
        // crate dom
        this._initDom();
        // init Event
        this._initEvent();
    }

    createClass(jDate, [{
        key: '_initDom',
        value: function _initDom() {
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

            calendarDateDom.innerHTML = ['   <div class="jDate-calendar-title">', '       <span class="jDate-calendar-pre material-ani">', '           <div class="material"></div>', '           <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>', '       </span>', '       <span class="jDate-calendar-curr-box">', '           <span class="jDate-calendar-curr-box-inner">', '              <span class="jDate-calendar-curr-pre"></span>', '              <span class="jDate-calendar-curr"></span>', '              <span class="jDate-calendar-curr-next"></span>', '           </span>', '       </span>', '       <span class="jDate-calendar-next material-ani">', '           <div class="material"></div>', '           <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>', '       </span>', '   </div>', '   <div class="jDate-calendar-table"></div>'].join('');

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

            var type = this._data.config.time.type;

            calendarTimeDom.innerHTML = [
            // time title
            '   <div class="jDate-calendar-timer" style="' + (self._data.config.date.type == 0 ? 'border-top:none' : '') + '">', '       <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : '') + ' jDate-timer-input ">', '           <input></input>', '       </div>', '       <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : '') + ' jDate-timer-title-show">', '           <span class="jDate-timer-hour">', '               <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>', '           </span>', '           <span> : </span>', '           <span class="jDate-timer-minute">', '               <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>', '           </span>', '       </div>',
            // time title
            '       <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : 'jDate-timer-hide') + ' jDate-timer-input">', '           <input></input>', '       </div>', '       <div class="jDate-timer-title ' + (type === 3 ? 'jDate-timer-title-slot' : 'jDate-timer-hide') + ' jDate-timer-title-show">', '           <span class="jDate-timer-hour">', '               <span class="jDate-timer-hour-in">' + hoursDom.join('') + '</span>', '           </span>', '           <span> : </span>', '           <span class="jDate-timer-minute">', '               <span class="jDate-timer-minute-in">' + minuteDom.join('') + '</span>', '           </span>', '       </div>',
            //
            '       <div class="jDate-timer-barbox">',
            // bar-ball
            '           <div class="jDate-timer-bar-handle animate">', '	            <div class="jDate-timer-bar-handle-color"></div>', '	            <div class="jDate-timer-bar-handle-ani"></div>', '           </div>',
            // bar-ball
            '           <div class="jDate-timer-bar-handle animate ' + (type === 3 ? 'jDate-timer-bar-handle-slot' : 'jDate-timer-hide') + '">', '	            <div class="jDate-timer-bar-handle-color"></div>', '	            <div class="jDate-timer-bar-handle-ani"></div>', '           </div>',
            //
            '           <div class="jDate-timer-bar"></div>', '           <div class="jDate-timer-text">', '               <span style="left: 0;">00:00</span>', '               <span style="left: 25%;">06:00</span>', '               <span style="left: 50%;">12:00</span>', '               <span style="left: 75%;">18:00</span>', '               <span style="left: 100%;">24:00</span>', '           </div>', '       </div>', '   </div>'].join('');

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
    }, {
        key: '_initDomTarget',
        value: function _initDomTarget() {
            var target = this._data.config.target;
            target.className = 'jDate-target';
            target.value = this._formatTime();
        }
    }, {
        key: '_formatTime',
        value: function _formatTime() {
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
                        return a[0] * 100 + a[1] - (b[0] * 100 + b[1]);
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
    }, {
        key: '_initEvent',
        value: function _initEvent() {
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
                // console.log('2-2', self._data.choosed.date);
                self.setMonth(self._date.getMonth() + 1);
                // console.log('2-3', self._data.choosed.date);
                setTimeout(function () {
                    self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner';
                    self._calendarCurrBoxInnder.style.left = '0px';
                }, 0);
                setTimeout(function () {
                    self._calendarCurrBoxInnder.className = 'jDate-calendar-curr-box-inner animate';
                    self._calendarCurrBoxInnder.style.left = '-200px';
                }, 10);
            });

            var movePos = {
                cursor: [0, 0],
                calendar: [0, 0],
                mousedown: false,
                canMove: true
            };

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
    }, {
        key: '_initEventTimer',
        value: function _initEventTimer() {
            var self = this;

            // quick select
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
                }
                self._updateTime([[hour, minute]]);

                if (e.keyCode == '13') {
                    self._timerTitleShow.style.display = 'block';
                    self._timerTitleInput.style.display = 'none';
                    self._updateTime([[hour, minute]]);
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
                var theTime = [self._data.choosed.time[0], []];

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
                }

                theTime[1] = [hour, minute];
                self._updateTime(theTime);

                if (e.keyCode == '13') {
                    self._timerTitleShowSlot.style.display = 'block';
                    self._timerTitleInputSlot.style.display = 'none';
                    self._updateTime(theTime);
                }
            });

            //
            
            (function () {
                var handle = self._timerHandle;
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
            })();

            //
            
            (function () {
                var handle = self._timerHandleSlot;
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
    }, {
        key: '_initEventTarget',
        value: function _initEventTarget() {
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
    }, {
        key: '_initEventSys',
        value: function _initEventSys() {
            var self = this;
            this.calendar.querySelector('.jDate-calendar-cancel').addEventListener('click', function () {
                self._data.choosed = self._data.sys.lastShowChoosed;
                self._hide();

                self._data.config.change && self._data.config.change();
            });

            this.calendar.querySelector('.jDate-calendar-ok').addEventListener('click', function () {
                self._freshTarget();
                self._hide();
                // console.log(config.change)
                self._data.config.change && self._data.config.change();
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
                    } catch (e) {}
                }
            });

            this._data.config.target.addEventListener('blur', function () {
                self._freshTarget();
            });
        }
    }, {
        key: '_show',
        value: function _show() {
            this._freshCalendar();
            var calendar = this.calendar;
            var target = this._data.config.target;
            // target.blur();

            calendar.style.display = 'block';

            var top = this._getOffset(target).top + target.offsetHeight;
            var left = this._getOffset(target).left;
            left = left + calendar.offsetWidth > document.body.offsetWidth ? document.body.offsetWidth - calendar.offsetWidth : left;
            top = top + calendar.offsetHeight > document.body.clientHeight + document.body.scrollTop ? document.body.clientHeight + document.body.scrollTop - calendar.offsetHeight : top;

            calendar.style.top = top + 1 + 'px';
            calendar.style.left = left + 'px';
            this._data.sys.lastShowChoosed = this._deepCopy(this._data.choosed);
        }
    }, {
        key: '_hide',
        value: function _hide() {
            var calendar = this.calendar;
            calendar.style.display = 'none';
        }
    }, {
        key: '_getOffset',
        value: function _getOffset(tar) {
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
            };
        }
    }, {
        key: '_deepCopy',
        value: function _deepCopy(obj) {
            var newObj = obj;
            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == 'object' && !(obj instanceof Date)) {
                newObj = obj instanceof Array ? [] : {};
                for (var i in obj) {
                    newObj[i] = this._deepCopy(obj[i]);
                }
            }
            return newObj;
        }
    }, {
        key: '_freshTarget',
        value: function _freshTarget() {
            var target = this._data.config.target;
            target.value = this._formatTime();
        }
    }, {
        key: '_freshCalendar',
        value: function _freshCalendar() {
            this._updateMonthTable();
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
            }
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

    }, {
        key: '_updateMonthTable',
        value: function _updateMonthTable() {
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
            });
        }
    }, {
        key: '_chooseDate',
        value: function _chooseDate(date) {
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
    }, {
        key: 'remove',
        value: function remove() {
            this.calendar.remove();
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
            this._date.setMonth(month);
            this._createMonthTable();
        }
    }, {
        key: 'setDate',
        value: function setDate(date) {
            // this._date = date;
        }
    }, {
        key: 'setChoosed',
        value: function setChoosed(date) {
            // TODO: what if we set multi date
            this._data.choosed.date[0] = date;
            this._data.choosed.time[0] = [date.getHours(), date.getMinutes()];
            this._freshTarget();
        }
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
=======
!function(e){function t(n){if(a[n])return a[n].exports;var i=a[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var a={};return t.m=e,t.c=a,t.p="",t(0)}([function(e,t,a){(function(t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),l=a(1),o=n(l),d=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r(this,e);var n=void 0;n=t instanceof HTMLElement?t:document.querySelector("#"+t),this.maps={month:["January","Febuary","March","April","May","June","July","August","September","October","November","December"],week:["S","M","T","W","T","F","S"]},this.date=new Date,this.doms={target:n},this.config={};for(var i in a)this.config[i]=a[i];this.config.date={type:a.date||a.time?a.date&&a.date.type||e.Null:e.Single},this.config.time={type:a.date||a.time?a.time&&a.time.type||e.Null:e.Single,step:1};var s=o.default.getDate(new Date),l=o.default.getTime(new Date);this.datas={date:a.date&&a.date.value||[new Date(s[0],s[1],s[2])],time:a.time&&a.time.value||[new Date(s[0],s[1],s[2],l[0],l[1]),new Date(s[0],s[1],s[2],23,59)]},this.initDom(),this.initEvent()}return s(e,[{key:"initDom",value:function(){var t=this.calendar=document.createElement("div");t.style.display="none",t.className="jDate-calendar";var a=o.default.getOffset(this.doms.target),n=this.doms.target.offsetHeight;t.style.top=a.top+n+"px",t.style.left=a.left+"px",this.config.date.type!==e.Null&&this.initDomCalendar(),this.config.time.type!==e.Null&&this.initDomTimer();var i=document.createElement("div");i.className="jDate-calendar-action",i.innerHTML=['<span class="material-ani"><button class="jDate-calendar-cancel">cancel</button></span>','<span class="material-ani"><button class="jDate-calendar-ok">ok</button></span>'].join(""),t.appendChild(i),document.body.appendChild(t)}},{key:"initDomCalendar",value:function(){var e=this.calendar,t=document.createElement("div");t.className="jDate-calendar-date",t.innerHTML=['<div class="jDate-calendar-title">','    <span class="jDate-calendar-pre material-ani">','        <div class="material"></div>','        <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>',"    </span>",'    <span class="jDate-calendar-curr-box">','        <span class="jDate-calendar-curr-box-inner">','           <span class="jDate-calendar-curr-pre"></span>','           <span class="jDate-calendar-curr"></span>','           <span class="jDate-calendar-curr-next"></span>',"        </span>","    </span>",'    <span class="jDate-calendar-next material-ani">','        <div class="material"></div>','        <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>',"    </span>","</div>",'<div class="jDate-calendar-table"></div>'].join(""),this.doms.calendarTable=t.querySelector(".jDate-calendar-table"),this.doms.calendarPre=t.querySelector(".jDate-calendar-pre"),this.doms.calendarNext=t.querySelector(".jDate-calendar-next"),this.doms.calendarCurr=t.querySelector(".jDate-calendar-curr"),this.doms.calendarCurrPre=t.querySelector(".jDate-calendar-curr-pre"),this.doms.calendarCurrNext=t.querySelector(".jDate-calendar-curr-next"),this.doms.calendarCurrBoxInnder=t.querySelector(".jDate-calendar-curr-box-inner"),e.appendChild(t),this.createMonthTable()}},{key:"initDomTimer",value:function(){var t=this,a=this.calendar,n=document.createElement("div");n.className="jDate-calendar-date";for(var i=[],r=[],s=0;s<=24;s++)i.push("<span>"+(s<10?"0"+s:s)+"</span>");for(var l=0;l<=60;l++)r.push("<span>"+(l<10?"0"+l:l)+"</span>");var o=this.config.time.type;n.innerHTML=['<div class="jDate-calendar-timer">','    <div class="jDate-timer-title '+(o===e.Period?"jDate-timer-title-slot":"")+' jDate-timer-input ">',"        <input></input>","    </div>",'    <div class="jDate-timer-title '+(o===e.Period?"jDate-timer-title-slot":"")+' jDate-timer-title-show">','        <span class="jDate-timer-hour">','            <span class="jDate-timer-hour-in">'+i.join("")+"</span>","        </span>","        <span> : </span>",'        <span class="jDate-timer-minute">','            <span class="jDate-timer-minute-in">'+r.join("")+"</span>","        </span>","    </div>",'    <div class="jDate-timer-title '+(o===e.Period?"jDate-timer-title-slot":"jDate-none")+' jDate-timer-input ">',"        <input></input>","    </div>",'    <div class="jDate-timer-title '+(o===e.Period?"jDate-timer-title-slot":"jDate-none")+' jDate-timer-title-show">','        <span class="jDate-timer-hour">','            <span class="jDate-timer-hour-in">'+i.join("")+"</span>","        </span>","        <span> : </span>",'        <span class="jDate-timer-minute">','            <span class="jDate-timer-minute-in">'+r.join("")+"</span>","        </span>","    </div>",'    <div class="jDate-timer-barbox">','        <div class="jDate-timer-bar-handle animate">','            <div class="jDate-timer-bar-handle-color"></div>','            <div class="jDate-timer-bar-handle-ani"></div>',"        </div>",'        <div class="jDate-timer-bar-handle animate '+(o===e.Period?"jDate-timer-bar-handle-slot":"jDate-none")+'" style="left:100%;">','            <div class="jDate-timer-bar-handle-color"></div>','            <div class="jDate-timer-bar-handle-ani"></div>',"        </div>",'       <div class="jDate-timer-period-line '+(o===e.Period?"":"jDate-none")+'"></div>','        <div class="jDate-timer-bar"></div>','        <div class="jDate-timer-text">','            <span style="left: 0;">00:00</span>','            <span style="left: 25%;">06:00</span>','            <span style="left: 50%;">12:00</span>','            <span style="left: 75%;">18:00</span>','            <span style="left: 100%;">23:59</span>',"        </div>","    </div>","</div>"].join(""),this.doms.timerHandles=n.querySelectorAll(".jDate-timer-bar-handle"),this.doms.timerMinutes=n.querySelectorAll(".jDate-timer-minute"),this.doms.timerHouers=n.querySelectorAll(".jDate-timer-hour"),this.doms.timerQuickText=n.querySelector(".jDate-timer-text"),this.doms.timeInputs=n.querySelectorAll(".jDate-timer-input"),this.doms.timerTitleShows=n.querySelectorAll(".jDate-timer-title-show"),this.doms.timerLine=n.querySelector(".jDate-timer-period-line "),setTimeout(function(){t.updateTime(t.datas.time)},100),a.appendChild(n)}},{key:"createMonthTable",value:function(){var t=new Date(Date.parse(this.date));t.setDate(1);var a=t.getDay();t.setMonth(t.getMonth()+1),t.setDate(0);var n=t.getDate(),i=n+a,r=document.createElement("table"),s=document.createElement("tr"),l=this.maps.week;s.innerHTML="<th>"+l.join("</th><th>")+"</th>",r.appendChild(s);var d=[];switch(this.config.date.type){case e.Multi:d=this.datas.date;break;case e.Period:if(d=this.datas.date.slice(0,2),2===d.length){var c=d[0],u=d[1],m=o.default.getDate(new Date(Math.min(c,u))),h=o.default.getDate(new Date(Math.max(c,u)));m=new Date(m[0],m[1],m[2]),h=new Date(h[0],h[1],h[2]),d={startTime:m,endTime:h}}break;default:d.push(this.datas.date[0])}for(var p=[],f=0;f<i;f++){if(f%7==0){var v=document.createElement("tr");r.appendChild(v)}var g=f-a+1;g=g<1?"":g,g=g>n?"":g;var y=document.createElement("td");if(""!==g){var D=new Date(t.getFullYear(),t.getMonth(),g),j="";this.config.date.type===e.Period&&void 0===d.length?(+d.startTime!==+D&&+d.endTime!==+D||(j="active"),d.startTime<D&&d.endTime>D&&(j="during")):d.forEach(function(e){o.default.dateEqual(e,D)&&(j="active")}),y.className=j,y.innerHTML=["<span>","<div></div>",g,"</span>"].join(""),y.addEventListener("click",this.chooseDate.bind(this,D)),p.push({date:D,dom:y})}v.appendChild(y)}this.doms.calendarTable.innerHTML="",this.doms.calendarTable.appendChild(r),t.setDate(1);var b=this.maps.month[t.getMonth()]+" "+t.getFullYear();this.doms.calendarCurr.innerHTML=b,t.setMonth(t.getMonth()-1);var x=this.maps.month[t.getMonth()]+" "+t.getFullYear();this.doms.calendarCurrPre.innerHTML=x,t.setMonth(t.getMonth()+2);var T=this.maps.month[t.getMonth()]+" "+t.getFullYear();this.doms.calendarCurrNext.innerHTML=T}},{key:"initEvent",value:function(){this.config.date.type!==e.Null&&this.initEventCalendar(),this.config.time.type!==e.Null&&this.initEventTimer(),this.initEventSys()}},{key:"initEventCalendar",value:function(){var e=this,t=e.doms.calendarPre,a=e.doms.calendarNext;t.addEventListener("mouseup",function(){e.setMonth(e.date.getMonth()-1),setTimeout(function(){e.doms.calendarCurrBoxInnder.className="jDate-calendar-curr-box-inner",e.doms.calendarCurrBoxInnder.style.left="-400px",setTimeout(function(){e.doms.calendarCurrBoxInnder.className="jDate-calendar-curr-box-inner animate",e.doms.calendarCurrBoxInnder.style.left="-200px"},10)},0)}),a.addEventListener("mouseup",function(){e.setMonth(e.date.getMonth()+1),setTimeout(function(){e.doms.calendarCurrBoxInnder.className="jDate-calendar-curr-box-inner",e.doms.calendarCurrBoxInnder.style.left="0px",setTimeout(function(){e.doms.calendarCurrBoxInnder.className="jDate-calendar-curr-box-inner animate",e.doms.calendarCurrBoxInnder.style.left="-200px"},10)},0)})}},{key:"initEventTimer",value:function(){var t=this;t.doms.timerQuickText.addEventListener("click",function(e){if("SPAN"===e.target.tagName){var a=e.target.innerText,n=a.split(":").map(function(e){return parseInt(e)});t.updateTime([new Date(2016,10,27,n[0],n[1])])}});var a=t.datas.time,n=[].concat(i(this.doms.timeInputs)),r=this.config.time.type===e.Period&&2===this.datas.time.length;n.map(function(e,n){var i=e.querySelector("input");t.doms.timerTitleShows[n].addEventListener("click",function(){t.doms.timerTitleShows[n].style.display="none",t.doms.timeInputs[n].style.display=r?"inline-block":"block";var e=t.datas.time[n].getHours();e=e<10?"0"+e:e;var a=t.datas.time[n].getMinutes();a=a<10?"0"+a:a,i.value=e+" : "+a,i.focus()}),i.addEventListener("blur",function(){t.doms.timerTitleShows[n].style.display=r?"inline-block":"block",t.doms.timeInputs[n].style.display="none"}),i.addEventListener("keyup",function(e){var r=this.value,s=r.split(":").map(function(e){return parseInt(e)}),l=s[0]||0,o=s[1]||0;l=Math.max(0,l),l=Math.min(23,l),o=Math.max(0,o),o=Math.min(59,o),a[n]=new Date(2016,10,27,l,o),t.updateTime(a),"13"==e.keyCode&&i.blur()});var s=t.doms.timerHandles[n],l=!1,o=void 0,d=void 0,c=void 0;s.addEventListener("mousedown",function(e){s.className="jDate-timer-bar-handle active",o={x:e.pageX};var t=getComputedStyle(s);d={x:parseInt(t.left)},l=!0}),document.addEventListener("mousemove",function(e){if(!l)return!1;var i={x:e.pageX-o.x},r=d.x+i.x;r=Math.max(0,r),r=Math.min(270,r),s.style.left=r+"px",e.preventDefault(),e.stopPropagation();var u=parseInt(r/270*1440),m=t.config.time.step||1;u=Math.round(u/m)*m;var h=parseInt(u/60)||0,p=u%60||0;if(h>=24&&(h=23,p=59),c=[h,p],0===n&&a[1]){var f=a[1].getHours(),v=a[1].getMinutes();100*f+v<100*h+p&&(c=[f,v])}if(1===n&&a[0]){var g=a[0].getHours(),y=a[0].getMinutes();100*g+y>100*h+p&&(c=[g,y])}a[n]=new Date(2016,10,27,c[0],c[1]),t.updateTime(a)}),document.addEventListener("mouseup",function(){return!!l&&(s.className="jDate-timer-bar-handle animate",o=d=null,void(l=!1))})})}},{key:"initEventSys",value:function(){var t=this,a=this,n={cursor:[0,0],calendar:[0,0],mousedown:!1,canMove:!0};this.calendar.addEventListener("mousedown",function(e){n.cursor=[e.pageX,e.pageY];var t=getComputedStyle(a.calendar);n.calendar=[parseInt(t.left)||0,parseInt(t.top)||0],n.mousedown=!0}),window.addEventListener("mousemove",function(e){if(n.mousedown){var t=e.pageX-n.cursor[0],i=e.pageY-n.cursor[1];(n.canMove||t>10||i>10)&&(n.canMove=!0,a.calendar.style.cursor="move",e.preventDefault(),e.stopPropagation(),a.calendar.style.left=n.calendar[0]+t+"px",a.calendar.style.top=n.calendar[1]+i+"px"),e.preventDefault(),e.stopPropagation()}}),window.addEventListener("mouseup",function(){n.mousedown=!1,n.canMove=!1,a.calendar.style.cursor="auto"}),window.addEventListener("click",function(e){for(var a=e.target,n=!1;a;){if(a===t.doms.target||a===t.calendar){n=!0;break}a=a.parentElement}n||(t.calendar.style.display="none")});var i=this.calendar.querySelectorAll(".jDate-calendar-action button");i[0].addEventListener("click",function(){t.calendar.style.display="none"}),i[1].addEventListener("click",function(){t.updateText(),t.calendar.style.display="none"}),this.doms.target.addEventListener("click",function(){if("none"===t.calendar.style.display){var e=o.default.getOffset(t.doms.target),a=t.doms.target.offsetHeight,n=e.top+a,i=e.left;t.calendar.style.top=n+"px",t.calendar.style.left=i+"px",t.calendar.style.display="block";var r=n+t.calendar.offsetHeight,s=document.body.scrollTop+document.body.clientHeight;r>s&&(n=e.top-t.calendar.offsetHeight,t.calendar.style.top=n+"px");var l=i+t.calendar.offsetWidth;l>document.body.clientWidth&&(i-=l-document.body.clientWidth,t.calendar.style.left=i+"px")}}),this.doms.target.addEventListener("input",function(a){var n=a.target.value;if(t.config.date.type===e.Single&&/\d{4}\/\d{1,2}\/\d{1,2}(?!\d)/.test(n)){var i=n.slice(0,10);i=i.split("/"),t.datas.date=[new Date(i[0],i[1],i[2])],t.createMonthTable()}if(t.config.date.type===e.Period&&/\d{4}\/\d{1,2}\/\d{1,2}\s\-\s\d{4}\/\d{1,2}\/\d{1,2}(?!\d)/.test(n)){var i=n.slice(0,23);i=i.split(" - ");for(var r in i)i[r]=i[r].split("/");var s=new Date(i[0][0],i[0][1],i[0][2]),l=new Date(i[1][0],i[1][1],i[1][2]);t.datas.date=[s,l],t.createMonthTable()}if(t.config.time.type===e.Single){var o=n.match(/(\d{1,2})\:(\d{1,2})(?!\d)/);if(o){var d=o[1],c=o[2];t.updateTime([new Date(2016,10,27,d,c)])}}if(t.config.time.type===e.Period){var o=n.match(/(\d{1,2})\:(\d{1,2})\s\-\s(\d{1,2})\:(\d{1,2})(?!\d)/);if(o){var u=o[1],m=o[2],h=o[3],p=o[4],f=[new Date(2016,10,27,u,m),new Date(2016,10,27,h,p)];f.sort(function(e,t){return e-t}),t.updateTime(f)}}}),this.doms.target.addEventListener("blur",function(e){""!==e.target.value&&t.updateText()})}},{key:"setMonth",value:function(e){this.date.setMonth(e),this.createMonthTable()}},{key:"chooseDate",value:function(t){var a=this,n=null,i=this.datas.date.some(function(e,a){return+e===+t&&(n=a,!0)});if(i)this.datas.date.splice(n,1);else switch(this.config.date.type){case e.Multi:this.datas.date.push(t);break;case e.Period:this.datas.date.push(t),this.datas.date=this.datas.date.slice(-2);break;default:this.datas.date=[t]}setTimeout(function(){a.createMonthTable()})}},{key:"updateTime",value:function(t){var a=this,n=this.config.time.type,i=this.datas.time;t.forEach(function(t,r){var s=60*t.getHours()+t.getMinutes(),l=s/1440;a.doms.timerHandles[r].style.left=100*l+"%";var o=a.doms.timerMinutes[r].querySelector(".jDate-timer-minute-in"),d=a.doms.timerHouers[r].querySelector(".jDate-timer-hour-in");d.style.top=t.getHours()*-20+"px",o.style.top=t.getMinutes()*-20+"px",i[r]=t,n===e.Period&&(0===r&&(a.doms.timerLine.style.left=100*l+"%"),1===r&&(a.doms.timerLine.style.right=100*(1-l)+"%"))}),this.datas.time=i}},{key:"updateText",value:function(){var t="",a=this.datas.date||[],n={},i={};switch(this.config.date.type){case e.Single:t+=o.default.getDate(a[0]).join("/"),n=a[0];break;case e.Multi:t+=o.default.getDate(a[0]).join("/")+" ("+a.length+")",n=a;break;case e.Period:a.length>=2?(t+=o.default.getDate(a[0]).join("/"),t+=" - ",t+=o.default.getDate(a[a.length-1]).join("/"),n.data={start:a[0],end:a[a.length-1]}):(t+=o.default.getDate(a[0]).join("/"),n={start:a[0],end:a[0]})}var r=this.datas.time||[];switch(t+=""===t?"":this.config.time.type===e.Null?"":" ",this.config.time.type){case e.Single:t+=o.default.getTime(r[0]).join(":"),i=r[0];break;case e.Multi:t+=o.default.getTime(r[0]).join(":")+" ("+r.length+")",i=r;break;case e.Period:var s=100*r[0].getHours()+r[0].getMinutes()===100*r[1].getHours()+r[1].getMinutes();r.length>=2&&!s?(t+=o.default.getTime(r[0]).join(":"),t+=" - ",t+=o.default.getTime(r[r.length-1]).join(":"),i={start:r[0],end:r[1]}):(t+=o.default.getTime(r[0]).join(":"),i={start:r[0],end:r[0]})}var l=this.doms.target;"INPUT"===l.tagName||"TEXTAREA"===l.tagName?l.value=t:l.innerText=t,this.config.change&&this.config.change({text:t,date:n,time:i})}}]),e}();d.Null=0,d.Single=1,d.Multi=2,d.Period=3,a(2),e.exports=t.jDatev2=d}).call(t,function(){return this}())},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={getOffset:function(e){for(var t={left:0,top:0};e;)t.left+=e.offsetLeft,t.top+=e.offsetTop,e=e.offsetParent;return t},getDate:function(e){var t=e.getFullYear(),a="0"+e.getMonth(),n="0"+e.getDate();return[t,a.slice(-2),n.slice(-2)]},getTime:function(e){var t="0"+e.getHours(),a="0"+e.getMinutes();return[t.slice(-2),a.slice(-2)]},dateEqual:function(e,t){return!(!e||!t)&&this.getDate(e).join(",")===this.getDate(t).join(",")}};t.default=a},function(e,t){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=function(){function e(t){a(this,e);var n=this;n.dom=t;var i=this.materialBox=document.createElement("div");i.className="material-box";var r=Math.max(t.clientHeight,t.clientWidth);i.style.width=i.style.height=r+"px",i.style.width=i.style.height=r+"px",i.style.margin=-r/2+"px";var s=this.material=document.createElement("div");i.appendChild(this.material),n.canHide=!0,n.doHide=!1,s.className="material",t.appendChild(i),setTimeout(function(){n.canHide=!1,n.show(),setTimeout(function(){n.canHide=!0,n.doHide&&n.hide()},300)})}return n(e,[{key:"show",value:function(){this.material.className="material active"}},{key:"hide",value:function(){if(0==this.canHide)return void(this.doHide=!0);var e=this;this.material.className="material finished",setTimeout(function(){e.materialBox.remove()},300)}}]),e}(),r=[];document.addEventListener("mousedown",function(e){for(var t=e.target;t;){if(/material-ani/.test(t.className)){r.push(new i(t));break}t=t.parentElement}}),window.addEventListener("mouseup",function(e){for(var t in r)r[t].hide()})}]);
>>>>>>> v2
