import {
    defaultConfig
} from './config'

class Storage {
    constructor(opts) {
        opts = opts || {}
        this.config = Object.assign({}, defaultConfig, opts)
    }

    /**
     * 初始化
     *
     * @param {*} data
     * @memberof Storage
     */
    init (data) {
        let init = Object.assign({}, {
            user: ''
        }, data)
        init = JSON.stringify(init)
        localStorage.setItem(this.config.key, init)
    }

    /**
     * 判断是否登录
     *
     * @returns
     * @memberof Storage
     */
    status () {
        try {
            let json = this.get('user')
            if (!json.accessKey || json.accessKey == '') {
                return false
            }
            else {
                return true
            }
        } catch {
            return false
        }
    }

    /**
     * 设置
     *
     * @param {*} data
     * @memberof Storage
     */
    set (data) {
        data = data || {}
        let save
        let temp = localStorage.getItem(this.config.key)
        if (temp === null || temp === undefined) {
            save = data
        }
        if (typeof JSON.parse(temp) === 'object') {
            save = Object.assign({}, JSON.parse(temp), data)
        }
        save = JSON.stringify(save)
        localStorage.setItem(this.config.key, save)
    }

    /**
     * 读取
     *
     * @param {*} name
     * @returns
     * @memberof Storage
     */
    get (name) {
        try {
            let save = JSON.parse(localStorage.getItem(this.config.key))
            if (name === undefined) {
                return save
            }
            let keys = name.split(' ')
            let temp = save[keys[0]]
            for (let i = 1; i < keys.length; i ++) {
                temp = temp[keys[i]]
            }
            return temp
        } catch {
            return undefined
        }
    }
}

export default Storage