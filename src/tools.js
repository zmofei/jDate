var tools = {
    getOffset(dom) {
        var offset = {
            left: 0,
            top: 0
        }
        while (dom) {
            offset.left += dom.offsetLeft;
            offset.top += dom.offsetTop;
            dom = dom.offsetParent;
        }
        return offset;
    },
    getDate(date) {
        let year = date.getFullYear();
        let month = '0' + date.getMonth();
        let day = '0' + date.getDate();
        return [year, month.slice(-2), day.slice(-2)]
    },
    getTime(date) {
        let hour, min;
        if (date instanceof Date) {
            hour = '0' + date.getHours();
            min = '0' + date.getMinutes();
        } else {
            hour = '0' + date[0];
            min = '0' + date[1];
        }
        return [hour.slice(-2), min.slice(-2)]
    },
    dateEqual(paramA, paramB) {
        return this.getDate(paramA).join('') - this.getDate(paramB).join('');
    },
    fixTimeByStep(time, step) {
        let timeBySecond = time;
        if (typeof time !== 'number') {
            let hour = parseInt(time[0]);
            let min = parseInt(time[1]);
            min = Math.min(59, min);
            if (hour >= 24) {
                hour = 24;
                min = 0;
            }
            timeBySecond = hour * 60 + min;
        }
        let timeAfterStep = Math.round(timeBySecond / step) * step;
        return [Math.floor(timeAfterStep / 60), timeAfterStep % 60]
    }
}

export default tools;