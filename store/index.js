import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		env: null,
		isLogin: false,
		UserInfo: {},
	},
	mutations: {
		updateEnv(state, name) {
			state.env = name
		},
		setLoginState(state, info) {
			state.isLogin = true
			state.UserInfo = info
		},
		userOutLogin(state) {
			state.isLogin = false
			state.UserInfo = {}
		},
	},
	actions: {
		userLogin({
			commit
		}, info) {
			commit('setLoginState', info)
		},
		userOutLogin({
			commit
		}, info) {
			commit('userOutLogin', info)
		}
	}
})

export default store;
