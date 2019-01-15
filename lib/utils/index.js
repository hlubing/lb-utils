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

export {
    isWx,
    convertImgTobase64,
    getUrlArgument,
    randomString,
    getNow
}