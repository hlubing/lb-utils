import Vue from 'vue'
import App from './App.vue'
import * as Utils from '../lib/index'

Vue.config.productionTip = false

Vue.prototype.$utils = Utils

// const wechat = new Utils.Wechat({
//   project: 'diandian_test'
// })

// const share = new Utils.Share()

// app右上角分享
// share.appRightShare({
//   project: 'diandian',
//   title: '请设置分享标题',
//   content: '请设置分享内容描述',
//   url: window.location.href,
//   imageUrl: 'https://one-test.zhongan.com/jrfed-large-screen/images/person.png',
//   image: '',
//   success: () => {},
//   fail: () => {}
// })

// const login = new Utils.Login({
//   project: 'diandian_test'
// })
// login.h5Login().then((res) => {
//   console.log(res)
// })

// const api = new Utils.Api({
//   baseURL: 'http://localhost:8083/api',
//   beforeRequest: (request) => {
//     console.log(request)
//   },
//   afterResponse: (response) => {
//     console.log(response)
//   }
// })

// api.diandianAPI({
//   id: 'userAPI.login',
//   param: {}
// })

// const redirect = new Utils.Redirect({
//   project: 'diandian_dev',
//   baseURL: 'http://localhost:8083/api'
// })

// redirect.doRedirect({
//   redirectCode: 'JinjiPolicyProductHandler',
//   needLogin: '1',
//   pageType: 'policyProduct',
//   companyId: '100001',
//   commodityId: 349,
//   accountId: '265001'
// })

// 静默授权
// wechat.sdkAuth()

// 微信授权
// wechat.auth().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })

// 获取openid
// wechat.getOpenId().then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })

// 微信获取用户信息
// wechat.getUserInfo()

// 微信分享
// wechat.share()
new Vue({
  render: h => h(App),
}).$mount('#app')
