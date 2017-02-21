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
    }
}

export default tools;