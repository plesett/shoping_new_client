<template>
	<view>
		<view>
			<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
			 style="height: 792upx;" duration="500">
				<swiper-item v-for="(item,index) in data.picture_banner" :key="index">
					<image :src="item[0]" mode="aspectFill"></image>
					<video :src="item[0]" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover"></video>
				</swiper-item>
			</swiper>
		</view>
		<view class="title_box">
			<view class="title_pro text-df">{{data.title}}</view>
			<view class="text-sm text-gray" style="margin-bottom: 15upx;">
				价值：<text class="text-price text-df text-red">{{data.price}}</text>
			</view>
			<view class="cu-progress round sm">
				<view class="bg-yellow" :style="{width:(data.already_participation/data.total_participation)*100+'%'}"></view>
			</view>
			<view class="flex justify-between text-sm text-gray">
				<view class="text-orange">{{data.already_participation}}</view>
				<view class="">{{data.total_participation}}</view>
				<view class="text-blue">{{data.total_participation - data.already_participation}}</view>
			</view>
			<view class="flex justify-between text-sm text-gray">
				<view class="">已参与</view>
				<view class="">总需参与</view>
				<view class="">剩余</view>
			</view>
		</view>
		<view class="flex justify-between margin-top bg-gray" style="align-items: center;padding: 15upx;">
			<view>
				<text style="color: red;" class="lg text-gray cuIcon-roundcheck text-red"></text>100%公平
			</view>
			<view>
				<text style="color: red;" class="lg text-gray cuIcon-roundcheck text-red"></text>100%正品保证
			</view>
			<view>
				<text style="color: red;" class="lg text-gray cuIcon-roundcheck text-red"></text>全国免费配送
			</view>
		</view>
		<view class="padding text-center text-sm text-gray solid-bottom" style="border-bottom: 15upx solid #eeeeee;">
			你还未登陆哦，请登录后查看吧
		</view>
		<view class="cu-list menu" style="border-bottom: 15upx solid #eeeeee;">

			<view class="cu-item arrow border-bottom">
				<view class="content">
					<text class="text-black">图文详情</text>
				</view>
			</view>
			<view class="cu-item arrow border-bottom">
				<view class="content">
					<text class="text-black">商品晒单（2）</text>
				</view>
			</view>

		</view>

		<view>
			<scroll-view scroll-x class="bg-white nav solid-bottom">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in 2" :key="index"
					 @click="tabSelect(index)" :data-id="index">
						{{index === 0 ? '抽奖记录' : '历史中奖者'}}
					</view>
				</view>
			</scroll-view>
			<view class="" style="min-height: 1000upx;margin-bottom: 100upx;">
				<view v-show="TabCur === 0">
					<view class="cu-list menu-avatar" v-if="winner">

						<view class="cu-item" v-for="(item, index) in winner.participants">
							<view class="cu-avatar round lg" style="overflow: hidden;">
								<image style="width: 100%;height: 100%;" :src="item.avatars" mode=""></image>
							</view>
							<view class="content">
								<view class="text-black">{{item.nickname}}<text class="text-gray">({{item.city}})</text></view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">{{$time(item.createdAt)}}</view>
								</view>
							</view>
							<view class="action">
								<view class="lg text-gray cuIcon-right"></view>
							</view>
						</view>

					</view>
					<viwe style="
					width: 100%;
					display: block;
					text-align: center;
					margin-top: 30px;"
					v-if="!winner">暂无信息哦~</viwe>
				</view>
				<view v-show="TabCur === 1">
					<view class="cu-list menu-avatar">

						<view class="cu-item" v-for="index in 6" :key="index">
							<view class="text-black">
								第120{{index}}期
							</view>
							<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
							<view class="content">
								<view class="text-black">中奖者: 我就是阿萨</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										本期参与： <text class="text-orange">13</text> 人次
									</view>
								</view>
								<view class="text-gray text-sm flex">
									<view class="text-cut">
										中将号码：<text class="text-orange">100003</text> 人次
									</view>
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>


		<!-- 底部购买按钮 -->
		<view class="shopbtn solid-top">
			<view class="cu-bar bg-white tabbar border shop">
				<button class="action" open-type="contact">
					<view class="cuIcon-service text-green">
						<view class="cu-tag badge"></view>
					</view>
					客服
				</button>
				<view class="action" @click="handleGoPageCart">
					<view class="cuIcon-cart">
						<view class="cu-tag badge" v-if="cartCount !== 0">{{cartCount}}</view>
					</view>
					购物车
				</view>
				<view class="bg-orange submit" @click="handleAddCart([data])">加入购物车</view>
				<view class="bg-red submit">立即订购</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GetProductDetaile,
		GetProductBasics
	} from '@/api/product.js'
	import {
		ForMat
	} from '@/utils/day.js'
	export default {
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				TabCur: 0,
				data: {},
				winner: {},
				history: [],
				cartCount: 0
			}
		},
		onShow: function() {
			this.handleWatchCount()
		},
		onLoad: function(e) {
			let _this = this
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			GetProductDetaile(e.id).then(res => {
				_this.data = res.data
				_this.winner = res.winner[0]
				_this.history = res.history
				// 获取本地足迹
				const value = uni.getStorageSync('footprint');
				if (value.length == 0) {
					uni.setStorageSync('footprint', [String(res.data._id)]);
				} else {
					if (value.length > 20) {
						var item = value.splice(0, 11);
						uni.setStorageSync('footprint', item);
					} else {
						let ArrayFoot = []
						for (var i = 0; i < value.length; i++) {
							let item = value[i]
							if (item == res.data._id) continue;
							ArrayFoot.push(item)
						}
						ArrayFoot.push(res.data._id)
						uni.setStorageSync('footprint', ArrayFoot);
					}
				}
				uni.hideLoading()
			})
		},
		onBackPress: function() {
			// 页面返回清空商品详情防止下次数据没请求过来前闪屏
			this.data = []
		},
		onUnload: function() {
			// 页面返回清空商品详情防止下次数据没请求过来前闪屏
			this.data = []
		},
		methods: {
			tabSelect(id) {
				this.TabCur = id;
				console.log(this.TabCur)
			},
			handleWatchCount: function(){
				const value = uni.getStorageSync('cartData');
				this.cartCount = value.length
			},
			handleGoPageCart: function() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			handleAddCart: function(data) {
				// data[0] // <----商品的对象
				// 加入本地缓存
				const value = uni.getStorageSync('cartData');
				if (value.length === 0) {
					// 购物车里没东西
					uni.setStorageSync('cartData', [Object.assign(data[0], {
						count: 1
					})]);
					this.$queue.showToast('已加入购物车')
				} else {
					// 购物车有东西
					let ArrayPro = []
					for (var i = 0; i < value.length; i++) {
						const item = value[i]
						if (item._id === data[0]._id) {
							break;
						} else {
							ArrayPro.push(item)
						}
					}
					ArrayPro.push(Object.assign(data[0], {
						count: 1
					}))
					uni.setStorageSync('cartData', ArrayPro);
					this.$queue.showToast('已加入购物车')
				}
				this.handleWatchCount()
			},
		}
	}
</script>

<style>
	.title_box {
		padding: 10upx;
	}

	.title_pro {
		display: block;
		line-height: 1.5;
		word-wrap: break-word;
		word-break: normal;
		min-height: 90upx;
	}

	.shopbtn {
		position: fixed;
		width: 100%;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>
