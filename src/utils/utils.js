var utils = {}

utils.time = function (timestamp, format) {
    var date = timestamp ? new Date(timestamp) : new Date();
    var timeStamp = new Date().getTime();
    var year = String(date.getFullYear()).padStart(4, "0"); //获取当前年份
    var month = String(date.getMonth() + 1).padStart(2, "0"); //获取当前月份
    var day = String(date.getDate()).padStart(2, "0"); //获取当前日 
    var weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    var weekday = weekdays[date.getDay()]; //获取当前星期几
    var hour = String(date.getHours()).padStart(2, "0"); //获取小时
    var minute = String(date.getMinutes()).padStart(2, "0"); //获取分钟
    var second = date.getSeconds().toString().padStart(2, "0"); //获取秒

    if (format) {
        return format.replace("yyyy", year).replace("MM", month).replace("dd", day).replace("HH", hour).replace("mm", minute).replace("ss", second).replace("day", weekday);
    }
    return timeStamp;
}
utils.os = function () {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian,
        isMobie = isTablet || isPhone || isAndroid || isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
        isMobie: isMobie
    };
}
//设置cookie
utils.setCookie = function (name, value, seconds) {
    seconds = seconds || 0;
    var expires = "";
    if (seconds != 0) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/";
}
// 取得cookie
utils.getCookie = function (name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';') // 把cookie分割成组
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i] // 取得字符串
        while (c.charAt(0) == ' ') { // 判断一下字符串有没有前导空格
            c = c.substring(1, c.length) // 有的话，从第二位开始取
        }
        if (c.indexOf(nameEQ) == 0) { // 如果含有我们要的name
            return unescape(c.substring(nameEQ.length, c.length)) // 解码并截取我们要值
        }
    }
    return false
}
// 清除cookie
utils.clearCookie = function (name) {
    this.setCookie(name, "", -1);
}
export default utils;