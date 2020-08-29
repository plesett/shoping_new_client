<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import {
		GetUserInfo
	} from '@/api/user.js'
	export default {
		created: function() {
			this.isLogin &&
				// 查询用户信息 页面刷新后全局重新获取用户信息
				GetUserInfo().then(res => {
					this.userLogin(res)
				})
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
			...mapState(['isLogin'])
		},
		methods: {
			...mapActions(['userLogin']),
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("@/assets/css/main.css");
	@import url("@/assets/css/icon.css");

	body {
		background-color: #FFFFFF;
	}

	.cat2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
</style>
