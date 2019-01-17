import XLSX from 'xlsx'
import XLSX_SAVE from 'file-saver'
/**
 * 是否微信环境
 */
const isWx = () => {
    let u = window.navigator.userAgent
    if (u.match(/MicroMessenger/i) == 'MicroMessenger') {
        return true
    }
    return false
}

/**
 * 图片转base64
 * @param {*} url 
 * @param {*} callback 
 * @param {*} outputFormat 
 */
const convertImgTobase64 = (url, outputFormat) => {

    return new Promise((resolve, reject) => {
        let canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
            canvas.height = img.height
            canvas.width = img.width
            ctx.drawImage(img, 0, 0)
            let dataURL = canvas.toDataURL(outputFormat || 'image/png')
            canvas = null
            resolve(dataURL)
        }
        img.onerror = reject
        img.src = url
    })
}

/**
 * 获取url参数
 * @param {*} name 
 */
const getUrlArgument = (url) => {
    url = url || window.location
    url = url.indexOf ? url : url.toString()
    url = decodeURIComponent(url)

    let paramStringStart = url.indexOf("?") + 1,
        paramStringEnd = (url.indexOf("#") === -1) ?
        url.length :
        url.indexOf("#"),
        paramString = url.slice(paramStringStart, paramStringEnd),
        keysAndValues = paramString.split('&'),
        paramsObject = {}

    for (let i = 0; i < keysAndValues.length; i++) {
        let keyValue = keysAndValues[i].split('=')

        if (keyValue[0].slice(-2) === "[]") {
            let key = keyValue[0].slice(0, -2)
            paramsObject[key] = paramsObject[key] || []
            paramsObject[key].push(keyValue[1])
        } else {
            paramsObject[keyValue[0]] = keyValue[1]
        }
    }

    return paramsObject
}

const randomString = (len) => {
    len = len || 6
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZ2345678'    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length
    var pwd = ''
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd + Date.now()
}

//获取当前时间, yyyy-mm-dd hh-mm-ss
const getNow = () => {
    let date = new Date()
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    let s = (date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds())
    let now = Y + M + D + h + m + s
    return now
}

/**防止重复点击或者resize时频繁调用起复杂函数等问题，采用闭包方式
使用示例
data() {
    return {
        clickSubmit: this.debounce(this.submit, 250)
    }
}
**/
const debounce = (fn, delay) => {
    // 定时器，用来 setTimeout
    var timer
    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function () {
        // 保存函数调用时的上下文和参数，传递给 fn
        var context = this
        var args = arguments

        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout(timer)

        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

/**
 * 对日期进行格式化
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 */
 function padding (s, len) {
     len = len - (s + '').length
     for (var i = 0; i < len; i++) { s = '0' + s }
     return s
 }

const dateFmt = (date, pattern) => {
     pattern = pattern || DEFAULT_PATTERN
     return pattern.replace(SIGN_REGEXP, function ($0) {
         switch ($0.charAt(0)) {
         case 'y': return padding(date.getFullYear(), $0.length)
         case 'M': return padding(date.getMonth() + 1, $0.length)
         case 'd': return padding(date.getDate(), $0.length)
         case 'w': return date.getDay() + 1
         case 'h': return padding(date.getHours(), $0.length)
         case 'm': return padding(date.getMinutes(), $0.length)
         case 's': return padding(date.getSeconds(), $0.length)
         }
     })
 }

 /**
 * 字符串去掉前后空格
 * @author  Lvbing
 * @param str字符串
 * @returns str字符串
 */
const trim = (str) => {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

 /**
 * 判断当前浏览器是否是ios9&android5以下
 * @author  Lvbing
 * @param str字符串
 * @returns str字符串
 */
const browserMatch = {
    status: function () {
        let iosVersion = this.get_ios_version()
        let androidVersion = this.get_android_version()
        if (iosVersion > 0 && iosVersion < 9) {
            return false
        }
        if (androidVersion > 0 && androidVersion < 5) {
            return false
        }
        return true
    },
    get_ios_version: function () {
        var ua = navigator.userAgent.toLowerCase()
        var version = 0
        if (ua.indexOf('like mac os x') > 0) {
            var reg = /os [\d._]+/gi
            var vInfo = ua.match(reg)
            // 得到版本号9.3.2或者9.0
            version = (vInfo + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.')
            // 得到版本号第一位
            version = parseInt(version.split('.')[0])
        }

        return version
    },
    get_android_version: function () {
        var ua = navigator.userAgent.toLowerCase()
        var version = 0
        if (ua.indexOf('android') > 0) {
            var reg = /android [\d._]+/gi
            var vInfo = ua.match(reg)
            // 得到版本号4.2.2
            version = (vInfo + '').replace(/[^0-9|_.]/ig, '').replace(/_/ig, '.')
            // 得到版本号第一位
            version = parseInt(version.split('.')[0])
        }

        return version
    }
}

// 金额格式化
const moneyFormat = (nStr) => {
    if (nStr === 0 || nStr === '0') {
        return '0.00'
    }

    if (!nStr || isNaN(nStr)) {
        return ''
    }

    nStr += ''
    var x = nStr.split('.')
    var x1 = x[0]
    var x2 = x.length > 1 ? '.' + x[1] : '.00'
    if (x2.length < 3) {
        x2 += '00'
    }
    x2 = x2.substring(0, 3)
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
}

/**
 * 判断数组中是否有重复数据
 * @author  lvbing
 * @param {String, Array} obj 对象
 * @returns {Boolean}
 */
const arrayHasRepeat = (str, arr) => {
    let hash = {}
    for (let i in arr) {
        hash[arr[i]] = true
    }

    if (hash[str]) {
        return true
    }
    return false
}

/**
    将数据导出为excel供下载
**/
const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
    }
    return buf
}

const downloadExcel = (data, fileName) => {
    /**
     * 数据导出格式为
     * [
     *   ['cols1','cols2','cols3'],
     *   ['data1','data2','data3']
     * ]
     */
    let date = new Date()
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())

    // covert json to sheet
    const ws = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    // save
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'})
    let name = Y + M + D + fileName
    XLSX_SAVE.saveAs(new Blob([s2ab(wbout)], {type: 'application/octet-stream'}), name)
}

export {
    isWx,
    convertImgTobase64,
    getUrlArgument,
    randomString,
    getNow,
    debounce,
    dateFmt,
    trim,
    browserMatch,
    moneyFormat,
    arrayHasRepeat
}