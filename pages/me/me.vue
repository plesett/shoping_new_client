<template>
	<view style="background: #eeeeee;height: 100vh;">
		<view class="padding-bottom padding" style="height: 350upx;">
			<view class="flex justify-start margin-top">
				<view>
					<image class="cu-avatar round lg" :src="UserInfo.avatars" mode=""></image>
				</view>
				<view class="text-black text-left text-lg padding-left">
					<view class="text-bold" style="padding-bottom: 10upx;">{{UserInfo.nickname}}</view>
					<view class="text-sm">{{UserInfo.mobile}}</view>
				</view>
			</view>
			
			<view class="user_card margin-top padding text-center">
				<view>
					<view style="margin-bottom: 5px;">余额</view>
					<view class="text-red"><text class="cuIcon-recharge"></text>{{UserInfo.balance}}.00</view>
				</view>
				<view>
					<view style="margin-bottom: 5px;">上次登录IP</view>
					<view class="text-red"><text class="cuIcon-search"></text>{{UserInfo.login_ip}}</view>
				</view>
				<view>
					<view style="margin-bottom: 5px;">VIP</view>
					<view class="text-red"><text class="cuIcon-vip"></text>{{UserInfo.vip === 0 ? '未开通' : '已开通'}}</view>
				</view>
			</view>
		</view>
		<view class="padding text-lg" style="width: 92%;margin: 0 auto;border-bottom: 1px solid #EEEEEE;border-radius: 8px; overflow: hidden;background-color: #FFFFFF;">

			<view class="flex justify-between">
				<view>
					<text class="cuIcon-edit text-grey"></text>
					<text class="text-grey" style="padding-left: 5px">抽奖记录</text>
				</view>
				<view class="cuIcon-right text-gray"></view>
			</view>
			
			<view class="flex justify-between margin-top">
				<view>
					<text class="cuIcon-pay text-grey"></text>
					<text class="text-grey" style="padding-left: 5px">充值中心</text>
				</view>
				<view class="cuIcon-right text-gray"></view>
			</view>
			
			<view class="flex justify-between margin-top">
				<view>
					<text class="cuIcon-ticket text-grey"></text>
					<text class="text-grey" style="padding-left: 5px">消费详情</text>
				</view>
				<view class="cuIcon-right text-gray"></view>
			</view>
			
			<view class="flex justify-between margin-top">
				<view>
					<text class="cuIcon-order text-grey"></text>
					<text class="text-grey" style="padding-left: 5px">我的订单</text>
				</view>
				<view class="cuIcon-right text-gray"></view>
			</view>
			
			<view class="flex justify-between margin-top">
				<view>
					<text class="cuIcon-shop text-grey"></text>
					<text class="text-grey" style="padding-left: 5px">中奖商品</text>
				</view>
				<view class="cuIcon-right text-gray"></view>
			</view>

			<view class="flex justify-between margin-top">
				<view>
					<text class="cuIcon-pic text-grey"></text>
					<text class="text-grey" style="padding-left: 5px">我的晒单</text>
				</view>
				<view class="cuIcon-right text-gray"></view>
			</view>
			
			<view class="flex justify-between margin-top">
				<view>
					<text class="cuIcon-settings text-grey"></text>
					<text class="text-grey" style="padding-left: 5px">设置</text>
				</view>
				<view class="cuIcon-right text-gray"></view>
			</view>

		</view>
		<view class="btn_out" @click="handleClick">退出登录</view>
		<view class="message_login" v-if="isLogin === false">
			<button type="default" @click="handleGoPageLogin">请登录</button>
		</view>
	</view>
</template>

<script>
	import {
		GetUserInfo,
		UserLonginOut
	} from '@/api/user.js'
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		mounted: function() {
			
		},
		computed: {
			...mapState(["isLogin", "UserInfo"])
		},
		created: function() {
			
		},
		onShow: function() {
			// 查询用户信息
			GetUserInfo().then(res => {
				this.userLogin(res)
			})
			console.log(this.isLogin)
		},
		methods: {
			...mapActions(['userLogin', 'userOutLogin']),
			handleClick: function() {
				// 请求清除服务器登录状态
				UserLonginOut().then(res => {
					console.log(res)
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
				})
				// 跳转登录页
				uni.switchTab({
					url: '/pages/index/index'
				})
				// 清楚本地缓存
				uni.clearStorageSync();
				// 清楚全局状态
				this.userOutLogin()
			},
			handleGoPageLogin: function() {
				uni.navigateTo({
					url: "/pages/me/login/login"
				})
			}
		}
	}
</script>

<style>
	.user_card{
		display: flex;
		justify-content: space-between;
		width: 100%;
		border-radius: 5px;
		background-color: #FFFFFF;
	}
	.btn_warp {
		width: 15%;
		text-align: center;
		color: #ff8630;
		line-height: 2;
		margin: 0 15upx;
		background-color: #FFFFFF;
		border-radius: 25px;
	}
	
	.btn_out{
		width: 93%;
		line-height: 2.5;
		color: #FFFFFF;
		border-radius: 5px;
		text-align: center;
		margin: 0 auto;
		margin-top: 50upx;
		background-color: #ff2a0e;
	}
	
	.message_login{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		text-align: center;
		background-color: #FFFFFF;
	}
	
	.message_login > button {
		width: 30%;
		margin-top: 15%;
	}
</style>
