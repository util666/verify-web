import moment from "moment";

export const dateTimeFormat = (date) => {
    try {
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
    } catch (error) {
        return "";
    }
};

export const dateFormat = (date, format = "YYYY-MM-DD") => {
    try {
        return moment(date).format(format);
    } catch (error) {
        return "";
    }
};

export const formatDate = (date, format = "YYYY-MM-DD") => {
    try {
        return moment(date).format(format);
    } catch (error) {
        return "";
    }
};

export const timeFormat = (date) => {
    try {
        return moment(date).format("HH:mm:ss");
    } catch (error) {
        return "";
    }
};

export const sleep = (time) => {
    return new Promise(resolve =>
        setTimeout(resolve, time)
    )
}

export const compareTime = (timeA, timeB) => {
    return moment(timeB).valueOf() - moment(timeA).valueOf();
};

export const createTimeoutPromise = (data, time = 2000) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), time);
    });
};

export const getNearMonthDate = () => {
    const today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    today.setSeconds(59);
    const prevMonth = new Date(today);
    const halfYearAgo = new Date(today);
    const threeMonthsAgo = new Date(today);
    prevMonth.setTime(prevMonth.getTime() - 30 * 24 * 60 * 60 * 1000 + 1000);
    halfYearAgo.setTime(halfYearAgo.getTime() - 30 * 24 * 60 * 60 * 1000 * 6 + 1000);
    threeMonthsAgo.setTime(threeMonthsAgo.getTime() - 30 * 24 * 60 * 60 * 1000 * 3 + 1000);
    return {
        today,
        threeMonthsAgo,
        prevMonth,
        halfYearAgo
    };
};

export const getMinAndMaxDate = (dateList, type = 'min') => {
    let output = '';
    if (!Array.isArray(dateList)) {
        return dateList;
    }
    let types = ['min', 'max'];
    if (!types.includes(type)) {
        throw Error(`type值必须为${types.join(',')}中一个`);
    }
    dateList.forEach(item => {
        if (!output) {
            output = item;
        } else {
            let flag = (moment(item) - moment(output) > 0);
            let obj = {
                max: flag ? item : output,
                min: flag ? output : item,
            }
            if (type === 'min') {
                output = obj.min
            } else {
                output = obj.max
            }
        }
    })
    return output;
};