<template>
	<view class="content bg-white">
		<view class="swiper">
			<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			 indicator-active-color="#0081ff">
				<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<easy-loadimage mode="widthFix" :scroll-top="scrollTop" :image-src="item.url"></easy-loadimage>
						<!-- <image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image> -->
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="menu" style="border-top: 15upx solid #EEEEEE;">
			<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
				<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="handleClickGoPage(index)">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
						<view class="cu-tag badge" v-if="item.badge!=0">
							<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
						</view>
					</view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view style="border-top: 15upx solid #EEEEEE;" class="productList">
			<view class="flex text-grey">
				<view class="flex-sub margin-xs text-center solid-right">
					<text class="lg text-gray cuIcon-calendar" style="margin-right: 10upx"></text>
					商城消息
				</view>
				<view class="flex-treble margin-xs text-left text-orange" style="overflow: hidden;">
					<text class="text-to">GS商城{{ env }}今日上线啦！！！！</text>
				</view>
			</view>
		</view>
		<view style="border-top: 15upx solid #EEEEEE;">
			<view class="text-center margin-top margin-bottom">
				<text class="lg text-gray cuIcon-move"></text>
				<text>为你推荐</text>
				<text class="lg text-gray cuIcon-move"></text>
			</view>
			<view class="cu-list grid col-2">

				<view class="cu-item" v-for="(item,index) in data" :key="index" @click="goDetaile(item._id)">
					<view class="content">
						<view style="padding: 0 100upx;min-height: 182upx;">
							<!-- <image src="https://img11.360buyimg.com/cms/jfs/t1/4609/37/3522/134740/5b997beeE4750d52c/c13c9b603ff5083d.jpg!q95.webp"
							 mode="" style="height: 170upx;"></image> -->
							<easy-loadimage mode="widthFix" :scroll-top="scrollTop" :image-src="item.picture"></easy-loadimage>
						</view>
						<text class="text-cut padding-left padding-right">{{item.title}}</text>
						<view class="text-price text-df" style="color: #e54d42;padding: 10upx 0;">{{ item.price}}.00</view>
						<view style="padding: 0 10upx;">
							<view class="bg-white">
								<view class="cu-progress round sm striped active">
									<view class="bg-orange" :style="{width:(item.already_participation/item.total_participation)*100+'%'}"></view>
								</view>
							</view>
							<view class="flex justify-between text-sm text-gray">
								<view>
									<view class="text-orange">{{item.already_participation}}</view>
									<view>已参与</view>
								</view>
								<view class="text-center">
									<view>{{item.total_participation}}</view>
									<view>总需参与</view>
								</view>
								<view>
									<view class="text-blue">{{item.total_participation - item.already_participation}}</view>
									<view>剩余</view>
								</view>
							</view>
						</view>
						<view class="margin-tb-sm text-center">
							<button class="cu-btn round bg-orange" style="height: 60upx;" @click.stop="handleClickPurchase(item)">立即购买</button>
						</view>
					</view>
				</view>

			</view>
			<view class="content padding text-center" @click="handleMore" v-if="!isData">
				{{isClickMore ? '正在加载中...' : '点击加载更多'}}
			</view>
			<view class="content padding text-center" v-else>暂无更多</view>
		</view>
		<view v-if="poster">
			<Poster @handleFathClose="handleFathClose"></Poster>
			<viwe class="Cover"></viwe>
		</view>
		<!-- 购买弹窗 -->
		<view class="cu-modal" :class="modalName=='DialogModal2'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">立即购买</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="bg-white">
					<Product :data="isAlertPro"></Product>
					<view>
						<view class="text-black padding">支付金额: <text class="text-red text-price tex-xl text-bold">{{productCount}}.00</text></view>
						<view class="countCalculation" style="position: relative;">
							<!-- 购买数量 -->
							<view @click="reduce">-</view>
							<view style="background-color: #EEEEEE;">{{productCount}}</view>
							<view @click="add">+</view>
						</view>
						<view class="countCalculation margin-top">
							<view style="width: 100upx;" @click="addTow">2倍</view>
							<view style="width: 100upx;" @click="addFive">5倍</view>
							<view style="width: 100upx;" @click="addAll">全包</view>
							<view style="width: 100upx;" @click="productCount = 1">清除</view>
						</view>
					</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green " @tap="settlement()">
						<text class="cuIcon-moneybag"></text>立即支付</view>
					<view class="action margin-0 flex-sub text-green solid-left" @tap="handleAddCart(isAlertPro)">加入购物车</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">取消</view>
				</view>
			</view>
		</view>
		<!-- end -->
		<key-words :mix="true" :show_key="show_key" :price="productCount" @closeFuc="closeFuc" @getPassword="getPassword"></key-words>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	import easyLoadimage from '../../compoents/easy-loadimage/easy-loadimage.vue'
	import Poster from '@/compoents/poster.vue'
	import {
		GetProductList
	} from '@/api/product.js'
	import Product from '@/compoents/product.vue'
	import keyWords from "@/compoents/bian-keywords/index.vue"
	export default {
		data() {
			return {
				menuUrl: [{
					id: 0,
					page: "/pages/index/footprint/footprint"
				}, {
					id: 1,
					page: "/pages/index/forum/forum"
				}, {
					id: 2,
					page: "/pages/index/thing/thing"
				}, {
					id: 3,
					page: "/pages/index/notice/notice"
				}, {
					id: 4,
					page: "/pages/index/customer/customer"
				}, {
					id: 5,
					page: "/pages/index/explain/explain"
				}, {
					id: 6,
					page: "/pages/index/help/help"
				}],
				cardCur: 0,
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
				dotStyle: true,
				// 宫格
				cuIconList: [{
					cuIcon: 'footprint',
					color: 'red',
					badge: 120,
					name: '我的足迹'
				}, {
					cuIcon: 'post',
					color: 'orange',
					badge: 1,
					name: '商城论坛'
				}, {
					cuIcon: 'goodsfill',
					color: 'yellow',
					badge: 0,
					name: '好物推荐'
				}, {
					cuIcon: 'noticefill',
					color: 'olive',
					badge: 22,
					name: '通知'
				}, {
					cuIcon: 'servicefill',
					color: 'cyan',
					badge: 0,
					name: '联系客服'
				}, {
					cuIcon: 'edit',
					color: 'purple',
					badge: 0,
					name: '抽奖说明'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '帮助'
				}, {
					cuIcon: 'forwardfill',
					color: 'blue',
					badge: 0,
					name: '分享	'
				}],
				modalName: null,
				gridCol: 4,
				gridBorder: false,
				isClickMore: false,
				scrollTop: 0,
				poster: false,
				isData: false,
				data: [],
				pageIndex: 1,
				modalName: null,
				isAlertPro: [],
				productCount: 1,
				show_key: false
			}
		},
		components: {
			easyLoadimage,
			Poster,
			Product,
			keyWords
		},
		onLoad() {
			console.log(this.env)
		},
		mounted: function() {
			this.handGetDataInfo()
		},
		computed: {
			...mapState(['env','isLogin'])
		},
		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			handleMore() {
				this.isClickMore = true
				this.pageIndex = this.pageIndex + 1
				this.handGetDataInfo()
			},
			onPageScroll({
				scrollTop
			}) {
				// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
				this.scrollTop = scrollTop;
			},
			goDetaile(id) {
				uni.navigateTo({
					url: '/pages/index/detaile/detaile?id=' + id
				})
			},
			reduce: function() {
				if (this.productCount < 2) return;
				this.productCount -= 1
			},
			add: function() {
				const {
					total_participation,
					already_participation
				} = this.isAlertPro[0]
				if (total_participation - already_participation < this.productCount) return;
				this.productCount += 1
			},
			addTow: function() {
				const {
					total_participation,
					already_participation
				} = this.isAlertPro[0]
				if (total_participation - already_participation < this.productCount * 2) return;
				this.productCount = this.productCount * 2
			},
			addFive: function() {
				const {
					total_participation,
					already_participation
				} = this.isAlertPro[0]
				if (total_participation - already_participation < this.productCount * 5) return;
				this.productCount = this.productCount * 5
			},
			addAll: function() {
				const {
					total_participation,
					already_participation
				} = this.isAlertPro[0]
				if (total_participation - already_participation < this.productCount) return;
				this.productCount += total_participation - already_participation
			},
			handleClickGoPage(index) {
				if (index === 7) {
					if (this.env) {
						this.poster = true
					}
					return
				}
				// 进入论坛前判断权限
				if ( index === 1 && !this.isLogin ) {
					console.log('未登录')
					this.$queue.showToast('请登录后再次查看');
					return
				}
				console.log('即将跳转到->' + this.menuUrl[index].page)
				uni.navigateTo({
					url: this.menuUrl[index].page
				})
			},
			handleFathClose: function() {
				this.poster = false
			},
			handGetDataInfo: function() {
				let _this = this
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				GetProductList(_this.pageIndex).then(res => {
					if (res.length === 0) {
						_this.isData = true
						uni.hideLoading()
						return
					}
					let ArrayPro = [...this.data]
					for (var i = 0; i < res.length; i++) {
						let item = res[i]
						ArrayPro.push(item)
					}
					_this.data = ArrayPro
					_this.isClickMore = false
					uni.hideLoading()
				})
			},
			handleClickPurchase: function(data) {
				console.log(data)
				this.isAlertPro = [data]
				this.modalName = 'DialogModal2'
			},
			handleAddCart: function(data) {
				// data[0] // <----商品的对象
				// 加入本地缓存
				const value = uni.getStorageSync('cartData');
				if(value.length === 0) {
					// 购物车里没东西
					uni.setStorageSync('cartData', [Object.assign(data[0], { count: this.productCount })]);
				} else {
					// 购物车有东西
					let ArrayPro = []
					for (var i = 0; i < value.length; i++) {
						const item = value[i]
						if(item._id === data[0]._id) {
							break;
						} else {
							ArrayPro.push(item)
						}
					}
					ArrayPro.push(Object.assign(data[0], { count: this.productCount }))
					uni.setStorageSync('cartData', ArrayPro);
					this.hideModal()
					uni.showToast({
						title: '已加入购物车',
						icon: 'none'
					})
				}
			},
			settlement: function() {
				// 判断是否登录
				if (!this.isLogin) {
					this.hideModal()
					this.$queue.showToast('请先登录哦')
					return
				}
				if (!true) return;
				this.hideModal()
				this.show_key = true
				uni.hideTabBar()
			},
			closeFuc: function(parm) {
				this.show_key = false;
				uni.showTabBar()
				// parm 为false则是关闭了支付界面 
				if (parm === false) return
				uni.showLoading({
					title: '结算中'
				})
				uni.hideLoading()
			},
			getPassword: function(msg) {
				//msg:密码   例如:{msg:123456}
				this.ted(msg); //密码输入完需要执行的方法
			},
			ted: function(msg) {
				console.log(msg)
				this.closeFuc()
			}
		}
	}
</script>

<style>
	.loadfail-img {
		background-color: red;
	}

	.countCalculation {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.countCalculation>view {
		width: 60upx;
		padding: 5px;
		border: 1px solid #EEEEEE;
		background-color: #FFFFFF;
	}

	.Cover {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: .7;
		z-index: 5;
		background-color: #000000;
	}

	.text-to {
		transition: all 3s;
		display: inline-block;
		animation: Tada 6s both infinite linear 0s;
		;
	}

	@keyframes Tada {
		0% {
			transform: translateX(600upx);
		}

		100% {
			transform: translateX(-350upx);
		}
	}
</style>
