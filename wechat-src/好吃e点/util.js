const formatTime = date => {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + 'T' + [hour, minute, second].map(formatNumber).join(':') + '+08:00';
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
function arrangeTime(year, month, day, hour) {
    hour = hour + 8;
    if (hour >= 24) {
        hour -= 24;
        day = day + 1;
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
                if (day > 31) {
                    day = 1;
                    month = month + 1;
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                if (day > 30) {
                    day = 1;
                    month = month + 1;
                }
            case 2:
                if (year % 100 == 0) {
                    if (year % 400 == 0) {
                        if (day > 29) {
                            day = 1;
                            month = month + 1;
                        }
                    }
                }
                else if (year % 4) {
                    if (day > 29) {
                        day = 1;
                        month = month + 1;
                    }
                }
                break;
            case 12:
                if (day > 31) {
                    day = 1;
                    month = 1;
                    year = year + 1;
                }
                break;
            default:
                break;
        }
    }
    return [year, month, day, hour];
}
module.exports = {
    formatTime: formatTime,
    arrangeTime: arrangeTime
}
