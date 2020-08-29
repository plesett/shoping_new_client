<template>
	<view>
		<!-- 购物车为空 -->
		<view class="cartNull padding" v-if="data.length === 0">
			<image class="padding" style="width: 100%;height: 100%;" src="../../static/images/kongkong.png" mode=""></image>
			<view class="text-center text-gray">空空如也 ~</view>
		</view>

		<!-- 购物车存在商品 -->
		<view class="flex justify-start content padding bg-white solid" style="height: 250upx;" v-for="(item, index) in data"
		 v-else>
			<view class="padding proImg" style="padding: 0 10upx;">
				<image style="height: 100%;" :src="item.picture" mode=""></image>
			</view>
			<view style="width: 90%;">
				<view class="title text-cut text-black" style="width: 80%;font-size: 33upx;">{{item.title}}</view>
				<view class="text-gray text-sm" style="padding: 15upx 0;">剩余 <text class="text-orange">{{item.total_participation - item.already_participation}}</text>
					人次</view>
				<view class="flex justify-start" style="position: relative;">
					<view class="blockCount" @click="handleClickCalculation(index, false)">-</view>
					<view class="blockCount solid" style="background-color: #FFFFFF;">{{item.count}}</view>
					<view class="blockCount" @click="handleClickCalculation(index, true)">+</view>
					<view class="text-center" style="position: absolute;right: 10%;" @click="handleClickDelete(index)">
						<text class="text-gray cuIcon-deletefill" style="font-size: 45upx;"></text>
					</view>
					<view class="btn_count" @click="handleClickFastTow(index)">2倍</view>
					<view class="btn_count" @click="handleClickFastAll(item.total_participation - item.already_participation, index)">全包</view>
				</view>
			</view>
		</view>

		<key-words :mix="true" :show_key="show_key" :price="price" @closeFuc="closeFuc" @getPassword="getPassword"></key-words>

		<!-- #ifdef  MP-WEIXIN -->
		<view class="settlement" @click="settlement">结算</view>
		<!-- #endif -->

	</view>
</template>

<script>
	import keyWords from "../../compoents/bian-keywords/index.vue"
	import {
		UserPayPass
	} from "@/api/comm.js"
	import {
		Ongoing
	} from '@/api/product.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				show_key: false,
				price: 0,
				data: []
			}
		},
		components: {
			keyWords
		},
		computed: {
			...mapState(['UserInfo','isLogin'])
		},
		onNavigationBarButtonTap: function(e) {
			if (e.text === '结算') {
				this.settlement()
			}
		},
		onShow: function() {
			// 从本地缓存中获取商品数据
			const value = uni.getStorageSync('cartData');
			this.data = value
		},
		methods: {
			settlement() {
				// 判断本地缓存是否存在 商品信息
				const value = uni.getStorageSync('cartData');
				if (value.length === 0) {
					uni.showToast({
						title: '请先添加商品哦~',
						icon: 'none'
					})
					return
				}
				// 判断是否登录
				if (this.isLogin) {
					this.$queue.showToast('请先登录哦')
					return
				}
				let sum = 0;
				// 计算数目价格 与后台数据进行比对
				for (let i = 0; i < value.length; i++) {
					const item = value[i]
					sum += item.count
				}
				this.price = sum // 模拟价格
				this.show_key = true
				uni.hideTabBar()
			},
			closeFuc(parm) {
				this.show_key = false;
				uni.showTabBar()
				// parm 为false则是关闭了支付界面 
				if (parm === false) return
				uni.hideLoading()
			},
			getPassword(msg) {
				//msg:密码   例如:{msg:123456}
				this.ted(msg); //密码输入完需要执行的方法
			},
			ted(msg) {
				let _this = this
				console.log(msg)
				uni.showLoading({
					title: '结算中'
				})
				// 这里请求比对支付接口数据
				UserPayPass({
					_id: _this.UserInfo._id,
					pay_pass: msg.password,
					count: _this.price
				}).then(res => {
					if (res.code === 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						// 请求接口参与该商品
						for (var i = 0; i < _this.data.length; i++) {
							let item = _this.data[i]
							Ongoing({
								count: item.count,
								product_id: item._id
							}).then(res => {
								console.log(res)
								uni.showToast({
									title: '参与成功',
									icon: 'none'
								})
							})
						}
						// 清空本地所有商品缓存
						uni.removeStorageSync('cartData');
						// 状态清空
						_this.data = []
						_this.closeFuc(false)
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
					uni.hideLoading()
				})
			},
			handleClickDelete: function(index) {
				let newArray = [].concat(this.data)
				newArray.splice(index, 1);
				uni.setStorageSync('cartData', newArray);
				this.data = newArray
			},
			handleClickCalculation: function(index, type) {
				const {
					total_participation,
					already_participation,
					count
				} = this.data[index]

				if (type && (total_participation - already_participation) < count + 1) return;
				if (!type && count + 1 < 2) return

				let newArray = [].concat(this.data)
				newArray.splice(index, 1);
				type ?
					newArray.splice(index, 0, Object.assign(this.data[index], {
						count: count + 1
					})) :
					newArray.splice(index, 0, Object.assign(this.data[index], {
						count: count - 1
					}));
				// newArray.push(Object.assign(this.data[index],{ count: count + 1 }))
				uni.setStorageSync('cartData', newArray);
				this.data = newArray
			},
			handleClickFastTow: function(index) {
				const {
					total_participation,
					already_participation,
					count
				} = this.data[index]
				if (total_participation - already_participation < count * 2) return;
				let newArray = [].concat(this.data)
				newArray.splice(index, 1);

				newArray.splice(index, 0, Object.assign(this.data[index], {
					count: count * 2
				}))
				// newArray.push(Object.assign(this.data[index],{ count: count + 1 }))
				uni.setStorageSync('cartData', newArray);
				this.data = newArray
			},
			handleClickFastAll: function(newCount, index) {
				const {
					total_participation,
					already_participation,
					count
				} = this.data[index]
				if (total_participation - already_participation < newCount) return;
				let newArray = [].concat(this.data)
				newArray.splice(index, 1);

				newArray.splice(index, 0, Object.assign(this.data[index], {
					count: newCount
				}))
				// newArray.push(Object.assign(this.data[index],{ count: count + 1 }))
				uni.setStorageSync('cartData', newArray);
				this.data = newArray
			}
		}
	}
</script>

<style>
	body {
		background: #FFFFFF;
	}

	.cartNull {
		width: 50%;
		height: 280upx;
		margin: 0 auto;
	}

	.proImg {
		width: 30%;
	}

	.blockCount {
		width: 50upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		background-color: #EEEEEE;
	}

	.settlement {
		position: fixed;
		bottom: 120upx;
		width: 10%;
		height: 6%;
		color: #FFFFFF;
		line-height: 2.6;
		text-align: center;
		border-radius: 50%;
		right: 5%;
		box-shadow: 1px 2px 7px 0px #8d8d8d;
		background-color: #f37b1d;
	}

	.btn_count {
		width: 80upx;
		text-align: center;
		margin: 0 10upx;
		line-height: 1.7;
		border: 1px solid #EEEEEE;
	}
</style>
