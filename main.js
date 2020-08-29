import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import queue from './common/queue'
import keyWords from "./compoents/bian-keywords/index.vue"
import {
	ForMat
} from '@/utils/day.js'

// 定义成全局store
Vue.prototype.$store = store
// 登录
Vue.prototype.$queue = queue;
// 时间格式化
Vue.prototype.$time = ForMat

Vue.component('key-words', keyWords)

// 判断当前环境

// #ifdef APP-PLUS
store.commit('updateEnv', 'app')
// #endif

// #ifdef H5
store.commit('updateEnv', 'h5')
// #endif

// #ifdef MP-WEIXIN
store.commit('updateEnv', 'weixin')
// #endif

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
