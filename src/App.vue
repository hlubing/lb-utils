<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" @click="go()"> -->
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import * as Utils from '../lib/index'

// const login = new Utils.Login({
//   project: 'diandian_test'
// })

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted () {
    this.go()
  },
  methods: {
    go () {
      // login.h5Login({
      //   campaignNo: '200',
      //   inviter: 1,
      //   inviteWay: 'wechat',
      //   channelCode: '1212112'
      // }).then((res) => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
