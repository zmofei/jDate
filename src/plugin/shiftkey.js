const lastChoose = {
    type: null, // [choose|calcel]
    value: null
}

function cleanDate(dates) {
    const cache = {};
    dates.forEach((date) => {
        const dateArr = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate()
        ]
        cache[dateArr.join('-')] = dateArr;
    });

    return Object.keys(cache).map(key => new Date(cache[key]));
}

function shiftKey(obj) {
    if (obj.event.shiftKey) {
        if (lastChoose.value) {
            const startTime = new Date(Math.min(obj.dealDate, lastChoose.value));
            const endTime = new Date(Math.max(obj.dealDate, lastChoose.value));
            while (startTime <= endTime) {
                switch (lastChoose.type) {
                    case 'choose':
                        this.datas.date.push(new Date(startTime));
                        break;
                    case 'cancel':
                        this.datas.date = this.datas.date.filter(date => date < startTime || date > endTime);
                        break;
                }
                startTime.setDate(startTime.getDate() + 1);
            }
        }
        this.datas.date = cleanDate(this.datas.date);
        obj.event.preventDefault();
    }
    lastChoose.type = obj.type;
    lastChoose.value = obj.dealDate;
}


export default shiftKey;