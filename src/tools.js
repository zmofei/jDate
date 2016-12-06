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
        let hour = '0' + date.getHours();
        let min = '0' + date.getMinutes();
        return [hour.slice(-2), min.slice(-2)]
    },
    dateEqual(paramA, paramB) {
        if (paramA && paramB) {
            return this.getDate(paramA).join(',') === this.getDate(paramB).join(',');
        } else {
            return false;
        }
    }
}

export default tools;