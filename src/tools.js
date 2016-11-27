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
        return [date.getFullYear(), date.getMonth(), date.getDate()]
    },
    getTime(date) {
        return [date.getHours(), date.getMinutes()]
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